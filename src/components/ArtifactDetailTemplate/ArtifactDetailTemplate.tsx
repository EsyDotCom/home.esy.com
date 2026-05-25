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
    outputFormats,
    estimatedTime,
    inputRequirements,
    sampleArtifacts,
    engine,
    pricing,
    subcategory,
  } = template;

  const esyEditorUrl = `https://app.esy.com?workflow=${template.slug}`;

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
              <Link href="/essays" className="adt-cta-secondary">
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

      {/* ═══ Workflow Visualization ═══════════════════════════ */}
      {workflowStages && workflowStages.length > 0 && (
        <section className="adt-workflow-section">
          <div className="adt-workflow-inner">
            <p className="adt-section-eyebrow">How this workflow runs</p>
            <WorkflowCircuit stages={workflowStages} />
          </div>
        </section>
      )}

      {/* ═══ What You Provide / What You Get ══════════════════ */}
      <section className="adt-spec-section">
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
      </section>

      {/* ═══ Sample Artifacts ════════════════════════════════ */}
      {sampleArtifacts && sampleArtifacts.length > 0 && (
        <section className="adt-samples-section">
          <h3>Example Outputs</h3>
          <div className="adt-samples-grid">
            {sampleArtifacts.map((sample, i) => (
              <div key={i} className="adt-sample-card">
                <p className="adt-sample-title">{sample.title}</p>
                <p className="adt-sample-desc">{sample.description}</p>
              </div>
            ))}
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
