"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from 'next/navigation';
import Logo from "@/components/Logo";
import Link from "next/link";
import { Menu, X, ChevronRight, ArrowRight } from "lucide-react";
import HeaderSearch from "@/components/HeaderSearch/HeaderSearch";
import NewsletterModal from "@/components/NewsletterModal/NewsletterModal";
import { getAllPrompts } from "@/lib/prompts";
import { getAllTemplates } from "@/lib/templates";
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
  if (pathname?.startsWith('/school')) return 'School';
  if (pathname?.startsWith('/glossary')) return 'Glossary';
  if (pathname?.startsWith('/blog')) return 'Blog';
  if (pathname?.startsWith('/research')) return 'Research';
  return '';
};

interface NavigationProps {
  showHeaderSearch?: boolean;
  searchContext?: 'prompt-library' | 'templates' | 'glossary' | 'school' | 'essays' | 'scrollytelling' | 'blog' | 'general';
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
  const [isArtifactsOpen, setIsArtifactsOpen] = useState(false);
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const [mobileArtifactsExpanded, setMobileArtifactsExpanded] = useState(false);
  const [mobileLearnExpanded, setMobileLearnExpanded] = useState(false);
  const artifactsDropdownRef = useRef<HTMLDivElement>(null);
  const learnDropdownRef = useRef<HTMLDivElement>(null);
    
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
        const isSchoolPage = normalizedPath === '/school' || normalizedPath.startsWith('/school/');
        const isSchoolArticle = normalizedPath.includes('/school/articles/');
        const isCoursesPage = normalizedPath === '/courses' || normalizedPath.startsWith('/courses/');
        const isBlogArticle = normalizedPath.includes('/blog/') && normalizedPath !== '/blog';
        const isTemplatesPage = normalizedPath === '/workflows' || normalizedPath.startsWith('/workflows/');
        const isDocsPage = normalizedPath === '/docs' || normalizedPath.startsWith('/docs/');
        const isAgentsPage = normalizedPath === '/agents' || normalizedPath.startsWith('/agents/');
        const isModelsPage = normalizedPath === '/models' || normalizedPath.startsWith('/models/');
        const isContactPage = normalizedPath === '/contact';
        const isTermsPage = normalizedPath === '/terms';
        const isPrivacyPage = normalizedPath === '/privacy';
        const isGlossaryPage = normalizedPath === '/glossary' || normalizedPath.startsWith('/glossary/');
        const isResearchPage = normalizedPath === '/research' || normalizedPath.startsWith('/research/');
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
        const hasThemeToggle = isSchoolArticle || isBlogArticle || isCoursesPage;
        const isSchoolOrCoursesSection = isSchoolArticle || isCoursesPage;
        
        // Pages that always use light theme (Navy Calm)
        const isAlwaysLightPage = isEssaysPage || isAboutPage || isSchoolPage || isTemplatesPage || isDocsPage || isAgentsPage || isContactPage || isTermsPage || isPrivacyPage || isGlossaryPage || isResearchPage || isInfographicsPage || isClipArtPage || isArtifactsPage;
        
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
          const sectionKey = isSchoolOrCoursesSection ? 'school' : 'blog';
        const storedTheme = localStorage.getItem(`theme-${sectionKey}`);
          
          if (storedTheme === 'light') {
            isLight = true;
            isNavyDarkMode = false;
          } else if (storedTheme === 'dark') {
            isLight = false;
            isNavyDarkMode = isSchoolOrCoursesSection; // Use Navy Dark for school pages
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
          isNavyDarkMode = isSchoolOrCoursesSection; // Use Navy Dark for school pages
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
        if (searchContext === 'prompt-library') {
          getAllPrompts().then(setSearchData).catch(console.error);
        } else if (searchContext === 'glossary') {
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

  // Toggle dropdown and close the other (Learn dropdown only — Artifacts opens on hover via mouseEnter)
  const toggleLearn = useCallback(() => {
    setIsLearnOpen(prev => !prev);
    setIsArtifactsOpen(false);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        artifactsDropdownRef.current && !artifactsDropdownRef.current.contains(e.target as Node) &&
        learnDropdownRef.current && !learnDropdownRef.current.contains(e.target as Node)
      ) {
        setIsArtifactsOpen(false);
        setIsLearnOpen(false);
      } else if (artifactsDropdownRef.current && !artifactsDropdownRef.current.contains(e.target as Node)) {
      setIsArtifactsOpen(false);
      } else if (learnDropdownRef.current && !learnDropdownRef.current.contains(e.target as Node)) {
        setIsLearnOpen(false);
      }
  };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
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
            {/* Artifacts Dropdown */}
            <div 
              className="nav-dropdown-container"
              ref={artifactsDropdownRef}
              onMouseEnter={() => {
                setIsArtifactsOpen(true);
                setIsLearnOpen(false);
              }}
              onMouseLeave={() => setIsArtifactsOpen(false)}
              >
              <Link
                href="/artifacts/"
                className={`nav-dropdown-trigger ${isArtifactsOpen ? 'active' : ''} ${pathname === '/artifacts' || pathname?.startsWith('/artifacts/') ? 'active' : ''}`}
                aria-expanded={isArtifactsOpen}
                aria-haspopup="true"
                onClick={() => setIsArtifactsOpen(false)}
                style={{
                  color: !navOnDark ? '#475569' : 'rgba(255, 255, 255, 0.85)',
                  textDecoration: 'none',
                }}
              >
                <span>Artifacts</span>
              </Link>

                <div 
                className={`nav-artifacts-dropdown ${isArtifactsOpen ? 'open' : ''}`}
                  role="menu"
                >
                  <div className="nav-artifacts-list">
                    <Link 
                      href="/essays/" 
                      className="nav-artifact-item"
                      onClick={() => setIsArtifactsOpen(false)}
                    >
                      <div className="nav-artifact-content">
                        <span className="nav-artifact-title">Essays</span>
                        <span className="nav-artifact-desc">Visual research narratives</span>
                      </div>
                    </Link>
                    <Link 
                      href="/infographics/" 
                      className="nav-artifact-item"
                      onClick={() => setIsArtifactsOpen(false)}
                    >
                      <div className="nav-artifact-content">
                        <span className="nav-artifact-title">Infographics</span>
                        <span className="nav-artifact-desc">Citation-verified visual data</span>
                      </div>
                    </Link>
                    <Link
                      href="/clip-art/"
                      className="nav-artifact-item"
                      onClick={() => setIsArtifactsOpen(false)}
                    >
                      <div className="nav-artifact-content">
                        <span className="nav-artifact-title">Clip Art</span>
                        <span className="nav-artifact-desc">Isolated visual assets, generated &amp; reviewed</span>
                      </div>
                    </Link>
                  </div>
                  <div className="nav-artifacts-footer">
                    <Link
                      href="/artifacts/"
                      className="nav-artifacts-footer-link"
                      onClick={() => setIsArtifactsOpen(false)}
                    >
                      All artifacts
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
            </div>

            {/* Templates (hidden on mobile, available in hamburger menu) */}
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

            {/* Research (hidden on mobile, available in hamburger menu) */}
            {!isMobile && (
              <Link
                href="/research/"
                className={`nav-link nav-link-research ${pathname?.startsWith('/research') ? 'active' : ''}`}
                style={{
                  color: !navOnDark ? 'rgba(10, 37, 64, 0.7)' : 'rgba(255, 255, 255, 0.85)',
                  textShadow: 'none',
                }}
              >
                Research
              </Link>
            )}

            {/* Learn Dropdown removed — was here, restore from git if needed */}

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
              href="/research/" 
              className={`mnav-item ${normalizedPathForNav.startsWith('/research') ? 'mnav-item--active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: '0.16s' }}
            >
              <span className="mnav-item__label">Research</span>
              <span className="mnav-item__desc">Building workflows & AI tools</span>
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
