'use client';

import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Clock,
  ShieldCheck,
  GitBranch,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import {
  getWorkflowCatalog,
  getCatalogGeneratedAt,
  ARTIFACT_CLASS_LABELS,
  type WorkflowCatalogEntry,
} from '@/lib/workflow-catalog';

// Navy Calm Light Theme (matches /workflows).
const theme = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  surface: '#F1F5F9',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  faint: 'rgba(10, 37, 64, 0.35)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
  accentLight: 'rgba(0, 168, 150, 0.08)',
  accentBorder: 'rgba(0, 168, 150, 0.2)',
};

const APP_URL = 'https://app.esy.com';

// Order artifact classes deterministically; unknown classes fall to the end.
const CLASS_ORDER = ['research', 'visual', 'video', 'knowledge'];

export default function CatalogClient() {
  const entries = useMemo(() => getWorkflowCatalog(), []);
  const generatedAt = useMemo(() => getCatalogGeneratedAt(), []);

  // Class filter pills, built from whatever classes are actually present.
  const classes = useMemo(() => {
    const present = Array.from(new Set(entries.map((e) => e.artifactClass)));
    return present.sort((a, b) => {
      const ai = CLASS_ORDER.indexOf(a);
      const bi = CLASS_ORDER.indexOf(b);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
  }, [entries]);

  const [activeClass, setActiveClass] = useState<string | null>(null);
  const visible = activeClass ? entries.filter((e) => e.artifactClass === activeClass) : entries;

  const formattedDate = useMemo(() => {
    try {
      return new Date(generatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return generatedAt;
    }
  }, [generatedAt]);

  return (
    <main style={{ background: theme.bg, color: theme.text, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '5rem 1.5rem 6rem' }}>
        {/* Hero */}
        <header style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              borderRadius: 999,
              background: theme.accentLight,
              border: `1px solid ${theme.accentBorder}`,
              color: theme.accent,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: '1.5rem',
            }}
          >
            <Layers size={14} />
            Workflow Catalog
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em' }}>
            Workflows you can run on Esy
          </h1>
          <p style={{ fontSize: '1.125rem', color: theme.muted, maxWidth: 640, marginTop: '1.25rem', lineHeight: 1.6 }}>
            Each entry is a versioned, repeatable workflow template. Give it inputs, and it produces a durable
            artifact with full provenance — research reports, infographics, clip art, and more.
          </p>
        </header>

        {/* Class filter */}
        {classes.length > 1 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '2rem' }}>
            <FilterPill label="All" active={activeClass === null} onClick={() => setActiveClass(null)} />
            {classes.map((c) => (
              <FilterPill
                key={c}
                label={ARTIFACT_CLASS_LABELS[c] ?? c}
                active={activeClass === c}
                onClick={() => setActiveClass(c)}
              />
            ))}
          </div>
        )}

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '1.25rem' }}>
          {visible.map((entry) => (
            <CatalogCard key={entry.id} entry={entry} />
          ))}
        </div>

        {/* Provenance footer */}
        <p style={{ marginTop: '3rem', fontSize: 13, color: theme.faint }}>
          Synced from the Esy platform · last updated {formattedDate}
        </p>
      </div>
    </main>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 16px',
        borderRadius: 999,
        border: `1px solid ${active ? theme.accentBorder : theme.border}`,
        background: active ? theme.accentLight : 'transparent',
        color: active ? theme.accent : theme.muted,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      {label}
    </button>
  );
}

function CatalogCard({ entry }: { entry: WorkflowCatalogEntry }) {
  return (
    <div
      style={{
        border: `1px solid ${theme.border}`,
        borderRadius: 16,
        background: theme.elevated,
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: theme.accent,
              background: theme.accentLight,
              padding: '3px 8px',
              borderRadius: 6,
            }}
          >
            {ARTIFACT_CLASS_LABELS[entry.artifactClass] ?? entry.artifactClass}
          </span>
          <span style={{ fontSize: 11, color: theme.faint, fontFamily: 'monospace' }}>v{entry.version}</span>
        </div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>{entry.name}</h2>
        <p style={{ fontSize: 14, color: theme.muted, marginTop: 8, lineHeight: 1.5 }}>{entry.shortDescription}</p>
      </div>

      {/* What you provide / get */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <ProvideGet label="You provide" items={entry.whatYouProvide} />
        <ProvideGet label="You get" items={entry.whatYouGet} accent />
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', fontSize: 12, color: theme.subtle }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <Clock size={13} /> {entry.estimatedRuntime}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <GitBranch size={13} /> {entry.depth}
        </span>
        {entry.includesQa && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: theme.accent }}>
            <ShieldCheck size={13} /> QA
          </span>
        )}
      </div>

      <a
        href={`${APP_URL}/workflows/${entry.id}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: 'auto',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          padding: '10px 16px',
          borderRadius: 10,
          background: theme.text,
          color: '#fff',
          fontSize: 14,
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Run on Esy <ArrowUpRight size={15} />
      </a>
    </div>
  );
}

function ProvideGet({ label, items, accent }: { label: string; items: string[]; accent?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: theme.faint, marginBottom: 5 }}>
        {label}
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 13, color: theme.muted }}>
            <CheckCircle2 size={14} style={{ color: accent ? theme.accent : theme.faint, flexShrink: 0, marginTop: 2 }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
