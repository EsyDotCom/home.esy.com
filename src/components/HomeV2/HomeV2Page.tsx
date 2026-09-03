/* HomeV2 — the Assembly homepage: light-first, flat color, no grids.
 *
 * The visual system is the wordmark's own stencil grammar (measured from the
 * Black Ops One letterforms: zero curves, 45° chamfers, pieces separated by
 * seams) extended into sixteen generated brand emblems in
 * /public/brand/clipart. Every decorative device on this page is one of:
 * an emblem, a 45° chamfered corner, or a hairline seam. Nothing glows.
 */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import './HomeV2.css';

/* Scattered "source" emblems for the hero: raw pieces drifting in, before
 * assembly. Offsets/rotations are hand-set, not random — restraint reads as
 * intent. */
const HERO_PIECES = [
  { src: 'page', dy: 8, r: -6 },
  { src: 'chart', dy: -10, r: 4 },
  { src: 'megaphone', dy: 14, r: -3 },
  { src: 'envelope', dy: -4, r: 6 },
  { src: 'spark', dy: 10, r: -5 },
];

const STEPS = [
  {
    emblem: 'page',
    title: 'One brief goes in',
    body: 'Describe the campaign once — audience, offer, tone. The intake asks for outcomes, never mechanisms.',
  },
  {
    emblem: 'gear',
    title: 'Esy produces',
    body: 'Research, angles, creative, copy, a landing page — every step tracked as it runs, with its exact cost.',
  },
  {
    emblem: 'checkmark',
    title: 'You review',
    body: 'Approve, request changes, or reject. Nothing ships without your sign-off, and every decision is recorded.',
  },
];

const WORKERS = [
  { emblem: 'calendar', name: 'Holly', beat: 'Holiday packs, on schedule' },
  { emblem: 'megaphone', name: 'Vista', beat: 'Scene packs, every shift' },
  { emblem: 'funnel', name: 'Zuri', beat: 'Story packs, ten characters' },
];

export default function HomeV2Page() {
  return (
    <div className="hv2">
      {/* ── Hero: light ground, flat teal, the assembly composition ── */}
      <section className="hv2-hero">
        <div className="hv2-container">
          <span className="hv2-eyebrow">Esy · Marketing production</span>
          <h1 className="hv2-headline">
            <span>Put Marketing Production</span>
            <span className="hv2-headline-accent">on Autopilot</span>
          </h1>
          <p className="hv2-sub">
            One brief becomes a coordinated campaign — research, angles,
            creative, copy, a landing page — produced by Esy, reviewed by
            you. Approve it once, then keep it producing.
          </p>
          <div className="hv2-ctas">
            <Link href="https://make.esy.com" className="hv2-btn hv2-btn--primary">
              <span>Start producing</span>
              <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" className="hv2-btn hv2-btn--ghost">
              See how it works
            </a>
          </div>

          {/* The brand story in one band: scattered pieces, a seam, one
              approved thing. */}
          <figure className="hv2-assembly" aria-label="Scattered campaign pieces assemble into one approved deliverable">
            <div className="hv2-assembly-pieces">
              {HERO_PIECES.map(({ src, dy, r }) => (
                <img
                  key={src}
                  src={`/brand/clipart/${src}.webp`}
                  alt=""
                  className="hv2-piece"
                  style={{ transform: `translateY(${dy}px) rotate(${r}deg)` }}
                  width={72}
                  height={72}
                />
              ))}
            </div>
            <span className="hv2-assembly-seam" aria-hidden="true" />
            <div className="hv2-assembly-result">
              <img src="/brand/clipart/checkmark.webp" alt="" width={128} height={128} />
            </div>
            <figcaption className="hv2-assembly-caption">
              Pieces in. One approved thing out.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── How it works: three steps, three emblems ── */}
      <section id="how-it-works" className="hv2-section hv2-section--alt">
        <div className="hv2-container">
          <span className="hv2-eyebrow">How it works</span>
          <h2 className="hv2-title">Brief. Production. Review.</h2>
          <div className="hv2-steps">
            {STEPS.map(({ emblem, title, body }, i) => (
              <div key={title} className="hv2-card">
                <span className="hv2-card-index">{String(i + 1).padStart(2, '0')}</span>
                <img src={`/brand/clipart/${emblem}.webp`} alt="" width={64} height={64} />
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof: clip.art in production ── */}
      <section className="hv2-section">
        <div className="hv2-container hv2-split">
          <div>
            <span className="hv2-eyebrow">
              <span className="hv2-live-dot" aria-hidden="true" /> Live · In production
            </span>
            <h2 className="hv2-title">clip.art runs on Esy</h2>
            <p className="hv2-lede">
              Consumer marketplace for clip art, coloring pages, and
              illustrations. Esy workflows generate, post-process, and store
              every asset — each run recorded on prompt, model, processing,
              storage, and cost. Even the emblems on this page were produced
              through the same engine.
            </p>
            <Link href="/workflows" className="hv2-inline-link">
              Browse workflow templates <ArrowRight size={15} />
            </Link>
          </div>
          <img
            className="hv2-split-emblem"
            src="/brand/clipart/stack.webp"
            alt=""
            width={200}
            height={200}
          />
        </div>
      </section>

      {/* ── Workers ── */}
      <section className="hv2-section hv2-section--alt">
        <div className="hv2-container">
          <span className="hv2-eyebrow">AI Workers</span>
          <h2 className="hv2-title">Hire a worker. Give it a shift.</h2>
          <p className="hv2-lede">
            An AI worker is a standing job with a name, a beat, and a
            schedule. You write the assignment once, the worker clocks in on
            its own, and every shift closes with what it made and what it
            cost.
          </p>
          <div className="hv2-steps">
            {WORKERS.map(({ emblem, name, beat }) => (
              <div key={name} className="hv2-card hv2-card--worker">
                <img src={`/brand/clipart/${emblem}.webp`} alt="" width={56} height={56} />
                <h3>{name}</h3>
                <p>{beat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Navy bookend: flat, no grid, no glow ── */}
      <section className="hv2-final">
        <div className="hv2-container">
          <h2 className="hv2-final-headline">
            Build something <span>auditable.</span>
          </h2>
          <p className="hv2-final-sub">
            Pick a workflow template. Let agents run the pipeline. Get back
            publishable, finished work with a full record — sources, prompts,
            models, processing, and cost.
          </p>
          <div className="hv2-ctas">
            <Link href="https://make.esy.com" className="hv2-btn hv2-btn--primary">
              <span>Start producing</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/workflows" className="hv2-btn hv2-btn--ghost hv2-btn--ghost-dark">
              Browse workflow templates
            </Link>
          </div>
          <div className="hv2-pipeline" aria-label="Esy operating model">
            <span>Workflow Template</span>
            <span className="hv2-pipeline-arrow" aria-hidden="true">→</span>
            <span>Run</span>
            <span className="hv2-pipeline-arrow" aria-hidden="true">→</span>
            <span className="hv2-pipeline-accent">Artifact</span>
          </div>
        </div>
      </section>
    </div>
  );
}
