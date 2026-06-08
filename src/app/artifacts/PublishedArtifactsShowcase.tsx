'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  FileText,
  Palette,
} from 'lucide-react';
import {
  getPublishedArtifactRails,
  type PublishedArtifactItem,
  type PublishedArtifactKind,
} from './published-artifacts-data';
import './published-artifacts.css';

const KIND_LABELS: Record<PublishedArtifactKind, string> = {
  essay: 'Visual Essay',
  infographic: 'Infographic',
  'clip-art': 'Clip Art',
};

function kindIcon(kind: PublishedArtifactKind) {
  if (kind === 'essay') return FileText;
  if (kind === 'clip-art') return Palette;
  return BarChart3;
}

function PublishedArtifactCard({
  item,
  index,
}: {
  item: PublishedArtifactItem;
  index: number;
}) {
  const Icon = kindIcon(item.kind);
  const indexLabel = String(index + 1).padStart(2, '0');

  const isClipArt = item.kind === 'clip-art';
  const isInfographic = item.kind === 'infographic';
  const isEssay = item.kind === 'essay';

  return (
    <Link
      href={item.href}
      className={`pa-card pa-card--${item.kind}`}
      style={{ '--pa-accent': item.accentColor } as React.CSSProperties}
    >
      <div className="pa-card__inner">
        <span className="pa-card__index" aria-hidden="true">
          {indexLabel}
        </span>

        <div className={`pa-card__canvas pa-card__canvas--${item.kind}`}>
          <div className="pa-card__glow" aria-hidden="true" />

          {isEssay && (
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              className="pa-card__image pa-card__image--cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {!isEssay && (
            <div
              className={`pa-card__frame ${
                isClipArt ? 'pa-card__frame--clip' : 'pa-card__frame--info'
              }`}
              style={
                isInfographic
                  ? ({ aspectRatio: `${item.width} / ${item.height}` } as React.CSSProperties)
                  : undefined
              }
            >
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                width={item.width}
                height={item.height}
                className="pa-card__image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
        </div>

        <div className="pa-card__body">
          <div className="pa-card__meta">
            <span className="pa-card__type">
              <Icon size={12} strokeWidth={2} aria-hidden="true" />
              {KIND_LABELS[item.kind]}
            </span>
            <span className="pa-card__label">{item.label}</span>
            {item.meta && (
              <>
                <span className="pa-card__meta-sep" aria-hidden="true">·</span>
                <span className="pa-card__meta-extra">{item.meta}</span>
              </>
            )}
          </div>

          <h3 className="pa-card__title">{item.title}</h3>
          <p className="pa-card__desc">{item.description}</p>

          <span className="pa-card__action">
            View artifact
            <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function Rail({
  label,
  count,
  moreHref,
  moreLabel,
  items,
}: {
  label: string;
  count: number;
  moreHref: string;
  moreLabel: string;
  items: PublishedArtifactItem[];
}) {
  if (items.length === 0) return null;
  return (
    <div className="pa-rail">
      <div className="pa-rail__header">
        <div className="pa-rail__label">
          <span className="pa-rail__divider" aria-hidden="true" />
          <span className="pa-rail__label-text">{label}</span>
          <span className="pa-rail__count">{count} recent</span>
        </div>
        <Link className="pa-rail__more" href={moreHref}>
          {moreLabel}
          <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>

      <div className="pa-rail__grid">
        {items.map((item, i) => (
          <PublishedArtifactCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

/** Filter selector for which rails are visible. 'all' shows every kind. */
export type ArtifactKindFilter = PublishedArtifactKind | 'all';

export default function PublishedArtifactsShowcase({
  activeKind = 'all',
  showHeader = true,
  lead = false,
}: {
  activeKind?: ArtifactKindFilter;
  showHeader?: boolean;
  // When the showcase is the lead content under a slim hero, drop the big
  // top padding so the rails sit directly under the page's own chips/heading.
  lead?: boolean;
} = {}) {
  const { essays, infographics, clipArt } = getPublishedArtifactRails();

  if (essays.length === 0 && infographics.length === 0 && clipArt.length === 0) {
    return null;
  }

  // A rail shows when no kind is selected, or it matches the selected kind.
  const shows = (kind: PublishedArtifactKind) =>
    activeKind === 'all' || activeKind === kind;

  return (
    <section className={`pa-section${lead ? ' pa-section--lead' : ''}`}>
      <div className="pa-section__inner">
        {showHeader && (
          <header className="pa-section__header">
            <p className="pa-section__eyebrow">From Esy workflows</p>
            <h2 className="pa-section__title">Published artifacts</h2>
            <p className="pa-section__subtitle">
              Recent outputs across essays, infographics, and clip art, each one
              stored with provenance from a repeatable workflow run.
            </p>
          </header>
        )}

        {/* Stable keys keep a persisting rail mounted across filter changes so
            its cards don't replay the staggered entry animation on every chip click. */}
        <div className="pa-rails">
          {shows('essay') && (
            <Rail
              key="essay"
              label="Visual essays"
              count={essays.length}
              moreHref="/essays/"
              moreLabel="All visual essays"
              items={essays}
            />
          )}
          {shows('infographic') && (
            <Rail
              key="infographic"
              label="Infographics"
              count={infographics.length}
              moreHref="/infographics/"
              moreLabel="All infographics"
              items={infographics}
            />
          )}
          {shows('clip-art') && (
            <Rail
              key="clip-art"
              label="Clip art"
              count={clipArt.length}
              moreHref="/clip-art/"
              moreLabel="All clip art"
              items={clipArt}
            />
          )}
        </div>
      </div>
    </section>
  );
}
