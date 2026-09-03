/* HomeV3 — the homepage in the isometric lane.
 *
 * Same story as v2 (problem → brief → production → review → cadence), same
 * light system, but the scenes are machinery rather than a cast: clay carries
 * the WHO, isometric carries the HOW (org.esy brand/ESY_VISUAL_SYSTEM.md), and
 * a homepage that has to explain a pipeline in five glances is a HOW page.
 *
 * Motion is rationed into three tiers, each with a different job:
 *   1. the production beat is a machine the visitor operates by scrolling;
 *   2. two scenes loop quietly (the hero, and the approval landing);
 *   3. everything else is CSS, or still.
 *
 * Unlike v2, this page keeps the live homepage's proof — the clip.art catalog,
 * the real artifact counts, the worker ledger, the founder note — because a
 * page that only asserts is weaker than one that shows its receipts.
 */

import Link from 'next/link';
import { getImageProps } from 'next/image';
import { ArrowRight } from 'lucide-react';

import SceneMedia from './SceneMedia';
import ProcessScrubber from './ProcessScrubber';
import CountUp from './CountUp';
import './HomeV3.css';

/* The live page's art-direction helper, kept identical: one desktop crop, one
   phone crop, dimensions on the <source> so nothing shifts while loading. */
function ArtDirectedShot({
  desktopSrc,
  mobileSrc,
  alt,
  className,
  desktopWidth,
  desktopHeight,
  mobileWidth,
  mobileHeight,
}: {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  className?: string;
  desktopWidth: number;
  desktopHeight: number;
  mobileWidth: number;
  mobileHeight: number;
}) {
  const common = { alt, sizes: '100vw', quality: 90 } as const;
  const { props: desktop } = getImageProps({
    ...common,
    src: desktopSrc,
    width: desktopWidth,
    height: desktopHeight,
  });
  const { props: mobile } = getImageProps({
    ...common,
    src: mobileSrc,
    width: mobileWidth,
    height: mobileHeight,
  });
  return (
    <picture>
      <source
        media="(min-width: 768px)"
        srcSet={desktop.srcSet}
        width={desktopWidth}
        height={desktopHeight}
      />
      <img {...mobile} className={className} alt={alt} />
    </picture>
  );
}

const CHANNELS = [
  { name: 'Pinterest', formats: 'Tall pins, 2:3' },
  { name: 'Landing Pages', formats: 'A page per angle' },
  { name: 'Meta', formats: 'Feed squares and stories' },
];

const WORKER_LEDGER = [
  { value: 11, suffix: '', label: 'Shifts run' },
  { value: 66, suffix: '', label: 'Artifacts filed' },
  { value: 26.76, prefix: '$', label: 'Spend, all time' },
  { value: 0.064, prefix: '$', label: 'Per item, at most' },
];

export default function HomeV3Page() {
  return (
    <div className="hv3">
      {/* ── 1 · Hero — the promise, moving ── */}
      <section className="hv3-hero">
        <div className="hv3-bg hv3-bg--hero" aria-hidden="true" />
        <div className="hv3-container hv3-hero-grid">
          <div className="hv3-hero-copy">
            <span className="hv3-badge">
              <span className="hv3-badge-dot" aria-hidden="true" />
              Powering <strong>clip.art</strong> — 2,000+ assets shipped a week
            </span>
            <h1 className="hv3-headline">
              <span>Put Marketing Production</span>
              <span className="hv3-headline-accent">on Autopilot</span>
            </h1>
            <p className="hv3-sub">
              One brief becomes a coordinated campaign — produced by Esy,
              reviewed by you. Approve it once, then keep it producing.
            </p>
            <div className="hv3-ctas">
              <Link href="https://make.esy.com" className="hv3-btn hv3-btn--primary">
                <span>Start producing</span>
                <ArrowRight size={18} />
              </Link>
              <a href="#story" className="hv3-btn hv3-btn--ghost">See how it works</a>
            </div>
          </div>
          <figure className="hv3-hero-art">
            <div className="hv3-frame">
              <SceneMedia
                name="hero"
                alt="A brand kit and a rising chart on one side, a spread of finished, approved creatives on the other"
                className="hv3-media"
                priority
              />
            </div>
          </figure>
        </div>
      </section>

      {/* ── 2 · Monday — the problem, deliberately still ── */}
      <section className="hv3-section hv3-section--alt">
        <div className="hv3-container hv3-split">
          <figure className="hv3-figure">
            <img
              src="/brand/scenes/monday.webp"
              alt="An overflowing tray of unsorted requests, a calendar slipping off its hook"
              loading="lazy"
              width={1024}
              height={768}
            />
          </figure>
          <div>
            <span className="hv3-eyebrow">Monday</span>
            <h2 className="hv3-title">Three channels. One of you.</h2>
            <p className="hv3-lede">
              The requests arrive faster than anyone can make them, in more
              sizes than anyone wants to resize. Nothing in the pile is
              finished, and the calendar does not wait.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3 · How it works ── */}
      <section id="story" className="hv3-section">
        <div className="hv3-container">
          <span className="hv3-eyebrow">How it works</span>
          <h2 className="hv3-title">From avalanche to autopilot</h2>
        </div>

        {/* Beat one — still */}
        <div className="hv3-container hv3-beat">
          <figure className="hv3-figure">
            <img src="/brand/scenes/brief.webp" alt="" loading="lazy" width={1024} height={768} />
          </figure>
          <div className="hv3-beat-copy">
            <span className="hv3-beat-label">The brief</span>
            <h3>Write it once</h3>
            <p>
              Describe the campaign the way you would to a colleague —
              audience, offer, tone. That one brief is the last production
              document you write.
            </p>
          </div>
        </div>
      </section>

      {/* Beat two — the machine you operate. Full width: this is the page's
          centrepiece and it needs the room to pin. */}
      <section className="hv3-press">
        <div className="hv3-container hv3-press-copy">
          <span className="hv3-beat-label">Production</span>
          <h3 className="hv3-press-title">Keep scrolling. The line runs.</h3>
          <p>
            Blank stock in, printed, sealed, stacked — every format in
            parallel. Scroll back and it runs in reverse.
          </p>
        </div>
        <ProcessScrubber
          dir="/brand/scenes/press"
          frames={60}
          poster="/brand/scenes/production.webp"
          alt="A production line: blank cards feed in, are printed and sealed, and stack as finished ads"
        />
      </section>

      <section className="hv3-section">
        {/* Beat three — the approval, looping */}
        <div className="hv3-container hv3-beat hv3-beat--flip">
          <figure className="hv3-figure">
            <SceneMedia
              name="review"
              alt="A stamp pressing a jade seal onto a finished creative"
              className="hv3-media"
            />
          </figure>
          <div className="hv3-beat-copy">
            <span className="hv3-beat-label">Review</span>
            <h3>Your stamp, on everything</h3>
            <p>
              Nothing ships without your approval. Approve, request changes,
              or reject — and every decision is recorded on the work itself.
            </p>
          </div>
        </div>

        {/* Beat four — still */}
        <div className="hv3-container hv3-beat">
          <figure className="hv3-figure">
            <img src="/brand/scenes/cadence.webp" alt="" loading="lazy" width={1024} height={768} />
          </figure>
          <div className="hv3-beat-copy">
            <span className="hv3-beat-label">Keep producing</span>
            <h3>The calendar stays full</h3>
            <p>
              Approve the direction once and production keeps running on
              schedule. Monday stops being an avalanche.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4 · Channels ── */}
      <section className="hv3-channels-section">
        <div className="hv3-bg hv3-bg--channels" aria-hidden="true" />
        <div className="hv3-container">
          <span className="hv3-eyebrow hv3-eyebrow--onDark">Channels</span>
          <h2 className="hv3-title hv3-title--onDark">Where it ships first</h2>
          <p className="hv3-lede hv3-lede--onDark">
            The launch set covers the formats a small team actually feeds every
            week, with more joining as they earn it.
          </p>
          <ul className="hv3-channel-list">
            {CHANNELS.map(({ name, formats }) => (
              <li key={name}>
                <span className="hv3-check" aria-hidden="true">✓</span>
                <span className="hv3-channel-name">{name}</span>
                <span className="hv3-channel-formats">{formats}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 5 · Proof — clip.art ── */}
      <section className="hv3-section hv3-section--alt">
        <div className="hv3-container">
          <span className="hv3-eyebrow">
            <span className="hv3-live-dot" aria-hidden="true" /> Live · In production
          </span>
          <h2 className="hv3-title">clip.art runs on Esy</h2>
          <p className="hv3-lede">
            Consumer marketplace for clip art, coloring pages, and
            illustrations. Esy workflows generate, post-process and store every
            asset — each run recorded on prompt, model, processing, storage and
            cost. Every illustration on this page came out of the same engine.
          </p>
          <dl className="hv3-stats">
            <div>
              <dt><CountUp value={14889} /></dt>
              <dd>Artifacts filed</dd>
            </div>
            <div>
              <dt><CountUp value={227} /></dt>
              <dd>Waiting on a human</dd>
            </div>
            <div>
              <dt><CountUp value={2000} suffix="+" /></dt>
              <dd>Shipped a week</dd>
            </div>
          </dl>
          <Link href="/workflows/generate-clip-art-asset/" className="hv3-inline-link">
            See the workflow <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── 6 · Workers ── */}
      <section className="hv3-section">
        <div className="hv3-container">
          <span className="hv3-eyebrow">AI Workers</span>
          <h2 className="hv3-title">Hire a worker. Give it a shift.</h2>
          <p className="hv3-lede">
            A worker is a standing job with a name, a beat and a schedule. You
            write the assignment once, it clocks in on its own, and every shift
            closes with what it made and what it cost.
          </p>
          <figure className="hv3-shot">
            <ArtDirectedShot
              desktopSrc="/images/workers-on-shift.webp"
              mobileSrc="/images/workers-on-shift-mobile.webp"
              alt="A worker one minute into a shift, with every previous shift listed underneath"
              className="hv3-shot-img"
              desktopWidth={2048}
              desktopHeight={1140}
              mobileWidth={1170}
              mobileHeight={1300}
            />
            <figcaption>
              Vista, one minute into a shift. Every shift it has run is listed
              underneath with what it produced and what it cost.
            </figcaption>
          </figure>
          <dl className="hv3-ledger">
            {WORKER_LEDGER.map(({ value, prefix, suffix, label }) => (
              <div key={label}>
                <dt>
                  <CountUp value={value} prefix={prefix} suffix={suffix} />
                </dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 7 · Founder ── */}
      <section className="hv3-founder">
        <div className="hv3-bg hv3-bg--founder" aria-hidden="true" />
        <div className="hv3-container hv3-founder-grid">
          <figure className="hv3-portrait">
            <img
              src="/images/zev_uhuru.webp"
              alt="Zev Uhuru"
              width={220}
              height={220}
              loading="lazy"
            />
          </figure>
          <div>
            <span className="hv3-eyebrow hv3-eyebrow--onDark">A note from the founder</span>
            <p className="hv3-statement">
              I built Esy to run my own products. Every asset clip.art ships,
              2,000+ a week, comes out of these workflows. Each one is tracked,
              reviewed, and I know exactly what it cost to make. If I can&apos;t
              see how a run happened, it doesn&apos;t ship.
            </p>
            <p className="hv3-signature">
              <strong>Zev Uhuru</strong>
              <span>Founder</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── 8 · Final CTA ── */}
      <section className="hv3-final">
        <div className="hv3-container">
          <h2 className="hv3-final-headline">
            Build something <span>auditable.</span>
          </h2>
          <p className="hv3-final-sub">
            Publishable, finished work with a full record — sources, prompts,
            models, processing and cost.
          </p>
          <div className="hv3-ctas hv3-ctas--center">
            <Link href="https://make.esy.com" className="hv3-btn hv3-btn--primary">
              <span>Start producing</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/workflows" className="hv3-btn hv3-btn--ghost hv3-btn--ghost-dark">
              Browse workflow templates
            </Link>
          </div>
          <div className="hv3-pipeline" aria-label="Esy operating model">
            <span>Workflow Template</span>
            <span className="hv3-pipeline-arrow" aria-hidden="true">→</span>
            <span>Run</span>
            <span className="hv3-pipeline-arrow" aria-hidden="true">→</span>
            <span className="hv3-pipeline-accent">Artifact</span>
          </div>
        </div>
      </section>
    </div>
  );
}
