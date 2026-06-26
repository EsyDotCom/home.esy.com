"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { SearchResult } from '../SearchBar/SearchBar';
import { usePromptSearch } from '@/hooks/usePromptSearch';
import { useGlossarySearch } from '@/hooks/useGlossarySearch';
import { useSchoolSearch } from '@/hooks/useSchoolSearch';
import { useEssaySearch } from '@/hooks/useEssaySearch';
import { useBlogSearch } from '@/hooks/useBlogSearch';
import { 
  getSearchContextConfig, 
  getContextSearchUrl, 
  getContextResultUrl,
  type SearchContext 
} from '@/lib/searchContexts';
import { navyCalmDarkTheme, navyCalmLightTheme } from '@/lib/theme';

// Category colors for search results (matches CATEGORY_COLORS from visualEssays)
const getCategoryColor = (category: string): string => {
  const categoryLower = category?.toLowerCase() || '';
  
  // Visual Essay categories
  if (categoryLower.includes('science')) return '#10B981';
  if (categoryLower.includes('history')) return '#F59E0B';
  if (categoryLower.includes('technology')) return '#3B82F6';
  if (categoryLower.includes('culture')) return '#EC4899';
  if (categoryLower.includes('space')) return '#8B5CF6';
  if (categoryLower.includes('nature')) return '#06B6D4';
  if (categoryLower.includes('education') || categoryLower.includes('writing')) return '#14B8A6';
  if (categoryLower.includes('economics')) return '#22C55E';
  if (categoryLower.includes('fiction')) return '#FFD700';
  
  // Prompt categories
  if (categoryLower.includes('academic') || categoryLower.includes('research')) return '#3B82F6';
  if (categoryLower.includes('creative')) return '#EC4899';
  if (categoryLower.includes('business') || categoryLower.includes('professional')) return '#8B5CF6';
  if (categoryLower.includes('seo') || categoryLower.includes('marketing')) return '#F59E0B';
  if (categoryLower.includes('social')) return '#06B6D4';
  if (categoryLower.includes('ai') || categoryLower.includes('prompt')) return '#10B981';
  
  // Default teal
  return '#00A896';
};

interface HeaderSearchProps {
  prompts: any[];
  className?: string;
  alwaysExpanded?: boolean;
  searchContext?: SearchContext;
  isLightMode?: boolean;
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ 
  prompts = [], 
  className = "",
  alwaysExpanded = false,
  searchContext = 'general',
  isLightMode = false
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // Responsive breakpoints - must be before shouldAlwaysExpand calculation
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get context configuration
  const contextConfig = getSearchContextConfig(searchContext);
  // On mobile, never force expand - use icon-only mode for clean header
  const shouldAlwaysExpand = !isMobile && (alwaysExpanded || contextConfig.shouldAlwaysExpand);

  const [isExpanded, setIsExpanded] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync isExpanded with shouldAlwaysExpand when it changes
  useEffect(() => {
    setIsExpanded(shouldAlwaysExpand);
  }, [shouldAlwaysExpand]);

  // Lock body scroll when mobile modal is open
  useEffect(() => {
    if (showMobileModal) {
      document.body.style.overflow = 'hidden';
      // Focus search input after animation
      setTimeout(() => mobileSearchRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMobileModal]);

  // Close mobile modal on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showMobileModal) {
        setShowMobileModal(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showMobileModal]);

  // usePromptSearch is also used for the templates context (same data shape)
  const promptSearchHook = usePromptSearch({
    prompts: searchContext === 'templates' ? (prompts || []) : [],
    debounceMs: 200,
    maxResults: 6
  });
  
  const glossarySearchHook = useGlossarySearch({
    terms: searchContext === 'glossary' ? (prompts || []) : [],
    debounceMs: 200,
    maxResults: 6
  });
  
  const schoolSearchHook = useSchoolSearch({
    articles: searchContext === 'school' ? 
      [
        { type: 'Article', category: 'AI Research', title: '5 Ways AI is Revolutionizing Academic Research', excerpt: 'Discover how artificial intelligence is transforming the landscape of academic research.', author: 'Zev Uhuru', readTime: '6 min', link: '/learn/articles/ai-research-revolution' },
        { type: 'Guide', category: 'Prompt Engineering', title: 'What is Prompt Engineering? A Comprehensive Guide', excerpt: 'Master the art and science of crafting effective prompts for AI systems.', author: 'Zev Uhuru', readTime: '8 min', link: '/learn/articles/prompt-engineering-guide' },
        { type: 'Tutorial', category: 'LLM Basics', title: 'Understanding Large Language Models: From Theory to Practice', excerpt: 'Demystify the technology behind ChatGPT, Claude, and other LLMs.', author: 'Zev Uhuru', readTime: '12 min', link: '/learn/articles/understanding-llms' },
        { type: 'Literature', category: 'Classic Literature', title: 'To Kill a Mockingbird: A Timeless Exploration of Justice', excerpt: 'Explore Harper Lee\'s masterpiece through the lens of moral courage.', author: 'Zev Uhuru', readTime: '15 min', link: '/learn/articles/to-kill-a-mockingbird' }
      ] : [],
    resources: [],
    courses: [],
    debounceMs: 200,
    maxResults: 6
  });
  
  const essaySearchHook = useEssaySearch({
    essays: searchContext === 'essays' ? (prompts || []) : [],
    debounceMs: 200,
    maxResults: 6
  });
  
  const blogSearchHook = useBlogSearch({
    posts: searchContext === 'blog' ? (prompts || []) : [],
    debounceMs: 200,
    maxResults: 6
  });
  
  // Select the appropriate hook results based on context
  let searchHook;
  if (searchContext === 'glossary') {
    searchHook = glossarySearchHook;
  } else if (searchContext === 'school') {
    searchHook = schoolSearchHook;
  } else if (searchContext === 'essays') {
    searchHook = essaySearchHook;
  } else if (searchContext === 'blog') {
    searchHook = blogSearchHook;
  } else if (searchContext === 'templates') {
    searchHook = promptSearchHook;
  } else {
    searchHook = promptSearchHook;
  }
  
  const { searchResults, isLoading, setSearchTerm: setSearchTermFromHook, showDropdown } = searchHook;

  // Sync search terms
  useEffect(() => {
    setSearchTermFromHook(searchTerm);
  }, [searchTerm, setSearchTermFromHook]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // Always clear search term to close dropdown
        setSearchTerm('');
        setHoveredIndex(null);
        
        // Only collapse the search bar if not on prompt library pages
        if (!shouldAlwaysExpand) {
          setIsExpanded(false);
        }
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isExpanded, shouldAlwaysExpand]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      // Always clear search term to close dropdown
      setSearchTerm('');
      searchRef.current?.blur();
      
      // Only collapse the search bar if not on prompt library pages
      if (!shouldAlwaysExpand) {
        setIsExpanded(false);
      }
      } else if (e.key === 'Enter' && searchTerm.trim()) {
        // Navigate to appropriate page with search using centralized context
        const searchUrl = getContextSearchUrl(searchContext, searchTerm);
        router.push(searchUrl);
        setSearchTerm('');
        
        // Only collapse if not on prompt library or glossary pages
        if (!shouldAlwaysExpand) {
          setIsExpanded(false);
        }
      }
  };

  const handleResultSelect = (result: SearchResult) => {
    if (result.slug) {
      // Use centralized context system for result navigation
      const resultUrl = getContextResultUrl(searchContext, result.slug);
      router.push(resultUrl);
    }
    
    // Always clear search to close dropdown
    setSearchTerm('');
    setHoveredIndex(null);
    
    // Only collapse the search bar if not on prompt library pages
    if (!shouldAlwaysExpand) {
      setIsExpanded(false);
    }
  };

  const handleFocus = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  // Removed auto-focus - users can click when they want to search

  // Theme selection - Use Navy Calm themes
  const currentTheme = isLightMode ? navyCalmLightTheme : navyCalmDarkTheme;

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    searchWrapper: {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: (isExpanded || shouldAlwaysExpand)
        ? (isLightMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(31, 31, 35, 0.95)')
        : (isLightMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(31, 31, 35, 0.7)'),
      border: `1px solid ${(isExpanded || shouldAlwaysExpand)
        ? (isLightMode ? currentTheme.accentBorder : currentTheme.accentBorder)
        : currentTheme.borderSubtle}`,
      borderRadius: isMobile ? '6px' : '8px',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: (isExpanded || shouldAlwaysExpand)
        ? (isLightMode
          ? `${currentTheme.shadows?.glow || '0 4px 16px rgba(124, 58, 237, 0.15)'}, ${currentTheme.shadows?.md || '0 4px 12px rgba(0, 0, 0, 0.08)'}`
          : `${currentTheme.shadows?.glow || '0 4px 16px rgba(159, 122, 234, 0.2)'}, ${currentTheme.shadows?.md || '0 4px 12px rgba(0, 0, 0, 0.3)'}`)
        : currentTheme.shadows?.sm || (isLightMode ? '0 2px 4px rgba(0, 0, 0, 0.06)' : '0 2px 4px rgba(0, 0, 0, 0.2)'),
      width: (isExpanded || shouldAlwaysExpand) ? '100%' : 'auto',
      minWidth: (isExpanded || shouldAlwaysExpand) ? 'auto' : (isMobile ? '32px' : '48px'),
      height: isMobile ? '32px' : '48px'
    },
    searchIcon: {
      padding: isMobile ? '0 8px' : '0 14px',
      display: 'flex',
      alignItems: 'center',
      cursor: shouldAlwaysExpand ? 'default' : 'pointer',
      color: (isExpanded || shouldAlwaysExpand) ? currentTheme.accent : (isLightMode ? 'rgba(10, 37, 64, 0.5)' : 'rgba(255, 255, 255, 0.5)'),
      transition: 'color 0.3s ease',
      flexShrink: 0
    },
    searchInput: {
      flex: 1,
      padding: '0 12px 0 0',
      backgroundColor: 'transparent',
      border: 'none',
      color: currentTheme.text,
      fontSize: '1rem',
      fontWeight: '300' as const,
      outline: 'none',
      minWidth: isExpanded ? (isMobile ? '150px' : '300px') : '0',
      width: isExpanded ? 'auto' : '0',
      opacity: isExpanded ? 1 : 0,
      transition: 'all 0.3s ease'
    } as React.CSSProperties,
    dropdown: {
      position: 'absolute' as const,
      top: '100%',
      left: '0',
      right: '0',
      backgroundColor: isLightMode ? 'rgba(255, 255, 255, 0.98)' : 'rgba(24, 24, 27, 0.98)',
      border: `1px solid ${currentTheme.border}`,
      borderRadius: '12px',
      marginTop: '8px',
      maxHeight: '400px',
      overflowY: 'auto' as const,
      zIndex: 1001,
      backdropFilter: 'blur(30px) saturate(180%)',
      WebkitBackdropFilter: 'blur(30px) saturate(180%)',
      boxShadow: isLightMode 
        ? `${currentTheme.shadows?.lg || '0 8px 32px rgba(0, 0, 0, 0.1)'}, 0 8px 16px rgba(0, 0, 0, 0.08)`
        : `${currentTheme.shadows?.lg || '0 8px 32px rgba(0, 0, 0, 0.4)'}, 0 8px 16px rgba(0, 0, 0, 0.3)`,
      opacity: showDropdown ? 1 : 0,
      transform: showDropdown ? 'translateY(0)' : 'translateY(-10px)',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      pointerEvents: (showDropdown ? 'auto' : 'none') as React.CSSProperties['pointerEvents']
    },
    dropdownItem: {
      padding: '12px 16px',
      borderBottom: `1px solid ${currentTheme.divider}`,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '4px'
    },
    dropdownItemTitle: {
      fontSize: '0.875rem',
      fontWeight: '500' as const,
      color: isLightMode ? '#0A2540' : currentTheme.text,
      margin: '0',
      lineHeight: '1.3'
    },
    dropdownItemDescription: {
      fontSize: '0.75rem',
      color: isLightMode ? 'rgba(10, 37, 64, 0.6)' : 'rgba(255, 255, 255, 0.6)',
      margin: '0',
      lineHeight: '1.4'
    },
    dropdownItemMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      marginTop: '2px'
    },
    dropdownItemCategory: {
      fontSize: '0.7rem',
      color: currentTheme.accent,
      backgroundColor: currentTheme.accentGlow,
      padding: '1px 6px',
      borderRadius: '8px',
      fontWeight: '500' as const
    },
    dropdownItemPro: {
      fontSize: '0.7rem',
      color: currentTheme.warning,
      backgroundColor: currentTheme.warningGlow,
      padding: '1px 6px',
      borderRadius: '8px',
      fontWeight: '500' as const
    },
    dropdownLoading: {
      padding: '16px',
      textAlign: 'center' as const,
      color: isLightMode ? 'rgba(10, 37, 64, 0.6)' : 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.8rem'
    },
    dropdownEmpty: {
      padding: '16px',
      textAlign: 'center' as const,
      color: isLightMode ? 'rgba(10, 37, 64, 0.5)' : 'rgba(255, 255, 255, 0.5)',
      fontSize: '0.8rem'
    },
    // Mobile modal styles
    mobileOverlay: {
      position: 'fixed' as const,
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column' as const,
      opacity: showMobileModal ? 1 : 0,
      visibility: (showMobileModal ? 'visible' : 'hidden') as React.CSSProperties['visibility'],
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    mobileHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      gap: '0.75rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    mobileSearchInput: {
      flex: 1,
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      padding: '0.875rem 1rem',
      fontSize: '1rem',
      color: '#ffffff',
      outline: 'none',
      transition: 'all 0.2s ease'
    },
    mobileCloseButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      borderRadius: '50%',
      width: '44px',
      height: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#ffffff',
      transition: 'all 0.2s ease'
    },
    mobileResults: {
      flex: 1,
      overflowY: 'auto' as const,
      padding: '0.5rem 0'
    },
    mobileResultItem: {
      padding: '1rem 1.25rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    mobileResultTitle: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#ffffff',
      marginBottom: '0.25rem'
    },
    mobileResultDescription: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.6)',
      lineHeight: 1.4
    },
    mobileResultMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginTop: '0.5rem'
    },
    mobileResultCategory: {
      fontSize: '0.75rem',
      color: currentTheme.accent,
      backgroundColor: 'rgba(0, 168, 150, 0.2)',
      padding: '0.125rem 0.5rem',
      borderRadius: '6px',
      fontWeight: 500
    },
    mobileEmpty: {
      padding: '3rem 1.5rem',
      textAlign: 'center' as const,
      color: 'rgba(255, 255, 255, 0.5)'
    },
    mobileHint: {
      padding: '2rem 1.5rem',
      textAlign: 'center' as const,
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '0.875rem'
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .search-input::placeholder {
          color: ${isLightMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
        }

        .search-input:-ms-input-placeholder {
          color: ${isLightMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
        }

        .search-input::-ms-input-placeholder {
          color: ${isLightMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
        }

        .mobile-search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .mobile-search-input:focus {
          border-color: rgba(0, 168, 150, 0.6);
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
      <div ref={containerRef} style={styles.container} className={className}>
        <div style={styles.searchWrapper}>
          {!shouldAlwaysExpand && (
            <div
              style={styles.searchIcon}
              onClick={() => {
                if (isMobile) {
                  setShowMobileModal(true);
                } else if (!isExpanded) {
                  setIsExpanded(true);
                  setTimeout(() => searchRef.current?.focus(), 100);
                }
              }}
            >
              <svg
                width={isMobile ? "16" : "20"}
                height={isMobile ? "16" : "20"}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          )}
          
          {(isExpanded || shouldAlwaysExpand) && (
            <>
              {shouldAlwaysExpand && (
                <div style={styles.searchIcon}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke={currentTheme.accent}
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
              )}
               <input
                 ref={searchRef}
                 type="text"
                 placeholder={contextConfig.placeholder}
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 onKeyDown={handleKeyDown}
                 onFocus={handleFocus}
                 style={styles.searchInput}
                 className="search-input"
               />
            </>
          )}
        </div>

        {/* Dropdown Results */}
        {isExpanded && showDropdown && (
          <div ref={dropdownRef} style={styles.dropdown}>
            {isLoading ? (
              <div style={styles.dropdownLoading}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    border: `2px solid ${currentTheme.accentGlow}`,
                    borderTop: `2px solid ${currentTheme.accent}`,
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Searching...
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div
                  key={result.id}
                  style={{
                    ...styles.dropdownItem,
                    backgroundColor: hoveredIndex === index ? currentTheme.accentGlow : 'transparent',
                    borderLeft: hoveredIndex === index ? `3px solid ${currentTheme.accent}` : '3px solid transparent',
                    paddingLeft: hoveredIndex === index ? '13px' : '16px'
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleResultSelect(result)}
                >
                  <div style={styles.dropdownItemTitle}>
                    {result.title}
                  </div>
                  {result.description && (
                    <div style={styles.dropdownItemDescription}>
                      {result.description}
                    </div>
                  )}
                  <div style={styles.dropdownItemMeta}>
                    {result.category && (() => {
                      const catColor = result.metadata?.categoryColor || getCategoryColor(result.category);
                      return (
                        <span style={{
                          ...styles.dropdownItemCategory,
                          color: catColor,
                          backgroundColor: `${catColor}15`
                        }}>
                          {result.category}
                        </span>
                      );
                    })()}
                    {result.isPro && (
                      <span style={styles.dropdownItemPro}>
                        PRO
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : searchTerm && (
              <div style={styles.dropdownEmpty}>
                No prompts found for &ldquo;{searchTerm}&rdquo;
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Search Modal */}
      {isMobile && (
        <div
          style={styles.mobileOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowMobileModal(false);
              setSearchTerm('');
            }
          }}
        >
          {/* Header with search input */}
          <div style={styles.mobileHeader}>
            <input
              ref={mobileSearchRef}
              type="text"
              placeholder={contextConfig.placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchTerm.trim()) {
                  const searchUrl = getContextSearchUrl(searchContext, searchTerm);
                  router.push(searchUrl);
                  setShowMobileModal(false);
                  setSearchTerm('');
                }
              }}
              style={styles.mobileSearchInput}
              className="mobile-search-input"
            />
            <button
              style={styles.mobileCloseButton}
              onClick={() => {
                setShowMobileModal(false);
                setSearchTerm('');
              }}
              aria-label="Close search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Results */}
          <div style={styles.mobileResults}>
            {isLoading ? (
              <div style={styles.mobileHint}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderTop: '2px solid #ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Searching...
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div
                  key={result.id}
                  style={{
                    ...styles.mobileResultItem,
                    backgroundColor: hoveredIndex === index ? 'rgba(255, 255, 255, 0.05)' : 'transparent'
                  }}
                  onClick={() => {
                    handleResultSelect(result);
                    setShowMobileModal(false);
                  }}
                >
                  <div style={styles.mobileResultTitle}>{result.title}</div>
                  {result.description && (
                    <div style={styles.mobileResultDescription}>{result.description}</div>
                  )}
                  <div style={styles.mobileResultMeta}>
                    {result.category && (() => {
                      const catColor = result.metadata?.categoryColor || getCategoryColor(result.category);
                      return (
                        <span style={{
                          ...styles.mobileResultCategory,
                          color: catColor,
                          backgroundColor: `${catColor}20`
                        }}>
                          {result.category}
                        </span>
                      );
                    })()}
                  </div>
                </div>
              ))
            ) : searchTerm ? (
              <div style={styles.mobileEmpty}>
                No results found for &ldquo;{searchTerm}&rdquo;
              </div>
            ) : (
              <div style={styles.mobileHint}>
                {contextConfig.placeholder.replace('...', '')}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderSearch;
