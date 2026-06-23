import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

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

// Headless publication slugs → esy.com section paths (Phase 1 API sends `publication`).
const PUBLICATION_TO_KIND: Record<string, ArticleKind> = {
  "esy-research": "research",
  "esy-school": "school",
};

function hasValidSecret(request: NextRequest): boolean {
  const secret = process.env.ESY_REVALIDATE_SECRET;
  if (!secret) return false;

  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const headerSecret = request.headers.get("x-revalidate-secret");
  return bearer === secret || headerSecret === secret;
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
  if (!process.env.ESY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: "ESY_REVALIDATE_SECRET is not configured." },
      { status: 500 },
    );
  }

  if (!hasValidSecret(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: RevalidateBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
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

  const paths = [`/${kind}`, `/${kind}/${slug}`, "/sitemap.xml"];
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
