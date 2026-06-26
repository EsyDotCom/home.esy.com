import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  hasSignature,
  readWebhookHeaders,
  secretsForPublication,
  verifyHmac,
} from "@/lib/verify-webhook";

type ArticleKind = "research" | "school";

type RevalidateBody = {
  /** Legacy webhook (global esy.com revalidation). */
  kind?: string;
  /** Headless webhook (per-publication Connect). */
  publication?: string;
  slug?: string;
  action?: "publish" | "unpublish" | "test";
  categories?: string[];
};

const VALID_KINDS = new Set<ArticleKind>(["research", "school"]);

// API article kinds map to public URL prefixes (school → /learn since Jun 2026).
const KIND_PATH_PREFIX: Record<ArticleKind, string> = {
  research: "research",
  school: "learn",
};

// Headless publication slugs → esy.com section paths (Phase 1 API sends `publication`).
const PUBLICATION_TO_KIND: Record<string, ArticleKind> = {
  "esy-research": "research",
  "esy-school": "school",
};

/**
 * Legacy Bearer / x-revalidate-secret check. Kept as a fallback during the HMAC
 * rollout (Phase A: accept both) so in-flight Bearer deliveries never break.
 */
function hasValidBearer(request: NextRequest): boolean {
  const secret = process.env.ESY_REVALIDATE_SECRET;
  if (!secret) return false;

  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const headerSecret = request.headers.get("x-revalidate-secret");
  // Support a comma-separated list so one endpoint can serve multiple publications.
  const accepted = new Set(secret.split(",").map((s) => s.trim()).filter(Boolean));
  return (bearer != null && accepted.has(bearer)) || (headerSecret != null && accepted.has(headerSecret));
}

/** Resolve section from legacy `kind` or headless `publication` slug. */
function resolveKind(body: RevalidateBody): ArticleKind | null {
  if (body.kind && VALID_KINDS.has(body.kind as ArticleKind)) {
    return body.kind as ArticleKind;
  }
  const pub = body.publication?.trim();
  if (pub && PUBLICATION_TO_KIND[pub]) {
    return PUBLICATION_TO_KIND[pub];
  }
  return null;
}

export async function POST(request: NextRequest) {
  // Read the raw body ONCE: HMAC must hash the exact bytes Esy signed, so we
  // parse JSON from this string rather than calling request.json().
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: "Could not read body." }, { status: 400 });
  }

  let body: RevalidateBody;
  try {
    body = JSON.parse(rawBody) as RevalidateBody;
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  // Phase A — accept BOTH auth schemes:
  //   • signature headers present → verify HMAC against the publication's secret
  //   • otherwise → fall back to the legacy Bearer/x-revalidate-secret check
  const headers = readWebhookHeaders((name) => request.headers.get(name));
  if (hasSignature(headers)) {
    const secrets = secretsForPublication(body.publication);
    const result = verifyHmac(rawBody, headers, secrets);
    if (!result.ok) {
      return NextResponse.json({ error: `Unauthorized: ${result.reason}` }, { status: 401 });
    }
  } else if (!hasValidBearer(request)) {
    if (!process.env.ESY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: "No webhook secret configured (set ESY_REVALIDATE_SECRET or a per-publication secret)." },
        { status: 500 },
      );
    }
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const kind = resolveKind(body);
  const slug = body.slug?.trim();
  if (!kind || !slug) {
    return NextResponse.json(
      {
        error:
          'Expected body with slug and either kind "research"|"school" or publication "esy-research"|"esy-school".',
      },
      { status: 400 },
    );
  }

  // Refresh both the tagged API fetch and the concrete routes that can hold
  // rendered HTML/metadata for this article.
  revalidateTag("published-articles");
  revalidateTag(`published-articles:${kind}`);

  const pathPrefix = KIND_PATH_PREFIX[kind];
  const paths = [`/${pathPrefix}`, `/${pathPrefix}/${slug}`, "/sitemap.xml"];
  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({
    revalidated: true,
    action: body.action ?? "publish",
    kind,
    publication: body.publication ?? null,
    slug,
    categories: body.categories ?? [],
    paths,
  });
}
