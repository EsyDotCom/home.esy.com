'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  FileText,
  BarChart3,
  Palette,
  Archive,
  ClipboardCheck,
  Layers,
} from 'lucide-react';
import { clipArtArtifacts } from '@/data/clip-art-artifacts';
import { publishedInfographics } from '@/data/infographics';
import PublishedArtifactsShowcase from './PublishedArtifactsShowcase';

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

const galleryPaths = [
  {
    id: 'essays',
    title: 'Essays',
    tagline: 'Visual research narratives',
    description: 'Structured reasoning you can revisit — research, narrative, and visuals in one durable artifact.',
    href: '/essays/',
    icon: FileText,
  },
  {
    id: 'infographics',
    title: 'Infographics',
    tagline: 'Citation-verified visual data',
    description: 'Complex information distilled into clear summaries — every data point traces to a source.',
    href: '/infographics/',
    icon: BarChart3,
    count: publishedInfographics.length,
  },
  {
    id: 'clip-art',
    title: 'Clip Art',
    tagline: 'Isolated visual assets',
    description: 'Generated, reviewed, and stored with provenance — transparent backgrounds, workflow-ready.',
    href: '/clip-art/',
    icon: Palette,
    count: clipArtArtifacts.length,
  },
];

const valueProps = [
  {
    icon: Archive,
    title: 'Stable outputs',
    description: 'Not ephemeral like chat — artifacts persist, structured, and revisitable.',
  },
  {
    icon: ClipboardCheck,
    title: 'Auditable provenance',
    description: 'See how conclusions and outputs were reached, not just the final result.',
  },
  {
    icon: Layers,
    title: 'Built by workflows',
    description: 'Every artifact comes from a repeatable process you can run again.',
  },
];

export default function ArtifactsIndexClient() {
  const router = useRouter();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const handlePathClick = (href: string) => {
    router.push(href);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, color: theme.text }}>
      {/* Hero */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '7rem 2rem 4rem',
          position: 'relative',
        }}
      >
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
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

          <h1
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
              color: theme.text,
            }}
          >
            Esy <span style={{ color: theme.accent }}>Artifacts</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
              color: theme.muted,
              maxWidth: '620px',
              marginBottom: 0,
            }}
          >
            Durable outputs from Esy workflows — essays, infographics, and clip art.
            Stable, structured, and auditable.
          </p>
        </div>
      </section>

      {/* Value props */}
      <section
        style={{
          borderTop: `1px solid ${theme.divider}`,
          borderBottom: `1px solid ${theme.divider}`,
          background: theme.elevated,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(2rem, 4vh, 3rem) clamp(1.5rem, 5vw, 3rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {valueProps.map((prop, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <prop.icon size={18} style={{ color: theme.accent }} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: theme.text,
                    marginBottom: '0.25rem',
                  }}
                >
                  {prop.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: theme.subtle, lineHeight: 1.5, margin: 0 }}>
                  {prop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery paths */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 3rem)',
        }}
      >
        <div style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: theme.text,
              marginBottom: '0.5rem',
            }}
          >
            What do you want to explore?
          </h2>
          <p style={{ fontSize: '1rem', color: theme.subtle }}>
            Browse published artifacts by form — each gallery is a workflow output type
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          {galleryPaths.map((path) => {
            const IconComponent = path.icon;
            const isHovered = hoveredPath === path.id;
            return (
              <button
                key={path.id}
                type="button"
                onClick={() => handlePathClick(path.href)}
                onMouseEnter={() => setHoveredPath(path.id)}
                onMouseLeave={() => setHoveredPath(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '1.5rem',
                  background: isHovered ? theme.bg : theme.elevated,
                  border: `1px solid ${isHovered ? theme.accentBorder : theme.border}`,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  textAlign: 'left',
                  boxShadow: isHovered ? '0 8px 24px rgba(10, 37, 64, 0.08)' : 'none',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: isHovered ? theme.accentLight : theme.bg,
                    border: `1px solid ${isHovered ? theme.accentBorder : theme.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <IconComponent
                    size={22}
                    style={{
                      color: isHovered ? theme.accent : theme.subtle,
                      transition: 'color 0.25s ease',
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: theme.text,
                    marginBottom: '0.25rem',
                  }}
                >
                  {path.title}
                </h3>
                <span
                  style={{
                    fontSize: '0.8125rem',
                    color: theme.accent,
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                  }}
                >
                  {path.tagline}
                  {'count' in path && path.count != null ? ` · ${path.count} published` : ''}
                </span>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: theme.subtle,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {path.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <PublishedArtifactsShowcase />

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
