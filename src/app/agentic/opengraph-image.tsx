import { renderShareCard, OG_SIZE } from "@/lib/og/shareCard";

export const alt = "The Agentic Engineer — agentic workflows that ship real products";
export const size = OG_SIZE;
export const contentType = "image/png";

// Card copy mirrors the hero's demo-first cadence so the shared image and the
// page read as one voice: output first, then the system design and business.
export default function Image() {
  return renderShareCard({
    label: "THE AGENTIC ENGINEER",
    headline: "Agentic workflows that ship real products.",
    topics: ["Demo first", "System design", "The business"],
    url: "esy.com/agentic",
  });
}
