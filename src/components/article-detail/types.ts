// Shared shape for the article/video detail template. ResearchVideo and
// SchoolVideo are structurally identical to this, so both assign cleanly — the
// detail page is the same template regardless of section.

export interface ArticleDetailStage {
  label: string;
  sublabel: string;
}

export interface ArticleDetailData {
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
  stages?: ArticleDetailStage[];
}

// Section identity (research / school) — drives the breadcrumb + links.
export interface ArticleSection {
  label: string;
  basePath: string; // e.g. "/research" or "/school"
}
