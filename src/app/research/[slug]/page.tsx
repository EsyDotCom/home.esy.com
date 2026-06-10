import { notFound } from "next/navigation";
import {
  getResearchVideoBySlug,
  getRelatedResearchVideos,
  getPublishedResearchVideos,
} from "@/data/research-videos";
import { loadTranscriptSegments } from "@/lib/transcript-loader";
import { transcriptToPlainText, toIsoDuration } from "@/lib/transcripts";
import ResearchVideoPageClient from "./client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

const BASE_URL = "https://esy.com";

export async function generateStaticParams() {
  return getPublishedResearchVideos().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = getResearchVideoBySlug(slug);

  if (!video) return {};

  const ogImage = video.muxPlaybackId
    ? `https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg?time=0`
    : undefined;

  return {
    title: `${video.title} — Esy Research`,
    description: video.description.slice(0, 160),
    alternates: {
      canonical: `${BASE_URL}/research/${video.slug}/`,
    },
    openGraph: {
      title: video.title,
      description: video.description.slice(0, 160),
      type: "video.other",
      url: `${BASE_URL}/research/${video.slug}/`,
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: video.title,
      description: video.description.slice(0, 160),
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function ResearchVideoPage({ params }: Props) {
  const { slug } = await params;
  const video = getResearchVideoBySlug(slug);

  if (!video) notFound();

  const related = getRelatedResearchVideos(video.slug, video.relatedSlugs);
  // Build-time SRT load — segments ship in the static HTML for SEO and power
  // the click-to-seek transcript UI. Null when no SRT exists for the slug.
  const transcriptSegments = loadTranscriptSegments(video.slug);

  // VideoObject structured data — makes the page eligible for video rich
  // results and attaches the full transcript text to the video entity.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: video.muxPlaybackId
      ? `https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg?time=0`
      : undefined,
    uploadDate: video.publishedAt,
    duration: toIsoDuration(video.durationSeconds),
    contentUrl: video.muxPlaybackId
      ? `https://stream.mux.com/${video.muxPlaybackId}.m3u8`
      : undefined,
    embedUrl: `${BASE_URL}/research/${video.slug}/`,
    transcript: transcriptSegments
      ? transcriptToPlainText(transcriptSegments)
      : undefined,
    author: {
      "@type": "Person",
      name: "Zev Uhuru",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Esy",
      url: BASE_URL,
    },
    keywords: video.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResearchVideoPageClient
        video={video}
        related={related}
        transcriptSegments={transcriptSegments}
      />
    </>
  );
}
