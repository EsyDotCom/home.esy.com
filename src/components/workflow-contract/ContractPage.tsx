// The public contract of one workflow template — rendered entirely from the
// committed registry snapshot (plans/2026-07-21-workflow-contract-pages.md).
// Server component: no client JS beyond native <details>. Navy Calm Light.

import Link from 'next/link';
import type { ContractStep, IntakeField, WorkflowContract } from '@/lib/workflow-contracts';
import { RULE_LINKS } from '@/lib/workflow-contracts';

const t = {
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
  sealed: 'rgba(10, 37, 64, 0.06)',
  mono: "'SF Mono', 'Fira Code', ui-monospace, monospace",
};

const REDACTED = 'redacted';

function Mono({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: t.mono, fontSize: '0.9em' }}>{children}</span>;
}

// A redacted property, rendered deliberately: the key is public, the value is
// sealed. Transparency about what exists is the brand position.
function Sealed({ label }: { label: string }) {
  return (
    <span
      title="This property exists on every version; its value is not public."
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        background: t.sealed, border: `1px solid ${t.border}`, borderRadius: 6,
        padding: '2px 8px', fontFamily: t.mono, fontSize: 12, color: t.subtle,
      }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 018 0v4" />
      </svg>
      {label}
    </span>
  );
}

function Chip({ children, href, tone = 'neutral' }: { children: React.ReactNode; href?: string; tone?: 'neutral' | 'accent' }) {
  const style: React.CSSProperties = {
    display: 'inline-block', padding: '2px 8px', borderRadius: 6, fontSize: 12,
    fontFamily: t.mono, whiteSpace: 'nowrap',
    background: tone === 'accent' ? t.accentLight : t.surface,
    border: `1px solid ${tone === 'accent' ? t.accentBorder : t.border}`,
    color: tone === 'accent' ? t.accent : t.muted,
    textDecoration: 'none',
  };
  return href ? <Link href={href} style={style}>{children}</Link> : <span style={style}>{children}</span>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 15, fontWeight: 700, color: t.text, letterSpacing: '0.02em',
                 textTransform: 'uppercase', margin: '48px 0 16px' }}>
      {children}
    </h2>
  );
}

function IntakeTable({ fields }: { fields: IntakeField[] }) {
  return (
    <div style={{ border: `1px solid ${t.border}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: t.elevated, textAlign: 'left' }}>
              {['Field', 'Type', 'Required', 'Default', 'Description'].map((h) => (
                <th key={h} style={{ padding: '10px 14px', fontSize: 12, color: t.subtle,
                                     fontWeight: 600, borderBottom: `1px solid ${t.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((f) => (
              <tr key={f.name} style={{ borderBottom: `1px solid ${t.divider}`, verticalAlign: 'top' }}>
                <td style={{ padding: '12px 14px' }}>
                  {RULE_LINKS[f.name]
                    ? <Link href={RULE_LINKS[f.name]} style={{ color: t.accent, textDecoration: 'none' }}><Mono>{f.name}</Mono></Link>
                    : <Mono>{f.name}</Mono>}
                </td>
                <td style={{ padding: '12px 14px', color: t.muted }}>
                  <Mono>{f.type}</Mono>
                  {f.artifactType ? <div style={{ marginTop: 4 }}><Chip>{f.artifactType}</Chip></div> : null}
                  {f.options?.length ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                      {f.options.map((o) => (
                        <Chip key={o || '(empty)'} href={RULE_LINKS[o]} tone={RULE_LINKS[o] ? 'accent' : 'neutral'}>
                          {o === '' ? '""' : o}
                        </Chip>
                      ))}
                    </div>
                  ) : null}
                </td>
                <td style={{ padding: '12px 14px', color: f.required ? t.text : t.faint }}>
                  {f.required ? 'required' : 'optional'}
                </td>
                <td style={{ padding: '12px 14px', color: t.muted }}>
                  {f.default === undefined ? '—' : <Mono>{JSON.stringify(f.default)}</Mono>}
                </td>
                <td style={{ padding: '12px 14px', color: t.muted, minWidth: 260, lineHeight: 1.55 }}>
                  {f.description || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StepCard({ step, index, gates }: { step: ContractStep; index: number; gates: WorkflowContract['gates'] }) {
  const isGate = step.role === 'textGate' || Boolean(step.requireTrue);
  const chunked = Boolean(step.repeat);
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0,
          background: isGate ? t.accentLight : t.surface,
          border: `1px solid ${isGate ? t.accentBorder : t.border}`,
          color: isGate ? t.accent : t.muted,
        }}>{index + 1}</div>
        <div style={{ width: 1, flex: 1, background: t.border, minHeight: 12 }} />
      </div>
      <div style={{ paddingBottom: 24, flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 600, color: t.text, fontSize: 15 }}>{step.name || step.id}</span>
          <Chip>{step.kind}</Chip>
          {step.role ? <Chip>{step.role}</Chip> : null}
          {isGate ? <Chip tone="accent">gate</Chip> : null}
          {chunked ? <Chip tone="accent">chunked</Chip> : null}
        </div>
        {chunked && step.repeat ? (
          <p style={{ margin: '8px 0 0', fontSize: 13.5, color: t.muted, lineHeight: 1.6 }}>
            Expands into parallel-safe calls of at most <strong>{step.repeat.maxPerChunk}</strong> items
            each ({step.repeat.countPath ? <Mono>{step.repeat.countPath}</Mono> : 'the requested count'} ÷{' '}
            {step.repeat.maxPerChunk}, rounded up). An 80-item pack plans as{' '}
            {Math.ceil(80 / (step.repeat.maxPerChunk || 40))} chunks over disjoint slices; results
            concatenate in order on <Mono>{step.repeat.mergeKey || 'items'}</Mono>.
          </p>
        ) : null}
        {step.requireTrue ? (
          <p style={{ margin: '8px 0 0', fontSize: 13.5, color: t.muted }}>
            Hard gate: the run fails unless <Mono>{step.requireTrue}</Mono> —{' '}
            {step.failMessage ? <em>{step.failMessage}</em> : 'no silent pass.'}
          </p>
        ) : null}
        {step.emitsArtifact?.artifactType ? (
          <p style={{ margin: '8px 0 0', fontSize: 13.5, color: t.muted }}>
            Ships a durable stage artifact: <Chip>{step.emitsArtifact.artifactType}</Chip>
          </p>
        ) : null}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
          {step.system === REDACTED ? <Sealed label="system" /> : null}
          {step.promptTemplate === REDACTED ? <Sealed label="promptTemplate" /> : null}
          {step.maxTokens === REDACTED ? <Sealed label="maxTokens" /> : null}
        </div>
      </div>
    </div>
  );
}

function VersionTimeline({ versions }: { versions: WorkflowContract['versions'] }) {
  if (!versions.length) {
    return <p style={{ color: t.subtle, fontSize: 14 }}>Version lineage begins with the next publish of this template.</p>;
  }
  const newest = [...versions].reverse();
  return (
    <div>
      {newest.map((v, i) => (
        <div key={`${v.version}-${v.revision}`} style={{ display: 'flex', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%', marginTop: 5, flexShrink: 0,
              background: i === 0 ? t.accent : t.surface,
              border: `2px solid ${i === 0 ? t.accent : t.border}`,
            }} />
            {i < newest.length - 1 ? <div style={{ width: 1, flex: 1, background: t.border }} /> : null}
          </div>
          <div style={{ paddingBottom: 18 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <Mono>{v.version}</Mono>
              <span style={{ color: t.subtle, fontSize: 13 }}>rev {v.revision}</span>
              {i === 0 ? <Chip tone="accent">current</Chip> : null}
              {v.createdAt ? (
                <span style={{ color: t.faint, fontSize: 13 }}>
                  {new Date(v.createdAt).toISOString().slice(0, 10)}
                </span>
              ) : null}
            </div>
            <div style={{ color: t.faint, fontSize: 12, fontFamily: t.mono, marginTop: 3 }}>
              {v.contentHash.slice(0, 16)}…
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ContractPage({ contract }: { contract: WorkflowContract }) {
  const fields = contract.intakeSchema?.fields || [];
  const providerRoles = Object.keys(contract.providers || {});
  return (
    <main style={{ background: t.bg, color: t.text, minHeight: '100vh' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '56px 24px 96px' }}>

        {/* 1 — contract header: the trust signal */}
        <nav style={{ fontSize: 13, color: t.subtle, marginBottom: 20 }}>
          <Link href="/workflows" style={{ color: t.subtle, textDecoration: 'none' }}>Workflows</Link>
          {' / '}
          <Link href={`/workflows/${contract.id}`} style={{ color: t.subtle, textDecoration: 'none' }}>{contract.name}</Link>
          {' / '}<span style={{ color: t.text }}>Contract</span>
        </nav>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, fontFamily: t.mono, letterSpacing: '-0.01em' }}>
            {contract.id}
          </h1>
          <Chip tone={contract.status === 'active' ? 'accent' : 'neutral'}>{contract.status}</Chip>
          <Chip>v{contract.version}</Chip>
        </div>
        <p style={{ fontSize: 16, color: t.muted, lineHeight: 1.65, marginTop: 14, maxWidth: 680 }}>
          {contract.description}
        </p>
        <p style={{ fontSize: 13, color: t.faint, marginTop: 8 }}>
          This page renders the template&rsquo;s published registry entry — the contract itself, not a
          description of it. Immutable versions; sealed properties exist but are not public.
        </p>

        {/* 2 — intake */}
        <SectionTitle>What you provide — intake contract</SectionTitle>
        {fields.length ? <IntakeTable fields={fields} /> : <p style={{ color: t.subtle }}>No intake fields.</p>}

        {/* 3 — step topology */}
        <SectionTitle>How it runs — step topology</SectionTitle>
        <div>
          {contract.runtimeSteps.map((s, i) => (
            <StepCard key={s.id || i} step={s} index={i} gates={contract.gates} />
          ))}
        </div>
        {providerRoles.length ? (
          <p style={{ fontSize: 13.5, color: t.muted, marginTop: 4 }}>
            Model roles: {providerRoles.map((r) => <Chip key={r}>{r}</Chip>).reduce((acc: React.ReactNode[], el, i) => (i ? [...acc, ' ', el] : [el]), [])}
            {' '}<Sealed label="bindings" />
            {contract.budgetPolicy === REDACTED ? <> <Sealed label="budgetPolicy" /></> : null}
          </p>
        ) : null}

        {/* 4 — artifact */}
        <SectionTitle>What you get — artifact</SectionTitle>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip tone="accent">{String((contract.artifactSchema as { artifactType?: string })?.artifactType || contract.outputType)}</Chip>
          <Chip>{contract.artifactClass}</Chip>
        </div>

        {/* 5 — version lineage */}
        <SectionTitle>Version lineage</SectionTitle>
        <VersionTimeline versions={contract.versions || []} />

        {/* 6 — the raw contract: our code rail; also the agent-readable surface */}
        <SectionTitle>Full contract (as served)</SectionTitle>
        <details style={{ border: `1px solid ${t.border}`, borderRadius: 12, background: t.elevated }}>
          <summary style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, color: t.muted }}>
            <Mono>GET /v1/catalog/workflows/{contract.id}</Mono>
          </summary>
          <pre style={{
            margin: 0, padding: 16, overflowX: 'auto', fontSize: 12.5, lineHeight: 1.55,
            fontFamily: t.mono, color: t.text, borderTop: `1px solid ${t.divider}`,
          }}>{JSON.stringify(contract, null, 2)}</pre>
        </details>

        <p style={{ fontSize: 13, color: t.faint, marginTop: 40 }}>
          Snapshot generated {contract.generatedAt ? new Date(contract.generatedAt).toISOString().slice(0, 10) : 'at build time'} from the live registry.
        </p>
      </div>
    </main>
  );
}
