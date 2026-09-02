import Link from 'next/link';

export const metadata = {
  title: 'Product',
  description:
    'How Esy works: one brief becomes a coordinated campaign — research, angles, creative sized for every placement, copy at platform limits, a landing page — reviewed by you.',
  alternates: { canonical: '/product' },
  openGraph: {
    title: 'Product | Esy',
    description:
      'Marketing production with Esy: brand context in, coordinated campaigns out, with review built in.',
    url: 'https://esy.com/product',
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

// The customer flow — the six words Make teaches (docs/make/13 §3). No engine
// vocabulary here: workflows, workers, and orders stay behind the curtain.
const flow = [
  { title: 'Brand', desc: 'Your marketing context, captured once: what you sell, who it’s for, how you sound, what you never claim. Every production inherits it.' },
  { title: 'Campaign', desc: 'A brief in plain terms — the offer, the goal, the audience, the channels.' },
  { title: 'Production', desc: 'Esy researches the opportunity, develops distinct angles, and produces the package: creative in every placement size, copy inside every platform’s limits, a landing page.' },
  { title: 'Review', desc: 'You approve, reject, or request changes on each output. Nothing ships around you.' },
  { title: 'Library', desc: 'Approved work, organized by brand and campaign, ready to download and reuse.' },
  { title: 'Keep producing', desc: 'A campaign you approve can become a recurring line on your cadence — that’s the autopilot.' },
];

// What a campaign package contains. Structural truth about the product —
// counts stay configurable, so none are promised here.
const packageParts = [
  'Research & positioning brief',
  'Distinct campaign angles',
  'Master creative per angle',
  'Placement sizes: feed, story, pin, square, landscape',
  'Headlines & copy at each platform’s character limits',
  'Landing-page',
];

export default function ProductPage() {
  return (
    <main style={{ background: theme.bg, color: theme.text }}>
      {/* Navy hero */}
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
            You define what.
            <span style={{ display: 'block', color: theme.accentLight }}>Esy handles how.</span>
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
            One brief becomes a coordinated campaign — not a pile of unrelated generations.
            Every piece shares the same research, the same positioning, the same brand.
          </p>
          <Link
            href="https://make.esy.com"
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
            Start producing
          </Link>
        </div>
      </section>

      {/* The flow */}
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
            The whole product in six words
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 28,
            }}
          >
            {flow.map((f, i) => (
              <div
                key={f.title}
                style={{
                  background: theme.elevated,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 10,
                  padding: '26px 24px',
                }}
              >
                <div style={{ color: theme.accent, fontWeight: 700, fontSize: '0.8rem', marginBottom: 8 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: '0.94rem', lineHeight: 1.65, color: theme.muted }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The package */}
      <section style={{ padding: '72px 24px', background: theme.elevated }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
              marginBottom: 16,
            }}
          >
            One brief &rarr; one coordinated package
          </h2>
          <p style={{ color: theme.muted, lineHeight: 1.65, marginBottom: 36 }}>
            A campaign production isn&rsquo;t a prompt and an image. It&rsquo;s a package whose
            parts were made together:
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 auto',
              maxWidth: 460,
              textAlign: 'left',
            }}
          >
            {packageParts.map((part) => (
              <li
                key={part}
                style={{
                  padding: '12px 0',
                  borderBottom: `1px solid ${theme.border}`,
                  fontSize: '0.98rem',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 12,
                }}
              >
                <span style={{ color: theme.accent, fontWeight: 700 }}>&#10003;</span>
                {part}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quality + proof */}
      <section style={{ padding: '72px 24px 96px', background: theme.bg }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
              marginBottom: 16,
            }}
          >
            Checked before you ever see it
          </h2>
          <p style={{ color: theme.muted, lineHeight: 1.7, maxWidth: 620, margin: '0 auto 20px' }}>
            Every output passes automated gates before review — headlines inside each
            platform&rsquo;s character limits, creative at exact placement dimensions with the
            subject clear of interface zones, nothing that contradicts your brand&rsquo;s rules.
            The same production engine already ships thousands of reviewed assets a week for
            our own products, clip.art and SEOPage.
          </p>
          <div style={{ marginTop: 28 }}>
            <Link
              href="https://make.esy.com"
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
              Start producing
            </Link>
            <div style={{ marginTop: 16 }}>
              <Link href="/managed/" style={{ color: theme.accent, fontSize: '0.92rem', textDecoration: 'none' }}>
                Prefer it done for you? Esy Managed &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
