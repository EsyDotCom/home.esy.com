import { renderShareCard, OG_SIZE } from "@/lib/og/shareCard";

export const alt = "Esy Learn — Practical tutorials for the AI solopreneur";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderShareCard({
    label: "LEARN",
    headline: "Practical tutorials for the AI solopreneur.",
    topics: ["Research", "Marketing", "Deliverables"],
    url: "esy.com/learn",
  });
}
