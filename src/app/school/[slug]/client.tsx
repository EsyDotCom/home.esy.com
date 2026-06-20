"use client";

import { ArticleDetail } from "@/components/article-detail/ArticleDetail";
import { SidebarNewsletter } from "@/components/article-detail/SidebarNewsletter";
import { SchoolNewsletterBar } from "@/components/School/SchoolNewsletterBar";
import { RelatedVideos } from "@/components/School/RelatedVideos";
import type { SchoolVideo } from "@/data/school-videos";

interface VideoPageClientProps {
  video: SchoolVideo;
  related: SchoolVideo[];
}

// School detail page = the shared ArticleDetail template with school's section
// identity, newsletter bar, and sidebar (related + newsletter). Research will
// adopt the same template (passing its transcript segments + research slots).
export default function VideoPageClient({ video, related }: VideoPageClientProps) {
  return (
    <ArticleDetail
      article={video}
      section={{ label: "School", basePath: "/school" }}
      newsletterBar={<SchoolNewsletterBar />}
      sidebar={
        <>
          {related.length > 0 && <RelatedVideos videos={related} />}
          <div style={{ marginTop: related.length > 0 ? "1.5rem" : 0 }}>
            <SidebarNewsletter
              apiPath="/api/newsletter/subscribe"
              heading="Stay updated"
              blurb="New tutorials and tips weekly. No spam."
            />
          </div>
        </>
      }
    />
  );
}
