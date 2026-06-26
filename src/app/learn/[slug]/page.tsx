import { notFound } from "next/navigation";
import { getPublishedVideos } from "@/data/school-videos";
import {
  findSchoolArticle,
  getAllSchoolArticles,
  relatedFrom,
} from "@/lib/published-articles";
import { loadTranscriptSegments } from "@/lib/transcript-loader";
import VideoPageClient from "./client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// Registry slugs prerender at build; Compose-published slugs render on demand
// (dynamicParams). Freshness is driven by the publish/unpublish webhook (tag +
// path revalidation); this 1-hour revalidate is only a backstop.
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getPublishedVideos().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = await findSchoolArticle(slug);

  if (!video) return {};

  const ogImage = video.muxPlaybackId
    ? `https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg?time=0`
    : undefined;

  return {
    title: `${video.title} — Esy Learn`,
    description: video.description.slice(0, 160),
    openGraph: {
      title: video.title,
      description: video.description.slice(0, 160),
      type: "video.other",
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function SchoolVideoPage({ params }: Props) {
  const { slug } = await params;
  const video = await findSchoolArticle(slug);

  if (!video) notFound();

  // Related resolves against the merged list so API and registry articles
  // can cross-reference each other.
  const related = relatedFrom(await getAllSchoolArticles(), video.slug, video.relatedSlugs);
  // Build-time SRT load powers the click-to-seek transcript — the same default
  // the template gives research. Null when no SRT exists (falls back to the
  // plain transcript toggle).
  const transcriptSegments = loadTranscriptSegments(video.slug);

  return (
    <VideoPageClient
      video={video}
      related={related}
      transcriptSegments={transcriptSegments}
    />
  );
}
