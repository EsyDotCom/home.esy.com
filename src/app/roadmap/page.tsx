import Link from 'next/link';

export const metadata = {
  title: 'Roadmap',
  description:
    'What Esy has shipped, what we are building, and what is planned next — agentic workflow templates, verified artifacts, costs, and review.',
  alternates: { canonical: '/roadmap' },
  openGraph: {
    title: 'Roadmap | Esy',
    description:
      'What Esy has shipped, what we are building, and what is planned next.',
    url: 'https://esy.com/roadmap',
    siteName: 'Esy',
    type: 'website',
  },
};

// Shared palette, mirrored from the About page so the roadmap reads as the same site.
const theme = {
  bg: '#FFFFFF',
  elevated: '#F8F9FA',
  text: '#0A2540',
  muted: '#6C757D',
  subtle: '#8E9AAF',
  faint: '#ADB5BD',
  accent: '#00A896',
  accentLight: '#00D4AA',
  border: '#E9ECEF',
  dark: {
    bg: '#0A2540',
    text: '#FFFFFF',
    muted: 'rgba(255, 255, 255, 0.8)',
    subtle: 'rgba(255, 255, 255, 0.6)',
    accent: '#00D4AA',
  },
};

// A roadmap item's checkbox reflects delivery status, not a user toggle:
//   shipped  -> filled + check     in progress -> half-filled     planned -> empty
type Status = 'shipped' | 'building' | 'planned';
type Item = { title: string; desc: string };
type Group = { status: Status; label: string; blurb: string; items: Item[] };

// Public, customer-facing framing of the backlog. Internal endpoint/phase
// detail is deliberately translated into product language and omitted where
// it would leak implementation specifics.
const GROUPS: Group[] = [
  {
    status: 'shipped',
    label: 'Shipped',
    blurb: 'Live today.',
    items: [
      { title: 'Workflow templates', desc: 'Run predefined, versioned workflows instead of prompting from scratch.' },
      { title: 'Cost ledger', desc: 'Every provider call tracked from estimate to provider-reported to reconciled.' },
      { title: 'Budgets & enforcement', desc: 'Cap spend per run, project, or organization — with hard-stop and overage modes.' },
      { title: 'Projects', desc: 'Organize runs and artifacts by project, and reassign runs as work moves.' },
      { title: 'Research reports + chained infographics', desc: 'A research workflow that composes a sub-workflow to produce a matching infographic.' },
      { title: 'First-class artifacts', desc: 'Artifacts are produced and consumed by workflows — pipe one workflow’s output into another.' },
      { title: 'Public workflow catalog', desc: 'Browse the available workflow templates at /workflows.' },
      { title: 'Public documentation', desc: 'Concepts and guides at docs.esy.com — workflows, runs, artifacts, costs, versioning.' },
    ],
  },
  {
    status: 'building',
    label: 'In progress',
    blurb: 'Being built now.',
    items: [
      { title: 'Factory — workflow publisher', desc: 'A visual editor for authoring and publishing your own workflow templates.' },
      { title: 'Review queue', desc: 'Human-in-the-loop approval for artifacts that need a second look before they ship.' },
      { title: 'Cost clarity', desc: 'Breakdowns by model, workflow, project, and vendor, so spend is legible at a glance.' },
    ],
  },
  {
    status: 'planned',
    label: 'Planned',
    blurb: 'Designed, not yet started.',
    items: [
      { title: 'Scheduled runs', desc: 'Automate workflows on a recurring schedule.' },
      { title: 'Context', desc: 'Durable organization and project memory that workflows can read from and write to.' },
      { title: 'Bring your own key', desc: 'Use your own provider credentials, or platform credits — your choice.' },
      { title: 'Finer cost provenance', desc: 'Attribute spend to the exact model running behind aggregated providers.' },
      { title: 'More templates', desc: 'Visual essays, research briefs, and other artifact workflows, authored in the Factory.' },
    ],
  },
];

// Status checkbox. Server-rendered (no interactivity) — it communicates state.
function StatusBox({ status }: { status: Status }) {
  const base = {
    width: 20,
    height: 20,
    borderRadius: 6,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  } as const;

  if (status === 'shipped') {
    return (
      <span style={{ ...base, backgroundColor: theme.accent, border: `1px solid ${theme.accent}` }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    );
  }
  if (status === 'building') {
    return (
      <span style={{ ...base, border: `1px solid ${theme.accent}`, backgroundColor: 'rgba(0,168,150,0.12)' }}>
        <span style={{ width: 8, height: 2, borderRadius: 2, backgroundColor: theme.accent }} />
      </span>
    );
  }
  return <span style={{ ...base, border: `1px solid ${theme.border}`, backgroundColor: theme.bg }} />;
}

export default function RoadmapPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, color: theme.text, fontFamily: 'var(--font-inter)' }}>
      {/* ── Hero ── */}
      <section style={{ position: 'relative', padding: '10rem 2rem 4rem', maxWidth: '820px', margin: '0 auto', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(10, 37, 64, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(10, 37, 64, 0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1
            style={{
              fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
              fontWeight: 300,
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              fontFamily: 'var(--font-literata)',
            }}
          >
            Roadmap
          </h1>
          <p style={{ fontSize: '1.375rem', lineHeight: 1.7, color: theme.muted, fontWeight: 400, marginBottom: '1.25rem' }}>
            What Esy has shipped, what we are building, and what is planned next. Esy is dogfooded internally first — this
            reflects the real order of work.
          </p>

          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginTop: '0.5rem' }}>
            <LegendItem status="shipped" label="Shipped" />
            <LegendItem status="building" label="In progress" />
            <LegendItem status="planned" label="Planned" />
          </div>
        </div>
      </section>

      {/* ── Groups ── */}
      {GROUPS.map((group, gi) => (
        <section
          key={group.status}
          style={{
            padding: '3.5rem 2rem',
            backgroundColor: gi % 2 === 1 ? theme.elevated : theme.bg,
            borderTop: `1px solid ${theme.border}`,
          }}
        >
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-0.01em', fontFamily: 'var(--font-literata)' }}>
                {group.label}
              </h2>
              <span style={{ fontSize: '0.875rem', color: theme.subtle }}>{group.blurb}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {group.items.map((item) => (
                <div key={item.title} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: '0.875rem', alignItems: 'start' }}>
                  <StatusBox status={group.status} />
                  <div>
                    <div
                      style={{
                        fontSize: '1.0625rem',
                        fontWeight: 600,
                        color: theme.text,
                        marginBottom: '0.2rem',
                        opacity: group.status === 'planned' ? 0.85 : 1,
                      }}
                    >
                      {item.title}
                    </div>
                    <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Footer CTA ── */}
      <section style={{ padding: '3.5rem 2rem', backgroundColor: theme.dark.bg, borderTop: `1px solid ${theme.border}` }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: theme.dark.muted, marginBottom: '1.5rem' }}>
            Want a workflow built, or have a request for the roadmap?
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/workflows"
              style={{
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: theme.dark.bg,
                backgroundColor: theme.dark.accent,
                textDecoration: 'none',
                padding: '0.625rem 1.25rem',
                borderRadius: '999px',
              }}
            >
              Browse workflows
            </Link>
            <a
              href="mailto:zev@esy.com"
              style={{
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: theme.dark.text,
                textDecoration: 'none',
                padding: '0.625rem 1.25rem',
                borderRadius: '999px',
                border: `1px solid ${theme.dark.subtle}`,
              }}
            >
              Email a request
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function LegendItem({ status, label }: { status: Status; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: theme.muted }}>
      <StatusBox status={status} />
      {label}
    </span>
  );
}
