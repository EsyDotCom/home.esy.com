import { notFound } from "next/navigation";
import { getPublishedVideos } from "@/data/school-videos";
import {
  findSchoolArticle,
  getAllSchoolArticles,
  relatedFrom,
} from "@/lib/published-articles";
import VideoPageClient from "./client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// Registry slugs prerender at build; Compose-published slugs render on
// demand (dynamicParams) and cache via ISR.
export const revalidate = 300;
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
    title: `${video.title} — Esy School`,
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

  return <VideoPageClient video={video} related={related} />;
}
