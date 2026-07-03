import { OG_SIZE } from "@/lib/og/shareCard";
import { renderHomeBrandPoster } from "@/lib/og/homeBrandPoster";

// Social share card for the homepage — replaces the static
// /og/homepage.png from the essays era. The homepage is a product page,
// not a publication, so it gets the brand-poster treatment instead of
// the section-card layout; a shape-story alternative (messy pieces ->
// template -> finished work) lives in @/lib/og/homeShapeStory.

export const alt = "Esy — Agentic Workflows for the AI Solopreneur";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderHomeBrandPoster();
}
