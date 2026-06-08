'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { clipArtArtifacts } from '@/data/clip-art-artifacts';
import { publishedInfographics } from '@/data/infographics';
import { publishedVisualEssays } from '@/data/visualEssays';
import PublishedArtifactsShowcase, {
  type ArtifactKindFilter,
} from './PublishedArtifactsShowcase';
import {
  getPublishedArtifactRails,
  type PublishedArtifactItem,
  type PublishedArtifactKind,
} from './published-artifacts-data';

// Navy Calm Light Theme — matches /workflows (TemplatesClient)
const theme = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  surface: '#F1F5F9',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  faint: 'rgba(10, 37, 64, 0.35)',
  border: 'rgba(10, 37, 64, 0.08)',
  divider: 'rgba(10, 37, 64, 0.05)',
  accent: '#00A896',
  accentLight: 'rgba(0, 168, 150, 0.08)',
  accentBorder: 'rgba(0, 168, 150, 0.2)',
};

// Chip counts are the real, browsable totals behind each gallery route — not
// the (deduped, capped) "recent" set shown in the rails below.
const KIND_FILTERS: { id: ArtifactKindFilter; label: string; count: number }[] = [
  { id: 'all', label: 'All', count: 0 },
  { id: 'essay', label: 'Essays', count: publishedVisualEssays.length },
  { id: 'infographic', label: 'Infographics', count: publishedInfographics.length },
  { id: 'clip-art', label: 'Clip Art', count: clipArtArtifacts.length },
];
KIND_FILTERS[0].count =
  publishedVisualEssays.length +
  publishedInfographics.length +
  clipArtArtifacts.length;

const TOTAL_ARTIFACTS = KIND_FILTERS[0].count;

// Caption label per artifact kind for the hero spotlight.
const KIND_DISPLAY: Record<PublishedArtifactKind, string> = {
  essay: 'Visual Essay',
  infographic: 'Infographic',
  'clip-art': 'Clip Art',
};

// Auto-advancing spotlight of featured artifacts in the hero. One piece at a
// time (image + type + title), clickable through to the artifact. Pauses on
// hover and honors prefers-reduced-motion.
function HeroCarousel({ items }: { items: PublishedArtifactItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  useEffect(() => {
    if (paused || count <= 1) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 3800);
    return () => window.clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;

  return (
    <div
      className="artifact-hero__carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="artifact-hero__slides">
        {items.map((item, i) => {
          const active = i === index;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`artifact-hero__slide ${active ? 'is-active' : ''}`}
              aria-hidden={!active}
              tabIndex={active ? 0 : -1}
            >
              <div
                className="artifact-hero__slide-img"
                style={{ backgroundImage: `url(${item.imageSrc})` }}
              />
              <div className="artifact-hero__slide-cap">
                <span className="artifact-hero__slide-kind">
                  {KIND_DISPLAY[item.kind]}
                </span>
                <span className="artifact-hero__slide-title">{item.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="artifact-hero__dots" role="tablist" aria-label="Featured artifacts">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`artifact-hero__dot ${i === index ? 'is-active' : ''}`}
            aria-label={`Show featured artifact ${i + 1}`}
            aria-selected={i === index}
            role="tab"
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ArtifactsIndexClient() {
  const [activeKind, setActiveKind] = useState<ArtifactKindFilter>('all');

  // Featured artifacts for the hero spotlight: interleave the rail items so the
  // carousel alternates across forms (essay, infographic, clip art, …).
  const featured = useMemo(() => {
    const { essays, infographics, clipArt } = getPublishedArtifactRails();
    const out: PublishedArtifactItem[] = [];
    const max = Math.max(essays.length, infographics.length, clipArt.length);
    for (let i = 0; i < max; i++) {
      if (essays[i]) out.push(essays[i]);
      if (infographics[i]) out.push(infographics[i]);
      if (clipArt[i]) out.push(clipArt[i]);
    }
    return out.slice(0, 6);
  }, []);

  // Filter chip — sets the active artifact kind and reflects state for a11y.
  // Styling/transitions live in published-artifacts.css (.artifact-chip).
  const renderChip = (id: ArtifactKindFilter, label: string, count: number) => (
    <button
      key={id}
      type="button"
      className="artifact-chip"
      onClick={() => setActiveKind(id)}
      aria-pressed={activeKind === id}
    >
      {label}
      <span className="artifact-chip__count">{count}</span>
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, color: theme.text }}>
      {/* Hero — one immersive dark "stage" that unifies the headline and the
          featured-artifact carousel into a single composition. Kept as a
          contained panel below the (light) nav so nav legibility is unaffected. */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '5.5rem 2rem 3.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            color: theme.subtle,
          }}
        >
          <Link href="/" style={{ color: theme.subtle, textDecoration: 'none' }}>
            Home
          </Link>
          <span>›</span>
          <span style={{ color: theme.muted }}>Artifacts</span>
        </div>

        <div className="esy-stage">
          <div className="esy-stage__copy">
            <h1 className="esy-stage__title">
              Artifact <span>Gallery</span>
            </h1>
            <p className="esy-stage__subhead">
              Finished work from Esy workflows. Every piece shows exactly how it
              was made.
            </p>
            <div className="esy-stage__meta">
              <span>
                <strong>{TOTAL_ARTIFACTS}</strong> finished pieces
              </span>
              <span className="esy-stage__meta-dot" aria-hidden="true">
                ·
              </span>
              <span>full provenance on every run</span>
            </div>
          </div>

          {/* Featured-artifact spotlight that rotates through real pieces. */}
          <div className="esy-stage__feature">
            <HeroCarousel items={featured} />
          </div>
        </div>
      </section>

      {/* Library band — heading, chips, and rails all inside one elevated
          section so the gallery reads as a single surface (matches /workflows). */}
      <section
        style={{
          background: theme.elevated,
          borderTop: `1px solid ${theme.divider}`,
          borderBottom: `1px solid ${theme.divider}`,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(2.5rem, 5vh, 3.5rem) clamp(1.5rem, 5vw, 3rem)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: '1.5rem',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              color: theme.text,
              marginBottom: '0.4rem',
            }}
          >
            Published artifacts
          </h2>
          <p
            style={{
              fontSize: '0.9375rem',
              color: theme.subtle,
              marginBottom: '1.5rem',
            }}
          >
            Recent outputs, grouped by form.
          </p>

          <div
            role="group"
            aria-label="Filter artifacts by kind"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.625rem',
              marginBottom: '2rem',
            }}
          >
            {KIND_FILTERS.map((f) => renderChip(f.id, f.label, f.count))}
          </div>

          {/* Lead mode strips the showcase's own bg/border/padding so it blends
              into this band instead of starting a second colored surface. */}
          <PublishedArtifactsShowcase activeKind={activeKind} showHeader={false} lead />
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: theme.text, color: theme.bg }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 3rem)',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            Want to create your own?
          </h2>
          <p
            style={{
              fontSize: '1.125rem',
              opacity: 0.8,
              marginBottom: '2rem',
              maxWidth: '480px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
            }}
          >
            Pick a workflow template, run it in Esy, and add the output to your artifact library.
          </p>
          <Link
            href="/workflows/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '1rem 2rem',
              background: theme.accent,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            Browse Workflow Templates
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
