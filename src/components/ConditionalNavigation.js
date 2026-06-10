"use client"
import { usePathname } from 'next/navigation';
import ContextAwareNavigation from "@/components/Navigation/ContextAwareNavigation";
import { useHeaderSearch } from '@/contexts/HeaderSearchContext';
import { getSearchContextFromPath } from '@/lib/searchContexts';

const ConditionalNavigation = () => {
  const pathname = usePathname();
  const { showHeaderSearch } = useHeaderSearch();
  
  // Check if we're on an essay view page (individual essay page)
  // Only hide on individual essay pages, not the essays index page
  // Handle both trailing slash (production) and no trailing slash (development) cases
  const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
    ? pathname.slice(0, -1) 
    : pathname;
  const isEssayViewPage = normalizedPath?.startsWith('/essays/') && normalizedPath !== '/essays' && normalizedPath !== '/essays/guides';
  
  // Check if we're on scrollytelling story pages (individual stories, not index)
  // These pages have their own layout with ScrollytellingHeader + ScrollytellingTheatreBar
  const isScrollytellingStoryPage = normalizedPath?.startsWith('/scrollytelling/') && normalizedPath !== '/scrollytelling';
  
  // Check if we're on the photo-essays landing page (immersive experience with own header)
  const isPhotoEssaysPage = normalizedPath === '/photo-essays';
  
  
  // Check if we're on glossary pages
  const isGlossaryPage = normalizedPath?.startsWith('/glossary');
  const isGlossaryIndex = normalizedPath === '/glossary';
  const isGlossaryViewPage = isGlossaryPage && !isGlossaryIndex;
  
  // Check if we're on school pages
  const isSchoolPage = normalizedPath?.startsWith('/school');
  const isSchoolIndex = normalizedPath === '/school';
  const isSchoolArticlePage = normalizedPath?.startsWith('/school/articles/');
  
  // Check if we're on course lesson pages (focused learning experience)
  const isCourseLessonPage = normalizedPath?.match(/^\/courses\/[^/]+\/[^/]+$/);
  
  // Check if we're on course pages (listing or lesson)
  const isCoursesPage = normalizedPath?.startsWith('/courses');
  
  // Check if we're on essays page
  const isEssaysPage = normalizedPath === '/essays';
  
  // Check if we're on templates pages
  const isTemplatesPage = normalizedPath?.startsWith('/workflows');
  const isTemplatesIndex = normalizedPath === '/workflows';
  
  // Check if we're on the homepage
  const isHomepage = normalizedPath === '' || normalizedPath === '/';
  
  // Check if we're on scrollytelling index
  const isScrollytellingIndex = normalizedPath === '/scrollytelling';
  
  // Check if we're on static info pages (always show header search)
  const isAboutPage = normalizedPath === '/about';
  const isPrivacyPage = normalizedPath === '/privacy';
  const isTermsPage = normalizedPath === '/terms';
  const isAgenticWorkflowsPage = normalizedPath === '/agentic-workflows';
  
  // Check if we're on docs pages
  const isDocsPage = normalizedPath?.startsWith('/docs');
  
  // Check if we're on agents reference pages (own sidebar navigation)
  const isAgentsPage = normalizedPath?.startsWith('/agents');
  
  // Individual infographic detail pages use their own artifact toolbar
  const isInfographicViewPage = normalizedPath?.startsWith('/infographics/') && normalizedPath !== '/infographics';

  // Individual clip-art detail pages use their own artifact toolbar
  const isClipArtViewPage = normalizedPath?.startsWith('/clip-art/') && normalizedPath !== '/clip-art';

  // Don't render navigation on:
  // - Essay view pages (focused reading)
  // - Infographic detail pages (artifact wrapper has own toolbar)
  // - Clip-art detail pages (artifact wrapper has own toolbar)
  // - Docs pages (own navigation)
  // - Agents pages (own sidebar navigation)
  // - Scrollytelling story pages (own header via ScrollytellingHeader)
  // - Photo essays landing page (immersive experience with own header)
  if (isEssayViewPage || isInfographicViewPage || isClipArtViewPage || isDocsPage || isAgentsPage || isScrollytellingStoryPage || isPhotoEssaysPage) {
    return null;
  }

  // Render the common navigation on all other pages
  // Show header search:
  // - Always on glossary view pages (/glossary/*)
  // - On glossary index only after scrolling past main search
  // - On school index only after scrolling past main search (NO search on school article pages)
  // - Always on essays index (visible on page load)
  // - On templates index only after scrolling past main search
  // - On scrollytelling index only after scrolling past discovery bar
  // - NO search on about, privacy, terms, agentic-workflows (informational pages)
  const shouldShowHeaderSearch =
    (isGlossaryPage && (isGlossaryIndex ? showHeaderSearch : true)) ||
    (isSchoolPage && !isCourseLessonPage && isSchoolIndex && showHeaderSearch) ||
    (isTemplatesPage && (isTemplatesIndex ? showHeaderSearch : true)) ||
    isEssaysPage ||  // Essays: always show search (icon-only on mobile)
    (isHomepage && showHeaderSearch);
  
  // Determine search context using centralized system
  const searchContext = getSearchContextFromPath(pathname);
  
  return <ContextAwareNavigation showHeaderSearch={shouldShowHeaderSearch} forceContext={searchContext} />;
};

export default ConditionalNavigation; 