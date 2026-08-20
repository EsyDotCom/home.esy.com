"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from 'next/navigation';
import Logo from "@/components/Logo";
import Link from "next/link";
import { Menu, X, ArrowRight, Play, Clock } from "lucide-react";
import HeaderSearch from "@/components/HeaderSearch/HeaderSearch";
import NewsletterModal from "@/components/NewsletterModal/NewsletterModal";
import { getAllTemplates } from "@/lib/templates";
import { agenticVideos } from "@/data/agentic-videos";
import { ARTIFACT_NAV_KINDS, ARTIFACT_NAV_TOTAL } from "@/lib/nav/artifactNav";
import { getCTAConfig, getResponsiveCTAText } from "@/lib/ctaMapping";
import { lightTheme } from "@/lib/lightTheme";

/**
 * Navigation Component - Redesigned for Citation-First Platform
 * 
 * Mental model to teach:
 * - Esy is a workflow-based research platform
 * - Artifacts are outputs (Essays are a subtype)
 * - Workflows are how you create things
 * 
 * Design: Museum guide aesthetic - minimal, editorial, no heavy borders
 */

// Shared suffix logic
export const getPageSuffix = (pathname) => {
  if (pathname?.startsWith('/essays')) return 'Essays';
  // Strict match: /agentic-workflows is a separate SEO page, not the hub.
  if (pathname === '/agentic' || pathname?.startsWith('/agentic/')) return 'Agentic';
  if (pathname?.startsWith('/glossary')) return 'Glossary';
  if (pathname?.startsWith('/blog')) return 'Blog';
  return '';
};

// Latest three episodes for the Agentic nav preview — resolved at module scope
// since the registry is static. Falls back to the Mux poster frame when a video
// has no curated thumbnail.
const AGENTIC_NAV_EPISODES = [...agenticVideos]
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
  .slice(0, 3)
  .map((v) => ({
    slug: v.slug,
    title: v.title,
    categoryLabel: v.categoryLabel,
    minutes: Math.max(1, Math.round(v.durationSeconds / 60)),
    thumb:
      v.thumbnailUrl ||
      (v.muxPlaybackId
        ? `https://image.mux.com/${v.muxPlaybackId}/thumbnail.jpg?time=0&width=320`
        : ""),
  }));

// The nav's hover panels share one open slot (see openNavPanel below).
// 'workflows' is retained for the parked WorkflowsNavPanel.
type NavPanelId = 'artifacts' | 'workflows' | 'agentic';

// Hover-intent timings. The open delay is what stops a pointer sweeping across
// the nav from flickering all three panels open in sequence; it sits under the
// ~200ms where a deliberate hover starts to feel laggy. The close delay is the
// exit tolerance that lets the pointer cross the gap down into the panel.
const PANEL_OPEN_DELAY_MS = 150;
const PANEL_CLOSE_DELAY_MS = 250;

interface NavigationProps {
  showHeaderSearch?: boolean;
  searchContext?: 'templates' | 'glossary' | 'school' | 'essays' | 'scrollytelling' | 'blog' | 'general';
  pathname?: string;
}

export default function Navigation({ 
  showHeaderSearch = false, 
  searchContext = 'general',
  pathname: propPathname
}: NavigationProps = {}) {
    const hookPathname = usePathname();
    const pathname = propPathname || hookPathname;
    const [searchData, setSearchData] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
    const [modalSource, setModalSource] = useState<'nav-tips' | 'nav-school' | 'other'>('other');
    const [isLightMode, setIsLightMode] = useState(false);
    const [isNavyDark, setIsNavyDark] = useState(false); // Track navy-dark mode specifically
    // True while the nav overlaps the homepage's navy hero band — used to keep
    // links/logo light over the dark hero even though the page body is light.
    const [overHero, setOverHero] = useState(false);
  // Exactly one panel is open at a time, so a fast pointer sweep across the nav
  // can never leave two panels stacked on screen mid-close.
  const [openPanel, setOpenPanel] = useState<NavPanelId | null>(null);
  const artifactsDropdownRef = useRef<HTMLDivElement>(null);
  const agenticDropdownRef = useRef<HTMLDivElement>(null);
  const panelOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearPanelTimers = () => {
    if (panelOpenTimer.current) clearTimeout(panelOpenTimer.current);
    if (panelCloseTimer.current) clearTimeout(panelCloseTimer.current);
  };
  // Cold opens wait out the hover-intent delay; once a panel is up (or still
  // inside its close delay) switching to a sibling trigger is instant, the way
  // an OS menu bar behaves. `immediate` covers keyboard focus, always deliberate.
  const openNavPanel = (id: NavPanelId, immediate = false) => {
    clearPanelTimers();
    if (immediate || openPanel !== null) {
      setOpenPanel(id);
      return;
    }
    panelOpenTimer.current = setTimeout(() => setOpenPanel(id), PANEL_OPEN_DELAY_MS);
  };
  // Also cancels a pending open, so a pointer that leaves before the delay
  // elapses never opens anything at all.
  const closeNavPanel = (immediate = false) => {
    clearPanelTimers();
    if (immediate) { setOpenPanel(null); return; }
    panelCloseTimer.current = setTimeout(() => setOpenPanel(null), PANEL_CLOSE_DELAY_MS);
  };
  // Close when keyboard focus leaves a panel's whole subtree.
  const handlePanelBlur = (
    ref: React.RefObject<HTMLDivElement | null>,
    e: React.FocusEvent,
  ) => {
    if (!ref.current?.contains(e.relatedTarget as Node)) closeNavPanel(true);
  };
    
  // Normalize pathname
    const normalizedPathForNav = pathname?.endsWith('/') && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname || '';
    
  // Get CTA config
  const ctaConfig = getCTAConfig(pathname);
  const responsiveCTA = getResponsiveCTAText(ctaConfig.ctaText, isMobile);
  
  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Track whether the nav still overlaps the homepage's navy hero. Only the
  // homepage has a navy hero over a light body, so this is scoped there.
  useEffect(() => {
    const isHomepage = normalizedPathForNav === '/' || normalizedPathForNav === '';
    if (!isHomepage) { setOverHero(false); return; }

    const update = () => {
      const hero = document.querySelector('.ic-hero') as HTMLElement | null;
      if (!hero) { setOverHero(false); return; }
      // Flip just before the nav clears the hero so links never sit illegibly
      // on the seam between the navy hero and the light section below.
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      setOverHero(window.scrollY + 80 < heroBottom);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [normalizedPathForNav]);

  // Theme detection
    useEffect(() => {
      const checkTheme = () => {
        let isLight = false;
        let isNavyDarkMode = false;
        const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
          ? pathname.slice(0, -1) 
          : pathname || '';
        
        const isHomepage = normalizedPath === '/' || normalizedPath === '';
        const isEssaysPage = normalizedPath === '/essays' || normalizedPath.startsWith('/essays/');
        const isAboutPage = normalizedPath === '/about';
        // /agentic is the merged Learn + Research hub (The Agentic Engineer).
        const isAgenticPage = normalizedPath === '/agentic' || normalizedPath.startsWith('/agentic/');
        const isLearnArticle = normalizedPath.includes('/learn/articles/');
        const isCoursesPage = normalizedPath === '/courses' || normalizedPath.startsWith('/courses/');
        const isBlogArticle = normalizedPath.includes('/blog/') && normalizedPath !== '/blog';
        const isTemplatesPage = normalizedPath === '/workflows' || normalizedPath.startsWith('/workflows/');
        const isDocsPage = normalizedPath === '/docs' || normalizedPath.startsWith('/docs/');
        const isAgentsPage = normalizedPath === '/ai-agents' || normalizedPath.startsWith('/ai-agents/');
        const isModelsPage = normalizedPath === '/models' || normalizedPath.startsWith('/models/');
        const isContactPage = normalizedPath === '/contact';
        const isTermsPage = normalizedPath === '/terms';
        const isPrivacyPage = normalizedPath === '/privacy';
        const isGlossaryPage = normalizedPath === '/glossary' || normalizedPath.startsWith('/glossary/');
        const isInfographicsPage = normalizedPath === '/infographics' || normalizedPath.startsWith('/infographics/');
        const isClipArtPage = normalizedPath === '/clip-art' || normalizedPath.startsWith('/clip-art/');
        const isArtifactsPage = normalizedPath === '/artifacts' || normalizedPath.startsWith('/artifacts/');
        // Check for 404 page - Next.js uses various paths
        // Also check body classes as fallback since pathname might not be reliable
        const hasNotFoundBodyClass = typeof window !== 'undefined' && (
          document.body.classList.contains('not-found-light') ||
          document.body.classList.contains('not-found-dark')
        );
        const isNotFoundPage = normalizedPath === '/_not-found' || 
                               normalizedPath === '/404' || 
                               normalizedPath === '/not-found' ||
                               hasNotFoundBodyClass;
        const hasThemeToggle = isLearnArticle || isBlogArticle || isCoursesPage;
        const isLearnOrCoursesSection = isLearnArticle || isCoursesPage;
        
        // Pages that always use light theme (Navy Calm)
        const isAlwaysLightPage = isEssaysPage || isAboutPage || isAgenticPage || isTemplatesPage || isDocsPage || isAgentsPage || isContactPage || isTermsPage || isPrivacyPage || isGlossaryPage || isInfographicsPage || isClipArtPage || isArtifactsPage;
        
        // Check for homepage themes
        if (isHomepage) {
          const icPage = document.querySelector('.ic-page');
          if (icPage?.classList.contains('ic-page--light') || icPage?.classList.contains('ic-page--navy-calm')) {
            isLight = true;
          } else if (icPage?.classList.contains('ic-page--navy-dark')) {
            isLight = false;
            isNavyDarkMode = true;
          } else {
            isLight = false;
          }
        } else if (isModelsPage) {
          // Check localStorage for models page theme
          const storedTheme = localStorage.getItem('theme-models');
          if (storedTheme === 'light') {
            isLight = true;
            isNavyDarkMode = false;
          } else if (storedTheme === 'dark') {
            isLight = false;
            isNavyDarkMode = true; // Use Navy Dark theme
          } else {
            // Default to light for models pages
            isLight = true;
            isNavyDarkMode = false;
          }
          
          // Check body classes as override
          const bodyClasses = document.body.className;
          if (bodyClasses?.includes('models-light')) {
            isLight = true;
            isNavyDarkMode = false;
          } else if (bodyClasses?.includes('models-dark')) {
            isLight = false;
            isNavyDarkMode = true;
          }
        } else if (isNotFoundPage) {
          // Check localStorage for 404 page theme
          const storedTheme = localStorage.getItem('theme-404');
          if (storedTheme === 'light') {
            isLight = true;
            isNavyDarkMode = false;
          } else if (storedTheme === 'dark') {
            isLight = false;
            isNavyDarkMode = true; // Use Navy Dark theme
          } else {
            // Default to light for 404 page
            isLight = true;
            isNavyDarkMode = false;
          }
          
          // Check body classes as override
          const bodyClasses = document.body.className;
          if (bodyClasses?.includes('not-found-light')) {
            isLight = true;
            isNavyDarkMode = false;
          } else if (bodyClasses?.includes('not-found-dark')) {
            isLight = false;
            isNavyDarkMode = true;
          }
        } else if (isAlwaysLightPage) {
          // Essays and About pages always use light theme
          isLight = true;
        } else if (hasThemeToggle) {
          const sectionKey = isLearnOrCoursesSection ? 'school' : 'blog';
        const storedTheme = localStorage.getItem(`theme-${sectionKey}`);
          
          if (storedTheme === 'light') {
            isLight = true;
            isNavyDarkMode = false;
          } else if (storedTheme === 'dark') {
            isLight = false;
            isNavyDarkMode = isLearnOrCoursesSection; // Use Navy Dark for learn article pages
          } else {
          // Default: dark for courses, light for articles
          isLight = isCoursesPage ? false : true;
          isNavyDarkMode = isCoursesPage ? true : false;
          }
          
        // Check body classes as override
          const bodyClasses = document.body.className;
          const htmlClasses = document.documentElement.className;
          if (bodyClasses?.includes('light') || htmlClasses?.includes('light')) {
            isLight = true;
            isNavyDarkMode = false;
          } else if (bodyClasses?.includes('dark') || htmlClasses?.includes('dark')) {
          isLight = false;
          isNavyDarkMode = isLearnOrCoursesSection; // Use Navy Dark for learn article pages
        }
          } else {
        isLight = false;
        isNavyDarkMode = true;
      }
      
      setIsLightMode(isLight);
      setIsNavyDark(isNavyDarkMode);
      };
      
      checkTheme();
      setTimeout(() => checkTheme(), 100);
    
    // Also observe the ic-page element for class changes (homepage theme toggle)
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    // Observe ic-page for homepage theme changes
    const icPage = document.querySelector('.ic-page');
    if (icPage) {
      observer.observe(icPage, { attributes: true, attributeFilter: ['class'] });
    }
    
    // Listen for theme change events from school article pages
    const handleThemeChange = () => {
      checkTheme();
    };
    window.addEventListener('themechange', handleThemeChange);
    
      return () => {
        observer.disconnect();
        window.removeEventListener('themechange', handleThemeChange);
        window.removeEventListener('themechange', checkTheme);
      };
    }, [pathname]);

  // Load search data
    useEffect(() => {
      if (showHeaderSearch) {
        if (searchContext === 'glossary') {
          fetch('/glossary-terms.json')
            .then(res => res.json())
          .then(setSearchData)
            .catch(console.error);
        } else if (searchContext === 'templates') {
          const templates = getAllTemplates().map(t => ({
          id: t.slug, slug: t.slug, title: t.title,
          description: t.description, category: t.category,
          }));
          setSearchData(templates);
        } else if (searchContext === 'essays') {
          fetch('/essays-data.json')
            .then(res => res.json())
          .then(setSearchData)
            .catch(console.error);
        }
      }
    }, [showHeaderSearch, searchContext]);

  // Scroll handler for nav background
    useEffect(() => {
      const handleScroll = () => {
        const nav = document.getElementById('nav');
      if (!nav) return;
        
        const navInner = nav.querySelector('.nav-inner');
        const scrollY = window.scrollY;
        const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
          ? pathname.slice(0, -1) 
          : pathname || '';
        
        const isHomepage = normalizedPath === '/' || normalizedPath === '';
        const isBlogIndexPage = normalizedPath === '/blog';
        const isScrollytellingPage = normalizedPath?.startsWith('/scrollytelling');
        const shouldBeTransparent = (isHomepage && !isLightMode) || isBlogIndexPage || isScrollytellingPage;
        
        // Navy Dark specific colors
        const navyDarkBg = 'rgba(10, 37, 64, 0.98)';
        const navyDarkBorder = 'rgba(0, 212, 170, 0.15)';

        // Homepage hero is a navy band even though the body is light. While the
        // nav overlaps it, render the dark-hero treatment (transparent → navy)
        // instead of the light-body white, so light links stay legible.
        const hero = isHomepage ? (document.querySelector('.ic-hero') as HTMLElement | null) : null;
        const overHeroNow = hero ? scrollY + 80 < hero.offsetTop + hero.offsetHeight : false;
        if (overHeroNow) {
          if (scrollY < 8) {
            nav.style.background = 'transparent';
            nav.style.boxShadow = 'none';
            nav.style.borderBottom = 'none';
            nav.style.backdropFilter = 'none';
          } else {
            const p = Math.min(scrollY / 80, 1);
            nav.style.background = `rgba(10, 37, 64, ${0.92 * p})`;
            nav.style.boxShadow = scrollY > 50 ? '0 2px 8px rgba(0, 0, 0, 0.35)' : 'none';
            nav.style.borderBottom = `1px solid rgba(0, 212, 170, ${0.16 * p})`;
            nav.style.backdropFilter = `blur(${20 * p}px)`;
          }
          if (navInner) (navInner as HTMLElement).style.textShadow = 'none';
          return;
        }
        
        if (scrollY === 0) {
          if (shouldBeTransparent) {
            nav.style.background = 'transparent';
            nav.style.boxShadow = 'none';
            nav.style.borderBottom = 'none';
            nav.style.backdropFilter = 'none';
            if (navInner) {
            (navInner as HTMLElement).style.textShadow = 'none';
            }
          } else if (isHomepage && isLightMode) {
            // Homepage light mode - warm cream transparent
            nav.style.background = 'transparent';
            nav.style.boxShadow = 'none';
            nav.style.borderBottom = 'none';
            nav.style.backdropFilter = 'none';
            if (navInner) {
              (navInner as HTMLElement).style.textShadow = 'none';
            }
          } else {
            if (isLightMode) {
              nav.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 250, 0.95) 100%)';
              nav.style.boxShadow = lightTheme.shadows?.sm || '0 1px 3px rgba(0, 0, 0, 0.06)';
              nav.style.borderBottom = `1px solid ${lightTheme.border}`;
            } else if (isNavyDark) {
              nav.style.background = 'linear-gradient(180deg, rgba(10, 37, 64, 0.95) 0%, rgba(6, 21, 39, 0.85) 100%)';
              nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.3)';
              nav.style.borderBottom = `1px solid ${navyDarkBorder}`;
            } else {
              nav.style.background = 'linear-gradient(180deg, rgba(31, 31, 35, 0.95) 0%, rgba(24, 24, 27, 0.85) 100%)';
              nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
              nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            }
            nav.style.backdropFilter = 'blur(20px)';
        }
      } else if (scrollY > 50) {
          if (isBlogIndexPage || (!isLightMode && !isHomepage && !isNavyDark)) {
          nav.style.background = 'rgba(24, 24, 27, 0.98)';
          nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else if (isLightMode) {
            // Light mode scrolled - clean white
            nav.style.background = 'rgba(250, 250, 250, 0.98)';
            nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
            nav.style.borderBottom = '1px solid rgba(0, 0, 0, 0.06)';
          } else if (isNavyDark) {
            // Navy Dark scrolled
            nav.style.background = navyDarkBg;
            nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.4)';
            nav.style.borderBottom = `1px solid ${navyDarkBorder}`;
        } else {
            nav.style.background = 'rgba(24, 24, 27, 0.98)';
            nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
          }
          nav.style.backdropFilter = 'blur(20px) saturate(150%)';
      } else {
        // Transition zone
        const progress = scrollY / 50;
        if (shouldBeTransparent) {
          if (isNavyDark) {
            nav.style.background = `rgba(10, 37, 64, ${progress * 0.95})`;
          } else {
          nav.style.background = `rgba(31, 31, 35, ${progress * 0.85})`;
          }
          nav.style.backdropFilter = `blur(${progress * 20}px)`;
        } else if (isHomepage && isLightMode) {
          // Homepage light mode transition - clean white
          nav.style.background = `rgba(250, 250, 250, ${progress * 0.98})`;
          nav.style.backdropFilter = `blur(${progress * 20}px)`;
        }
      }
    };
    
        handleScroll();
      window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname, isLightMode, isNavyDark]);

  // Dismiss the open panel on an outside press (touch/click users never fire
  // mouseleave) and on Escape, which the hover-only version never handled.
  useEffect(() => {
    if (!openPanel) return;
    const containers = [artifactsDropdownRef, agenticDropdownRef];
    const handlePressOutside = (e: MouseEvent) => {
      if (containers.every((ref) => !ref.current?.contains(e.target as Node))) {
        closeNavPanel(true);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeNavPanel(true);
    };
    document.addEventListener('mousedown', handlePressOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePressOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [openPanel]);

  // Don't leave pending open/close timers behind on unmount.
  useEffect(
    () => () => {
      if (panelOpenTimer.current) clearTimeout(panelOpenTimer.current);
      if (panelCloseTimer.current) clearTimeout(panelCloseTimer.current);
    },
    [],
  );
  
    // Over the navy hero (or any non-light page), the nav shows light links and
    // the light logo; over the light body it reverts to dark-on-light.
    const navOnDark = !isLightMode || overHero;

    return (
      <>
      <nav className={`nav ${!navOnDark ? 'nav--light' : ''}`} id="nav">
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="logo">
            <Logo
              suffix=""
              href=""
              wordmarkOnly
              animatedE
              wordmarkFont="blackops" // swap to "zcool" or "noto" to compare
              theme={!navOnDark ? 'light' : isNavyDark ? 'navy-dark' : 'dark'}
              size={isMobile ? 36 : 60}
              priority
            />
          </Link>
          
          {/* Header Search */}
          {showHeaderSearch && (
            <HeaderSearch 
              prompts={searchData} 
              className="header-search"
              searchContext={searchContext}
              isLightMode={isLightMode}
            />
          )}
          
          {/* Desktop Navigation */}
          <div className="nav-links">
            {/* Artifacts — preview panel for the gallery. Rows carry a real
                thumbnail and live count per artifact kind, so the panel shows
                the work instead of describing it. */}
            <div 
              className="nav-dropdown-container"
              ref={artifactsDropdownRef}
              onMouseEnter={() => openNavPanel('artifacts')}
              onMouseLeave={() => closeNavPanel()}
              onBlur={(e) => handlePanelBlur(artifactsDropdownRef, e)}
              >
              <Link
                href="/artifacts/"
                className={`nav-dropdown-trigger ${openPanel === 'artifacts' ? 'active' : ''} ${pathname === '/artifacts' || pathname?.startsWith('/artifacts/') ? 'active' : ''}`}
                aria-expanded={openPanel === 'artifacts'}
                onFocus={() => openNavPanel('artifacts', true)}
                onClick={() => closeNavPanel(true)}
                style={{
                  color: !navOnDark ? '#475569' : 'rgba(255, 255, 255, 0.85)',
                  textDecoration: 'none',
                }}
              >
                <span>Artifacts</span>
              </Link>

              <div
                className={`nav-panel nav-artifacts-dropdown ${openPanel === 'artifacts' ? 'open' : ''}`}
                aria-label="Artifacts"
              >
                {/* Left rail — what the gallery is, plus the live total */}
                <div className="nav-panel-rail">
                  <span className="nav-panel-eyebrow">Artifact Gallery</span>
                  <p className="nav-panel-tagline">
                    Finished work from Esy workflows. Every piece shows exactly
                    how it was made.
                  </p>
                  <span className="nav-panel-stat">
                    <strong>{ARTIFACT_NAV_TOTAL}</strong> published pieces
                  </span>
                  <Link
                    href="/artifacts/"
                    className="nav-panel-cta"
                    onClick={() => closeNavPanel(true)}
                  >
                    Browse the gallery
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>

                {/* Right — one row per artifact kind, thumbnail + live count */}
                <div className="nav-panel-column">
                  <span className="nav-panel-label">By form</span>
                  {ARTIFACT_NAV_KINDS.map((kind, i) => (
                    <Link
                      key={kind.id}
                      href={kind.href}
                      className="nav-panel-row nav-artifact-row"
                      style={{ transitionDelay: openPanel === 'artifacts' ? `${60 + i * 45}ms` : '0ms' }}
                      onClick={() => closeNavPanel(true)}
                    >
                      <span className="nav-artifact-row__thumb">
                        {kind.thumb && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={kind.thumb} alt="" loading="lazy" />
                        )}
                      </span>
                      <span className="nav-artifact-row__body">
                        <span className="nav-artifact-row__title">{kind.label}</span>
                        <span className="nav-artifact-row__desc">{kind.desc}</span>
                      </span>
                      <span className="nav-artifact-row__count">{kind.count}</span>
                    </Link>
                  ))}
                  <Link
                    href="/artifacts/"
                    className="nav-panel-all"
                    onClick={() => closeNavPanel(true)}
                  >
                    All artifacts
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Workflows stays a direct link, not a panel: /workflows is the
                site's primary destination and its own browse surface, and the
                category taxonomy a panel would show is thinner than the live
                catalog behind it. Parked panel: Home/WorkflowsNavPanel.tsx. */}
            {!isMobile && (
              <Link
                href="/workflows/"
                className={`nav-link nav-link-templates ${pathname?.startsWith('/workflows') ? 'active' : ''}`}
                style={{
                  color: !navOnDark ? 'rgba(10, 37, 64, 0.7)' : 'rgba(255, 255, 255, 0.85)',
                  textShadow: 'none',
                }}
              >
                Workflows
              </Link>
            )}

            {/* Agentic — content-rich preview panel for the /agentic hub.
                The trigger still navigates; hovering opens a mega-dropdown that
                shows the series identity and the latest episodes with real
                thumbnails, so users see the page's content before clicking. */}
            {!isMobile && (
              <div
                className="nav-dropdown-container"
                ref={agenticDropdownRef}
                onMouseEnter={() => openNavPanel('agentic')}
                onMouseLeave={() => closeNavPanel()}
                onBlur={(e) => handlePanelBlur(agenticDropdownRef, e)}
              >
                <Link
                  href="/agentic/"
                  className={`nav-dropdown-trigger ${openPanel === 'agentic' ? 'active' : ''} ${pathname === '/agentic' || pathname?.startsWith('/agentic/') ? 'active' : ''}`}
                  aria-expanded={openPanel === 'agentic'}
                  onFocus={() => openNavPanel('agentic', true)}
                  onClick={() => closeNavPanel(true)}
                  style={{
                    color: !navOnDark ? '#475569' : 'rgba(255, 255, 255, 0.85)',
                    textDecoration: 'none',
                  }}
                >
                  <span>Agentic</span>
                </Link>

                <div
                  className={`nav-panel nav-agentic-dropdown ${openPanel === 'agentic' ? 'open' : ''}`}
                  aria-label="Agentic"
                >
                  {/* Left rail — who/what the hub is */}
                  <div className="nav-agentic-rail">
                    <span className="nav-agentic-eyebrow">The Agentic Engineer</span>
                    <p className="nav-agentic-tagline">
                      Workflow demos, model research, and system design — from
                      the engineer running Esy in production.
                    </p>
                    <div className="nav-agentic-byline">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/zev-uhuru.png" alt="" className="nav-agentic-avatar" />
                      <div className="nav-agentic-byline-text">
                        <span className="nav-agentic-byline-name">Zev Uhuru</span>
                        <span className="nav-agentic-byline-role">Marketing Engineer</span>
                      </div>
                    </div>
                    <Link
                      href="/agentic/"
                      className="nav-agentic-rail-cta"
                      onClick={() => closeNavPanel(true)}
                    >
                      Visit the hub
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>

                  {/* Right — latest episodes with live thumbnails */}
                  <div className="nav-agentic-episodes">
                    <span className="nav-agentic-episodes-label">Latest episodes</span>
                    {AGENTIC_NAV_EPISODES.map((ep, i) => (
                      <Link
                        key={ep.slug}
                        href={`/agentic/${ep.slug}/`}
                        className="nav-agentic-episode"
                        style={{ transitionDelay: openPanel === 'agentic' ? `${60 + i * 45}ms` : '0ms' }}
                        onClick={() => closeNavPanel(true)}
                      >
                        <span className="nav-agentic-thumb">
                          {ep.thumb && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={ep.thumb} alt="" loading="lazy" />
                          )}
                          <span className="nav-agentic-thumb-play">
                            <Play size={11} fill="currentColor" aria-hidden="true" />
                          </span>
                        </span>
                        <span className="nav-agentic-episode-body">
                          <span className="nav-agentic-episode-title">{ep.title}</span>
                          <span className="nav-agentic-episode-meta">
                            <span className="nav-agentic-episode-cat">{ep.categoryLabel}</span>
                            <span className="nav-agentic-episode-dot" aria-hidden="true" />
                            <Clock size={11} aria-hidden="true" />
                            {ep.minutes} min
                          </span>
                        </span>
                      </Link>
                    ))}
                    <Link
                      href="/agentic/"
                      className="nav-agentic-all"
                      onClick={() => closeNavPanel(true)}
                    >
                      All episodes
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* App CTA (hidden on mobile, available in hamburger menu) */}
            {!isMobile && (
              <a 
                href={ctaConfig.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
                className="nav-cta-muted"
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: !navOnDark ? '#6b7280' : 'rgba(255, 255, 255, 0.6)',
                  background: 'transparent',
                  border: !navOnDark ? '1px solid #e5e7eb' : '1px solid rgba(255, 255, 255, 0.15)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = !navOnDark ? '#374151' : 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.borderColor = !navOnDark ? '#d1d5db' : 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = !navOnDark ? '#6b7280' : 'rgba(255, 255, 255, 0.6)';
                  e.currentTarget.style.borderColor = !navOnDark ? '#e5e7eb' : 'rgba(255, 255, 255, 0.15)';
                }}
              >
              App
              </a>
            )}

            {/* Mobile Menu Button */}
              <button
                className="mobile-menu-button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                style={{ color: !navOnDark ? '#1e293b' : '#ffffff' }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation — Full-Screen Editorial Takeover */}
      {isMobileMenuOpen && (
        <div 
          className={`mnav-overlay ${isLightMode ? 'mnav-overlay--light' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Header row — logo + close */}
          <div className="mnav-header">
            <Link href="/" className="mnav-logo" onClick={() => setIsMobileMenuOpen(false)}>
              <Logo
                suffix=""
                href=""
                wordmarkOnly
                animatedE
                wordmarkFont="blackops"
                theme={isLightMode ? 'light' : 'dark'}
                size={36}
                priority
              />
            </Link>
            <button 
              className="mnav-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="mnav-body">
            <Link
              href="/artifacts/"
              className={`mnav-item ${normalizedPathForNav.startsWith('/artifacts') ? 'mnav-item--active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: '0.04s' }}
            >
              <span className="mnav-item__label">Artifacts</span>
              <span className="mnav-item__desc">Essays, infographics, clip art</span>
            </Link>

            <Link 
              href="/essays/" 
              className={`mnav-item ${normalizedPathForNav.startsWith('/essays') ? 'mnav-item--active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: '0.06s' }}
            >
              <span className="mnav-item__label">Essays</span>
              <span className="mnav-item__desc">Visual research narratives</span>
            </Link>

            <Link 
              href="/infographics/" 
              className={`mnav-item ${normalizedPathForNav.startsWith('/infographics') ? 'mnav-item--active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: '0.08s' }}
            >
              <span className="mnav-item__label">Infographics</span>
              <span className="mnav-item__desc">Citation-verified visual data</span>
            </Link>

            <Link
              href="/clip-art/"
              className={`mnav-item ${normalizedPathForNav.startsWith('/clip-art') ? 'mnav-item--active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: '0.10s' }}
            >
              <span className="mnav-item__label">Clip Art</span>
              <span className="mnav-item__desc">Isolated visual assets, generated &amp; reviewed</span>
            </Link>

            <Link 
              href="/workflows/" 
              className={`mnav-item ${normalizedPathForNav.startsWith('/workflows') ? 'mnav-item--active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: '0.12s' }}
            >
              <span className="mnav-item__label">Workflows</span>
              <span className="mnav-item__desc">Production-ready research formats</span>
            </Link>

            <Link
              href="/agentic/"
              className={`mnav-item ${normalizedPathForNav === '/agentic' || normalizedPathForNav.startsWith('/agentic/') ? 'mnav-item--active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: '0.16s' }}
            >
              <span className="mnav-item__label">Agentic</span>
              <span className="mnav-item__desc">The Agentic Engineer — workflows, demos &amp; system design</span>
            </Link>
          </nav>

          {/* Footer — CTA */}
          <div className="mnav-footer" style={{ animationDelay: '0.26s' }}>
            <a 
              href={ctaConfig.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mnav-cta"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Open App
            </a>
          </div>
        </div>
      )}
      
      {/* Newsletter Modal */}
      <NewsletterModal 
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
        source={modalSource}
      />
    </>
    );
}
