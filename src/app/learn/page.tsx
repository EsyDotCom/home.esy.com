import SchoolVideosClient from "./client";
import { getAllSchoolArticles } from "@/lib/published-articles";

export const metadata = {
  title: "Esy Learn — Agentic Workflow Tutorials",
  description:
    "Step-by-step tutorials on implementing agentic workflows with Esy's workflow templates and the latest AI tools.",
  keywords:
    "Esy Learn, agentic workflows, workflow tutorials, AI tools, Claude, ChatGPT, workflow templates, artifact pipelines",
  openGraph: {
    title: "Esy Learn — Agentic Workflow Tutorials",
    description:
      "Step-by-step tutorials on implementing agentic workflows with Esy's templates and the latest AI tools.",
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
