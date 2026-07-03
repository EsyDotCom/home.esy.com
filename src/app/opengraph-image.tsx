import { renderShareCard, OG_SIZE } from "@/lib/og/shareCard";

// Social share card for the homepage — replaces the static
// /og/homepage.png from the essays era.

export const alt = "Esy — Agentic Workflows for the AI Solopreneur";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderShareCard({
    headline: "Messy pieces in. Finished work out.",
    topics: ["Agentic Workflows", "Batch Generation", "Cost Tracking"],
    url: "esy.com",
  });
}
