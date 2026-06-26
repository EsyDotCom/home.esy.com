"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  BookOpen,
  Lightbulb,
  Target,
  Layers,
  PenTool,
  Search,
  GraduationCap,
  ArrowRight,
  Sparkles,
  BarChart3,
  Quote,
  Microscope
} from 'lucide-react';
import SearchBar from '@/components/SearchBar/SearchBar';
import SchoolNewsletter from '@/components/School/SchoolNewsletter';
import { useSchoolSearch } from '@/hooks/useSchoolSearch';
import { useScrollHeaderSearch } from '@/hooks/useScrollHeaderSearch';
import { useNewsletterSubscribe } from '@/hooks/useNewsletterSubscribe';

const EsySchool = () => {
  const router = useRouter();
  const searchBarRef = useRef(null);
  const emailInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useScrollHeaderSearch(searchBarRef);

  const { subscribe, status: newsletterStatus, errorMessage: newsletterError, reset: resetNewsletter } = useNewsletterSubscribe();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = emailInputRef.current?.value;
    subscribe(email || '');
  };
  
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Navy Calm Theme with dark alternating sections
  const theme = {
    bg: '#FFFFFF',
    surface: '#FFFFFF',
    elevated: '#F8F9FA',
    card: '#FFFFFF',
    text: '#0A2540',
    muted: '#6C757D',
    subtle: '#8E9AAF',
    faint: 'rgba(10, 37, 64, 0.06)',
    accent: '#00A896',
    accentLight: '#00D4AA',
    accentSoft: 'rgba(0, 168, 150, 0.04)',
    accentBorder: '#E9ECEF',
    border: '#E9ECEF',
    // Dark section colors - Navy
    dark: {
      bg: '#0A2540',
      surface: '#0F3460',
      text: '#FFFFFF',
      muted: 'rgba(255, 255, 255, 0.8)',
      subtle: 'rgba(255, 255, 255, 0.6)',
      border: 'rgba(255, 255, 255, 0.1)',
      accent: '#00D4AA'
    },
    // Category colors - Navy/Teal harmonious palette (solid colors, no gradients)
    colors: {
      'ai-research': { bg: '#00A896', accent: '#5EEAD4' },
      'prompt-engineering': { bg: '#0A2540', accent: '#6C757D' },
      'llm-basics': { bg: '#2A9D8F', accent: '#99F6E4' },
      'literature': { bg: '#D4A017', accent: '#FCD34D' },
      visual: { bg: '#00A896', accent: '#5EEAD4' },
      process: { bg: '#6C757D', accent: '#ADB5BD' }
    }
  };

  // Categories for filtering
  const categories = [
    { key: 'all', label: 'All Topics' },
    { key: 'ai-research', label: 'AI Research' },
    { key: 'prompt-engineering', label: 'Prompt Engineering' },
    { key: 'llm-basics', label: 'LLM Basics' },
    { key: 'literature', label: 'Classic Literature' }
  ];

  // Featured article - large hero
  const featuredArticle = {
    category: 'visual',
    categoryLabel: 'Visual Essays',
    title: 'How to Create a Visual Essay That Captivates Readers',
    description: 'Learn how Esy combines research, narrative structure, and visual elements into long-form publishable content — without writing a single prompt.',
    readTime: '12 min read',
    href: '/school/articles/create-visual-essay',
    icon: Sparkles
  };

  // Original articles restored
  const articles = [
    {
      category: 'ai-research',
      categoryLabel: 'AI Research',
      title: '5 Ways AI is Revolutionizing Academic Research',
      description: 'Discover how artificial intelligence is transforming the landscape of academic research, from automated literature reviews to predictive modeling.',
      readTime: '6 min',
      href: '/school/articles/ai-research-revolution',
      icon: Microscope
    },
    {
      category: 'prompt-engineering',
      categoryLabel: 'Prompt Engineering',
      title: 'What is Prompt Engineering? A Comprehensive Guide',
      description: 'Master the art and science of crafting effective prompts for AI systems. Learn techniques that will transform your interactions with language models.',
      readTime: '8 min',
      href: '/school/articles/prompt-engineering-guide',
      icon: Target
    },
    {
      category: 'llm-basics',
      categoryLabel: 'LLM Basics',
      title: 'Understanding Large Language Models: From Theory to Practice',
      description: 'Demystify the technology behind ChatGPT, Claude, and other LLMs. A beginner-friendly guide to transformer architecture and its applications.',
      readTime: '12 min',
      href: '/school/articles/understanding-llms',
      icon: Lightbulb
    },
    {
      category: 'literature',
      categoryLabel: 'Classic Literature',
      title: 'To Kill a Mockingbird: A Timeless Exploration of Justice',
      description: 'Explore Harper Lee\'s masterpiece through the lens of moral courage, racial injustice, and the loss of innocence in 1930s Alabama.',
      readTime: '15 min',
      href: '/school/articles/to-kill-a-mockingbird',
      icon: BookOpen
    }
  ];

  /* SEO-optimized problem-solution articles - commented out for now
  const seoArticles = [
    {
      category: 'essays',
      categoryLabel: 'Academic Essays',
      title: 'How to Write an Academic Essay with Proper Structure',
      description: 'A complete guide to producing well-structured academic essays using Esy\'s workflow templates.',
      readTime: '8 min',
      href: '/school/articles/write-academic-essay',
      icon: FileText
    },
    {
      category: 'research',
      categoryLabel: 'Research Briefs',
      title: 'How to Create a Research Brief That Synthesizes Sources',
      description: 'Transform scattered research into organized, source-backed briefs ready for use.',
      readTime: '10 min',
      href: '/school/articles/create-research-brief',
      icon: Search
    },
    {
      category: 'getting-started',
      categoryLabel: 'Getting Started',
      title: 'How to Complete Your First Esy Intake',
      description: 'A walkthrough of the guided intake process — capture your intent, receive finished work.',
      readTime: '6 min',
      href: '/school/articles/first-intake-guide',
      icon: Target
    },
    {
      category: 'essays',
      categoryLabel: 'Academic Essays',
      title: 'How to Write a Thesis Statement That Works',
      description: 'Craft compelling thesis statements using Esy\'s structured approach to argument building.',
      readTime: '7 min',
      href: '/school/articles/write-thesis-statement',
      icon: Lightbulb
    },
    {
      category: 'visual',
      categoryLabel: 'Visual Essays',
      title: 'How to Structure a Long-Form Visual Narrative',
      description: 'Combine research, storytelling, and visual elements into cohesive long-form content.',
      readTime: '14 min',
      href: '/school/articles/visual-narrative-structure',
      icon: Layers
    },
    {
      category: 'research',
      categoryLabel: 'Research Briefs',
      title: 'How to Find and Evaluate Sources for Academic Work',
      description: 'Let Esy automate source discovery and learn how to evaluate research quality.',
      readTime: '9 min',
      href: '/school/articles/find-evaluate-sources',
      icon: Microscope
    },
    {
      category: 'getting-started',
      categoryLabel: 'Getting Started',
      title: 'Why Structure Beats Prompting Every Time',
      description: 'The difference between asking AI to "write an essay" and using a workflow designed for results.',
      readTime: '5 min',
      href: '/school/articles/structure-vs-prompting',
      icon: BarChart3
    },
    {
      category: 'essays',
      categoryLabel: 'Academic Essays',
      title: 'How to Write an Introduction That Hooks Readers',
      description: 'Create compelling essay introductions that establish context and engage your audience.',
      readTime: '6 min',
      href: '/school/articles/write-introduction',
      icon: PenTool
    },
    {
      category: 'visual',
      categoryLabel: 'Visual Essays',
      title: 'How to Use Data Visualization in Essays',
      description: 'Integrate charts, graphs, and visual data into narrative content effectively.',
      readTime: '11 min',
      href: '/school/articles/data-visualization-essays',
      icon: BarChart3
    },
    {
      category: 'research',
      categoryLabel: 'Research Briefs',
      title: 'How to Write a Literature Review Section',
      description: 'Synthesize existing research into a coherent literature review using Esy\'s workflows.',
      readTime: '12 min',
      href: '/school/articles/write-literature-review',
      icon: BookOpen
    },
    {
      category: 'essays',
      categoryLabel: 'Academic Essays',
      title: 'How to Write Conclusions That Resonate',
      description: 'Craft conclusions that tie together your arguments and leave a lasting impression.',
      readTime: '6 min',
      href: '/school/articles/write-conclusions',
      icon: Quote
    },
    {
      category: 'getting-started',
      categoryLabel: 'Getting Started',
      title: 'Understanding Esy\'s Artifact Types',
      description: 'Learn when to use essays, briefs, or visual essays for your specific project needs.',
      readTime: '7 min',
      href: '/school/articles/artifact-types-guide',
      icon: GraduationCap
    }
  ];
  */

  // Filter articles by category
  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  // Search functionality
  const {
    searchResults,
    isLoading: searchLoading,
    setSearchTerm: setDropdownSearchTerm,
    showDropdown
  } = useSchoolSearch({ 
    articles, 
    resources: [], 
    courses: [], 
    debounceMs: 300, 
    maxResults: 8 
  });

  const handleResultSelect = (result) => {
    if (result.href) {
      router.push(result.href);
    }
  };

  // Card gradient based on category
  const getCardStyle = (category) => {
    const colorSet = theme.colors[category] || theme.colors.process;
    return {
      background: colorSet.bg,
      accentColor: colorSet.accent
    };
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: 'var(--font-inter)'
    }}>

      {/* Hero Section */}
      <section ref={searchBarRef} style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '7rem 2rem 4rem',
        position: 'relative'
      }}>
        {/* Grid Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(10, 37, 64, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 37, 64, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Breadcrumb */}
        <div style={{
        display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
          fontSize: '0.875rem',
          color: theme.subtle
      }}>
          <Link href="/" style={{ color: theme.subtle, textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: theme.muted }}>School</span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-literata)',
          fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
          fontWeight: 300,
          lineHeight: 1.1,
          marginBottom: '1.25rem',
          letterSpacing: '-0.02em'
        }}>
          Esy <span style={{ color: theme.accent }}>School</span>
            </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
          lineHeight: 1.6,
          color: theme.muted,
          maxWidth: '600px',
          marginBottom: '2.5rem'
        }}>
          Your guide to mastering Esy&apos;s workflow templates and AI research tools. Learn to create essays, briefs, and visual artifacts that are citation-backed and publication-ready.
            </p>
            
        {/* Search - temporarily hidden
        <div ref={searchBarRef} style={{ maxWidth: '480px' }}>
              <SearchBar
            placeholder="Search guides..."
                value={searchQuery}
                onChange={(value) => {
                  setSearchQuery(value);
                  setDropdownSearchTerm(value);
                }}
                onSearch={(query) => console.log('Searching for:', query)}
                context="school"
            inputFontSize="0.9375rem"
                showDropdown={showDropdown}
                searchResults={searchResults}
                onResultSelect={handleResultSelect}
                loadingResults={searchLoading}
                maxResults={8}
              />
            </div>
        */}
        </div>
      </section>

      {/* Featured Article - Large Visual Hero */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem 4rem'
      }}>
        <Link href={featuredArticle.href} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div 
            style={{
              display: 'grid',
              gridTemplateColumns: isTablet ? '1fr' : '1.4fr 1fr',
              borderRadius: '20px',
              overflow: 'hidden',
              border: `1px solid ${theme.border}`,
              transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              cursor: 'pointer'
            }}
              onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.accentBorder;
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 24px 64px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Visual Side */}
            <div style={{
              background: theme.colors.visual.bg,
              padding: isTablet ? '3rem 2rem' : '4rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: isTablet ? '240px' : '360px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Abstract visual pattern */}
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.1,
                background: `
                  radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0%, transparent 40%),
                  radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)
                `
              }} />
              
              {/* Large icon */}
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '32px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <featuredArticle.icon size={56} color={theme.colors.visual.accent} strokeWidth={1.25} />
              </div>
              
              <span style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: theme.colors.visual.accent,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Featured Guide
              </span>
            </div>

            {/* Content Side */}
            <div style={{
              backgroundColor: theme.surface,
              padding: isTablet ? '2rem' : '3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: theme.colors.visual.accent,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1rem'
              }}>
                {featuredArticle.categoryLabel}
              </span>

              <h2 style={{
                fontFamily: 'var(--font-literata)',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 400,
                lineHeight: 1.25,
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>
                {featuredArticle.title}
              </h2>

              <p style={{
                fontSize: '1rem',
                color: theme.muted,
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                {featuredArticle.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{
                  fontSize: '0.875rem',
                  color: theme.subtle
                }}>
                  {featuredArticle.readTime}
                </span>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: theme.accent
                }}>
                  Read guide
                  <ArrowRight size={16} strokeWidth={2} />
                </span>
            </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Category Filter */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem 2rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          paddingBottom: '2rem',
          borderBottom: `1px solid ${theme.border}`
        }}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '24px',
                border: `1px solid ${activeCategory === cat.key ? theme.accentBorder : theme.border}`,
                backgroundColor: activeCategory === cat.key ? theme.accentSoft : 'transparent',
                color: activeCategory === cat.key ? theme.accent : theme.muted,
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 2rem 5rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isTablet 
            ? '1fr' 
            : isMobile 
              ? '1fr' 
              : 'repeat(3, 1fr)',
          gap: '1.5rem'
        }}>
          {filteredArticles.map((article, index) => {
            const cardStyle = getCardStyle(article.category);
            const Icon = article.icon;
            
            return (
            <Link
              key={index}
                href={article.href}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <article
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: `1px solid ${theme.border}`,
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = theme.accentBorder;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme.border;
                  e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Visual Header */}
                  <div style={{
                    background: cardStyle.background,
                    padding: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '160px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Subtle pattern */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0.08,
                      background: `
                        radial-gradient(circle at 30% 40%, rgba(255,255,255,0.4) 0%, transparent 40%),
                        radial-gradient(circle at 70% 60%, rgba(255,255,255,0.3) 0%, transparent 35%)
                      `
                    }} />
                    
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={28} color={cardStyle.accentColor} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{
                    backgroundColor: theme.surface,
                    padding: '1.5rem',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: cardStyle.accentColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '0.75rem'
                    }}>
                      {article.categoryLabel}
                    </span>

                    <h3 style={{
                      fontSize: '1.0625rem',
                      fontWeight: 500,
                      lineHeight: 1.35,
                      marginBottom: '0.75rem',
                      letterSpacing: '-0.01em'
                    }}>
                      {article.title}
                    </h3>

                    <p style={{
                      fontSize: '0.9375rem',
                      color: theme.muted,
                      lineHeight: 1.6,
                      marginBottom: '1rem',
                      flex: 1
                    }}>
                      {article.description}
                    </p>

                    <span style={{
                      fontSize: '0.8125rem',
                      color: theme.subtle
                    }}>
                      {article.readTime}
                    </span>
                </div>
              </article>
            </Link>
            );
          })}
        </div>
      </section>

      {/* Value Proposition Banner - Dark Section */}
      <section style={{
        backgroundColor: theme.dark.bg,
        borderTop: `1px solid ${theme.dark.border}`,
        borderBottom: `1px solid ${theme.dark.border}`,
        padding: '4rem 2rem'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 400,
            marginBottom: '1.25rem',
            letterSpacing: '-0.01em',
            color: theme.dark.text
          }}>
            Stop prompting. Start creating.
          </h2>
          
          <p style={{
            fontSize: '1.0625rem',
            color: theme.dark.muted,
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Esy replaces prompt engineering with structured workflows. Select a template, complete an intake, and receive publishable artifacts — essays, briefs, and visual content ready to use.
          </p>

          <Link
            href="/about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.875rem 1.75rem',
              backgroundColor: theme.dark.accent,
              color: 'white',
              borderRadius: '10px',
              fontSize: '0.9375rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00A896';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.dark.accent;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Learn more about Esy
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* Newsletter - Light Section */}
      <SchoolNewsletter 
        emailInputRef={emailInputRef}
        handleNewsletterSubmit={handleNewsletterSubmit}
        onInputChange={resetNewsletter}
        isMobile={isMobile}
        isTablet={isTablet}
        isDarkMode={false}
        subscribeStatus={newsletterStatus}
        errorMessage={newsletterError}
      />
    </div>
  );
};

export default EsySchool;
