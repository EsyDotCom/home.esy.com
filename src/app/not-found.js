"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, FileText, GraduationCap, Sun, Moon, Home } from 'lucide-react';
import Link from 'next/link';
import { navyCalmDarkTheme } from '@/lib/theme';

// ─── Navy Calm Light Theme ─────────────────────────────────
const lightTheme = {
  bg: '#FFFFFF',
  surface: '#F8F9FA',
  elevated: '#F1F5F9',
  text: '#0A2540',
  textSecondary: '#333333',
  muted: '#6C757D',
  subtle: '#8E9AAF',
  faint: 'rgba(10, 37, 64, 0.06)',
  border: 'rgba(10, 37, 64, 0.08)',
  borderStrong: '#E9ECEF',
  accent: '#00A896',
  accentHover: '#00D4AA',
  accentTint: 'rgba(0, 168, 150, 0.08)',
  gridLine: 'rgba(10, 37, 64, 0.04)',
  cardShadow: '0 1px 3px rgba(10, 37, 64, 0.06), 0 8px 24px rgba(10, 37, 64, 0.04)',
  cardHoverShadow: '0 4px 12px rgba(10, 37, 64, 0.08), 0 12px 32px rgba(10, 37, 64, 0.06)',
};

// ─── Navy Calm Dark Theme ──────────────────────────────────
const darkTheme = {
  bg: '#0A2540',
  surface: '#0F3460',
  elevated: '#143D6B',
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.85)',
  muted: 'rgba(255, 255, 255, 0.7)',
  subtle: 'rgba(255, 255, 255, 0.5)',
  faint: 'rgba(255, 255, 255, 0.06)',
  border: 'rgba(255, 255, 255, 0.1)',
  borderStrong: 'rgba(255, 255, 255, 0.15)',
  accent: '#00D4AA',
  accentHover: '#5EEAD4',
  accentTint: 'rgba(0, 212, 170, 0.1)',
  gridLine: 'rgba(255, 255, 255, 0.03)',
  cardShadow: '0 1px 3px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.15)',
  cardHoverShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 12px 32px rgba(0, 212, 170, 0.08)',
};

// ─── Pathway Cards ─────────────────────────────────────────
const pathways = [
  {
    id: 'templates',
    icon: FileText,
    label: 'Start Building',
    title: 'Workflow Templates',
    description: 'Choose a research template and let Esy handle structure, citations, and verification. Every claim traced to a source.',
    cta: 'Browse Templates',
    href: '/workflows',
  },
  {
    id: 'school',
    icon: GraduationCap,
    label: 'Start Learning',
    title: 'Esy School',
    description: 'Learn how to use AI research tools effectively. Guides, workflows, and best practices for researchers at every level.',
    cta: 'Explore School',
    href: '/school',
  },
];

const NotFoundPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Set body classes for nav/footer detection
  const applyThemeClasses = (isDark) => {
    if (typeof window === 'undefined') return;
    if (isDark) {
      document.body.classList.add('not-found-dark');
      document.body.classList.remove('not-found-light');
    } else {
      document.body.classList.add('not-found-light');
      document.body.classList.remove('not-found-dark');
    }
    window.dispatchEvent(new Event('themechange'));
  };

  // Initialize theme
  useEffect(() => {
    const stored = localStorage.getItem('theme-404');
    const isDark = stored === 'dark';
    setIsDarkMode(isDark);
    applyThemeClasses(isDark);
    setMounted(true);

    return () => {
      document.body.classList.remove('not-found-dark', 'not-found-light');
    };
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('theme-404', next ? 'dark' : 'light');
    applyThemeClasses(next);
  };

  const t = isDarkMode ? darkTheme : lightTheme;

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', background: '#FFFFFF' }} />
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: t.bg,
      color: t.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background-color 0.4s ease, color 0.4s ease',
    }}>

      {/* ─── Grid Background ────────────────────────────── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${t.gridLine} 1px, transparent 1px),
          linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ─── Radial Glow ────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isDarkMode
          ? 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0, 212, 170, 0.04) 0%, transparent 70%)'
          : 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0, 168, 150, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ─── Theme Toggle ───────────────────────────────── */}
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 100,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: `1px solid ${t.border}`,
          background: isDarkMode ? 'rgba(15, 52, 96, 0.9)' : 'rgba(255, 255, 255, 0.95)',
          color: t.text,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          boxShadow: isDarkMode
            ? '0 4px 16px rgba(0, 0, 0, 0.3)'
            : '0 4px 16px rgba(10, 37, 64, 0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* ─── Content ────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 24px 80px',
      }}>
        <div style={{
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
        }}>

          {/* ─── 404 Indicator ──────────────────────────── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: t.accent,
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: t.accent,
            }}>
              Page not found
            </span>
          </div>

          {/* ─── Headline ───────────────────────────────── */}
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            color: t.text,
            marginBottom: '20px',
          }}>
            This page doesn&rsquo;t exist,{' '}
            <br />
            but your research can.
          </h1>

          {/* ─── Value Proposition ──────────────────────── */}
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            lineHeight: 1.7,
            color: t.muted,
            maxWidth: '560px',
            marginBottom: '48px',
          }}>
            Esy is a citation-first research platform. Choose a workflow template, add your sources, and produce structured, 
            verifiable artifacts where every claim is traced to its origin.
          </p>

          {/* ─── Pathway Cards ──────────────────────────── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '48px',
          }}>
            {pathways.map((p) => {
              const isHovered = hoveredCard === p.id;
              return (
                <Link
                  key={p.id}
                  href={p.href}
                  onMouseEnter={() => setHoveredCard(p.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '28px 24px',
                    background: isDarkMode
                      ? (isHovered ? 'rgba(15, 52, 96, 0.6)' : 'rgba(15, 52, 96, 0.3)')
                      : (isHovered ? '#FFFFFF' : t.surface),
                    border: `1px solid ${isHovered ? t.accent : t.borderStrong}`,
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: t.text,
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    transform: isHovered ? 'translateY(-2px)' : 'none',
                    boxShadow: isHovered ? t.cardHoverShadow : t.cardShadow,
                  }}
                >
                  {/* Card Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: t.accentTint,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <p.icon size={18} style={{ color: t.accent }} />
                      </div>
                      <span style={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: t.accent,
                      }}>
                        {p.label}
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      style={{
                        color: t.accent,
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateX(0)' : 'translateX(-4px)',
                        transition: 'all 0.25s ease',
                      }}
                    />
                  </div>

                  {/* Card Content */}
                  <h2 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: t.text,
                  }}>
                    {p.title}
                  </h2>

                  <p style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: t.muted,
                    marginBottom: '20px',
                    flex: 1,
                  }}>
                    {p.description}
                  </p>

                  {/* Card CTA */}
                  <span style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: t.accent,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    {p.cta}
                    <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* ─── Bottom Actions ─────────────────────────── */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '24px',
          }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: t.text,
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                border: `1px solid ${t.borderStrong}`,
                background: 'transparent',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = t.accent;
                e.currentTarget.style.color = t.accent;
                e.currentTarget.style.background = t.accentTint;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = t.borderStrong;
                e.currentTarget.style.color = t.text;
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Home size={15} />
              Back to Home
            </Link>

            <Link
              href="https://app.esy.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                background: t.accent,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = t.accentHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = t.accent;
              }}
            >
              Try Esy Free
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
