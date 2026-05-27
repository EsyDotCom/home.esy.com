"use client";

import Link from "next/link";
import {
  Layers,
  UserCog,
  Workflow,
  FileCode,
  Palette,
  ArrowRight,
  Box,
} from "lucide-react";
import { DocsPageNav } from "@/components/docs";

const theme = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  surface: '#F1F5F9',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  divider: 'rgba(10, 37, 64, 0.05)',
  accent: '#00A896',
};

const pages = [
  {
    title: 'Foundations',
    description: 'Workflow Schema, Workflow Template, Workflow Specification — the three primitives every Esy workflow is built on.',
    href: '/docs/foundations',
    icon: <Box className="w-5 h-5" />,
    section: 'System',
  },
  {
    title: 'Core Model',
    description: 'Execution architecture — how intent becomes artifact through structured workflows.',
    href: '/docs/core-model',
    icon: <Layers className="w-5 h-5" />,
    section: 'System',
  },
  {
    title: 'Roles',
    description: 'Agent contracts that define behavior, constraints, and output expectations.',
    href: '/docs/roles',
    icon: <UserCog className="w-5 h-5" />,
    section: 'System',
  },
  {
    title: 'Workflows',
    description: 'Execution pipelines — sequenced steps with defined inputs, outputs, and quality gates.',
    href: '/docs/workflows',
    icon: <Workflow className="w-5 h-5" />,
    section: 'System',
  },
  {
    title: 'Artifact Specifications',
    description: 'Structure, metadata, authorship provenance, and the spec panel readers see on every essay.',
    href: '/docs/specs',
    icon: <FileCode className="w-5 h-5" />,
    section: 'Artifacts',
  },
  {
    title: 'Designing Visual Essays',
    description: 'Design doctrine, interaction patterns, and the trust model that governs scroll-driven experiences.',
    href: '/docs/designing-visual-essays',
    icon: <Palette className="w-5 h-5" />,
    section: 'Artifacts',
  },
];

const DocsHomeClient = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: 'var(--font-inter)',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 5vw, 2rem)',
        paddingTop: 'clamp(5rem, 12vh, 7rem)',
        paddingBottom: 'clamp(4rem, 8vh, 6rem)',
      }}>

        {/* Header */}
        <header style={{ marginBottom: 'clamp(3rem, 8vh, 5rem)' }}>
          <h1 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.025em',
            marginBottom: '1.5rem',
            color: theme.text,
            lineHeight: 1.15,
          }}>
            How Esy Makes Things
          </h1>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.7,
            color: theme.muted,
            maxWidth: '600px',
          }}>
            Esy publishes its production methodology. These pages describe the system, workflows, and design decisions behind every artifact we produce — so readers can inspect not just what we made, but how and why.
          </p>
        </header>

        {/* The Production Model */}
        <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: theme.text,
          }}>
            The Production Model
          </h2>

          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.85,
            color: theme.muted,
            marginBottom: '1.5rem',
          }}>
            Every Esy artifact — visual essay, brief, infographic — follows the same production structure:
          </p>

          <p style={{
            fontSize: '1.0625rem',
            marginBottom: '1.5rem',
            color: theme.text,
            fontWeight: 500,
          }}>
            Intent → Context → Workflows → Artifacts → Quality Assurance
          </p>

          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: '1.5rem 0',
          }}>
            {[
              { term: 'Intent', def: 'what we are trying to produce and why' },
              { term: 'Context', def: 'constraints on information, scope, and source requirements' },
              { term: 'Workflows', def: 'orchestration of actions across agents and tools' },
              { term: 'Artifacts', def: 'outputs with structure, metadata, and provenance' },
              { term: 'Quality Assurance', def: 'secondary passes for rigor, accuracy, and refinement' },
            ].map((item) => (
              <li key={item.term} style={{ marginBottom: '0.75rem', fontSize: '1.0625rem', color: theme.muted }}>
                <strong style={{ color: theme.text, fontWeight: 600 }}>{item.term}</strong> — {item.def}
              </li>
            ))}
          </ul>

          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.85,
            color: theme.muted,
          }}>
            Most AI content failures happen because these steps are implicit or skipped. Esy makes them <strong style={{ color: theme.text, fontWeight: 600 }}>explicit, inspectable, and reusable</strong>.
          </p>
        </section>

        {/* Why Transparency */}
        <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
          <div style={{
            fontSize: '1rem',
            lineHeight: 1.8,
            color: theme.subtle,
            padding: '1.5rem',
            background: theme.surface,
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
          }}>
            <h3 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: '1.125rem',
              fontWeight: 400,
              color: theme.muted,
              marginBottom: '1rem',
            }}>
              Why We Publish This
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              Esy produces content using AI systems. We believe readers deserve to know how that content is made — which model produced it, what sources informed it, whether a human wrote it or directed the AI, and what quality checks it passed.
            </p>
            <p style={{ margin: 0 }}>
              These docs are that transparency. They are not marketing. They are the actual methodology.
            </p>
          </div>
        </section>

        {/* Pages */}
        <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '2rem',
            color: theme.text,
          }}>
            Documentation
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  background: theme.elevated,
                  border: `1px solid ${theme.border}`,
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: `${theme.accent}12`,
                  border: `1px solid ${theme.accent}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.accent,
                  flexShrink: 0,
                  marginTop: '0.125rem',
                }}>
                  {page.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.25rem' }}>
                    <span style={{
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: theme.text,
                    }}>
                      {page.title}
                    </span>
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: theme.subtle,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.04em',
                    }}>
                      {page.section}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '0.875rem',
                    color: theme.muted,
                    lineHeight: 1.5,
                    margin: 0,
                  }}>
                    {page.description}
                  </p>
                </div>
                <ArrowRight style={{
                  width: '16px',
                  height: '16px',
                  color: theme.subtle,
                  flexShrink: 0,
                  marginTop: '0.5rem',
                }} />
              </Link>
            ))}
          </div>
        </section>

        {/* About */}
        <section>
          <div style={{
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            color: theme.subtle,
            paddingTop: '2rem',
            borderTop: `1px solid ${theme.divider}`,
          }}>
            <h4 style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: theme.subtle,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
            }}>
              About These Docs
            </h4>
            <p style={{ margin: 0 }}>
              These docs describe the production system behind Esy artifacts. They are a living reference — updated as the methodology evolves.
            </p>
          </div>
        </section>

        <div style={{ marginTop: '3rem' }}>
          <DocsPageNav />
        </div>
      </div>
    </div>
  );
};

export default DocsHomeClient;
