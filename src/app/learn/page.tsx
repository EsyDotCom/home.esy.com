import SchoolVideosClient from "./client";
import { getAllSchoolArticles } from "@/lib/published-articles";

export const metadata = {
  title: "Learn | Esy",
  description:
    "Practical tutorials for the AI solopreneur — run Esy's agentic workflow templates for research, marketing, and deliverables.",
  keywords:
    "Esy Learn, agentic workflow templates, AI solopreneur, workflow tutorials, Esy templates, artifact pipelines, Claude Code, ChatGPT",
  openGraph: {
    title: "Learn | Esy",
    description:
      "Practical tutorials for the AI solopreneur — run Esy's agentic workflow templates for research, marketing, and deliverables.",
    type: "website",
  },
};

// Event-driven: the publish/unpublish webhook purges the published-articles tags
// for instant updates. This 1-hour revalidate is just a backstop if a webhook is
// ever missed.
export const revalidate = 3600;

export default async function Page() {
  const videos = await getAllSchoolArticles();
  return <SchoolVideosClient videos={videos} />;
}
