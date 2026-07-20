import { renderShareCard, OG_SIZE } from "@/lib/og/shareCard";

export const alt = "Esy AI Courses — Build agents and design agentic workflows";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderShareCard({
    label: "AI COURSES",
    headline: "Build agents and design agentic workflows.",
    topics: ["Agents", "Agentic Workflows", "AI Coding Tools"],
    url: "esy.com/courses",
  });
}
