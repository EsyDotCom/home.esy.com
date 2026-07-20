import { Metadata } from "next";
import { AgentsHubClient } from "./AgentsHubClient";

export const metadata: Metadata = {
  title: "AI Agents - Reference Guide to Agents, Workflows & Orchestration | Esy",
  description: "A comprehensive reference guide to AI agents, agentic workflows, and orchestration patterns. Learn core concepts, architecture patterns, and implementation examples.",
  keywords: "AI agents, agentic workflows, orchestration, LLM agents, agent patterns, tool use, planning, memory",
  openGraph: {
    title: "AI Agents - Reference Guide & Orchestration | Esy",
    description: "Reference guide to AI agents, agentic workflows, and orchestration patterns.",
    url: "https://esy.com/ai-agents",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agents Reference | Esy",
    description: "Reference guide to AI agents, agentic workflows, and orchestration.",
  },
  alternates: {
    canonical: "https://esy.com/ai-agents",
  },
};

export default function AgentsHubPage() {
  return <AgentsHubClient />;
}
