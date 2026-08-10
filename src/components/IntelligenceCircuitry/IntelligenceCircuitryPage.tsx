'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image, { getImageProps } from 'next/image';
import { ArrowRight } from 'lucide-react';
import ClipArtWordmark from './ClipArtWordmark';
// "How it works" is now the real Generate Clip Art Asset runner, not abstract glyphs.
import RunChecklistCard from '@/components/WorkflowRunner/RunChecklistCard';
import RunConsole from '@/components/WorkflowRunner/RunConsole';
import { publishedInfographics, CLUSTER_LABELS, INFOGRAPHIC_CATEGORY_COLORS } from '@/data/infographics';
// Same social set (LinkedIn, X, GitHub) used across the /agentic surfaces.
import { AUTHOR_SOCIALS as FOUNDER_SOCIALS } from '@/components/Agentic/authorSocials';
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


// clip.art's actual catalog style vocabulary (sourced from clip.art's
// generation form). Rendered as visual pills in the case study to convey
// catalog breadth.
const CLIPART_CATALOG_STYLES = [
  'Flat', 'Minimal', 'Line Art', 'Black & White', 'Cartoon',
  'Mascot', 'Sticker', 'Emoji', 'Vintage', 'Watercolor',
  'Storybook', 'Isometric', 'Clay', 'Chibi', 'Pixel',
  'Kawaii', '3D', 'Doodle',
];

// Art-directed app screenshot: the full frame on desktop, a crop of the key
// region on phones. A 2600px dashboard scaled into a 375px column turns its
// type into noise, so each shot declares its own mobile crop. getImageProps +
// <picture> is the Next-endorsed pattern for this — both sources keep their
// optimized srcsets, and the media query (not JS) picks the crop.
const ArtDirectedShot: React.FC<{
  desktop: { src: string; width: number; height: number };
  mobile: { src: string; width: number; height: number };
  alt: string;
  className?: string;
}> = ({ desktop, mobile, alt, className }) => {
  const sizes = '(max-width: 767px) 100vw, 1200px';
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ alt, sizes, ...desktop });
  const { props: mobileProps } = getImageProps({ alt, sizes, ...mobile });
  return (
    <picture>
      {/* width/height on the source so the browser reserves the desktop
          aspect ratio when this branch wins — without them it falls back to
          the img's mobile ratio and the swap causes layout shift. */}
      <source
        media="(min-width: 768px)"
        srcSet={desktopSrcSet}
        sizes={sizes}
        width={desktop.width}
        height={desktop.height}
      />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is in mobileProps */}
      <img {...mobileProps} className={className} />
    </picture>
  );
};

// Provenance for the print-on-demand artifact in the spotlight below. These
// are the real field values from the artifact's record in app.esy.com, kept
// verbatim so the section shows the product rather than a dressed-up version
// of it. If the screenshot is ever regenerated, refresh these to match.
const ARTIFACT_PROVENANCE = [
  { term: 'Workflow', detail: 'Map Clip Art to Print-on-Demand' },
  { term: 'Run', detail: 'run-450db13f' },
  { term: 'Project', detail: 'clip.art' },
  { term: 'Storage', detail: 'artifacts/tool/run-450db13f/step-1.webp' },
  { term: 'Version', detail: 'v1' },
];

// Six of the seventeen workers on ESY LLC's roster. Names and beats are real.
// Vista leads because it is the worker on shift in the screenshot below.
const WORKER_ROSTER = [
  { name: 'Vista', beat: 'Scene packs: centered miniature worlds, cut transparent' },
  { name: 'Axle', beat: 'Cars, trucks, motorcycles, garages' },
  { name: 'Holly', beat: 'Clip art packs for every American holiday' },
  { name: 'Chalk', beat: 'Classroom art, kindergarten through twelfth grade' },
  { name: 'Bizzy', beat: 'Office, finance, teams, productivity' },
  { name: 'Fete', beat: 'Weddings, birthdays, showers, milestones' },
];

// Vista's ledger, straight off the worker's panel. The per-item ceiling is the
// figure that lands: it is derived from the job's own numbers (150 items at a
// $9.60 cap), not an estimate, so it is a promise rather than a forecast.
const WORKER_LEDGER = [
  { figure: '11', label: 'Shifts run' },
  { figure: '66', label: 'Artifacts filed' },
  { figure: '$26.76', label: 'Spend, all time' },
  { figure: '$0.064', label: 'Per item, at most' },
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

        {/* Tightened vertical rhythm so the product shot (and its live run
            card) crests above the fold on a typical laptop viewport. */}
        <div className="ic-hero-container flex items-start justify-center px-4 lg:px-8 pt-20 lg:pt-24 pb-12">
          <div className="ic-hero-stack">
            <div className="ic-hero-copy text-white">
              {/* Proof-first badge: the platform already ships real volume for
                  a real product before the visitor reads a single claim. */}
              <div className="ic-hero-badge">
                <span className="ic-hero-badge-dot" aria-hidden="true" />
                <span>
                  Powering <strong>clip.art</strong> — 2,000+ assets shipped a week
                </span>
              </div>

              {/* Outcome-first headline: build AND market the product, agentic
                  workflows as the how. "Market" (not "Sell") because Esy owns
                  the making, not distribution or checkout. Line 2 stays teal. */}
              {/* Alt headline — may return for A/B or seasonal rotation:
                  "Agentic Workflows for the" / "Marketing Engineer" (teal on line 2) */}
              <h1 style={{ 
                fontFamily: 'Cormorant Garamond, Georgia, serif', 
                /* Cap at 3.4rem (was 3.8) — line 1 grew by "& Market", so the
                   old cap pushed it past the 880px copy column. */
                /* 4.4vw (was 5.2) keeps "Build & Market Digital Products" on
                   one line down to ~1000px; below that it wraps cleanly. */
                fontSize: 'clamp(2.25rem, 4.4vw, 3.4rem)',
                /* Cormorant's true bold — 900 forces a synthesized weight that
                   renders blocky/wonky, so pin the real 700 cut. */
                fontWeight: 700, 
                lineHeight: 1.1, 
                letterSpacing: '-0.03em', 
                marginBottom: '18px', 
                color: '#FFFFFF',
                maxWidth: '100%',
                overflow: 'hidden'
              }}>
                <span style={{ display: 'block' }}>Build &amp; Market Digital Products</span>
                <span style={{ 
                  display: 'block', 
                  background: 'linear-gradient(135deg, #00D4AA 0%, #5EEAD4 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent' 
                }}>with Agentic Workflows</span>
              </h1>

              {/* Subheadline — plain language for non-dev visitors: templates
                  replace prompt engineering with a simple intake. */}
              <p style={{ 
                fontSize: '1.125rem', 
                lineHeight: 1.7, 
                color: 'rgba(255, 255, 255, 0.72)', 
                marginBottom: '24px' 
              }}>
                Generate content at scale, manage quality with human-in-the-loop review, and keep a full record of every run. Esy is the workflow infrastructure for building vertical products on top.
              </p>

              {/* CTAs — fixed to the navy-dark hero palette. Secondary CTA
                  jumps to the live runner demo so skeptics see it working
                  before reading anything else. */}
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
                <a href="#how-it-works" className="ic-hero-cta-ghost">
                  <span>Watch a workflow run</span>
                  <ArrowRight size={15} />
                </a>
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
                      src="/images/app-dashboard-overview.webp"
                      alt="Esy dashboard at app.esy.com: the ESY LLC overview showing 7,661 artifacts produced this month, spend against the monthly cap, 222 artifacts awaiting review, failed runs, and per-project spend for clip.art and SEOPage.com"
                      width={2048}
                      height={1090}
                      className="ic-app-mockup-image"
                      priority
                      unoptimized
                    />
                  </div>
                </div>

                {/* Floating live run — a small checklist ticks off in green,
                    then resolves into the shipped flower asset with its cost.
                    One glance carries the whole pitch: real workflow, real
                    artifact, known cost. */}
                <RunChecklistCard className="ic-mockup-runcard" />

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
          HOW IT WORKS — the run console
          A navy execution console where a real catalog workflow runs
          itself: intake card → live step trace with per-step timing and
          cost → the shipped artifact materializing with the run total.
          The observability-style trace (steps, states, figures) is the
          product demonstrating itself; cost-per-step is the Esy
          differentiator so it gets its own column.
          ══════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="ic-runconsole-section">
        <div className="ic-runconsole-glow" aria-hidden="true" />
        <div className="ic-section-container">
          <div className="ic-runconsole-header">
            <span className="ic-runconsole-eyebrow">How it works</span>
            <h2 className="ic-runconsole-title">
                    Watch a real run, <span className="ic-gradient-text">start to finish.</span>
            </h2>
            <p className="ic-runconsole-description">
              This is a real workflow from the catalog — the one clip.art runs
              thousands of times a week. A short intake goes in, every step is
              tracked as it runs, and the finished asset comes out with its
              exact cost.
            </p>
          </div>

          <RunConsole />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CASE STUDY — clip.art runs on Esy
          Placed directly after "How it works" so the proof follows the
          pitch: the workflow the visitor just watched is the one shipping
          this catalog. Immersive two-column treatment: story on the left,
          4×3 catalog grid on the right pulled from clip.art's live CDN.
          Repeatable template for future case studies (micro.film, etc.).
          ══════════════════════════════════════════════════════════════ */}
      {CLIPART_SHOWCASE.length > 0 && (
        <section className="ic-casestudy-section">
          <div className="ic-casestudy-bg-glow" aria-hidden="true" />
          <div className="ic-casestudy-container">
            <div className="ic-casestudy-grid">
              {/* ── Story column ── */}
              <div className="ic-casestudy-story">
                {/* "Case Study" leads the meta row — the user wants the
                    section unmistakably labeled as one. */}
                <div className="ic-casestudy-meta-row">
                  <span className="ic-casestudy-tag">Case Study</span>
                  <span className="ic-casestudy-live">
                    <span className="ic-casestudy-live-dot" aria-hidden="true" />
                    Live · In Production
                  </span>
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
                  store every asset — each run recorded on prompt, model,
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
          ARTIFACT SPOTLIGHT — one artifact, start to finish
          Follows the clip.art case study because it answers the question
          that case study raises: what does a finished artifact actually
          look like, and what does Esy keep about it? A single print-on-
          demand mockup carries the whole idea — the art was drawn once,
          a workflow put it on a garment, and the result is filed with the
          run that made it. Flat surfaces and hairline rules only; the
          product shot is the only thing here allowed to be loud.
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="ic-artifact-section"
        aria-label="From clip art to a print-on-demand product photo"
      >
        <div className="ic-section-container">
          <div className="ic-artifact-grid">
            {/* ── The artifact itself ── */}
            <figure className="ic-artifact-shot">
              <div className="ic-artifact-shot-frame">
                <Image
                  src="/images/artifact-pod-tshirt-mockup.webp"
                  alt="A woman wearing an olive green t-shirt printed with kawaii winter clip art: smiling evergreen branches, a snow-covered berry twig, and three snowflake characters"
                  width={488}
                  height={492}
                  className="ic-artifact-shot-image"
                  sizes="(max-width: 900px) 90vw, 440px"
                />
              </div>
              <figcaption className="ic-artifact-shot-caption">
                <span className="ic-artifact-shot-name">T Shirt Mockup</span>
                <span className="ic-artifact-shot-spec">
                  1024 × 1024 · 3.4 × 3.4 in at 300 dpi · WEBP
                </span>
              </figcaption>
            </figure>

            {/* ── The record behind it ── */}
            <div className="ic-artifact-story">
              <span className="ic-artifact-eyebrow">Artifacts</span>
              <h2 className="ic-artifact-title">
                From clip art to a product photo
              </h2>
              <p className="ic-artifact-lede">
                clip.art draws a winter set once. A workflow places that art on
                a real garment at print scale, then files the photo as its own
                artifact beside the art it came from. The listing image is ready
                before anyone opens a design tool.
              </p>

              {/* Provenance is the product, so it gets real type rather than a
                  screenshot crop: a definition list, mono values, hairline
                  rules between rows. */}
              <dl className="ic-artifact-provenance">
                {ARTIFACT_PROVENANCE.map(({ term, detail }) => (
                  <div key={term} className="ic-artifact-provenance-row">
                    <dt className="ic-artifact-provenance-term">{term}</dt>
                    <dd className="ic-artifact-provenance-detail">{detail}</dd>
                  </div>
                ))}
              </dl>

              <p className="ic-artifact-note">
                Every artifact keeps this record. 14,889 filed so far, 227
                waiting on someone to approve them.
              </p>

              <Link href="/artifacts/" className="ic-artifact-cta">
                See what the workflows produce
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* ── Where it lands: the artifact browser in app.esy.com ── */}
          <figure className="ic-artifact-browser">
            {/* Phones get the inspector alone — the mockup with its
                provenance panel — because the full three-pane browser
                shrunk to 375px is unreadable. */}
            <ArtDirectedShot
              desktop={{ src: '/images/artifacts-browser.webp', width: 2048, height: 987 }}
              mobile={{ src: '/images/artifacts-browser-mobile.webp', width: 1336, height: 1140 }}
              alt="The artifacts browser in app.esy.com: a grid of clip.art assets on the left, the T Shirt Mockup open in the inspector on the right, and its provenance panel listing the workflow, run, project, storage path, and version"
              className="ic-artifact-browser-image"
            />
            <figcaption className="ic-artifact-browser-caption">
              The same artifact in the browser it lives in, filed next to the
              14,889 others and one keystroke from the run that made it.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WORKERS — standing jobs that run on a schedule
          The case study proves volume and the artifact spotlight proves
          provenance; this answers who is doing the work at 3am. A worker
          is the unit of delegation: a name, a beat, a shift, and a ledger
          that reads output and cost as one record.
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="ic-workers-section"
        aria-label="AI workers that run shifts"
      >
        <div className="ic-section-container">
          <div className="ic-workers-header">
            <span className="ic-workers-eyebrow">Workers</span>
            <h2 className="ic-workers-title">Hire a worker. Give it a shift.</h2>
            <p className="ic-workers-lede">
              A worker is a standing job with a name, a beat, and a schedule.
              Vista makes scene packs. Holly makes holiday packs. You write the
              assignment once, the worker clocks in on its own schedule, and
              every shift closes with what it made and what it cost.
            </p>
          </div>

          {/* Roster — the beats read as a content calendar, which is the
              point: this is staffing, not prompting. */}
          <ul className="ic-workers-roster">
            {WORKER_ROSTER.map(({ name, beat }) => (
              <li key={name} className="ic-worker-card">
                <span className="ic-worker-name">{name}</span>
                <span className="ic-worker-beat">{beat}</span>
              </li>
            ))}
          </ul>

          <figure className="ic-workers-shot">
            {/* Phones get Vista's panel — live shift banner plus the shift
                ledger — instead of the full roster grid. */}
            <ArtDirectedShot
              desktop={{ src: '/images/workers-on-shift.webp', width: 2048, height: 1140 }}
              mobile={{ src: '/images/workers-on-shift-mobile.webp', width: 1032, height: 914 }}
              alt="The workers screen in app.esy.com: a banner reading On Shift Now, one worker, with Vista clocked in at one minute, and Vista's panel listing eleven shifts including the one currently running"
              className="ic-workers-shot-image"
            />
            <figcaption className="ic-workers-shot-caption">
              Vista, one minute into a shift. Every shift it has ever run is
              listed underneath with what it produced and what it cost.
            </figcaption>
          </figure>

          {/* The assignment is the argument: a worker is a job description with
              a budget, not a prompt. Shown second because it only lands once
              the reader has seen a worker actually clocked in. */}
          <figure className="ic-workers-shot ic-workers-shot--assignment">
            {/* Phones get the assignment column alone: title, specialty,
                the six-content-type job table, and the stop conditions. */}
            <ArtDirectedShot
              desktop={{ src: '/images/worker-assignment.webp', width: 2048, height: 1131 }}
              mobile={{ src: '/images/worker-assignment-mobile.webp', width: 1080, height: 1060 }}
              alt="Vista's worker page in app.esy.com: the assignment naming its title, specialty, team, and the clip.art channel it publishes to; the job listing six content types at twenty-five items each with a budget per type; the rules for when it stops; and the full shift history with each shift's trigger, result, runs, filings, time, and cost"
              className="ic-workers-shot-image"
            />
            <figcaption className="ic-workers-shot-caption">
              The assignment behind it. Six content types, twenty-five items
              each, a budget per type, where the work publishes, and the
              conditions that stop the shift early.
            </figcaption>
          </figure>

          {/* Vista's ledger — output and cost as a single row of figures. */}
          <dl className="ic-workers-ledger">
            {WORKER_LEDGER.map(({ figure, label }) => (
              <div key={label} className="ic-workers-ledger-item">
                <dt className="ic-workers-ledger-label">{label}</dt>
                <dd className="ic-workers-ledger-figure">{figure}</dd>
              </div>
            ))}
          </dl>
          <p className="ic-workers-ledger-note">
            Vista, after eleven shifts. One of seventeen workers on the roster.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ARTIFACTS — finished work showcase
          Slimmed to the infographic coverflow (the strongest visual);
          the visual essay library moved off the homepage and is reachable
          via the link row below the showcase.
          OFF THE PAGE (2026-08-09): the artifact spotlight and workers
          sections above now carry the finished-work story, so the
          infographic coverflow is benched rather than deleted. Flip the
          guard back to render it again.
          ══════════════════════════════════════════════════════════════ */}
      {false && (
      <section className="ic-gallery-section">
        <div className="ic-section-container">
          <div className="ic-section-header">
            <span className="ic-section-eyebrow">Workflow Output</span>
            <h2 className="ic-section-title">
              Finished work from <span className="ic-gradient-text">these workflows</span>
            </h2>
            <p className="ic-section-description">
              Every piece below was produced by an Esy workflow. Each run records exactly how it was made — sources, prompts, models, processing, and cost.
            </p>
          </div>

          {/* ── Infographics showcase ── */}
          <InfographicShowcaseInline />

          {/* ── More finished work — library links instead of inline grids ── */}
          <div className="ic-gallery-more">
            <span className="ic-gallery-more-label">More from the workflows:</span>
            <Link href="/essays/" className="ic-gallery-more-link">
              Visual essay library <ArrowRight size={13} />
            </Link>
            <span className="ic-gallery-more-divider" aria-hidden="true" />
            <Link href="/infographics" className="ic-gallery-more-link">
              All infographics <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          FOUNDER — the person behind the platform
          Letter-style first-person note between the proof (case study
          above) and the close (final CTA below): people buy from real
          people. Portrait + serif statement + signature block with
          socials. Styled entirely with theme tokens so it adapts to
          all four page themes.
          ══════════════════════════════════════════════════════════════ */}
      <section className="ic-founder-section" aria-label="From the founder">
        <div className="ic-founder-bg-glow" aria-hidden="true" />
        <div className="ic-founder-container">
          <div className="ic-founder-grid">
            {/* ── Portrait ── */}
            <div className="ic-founder-portrait">
              <div className="ic-founder-portrait-ring">
                <div className="zev-about-avatar ic-founder-portrait-frame">
                  <Image
                    src="/images/zev-uhuru.png"
                    alt="Zev Uhuru, founder of Esy"
                    width={220}
                    height={220}
                    className="ic-founder-portrait-photo"
                  />
                </div>
              </div>
              <span className="ic-founder-portrait-caption">
                Building in NYC &amp; Miami
              </span>
            </div>

            {/* ── Letter ── */}
            <div className="ic-founder-letter">
              <span className="ic-founder-eyebrow">A note from the founder</span>

              <p className="ic-founder-statement">
                I built Esy to run my own products. Every asset clip.art
                ships, 2,000+ a week, comes out of these workflows. Each one is
                tracked, reviewed, and I know exactly what it cost to make. If I
                can&apos;t see how a run happened, it doesn&apos;t ship.
              </p>

              <div className="ic-founder-signature">
                <div className="ic-founder-identity">
                  <span className="ic-founder-name">Zev Uhuru</span>
                  <span className="ic-founder-role">
                    Founder &amp; Marketing Engineer
                  </span>
                </div>

                <div className="ic-founder-links">
                  <div
                    className="ic-founder-socials"
                    role="group"
                    aria-label="Founder social links"
                  >
                    {FOUNDER_SOCIALS.map(({ href, label, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="ic-founder-social-link"
                      >
                        <Icon size={15} />
                      </a>
                    ))}
                  </div>
                  <Link href="/about" className="ic-founder-more">
                    More about me
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            publishable, finished work with a full record — sources, prompts,
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
            <Link href="/agentic" className="ic-final-cta-btn ic-final-cta-btn--secondary">
              <span>Read The Marketing Engineer</span>
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
