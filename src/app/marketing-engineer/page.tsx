import Link from 'next/link';

export const metadata = {
  title: 'The Marketing Engineer',
  description:
    'Engineering AI systems for modern marketing — real production systems, experiments, and builds, documented by the engineer running Esy in production.',
  alternates: { canonical: '/marketing-engineer' },
  openGraph: {
    title: 'The Marketing Engineer | Esy',
    description:
      'Engineering AI systems for modern marketing — real production systems, experiments, and builds.',
    url: 'https://esy.com/marketing-engineer',
    siteName: 'Esy',
    type: 'website',
  },
};

const theme = {
  bg: '#FFFFFF',
  elevated: '#F8F9FA',
  text: '#0A2540',
  muted: '#6C757D',
  accent: '#00A896',
  accentLight: '#00D4AA',
  border: '#E9ECEF',
};

// The property's beats — education and demonstration, never a sales page
// (docs/make/13: The Marketing Engineer is not something Esy sells).
const beats = [
  { title: 'Real production systems', desc: 'The systems behind Esy’s own products, shown as they actually run — budgets, review queues, quality gates included.' },
  { title: 'Experiments, published', desc: 'What we tried, what it cost, what worked, what didn’t. Numbers over adjectives.' },
  { title: 'The modern toolbox', desc: 'Claude Code, agents, APIs, automation — the tools of marketing engineering, used on real work rather than demos.' },
];

export default function MarketingEngineerPage() {
  return (
    <main style={{ background: theme.bg, color: theme.text }}>
      <section
        style={{
          background: 'linear-gradient(rgb(10,37,64) 0%, rgb(6,21,39) 100%)',
          padding: '140px 24px 88px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              color: theme.accentLight,
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            The Marketing Engineer
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 4.6vw, 3.3rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              color: '#F8FBFC',
              marginBottom: 20,
            }}
          >
            Engineering AI systems
            <span style={{ display: 'block', color: theme.accentLight }}>for modern marketing</span>
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'rgba(248, 251, 252, 0.72)',
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            Marketing production is becoming an engineering discipline. This is where we teach
            it — by building in the open, publishing the experiments, and showing the systems
            that run Esy in production.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: theme.bg }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 28,
            }}
          >
            {beats.map((b) => (
              <div
                key={b.title}
                style={{
                  background: theme.elevated,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 10,
                  padding: '28px 26px',
                }}
              >
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 10 }}>{b.title}</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: theme.muted }}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* The property's current archive lives at /agentic — linked, not
              moved: whether those episodes migrate under this banner is an
              open editorial call. */}
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <Link
              href="/agentic/"
              style={{
                display: 'inline-block',
                padding: '13px 26px',
                background: theme.accent,
                color: '#fafafa',
                fontWeight: 600,
                fontSize: '0.9375rem',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              Watch the latest episodes
            </Link>
            <p style={{ marginTop: 18, fontSize: '0.9rem', color: theme.muted }}>
              Video series, demos, and system builds — published on the Agentic hub.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
