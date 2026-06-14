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

// Event-driven: the publish/unpublish webhook purges the published-articles tags
// for instant updates. This 1-hour revalidate is just a backstop if a webhook is
// ever missed.
export const revalidate = 3600;

export default async function Page() {
  const videos = await getAllResearchArticles();
  return <ResearchClient videos={videos} />;
}
