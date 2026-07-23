import {
  agenticVideos,
  type AgenticVideo,
} from "@/data/agentic-videos";

// Published articles = static registry (checked into git) + live entries
// published from Compose via api.esy.com. The API serves the exact registry
// shape, so the two sources interleave with no adaptation.
//
// Cache model is event-driven (Substack-style): the publish/unpublish webhook
// purges the `published-articles` tags via api.esy.com, so a change is reflected
// within ~1s. The 1-hour revalidate is only a backstop if a webhook is ever
// missed — not the primary freshness mechanism. Critically, a transient API
// error is NEVER cached as an article-less page (see fetchPublished vs the
// build-only fallback in fetchPublishedSafe).

const API_URL = process.env.ESY_API_URL ?? "https://api.esy.com";

// Backstop only; on-demand tag revalidation is the real trigger.
const REVALIDATE_SECONDS = 3600;

type ApiArticle = AgenticVideo; // the public API response mirrors this shape

// Static builds and local dev can fall back to the git registry when the API is
// down. Production ISR must still throw so Next keeps the last-good cache
// instead of baking in an empty list.
function mayFallbackToRegistryOnly(): boolean {
  return (
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.NODE_ENV === "development"
  );
}

// Headless reads: each esy.com section is a Publication. We read its published
// documents from the publication-scoped public endpoint (no `kind` axis — the
// Publication is the destination). The cache tag is keyed by publication slug so
// the publish/unpublish webhook can purge exactly this section.
async function fetchPublished(publicationSlug: string): Promise<ApiArticle[]> {
  const res = await fetch(`${API_URL}/v1/publications/public/${publicationSlug}/articles`, {
    next: {
      revalidate: REVALIDATE_SECONDS,
      tags: ["published-articles", `published-articles:${publicationSlug}`],
    },
  });
  // Throw — do NOT return [] — on a bad response. Returning an empty list here
  // would let Next cache an article-less render on a transient API blip (e.g. an
  // api.esy.com redeploy), silently dropping every published article until the
  // cache expired. By throwing, an in-flight ISR regeneration is discarded and
  // Next keeps serving the last-good render; only a cold cache + dead API errors.
  // A 404 here means the publication is missing/not public — also an error, not
  // "no articles" (a populated publication returns 200 with an items array).
  if (!res.ok) throw new Error(`published-articles ${publicationSlug}: HTTP ${res.status}`);
  const body = await res.json();
  return (body.items ?? []) as ApiArticle[];
}

// Build-time and local dev graceful degradation: api.esy.com can 502/500 or be
// unreachable, and `next dev` shouldn't require a local API process. Fall back
// to the git registry. At production ISR time we deliberately let the error
// propagate so Next serves the last-good cache instead of caching an empty list.
async function fetchPublishedSafe(publicationSlug: string): Promise<ApiArticle[]> {
  try {
    return await fetchPublished(publicationSlug);
  } catch (err) {
    if (mayFallbackToRegistryOnly()) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[published-articles] ${publicationSlug}: API unavailable, using static registry only.`,
          err,
        );
      }
      return [];
    }
    throw err;
  }
}

// Static registry entries win slug collisions: they're the curated, reviewed
// source of record; the API adds net-new articles.
function mergeBySlug<T extends { slug: string; publishedAt: string }>(
  registry: T[],
  api: T[],
): T[] {
  // Registry wins; the seen set also dedupes API-vs-API collisions, which can
  // happen now that /agentic reads two publications into one list.
  const seen = new Set(registry.map((v) => v.slug));
  const merged = [...registry];
  for (const a of api) {
    if (seen.has(a.slug)) continue;
    seen.add(a.slug);
    merged.push(a);
  }
  return merged.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

// The Agentic Engineer (/agentic) merges the two former sections, so it reads
// from BOTH publications: esy-research (deep dives, model + tool research) and
// esy-learn (tutorials). The static registry is curated research; net-new
// articles from either publication merge in by publish date.
const AGENTIC_PUBLICATIONS = ["esy-research", "esy-learn"];

export async function getAllAgenticArticles(): Promise<AgenticVideo[]> {
  // Fetch both publications in parallel; a failure in either degrades to the
  // registry (build/dev) or throws (prod ISR) per fetchPublishedSafe.
  const perPublication = await Promise.all(
    AGENTIC_PUBLICATIONS.map((slug) => fetchPublishedSafe(slug)),
  );
  const api = perPublication.flat() as AgenticVideo[];
  return mergeBySlug(agenticVideos, api);
}

export async function findAgenticArticle(slug: string): Promise<AgenticVideo | undefined> {
  return (await getAllAgenticArticles()).find((v) => v.slug === slug);
}

// Related resolution against the merged list (registry helpers only see
// static entries).
export function relatedFrom<T extends { slug: string }>(
  all: T[],
  currentSlug: string,
  relatedSlugs: string[],
  limit = 3,
): T[] {
  const picked = relatedSlugs
    .map((slug) => all.find((v) => v.slug === slug))
    .filter((v): v is T => Boolean(v));
  const remaining = all.filter(
    (v) => v.slug !== currentSlug && !picked.some((p) => p.slug === v.slug),
  );
  return [...picked, ...remaining].slice(0, limit);
}
