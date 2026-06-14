import {
  researchVideos,
  type ResearchVideo,
} from "@/data/research-videos";
import { schoolVideos, type SchoolVideo } from "@/data/school-videos";

// Published articles = static registry (checked into git) + live entries
// published from Compose via api.esy.com. The API serves the exact registry
// shape, so the two sources interleave with no adaptation. ISR (5 min) keeps
// a Compose publish appearing without a redeploy; an unreachable API at
// build/request time degrades gracefully to registry-only.

const API_URL =
  process.env.ESY_API_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://api.esy.com");

const REVALIDATE_SECONDS = 300;

type ApiArticle = ResearchVideo; // the public API response mirrors this shape

async function fetchPublished(kind: "research" | "school"): Promise<ApiArticle[]> {
  try {
    const res = await fetch(`${API_URL}/v1/publications/public?kind=${kind}`, {
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["published-articles", `published-articles:${kind}`],
      },
    });
    if (!res.ok) return [];
    const body = await res.json();
    return (body.items ?? []) as ApiArticle[];
  } catch {
    // API down or unreachable (e.g. during a static build) — registry only.
    return [];
  }
}

// Static registry entries win slug collisions: they're the curated, reviewed
// source of record; the API adds net-new articles.
function mergeBySlug<T extends { slug: string; publishedAt: string }>(
  registry: T[],
  api: T[],
): T[] {
  const seen = new Set(registry.map((v) => v.slug));
  const merged = [...registry, ...api.filter((a) => !seen.has(a.slug))];
  return merged.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getAllResearchArticles(): Promise<ResearchVideo[]> {
  const api = await fetchPublished("research");
  return mergeBySlug(researchVideos, api as ResearchVideo[]);
}

export async function getAllSchoolArticles(): Promise<SchoolVideo[]> {
  const api = await fetchPublished("school");
  return mergeBySlug(schoolVideos, api as SchoolVideo[]);
}

export async function findResearchArticle(slug: string): Promise<ResearchVideo | undefined> {
  return (await getAllResearchArticles()).find((v) => v.slug === slug);
}

export async function findSchoolArticle(slug: string): Promise<SchoolVideo | undefined> {
  return (await getAllSchoolArticles()).find((v) => v.slug === slug);
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
