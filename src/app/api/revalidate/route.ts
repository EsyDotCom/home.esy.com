import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type ArticleKind = "research" | "school";

type RevalidateBody = {
  kind?: string;
  slug?: string;
  action?: "publish" | "unpublish";
};

const VALID_KINDS = new Set<ArticleKind>(["research", "school"]);

function hasValidSecret(request: NextRequest): boolean {
  const secret = process.env.ESY_REVALIDATE_SECRET;
  if (!secret) return false;

  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const headerSecret = request.headers.get("x-revalidate-secret");
  return bearer === secret || headerSecret === secret;
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

  const kind = body.kind as ArticleKind;
  const slug = body.slug?.trim();
  if (!VALID_KINDS.has(kind) || !slug) {
    return NextResponse.json(
      { error: 'Expected body with kind "research"|"school" and slug.' },
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
    slug,
    paths,
  });
}
