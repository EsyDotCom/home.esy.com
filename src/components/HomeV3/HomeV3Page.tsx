/* HomeV3 — the homepage as one continuous story.
 *
 * The page sells creative production, so the page itself has to be the proof:
 * every scene came out of our own engine, the centrepiece is a production
 * line the visitor operates by scrolling, and nothing sits in a box — each
 * scene's painted ground is matched by the section behind it, so the world
 * and the page are one surface.
 *
 * The cast rule (org.esy brand/ESY_VISUAL_SYSTEM.md): clay carries the WHO,
 * isometric carries the HOW. Here they meet — the producer stands ON the
 * factory floor in the hero and returns at the end, and the machines run the
 * middle of the story alone. She opens it, the machine does the work, she
 * closes it with her feet up. That arc IS the product.
 */

import Link from 'next/link';
import { Cormorant_Garamond } from 'next/font/google';
import { ArrowRight } from 'lucide-react';

// The site's global stylesheet only pulls Cormorant at weight 400, so every
// 700 headline was browser-synthesised faux bold — mushy strokes, wrong
// weight rhythm. This loads the real cuts, scoped to this page.
const cormorant = Cormorant_Garamond({
  weight: ['600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--hv3-serif',
});

import ProcessScrubber from './ProcessScrubber';
import LightHeader from '@/components/LightHeader/LightHeader';
import CountUp from './CountUp';
import './HomeV3.css';

// Real output, straight from the live catalog CDN — finished work, not UI.
const CATALOG = [
  { url: 'https://images.clip.art/christmas/decorated-christmas-tree-gifts-fxjmtg.webp', alt: 'Decorated Christmas tree clip art' },
  { url: 'https://images.clip.art/halloween/grinning-jack-o-lantern-candle-r2avcr.webp', alt: "Jack-o'-lantern clip art" },
  { url: 'https://images.clip.art/school/chemistry-set-bubbling-beakers-rd9f4o.webp', alt: 'Chemistry set clip art' },
  { url: 'https://images.clip.art/flower/watercolor-lavender-flowers-bqkae5.webp', alt: 'Watercolor lavender clip art' },
  { url: 'https://images.clip.art/cat/cozy-black-cat-on-pumpkin-1c6qun.webp', alt: 'Black cat on pumpkin clip art' },
  { url: 'https://images.clip.art/school/friendly-yellow-school-bus-hjo5n2.webp', alt: 'School bus clip art' },
];

const CHANNELS = [
  { name: 'Pinterest', formats: 'Tall pins, 2:3' },
  { name: 'Landing Pages', formats: 'A page per angle' },
  { name: 'Instagram & Facebook', formats: 'Feed squares and stories' },
];

export default function HomeV3Page() {
  return (
    <div className={`hv3 ${cormorant.variable}`}>
      <LightHeader />
      {/* ══ ACT I · The promise, with her on the floor ══
          Vertical: badge → headline → sub → CTAs, then the master scene
          spreading edge to edge underneath. The section's background IS the
          scene's painted ground, so there is no seam and nothing "placed". */}
      <section className="hv3-hero">
        <div className="hv3-container hv3-hero-copy">
          <h1 className="hv3-headline hv3-enter" style={{ animationDelay: '90ms' }}>
            Put marketing production <span className="hv3-headline-accent">on autopilot</span>
          </h1>
          <p className="hv3-sub hv3-enter" style={{ animationDelay: '180ms' }}>
            Write one brief. Esy produces the campaign — pins, posts, and
            landing pages — and nothing ships until you approve it.
          </p>
          <div className="hv3-ctas hv3-enter" style={{ animationDelay: '270ms' }}>
            <Link href="https://make.esy.com" className="hv3-btn hv3-btn--primary">
              <span>Start producing</span>
              <ArrowRight size={18} />
            </Link>
            <a href="#the-line" className="hv3-btn hv3-btn--ghost">Watch the line run</a>
          </div>
        </div>
        <figure className="hv3-master hv3-enter" style={{ animationDelay: '380ms' }}>
          <img
            src="/brand/scenes/master.webp"
            alt="The producer holding one brief at the intake of a sorting machine, with three output slots stacking finished creatives — one stack for each outlet"
            width={1536}
            height={1016}
            fetchPriority="high"
          />
        </figure>
      </section>

      {/* ══ ACT II · The problem she walked in on ══ */}
      <section className="hv3-section hv3-monday">
        <div className="hv3-container hv3-split">
          <figure className="hv3-figure hv3-figure--monday">
            <img
              src="/brand/scenes/clay-monday.webp"
              alt="Buried under an avalanche of creative requests, the wall calendar slipping off its hook"
              loading="lazy"
              width={1536}
              height={1024}
            />
          </figure>
          <div>
            <span className="hv3-eyebrow">Before — any given Monday</span>
            <h2 className="hv3-title">Requests arrive faster than anyone can make them.</h2>
            <p className="hv3-lede">
              In more sizes than anyone wants to resize, for more channels than
              one person can feed. Nothing in the pile is finished — and the
              calendar doesn&apos;t wait.
            </p>
          </div>
        </div>
      </section>

      {/* ══ ACT III · The turn ══ */}
      <section className="hv3-section">
        <div className="hv3-container hv3-split hv3-split--rev">
          <div>
            <span className="hv3-eyebrow">The brief</span>
            <h2 className="hv3-title">So you write one brief.</h2>
            <p className="hv3-lede">
              Audience, offer, tone — the way you&apos;d brief a colleague.
              It&apos;s the last production document you&apos;ll write.
            </p>
          </div>
          <figure className="hv3-figure">
            <img
              src="/brand/scenes/brief.webp"
              alt="Writing the one brief at a desk while the production floor waits beyond it"
              loading="lazy"
              width={1536}
              height={1024}
            />
          </figure>
        </div>
      </section>

      {/* ══ ACT IV · The line — you operate it ══ */}
      <section id="the-line" className="hv3-press">
        <div className="hv3-container hv3-press-copy">
          <span className="hv3-eyebrow">Production</span>
          <h2 className="hv3-title">Then the line takes over.</h2>
          <p className="hv3-lede hv3-lede--center">
            Blank stock in — printed, sealed, and stacked. Pins, posts, and
            pages, produced in parallel.
          </p>
        </div>
        <ProcessScrubber
          frames={60}
          poster="/brand/scenes/production.webp"
          alt="A production line: blank cards feed in, are printed and sealed, and stack as finished ads"
        />
      </section>

      {/* ══ ACT V · The stamp ══ */}
      <section className="hv3-section">
        <div className="hv3-container hv3-split hv3-split--rev">
          <div>
            <span className="hv3-eyebrow">Review</span>
            <h2 className="hv3-title">Nothing ships without your stamp.</h2>
            <p className="hv3-lede">
              Approve, request changes, or reject — and every decision is
              recorded on the work itself, next to what it cost to make.
            </p>
          </div>
          <figure className="hv3-figure hv3-figure--review">
            <img
              src="/brand/scenes/clay-review.webp"
              alt="The producer pressing a jade approval stamp onto one finished creative, a row of sealed work beside her"
              loading="lazy"
              width={1536}
              height={1024}
            />
          </figure>
        </div>
      </section>

      {/* ══ ACT VI · Friday ══ */}
      <section className="hv3-section hv3-friday">
        <div className="hv3-container hv3-split">
          <figure className="hv3-figure hv3-figure--friday">
            <img
              src="/brand/scenes/clay-calendar.webp"
              alt="The producer relaxed with a mug, the wall calendar behind her filled with jade checkmarks"
              loading="lazy"
              width={1536}
              height={1024}
            />
          </figure>
          <div>
            <span className="hv3-eyebrow">After — the same week</span>
            <h2 className="hv3-title">Monday, handled.</h2>
            <p className="hv3-lede">
              Approve the direction once and the line keeps running on
              schedule. The calendar fills itself.
            </p>
          </div>
        </div>
      </section>

      {/* ══ The receipts ══ */}
      <section className="hv3-section">
        <div className="hv3-container">
          <span className="hv3-eyebrow">
            <span className="hv3-live-dot" aria-hidden="true" /> Live · In production
          </span>
          <h2 className="hv3-title">This isn&apos;t a demo. clip.art runs on it.</h2>
          <p className="hv3-lede">
            A consumer marketplace, fed entirely by Esy workflows — every
            asset generated, processed, stored, and billed with a full record.
            This is what autopilot ships — six assets, straight from the live catalog.
          </p>
          <dl className="hv3-stats">
            <div>
              <dt><CountUp value={14889} /></dt>
              <dd>Artifacts filed, each with provenance</dd>
            </div>
            <div>
              <dt><CountUp value={227} /></dt>
              <dd>Waiting on a human right now</dd>
            </div>
            <div>
              <dt><CountUp value={0.064} prefix="$" /></dt>
              <dd>A worker&apos;s cost per item, at most</dd>
            </div>
          </dl>
          <ul className="hv3-catalog" aria-label="Assets produced by these workflows, live on clip.art">
            {CATALOG.map(({ url, alt }) => (
              <li key={url}>
                <img src={url} alt={alt} loading="lazy" width={280} height={280} />
              </li>
            ))}
          </ul>
          <Link href="/workflows/generate-clip-art-asset/" className="hv3-inline-link">
            See the workflow behind it <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ══ Channels ══ */}
      <section className="hv3-channels-section">
        <div className="hv3-container hv3-split">
          <div>
            <span className="hv3-eyebrow hv3-eyebrow--onDark">Channels</span>
            <h2 className="hv3-title hv3-title--onDark">One brief, every outlet</h2>
            <p className="hv3-lede hv3-lede--onDark">
              The same campaign comes out sized and written for each one — no
              resizing, no rewriting, no second brief.
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
          <figure className="hv3-navy-scene">
            <img
              src="/brand/scenes/docks.webp"
              alt="Three shipping docks crating the three formats — tall pins, squares, and wide pages"
              loading="lazy"
              width={1536}
              height={1024}
            />
          </figure>
        </div>
      </section>

      {/* ══ The ask — the story's world, seen whole ══
          The finale is a place, not a panel: the campus the page described,
          with the road running out toward the viewer and the closing words in
          its sky. The site footer floats over the world as a rounded card. */}
      <section className="hv3-final">
        <div className="hv3-container">
          <h2 className="hv3-final-headline">
            One campaign. Every outlet.
          </h2>
          <p className="hv3-final-sub">
            Pinterest pins, Instagram and Facebook posts, and the landing
            pages they point to — all produced from a single brief, and none
            of it live until you approve it.
          </p>
          <div className="hv3-ctas hv3-ctas--center">
            <Link href="https://make.esy.com" className="hv3-btn hv3-btn--primary">
              <span>Start producing</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/workflows" className="hv3-btn hv3-btn--ghost">
              Browse workflow templates
            </Link>
          </div>
          <div className="hv3-pipeline hv3-pipeline--light" aria-label="Esy operating model">
            <span>Brief</span>
            <span className="hv3-pipeline-arrow" aria-hidden="true">→</span>
            <span>Production</span>
            <span className="hv3-pipeline-arrow" aria-hidden="true">→</span>
            <span>Review</span>
            <span className="hv3-pipeline-arrow" aria-hidden="true">→</span>
            <span className="hv3-pipeline-accent">Shipped</span>
          </div>
        </div>
      </section>
    </div>
  );
}
