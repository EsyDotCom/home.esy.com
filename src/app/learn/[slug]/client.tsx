"use client";

import { ArticleDetail } from "@/components/article-detail/ArticleDetail";
import { SidebarNewsletter } from "@/components/article-detail/SidebarNewsletter";
import { SchoolNewsletterBar } from "@/components/School/SchoolNewsletterBar";
import { RelatedVideos } from "@/components/School/RelatedVideos";
import type { SchoolVideo } from "@/data/school-videos";
import type { TranscriptSegment } from "@/lib/transcripts";

interface VideoPageClientProps {
  video: SchoolVideo;
  related: SchoolVideo[];
  /** Click-to-seek transcript segments (build-time SRT); null when none. */
  transcriptSegments?: TranscriptSegment[] | null;
}

// School detail page = the shared ArticleDetail template with school's section
// identity, transcript, newsletter bar, and sidebar (related + newsletter).
// Research renders the same template the same way.
export default function VideoPageClient({
  video,
  related,
  transcriptSegments,
}: VideoPageClientProps) {
  return (
    <ArticleDetail
      article={video}
      section={{ label: "Learn", basePath: "/learn" }}
      transcriptSegments={transcriptSegments}
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
