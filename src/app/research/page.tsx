import ResearchClient from "./client";

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

export default function Page() {
  return <ResearchClient />;
}
