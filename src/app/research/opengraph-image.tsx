import { renderShareCard, OG_SIZE } from "@/lib/og/shareCard";

export const alt = "Esy Research — Experiments in agentic engineering";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderShareCard({
    label: "RESEARCH",
    headline: "Experiments in agentic engineering.",
    topics: ["Agents", "Models", "Workflow Design"],
    url: "esy.com/research",
  });
}
