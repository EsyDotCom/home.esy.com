'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  CLIP_ART_STYLE_COLORS,
  CLIP_ART_STYLE_LABELS,
  clipArtArtifacts,
  getUniqueStyles,
  type ClipArtArtifact,
  type ClipArtStyle,
} from '@/data/clip-art-artifacts';
import LibraryHero from '@/components/LibraryHero/LibraryHero';
import HeroCarousel, {
  type HeroCarouselItem,
} from '@/components/LibraryHero/HeroCarousel';
import './clip-art.css';

const ALL_FILTER = '__all__';

function ClipArtCard({ artifact }: { artifact: ClipArtArtifact }) {
  const color = CLIP_ART_STYLE_COLORS[artifact.style] || '#6B7280';

  return (
    <Link href={`/clip-art/${artifact.slug}/`} className="ca-card">
      <div className="ca-card__image-wrap">
        <Image
          src={artifact.imageUrl}
          alt={artifact.imageAlt}
          width={artifact.width}
          height={artifact.height}
          className="ca-card__image"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="ca-card__meta">
        <span
          className="ca-card__style"
          style={{ color, backgroundColor: `${color}15` }}
        >
          {CLIP_ART_STYLE_LABELS[artifact.style] || artifact.style}
        </span>
        <h3 className="ca-card__title">{artifact.title}</h3>
      </div>
    </Link>
  );
}

export default function ClipArtIndexClient() {
  const [activeStyle, setActiveStyle] = useState<string>(ALL_FILTER);
  const styles = useMemo(() => getUniqueStyles(), []);

  const filtered = useMemo(() => {
    if (activeStyle === ALL_FILTER) return clipArtArtifacts;
    return clipArtArtifacts.filter((a) => a.style === activeStyle);
  }, [activeStyle]);

  // Spotlight the first handful of assets in the shared hero carousel.
  const featured = useMemo<HeroCarouselItem[]>(
    () =>
      clipArtArtifacts
        .filter((a) => a.imageUrl)
        .slice(0, 6)
        .map((a) => ({
          id: a.id,
          href: `/clip-art/${a.slug}/`,
          imageSrc: a.imageUrl,
          label: CLIP_ART_STYLE_LABELS[a.style] || 'Clip Art',
          title: a.title,
        })),
    [],
  );

  return (
    <div className="ca-page">
      {/* Hero — shared immersive library "stage" with a rotating asset spotlight. */}
      <LibraryHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Artifacts', href: '/artifacts' },
          { label: 'Clip Art' },
        ]}
        title={<>Clip <span>Art</span></>}
        subhead="Isolated visual assets, generated and reviewed as Esy artifacts. Always transparent, ready to drop into anything."
        meta={
          <>
            <span>
              <strong>{clipArtArtifacts.length}</strong>{' '}
              {clipArtArtifacts.length === 1 ? 'asset' : 'assets'}
            </span>
            <span className="esy-stage__meta-dot" aria-hidden="true">
              ·
            </span>
            <span>
              <strong>{styles.length}</strong>{' '}
              {styles.length === 1 ? 'style' : 'styles'}
            </span>
            <span className="esy-stage__meta-dot" aria-hidden="true">
              ·
            </span>
            <span>transparent webp</span>
          </>
        }
        feature={<HeroCarousel items={featured} ariaLabel="Featured clip art" />}
      />

      {/* Style filter pills */}
      {styles.length > 1 && (
        <nav className="ca-filters" aria-label="Filter by style">
          <button
            type="button"
            className={`ca-filter ${activeStyle === ALL_FILTER ? 'ca-filter--active' : ''}`}
            onClick={() => setActiveStyle(ALL_FILTER)}
          >
            All
          </button>
          {styles.map((style) => (
            <button
              key={style}
              type="button"
              className={`ca-filter ${activeStyle === style ? 'ca-filter--active' : ''}`}
              onClick={() => setActiveStyle(style as ClipArtStyle)}
            >
              {CLIP_ART_STYLE_LABELS[style]}
            </button>
          ))}
        </nav>
      )}

      {/* Masonry gallery — preserves natural aspect ratios */}
      <section className="ca-masonry" aria-label="Clip art gallery">
        {filtered.length === 0 ? (
          <div className="ca-empty">No clip art in this style yet.</div>
        ) : (
          filtered.map((artifact) => (
            <ClipArtCard key={artifact.id} artifact={artifact} />
          ))
        )}
      </section>

      {/* Coming soon + workflow CTA */}
      <section className="ca-coming-soon">
        <p className="ca-coming-soon__text">
          More clip art in development. Each asset is generated, reviewed, and
          stored with full provenance — prompt, model, processing, and cost.
        </p>
        <Link
          href="/workflows/generate-clip-art-asset/"
          className="ca-cta"
        >
          Generate your own
          <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}
