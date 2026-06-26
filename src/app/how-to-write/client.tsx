"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, BookOpen, FileText, Briefcase, GraduationCap, Mail, PenTool, Users, Award, Calendar, CreditCard, Home, Heart, Globe, Code, Coffee, Lightbulb, MousePointer, Clock, BarChart3, Feather, Brain, Sparkles } from 'lucide-react';

const HowToWriteHub = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredGuide, setHoveredGuide] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Writing guides data with enhanced metadata
  const guides = {
    everyday: [
      { 
        id: 'check', 
        title: 'How to Write a Check', 
        icon: CreditCard, 
        description: 'Master the lost art of check writing with precision',
        readTime: '3 min',
        difficulty: 'Easy',
        trending: false,
        new: false
      },
      { 
        id: 'thank-you', 
        title: 'How to Write a Thank You Note', 
        icon: Heart, 
        description: 'Express gratitude with eloquence and authenticity',
        readTime: '5 min',
        difficulty: 'Easy',
        trending: true,
        new: false
      },
      { 
        id: 'address', 
        title: 'How to Write an Address', 
        icon: Home, 
        description: 'International and domestic addressing standards',
        readTime: '4 min',
        difficulty: 'Easy',
        trending: false,
        new: false
      },
      { 
        id: 'email', 
        title: 'How to Write a Formal Email', 
        icon: Mail, 
        description: 'Command respect through digital correspondence',
        readTime: '7 min',
        difficulty: 'Medium',
        trending: true,
        new: false
      }
    ],
    academic: [
      { 
        id: 'essay', 
        title: 'How to Write an Essay', 
        icon: FileText, 
        description: 'Transform ideas into compelling academic arguments',
        readTime: '12 min',
        difficulty: 'Medium',
        trending: true,
        new: false
      },
      { 
        id: 'thesis', 
        title: 'How to Write a Thesis Statement', 
        icon: Lightbulb, 
        description: 'Crystallize complex ideas into powerful claims',
        readTime: '8 min',
        difficulty: 'Medium',
        trending: false,
        new: true
      },
      { 
        id: 'research', 
        title: 'How to Write a Research Paper', 
        icon: BookOpen, 
        description: 'Navigate the journey from hypothesis to publication',
        readTime: '15 min',
        difficulty: 'Hard',
        trending: true,
        new: false
      },
      { 
        id: 'citation', 
        title: 'How to Write Citations', 
        icon: Code, 
        description: 'Master MLA, APA, and Chicago with confidence',
        readTime: '10 min',
        difficulty: 'Medium',
        trending: false,
        new: false
      }
    ],
    professional: [
      { 
        id: 'cover-letter', 
        title: 'How to Write a Cover Letter', 
        icon: Briefcase, 
        description: 'Craft letters that open doors and start conversations',
        readTime: '10 min',
        difficulty: 'Medium',
        trending: true,
        new: false
      },
      { 
        id: 'resume', 
        title: 'How to Write a Resume', 
        icon: Award, 
        description: 'Design a professional narrative that demands attention',
        readTime: '12 min',
        difficulty: 'Medium',
        trending: true,
        new: false
      },
      { 
        id: 'business-plan', 
        title: 'How to Write a Business Plan', 
        icon: Globe, 
        description: 'Transform vision into venture-ready strategy',
        readTime: '20 min',
        difficulty: 'Hard',
        trending: false,
        new: true
      },
      { 
        id: 'proposal', 
        title: 'How to Write a Proposal', 
        icon: Users, 
        description: 'Win hearts, minds, and contracts with precision',
        readTime: '15 min',
        difficulty: 'Hard',
        trending: false,
        new: false
      }
    ]
  };

  // Filter guides based on search and category
  const filteredGuides = Object.entries(guides).reduce((acc, [category, items]) => {
    if (activeCategory !== 'all' && activeCategory !== category) return acc;
    
    const filtered = items.filter(guide => 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filtered.length > 0) acc[category] = filtered;
    return acc;
  }, {} as Record<string, typeof guides[keyof typeof guides]>);

  // Count total guides
  const totalGuides = Object.values(guides).flat().length;
  const trendingCount = Object.values(guides).flat().filter(g => g.trending).length;

  const styles: Record<string, React.CSSProperties> = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: 'white',
      fontFamily: 'var(--font-inter)',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    },
    nav: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: scrolled ? 'rgba(10, 10, 15, 0.8)' : 'rgba(10, 10, 15, 0)',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      borderBottom: scrolled ? '1px solid rgba(139, 92, 246, 0.1)' : '1px solid transparent'
    },
    navInner: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '1.5rem 3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.875rem',
      textDecoration: 'none',
      color: 'white'
    },
    logoMark: {
      width: '42px',
      height: '42px',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    logoText: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '-0.025em'
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '3rem'
    },
    navLink: {
      color: 'rgba(255, 255, 255, 0.6)',
      textDecoration: 'none',
      fontSize: '0.875rem',
      fontWeight: 500,
      transition: 'color 0.2s ease',
      cursor: 'pointer'
    },
    ctaButton: {
      padding: '0.75rem 2rem',
      background: 'transparent',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      borderRadius: '8px',
      color: '#8b5cf6',
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    hero: {
      paddingTop: '10rem',
      paddingBottom: '6rem',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    heroContent: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '0 3rem',
      textAlign: 'center',
      position: 'relative' as const,
      zIndex: 10
    },
    heroBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.375rem 1rem',
      background: 'rgba(139, 92, 246, 0.1)',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      color: '#8b5cf6',
      marginBottom: '2rem',
      fontWeight: 500,
      letterSpacing: '0.025em'
    },
    heroTitle: {
      fontSize: 'clamp(3rem, 7vw, 5.5rem)',
      fontWeight: 200,
      lineHeight: 1.3,
      letterSpacing: '0.01em',
      marginBottom: '2rem',
      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontFamily: 'var(--font-literata)'
    },
    heroSubtitle: {
      fontSize: '1.375rem',
      color: 'rgba(255, 255, 255, 0.5)',
      lineHeight: 1.6,
      marginBottom: '3rem',
      fontWeight: 300,
      maxWidth: '600px',
      margin: '0 auto 3rem'
    },
    searchWrapper: {
      maxWidth: '500px',
      margin: '0 auto 5rem',
      position: 'relative' as const
    },
    searchContainer: {
      position: 'relative' as const,
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    searchInput: {
      width: '100%',
      padding: '1.25rem 1.25rem 1.25rem 3.5rem',
      background: 'transparent',
      border: 'none',
      color: 'white',
      fontSize: '1rem',
      outline: 'none',
      fontWeight: 300,
      letterSpacing: '0.01em'
    },
    searchIcon: {
      position: 'absolute',
      left: '1.25rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'rgba(255, 255, 255, 0.3)'
    },
    statsRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '4rem',
      marginBottom: '5rem',
      flexWrap: 'wrap'
    },
    stat: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: 200,
      lineHeight: 1,
      marginBottom: '0.5rem',
      background: 'linear-gradient(to bottom, #8b5cf6, #6366f1)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    statLabel: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.4)',
      fontWeight: 400,
      letterSpacing: '0.05em'
    },
    categoryNav: {
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'center',
      marginBottom: '6rem',
      padding: '0.375rem',
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '12px',
      maxWidth: 'fit-content',
      margin: '0 auto 6rem',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    },
    categoryButton: {
      padding: '0.75rem 2rem',
      background: 'transparent',
      border: 'none',
      borderRadius: '8px',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative' as const
    },
    categoryButtonActive: {
      background: 'rgba(139, 92, 246, 0.15)',
      color: '#8b5cf6'
    },
    guidesSection: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 3rem 8rem'
    },
    categorySection: {
      marginBottom: '6rem'
    },
    categoryHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '3rem'
    },
    categoryInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem'
    },
    categoryIconWrapper: {
      width: '52px',
      height: '52px',
      background: 'rgba(139, 92, 246, 0.1)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(139, 92, 246, 0.2)'
    },
    categoryTitle: {
      fontSize: '2rem',
      fontWeight: 200,
      textTransform: 'capitalize' as const,
      letterSpacing: '-0.02em'
    },
    viewAll: {
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '0.875rem',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'color 0.2s ease'
    },
    guidesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
      gap: '2rem'
    },
    guideCard: {
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '2.5rem',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    guideGlow: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      pointerEvents: 'none'
    },
    guideContent: {
      position: 'relative' as const,
      zIndex: 10
    },
    guideHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1.25rem',
      marginBottom: '1.5rem'
    },
    guideIconBox: {
      width: '56px',
      height: '56px',
      background: 'rgba(139, 92, 246, 0.1)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      position: 'relative' as const,
      border: '1px solid rgba(139, 92, 246, 0.15)'
    },
    guideTitleGroup: {
      flex: 1
    },
    guideTitle: {
      fontSize: '1.25rem',
      fontWeight: 400,
      marginBottom: '0.5rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em'
    },
    guideDescription: {
      fontSize: '0.9375rem',
      color: 'rgba(255, 255, 255, 0.5)',
      lineHeight: 1.6,
      fontWeight: 300
    },
    guideMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.8125rem',
      color: 'rgba(255, 255, 255, 0.4)'
    },
    badge: {
      position: 'absolute',
      top: '1.5rem',
      right: '1.5rem',
      padding: '0.25rem 0.75rem',
      background: 'rgba(139, 92, 246, 0.15)',
      color: '#8b5cf6',
      fontSize: '0.6875rem',
      fontWeight: 600,
      borderRadius: '9999px',
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const
    },
    ctaSection: {
      padding: '6rem 3rem',
      background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0) 100%)',
      borderTop: '1px solid rgba(139, 92, 246, 0.1)'
    },
    ctaContent: {
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center'
    },
    ctaTitle: {
      fontSize: '3rem',
      fontWeight: 200,
      marginBottom: '1.5rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.1
    },
    ctaSubtitle: {
      fontSize: '1.25rem',
      color: 'rgba(255, 255, 255, 0.6)',
      marginBottom: '3rem',
      lineHeight: 1.6,
      fontWeight: 300
    },
    ctaPrimaryButton: {
      padding: '1rem 3rem',
      background: '#8b5cf6',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      marginRight: '1rem'
    },
    ctaSecondaryButton: {
      padding: '1rem 3rem',
      background: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    floatingOrb: {
      position: 'absolute',
      width: '600px',
      height: '600px',
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      pointerEvents: 'none',
      transition: 'transform 0.3s ease-out'
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'everyday': return Coffee;
      case 'academic': return GraduationCap;
      case 'professional': return Briefcase;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'rgba(34, 197, 94, 0.7)';
      case 'Medium': return 'rgba(251, 191, 36, 0.7)';
      case 'Hard': return 'rgba(239, 68, 68, 0.7)';
      default: return 'rgba(255, 255, 255, 0.5)';
    }
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <Link href="/" style={styles.logo}>
            <div style={styles.logoMark}>
              <Feather size={22} style={{ strokeWidth: 2.5 }} />
            </div>
            <span style={styles.logoText}>esy</span>
          </Link>
          
          <div style={styles.navLinks}>
            <Link href="/research" style={styles.navLink}>Research</Link>
            <Link href="/essays/" style={styles.navLink}>Essays</Link>
            <Link href="/learn/" style={styles.navLink}>Learn</Link>
            <button 
              style={styles.ctaButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                e.currentTarget.style.borderColor = '#8b5cf6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              }}
            >
              Write
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero} ref={heroRef}>
        <div 
          style={{
            ...styles.floatingOrb,
            top: '-300px',
            left: '50%',
            transform: `translate(${-50 + mousePosition.x * 10}%, ${mousePosition.y * 10}%)`
          }}
        />
        
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <Sparkles size={14} />
            <span>AI-ENHANCED WRITING GUIDES</span>
          </div>
          
          <h1 style={styles.heroTitle}>
            Master Every<br />Type of Writing
          </h1>
          
          <p style={styles.heroSubtitle}>
            From formal emails to research papers, learn proven techniques that transform your writing—then let AI help you apply them instantly.
          </p>
          
          {/* Search */}
          <div style={styles.searchWrapper}>
            <div 
              style={styles.searchContainer}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <Search size={20} style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search writing guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </div>

          {/* Stats */}
          <div style={styles.statsRow}>
            <div style={styles.stat}>
              <div style={styles.statNumber}>{totalGuides}</div>
              <div style={styles.statLabel}>Writing Guides</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>{trendingCount}</div>
              <div style={styles.statLabel}>Trending Now</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>2M+</div>
              <div style={styles.statLabel}>Writers Helped</div>
            </div>
          </div>

          {/* Category Navigation */}
          <div style={styles.categoryNav}>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                ...styles.categoryButton,
                ...(activeCategory === 'all' ? styles.categoryButtonActive : {})
              }}
            >
              All Guides
            </button>
            <button
              onClick={() => setActiveCategory('everyday')}
              style={{
                ...styles.categoryButton,
                ...(activeCategory === 'everyday' ? styles.categoryButtonActive : {})
              }}
            >
              Everyday
            </button>
            <button
              onClick={() => setActiveCategory('academic')}
              style={{
                ...styles.categoryButton,
                ...(activeCategory === 'academic' ? styles.categoryButtonActive : {})
              }}
            >
              Academic
            </button>
            <button
              onClick={() => setActiveCategory('professional')}
              style={{
                ...styles.categoryButton,
                ...(activeCategory === 'professional' ? styles.categoryButtonActive : {})
              }}
            >
              Professional
            </button>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section style={styles.guidesSection}>
        {Object.entries(filteredGuides).map(([category, categoryGuides]) => {
          const CategoryIcon = getCategoryIcon(category);
          
          return (
            <div key={category} style={styles.categorySection}>
              <div style={styles.categoryHeader}>
                <div style={styles.categoryInfo}>
                  <div style={styles.categoryIconWrapper}>
                    <CategoryIcon size={26} style={{ color: '#8b5cf6', strokeWidth: 1.5 }} />
                  </div>
                  <h2 style={styles.categoryTitle}>{category} Writing</h2>
                </div>
                <Link 
                  href={`/how-to-write/${category}`} 
                  style={styles.viewAll}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'}
                >
                  View all
                  <ArrowRight size={16} />
                </Link>
              </div>
              
              <div style={styles.guidesGrid}>
                {categoryGuides.map(guide => {
                  const GuideIcon = guide.icon;
                  const isHovered = hoveredGuide === guide.id;
                  
                  // Create the link URL based on guide ID
                  const guideLink = guide.id === 'essay' ? '/how-to-write-an-essay' : `/how-to-write/${guide.id}`;
                  
                  return (
                    <Link
                      key={guide.id}
                      href={guideLink}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div
                        style={{
                          ...styles.guideCard,
                          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                          borderColor: isHovered ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                          background: isHovered ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.02)'
                        }}
                        onMouseEnter={() => setHoveredGuide(guide.id)}
                        onMouseLeave={() => setHoveredGuide(null)}
                      >
                      <div 
                        style={{
                          ...styles.guideGlow,
                          opacity: isHovered ? 1 : 0
                        }}
                      />
                      
                      {(guide.trending || guide.new) && (
                        <div style={styles.badge}>
                          {guide.trending ? 'Trending' : 'New'}
                        </div>
                      )}
                      
                      <div style={styles.guideContent}>
                        <div style={styles.guideHeader}>
                          <div style={styles.guideIconBox}>
                            <GuideIcon 
                              size={24} 
                              style={{ 
                                color: '#8b5cf6',
                                strokeWidth: 1.5,
                                transition: 'transform 0.3s ease',
                                transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                              }} 
                            />
                          </div>
                          <div style={styles.guideTitleGroup}>
                            <h3 style={styles.guideTitle}>{guide.title}</h3>
                            <p style={styles.guideDescription}>{guide.description}</p>
                          </div>
                        </div>
                        
                        <div style={styles.guideMeta}>
                          <div style={styles.metaItem}>
                            <Clock size={14} />
                            <span>{guide.readTime}</span>
                          </div>
                          <div style={styles.metaItem}>
                            <BarChart3 size={14} />
                            <span style={{ color: getDifficultyColor(guide.difficulty) }}>
                              {guide.difficulty}
                            </span>
                          </div>
                          <div style={{ marginLeft: 'auto' }}>
                            <ArrowRight 
                              size={18} 
                              style={{ 
                                color: 'rgba(139, 92, 246, 0.6)',
                                transition: 'transform 0.3s ease',
                                transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
                              }} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>
            Write Better.<br />Write Faster.<br />Write with Esy.
          </h2>
          <p style={styles.ctaSubtitle}>
            Join over 2 million writers using AI to enhance their craft. 
            Start with our guides, then let Esy help you apply what you&apos;ve learned.
          </p>
          <div>
            <button 
              style={styles.ctaPrimaryButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Write
            </button>
            <button 
              style={styles.ctaSecondaryButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToWriteHub; 