import { notFound } from "next/navigation";
import { getPublishedAgenticVideos } from "@/data/agentic-videos";
import {
  findAgenticArticle,
  getAllAgenticArticles,
  relatedFrom,
} from "@/lib/published-articles";
import { loadTranscriptSegments } from "@/lib/transcript-loader";
import { transcriptToPlainText, toIsoDuration } from "@/lib/transcripts";
import AgenticVideoPageClient from "./client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

const BASE_URL = "https://esy.com";

// Registry slugs prerender at build; Compose-published slugs render on demand
// (dynamicParams). Freshness is driven by the publish/unpublish webhook (tag +
// path revalidation); this 1-hour revalidate is only a backstop.
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getPublishedAgenticVideos().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = await findAgenticArticle(slug);

  if (!video) return {};

  const ogImage = video.muxPlaybackId
    ? `https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg?time=0`
    : undefined;

  return {
    title: `${video.title} — The Agentic Engineer`,
    description: video.description.slice(0, 160),
    alternates: {
      canonical: `${BASE_URL}/agentic/${video.slug}/`,
    },
    openGraph: {
      title: video.title,
      description: video.description.slice(0, 160),
      type: "video.other",
      url: `${BASE_URL}/agentic/${video.slug}/`,
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

export default async function AgenticVideoPage({ params }: Props) {
  const { slug } = await params;
  const video = await findAgenticArticle(slug);

  if (!video) notFound();

  // Related resolves against the merged list so API and registry articles
  // can cross-reference each other.
  const related = relatedFrom(await getAllAgenticArticles(), video.slug, video.relatedSlugs);
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
    embedUrl: `${BASE_URL}/agentic/${video.slug}/`,
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
      <AgenticVideoPageClient
        video={video}
        related={related}
        transcriptSegments={transcriptSegments}
      />
    </>
  );
}
