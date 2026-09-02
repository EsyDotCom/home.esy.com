import { renderShareCard, OG_SIZE } from "@/lib/og/shareCard";

export const alt = "The Marketing Engineer — engineering AI systems for modern marketing";
export const size = OG_SIZE;
export const contentType = "image/png";

// Card copy mirrors the hero's demo-first cadence so the shared image and the
// page read as one voice: output first, then the system design and business.
export default function Image() {
  return renderShareCard({
    label: "THE MARKETING ENGINEER",
    headline: "Engineering AI systems for modern marketing.",
    topics: ["Demo first", "System design", "The business"],
    url: "esy.com/engineer",
  });
}
