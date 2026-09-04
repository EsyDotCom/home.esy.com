/* HomeV2 — the story homepage.
 *
 * Visual system: org.esy brand/ESY_VISUAL_SYSTEM.md (LOCKED 2026-09-03).
 * Clay cast tells the WHO, isometric machinery the HOW, jade approval the
 * thread. The page is the story arc, problem-first: Monday → one brief →
 * production → review → the calendar stays full. Copy speaks customer
 * vocabulary only (Brief / Production / Review — never engine nouns).
 */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import './HomeV2.css';

const BEATS = [
  {
    img: 'brief',
    label: 'The brief',
    title: 'Write it once',
    body: 'Describe the campaign the way you would to a colleague — audience, offer, tone. That one brief is the last production document you write.',
  },
  {
    img: 'production',
    label: 'Production',
    title: 'The machine does the volume',
    body: 'Research, angles, copy, creative — produced as tall pins for Pinterest, squares and stories for Meta, and a landing page, every step tracked with its exact cost.',
  },
  {
    img: 'review',
    label: 'Review',
    title: 'Your stamp, on everything',
    body: 'Nothing ships without your approval. Approve, request changes, or reject — every decision recorded on the work itself.',
  },
  {
    img: 'calendar',
    label: 'Keep producing',
    title: 'The calendar stays full',
    body: 'Approve it once and the production keeps running on schedule. Monday stops being an avalanche.',
  },
];

const CHANNELS = ['Pinterest', 'Landing Pages', 'Meta · Facebook & Instagram'];

export default function HomeV2Page() {
  return (
    <div className="hv2">
      {/* ── The problem is the hero ── */}
      <section className="hv2-hero">
        <div className="hv2-container hv2-hero-grid">
          <div>
            <span className="hv2-eyebrow">Esy · Marketing production</span>
            <h1 className="hv2-headline">
              <span>Put Marketing Production</span>
              <span className="hv2-headline-accent">on Autopilot</span>
            </h1>
            <p className="hv2-sub">
              One brief becomes a coordinated campaign — produced by Esy,
              reviewed by you. Approve it once, then keep it producing.
            </p>
            <div className="hv2-ctas">
              <Link href="https://make.esy.com" className="hv2-btn hv2-btn--primary">
                <span>Start producing</span>
                <ArrowRight size={18} />
              </Link>
              <a href="#story" className="hv2-btn hv2-btn--ghost">See how it works</a>
            </div>
          </div>
          <figure className="hv2-hero-art">
            <img src="/brand/story/monday.webp" alt="A producer buried under a pile of ad requests, the wall calendar slipping" width={640} height={480} />
            <figcaption>Monday. Three channels. One of you.</figcaption>
          </figure>
        </div>
      </section>

      {/* ── The story, beat by beat ── */}
      <section id="story" className="hv2-section hv2-section--alt">
        <div className="hv2-container">
          <span className="hv2-eyebrow">How it works</span>
          <h2 className="hv2-title">From avalanche to autopilot</h2>
          <div className="hv2-beats">
            {BEATS.map(({ img, label, title, body }, i) => (
              <div key={label} className={i % 2 ? 'hv2-beat hv2-beat--flip' : 'hv2-beat'}>
                <figure>
                  <img src={`/brand/story/${img}.webp`} alt="" loading="lazy" width={560} height={420} />
                </figure>
                <div className="hv2-beat-copy">
                  <span className="hv2-beat-label">{label}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where it ships first ── */}
      <section className="hv2-section">
        <div className="hv2-container hv2-channels">
          <div>
            <span className="hv2-eyebrow">Channels</span>
            <h2 className="hv2-title">Where it ships first</h2>
            <p className="hv2-lede">
              The launch set covers the formats a small team actually feeds
              every week — with more channels joining as they earn it.
            </p>
          </div>
          <ul className="hv2-channel-list">
            {CHANNELS.map((c) => (
              <li key={c}><span className="hv2-check" aria-hidden="true">✓</span>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Proof ── */}
      <section className="hv2-section hv2-section--alt">
        <div className="hv2-container">
          <span className="hv2-eyebrow">
            <span className="hv2-live-dot" aria-hidden="true" /> Live · In production
          </span>
          <h2 className="hv2-title">clip.art runs on Esy</h2>
          <p className="hv2-lede">
            Consumer marketplace for clip art, coloring pages, and
            illustrations — thousands of Esy production runs a week, each
            recorded on prompt, model, processing, storage, and cost. Every
            illustration on this page was produced through the same engine.
          </p>
          <Link href="/workflows" className="hv2-inline-link">
            Browse workflow templates <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── Navy bookend ── */}
      <section className="hv2-final">
        <div className="hv2-container hv2-final-grid">
          <div>
            <h2 className="hv2-final-headline">
              Build something <span>auditable.</span>
            </h2>
            <p className="hv2-final-sub">
              Publishable, finished work with a full record — sources,
              prompts, models, processing, and cost.
            </p>
            <div className="hv2-ctas hv2-ctas--left">
              <Link href="https://make.esy.com" className="hv2-btn hv2-btn--primary">
                <span>Start producing</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <figure className="hv2-final-art">
            <img src="/brand/story/team.webp" alt="The three-person cast standing together" loading="lazy" width={520} height={390} />
          </figure>
        </div>
      </section>
    </div>
  );
}
