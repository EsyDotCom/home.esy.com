import SchoolVideosClient from "./client";
import { getAllSchoolArticles } from "@/lib/published-articles";

export const metadata = {
  title: "Esy School — Learn Research Workflows & AI Tools",
  description:
    "Step-by-step tutorials and courses on using Esy's workflow templates and the latest AI tools. Learn to research anything without prompt engineering.",
  keywords:
    "Esy School, workflow tutorials, AI tools, research workflows, Claude, ChatGPT, infographics, academic writing, essay writing",
  openGraph: {
    title: "Esy School — Learn Research Workflows & AI Tools",
    description:
      "Tutorials and courses on using Esy's workflow templates and the latest AI tools.",
    type: "website",
  },
};

// ISR: re-fetch the published-article merge every 5 minutes so a Compose
// publish appears without a redeploy.
export const revalidate = 300;

export default async function Page() {
  const videos = await getAllSchoolArticles();
  return <SchoolVideosClient videos={videos} />;
}
