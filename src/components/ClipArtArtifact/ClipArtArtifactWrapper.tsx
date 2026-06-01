'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CLIP_ART_STYLE_COLORS,
  CLIP_ART_STYLE_LABELS,
  clipArtArtifacts,
  getClipArtAspectRatio,
  getClipArtBySubjectGroup,
  type ClipArtArtifact,
} from '@/data/clip-art-artifacts';
import { getManifest, pinLabel } from '@/lib/workflow-manifests';
import './clip-art-artifact.css';

/* ─── Icons ───────────────────────────────────────────────── */

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M10 4L6 8l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M5 2v4H1M11 2v4h4M11 14v-4h4M5 14v-4H1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MagnifyPlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle
        cx="7"
        cy="7"
        r="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14 14l-3.5-3.5M5 7h4M7 5v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MagnifyMinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle
        cx="7"
        cy="7"
        r="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14 14l-3.5-3.5M5 7h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Helpers ───────────────────────────────────────────── */

function formatDate(value?: string): string {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function styleLabel(style: ClipArtArtifact['style']): string {
  return CLIP_ART_STYLE_LABELS[style] || style;
}

/* ─── Main Wrapper ──────────────────────────────────────── */

interface Props {
  artifact: ClipArtArtifact;
}

export default function ClipArtArtifactWrapper({ artifact }: Props) {
  const [cinematicMode, setCinematicMode] = useState(false);
  const [specExpanded, setSpecExpanded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });

  const styleColor = CLIP_ART_STYLE_COLORS[artifact.style] || '#6B7280';
  const aspectRatio = getClipArtAspectRatio(artifact);
  const aspectLabel = aspectRatio === 'custom' ? 'Custom' : aspectRatio;

  // Provenance derived from the pinned workflow manifest (single source of
  // truth for formats/version) + the per-run resolved models recorded on the
  // artifact. See orchestration/standards/workflow-manifest-standard.md.
  const pinned = getManifest(artifact.workflowSlug, artifact.workflowVersion);
  const renderModel = artifact.resolved.renderModel;
  const backgroundModel = artifact.resolved.backgroundRemovalModel;
  const formats = pinned?.manifest.output_contract.formats ?? ['WEBP'];
  const versionPin = pinned ? pinLabel(pinned) : artifact.workflowVersion;

  const siblings = useMemo(() => {
    if (!artifact.subjectGroup) return [];
    return getClipArtBySubjectGroup(artifact.subjectGroup).filter(
      (a) => a.id !== artifact.id,
    );
  }, [artifact.id, artifact.subjectGroup]);

  const groupItems = useMemo(() => {
    if (!artifact.subjectGroup) return [artifact];
    return getClipArtBySubjectGroup(artifact.subjectGroup);
  }, [artifact]);

  const currentIndex = groupItems.findIndex((a) => a.id === artifact.id);
  const prevItem = currentIndex > 0 ? groupItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < groupItems.length - 1 && currentIndex !== -1
      ? groupItems[currentIndex + 1]
      : null;

  /* Cinematic mode keyboard shortcuts */
  useEffect(() => {
    if (!cinematicMode) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCinematicMode(false);
        setZoomed(false);
      } else if (e.key === 'ArrowLeft' && prevItem) {
        window.location.href = `/clip-art/${prevItem.slug}/`;
      } else if (e.key === 'ArrowRight' && nextItem) {
        window.location.href = `/clip-art/${nextItem.slug}/`;
      } else if (e.key === '+' || e.key === '=') {
        setZoomed(true);
      } else if (e.key === '-' || e.key === '0') {
        setZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [cinematicMode, prevItem, nextItem]);

  /* Click-to-zoom inside cinematic viewport */
  const handleViewportClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomOrigin({ x, y });
      setZoomed((prev) => !prev);
    },
    [],
  );

  /* ─── Cinematic Mode ─── */
  if (cinematicMode) {
    return (
      <div className="ca-cinematic">
        <header className="ca-cinematic__toolbar">
          <button
            className="ca-cinematic__exit"
            onClick={() => {
              setCinematicMode(false);
              setZoomed(false);
            }}
            aria-label="Exit cinematic mode"
            title="Exit cinematic mode (Esc)"
          >
            <CollapseIcon />
            <span className="ca-cinematic__exit-label">Exit</span>
          </button>
          <span className="ca-cinematic__title">{artifact.title}</span>
          <div className="ca-cinematic__zoom">
            <button
              className="ca-cinematic__zoom-btn"
              onClick={() => setZoomed(false)}
              aria-label="Reset zoom"
              disabled={!zoomed}
            >
              <MagnifyMinusIcon />
            </button>
            <button
              className="ca-cinematic__zoom-btn"
              onClick={() => setZoomed(true)}
              aria-label="Zoom in"
              disabled={zoomed}
            >
              <MagnifyPlusIcon />
            </button>
          </div>
        </header>

        <div
          className={`ca-cinematic__viewport ${zoomed ? 'ca-cinematic__viewport--zoomed' : ''}`}
          onClick={handleViewportClick}
          role="button"
          tabIndex={0}
          aria-label={zoomed ? 'Click to zoom out' : 'Click to magnify'}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artifact.imageUrl}
            alt={artifact.imageAlt}
            className="ca-cinematic__image"
            style={{
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              transform: zoomed ? 'scale(2.4)' : 'scale(1)',
            }}
          />
        </div>

        {prevItem && (
          <Link
            href={`/clip-art/${prevItem.slug}/`}
            className="ca-cinematic__nav ca-cinematic__nav--prev"
            aria-label={`Previous: ${prevItem.title}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}
        {nextItem && (
          <Link
            href={`/clip-art/${nextItem.slug}/`}
            className="ca-cinematic__nav ca-cinematic__nav--next"
            aria-label={`Next: ${nextItem.title}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}
      </div>
    );
  }

  /* ─── Artifact Mode ─── */
  return (
    <div className="ca-artifact-page">
      {/* Toolbar */}
      <header className="ca-toolbar">
        <Link href="/clip-art" className="ca-toolbar__back">
          <ChevronLeftIcon />
          <span>Clip Art</span>
        </Link>
        <div className="ca-toolbar__right">
          <span
            className="ca-toolbar__badge"
            style={{ '--badge-color': styleColor } as React.CSSProperties}
          >
            {styleLabel(artifact.style)}
          </span>
          <button
            className="ca-toolbar__cinematic"
            onClick={() => setCinematicMode(true)}
            aria-label="Enter cinematic mode"
          >
            <ExpandIcon />
            <span className="ca-toolbar__cinematic-label">Magnify</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="ca-hero-section">
        <div className="ca-hero-section__inner">
          <div className="ca-hero-section__provenance">
            <span
              className="ca-hero-section__provenance-line"
              aria-hidden="true"
            />
            <span className="ca-hero-section__provenance-text">
              <span className="ca-hero-section__provenance-type">Artifact</span>
              <span
                className="ca-hero-section__provenance-sep"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="ca-hero-section__provenance-template">
                Generate Clip Art Asset
              </span>
            </span>
            <span
              className="ca-hero-section__provenance-line"
              aria-hidden="true"
            />
          </div>
          <h1 className="ca-hero-section__title">{artifact.title}</h1>
          <p className="ca-hero-section__subtitle">{artifact.description}</p>
          <div className="ca-hero-section__meta">
            <span className="ca-hero-section__meta-item">
              <span className="ca-hero-section__meta-value">
                {styleLabel(artifact.style)}
              </span>
              <span className="ca-hero-section__meta-label">style</span>
            </span>
            <span className="ca-hero-section__meta-dot" aria-hidden="true" />
            <span className="ca-hero-section__meta-item">
              <span className="ca-hero-section__meta-value">{aspectLabel}</span>
              <span className="ca-hero-section__meta-label">aspect</span>
            </span>
            <span className="ca-hero-section__meta-dot" aria-hidden="true" />
            <span className="ca-hero-section__meta-item">
              <span className="ca-hero-section__meta-value">
                {artifact.width} × {artifact.height}
              </span>
              <span className="ca-hero-section__meta-label">px</span>
            </span>
            <span className="ca-hero-section__meta-dot" aria-hidden="true" />
            <span className="ca-hero-section__meta-item">
              <span className="ca-hero-section__meta-value">{renderModel}</span>
              <span className="ca-hero-section__meta-label">render model</span>
            </span>
          </div>
          <div className="ca-hero-section__actions">
            <a
              href="#ca-image"
              className="ca-hero-section__cta ca-hero-section__cta--primary"
            >
              View Asset
            </a>
            <button
              className="ca-hero-section__cta ca-hero-section__cta--secondary"
              onClick={() => setCinematicMode(true)}
            >
              <ExpandIcon />
              Magnify
            </button>
          </div>
        </div>
      </section>

      {/* Spec Panel */}
      <section className="ca-spec">
        <div className="ca-spec__inner">
          <button
            className="ca-spec__toggle"
            onClick={() => setSpecExpanded((prev) => !prev)}
            aria-expanded={specExpanded}
          >
            <span className="ca-spec__toggle-label">Artifact Spec</span>
            <svg
              className={`ca-spec__toggle-icon ${specExpanded ? 'ca-spec__toggle-icon--open' : ''}`}
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M3 5l3 3 3-3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className={`ca-spec__content ${specExpanded ? 'ca-spec__content--open' : ''}`}
          >
            <div className="ca-spec__grid">
              <Link
                href="/workflows/generate-clip-art-asset/"
                className="ca-spec__card ca-spec__card--link"
              >
                <div className="ca-spec__card-label">Workflow Template</div>
                <div className="ca-spec__card-value">
                  Generate Clip Art Asset
                  <svg
                    className="ca-spec__card-arrow"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 9L9 3M9 3H4M9 3v5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
              <div className="ca-spec__card">
                <div className="ca-spec__card-label">Workflow Version</div>
                <div className="ca-spec__card-value ca-spec__card-value--mono">
                  {versionPin}
                </div>
              </div>
              <div className="ca-spec__card">
                <div className="ca-spec__card-label">Style Preset</div>
                <div className="ca-spec__card-value">
                  {styleLabel(artifact.style)}
                </div>
              </div>
              <div className="ca-spec__card">
                <div className="ca-spec__card-label">Render Model</div>
                <div className="ca-spec__card-value">{renderModel}</div>
              </div>
              <div className="ca-spec__card">
                <div className="ca-spec__card-label">Background</div>
                <div className="ca-spec__card-value">
                  <span className="ca-spec__bool ca-spec__bool--yes">
                    Removed · {backgroundModel}
                  </span>
                </div>
              </div>
              <div className="ca-spec__card">
                <div className="ca-spec__card-label">Aspect Ratio</div>
                <div className="ca-spec__card-value">{aspectLabel}</div>
              </div>
              <div className="ca-spec__card">
                <div className="ca-spec__card-label">Dimensions</div>
                <div className="ca-spec__card-value">
                  {artifact.width} × {artifact.height}
                </div>
              </div>
              <div className="ca-spec__card">
                <div className="ca-spec__card-label">Formats</div>
                <div className="ca-spec__card-value">
                  {formats.join(' · ')}
                </div>
              </div>
              <div className="ca-spec__card">
                <div className="ca-spec__card-label">Generated</div>
                <div className="ca-spec__card-value">
                  {formatDate(artifact.generatedAt)}
                </div>
              </div>
              <div className="ca-spec__card">
                <div className="ca-spec__card-label">Artifact ID</div>
                <div className="ca-spec__card-value ca-spec__card-value--mono">
                  {artifact.id}
                </div>
              </div>
            </div>

            {artifact.prompt && (
              <div className="ca-spec__section">
                <div className="ca-spec__section-label">Resolved Prompt</div>
                <p className="ca-spec__prompt">{artifact.prompt}</p>
              </div>
            )}

            {artifact.tags.length > 0 && (
              <div className="ca-spec__section">
                <div className="ca-spec__section-label">Subject Tags</div>
                <div className="ca-spec__tags">
                  {artifact.tags.map((tag) => (
                    <span key={tag} className="ca-spec__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(artifact.imageUrl || artifact.rawImageUrl) && (
              <div className="ca-spec__section">
                <div className="ca-spec__section-label">Asset Files</div>
                <div className="ca-spec__files">
                  <a
                    href={artifact.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ca-spec__file"
                  >
                    <DownloadIcon />
                    <span>processed.webp</span>
                  </a>
                  {artifact.rawImageUrl && (
                    <a
                      href={artifact.rawImageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ca-spec__file ca-spec__file--secondary"
                    >
                      <DownloadIcon />
                      <span>raw.png</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="ca-image-section" id="ca-image">
        <div className="ca-image-section__container">
          <div className="ca-image-section__canvas">
            <Image
              src={artifact.imageUrl}
              alt={artifact.imageAlt}
              width={artifact.width}
              height={artifact.height}
              quality={95}
              priority
              sizes="(max-width: 1024px) 100vw, 960px"
              className="ca-image-section__image"
            />
          </div>
          <button
            className="ca-image-section__magnify-btn"
            onClick={() => setCinematicMode(true)}
            aria-label="Magnify"
          >
            <MagnifyPlusIcon />
            <span>Magnify</span>
          </button>
        </div>
      </section>

      {/* Subject Group Siblings */}
      {siblings.length > 0 && artifact.subjectGroup && (
        <section className="ca-group">
          <h2 className="ca-group__title">
            More in <span className="ca-group__name">{artifact.subjectGroup}</span>
          </h2>
          <div className="ca-group__grid">
            {siblings.slice(0, 3).map((related) => {
              const color = CLIP_ART_STYLE_COLORS[related.style] || '#6B7280';
              return (
                <Link
                  key={related.id}
                  href={`/clip-art/${related.slug}/`}
                  className="ca-group__card"
                >
                  <div className="ca-group__card-image">
                    <Image
                      src={related.imageUrl}
                      alt={related.imageAlt}
                      width={related.width}
                      height={related.height}
                      sizes="(max-width: 640px) 100vw, 320px"
                    />
                  </div>
                  <div className="ca-group__card-meta">
                    <span
                      className="ca-group__card-style"
                      style={{ color, backgroundColor: `${color}15` }}
                    >
                      {styleLabel(related.style)}
                    </span>
                    <span className="ca-group__card-title">
                      {related.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Workflow CTA */}
      <section className="ca-workflow-cta">
        <div className="ca-workflow-cta__inner">
          <div>
            <p className="ca-workflow-cta__eyebrow">From a workflow template</p>
            <h2 className="ca-workflow-cta__title">
              Want to generate your own?
            </h2>
            <p className="ca-workflow-cta__desc">
              This asset was produced by the Generate Clip Art Asset workflow —
              resolved prompt, provider routing, background removal, and storage
              all handled by Esy.
            </p>
          </div>
          <Link
            href="/workflows/generate-clip-art-asset/"
            className="ca-workflow-cta__btn"
          >
            See the workflow
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10m-4-4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>

      <footer className="ca-artifact-footer">
        <Link href="/" className="ca-artifact-footer__brand">
          <span
            style={{
              fontFamily: 'var(--font-black-ops-one), sans-serif',
              fontSize: '1.5rem',
              letterSpacing: '0.03em',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            <span style={{ color: '#00A896' }}>e</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.92)' }}>sy</span>
          </span>
        </Link>
        <p className="ca-artifact-footer__meta">
          {clipArtArtifacts.length} clip art artifacts published
        </p>
      </footer>
    </div>
  );
}
