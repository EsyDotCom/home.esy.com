'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
// Hero now shows the real product shot; the synthesis canvas only supplies the
// step glyphs reused under "How it works", so import just those named exports.
import {
  ShapeMessGlyph,
  ShapeTemplateGlyph,
  ShapeArtifactGlyph,
} from './ShapeSynthesisCanvas';
import ClipArtWordmark from './ClipArtWordmark';
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

// clip.art's actual catalog style vocabulary (sourced from clip.art's
// generation form). Rendered as visual pills in the case study to convey
// catalog breadth.
const CLIPART_CATALOG_STYLES = [
  'Flat', 'Minimal', 'Line Art', 'Black & White', 'Cartoon',
  'Mascot', 'Sticker', 'Emoji', 'Vintage', 'Watercolor',
  'Storybook', 'Isometric', 'Clay', 'Chibi', 'Pixel',
  'Kawaii', '3D', 'Doodle',
];

// Real catalog assets pulled directly from clip.art's homepage CDN
// (extracted via CDP from https://clip.art on 2026-05-25). URLs follow
// the pattern: https://images.clip.art/{category}/{slug}.webp
// Each entry is display-only in the case study grid (no outbound links).
//
// To refresh: visit clip.art, inspect <img> elements, replace this list.
// Keep 12 items for a clean 4×3 desktop grid (3×4 tablet, 2×6 mobile).
const CLIPART_SHOWCASE: Array<{
  url: string;
  alt: string;
  category: string;
}> = [
  { url: 'https://images.clip.art/christmas/decorated-christmas-tree-gifts-fxjmtg.webp', alt: 'Decorated Christmas Tree with Gifts', category: 'christmas' },
  { url: 'https://images.clip.art/halloween/grinning-jack-o-lantern-candle-r2avcr.webp', alt: "Grinning Jack-O'-Lantern with Candle", category: 'halloween' },
  { url: 'https://images.clip.art/school/chemistry-set-bubbling-beakers-rd9f4o.webp', alt: 'Chemistry Set with Bubbling Beakers', category: 'school' },
  { url: 'https://images.clip.art/flower/watercolor-lavender-flowers-bqkae5.webp', alt: 'Watercolor Lavender Flowers', category: 'flower' },
  { url: 'https://images.clip.art/cat/cozy-black-cat-on-pumpkin-1c6qun.webp', alt: 'Cozy Black Cat on Pumpkin', category: 'cat' },
  { url: 'https://images.clip.art/school/friendly-yellow-school-bus-hjo5n2.webp', alt: 'Friendly Yellow School Bus', category: 'school' },
  { url: 'https://images.clip.art/christmas/jolly-santa-claus-red-bag-9wgk2i.webp', alt: 'Jolly Santa Claus with Red Bag', category: 'christmas' },
  { url: 'https://images.clip.art/halloween/haunted-mansion-on-a-hill-8n93he.webp', alt: 'Haunted Mansion on a Hill', category: 'halloween' },
  { url: 'https://images.clip.art/flower/colorful-flat-style-flowers-ouw8rl.webp', alt: 'Colorful Flat Style Flowers', category: 'flower' },
  { url: 'https://images.clip.art/pumpkin/cozy-stack-orange-pumpkins-iw5c5x.webp', alt: 'Cozy Stack of Orange Pumpkins', category: 'pumpkin' },
  { url: 'https://images.clip.art/free/lady-gardener-with-vegetables-jyy951.webp', alt: 'Lady Gardener with Vegetables', category: 'free' },
  { url: 'https://images.clip.art/free/the-letter-a-large-colorful-with-red-apples-surrounding-it-gsg2sj.webp', alt: 'Letter A with Apples', category: 'free' },
];

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
  // Page theme is fixed to navy-calm (no user toggle); the hero is pinned dark.
  const [theme] = useState<'dark' | 'light' | 'navy-calm' | 'navy-dark'>('navy-calm');

  // Get CSS class for current theme
  const getThemeClass = () => {
    if (theme === 'light') return 'ic-page--light';
    if (theme === 'navy-calm') return 'ic-page--navy-calm';
    if (theme === 'navy-dark') return 'ic-page--navy-dark';
    return ''; // dark theme is default, no class needed
  };

  // Stagger the clip.art catalog grid when the case study scrolls into view.
  const catalogGridRef = useRef<HTMLDivElement>(null);
  const [catalogInView, setCatalogInView] = useState(false);

  useEffect(() => {
    const grid = catalogGridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCatalogInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`ic-page ${getThemeClass()}`}>
      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION — vertical & centered (headline → CTAs → synthesis band)
          ══════════════════════════════════════════════════════════════ */}
      {/* Above the fold is always navy-dark, regardless of the page theme the
          visitor picks for the sections below. */}
      <section className="ic-hero ic-hero--dark">
        <div className="ic-hero-background">
          <div className="ic-hero-gradient" />
          {/* Structured circuit grid backdrop, scoped to the hero. */}
          <div className="ic-hero-grid" />
        </div>

        <div className="ic-hero-container flex items-start justify-center px-4 lg:px-8 pt-28 lg:pt-32 pb-16">
          <div className="ic-hero-stack">
            <div className="ic-hero-copy text-white">
              {/* Keep the hero friendly: messy material goes into an easy
                  template intake and comes back as finished work. */}
              <h1 style={{ 
                fontFamily: 'Cormorant Garamond, Georgia, serif', 
                fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                fontWeight: 900, 
                lineHeight: 1.1, 
                letterSpacing: '-0.03em', 
                marginBottom: '24px', 
                color: '#FFFFFF',
                maxWidth: '100%',
                overflow: 'hidden'
              }}>
                <span style={{ display: 'block' }}>Automate the workflow.</span>
                <span style={{ 
                  display: 'block', 
                  background: 'linear-gradient(135deg, #00D4AA 0%, #5EEAD4 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent' 
                }}>Audit the output.</span>
              </h1>

              {/* Subheadline — plain language for non-dev visitors: templates
                  replace prompt engineering with a simple intake. */}
              <p style={{ 
                fontSize: '1.125rem', 
                lineHeight: 1.7, 
                color: 'rgba(255, 255, 255, 0.72)', 
                marginBottom: '32px' 
              }}>
                Generate educational content at scale, manage quality with human-in-the-loop review, and keep a full record of every run. Esy is the workflow infrastructure for building vertical products on top.
              </p>

              {/* CTAs — fixed to the navy-dark hero palette. */}
              <div className="ic-hero-ctas">
                <Link 
                  href="/workflows"
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '14px 24px', 
                    background: '#00A896', 
                    color: '#fafafa', 
                    fontWeight: 600, 
                    fontSize: '0.9375rem', 
                    borderRadius: '10px', 
                    textDecoration: 'none', 
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' 
                  }}
                >
                  <span>Browse Workflow Templates</span>
                </Link>
              </div>
            </div>

            {/* App screenshot — browser-chrome mockup of app.esy.com.
                Replaces the abstract synthesis canvas with a literal product
                shot so visitors see exactly what they're stepping into. */}
            <div className="ic-hero-visual-band">
              <div className="ic-app-mockup">
                {/* Ambient glow behind the frame */}
                <div className="ic-app-mockup-glow" aria-hidden="true" />

                {/* Browser chrome frame */}
                <div className="ic-app-mockup-frame">
                  {/* Chrome bar: traffic lights + URL pill */}
                  <div className="ic-app-mockup-chrome">
                    <div className="ic-app-mockup-dots" aria-hidden="true">
                      <span className="ic-mockup-dot ic-mockup-dot--red" />
                      <span className="ic-mockup-dot ic-mockup-dot--yellow" />
                      <span className="ic-mockup-dot ic-mockup-dot--green" />
                    </div>
                    <div className="ic-app-mockup-url" aria-hidden="true">
                      <span className="ic-mockup-url-lock">
                        {/* Lock icon inline SVG */}
                        <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
                          <rect x="2" y="5" width="6" height="5" rx="1" fill="currentColor" opacity="0.6"/>
                          <path d="M3 5V3.5C3 2.4 3.9 1.5 5 1.5S7 2.4 7 3.5V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
                        </svg>
                      </span>
                      app.esy.com
                    </div>
                  </div>

                  {/* The screenshot — fills the frame */}
                  <div className="ic-app-mockup-screen">
                    <Image
                      src="/images/app-dashboard-screenshot.png"
                      alt="Esy dashboard at app.esy.com — organization overview showing the review queue, active runs, artifacts, and spend across ESY LLC"
                      width={1024}
                      height={502}
                      className="ic-app-mockup-image"
                      priority
                      unoptimized
                    />
                  </div>
                </div>

                {/* Caption ties the product shot to the value prop — this is
                    the dashboard the headline is selling. */}
                <p className="ic-app-mockup-caption">
                  The control plane — every run, artifact, and dollar, auditable in one place.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="ic-scroll-indicator">
          <div className="ic-scroll-line" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SHAPE STORY — carry the hero language into the page
          Shapes are not decoration here: they are the product metaphor.
          Messy pieces become one structured, reusable, finished piece of work.
          ══════════════════════════════════════════════════════════════ */}
      <section className="ic-shape-story-section">
        <div className="ic-section-container">
          <div className="ic-shape-story-header">
            <span className="ic-section-eyebrow">How it works</span>
            <h2 className="ic-section-title">
              Messy pieces in. <span className="ic-gradient-text">Finished work out.</span>
            </h2>
            <p className="ic-section-description">
              Start with whatever you have — notes, links, half-formed ideas.
              A template does the hard part and hands you something polished.
              Three steps, no prompt-wrangling.
            </p>
          </div>

          {/* Each step reuses the exact glyph the hero introduced, so the shape
              language reads as one continuous story down the page. */}
          <div className="ic-shape-story-grid">
            <div className="ic-shape-story-card">
              <div className="ic-shape-card-visual" aria-hidden="true">
                <ShapeMessGlyph theme={theme} className="ic-shape-card-glyph" />
              </div>
              <span className="ic-shape-card-step">01</span>
              <h3>Your messy pieces</h3>
              <p>
                Notes, links, goals, a few examples, a half-written prompt —
                drop in whatever you have. No clean-up required.
              </p>
            </div>

            <div className="ic-shape-story-card ic-shape-story-card--accent">
              <div className="ic-shape-card-visual" aria-hidden="true">
                <ShapeTemplateGlyph theme={theme} className="ic-shape-card-glyph" />
              </div>
              <span className="ic-shape-card-step">02</span>
              <h3>Pick a template</h3>
              <p>
                Templates make it easy: answer a few simple questions, and Esy
                handles the prompting, the steps, and the checks for you.
              </p>
            </div>

            <div className="ic-shape-story-card">
              <div className="ic-shape-card-visual" aria-hidden="true">
                <ShapeArtifactGlyph theme={theme} className="ic-shape-card-glyph" />
              </div>
              <span className="ic-shape-card-step">03</span>
              <h3>Get finished work</h3>
              <p>
                Out comes polished work — a report, a visual essay, an image
                pack — with a clear record of how it was made.
              </p>
            </div>
          </div>
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
              Finished work from <span className="ic-gradient-text">these workflows</span>
            </h2>
            <p className="ic-section-description">
              Every piece below was produced by an Esy workflow. Each run captures full provenance — sources, prompts, models, processing, and cost.
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
                    <span className="ic-artifact-badge">Finished work</span>
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
          CASE STUDY — clip.art runs on Esy
          Immersive two-column treatment: story on the left (live
          indicator, headline, body, style pill row, CTAs), 4×3
          catalog grid on the right pulled directly from clip.art's
          live CDN. Repeatable template for future case studies
          (micro.film, lazy.dev, etc.).
          ══════════════════════════════════════════════════════════════ */}
      {CLIPART_SHOWCASE.length > 0 && (
        <section className="ic-casestudy-section">
          <div className="ic-casestudy-bg-glow" aria-hidden="true" />
          <div className="ic-casestudy-container">
            <div className="ic-casestudy-grid">
              {/* ── Story column ── */}
              <div className="ic-casestudy-story">
                <div className="ic-casestudy-meta-row">
                  <span className="ic-casestudy-live">
                    <span className="ic-casestudy-live-dot" aria-hidden="true" />
                    Live · In Production
                  </span>
                  <span className="ic-casestudy-tag">Case Study</span>
                </div>

              <h2 className="ic-casestudy-title">
                <span className="ic-casestudy-title-link" aria-label="clip.art">
                  <ClipArtWordmark className="ic-casestudy-wordmark" />
                </span>
                <span className="ic-casestudy-title-tail">runs on Esy</span>
              </h2>

                <p className="ic-casestudy-description">
                  Consumer marketplace for clip art, coloring pages, and
                  illustrations. Esy workflows generate, post-process, and
                  store every asset — provenance per run on prompt, model,
                  processing, storage, and cost.
                </p>

                <div className="ic-casestudy-styles">
                  <span className="ic-casestudy-styles-label">
                    {CLIPART_CATALOG_STYLES.length} styles supported
                  </span>
                  <div className="ic-casestudy-style-pills">
                    {CLIPART_CATALOG_STYLES.map((style) => (
                      <span key={style} className="ic-casestudy-style-pill">
                        {style}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="ic-casestudy-ctas">
                  <Link
                    href="/workflows/generate-clip-art-asset/"
                    className="ic-casestudy-cta ic-casestudy-cta--primary"
                  >
                    See the workflow
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* ── Catalog grid (4×3) — real clip.art CDN assets ── */}
              <div
                className="ic-casestudy-catalog"
                aria-label="Sample assets from clip.art's catalog"
              >
                <div
                  ref={catalogGridRef}
                  className={`ic-casestudy-catalog-grid${
                    catalogInView ? ' ic-casestudy-catalog-grid--in-view' : ''
                  }`}
                >
                  {CLIPART_SHOWCASE.map((art) => (
                    <div
                      key={art.url}
                      className="ic-casestudy-tile"
                      aria-label={art.alt}
                    >
                      <Image
                        src={art.url}
                        alt={art.alt}
                        width={228}
                        height={228}
                        className="ic-casestudy-tile-image"
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 175px"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          FINAL CTA — Engineer-first close
          Elevated cream surface (in navy-calm) sits between the case
          study above and the dark navy footer below, giving the page
          a clear three-step rhythm: content → close → end. Includes
          the Esy operating-model strip so visitors leave with a
          mental model of what they're stepping into.
          ══════════════════════════════════════════════════════════════ */}
      <section className="ic-final-cta-section">
        <div className="ic-final-cta-background" aria-hidden="true" />
        <div className="ic-final-cta-container">
          <h2 className="ic-final-cta-headline">
            Build something <span className="ic-final-cta-headline-accent">auditable.</span>
          </h2>

          <p className="ic-final-cta-description">
            Pick a workflow template. Let agents run the pipeline. Get back
            publishable, finished work with full provenance — sources, prompts,
            models, processing, and cost.
          </p>

          <div className="ic-final-cta-buttons">
            <Link
              href="/workflows"
              className="ic-final-cta-btn ic-final-cta-btn--primary"
            >
              <span>Browse Workflow Templates</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/research" className="ic-final-cta-btn ic-final-cta-btn--secondary">
              <span>Follow the Research</span>
            </Link>
          </div>

          <div className="ic-final-cta-pipeline" aria-label="Esy operating model">
            <span className="ic-final-cta-pipeline-step">Workflow Template</span>
            <span className="ic-final-cta-pipeline-arrow" aria-hidden="true">→</span>
            <span className="ic-final-cta-pipeline-step">Run</span>
            <span className="ic-final-cta-pipeline-arrow" aria-hidden="true">→</span>
            <span className="ic-final-cta-pipeline-step ic-final-cta-pipeline-step--accent">
              Finished work
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntelligenceCircuitryPage;
