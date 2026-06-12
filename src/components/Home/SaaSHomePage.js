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

const NewHomepageElevated = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // ELEVATED DARK THEME - Professional & Sophisticated
  const elevatedTheme = {
    // Primary backgrounds - Using sophisticated grays instead of pitch black
    bg: '#18181b',           // Zinc-900 - Much lighter than #0a0a0f
    elevated: '#27272a',     // Zinc-800 - Card backgrounds
    surface: '#1f1f23',      // Custom blend - Slightly elevated
    hover: '#3f3f46',        // Zinc-700 - Interactive states
    
    // Text hierarchy - Softer whites for reduced eye strain
    text: '#fafafa',         // Neutral-50 - Not pure white
    textSecondary: '#e4e4e7', // Zinc-200 - Secondary content
    muted: '#a1a1aa',        // Zinc-400 - Muted text
    subtle: '#71717a',       // Zinc-500 - Very subtle text
    faint: '#52525b',        // Zinc-600 - Faintest text
    
    // Borders & Dividers - More visible but still subtle
    border: 'rgba(63, 63, 70, 0.4)',    // Zinc-700 with opacity
    borderSubtle: 'rgba(63, 63, 70, 0.2)',
    divider: 'rgba(63, 63, 70, 0.15)',
    
    // Accent colors - Slightly lighter for accessibility
    accent: '#a78bfa',       // Violet-400 - More accessible
    accentHover: '#8b5cf6',  // Violet-500 - Original accent
    accentGlow: 'rgba(167, 139, 250, 0.15)',
    
    // Gradient overlays for depth
    gradientSubtle: 'linear-gradient(180deg, rgba(31, 31, 35, 0.4) 0%, rgba(24, 24, 27, 0.9) 40%, rgba(24, 24, 27, 1) 80%)',
    ambientGlow: 'radial-gradient(600px circle at 50% 0%, rgba(139, 92, 246, 0.02) 0%, transparent 100%)'
  };

  // Enhanced responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;
  const isSmallMobile = windowWidth < 480;
  const isTinyMobile = windowWidth < 375;

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
      backgroundColor: elevatedTheme.bg,
      color: elevatedTheme.text,
      fontFamily: 'var(--font-inter)',
      position: 'relative'
    }}>
      {/* Ambient Glow Effect - Subtle lighting for depth */}
      <div style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '800px',
        height: '800px',
        top: '10%',
        right: '-300px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 70%)',
        filter: 'blur(100px)',
        opacity: 0.5,
        zIndex: 0
      }} />

      {/* Hero Section - Unified with Header */}
      <section style={{ 
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Extended gradient that starts from the very top
        background: `
          ${elevatedTheme.ambientGlow},
          linear-gradient(180deg, 
            rgba(24, 24, 27, 0.15) 0px,     /* Subtle scrim for text legibility */
            rgba(24, 24, 27, 0.1) 40px,     
            rgba(31, 31, 35, 0.05) 80px,    /* Very subtle fade */
            rgba(31, 31, 35, 0.2) 120px,    /* Behind header area */
            rgba(24, 24, 27, 0.7) 30%,      /* Gradual transition */
            ${elevatedTheme.bg} 60%)        /* Solid elevated dark */
        `,
        // Hero extends to top of viewport
        marginTop: '-80px',  // Pull up under header
        paddingTop: `calc(80px + clamp(${
          isTinyMobile ? '10rem' :
          isSmallMobile ? '10.5rem' :
          isMobile ? '11rem' :
          isTablet ? '12rem' :
          '13rem'
        }, 15vh, 15rem))`,  // Add back header height plus content padding
        paddingBottom: `clamp(${isMobile ? '2.5rem' : '3.5rem'}, 6vh, 5.5rem)`,
        paddingLeft: `clamp(1rem, 5vw, 4rem)`,
        paddingRight: `clamp(1rem, 5vw, 4rem)`,
        position: 'relative'
      }}>
        <div style={{ 
          width: `min(100%, ${isDesktop ? '1280px' : isTablet ? '1024px' : '100%'})`,
          position: 'relative', 
          zIndex: 1 
        }}>
          {/* Hero Content */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: `clamp(${isMobile ? '1.5rem' : '2rem'}, 4vh, 4rem)`
          }}>

            {/* Main Headline - Using softer text color */}
            <h1 style={{
              fontSize: `clamp(${
                isTinyMobile ? '2.25rem' :
                isSmallMobile ? '2.5rem' :
                isMobile ? '2.75rem' : '4rem'
              }, ${
                isMobile ? '8vw' : '6vw'
              }, ${
                isDesktop ? '6rem' : isTablet ? '4.5rem' : '4rem'
              })`,
              fontWeight: 300,
              lineHeight: isMobile ? 1.3 : 1.2,
              letterSpacing: `${isMobile ? '0' : isTablet ? '-0.01em' : '-0.01em'}`,
              marginBottom: `clamp(${isMobile ? '2rem' : '2.5rem'}, 3vh, 3rem)`,
              paddingLeft: 'env(safe-area-inset-left, 0)',
              paddingRight: 'env(safe-area-inset-right, 0)',
              fontFamily: 'var(--font-literata)',
              color: elevatedTheme.text  // Using softer white
            }}>
              <span style={{ fontWeight: 300 }}>Skip Boring Research</span>
              <br />
              <span style={{ color: elevatedTheme.accent, fontWeight: 400 }}>Write Smarter Essays</span>
            </h1>

            {/* Subtitle with better readability */}
            <div style={{
              maxWidth: `min(95%, ${isMobile ? '95%' : isTablet ? '600px' : '700px'})`,
              margin: '0 auto',
              paddingLeft: `clamp(0.5rem, 2vw, 2rem)`,
              paddingRight: `clamp(0.5rem, 2vw, 2rem)`,
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: `clamp(${
                  isTinyMobile ? '0.8125rem' :
                  isSmallMobile ? '0.875rem' :
                  isMobile ? '0.9375rem' : '1.125rem'
                }, ${
                  isMobile ? '2.25vw' : '1.3vw'
                }, ${
                  isDesktop ? '1.5rem' : isTablet ? '1.375rem' : '1.125rem'
                })`,
                lineHeight: isMobile ? 1.65 : 1.6,
                color: elevatedTheme.textSecondary,  // Secondary text color
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

          {/* Trust Indicators - Better contrast */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : `repeat(auto-fit, minmax(200px, 1fr))`,
            gap: `clamp(1rem, 3vw, 2rem)`,
            fontSize: `clamp(0.75rem, 1.5vw, 0.9375rem)`,
            color: elevatedTheme.muted,  // Using muted color
            maxWidth: `min(100%, ${isMobile ? '320px' : '720px'})`,
            margin: '0 auto',
            marginTop: `clamp(1.5rem, 3vh, 2.5rem)`,
            textAlign: 'center'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.375rem',
              justifyContent: 'center'
            }}>
              <Zap size={isSmallMobile ? 14 : 16} style={{ flexShrink: 0, color: elevatedTheme.subtle }} />
              <span style={{ lineHeight: 1.4 }}>Start in seconds</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.375rem',
              justifyContent: 'center'
            }}>
              <CheckCircle size={isSmallMobile ? 14 : 16} style={{ color: elevatedTheme.accent, flexShrink: 0 }} />
              <span style={{ lineHeight: 1.4 }}>No credit card required</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.375rem',
              justifyContent: 'center'
            }}>
              <Shield size={isSmallMobile ? 14 : 16} style={{ flexShrink: 0, color: elevatedTheme.subtle }} />
              <span style={{ lineHeight: 1.4 }}>Your data stays private</span>
            </div>
          </div>
        </div>
      </section>

      {/* Update sections background to use elevated theme */}
      <div style={{ background: elevatedTheme.bg }}>
        {/* Modern Features Bento Grid */}
        <ModernFeaturesBento />
      </div>
    </div>
  );
};

export default NewHomepageElevated;
