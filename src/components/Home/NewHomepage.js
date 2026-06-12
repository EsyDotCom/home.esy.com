"use client"

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, ArrowRight, ChevronRight,
  FileText, Brain, Sparkles,
  CheckCircle, Clock, Zap, Globe,
  BarChart, Edit3, BookMarked, Lightbulb,
  PenTool, Target, Layers, Award,
  Menu, X, TrendingUp, Shield
} from 'lucide-react';
import ModernFeaturesBento from '@/components/Features/ModernFeaturesBento';

const NewHomepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const currentTheme = {
    bg: '#0a0a0f',
    elevated: '#16161f',
    text: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.7)',
    subtle: 'rgba(255, 255, 255, 0.5)',
    faint: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.08)',
    divider: 'rgba(255, 255, 255, 0.05)',
    accent: '#8b5cf6'
  };

  // Enhanced responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;
  const isSmallMobile = windowWidth < 480;
  const isTinyMobile = windowWidth < 375; // iPhone SE and similar small devices

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Key benefits with icons
  const keyBenefits = [
    {
      icon: TrendingUp,
      stat: '87%',
      title: 'Clarity Improvement',
      description: 'in academic arguments'
    },
    {
      icon: Clock,
      stat: '2.5x',
      title: 'Faster Research',
      description: 'comprehensive literature review'
    },
    {
      icon: Award,
      stat: '73%',
      title: 'Time Saved',
      description: 'on first draft completion'
    },
    {
      icon: Shield,
      stat: '100%',
      title: 'Your Voice',
      description: 'authentic & preserved'
    }
  ];

  // Writing capabilities
  const capabilities = [
    {
      icon: FileText,
      title: 'Academic Essays',
      description: 'Structure arguments with precision and depth',
      features: ['Argument development', 'Evidence integration', 'Citation management']
    },
    {
      icon: Brain,
      title: 'Research Papers',
      description: 'Comprehensive research from hypothesis to conclusion',
      features: ['Literature review', 'Methodology design', 'Data interpretation']
    },
    {
      icon: BookMarked,
      title: 'Writing Templates',
      description: 'Pre-built structures for any academic writing task',
      features: ['Essay frameworks', 'Research outlines', 'Citation formats']
    },
    {
      icon: Lightbulb,
      title: 'AI-Powered Research',
      description: 'Intelligent assistance for every writing stage',
      features: ['Source discovery', 'Argument development', 'Style optimization']
    }
  ];

  const handleEssayGeneration = async (topic, options) => {
    console.log('Generating essay for:', topic);
    
    // Show elegant loading state
    setIsSearching(true);
    
    // Brief delay for sophisticated micro-interaction
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Redirect to app with topic
    window.open(`https://app.esy.com?topic=${encodeURIComponent(topic)}`, '_blank');
    
    // Reset loading state after redirect
    setTimeout(() => setIsSearching(false), 100);
  };

  return (
    <div style={{
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: 'var(--font-inter)'
    }}>
      {/* Hero Section - World-Class Responsive Design System */}
      <section style={{ 
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Subtle gradient background - lighter at top, solid at bottom
        background: `linear-gradient(180deg, 
          rgba(22, 22, 31, 0.3) 0%, 
          rgba(10, 10, 15, 0.8) 30%,
          rgba(10, 10, 15, 1) 60%)`,
        // Enhanced padding for premium breathing room
        paddingTop: `clamp(${
          isTinyMobile ? '9rem' :       // 144px - more space from nav
          isSmallMobile ? '9.5rem' :    // 152px
          isMobile ? '10rem' :          // 160px  
          isTablet ? '11rem' :          // 176px
          '12rem'                       // 192px desktop - generous spacing
        }, 15vh, 14rem)`,
        paddingBottom: `clamp(${isMobile ? '2.5rem' : '3.5rem'}, 6vh, 5.5rem)`,
        paddingLeft: `clamp(1rem, 5vw, 4rem)`,
        paddingRight: `clamp(1rem, 5vw, 4rem)`,
        position: 'relative'
      }}>
        <div style={{ 
          // Fluid container width
          width: `min(100%, ${isDesktop ? '1280px' : isTablet ? '1024px' : '100%'})`,
          position: 'relative', 
          zIndex: 1 
        }}>
          {/* Hero Content */}
          <div style={{ 
            textAlign: 'center', 
            // Dynamic spacing based on viewport
            marginBottom: `clamp(${isMobile ? '1.5rem' : '2rem'}, 4vh, 4rem)`
          }}>

            {/* Main Headline - Increased for Impact */}
            <h1 style={{
              // Larger font sizes for better presence
              fontSize: `clamp(${
                isTinyMobile ? '2.25rem' :     // 36px minimum
                isSmallMobile ? '2.5rem' :     // 40px 
                isMobile ? '2.75rem' : '4rem'  // 44px mobile, 64px tablet
              }, ${
                isMobile ? '8vw' : '6vw'       // More aggressive scaling
              }, ${
                isDesktop ? '6rem' : isTablet ? '4.5rem' : '4rem'  // 96px desktop max
              })`,
              fontWeight: 300,
              // More generous line height for breathing room
              lineHeight: isMobile ? 1.3 : 1.2,
              // Reduced negative letter spacing for less tension
              letterSpacing: `${isMobile ? '0' : isTablet ? '-0.01em' : '-0.01em'}`,
              // Increased margin to subtitle
              marginBottom: `clamp(${isMobile ? '2rem' : '2.5rem'}, 3vh, 3rem)`,
              // Safe area padding for notched devices
              paddingLeft: 'env(safe-area-inset-left, 0)',
              paddingRight: 'env(safe-area-inset-right, 0)',
              fontFamily: 'var(--font-literata)'
            }}>
              <span style={{ fontWeight: 300 }}>Skip Boring Research</span>
              <br />
              <span style={{ color: currentTheme.accent, fontWeight: 400 }}>Write Smarter Essays</span>
            </h1>

            {/* Clean, Elegant Subtitle - Constrained to Title Width */}
            <div style={{
              maxWidth: `min(95%, ${isMobile ? '95%' : isTablet ? '600px' : '700px'})`,
              margin: '0 auto',
              paddingLeft: `clamp(0.5rem, 2vw, 2rem)`,
              paddingRight: `clamp(0.5rem, 2vw, 2rem)`,
              textAlign: 'center'
            }}>
              {/* Main subtitle */}
              <p style={{
                fontSize: `clamp(${
                  isTinyMobile ? '0.8125rem' :    // 13px minimum
                  isSmallMobile ? '0.875rem' :    // 14px
                  isMobile ? '0.9375rem' : '1.125rem' // 15px mobile, 18px tablet
                }, ${
                  isMobile ? '2.25vw' : '1.3vw'
                }, ${
                  isDesktop ? '1.5rem' : isTablet ? '1.375rem' : '1.125rem'  // Keep desktop at 24px
                })`,
                lineHeight: isMobile ? 1.65 : 1.6,
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: 'var(--font-inter)',
                fontWeight: '400',
                letterSpacing: '0.02em',
                margin: 0,
                marginTop: 0,
                whiteSpace: 'normal'
              }}>
                Stop staring at a blank page.{isMobile && <br />} Esy helps you plan your outline, write in academic formats, and explore thousands of AI suggestions.
              </p>
            </div>
          </div>

          {/* Legacy AI essay generator removed — the editor product now lives in compose.esy.com. */}

          {/* Trust Indicators - Responsive Grid System */}
          <div style={{
            display: 'grid',
            // Responsive grid columns
            gridTemplateColumns: isMobile ? '1fr' : `repeat(auto-fit, minmax(200px, 1fr))`,
            // Fluid gap
            gap: `clamp(1rem, 3vw, 2rem)`,
            // Fluid font size
            fontSize: `clamp(0.75rem, 1.5vw, 0.9375rem)`,
            color: currentTheme.subtle,
            // Responsive container
            maxWidth: `min(100%, ${isMobile ? '320px' : '720px'})`,
            margin: '0 auto',
            // Dynamic margin top
            marginTop: `clamp(1.5rem, 3vh, 2.5rem)`,
            textAlign: 'center'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.375rem',
              justifyContent: 'center'
            }}>
              <Zap size={isSmallMobile ? 14 : 16} style={{ flexShrink: 0 }} />
              <span style={{ lineHeight: 1.4 }}>Start in seconds</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.375rem',
              justifyContent: 'center'
            }}>
              <CheckCircle size={isSmallMobile ? 14 : 16} style={{ color: currentTheme.accent, flexShrink: 0 }} />
              <span style={{ lineHeight: 1.4 }}>No credit card required</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.375rem',
              justifyContent: 'center'
            }}>
              <Shield size={isSmallMobile ? 14 : 16} style={{ flexShrink: 0 }} />
              <span style={{ lineHeight: 1.4 }}>Your data stays private</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Features Bento Grid - World-Class Design */}
      <ModernFeaturesBento />

      {/* REMOVED OLD FEATURES SECTION */}
      {false && (
      <section id="features" style={{ 
        padding: isSmallMobile ? '3rem 1rem' : isMobile ? '4rem 1.5rem' : isTablet ? '6rem 2rem' : '8rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '5rem' }}>
            <h2 style={{
              fontSize: isTinyMobile ? '1.5rem' : isSmallMobile ? '1.75rem' : isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
              padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0',
              fontFamily: 'var(--font-literata)'
            }}>
              Everything you need to excel
            </h2>
            <p style={{
              fontSize: isTinyMobile ? '0.875rem' : isSmallMobile ? '0.938rem' : isMobile ? '1rem' : '1.125rem',
              color: currentTheme.muted,
              maxWidth: '600px',
              margin: '0 auto',
              padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0',
              fontFamily: 'var(--font-inter)'
            }}>
              Powerful features designed for academic success
            </p>
          </div>

          {/* Feature highlights - Enhanced Mobile Layout */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isTinyMobile ? '1fr' : isSmallMobile ? '1fr' : isMobile ? '1fr' : 'repeat(2, 1fr)', 
            gap: isTinyMobile ? '1rem' : isSmallMobile ? '1.5rem' : isMobile ? '2rem' : '3rem',
            marginBottom: '4rem'
          }}>
            {[
              {
                icon: Brain,
                title: 'Smart Writing Assistant',
                description: 'Advanced AI technology that adapts to your writing style and academic requirements. Get personalized suggestions that enhance your work.',
                highlight: 'Intelligent writing support'
              },
              {
                icon: Target,
                title: 'Academic Voice Preservation',
                description: 'AI enhances your ideas without replacing your unique perspective. Maintain complete authorship while elevating arguments.',
                highlight: '100% your authentic voice'
              },
              {
                icon: Zap,
                title: 'Instant Research Integration',
                description: 'Find, evaluate, and cite sources seamlessly. Our AI understands academic conventions across disciplines.',
                highlight: '2.5x faster research'
              },
              {
                icon: Shield,
                title: 'Privacy First',
                description: 'Your work remains yours. No training on your data, encrypted storage, and complete control over your content.',
                highlight: 'Complete data ownership'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isSmallMobile ? '1rem' : isMobile ? '1.5rem' : '1.5rem',
                  padding: isSmallMobile ? '1.25rem' : isMobile ? '1.5rem' : '2rem',
                  background: currentTheme.elevated,
                  borderRadius: '12px',
                  border: `1px solid ${currentTheme.border}`,
                  transition: 'all 0.2s',
                  alignItems: isMobile ? 'center' : 'flex-start',
                  textAlign: isMobile ? 'center' : 'left'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateX(8px)';
                    e.currentTarget.style.borderColor = currentTheme.accent;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = currentTheme.border;
                  }
                }}
              >
                <div style={{
                  width: isSmallMobile ? '40px' : isMobile ? '48px' : '56px',
                  height: isSmallMobile ? '40px' : isMobile ? '48px' : '56px',
                  background: currentTheme.accent + '20',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <feature.icon size={isSmallMobile ? 20 : isMobile ? 24 : 24} style={{ color: currentTheme.accent }} />
                </div>
                
                <div>
                  <h3 style={{
                    fontSize: isSmallMobile ? '1rem' : isMobile ? '1.125rem' : '1.25rem',
                    fontWeight: 500,
                    marginBottom: '0.75rem'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: isSmallMobile ? '0.813rem' : isMobile ? '0.875rem' : '0.938rem',
                    lineHeight: 1.6,
                    color: currentTheme.muted,
                    marginBottom: '0.75rem'
                  }}>
                    {feature.description}
                  </p>
                  <div style={{
                    fontSize: isSmallMobile ? '0.75rem' : '0.813rem',
                    color: currentTheme.accent,
                    fontWeight: 500
                  }}>
                    {feature.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* REMOVED OLD CAPABILITIES SECTION */}
      {false && (
      <section id="capabilities" style={{ 
        padding: isSmallMobile ? '3rem 1rem' : isMobile ? '4rem 1.5rem' : isTablet ? '6rem 2rem' : '8rem 2rem',
        background: currentTheme.elevated
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '5rem' }}>
            <h2 style={{
              fontSize: isTinyMobile ? '1.5rem' : isSmallMobile ? '1.75rem' : isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
              padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0',
              fontFamily: 'var(--font-literata)'
            }}>
              Built for every academic challenge
            </h2>
            <p style={{
              fontSize: isTinyMobile ? '0.875rem' : isSmallMobile ? '0.938rem' : isMobile ? '1rem' : '1.125rem',
              color: currentTheme.muted,
              maxWidth: '600px',
              margin: '0 auto',
              padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0',
              fontFamily: 'var(--font-inter)'
            }}>
              Professional writing assistance for every academic level
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isTinyMobile ? '1fr' : isSmallMobile ? '1fr' : isMobile ? '1fr' : 'repeat(2, 1fr)', 
            gap: isTinyMobile ? '1rem' : isSmallMobile ? '1.5rem' : isMobile ? '1.5rem' : '2rem'
          }}>
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                style={{
                  padding: isSmallMobile ? '1.5rem' : isMobile ? '2rem' : '3rem',
                  background: currentTheme.bg,
                  borderRadius: '12px',
                  border: `1px solid ${currentTheme.border}`,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.borderColor = currentTheme.accent;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.borderColor = currentTheme.border;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <capability.icon 
                  size={isSmallMobile ? 24 : isMobile ? 28 : 32} 
                  style={{ 
                    color: currentTheme.accent,
                    marginBottom: isMobile ? '1rem' : '1.5rem'
                  }} 
                />
                <h3 style={{
                  fontSize: isSmallMobile ? '1.125rem' : isMobile ? '1.25rem' : '1.5rem',
                  fontWeight: 400,
                  marginBottom: '0.75rem'
                }}>
                  {capability.title}
                </h3>
                <p style={{
                  fontSize: isSmallMobile ? '0.813rem' : isMobile ? '0.875rem' : '0.938rem',
                  lineHeight: 1.6,
                  color: currentTheme.muted,
                  marginBottom: '1.5rem'
                }}>
                  {capability.description}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {capability.features.map((feature, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      fontSize: isSmallMobile ? '0.75rem' : '0.813rem',
                      color: currentTheme.subtle
                    }}>
                      <CheckCircle size={isSmallMobile ? 12 : 14} style={{ color: currentTheme.accent }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Pre-Footer CTA Removed - Component preserved but not rendered */}
      {/* To re-enable: Change false to true in the condition below */}
      {false && (
        <section style={{ 
          padding: isSmallMobile ? '3rem 1rem' : isMobile ? '4rem 1.5rem' : isTablet ? '5rem 2rem' : '6rem 2rem',
          background: currentTheme.bg,
          borderTop: `1px solid ${currentTheme.divider}`,
          textAlign: 'center'
        }}>
          <div style={{ 
            maxWidth: '500px', 
            margin: '0 auto'
          }}>
            {/* Single CTA Button */}
            <button 
              onClick={() => window.open('https://app.esy.com/signup', '_blank')}
              style={{
                padding: isMobile ? '1.125rem 2.5rem' : '1.125rem 3.5rem',
                background: currentTheme.accent,
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: isMobile ? '1.0625rem' : '1.125rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.625rem',
                transition: 'all 0.2s ease',
                width: isMobile ? '100%' : 'auto',
                minHeight: '52px'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.15)`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              Start Writing with Esy
              <ArrowRight size={18} />
            </button>

            {/* Simple Supporting Text */}
            <p style={{
              fontSize: '0.9375rem',
              color: 'rgba(255, 255, 255, 0.4)',
              marginTop: '1.25rem',
              marginBottom: 0
            }}>
              Try it free. No credit card needed.
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default NewHomepage;