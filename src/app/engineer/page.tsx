import AgenticClient from "./client";
import { getAllAgenticArticles } from "@/lib/published-articles";

export const metadata = {
  title: "The Marketing Engineer — Engineering AI Systems for Modern Marketing",
  description:
    "Demo-first deep dives on agentic workflows that ship real digital products. Every issue opens with the artifact, then the system design behind it, the business it serves, and the engineering depth to build it yourself.",
  keywords:
    "The Marketing Engineer, marketing engineering, AI marketing production, AI agents, frontier models, Claude Code, Cursor, multi-agent architecture, workflow engine, digital products, solopreneur",
  alternates: {
    canonical: "/engineer/",
  },
  openGraph: {
    title: "The Marketing Engineer",
    description:
      "Demo-first deep dives on AI production systems for modern marketing — the output, the system design, and the business behind it.",
    url: "https://esy.com/engineer/",
    siteName: "Esy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Marketing Engineer",
    description:
      "Demo-first deep dives on AI production systems for modern marketing — the output, the system design, and the business behind it.",
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
