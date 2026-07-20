"use client"
import { usePathname } from 'next/navigation';
import Footer from "@/components/Home/footer";
import CopyrightFooter from "@/components/CopyrightFooter";

const ConditionalFooter = () => {
  const pathname = usePathname();
  
  // Handle both trailing slash (production) and no trailing slash (development) cases
  const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
    ? pathname.slice(0, -1) 
    : pathname;
  
  // Check if we're on an essay view page (individual essay page)
  // Only hide on individual essay pages, not the essays index page
  const isEssayViewPage = normalizedPath?.startsWith('/essays/') && normalizedPath !== '/essays';
  
  // Don't render the common footer on essay view pages for a focused reading experience
  if (isEssayViewPage) {
    return null;
  }
  
  // Individual infographic detail pages use their own artifact wrapper
  const isInfographicViewPage = normalizedPath?.startsWith('/infographics/') && normalizedPath !== '/infographics';
  if (isInfographicViewPage) {
    return null;
  }

  // Individual clip-art detail pages use their own artifact wrapper
  const isClipArtViewPage = normalizedPath?.startsWith('/clip-art/') && normalizedPath !== '/clip-art';
  if (isClipArtViewPage) {
    return null;
  }
  
  // Check if we're on docs pages (they handle their own footer via DocsPageNav)
  const isDocsPage = normalizedPath?.startsWith('/docs');
  if (isDocsPage) {
    return null;
  }
  
  // Check if we're on agents reference pages (they have their own sidebar/CTA)
  const isAgentsPage = normalizedPath?.startsWith('/ai-agents');
  if (isAgentsPage) {
    return null;
  }
  
  // Check if we're on scrollytelling story pages (individual stories, not index)
  // These pages have their own footer via ScrollytellingTheatreBar
  const isScrollytellingStoryPage = normalizedPath?.startsWith('/scrollytelling/') && normalizedPath !== '/scrollytelling';
  if (isScrollytellingStoryPage) {
    return null;
  }
  
  // Check if we're on the photo-essays landing page (immersive experience with own footer)
  const isPhotoEssaysPage = normalizedPath === '/photo-essays';
  if (isPhotoEssaysPage) {
    return null;
  }
  
  // Check if we're on course lesson pages (focused learning experience, no footer)
  const isCourseLessonPage = normalizedPath?.match(/^\/courses\/[^/]+\/[^/]+$/);
  if (isCourseLessonPage) {
    return null;
  }
  
  // Render the common footer on all other pages (including homepage)
  return <Footer />;
};

export default ConditionalFooter; 