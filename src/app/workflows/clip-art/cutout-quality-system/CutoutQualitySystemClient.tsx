'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Navy Calm Light Theme — same literal the other /workflows pages use.
const theme = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  surface: '#F1F5F9',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
  accentLight: 'rgba(0, 168, 150, 0.08)',
  accentBorder: 'rgba(0, 168, 150, 0.2)',
  warn: '#B45309',
  warnLight: 'rgba(180, 83, 9, 0.08)',
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-literata)',
        fontSize: 'clamp(1.6rem, 4vw, 2.1rem)',
        fontWeight: 300,
        letterSpacing: '-0.02em',
        margin: '3.5rem 0 1rem',
        color: theme.text,
      }}
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: 'var(--font-literata)',
        fontSize: '1.25rem',
        fontWeight: 500,
        margin: '2rem 0 0.75rem',
        color: theme.text,
      }}
    >
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: theme.muted, margin: '0 0 1.1rem' }}>
      {children}
    </p>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: theme.text, fontWeight: 600 }}>{children}</strong>;
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: 'var(--font-geist-mono), monospace',
        fontSize: '0.9em',
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: '4px',
        padding: '0.1em 0.35em',
        color: theme.text,
      }}
    >
      {children}
    </code>
  );
}

function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: theme.accentLight,
        border: `1px solid ${theme.accentBorder}`,
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        margin: '1.5rem 0',
      }}
    >
      <div style={{ fontWeight: 600, color: theme.accent, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
        {title}
      </div>
      <div style={{ fontSize: '1rem', lineHeight: 1.7, color: theme.muted }}>{children}</div>
    </div>
  );
}

function DataTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div style={{ overflowX: 'auto', margin: '1.25rem 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                style={{
                  textAlign: 'left',
                  padding: '0.6rem 0.9rem',
                  borderBottom: `2px solid ${theme.border}`,
                  color: theme.text,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 ? theme.elevated : 'transparent' }}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: '0.6rem 0.9rem',
                    borderBottom: `1px solid ${theme.border}`,
                    color: theme.muted,
                    lineHeight: 1.55,
                    verticalAlign: 'top',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// The pipeline, drawn as labeled stages — house style is hand-rolled strips,
// not a chart library.
const STAGES = [
  { label: 'Plan', sub: 'pick a key color absent from the palette' },
  { label: 'Render', sub: 'subject on a solid green/blue/red matte' },
  { label: 'Cut', sub: 'distance-to-key becomes transparency' },
  { label: 'Despill', sub: 'subtract the key tint from every visible pixel' },
  { label: 'Audit', sub: 'perceptual gates over the composite' },
  { label: 'Encode', sub: 'edge-bleed, then lossless WebP' },
  { label: 'Store', sub: 'artifact + provenance + cost ledger' },
];

function PipelineStrip() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        alignItems: 'stretch',
        margin: '1.5rem 0',
      }}
    >
      {STAGES.map((s, i) => (
        <React.Fragment key={s.label}>
          <div
            style={{
              flex: '1 1 130px',
              minWidth: '130px',
              background: theme.elevated,
              border: `1px solid ${theme.border}`,
              borderRadius: '10px',
              padding: '0.75rem 0.9rem',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: theme.text }}>{s.label}</div>
            <div style={{ fontSize: '0.8rem', color: theme.subtle, lineHeight: 1.45, marginTop: '0.25rem' }}>
              {s.sub}
            </div>
          </div>
          {i < STAGES.length - 1 && (
            <div style={{ alignSelf: 'center', color: theme.subtle, flex: '0 0 auto' }}>
              <ArrowRight size={16} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function CutoutQualitySystemClient() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily: 'var(--font-inter)',
      }}
    >
      <article style={{ maxWidth: '780px', margin: '0 auto', padding: '6rem 1.5rem 5rem' }}>
        {/* Breadcrumb */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2.5rem',
            fontSize: '0.875rem',
          }}
        >
          <Link
            href="/workflows/clip-art"
            style={{
              color: theme.muted,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <ArrowLeft size={16} />
            Clip Art Workflows
          </Link>
          <span style={{ color: theme.border }}>/</span>
          <span style={{ color: theme.text }}>The Cutout Quality System</span>
        </nav>

        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: theme.accent,
          }}
        >
          Engineering Notebook
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2.4rem, 6vw, 3.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: '0.75rem 0 1.25rem',
          }}
        >
          The Cutout Quality System
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.75, color: theme.muted, marginBottom: '0.5rem' }}>
          How Esy makes clip art that is <em>truly</em> transparent — the render pipeline, the math
          that removes a background&apos;s color and not just its pixels, the quality gates that judge
          images the way a human does, and the eight experiment waves that set every threshold.
          Written so an engineer who has never seen this system can take it over.
        </p>

        <H2>What this system makes, and why it is hard</H2>
        <P>
          A clip-art asset has one non-negotiable property: it must work on <Strong>any</Strong>{' '}
          background — a mug, a t-shirt, a dark website. That means the background of the generated
          image must be removed <em>completely</em>: no leftover patches, no holes punched through
          the artwork, and no colored fringe around the edges.
        </P>
        <P>
          The hard part is the last one. Deleting background <em>pixels</em> is easy; the
          background&apos;s <em>color</em> also hides inside the image — mixed into soft edges,
          showing through translucent things (bubbles, glass, watercolor washes), and blended into
          dark outlines. Delete the pixels and skip the color, and every image ships with a faint
          stain of whatever it was rendered on. That stain, in our case a purple one, is what most
          of this system exists to prevent.
        </P>

        <H2>The pipeline</H2>
        <PipelineStrip />
        <P>
          Esy renders every subject on a <Strong>solid key color</Strong> — a synthetic green
          screen, exactly like film studios use. Because we write the prompt, we control the
          background; and because we control the background, removal becomes arithmetic instead of
          guessing. This matters more than it sounds: the foundational computer-graphics result
          (Smith &amp; Blinn, 1996) proves that separating a subject from an <em>unknown</em>{' '}
          background is mathematically unsolvable in general — while a <em>known</em> backing color
          makes it tractable. Most background-removal products guess with a neural network. Ours
          only falls back to guessing when the arithmetic refuses.
        </P>
        <H3>The two lanes</H3>
        <DataTable
          head={['Lane', 'How it removes', 'When it runs']}
          rows={[
            [
              <Strong key="k">Keyed (chroma-key)</Strong>,
              'Deletes exactly the key color, by measured distance in linear light. Deterministic; enclosed gaps (wreaths, frames) come out transparent by construction.',
              'Default for solid-fill styles. The planner picks the key per item, guaranteed absent from the palette.',
            ],
            [
              <Strong key="m">ML (segmentation)</Strong>,
              'A neural network (BiRefNet family) predicts what is subject and what is background.',
              'Line/sketch styles where paint-time key contamination is worse than segmentation errors — and every rescue when the keyed lane refuses.',
            ],
          ]}
        />

        <H2>Despill: removing the color, not just the pixels</H2>
        <P>
          After cutting, the keyer runs <Strong>despill</Strong> — it subtracts the key&apos;s color
          cast from <em>every visible pixel</em> of the foreground. This is not our invention and
          not optional: it is the second half of the original 1971 chroma-key patent (Vlahos, US
          3,595,987), and every professional keyer — Nuke, Ultimatte, After Effects — performs it
          automatically. We initially only cleaned edge pixels; production taught us why the
          textbooks say &quot;the whole foreground&quot;: dark strokes blended with the key count as
          opaque and dodge edge-only cleanup, and translucent content carries the key <em>through</em>{' '}
          itself.
        </P>
        <Callout title="Why despill is safe here">
          The planner always chooses a key color that does not appear in the artwork&apos;s palette.
          So on a green-keyed render, anything green-hued <em>is</em> contamination, by contract —
          despill cannot damage legitimate art. This contract is also why keys are single-primary
          only (green, blue, or red): a two-channel key like magenta doubles the ways it can stain
          the subject, which is why professional keying hardware never offers it. We learned that
          one the hard way.
        </Callout>

        <H2>The audit: gates that see what you see</H2>
        <P>
          Every cutout passes a measurement gate before it can ship. The core lesson from the
          academic matting literature (and from our own bruises): naive pixel-count metrics{' '}
          <em>anticorrelate</em> with human judgment — a batch can score &quot;pass&quot; while any
          person calls it stained. So the flagship metric judges what the viewer judges: it
          composites every visible pixel over a dark background exactly like the gallery does,
          converts to a perceptual color space (CIE Lab), and counts pixels a human would call
          key-colored.
        </P>
        <DataTable
          head={['Metric', 'Plain meaning', 'Fails above']}
          rows={[
            [
              <Code key="1">visibleKeySpillRatio</Code>,
              'Of the pixels a viewer actually sees, what fraction is perceptibly key-colored?',
              '0.02',
            ],
            [
              <Code key="2">subjectKeyTintRatio</Code>,
              'Key-hued fraction of fully-opaque subject pixels (dark ink + key blends).',
              '0.08',
            ],
            [
              <Code key="3">keptPocketAreaRatio</Code>,
              'ALL leftover background blobs inside the subject, summed. (A single-blob cap exists too — one image once passed with 28 individually-small pockets covering 60% of it.)',
              '0.05 total / 0.01 largest',
            ],
            [
              <Code key="4">largestDamagedHoleAreaRatio</Code>,
              'Biggest hole punched through real artwork — judged against the raw render, so a wreath&apos;s see-through center is never damage.',
              '0.005',
            ],
            [
              <Code key="5">edgeHaloRatio</Code>,
              'Near-white (or near-matte) fraction of the 2px edge band — the classic white halo.',
              '0.25',
            ],
          ]}
        />
        <P>
          Every threshold cites its calibration: the failing population&apos;s scores, the clean
          population&apos;s scores, and the margin between them. A threshold nobody can trace is a
          threshold nobody can safely tune.
        </P>
        <Callout title="Enforcement is the default — a gate that doesn't gate is a diary">
          The audit ran in report-only mode during burn-in, and that mode&apos;s true cost surfaced
          when a cutout with 28 counted background pockets shipped as &quot;pass.&quot; Report mode
          also silently disarmed the retry ladder, which only fires on failed verdicts — detection
          without enforcement was self-healing without the healing. Since 2026-07-30, enforce is the
          default; failures retry automatically through the ladder (stronger ML removers, escalating
          resolution, a different model family last). One production probe later, the ladder rescued
          its first render unattended.
        </Callout>

        <H2>The file format lesson</H2>
        <P>
          The strangest bug in this system&apos;s history: images that were clean in memory shipped
          stained. The cause was the save step. Lossy WebP inherits a rule from its video-codec
          ancestor: it stores brightness for every pixel but <Strong>color only once per 2×2 pixel
          block</Strong> — like a coloring book that allows one crayon per four squares. If three
          squares are blue fox and one is the leftover key hiding in an invisible pixel, all four
          get a purple-ish crayon. No quality setting turns this off; it is welded into the format.
        </P>
        <P>
          The rules that fell out, now enforced at the single shared encoder: anything with
          transparency is stored as <Strong>lossless WebP</Strong> (pixel-exact, no color
          averaging, still ~26–42% smaller than PNG per Google&apos;s own study), with edge colors
          flooded outward into the transparent region first (&quot;alpha bleeding,&quot; the same
          fix game engines ship). Opaque images keep the smaller lossy encode — they have no edges
          for color to smear across.
        </P>

        <H2>The prompt rule: never name the forbidden thing</H2>
        <P>
          Image models do not process negation. When key color bled into ink shading, we tried
          telling the model the subject must contain <em>no</em> magenta — and it painted{' '}
          <em>more</em> magenta: outlines, glows, a shadow puddle. Forbidding the devices
          (&quot;no outline, no glow&quot;) made it worse still; contamination tripled across the
          two &quot;hardened&quot; prompts. The rule, now pinned by a test: the render directive
          names the background color <Strong>exactly once, neutrally</Strong> — and quality problems
          are solved by routing, math, and gates, never by prompt prohibitions.
        </P>

        <H2>Eight waves: what each one taught</H2>
        <DataTable
          head={['Wave', 'What we saw', 'What it turned out to be', 'The rule it left behind']}
          rows={[
            [
              '1',
              'Every keyed run died instantly.',
              'An edge-polish step re-corrected already-clean keyed edges until its own safety check refused them.',
              'Corrective steps must check what corrections already happened (mechanism provenance).',
            ],
            [
              '2',
              'Perfect audits, but six runs died at a safety check.',
              'Compression noise on hot-pink edges misread as corruption.',
              'Calibrate safety checks on the physics of the failure they exist to catch.',
            ],
            [
              '3',
              'Scoreboard perfect; human eyes caught a green rim and a magenta-tinted bicycle.',
              'Contamination lived in pixels no metric watched.',
              'When eyes beat the metrics, build the metric.',
            ],
            [
              '4–5',
              'Prompts hardened against contamination; batches got worse each time.',
              'Negative prompts amplify — naming the forbidden color paints more of it.',
              'Never name the forbidden thing; state the wanted state once.',
            ],
            [
              '6',
              'Style-routing decisions looked settled.',
              'Half the evidence came from the poisoned waves 4–5.',
              'Check what pipeline version produced a measurement before trusting it.',
            ],
            [
              '7',
              'Purple rims everywhere — while every gate said pass.',
              'Three stacked causes: edge-only despill, report-mode gates, and the lossy encoder staining files at save time.',
              'Despill the whole foreground; enforce by default; lossless storage for transparency.',
            ],
            [
              '8',
              'Verification probe of the full new stack.',
              '10/11 runs at exactly 0.0000 visible spill on stored files; the ladder rescued a bad render unattended.',
              'The system as documented on this page.',
            ],
          ]}
        />

        <H2>Operating the system</H2>
        <P>
          <Strong>Benching.</Strong> A 30-prompt golden set — engineered to stress white fills,
          enclosed shapes, wispy edges, thin lines, and key-colliding palettes — lives in the API
          repo as a reviewable script. Runs cost about a cent each; a 12-prompt probe answers
          directional questions, the full set settles routing decisions.
        </P>
        <P>
          <Strong>Records.</Strong> Every experiment wave files an audit record (run ids, metrics,
          verdicts) to the organization&apos;s shared context, so the next engineer — or the next
          agent — starts from conclusions instead of re-deriving them. Behavior-changing findings
          also get a lab note telling the story.
        </P>
        <P>
          <Strong>Per-batch QA reports.</Strong> Every pack order files an automatic report on
          completion: what the gates caught (by failure class, with run ids), what the ladder
          rescued, retries spent, and the batch&apos;s worst reading per metric against its ceiling.
          The gates&apos; work is visible per-batch — a quality system you can&apos;t see is a
          quality system you can&apos;t trust.
        </P>
        <P>
          <Strong>When to re-bench.</Strong> Any render-model change, any keyer/encoder/metric
          change, any routing decision, threshold-adjacent drift in a batch report — and, above all,
          whenever a human disagrees with a &quot;pass.&quot; Eyes outrank metrics; the correct
          response to the disagreement is a new metric, not an argument.
        </P>

        <H2>Where the source of truth lives</H2>
        <P>
          The pipeline and its tests live in the <Code>api.esy.com</Code> repository — the cited
          engineering rules in <Code>docs/CUTOUT_STANDARDS.md</Code>, the record-keeping convention
          in <Code>docs/CLIPART_QUALITY_AUDITS.md</Code>, and the bench driver under{' '}
          <Code>scripts/bench/</Code>. The evaluation standard, the wave audit records, and the lab
          notes live as knowledge artifacts in the ESY LLC organization context, where every
          operator and agent inherits them. This page is the narrative map; those are the law.
        </P>

        {/* Footer nav */}
        <div
          style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: `1px solid ${theme.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <Link
            href="/workflows/clip-art"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: theme.accent,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={16} />
            Clip Art Workflow Templates
          </Link>
          <Link
            href="/workflows"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: theme.accent,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            All Agentic Workflows
            <ArrowRight size={16} />
          </Link>
        </div>
      </article>
    </div>
  );
}
