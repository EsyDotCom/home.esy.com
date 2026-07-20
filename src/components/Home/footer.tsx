"use client";

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import FooterColumn from "@/components/Home/footerColumn";
import Logo from "@/components/Logo";
import { getPageSuffix } from "./navigation";
import { elevatedDarkTheme } from '@/lib/theme';

// Light theme colors for footer - Navy Calm palette
const lightThemeFooter = {
  bg: '#F8FAFC',
  bgGradient: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
  border: 'rgba(10, 37, 64, 0.08)',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  faint: 'rgba(10, 37, 64, 0.4)',
  accent: '#00A896',
  accentGlow: 'rgba(0, 168, 150, 0.2)',
};

// Navy Dark theme colors for footer
const navyDarkThemeFooter = {
  bg: '#061527',
  bgGradient: 'linear-gradient(180deg, #0A2540 0%, #061527 100%)',
  border: 'rgba(0, 212, 170, 0.15)',
  text: '#FFFFFF',
  muted: 'rgba(255, 255, 255, 0.7)',
  subtle: 'rgba(255, 255, 255, 0.5)',
  faint: 'rgba(255, 255, 255, 0.4)',
  accent: '#00D4AA',
  accentGlow: 'rgba(0, 212, 170, 0.2)',
};

export default function Footer () {
    const pathname = usePathname();
    const logoSuffix = getPageSuffix(pathname);
    const [isLightMode, setIsLightMode] = useState(false);
    const [isNavyDark, setIsNavyDark] = useState(false);

    // Detect light mode pages
    useEffect(() => {
      const checkTheme = () => {
        const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
          ? pathname.slice(0, -1) 
          : pathname || '';
        const isHomepage = normalizedPath === '/' || normalizedPath === '';
        const isEssaysPage = normalizedPath === '/essays' || normalizedPath.startsWith('/essays/');
        const isAboutPage = normalizedPath === '/about';
        const isLearnPage = normalizedPath === '/learn' || normalizedPath.startsWith('/learn/');
        const isLearnArticle = normalizedPath.includes('/learn/articles/');
        const isCoursesPage = normalizedPath === '/courses' || normalizedPath.startsWith('/courses/');
        const isTemplatesPage = normalizedPath === '/workflows' || normalizedPath.startsWith('/workflows/');
        const isDocsPage = normalizedPath === '/docs' || normalizedPath.startsWith('/docs/');
        const isAgentsPage = normalizedPath === '/ai-agents' || normalizedPath.startsWith('/ai-agents/');
        const isModelsPage = normalizedPath === '/models' || normalizedPath.startsWith('/models/');
        const isContactPage = normalizedPath === '/contact';
        const isTermsPage = normalizedPath === '/terms';
        const isPrivacyPage = normalizedPath === '/privacy';
        const isGlossaryPage = normalizedPath === '/glossary' || normalizedPath.startsWith('/glossary/');
        const isResearchPage = normalizedPath === '/research' || normalizedPath.startsWith('/research/');
        const isInfographicsPage = normalizedPath === '/infographics' || normalizedPath.startsWith('/infographics/');
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

        // Reference unused page flags so future per-page overrides can re-attach
        // without re-discovering them. Navy Dark is the sitewide default footer;
        // pages opt out via explicit branches (models, 404, school articles, courses).
        // NOTE: the homepage intentionally falls through to the default Navy Dark
        // footer even when the IC page itself is in light/navy-calm mode — the
        // user wants a single, consistent footer treatment across the site.
        void (isHomepage || isEssaysPage || isAboutPage || isLearnPage || isTemplatesPage || isDocsPage || isAgentsPage || isContactPage || isTermsPage || isPrivacyPage || isGlossaryPage || isResearchPage || isInfographicsPage);

        if (isModelsPage) {
          // Check localStorage for models page theme
          const storedTheme = localStorage.getItem('theme-models');
          if (storedTheme === 'light') {
            setIsLightMode(true);
            setIsNavyDark(false);
          } else if (storedTheme === 'dark') {
            setIsLightMode(false);
            setIsNavyDark(true); // Use Navy Dark theme
          } else {
            // Default to light for models pages
            setIsLightMode(true);
            setIsNavyDark(false);
          }
          
          // Check body classes as override
          const bodyClasses = document.body.className;
          if (bodyClasses?.includes('models-light')) {
            setIsLightMode(true);
            setIsNavyDark(false);
          } else if (bodyClasses?.includes('models-dark')) {
            setIsLightMode(false);
            setIsNavyDark(true);
          }
        } else if (isNotFoundPage) {
          // Check localStorage for 404 page theme
          const storedTheme = localStorage.getItem('theme-404');
          if (storedTheme === 'light') {
            setIsLightMode(true);
            setIsNavyDark(false);
          } else if (storedTheme === 'dark') {
            setIsLightMode(false);
            setIsNavyDark(true); // Use Navy Dark theme
          } else {
            // Default to light for 404 page
            setIsLightMode(true);
            setIsNavyDark(false);
          }
          
          // Check body classes as override
          const bodyClasses = document.body.className;
          if (bodyClasses?.includes('not-found-light')) {
            setIsLightMode(true);
            setIsNavyDark(false);
          } else if (bodyClasses?.includes('not-found-dark')) {
            setIsLightMode(false);
            setIsNavyDark(true);
          }
        } else if (isLearnArticle || isCoursesPage) {
          // Check localStorage for learn article page theme (articles + courses)
          const storedTheme = localStorage.getItem('theme-school');
          if (storedTheme === 'light') {
            setIsLightMode(true);
            setIsNavyDark(false);
          } else if (storedTheme === 'dark') {
            setIsLightMode(false);
            setIsNavyDark(true); // Use Navy Dark theme
          } else {
            // Default: dark for courses, light for articles
            if (isCoursesPage) {
              setIsLightMode(false);
              setIsNavyDark(true);
            } else {
            setIsLightMode(true);
            setIsNavyDark(false);
            }
          }
          
          // Check body classes as override
          const bodyClasses = document.body.className;
          const htmlClasses = document.documentElement.className;
          if (bodyClasses?.includes('light') || htmlClasses?.includes('light')) {
            setIsLightMode(true);
            setIsNavyDark(false);
          } else if (bodyClasses?.includes('dark') || htmlClasses?.includes('dark')) {
            setIsLightMode(false);
            setIsNavyDark(true);
          }
        } else {
          setIsLightMode(false);
          setIsNavyDark(true);
        }
      };

      checkTheme();
      
      // Observe ic-page for theme changes (only on homepage)
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      const icPage = document.querySelector('.ic-page');
      if (icPage) {
        observer.observe(icPage, { attributes: true, attributeFilter: ['class'] });
      }

      // Listen for theme change events from school article pages and models pages
      const handleThemeChange = () => {
        checkTheme();
      };
      window.addEventListener('themechange', handleThemeChange);
      
      // Also observe body class changes for models pages and 404 page
      const bodyObserver = new MutationObserver(() => {
        // Re-check theme whenever body classes change (covers models, 404, etc.)
        checkTheme();
      });
      bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

      return () => {
        observer.disconnect();
        bodyObserver.disconnect();
        window.removeEventListener('themechange', handleThemeChange);
      };
    }, [pathname]);

    // Select theme based on mode
    const theme = isLightMode ? lightThemeFooter : isNavyDark ? navyDarkThemeFooter : elevatedDarkTheme;

    // Footer-specific elevated styling
    const getFooterBg = () => {
      if (isLightMode) return lightThemeFooter.bgGradient;
      if (isNavyDark) return navyDarkThemeFooter.bgGradient;
      return `linear-gradient(180deg, ${elevatedDarkTheme.bg} 0%, rgba(15, 15, 18, 0.98) 100%)`;
    };

    const footerStyles = {
      footer: {
        background: getFooterBg(),
        borderTop: `1px solid ${theme.border}`,
        backdropFilter: 'blur(10px)',
        position: 'relative' as const,
        zIndex: 10
      },
      footerOverlay: {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: `linear-gradient(90deg, transparent 0%, ${theme.accentGlow} 50%, transparent 100%)`,
        opacity: isLightMode ? 0.5 : 0.3
      }
    };

    // Determine logo theme
    const logoTheme = isLightMode ? 'light' : isNavyDark ? 'navy-dark' : 'dark';

    return (
      <footer
        className={`footer${isLightMode ? ' footer--light' : ''}${isNavyDark ? ' footer--navy-dark' : ''}`}
        style={footerStyles.footer}
      >
        {/* Subtle accent line at top */}
        <div style={footerStyles.footerOverlay} />
        
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Logo href="" wordmarkOnly wordmarkFont="blackops" theme={logoTheme} />
            </div>
            <p className="footer-desc" style={{ color: theme.muted }}>
              Agentic workflow templates for the AI solopreneur — research, marketing, and deliverables that grow your business.
              <br />
              <strong style={{ color: isLightMode || isNavyDark ? theme.text : 'inherit' }}>Automate &amp; audit.</strong>
            </p>
            <div className="footer-socials">
              <a href="https://synthesize.esy.com" target="_blank" className="social-link" aria-label="Substack">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ color: theme.subtle }}>
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24l9.56-5.39 9.52 5.39V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
              </a>
              {/* <a href="https://www.linkedin.com/company/EsyDotCom" target="_blank" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: theme.subtle }}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a> */}
              <a href="https://www.youtube.com/@EsyDotCom" target="_blank" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ color: theme.subtle }}>
                 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <FooterColumn 
            title="Explore"
            links={[
              { href: "/workflows/", text: "Workflows" },
              // { href: "/ai-agents/", text: "AI Agents" },
              { href: "/glossary/", text: "Glossary" },
            ]}
          />

          <FooterColumn 
            title="Resources"
            links={[
              { href: "/docs", text: "Docs" },
              { href: "/learn/", text: "Learn" },
              { href: "/courses/", text: "AI Courses" },
              { href: "/research/", text: "Research" },
            ]}
          />
          
          <FooterColumn 
            title="Company"
            links={[
              { href: "/about/", text: "About" },
              { href: "/privacy/", text: "Privacy" },
              { href: "/terms/", text: "Terms" },
              { href: "/roadmap/", text: "Roadmap" },
            ]}
          />
        </div>
        
        <div className="footer-bottom" style={{ borderTopColor: theme.border }}>
          <p style={{ color: theme.faint }}>&copy; 2024-2026 ESY, LLC. All rights reserved.</p>
        </div>
      </footer>
    );
  };