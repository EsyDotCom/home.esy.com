import AgenticClient from "./client";
import { getAllAgenticArticles } from "@/lib/published-articles";

export const metadata = {
  title: "The Agentic Engineer — Agentic Workflows That Ship Real Products",
  description:
    "Demo-first deep dives on agentic workflows that ship real digital products. Every issue opens with the artifact, then the system design behind it, the business it serves, and the engineering depth to build it yourself.",
  keywords:
    "The Agentic Engineer, agentic workflows, AI agents, frontier models, Claude Code, Cursor, multi-agent architecture, workflow engine, digital products, solopreneur",
  alternates: {
    canonical: "/agentic/",
  },
  openGraph: {
    title: "The Agentic Engineer",
    description:
      "Demo-first deep dives on agentic workflows that ship real digital products — the output, the system design, and the business behind it.",
    url: "https://esy.com/agentic/",
    siteName: "Esy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Agentic Engineer",
    description:
      "Demo-first deep dives on agentic workflows that ship real digital products — the output, the system design, and the business behind it.",
  },
};

// Event-driven: the publish/unpublish webhook purges the published-articles tags
// for instant updates. This 1-hour revalidate is just a backstop if a webhook is
// ever missed.
export const revalidate = 3600;

export default async function Page() {
  const videos = await getAllAgenticArticles();
  return <AgenticClient videos={videos} />;
}
