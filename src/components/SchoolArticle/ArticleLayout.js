"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

const ArticleLayout = ({ children, meta, theme, isDarkMode = true }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState('default');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = (platform) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
    setShowShareMenu(false);
  };

  // Use provided theme or default
  const currentTheme = theme ? {
    ...theme,
    // Ensure headerBg is set correctly based on theme
    headerBg: theme.headerBg || (isDarkMode ? 'rgba(10, 10, 15, 0.95)' : 'rgba(255, 255, 255, 1)')
  } : {
    bg: isDarkMode ? '#0a0a0f' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#0f172a',
    accent: isDarkMode ? '#00D4AA' : '#00A896',
    headerBg: isDarkMode ? 'rgba(10, 10, 15, 0.95)' : 'rgba(255, 255, 255, 1)',
    border: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    muted: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      lineHeight: 1.6,
      transition: 'background-color 0.3s ease, color 0.3s ease'
    },
    progressBar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '3px',
      backgroundColor: currentTheme.accent,
      width: `${scrollProgress}%`,
      transition: 'width 0.1s ease',
      zIndex: 1001
    },
    articleHeader: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: currentTheme.headerBg,
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${currentTheme.border}`,
      transition: 'all 0.3s ease'
    },
    headerInner: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '1rem 3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '1.25rem',
      fontWeight: '300',
      letterSpacing: '-0.02em',
      color: currentTheme.text,
      textDecoration: 'none'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    iconButton: {
      padding: '0.625rem',
      backgroundColor: 'transparent',
      border: `1px solid ${currentTheme.border}`,
      borderRadius: '8px',
      color: currentTheme.muted,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    articleContainer: {
      paddingTop: '1rem'
    },

    shareMenu: {
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: '0.5rem',
      backgroundColor: isDarkMode ? '#16161f' : '#ffffff',
      border: `1px solid ${currentTheme.border}`,
      borderRadius: '8px',
      padding: '0.5rem',
      minWidth: '200px',
      boxShadow: isDarkMode ? '0 10px 30px rgba(0, 0, 0, 0.5)' : '0 10px 30px rgba(0, 0, 0, 0.1)'
    },
    shareMenuItem: {
      padding: '0.75rem 1rem',
      backgroundColor: 'transparent',
      border: 'none',
      color: currentTheme.muted,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      width: '100%',
      fontSize: '0.875rem',
      borderRadius: '6px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.progressBar} />
      
      <article style={styles.articleContainer}>
        {/* Breadcrumb */}
        <div style={{ 
          marginTop: '6.5rem', 
          marginBottom: '1rem',
          marginLeft: isMobile ? '25px' : '30px'
        }} className="school-article-breadcrumbs">
          <Breadcrumbs 
            items={[
              { label: 'Learn', href: '/learn' },
              { label: 'Articles', href: '/learn/articles' },
              { label: meta?.category || 'Article', isCurrent: true }
            ]}
            isLight={!isDarkMode}
          />
        </div>

        {children}
      </article>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
        }
        
        /* Responsive adjustments */
        @media (max-width: 1280px) {
          .main-content {
            max-width: 100% !important;
            margin-right: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ArticleLayout;