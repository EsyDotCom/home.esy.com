'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  FileText,
  Upload,
  Download,
  Cpu,
  ChevronRight,
} from 'lucide-react';
import WorkflowCircuit from './WorkflowCircuit';
import TemplateGrid from '@/components/templates/TemplateGrid';
import { getExploreArtifactsHref } from '@/lib/templates/explore-artifacts';
import type { ArtifactDetailTemplateProps } from './types';
import './ArtifactDetailTemplate.css';

/**
 * ArtifactDetailTemplate
 *
 * Premium detail page for workflow-type templates. Renders in the Navy Calm
 * Light Theme with animated WorkflowCircuit visualization.
 */

export default function ArtifactDetailTemplate({
  template,
  relatedTemplates,
}: ArtifactDetailTemplateProps) {
  const {
    title,
    description,
    workflowStages,
    workflowDetails,
    outputFormats,
    estimatedTime,
    inputRequirements,
    sampleArtifacts,
    engine,
    pricing,
    subcategory,
  } = template;

  // Deep-link into the app.esy.com workflow runner.
  // The dashboard exposes each workflow at /workflows/{slug} — the SAME path
  // shape as this marketing detail page, just on a different host:
  //   esy.com/workflows/{slug}        → browse / learn
  //   app.esy.com/workflows/{slug}    → configure & launch
  // (See docs/strategy/sessions/2026-05-25-workflow-detail-page-layout-and-design.md
  //  for the full URL-contract rationale.)
  const esyEditorUrl = `https://app.esy.com/workflows/${template.slug}`;
  const exploreArtifactsHref = getExploreArtifactsHref(template);

  // Readable subcategory label
  const categoryLabel = subcategory
    ? subcategory
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Workflow';

  return (
    <div className="adt-page">
      {/* ═══ Hero Wrapper (grid bg covers breadcrumb + hero) ══ */}
      <div className="adt-hero-wrapper">
        {/* ═══ Breadcrumb ═══════════════════════════════════════ */}
        <nav className="adt-breadcrumb" aria-label="Breadcrumb">
          <Link href="/workflows">Agentic Workflows</Link>
          <span className="adt-breadcrumb-sep" aria-hidden="true">
            <ChevronRight size={12} />
          </span>
          <Link href="/workflows">{categoryLabel}</Link>
          <span className="adt-breadcrumb-sep" aria-hidden="true">
            <ChevronRight size={12} />
          </span>
          <span className="adt-breadcrumb-current">{title}</span>
        </nav>

        {/* ═══ Hero ═════════════════════════════════════════════ */}
        <section className="adt-hero">
          <div className="adt-hero-text">
            {/* Badges */}
            <div className="adt-hero-badges">
              <span className="adt-badge adt-badge--category">
                Workflow Template
              </span>
              {engine && (
                <span className="adt-badge adt-badge--engine">
                  <Cpu size={12} />
                  {engine}
                </span>
              )}
              {estimatedTime && (
                <span className="adt-badge adt-badge--time">
                  <Clock size={12} />
                  {estimatedTime}
                </span>
              )}
              {outputFormats && outputFormats.length > 0 && (
                <span className="adt-badge adt-badge--format">
                  <FileText size={12} />
                  {outputFormats.join(' / ')}
                </span>
              )}
            </div>

            <h1 className="adt-hero-title">{title}</h1>
            <p className="adt-hero-description">{description}</p>

            {/* CTAs */}
            <div className="adt-ctas">
              <a
                href={esyEditorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="adt-cta-primary"
              >
                Run in Esy
                <ArrowRight size={16} />
              </a>
              <Link href={exploreArtifactsHref} className="adt-cta-secondary">
                Explore Artifacts
              </Link>
            </div>
          </div>

          {/* Side card (pricing) */}
          {pricing && pricing.price && (
            <div className="adt-hero-side">
              <div className="adt-pricing-card">
                <p className="adt-pricing-value">
                  ${pricing.price.toFixed(2)}
                </p>
                <p className="adt-pricing-label">per run</p>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ═══ Spec At-a-Glance (What You Provide / What You Get) ═ */}
      <section className="adt-band adt-band--elevated">
        <div className="adt-band-inner adt-spec-section">
          {/* Inputs */}
          <div className="adt-spec-block">
            <h3>What You Provide</h3>
            <ul className="adt-spec-list">
              {inputRequirements && inputRequirements.length > 0 ? (
                inputRequirements.map((req, i) => (
                  <li key={i} className="adt-spec-item">
                    <Upload size={18} className="adt-spec-icon" />
                    <span>{req}</span>
                  </li>
                ))
              ) : (
                <li className="adt-spec-item">
                  <Upload size={18} className="adt-spec-icon" />
                  <span>A topic, citation, or research question</span>
                </li>
              )}
            </ul>
          </div>

          {/* Outputs */}
          <div className="adt-spec-block">
            <h3>What You Get</h3>
            <ul className="adt-spec-list">
              <li className="adt-spec-item">
                <Download size={18} className="adt-spec-icon" />
                <span>
                  A publication-ready artifact produced by the full workflow pipeline
                </span>
              </li>
              {engine && (
                <li className="adt-spec-item">
                  <Cpu size={18} className="adt-spec-icon" />
                  <span>Generated with {engine}</span>
                </li>
              )}
              {estimatedTime && (
                <li className="adt-spec-item">
                  <Clock size={18} className="adt-spec-icon" />
                  <span>Delivered in {estimatedTime}</span>
                </li>
              )}
            </ul>

            {/* Format badges */}
            {outputFormats && outputFormats.length > 0 && (
              <div className="adt-format-badges">
                {outputFormats.map((fmt) => (
                  <span key={fmt} className="adt-format-badge">
                    {fmt}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ Workflow Visualization ═══════════════════════════ */}
      {workflowStages && workflowStages.length > 0 && (
        <section className="adt-band adt-band--default adt-workflow-section">
          <div className="adt-band-inner adt-workflow-inner">
            <p className="adt-section-eyebrow">How this workflow runs</p>
            <WorkflowCircuit stages={workflowStages} />
          </div>
        </section>
      )}

      {/* ═══ Workflow Details ══════════════════════════════════ */}
      {workflowDetails && workflowDetails.length > 0 && (
        <section className="adt-steps-section">
          <header className="adt-steps-header">
            <p className="adt-section-eyebrow">Inside the workflow</p>
            <h2>What happens at each step</h2>
          </header>

          <ol className="adt-steps">
            {workflowDetails.map((detail, index) => {
              const isBeforeAfter =
                detail.examples?.length === 2 &&
                detail.examples[0].label.toLowerCase() === 'before' &&
                detail.examples[1].label.toLowerCase() === 'after';

              return (
                <li key={detail.id} className="adt-step">
                  <div className="adt-step-marker" aria-hidden="true">
                    <span className="adt-step-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="adt-step-body">
                    <h3 className="adt-step-title">{detail.title}</h3>
                    <p className="adt-step-desc">{detail.description}</p>

                    {detail.examples && detail.examples.length > 0 && (
                      isBeforeAfter ? (
                        <div className="adt-step-prompt">
                          <div className="adt-step-prompt-row">
                            <span className="adt-step-prompt-label">Before</span>
                            <p className="adt-step-prompt-text adt-step-prompt-text--before">
                              {detail.examples[0].value}
                            </p>
                          </div>
                          <div className="adt-step-prompt-arrow" aria-hidden="true">
                            <ArrowRight size={14} />
                          </div>
                          <div className="adt-step-prompt-row">
                            <span className="adt-step-prompt-label adt-step-prompt-label--accent">
                              After
                            </span>
                            <p className="adt-step-prompt-text">
                              {detail.examples[1].value}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <dl className="adt-step-meta">
                          {detail.examples.map((example) => (
                            <div key={example.label} className="adt-step-meta-row">
                              <dt>{example.label}</dt>
                              <dd>{example.value}</dd>
                            </div>
                          ))}
                        </dl>
                      )
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {/* ═══ Sample Artifacts ════════════════════════════════ */}
      {sampleArtifacts && sampleArtifacts.length > 0 && (
        <section className="adt-band adt-band--elevated">
          <div className="adt-band-inner adt-samples-section">
            <header className="adt-samples-header">
              <p className="adt-section-eyebrow">From this workflow</p>
              <h3>Example outputs</h3>
            </header>
            <div className="adt-samples-grid">
              {sampleArtifacts.map((sample, i) => {
                const ratio = sample.imageAspectRatio ?? '1:1';
                const ratioClass = `adt-sample-image--${ratio.replace(':', '-')}`;
                const isMedia = Boolean(sample.imageUrl);
                return (
                  <div
                    key={i}
                    className={`adt-sample-card${isMedia ? ' adt-sample-card--media' : ''}`}
                  >
                    {isMedia && (
                      <div className={`adt-sample-image ${ratioClass}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={sample.imageUrl}
                          alt={sample.imageAlt || sample.title}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="adt-sample-body">
                      <p className="adt-sample-title">{sample.title}</p>
                      <p className="adt-sample-desc">{sample.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ Related Workflow Templates ══════════════════════ */}
      {relatedTemplates.length > 0 && (
        <section className="adt-related-section">
          <h3>Related Workflow Templates</h3>
          <TemplateGrid templates={relatedTemplates} columns={3} />
        </section>
      )}
    </div>
  );
}
