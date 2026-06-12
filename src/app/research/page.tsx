import ResearchClient from "./client";
import { getAllResearchArticles } from "@/lib/published-articles";

export const metadata = {
  title: "Esy Research — Frontier Models, AI Coding Tools & Workflows",
  description:
    "Engineering deep dives on frontier model releases, AI coding tool breakdowns, agentic workflows, and the architecture behind Esy's research pipeline.",
  keywords:
    "Esy Research, frontier models, Claude Fable 5, AI coding tools, Claude Code, Cursor, agentic workflows, multi-agent architecture, workflow engine",
  openGraph: {
    title: "Esy Research — Frontier Models, AI Coding Tools & Workflows",
    description:
      "Engineering deep dives and AI tool breakdowns from the team building Esy.",
    type: "website",
  },
};

// ISR: re-fetch the published-article merge every 5 minutes so a Compose
// publish appears without a redeploy.
export const revalidate = 300;

export default async function Page() {
  const videos = await getAllResearchArticles();
  return <ResearchClient videos={videos} />;
}
