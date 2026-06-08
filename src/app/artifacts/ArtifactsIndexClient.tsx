'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { clipArtArtifacts } from '@/data/clip-art-artifacts';
import { publishedInfographics } from '@/data/infographics';
import { publishedVisualEssays } from '@/data/visualEssays';
import LibraryHero from '@/components/LibraryHero/LibraryHero';
import HeroCarousel, {
  type HeroCarouselItem,
} from '@/components/LibraryHero/HeroCarousel';
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

export default function ArtifactsIndexClient() {
  const [activeKind, setActiveKind] = useState<ArtifactKindFilter>('all');

  // Featured artifacts for the hero spotlight: interleave the rail items so the
  // carousel alternates across forms (essay, infographic, clip art, …).
  const featured = useMemo<HeroCarouselItem[]>(() => {
    const { essays, infographics, clipArt } = getPublishedArtifactRails();
    const out: PublishedArtifactItem[] = [];
    const max = Math.max(essays.length, infographics.length, clipArt.length);
    for (let i = 0; i < max; i++) {
      if (essays[i]) out.push(essays[i]);
      if (infographics[i]) out.push(infographics[i]);
      if (clipArt[i]) out.push(clipArt[i]);
    }
    // Map to the shared carousel shape; the kind drives the eyebrow label.
    return out.slice(0, 6).map((item) => ({
      id: item.id,
      href: item.href,
      imageSrc: item.imageSrc,
      label: KIND_DISPLAY[item.kind],
      title: item.title,
    }));
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
      {/* Hero — shared immersive library "stage" with a rotating spotlight of
          real, featured artifacts. */}
      <LibraryHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Artifacts' }]}
        title={<>Artifact <span>Gallery</span></>}
        subhead="Finished work from Esy workflows. Every piece shows exactly how it was made."
        meta={
          <>
            <span>
              <strong>{TOTAL_ARTIFACTS}</strong> finished pieces
            </span>
            <span className="esy-stage__meta-dot" aria-hidden="true">
              ·
            </span>
            <span>full provenance on every run</span>
          </>
        }
        feature={<HeroCarousel items={featured} ariaLabel="Featured artifacts" />}
      />

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
