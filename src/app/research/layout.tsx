import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Esy Research — Frontier Models, AI Coding Tools & Workflows",
  description:
    "Engineering deep dives on frontier model releases, AI coding tool breakdowns, agentic workflows, and the architecture behind Esy's research pipeline. Video-first content with full transcripts.",
  keywords: [
    "frontier models",
    "Claude Fable 5",
    "AI coding tools",
    "Claude Code",
    "Cursor",
    "agentic workflows",
    "multi-agent architecture",
    "LLM orchestration",
    "workflow engine",
    "research pipeline",
    "Next.js",
    "MUX video",
  ],
};

export default function ResearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
