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

export default function PublishedArtifactsShowcase() {
  const { essays, infographics, clipArt } = getPublishedArtifactRails();

  if (essays.length === 0 && infographics.length === 0 && clipArt.length === 0) {
    return null;
  }

  return (
    <section className="pa-section">
      <div className="pa-section__inner">
        <header className="pa-section__header">
          <p className="pa-section__eyebrow">From Esy workflows</p>
          <h2 className="pa-section__title">Published artifacts</h2>
          <p className="pa-section__subtitle">
            Recent outputs across essays, infographics, and clip art — each one
            stored with provenance from a repeatable workflow run.
          </p>
        </header>

        <div className="pa-rails">
          <Rail
            label="Visual essays"
            count={essays.length}
            moreHref="/essays/"
            moreLabel="All visual essays"
            items={essays}
          />
          <Rail
            label="Infographics"
            count={infographics.length}
            moreHref="/infographics/"
            moreLabel="All infographics"
            items={infographics}
          />
          <Rail
            label="Clip art"
            count={clipArt.length}
            moreHref="/clip-art/"
            moreLabel="All clip art"
            items={clipArt}
          />
        </div>
      </div>
    </section>
  );
}
