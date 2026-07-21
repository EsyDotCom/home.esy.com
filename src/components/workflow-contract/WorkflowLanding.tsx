// Consumer landing for a catalog workflow — the page between the /workflows
// card and the app: what it makes, what you provide, what you get, and the
// two doors (run it; read the contract). Rendered from the committed catalog
// snapshot + contract snapshot (plans/2026-07-21-workflow-contract-pages.md).

import Link from 'next/link';
import type { WorkflowCatalogEntry } from '@/lib/workflow-catalog';
import { ARTIFACT_CLASS_LABELS } from '@/lib/workflow-catalog';
import type { WorkflowContract } from '@/lib/workflow-contracts';

const t = {
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
  mono: "'SF Mono', 'Fira Code', ui-monospace, monospace",
};

const APP_URL = 'https://app.esy.com';

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ flex: 1, minWidth: 240 }}>
      <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
                   letterSpacing: '0.04em', color: t.subtle, margin: '0 0 12px' }}>{title}</h2>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {items.map((item) => (
          <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'baseline',
                                  padding: '7px 0', color: t.muted, fontSize: 15, lineHeight: 1.55 }}>
            <span style={{ color: t.accent, flexShrink: 0 }}>—</span>{item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WorkflowLanding({
  entry,
  contract,
}: {
  entry: WorkflowCatalogEntry;
  contract: WorkflowContract | null;
}) {
  const stages = entry.stages || [];
  return (
    <main style={{ background: t.bg, color: t.text, minHeight: '100vh' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '56px 24px 96px' }}>
        <nav style={{ fontSize: 13, color: t.subtle, marginBottom: 24 }}>
          <Link href="/workflows" style={{ color: t.subtle, textDecoration: 'none' }}>Workflows</Link>
          {' / '}<span style={{ color: t.text }}>{entry.name}</span>
        </nav>

        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 12.5, background: t.accentLight,
                         border: `1px solid ${t.accentBorder}`, color: t.accent, fontWeight: 600 }}>
            {ARTIFACT_CLASS_LABELS[entry.artifactClass] || entry.artifactClass}
          </span>
          <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 12.5, background: t.surface,
                         border: `1px solid ${t.border}`, color: t.muted, fontFamily: t.mono }}>
            {entry.id}
          </span>
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          {entry.name}
        </h1>
        <p style={{ fontSize: 17, color: t.muted, lineHeight: 1.7, marginTop: 16, maxWidth: 640 }}>
          {entry.description}
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
          <a href={`${APP_URL}/workflows/${entry.id}`} target="_blank" rel="noopener noreferrer"
             style={{ background: t.text, color: '#fff', padding: '11px 22px', borderRadius: 10,
                      fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
            Run this workflow →
          </a>
          <Link href={`/workflows/${entry.id}/contract`}
                style={{ background: t.bg, color: t.text, padding: '11px 22px', borderRadius: 10,
                         fontSize: 15, fontWeight: 700, textDecoration: 'none',
                         border: `1px solid ${t.border}` }}>
            Full contract
          </Link>
        </div>

        {stages.length ? (
          <div style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
                         letterSpacing: '0.04em', color: t.subtle, margin: '0 0 14px' }}>How it runs</h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {stages.map((s, i) => (
                <div key={s.name} style={{ background: t.elevated, border: `1px solid ${t.border}`,
                                           borderRadius: 12, padding: '12px 16px', flex: '1 1 180px' }}>
                  <div style={{ fontSize: 12, color: t.faint, fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: 4 }}>{s.name}</div>
                  {s.description ? (
                    <div style={{ fontSize: 13, color: t.subtle, marginTop: 4, lineHeight: 1.5 }}>{s.description}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div style={{ display: 'flex', gap: 40, marginTop: 48, flexWrap: 'wrap' }}>
          <List title="What you provide" items={entry.whatYouProvide || []} />
          <List title="What you get" items={entry.whatYouGet || []} />
        </div>

        <p style={{ fontSize: 13, color: t.faint, marginTop: 48 }}>
          Template <span style={{ fontFamily: t.mono }}>{entry.id}</span> · version{' '}
          <span style={{ fontFamily: t.mono }}>{entry.version}</span>
          {contract?.versions?.length ? <> · {contract.versions.length} published version{contract.versions.length === 1 ? '' : 's'}</> : null}
          {' · '}immutable —{' '}
          <Link href={`/workflows/${entry.id}/contract`} style={{ color: t.accent }}>see the contract</Link>.
        </p>
      </div>
    </main>
  );
}
