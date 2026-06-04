'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import WorkflowPipelineStrip from './WorkflowPipelineStrip';

// Navy Calm Light Theme
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

interface WorkflowTemplate {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  engine?: string;
  estimatedTime?: string;
  workflowStages?: { id: string; label: string; sublabel?: string; isFinal?: boolean }[];
  tags: string[];
}

interface WorkflowCategoryPageProps {
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
  templates: WorkflowTemplate[];
}

export default function WorkflowCategoryPage({
  title,
  subtitle,
  breadcrumbLabel,
  templates,
}: WorkflowCategoryPageProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily: 'var(--font-inter)',
      }}
    >
      {/* Hero */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '7rem 2rem 4rem',
          position: 'relative',
        }}
      >
        {/* Grid background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(10, 37, 64, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(10, 37, 64, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
              fontSize: '0.875rem',
            }}
          >
            <Link
              href="/workflows"
              style={{
                color: theme.muted,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'color 0.2s ease',
              }}
            >
              <ArrowLeft size={16} />
              Agentic Workflows
            </Link>
            <span style={{ color: theme.border }}>/</span>
            <span style={{ color: theme.text }}>{breadcrumbLabel}</span>
          </nav>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '1rem',
              color: theme.text,
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              lineHeight: 1.7,
              color: theme.muted,
              maxWidth: '700px',
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(2rem, 4vh, 3rem) clamp(1.5rem, 5vw, 3rem) clamp(4rem, 8vh, 6rem)',
        }}
      >
        {templates.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: theme.subtle,
            }}
          >
            <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
              No workflow templates available yet.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {templates.map((template) => {
              const isHovered = hoveredCard === template.id;
              return (
                <Link
                  key={template.id}
                  href={`/workflows/${template.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  onMouseEnter={() => setHoveredCard(template.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <article
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1.5rem',
                      background: isHovered ? theme.bg : theme.elevated,
                      border: `1px solid ${isHovered ? theme.accentBorder : theme.border}`,
                      borderRadius: '16px',
                      transition: 'all 0.25s ease',
                      boxShadow: isHovered
                        ? '0 8px 24px rgba(10, 37, 64, 0.08)'
                        : 'none',
                      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                      height: '100%',
                    }}
                  >
                    {/* Header row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        marginBottom: '0.75rem',
                        flexWrap: 'wrap',
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          padding: '0.2rem 0.5rem',
                          background: theme.accentLight,
                          color: theme.accent,
                          borderRadius: '100px',
                          fontSize: '0.625rem',
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                          lineHeight: 1.4,
                        }}
                      >
                        Workflow
                      </span>
                      {template.engine && (
                        <span
                          style={{
                            padding: '0.2rem 0.5rem',
                            background: theme.surface,
                            color: theme.subtle,
                            borderRadius: '100px',
                            fontSize: '0.625rem',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                            lineHeight: 1.4,
                          }}
                        >
                          {template.engine}
                        </span>
                      )}
                      {template.estimatedTime && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            fontSize: '0.6875rem',
                            color: theme.faint,
                            whiteSpace: 'nowrap',
                            lineHeight: 1.4,
                          }}
                        >
                          {template.estimatedTime}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: '1.125rem',
                        fontWeight: 500,
                        color: theme.text,
                        marginBottom: '0.375rem',
                      }}
                    >
                      {template.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: theme.subtle,
                        lineHeight: 1.6,
                        margin: 0,
                        marginBottom: '1rem',
                        flex: 1,
                      }}
                    >
                      {template.shortDescription}
                    </p>

                    {/* Workflow pipeline — shared strip, lights up on card hover. */}
                    {template.workflowStages && template.workflowStages.length > 0 && (
                      <WorkflowPipelineStrip
                        stages={template.workflowStages}
                        active={isHovered}
                      />
                    )}
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <section
          style={{
            marginTop: 'clamp(3rem, 6vh, 4rem)',
            padding: 'clamp(2.5rem, 5vh, 3.5rem)',
            background: theme.elevated,
            borderRadius: '24px',
            border: `1px solid ${theme.border}`,
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              color: theme.text,
            }}
          >
            Explore All Workflow Templates
          </h2>
          <p
            style={{
              fontSize: '1.0625rem',
              color: theme.muted,
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: '0 auto 2rem',
            }}
          >
            Discover workflow templates for visual essays, infographics, academic writing, and more.
          </p>
          <Link
            href="/workflows"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '1rem 2rem',
              background: theme.accent,
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: `0 4px 15px ${theme.accent}40`,
            }}
          >
            Browse All Workflow Templates
            <ArrowRight size={18} />
          </Link>
        </section>
      </section>
    </div>
  );
}
