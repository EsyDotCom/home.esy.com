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
import { getImageProps } from 'next/image';
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

import SceneMedia from './SceneMedia';
import ProcessScrubber from './ProcessScrubber';
import CountUp from './CountUp';
import './HomeV3.css';

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

export default function HomeV3Page() {
  return (
    <div className={`hv3 ${cormorant.variable}`}>
      {/* ══ ACT I · The promise, with her on the floor ══
          Vertical: badge → headline → sub → CTAs, then the master scene
          spreading edge to edge underneath. The section's background IS the
          scene's painted ground, so there is no seam and nothing "placed". */}
      <section className="hv3-hero">
        <div className="hv3-container hv3-hero-copy">
          <span className="hv3-badge">
            <span className="hv3-badge-dot" aria-hidden="true" />
            Powering <strong>clip.art</strong> — 2,000+ assets shipped a week
          </span>
          <h1 className="hv3-headline">
            Put marketing production <span className="hv3-headline-accent">on autopilot</span>
          </h1>
          <p className="hv3-sub">
            Write one brief. Esy produces the campaign — pins, posts, and
            landing pages — and nothing ships until you approve it.
          </p>
          <div className="hv3-ctas">
            <Link href="https://make.esy.com" className="hv3-btn hv3-btn--primary">
              <span>Start producing</span>
              <ArrowRight size={18} />
            </Link>
            <a href="#the-line" className="hv3-btn hv3-btn--ghost">Watch the line run</a>
          </div>
        </div>
        <figure className="hv3-master">
          <img
            src="/brand/scenes/master.webp"
            alt="The producer directing an isometric production floor — three lines turning out finished, approved creatives"
            width={1536}
            height={1024}
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
              alt="The producer buried under an avalanche of creative requests, the wall calendar slipping off its hook"
              loading="lazy"
              width={1536}
              height={1024}
            />
          </figure>
          <div>
            <span className="hv3-eyebrow">Monday</span>
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
            <h2 className="hv3-title">So she writes one brief.</h2>
            <p className="hv3-lede">
              Audience, offer, tone — the way you&apos;d brief a colleague.
              It&apos;s the last production document anyone writes.
            </p>
          </div>
          <figure className="hv3-figure">
            <img
              src="/brand/scenes/brief.webp"
              alt="One brief card sliding into the machine's intake"
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
          <h2 className="hv3-title">You&apos;re operating the line right now.</h2>
          <p className="hv3-lede hv3-lede--center">
            Scroll, and blank stock is printed, sealed, and stacked — every
            format in parallel. Scroll up and the line runs in reverse.
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
          <figure className="hv3-figure">
            <SceneMedia
              name="review"
              alt="A stamp pressing a jade approval seal onto a finished creative"
              className="hv3-media"
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
            <span className="hv3-eyebrow">Keep producing</span>
            <h2 className="hv3-title">Monday, handled.</h2>
            <p className="hv3-lede">
              Approve the direction once and the line keeps running on
              schedule. The calendar fills itself.
            </p>
          </div>
        </div>
      </section>

      {/* ══ The receipts ══ */}
      <section className="hv3-section hv3-section--alt">
        <div className="hv3-container">
          <span className="hv3-eyebrow">
            <span className="hv3-live-dot" aria-hidden="true" /> Live · In production
          </span>
          <h2 className="hv3-title">This isn&apos;t a demo. clip.art runs on it.</h2>
          <p className="hv3-lede">
            A consumer marketplace, fed entirely by Esy workflows — every asset
            generated, processed, stored, and billed with a full record. The
            illustrations on this page came out of the same engine.
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
              Vista, one minute into a shift. Every shift it has ever run is
              listed underneath — what it made, and what it cost.
            </figcaption>
          </figure>
          <Link href="/workflows/generate-clip-art-asset/" className="hv3-inline-link">
            See the workflow behind it <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ══ Channels ══ */}
      <section className="hv3-channels-section">
        <div className="hv3-bg hv3-bg--channels" aria-hidden="true" />
        <div className="hv3-container">
          <span className="hv3-eyebrow hv3-eyebrow--onDark">Channels</span>
          <h2 className="hv3-title hv3-title--onDark">Where it ships first</h2>
          <p className="hv3-lede hv3-lede--onDark">
            The launch set covers what a small team actually feeds every week.
            More join as they earn it.
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

      {/* ══ Founder ══ */}
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

      {/* ══ The ask ══ */}
      <section className="hv3-final">
        <div className="hv3-container">
          <h2 className="hv3-final-headline">
            Your line is ready.
          </h2>
          <p className="hv3-final-sub">
            One brief in. A campaign&apos;s worth of creatives out — with a
            full record of how every one was made.
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
