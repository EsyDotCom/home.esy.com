import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Marketing Engineer — Engineering AI Systems for Modern Marketing",
  description:
    "AI, automation, data, and software for modern marketing — built on real products, then broken down step by step.",
  keywords: [
    "marketing engineering",
    "AI marketing production",
    "marketing engineer",
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
