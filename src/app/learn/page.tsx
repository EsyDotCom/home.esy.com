import SchoolVideosClient from "./client";
import { getAllSchoolArticles } from "@/lib/published-articles";

export const metadata = {
  title: "Esy Learn — Research Workflows & AI Tools",
  description:
    "Step-by-step tutorials and courses on using Esy's workflow templates and the latest AI tools. Learn to research anything without prompt engineering.",
  keywords:
    "Esy Learn, workflow tutorials, AI tools, research workflows, Claude, ChatGPT, infographics, academic writing, essay writing",
  openGraph: {
    title: "Esy Learn — Research Workflows & AI Tools",
    description:
      "Tutorials and courses on using Esy's workflow templates and the latest AI tools.",
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
