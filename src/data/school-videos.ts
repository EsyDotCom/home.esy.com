export interface WorkflowStage {
  label: string;
  sublabel: string;
}

export interface SchoolVideo {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  durationSeconds: number;
  publishedAt: string;
  muxPlaybackId: string;
  thumbnailUrl?: string;
  transcript?: string;
  content: string;
  tags: string[];
  relatedSlugs: string[];
  templateSlug?: string;
  stages?: WorkflowStage[];
}

// School content now lives in the publications/documents DB and is served via
// api.esy.com (esy.com/learn renders published school documents). This static
// registry is intentionally empty — the interfaces + helpers below are kept so
// existing imports keep working while the page is rebuilt on the shared,
// publication-backed detail template.
export const schoolVideos: SchoolVideo[] = [];

export function getPublishedVideos(): SchoolVideo[] {
  return [...schoolVideos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getVideoBySlug(slug: string): SchoolVideo | undefined {
  return schoolVideos.find((v) => v.slug === slug);
}

export function getRelatedVideos(
  currentSlug: string,
  relatedSlugs: string[],
  limit = 4
): SchoolVideo[] {
  const related = relatedSlugs
    .map((slug) => schoolVideos.find((v) => v.slug === slug))
    .filter((v): v is SchoolVideo => v !== undefined);

  if (related.length >= limit) return related.slice(0, limit);

  const remaining = getPublishedVideos()
    .filter((v) => v.slug !== currentSlug && !relatedSlugs.includes(v.slug))
    .slice(0, limit - related.length);

  return [...related, ...remaining].slice(0, limit);
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
