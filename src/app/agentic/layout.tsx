import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Agentic Engineer — Agentic Workflows That Ship Real Products",
  description:
    "Demo-first deep dives on agentic workflows that ship real digital products. Every issue opens with the artifact, then the system design behind it, the business it serves, and the engineering depth to build it yourself. Video-first with full transcripts.",
  keywords: [
    "agentic workflows",
    "agentic engineer",
    "AI agents",
    "frontier models",
    "Claude Fable 5",
    "AI coding tools",
    "Claude Code",
    "Cursor",
    "multi-agent architecture",
    "LLM orchestration",
    "workflow engine",
    "digital products",
    "solopreneur",
  ],
};

export default function AgenticLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
