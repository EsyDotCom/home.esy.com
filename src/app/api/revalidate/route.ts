import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  hasSignature,
  readWebhookHeaders,
  secretsForPublication,
  verifyHmac,
} from "@/lib/verify-webhook";

type RevalidateBody = {
  /** Headless webhook (per-publication Connect). */
  publication?: string;
  slug?: string;
  action?: "publish" | "unpublish" | "test";
  categories?: string[];
};

// Publication slug -> esy.com URL prefix. The Publication is the destination;
// there is no `kind` axis anymore (school collapsed into the esy-learn publication
// served at /learn since Jun 2026).
const PUBLICATION_TO_PATH: Record<string, string> = {
  "esy-research": "research",
  "esy-learn": "learn",
};

/**
 * Legacy Bearer / x-revalidate-secret check. Kept as a fallback during the HMAC
 * rollout so in-flight Bearer deliveries never break.
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

  // Accept BOTH auth schemes during the HMAC rollout:
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

  const publication = body.publication?.trim();
  const slug = body.slug?.trim();
  const pathPrefix = publication ? PUBLICATION_TO_PATH[publication] : undefined;
  if (!pathPrefix || !slug) {
    return NextResponse.json(
      {
        error:
          'Expected body with slug and a known publication ("esy-research" | "esy-learn").',
      },
      { status: 400 },
    );
  }

  // Refresh both the tagged API fetch (keyed by publication slug) and the concrete
  // routes that can hold rendered HTML/metadata for this article.
  revalidateTag("published-articles");
  revalidateTag(`published-articles:${publication}`);

  const paths = [`/${pathPrefix}`, `/${pathPrefix}/${slug}`, "/sitemap.xml"];
  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({
    revalidated: true,
    action: body.action ?? "publish",
    publication,
    slug,
    categories: body.categories ?? [],
    paths,
  });
}
