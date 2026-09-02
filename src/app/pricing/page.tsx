import Link from 'next/link';

export const metadata = {
  title: 'Pricing',
  description:
    'Make is in its design-partner phase — self-serve plans are coming. Managed production is custom-priced today: tell us the outcome you need.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing | Esy',
    description:
      'Make is in its design-partner phase — self-serve plans are coming. Managed production is custom-priced today.',
    url: 'https://esy.com/pricing',
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

// Deliberately NOT a plan table: prices aren't published yet, and a made-up
// grid would be worse than none (docs/make/13's own rule). This page exists
// so Pricing in the footer answers honestly — the current answer is
// "design partners + Managed, talk to us."
export default function PricingPage() {
  return (
    <main style={{ background: theme.bg, color: theme.text }}>
      <section
        style={{
          background: 'linear-gradient(rgb(10,37,64) 0%, rgb(6,21,39) 100%)',
          padding: '140px 24px 88px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
              lineHeight: 1.1,
              color: '#F8FBFC',
              marginBottom: 20,
            }}
          >
            Simple when it ships.
            <span style={{ display: 'block', color: theme.accentLight }}>Honest until then.</span>
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
            Make is in its design-partner phase — self-serve plans are coming and will be
            published here. Today there are two ways in:
          </p>
        </div>
      </section>

      <section style={{ padding: '72px 24px 96px', background: theme.bg }}>
        <div
          style={{
            maxWidth: 820,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 28,
          }}
        >
          <div style={{ background: theme.elevated, border: `1px solid ${theme.border}`, borderRadius: 10, padding: '32px 28px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: 10 }}>Design partner</h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: theme.muted, marginBottom: 20 }}>
              Early access to Make, shaped around your production needs, at partner terms.
              Limited seats while we calibrate the product.
            </p>
            <a
              href="mailto:zev@esy.com?subject=Design%20partner"
              style={{ display: 'inline-block', padding: '12px 24px', background: theme.accent, color: '#fafafa', fontWeight: 600, fontSize: '0.9375rem', borderRadius: 10, textDecoration: 'none' }}
            >
              Ask about partnership
            </a>
          </div>
          <div style={{ background: theme.elevated, border: `1px solid ${theme.border}`, borderRadius: 10, padding: '32px 28px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: 10 }}>Managed</h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: theme.muted, marginBottom: 20 }}>
              We run the production for you — finished campaigns, creative and pages, reviewed
              by you. Custom-priced to the outcome.
            </p>
            <Link
              href="/managed/"
              style={{ display: 'inline-block', padding: '12px 24px', background: theme.accent, color: '#fafafa', fontWeight: 600, fontSize: '0.9375rem', borderRadius: 10, textDecoration: 'none' }}
            >
              Discuss a production need
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
