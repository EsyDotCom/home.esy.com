'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Sun, Moon } from 'lucide-react';
import CircuitCanvas from './CircuitCanvas';
import { publishedVisualEssays, CATEGORY_COLORS, isNewEssay, type VisualEssay } from '@/data/visualEssays';
import { publishedInfographics, CLUSTER_LABELS, INFOGRAPHIC_CATEGORY_COLORS } from '@/data/infographics';
import './IntelligenceCircuitryPage.css';

/**
 * Intelligence Circuitry Homepage
 * 
 * A flagship brand moment: "The Canva of defensible knowledge work"
 * with a systems/circuits visual metaphor.
 * 
 * Visual language:
 * - Circuit traces (thin conductive lines)
 * - Nodes with ports (templates, tools, gates)
 * - Signal pulses (intelligence propagation)
 * - Quality gates (logic gate glyphs)
 */


// Featured artifacts for gallery - using essay data with source counts
const FEATURED_ESSAY_IDS = ['the-manhattan-project', 'the-complete-history-of-soda', 'the-word-robot'];

// Source counts for trust metadata (per artifact)
const ARTIFACT_SOURCE_COUNTS: Record<string, number> = {
  'the-manhattan-project': 7,
  'the-complete-history-of-soda': 12,
  'the-word-robot': 9,
};

const featuredArtifacts = FEATURED_ESSAY_IDS
  .map(id => publishedVisualEssays.find(e => e.id === id))
  .filter((e): e is VisualEssay => e !== undefined);

/**
 * Get the hero image for an essay with fallback chain:
 * 1. heroImage (if defined in data)
 * 2. OG image at /og/[slug].png
 */
const getEssayImage = (essay: VisualEssay): string => {
  if (essay.heroImage) return essay.heroImage;
  const slug = essay.href.split('/').pop();
  if (slug) return `/og/${slug}.png`;
  return '/og/default.png';
};


const INFOGRAPHIC_SHOWCASE_COUNT = 5;

const InfographicShowcaseInline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = publishedInfographics.slice(0, INFOGRAPHIC_SHOWCASE_COUNT);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  if (items.length === 0) return null;

  const active = items[activeIndex] || items[0];
  const activeColor =
    INFOGRAPHIC_CATEGORY_COLORS[active.category as keyof typeof INFOGRAPHIC_CATEGORY_COLORS] || '#6B7280';

  return (
    <>
      <div className="ic-artifact-type-divider">
        <span className="ic-artifact-type-label">Infographics</span>
        <Link href="/infographics" className="ic-artifact-type-link">
          View all <ArrowRight size={12} />
        </Link>
      </div>

      <div className="ic-infographic-coverflow">
        {items.length > 1 && (
          <>
            <button className="ic-infographic-arrow ic-infographic-arrow--prev" onClick={goPrev} aria-label="Previous">
              <ArrowRight size={18} />
            </button>
            <button className="ic-infographic-arrow ic-infographic-arrow--next" onClick={goNext} aria-label="Next">
              <ArrowRight size={18} />
            </button>
          </>
        )}

        <div className="ic-infographic-track">
          {items.map((item, i) => {
            let offset = i - activeIndex;
            if (offset > Math.floor(items.length / 2)) offset -= items.length;
            if (offset < -Math.floor(items.length / 2)) offset += items.length;

            const isActive = offset === 0;
            const absOffset = Math.abs(offset);
            const clampedOffset = Math.max(-2, Math.min(2, offset));

            const translateX = clampedOffset * 38;
            const rotateY = clampedOffset * -45;
            const translateZ = isActive ? 0 : -150 - absOffset * 40;
            const scale = isActive ? 1 : 0.75;
            const opacity = absOffset > 2 ? 0 : isActive ? 1 : 0.6;
            const zIndex = 10 - absOffset;

            return (
              <Link
                key={item.id}
                href={`/infographics/${item.id}`}
                className={`ic-infographic-card ${isActive ? 'ic-infographic-card--active' : ''}`}
                style={{
                  transform: `translateX(${translateX}%) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  pointerEvents: absOffset > 2 ? 'none' : 'auto',
                }}
                onClick={(e) => {
                  if (!isActive) {
                    e.preventDefault();
                    setActiveIndex(i);
                  }
                }}
              >
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={item.width}
                  height={item.height}
                  className="ic-infographic-image"
                  sizes="(max-width: 768px) 90vw, 720px"
                  unoptimized
                />
              </Link>
            );
          })}
        </div>

        {items.length > 1 && (
          <div className="ic-infographic-dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={`ic-infographic-dot ${i === activeIndex ? 'ic-infographic-dot--active' : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`View infographic ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="ic-infographic-info">
        <span className="ic-infographic-cluster" style={{ color: activeColor, backgroundColor: `${activeColor}15` }}>
          {CLUSTER_LABELS[active.cluster] || active.cluster}
        </span>
        <h3 className="ic-infographic-title">
          <Link href={`/infographics/${active.id}`}>{active.title}</Link>
        </h3>
        <Link href={`/infographics/${active.id}`} className="ic-infographic-cta">
          <span>View Infographic</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </>
  );
};

const IntelligenceCircuitryPage: React.FC = () => {
  // Theme options: 'navy-calm' (navy light), 'navy-dark' (navy dark), 'light' (violet mist), 'dark' (violet dark)
  const [theme, setTheme] = useState<'dark' | 'light' | 'navy-calm' | 'navy-dark'>('navy-calm');

  // Toggle theme - cycles through all themes
  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'navy-calm') return 'navy-dark';
      if (prev === 'navy-dark') return 'light';
      if (prev === 'light') return 'dark';
      return 'navy-calm';
    });
  };

  // Check if current theme is a dark variant
  const isDarkTheme = theme === 'dark' || theme === 'navy-dark';

  // Get CSS class for current theme
  const getThemeClass = () => {
    if (theme === 'light') return 'ic-page--light';
    if (theme === 'navy-calm') return 'ic-page--navy-calm';
    if (theme === 'navy-dark') return 'ic-page--navy-dark';
    return ''; // dark theme is default, no class needed
  };

  return (
    <div className={`ic-page ${getThemeClass()}`}>
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="ic-theme-toggle"
        aria-label={`Switch theme (current: ${theme})`}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 100,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: isDarkTheme 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : theme === 'navy-calm'
            ? '1px solid rgba(10, 37, 64, 0.1)'
            : '1px solid rgba(124, 58, 237, 0.1)',
          background: isDarkTheme 
            ? theme === 'navy-dark' ? '#0F3460' : '#1f1f23'
            : '#FFFFFF',
          color: isDarkTheme 
            ? '#fafafa' 
            : theme === 'navy-calm'
            ? '#0A2540'
            : '#5b21b6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: isDarkTheme 
            ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
            : theme === 'navy-calm'
            ? '0 4px 12px rgba(10, 37, 64, 0.1)'
            : '0 4px 12px rgba(124, 58, 237, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION
          Left: Headline + CTAs | Right: Circuit Visual
          ══════════════════════════════════════════════════════════════ */}
      <section className="ic-hero">
        <div className="ic-hero-background">
          <div className="ic-hero-gradient" />
          <div className="ic-hero-grid" />
        </div>

        <div className="ic-hero-container flex items-center justify-center px-4 lg:px-8 pt-8 lg:pt-36 pb-12 lg:pb-24">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 w-full max-w-[1400px] items-center">
            <div className="flex-1 text-white order-1 text-center lg:text-left">
              {/* Headline */}
              <h1 style={{ 
                fontFamily: 'Cormorant Garamond, Georgia, serif', 
                fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                fontWeight: 900, 
                lineHeight: 1.1, 
                letterSpacing: '-0.03em', 
                marginBottom: '24px', 
                color: isDarkTheme ? '#fafafa' : theme === 'navy-calm' ? '#0A2540' : '#0f172a',
                maxWidth: '100%',
                overflow: 'hidden'
              }}>
                <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Automate the pipeline.</span>
                <span style={{ 
                  display: 'block', 
                  whiteSpace: 'nowrap',
                  background: (theme === 'navy-calm' || theme === 'navy-dark')
                    ? 'linear-gradient(135deg, #00A896 0%, #00D4AA 100%)' 
                    : 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent' 
                }}>Audit the output.</span>
              </h1>

              {/* Subheadline */}
              <p style={{ 
                fontSize: '1.125rem', 
                lineHeight: 1.7, 
                color: isDarkTheme ? 'rgba(250, 250, 250, 0.7)' : theme === 'navy-calm' ? '#6C757D' : 'rgba(15, 23, 42, 0.7)', 
                marginBottom: '32px' 
              }}>
                Esy runs agentic workflows that research, verify citations, and deliver publishable artifacts.
              </p>

              {/* CTAs */}
              <div className="ic-hero-ctas">
                <Link 
                  href="/workflows"
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '14px 24px', 
                    background: (theme === 'navy-calm' || theme === 'navy-dark') ? '#00A896' : isDarkTheme ? '#7c3aed' : '#5b21b6', 
                    color: '#fafafa', 
                    fontWeight: 600, 
                    fontSize: '0.9375rem', 
                    borderRadius: '10px', 
                    textDecoration: 'none', 
                    boxShadow: (theme === 'navy-calm' || theme === 'navy-dark')
                      ? '0 4px 12px rgba(0, 168, 150, 0.25)'
                      : isDarkTheme 
                      ? '0 4px 12px rgba(124, 58, 237, 0.3)' 
                      : '0 4px 12px rgba(91, 33, 182, 0.25)' 
                  }}
                >
                  <span>Browse Workflow Templates</span>
                  <ArrowRight size={18} />
                </Link>
                <Link href="/essays/" style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  padding: '14px 24px', 
                  background: isDarkTheme 
                    ? theme === 'navy-dark' ? 'rgba(0, 212, 170, 0.1)' : 'rgba(139, 92, 246, 0.12)' 
                    : theme === 'navy-calm'
                    ? 'rgba(10, 37, 64, 0.06)'
                    : 'rgba(124, 58, 237, 0.08)', 
                  border: isDarkTheme 
                    ? theme === 'navy-dark' ? '1px solid rgba(0, 212, 170, 0.25)' : '1px solid rgba(139, 92, 246, 0.25)' 
                    : theme === 'navy-calm'
                    ? '1px solid rgba(10, 37, 64, 0.15)'
                    : '1px solid rgba(124, 58, 237, 0.2)', 
                  color: isDarkTheme ? '#fafafa' : theme === 'navy-calm' ? '#0A2540' : '#5b21b6', 
                  fontWeight: 600, 
                  fontSize: '0.9375rem', 
                  borderRadius: '10px', 
                  textDecoration: 'none' 
                }}>
                  <span>View Artifacts</span>
                </Link>
              </div>
            </div>

            {/* Circuit Visual - Desktop only */}
            <div className="flex-1 justify-center items-center order-2 hidden lg:flex">
              <CircuitCanvas theme={theme === 'navy-dark' ? 'navy-dark' : theme === 'navy-calm' ? 'navy-calm' : theme} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="ic-scroll-indicator">
          <div className="ic-scroll-line" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ARTIFACTS — Unified section: Infographics + Visual Essays
          ══════════════════════════════════════════════════════════════ */}
      <section className="ic-gallery-section">
        <div className="ic-section-container">
          <div className="ic-section-header">
            <span className="ic-section-eyebrow">Workflow Output</span>
            <h2 className="ic-section-title">
              Artifacts produced by <span className="ic-gradient-text">these workflows</span>
            </h2>
            <p className="ic-section-description">
              Every artifact below was generated through Esy's agentic pipeline — automated research, citation verification, and QA. Source counts and verification status are attached.
            </p>
          </div>

          {/* ── Infographics subsection ── */}
          <InfographicShowcaseInline />

          {/* ── Visual Essays subsection ── */}
          <div className="ic-artifact-type-divider">
            <span className="ic-artifact-type-label">Visual Essays</span>
            <Link href="/essays/" className="ic-artifact-type-link">
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="ic-gallery-grid">
            {featuredArtifacts.map((essay) => (
              <Link
                key={essay.id}
                href={essay.href}
                className="ic-artifact-card"
              >
                <div className="ic-artifact-image">
                  <Image
                    src={getEssayImage(essay)}
                    alt={essay.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                  <div className="ic-artifact-overlay" />
                </div>
                <div className="ic-artifact-content">
                  <div className="ic-artifact-header">
                    <span 
                      className="ic-artifact-category"
                      style={{ color: CATEGORY_COLORS[essay.category] }}
                    >
                      {essay.category}
                    </span>
                    <span className="ic-artifact-badge">Artifact</span>
                    {isNewEssay(essay) && <span className="ic-artifact-new">New</span>}
                  </div>
                  <h3 className="ic-artifact-title">{essay.title}</h3>
                  <p className="ic-artifact-subtitle">{essay.subtitle}</p>
                  <div className="ic-artifact-meta">
                    <Clock size={12} />
                    <span>{essay.readTime}</span>
                    <ArrowRight size={12} className="ic-artifact-arrow" />
                  </div>
                  <div className="ic-artifact-trust">
                    <span className="ic-trust-sources">
                      <span className="ic-trust-count">{ARTIFACT_SOURCE_COUNTS[essay.id] || 0}</span>
                      <span className="ic-trust-label">sources</span>
                    </span>
                    <span className="ic-trust-divider" />
                    <span className="ic-trust-qa">
                      <span className="ic-trust-check">✓</span>
                      <span className="ic-trust-label">QA passed</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINAL CTA
          ══════════════════════════════════════════════════════════════ */}
      <section className="ic-final-cta-section">
        <div className="ic-final-cta-background" />
        <div className="ic-final-cta-container">
          <h2 className="ic-final-cta-headline">
            Build something <span className="ic-gradient-text">auditable.</span>
          </h2>
          <p className="ic-final-cta-description">
            Start from a workflow template. Let agents handle the pipeline.
          </p>
          <div className="ic-final-cta-buttons">
            <Link 
              href="/workflows"
              className="ic-cta-primary ic-cta-primary--large"
            >
              <span>Browse Workflow Templates</span>
              <ArrowRight size={20} />
            </Link>
            <Link href="/research" className="ic-cta-secondary">
              <span>Follow the Research</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntelligenceCircuitryPage;
