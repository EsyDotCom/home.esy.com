import Link from 'next/link';

export const metadata = {
  title: 'Managed Production',
  description:
    'Give Esy a marketing-production outcome. We design, configure, and operate the production system — you review finished campaigns, creative, and pages.',
  alternates: { canonical: '/managed' },
  openGraph: {
    title: 'Managed Production | Esy',
    description:
      'Done-for-you marketing production: finished campaigns, creative, and pages — reviewed by you, operated by Esy.',
    url: 'https://esy.com/managed',
    siteName: 'Esy',
    type: 'website',
  },
};

// Same palette contract as /roadmap and /about — one site, one skin.
const theme = {
  bg: '#FFFFFF',
  elevated: '#F8F9FA',
  text: '#0A2540',
  muted: '#6C757D',
  accent: '#00A896',
  accentLight: '#00D4AA',
  border: '#E9ECEF',
};

// What a managed engagement delivers — product language only, no engine nouns.
const deliverables = [
  {
    title: 'Finished campaigns',
    desc: 'One brief becomes a coordinated package: research, campaign angles, creative sized for every placement, copy at platform limits, a landing page.',
  },
  {
    title: 'Recurring production',
    desc: 'Approve a campaign once and keep it producing — weekly or monthly, with quality checks on every batch.',
  },
  {
    title: 'Review, not configuration',
    desc: 'You see progress live, approve or request changes on each output, and download finished work. The production machinery is our job.',
  },
  {
    title: 'A brand that compounds',
    desc: 'Your brand context — voice, audiences, claims, visual identity — is captured once and applied to everything, version by version.',
  },
];

const steps = [
  { n: '01', title: 'Tell us the outcome', desc: 'What you market, to whom, and what should exist at the end — a brief, not a spec.' },
  { n: '02', title: 'We build the production', desc: 'Esy designs and operates the system that produces it, with quality gates on every output.' },
  { n: '03', title: 'You review the work', desc: 'Approve, request changes, download. Every piece traceable to the brief it came from.' },
  { n: '04', title: 'It keeps producing', desc: 'Campaigns you approve become recurring production lines on your cadence.' },
];

export default function ManagedPage() {
  return (
    <main style={{ background: theme.bg, color: theme.text }}>
      {/* Navy hero — the production offer, stated plainly. */}
      <section
        style={{
          background: 'linear-gradient(rgb(10,37,64) 0%, rgb(6,21,39) 100%)',
          padding: '140px 24px 88px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#F8FBFC',
              marginBottom: 20,
            }}
          >
            Don&rsquo;t want another tool?
            <span style={{ display: 'block', color: theme.accentLight }}>
              We run the production for you.
            </span>
          </h1>
          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: 'rgba(248, 251, 252, 0.72)',
              maxWidth: 640,
              margin: '0 auto 32px',
            }}
          >
            Give Esy the marketing outcome you need. We design, configure, and operate the
            production system — you submit briefs, watch progress, review the work, and keep
            the finished campaigns.
          </p>
          <a
            href="mailto:zev@esy.com?subject=Production%20need"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: theme.accent,
              color: '#fafafa',
              fontWeight: 600,
              fontSize: '0.9375rem',
              borderRadius: 10,
              textDecoration: 'none',
            }}
          >
            Discuss a production need
          </a>
        </div>
      </section>

      {/* What you get */}
      <section style={{ padding: '88px 24px', background: theme.bg }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
              marginBottom: 40,
              textAlign: 'center',
            }}
          >
            What a managed engagement delivers
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 28,
            }}
          >
            {deliverables.map((d) => (
              <div
                key={d.title}
                style={{
                  background: theme.elevated,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 10,
                  padding: '28px 26px',
                }}
              >
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 10 }}>{d.title}</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: theme.muted }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '72px 24px 96px', background: theme.elevated }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
              marginBottom: 40,
              textAlign: 'center',
            }}
          >
            How it works
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: 28,
            }}
          >
            {steps.map((s) => (
              <div key={s.n}>
                <div style={{ color: theme.accent, fontWeight: 700, fontSize: '0.85rem', marginBottom: 8 }}>{s.n}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: theme.muted }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Scope honesty: tightly production, never a generic agency. */}
          <p
            style={{
              marginTop: 48,
              textAlign: 'center',
              fontSize: '0.92rem',
              color: theme.muted,
              maxWidth: 620,
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.65,
            }}
          >
            Managed is repeatable marketing production that Esy operates — campaigns, creative,
            pages, content. It is not a general agency service: no media buying, no accounts,
            no strategy retainers.
          </p>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <a
              href="mailto:zev@esy.com?subject=Production%20need"
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
              Talk to us
            </a>
            <div style={{ marginTop: 16 }}>
              <Link href="/product/" style={{ color: theme.accent, fontSize: '0.92rem', textDecoration: 'none' }}>
                Or see how the product works &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
