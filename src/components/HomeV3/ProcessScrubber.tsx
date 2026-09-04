'use client';

/* The machine the visitor operates.
 *
 * Scroll drives a real production cycle — stock in, press, seal, eject,
 * stack — and scrolling back runs it in reverse. Frames on a canvas rather
 * than a scrubbed video, because video seeks land on whatever keyframe the
 * codec chose and stutter differently per device; images are exact both ways.
 *
 * This revision, after review:
 *   - two frame tiers, chosen once by viewport — phones never download
 *     desktop weight, desktops never get soft frames;
 *   - a live readout under the stage (progress bar + what the line is doing
 *     right now), updated by direct DOM writes inside the same rAF as the
 *     draw, so the readout costs no React renders while scrubbing;
 *   - no card, no border: the stage's ground colour matches the frames
 *     exactly, so the machine sits ON the page instead of in a box.
 *
 * Reduced motion: one still, no canvas, and none of the frames download.
 */

import { useEffect, useRef, useState } from 'react';

const STAGES = [
  'Blank stock feeds in',
  'The press runs',
  'Seals land',
  'Finished cards travel',
  'Stacked, ready for review',
];

export default function ProcessScrubber({
  frames,
  poster,
  alt,
}: {
  frames: number;
  poster: string;
  alt: string;
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastDrawn = useRef<number>(-1);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 1360, h: 1018 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }
    // Tier picked once: the desktop set is 1360px, the phone set 900px.
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const dir = mobile ? '/brand/scenes/press-m' : '/brand/scenes/press';
    setSize(mobile ? { w: 900, h: 674 } : { w: 1360, h: 1018 });

    const section = sectionRef.current;
    if (!section) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let loaded = 0;
        const images: HTMLImageElement[] = [];
        for (let i = 0; i < frames; i += 1) {
          const img = new Image();
          img.decoding = 'async';
          const done = () => {
            loaded += 1;
            if (loaded === frames && !cancelled) {
              imagesRef.current = images;
              setReady(true);
            }
          };
          img.onload = done;
          img.onerror = done;
          img.src = `${dir}/frame-${String(i).padStart(3, '0')}.webp`;
          images.push(img);
        }
      },
      // One viewport of lead time: decoded before anyone reaches it.
      { rootMargin: '100% 0px' }
    );
    observer.observe(section);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [frames]);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      rafRef.current = null;
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const index = Math.min(frames - 1, Math.round(progress * (frames - 1)));
      if (index === lastDrawn.current) return;
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      lastDrawn.current = index;
      // The readout writes straight to the DOM — no React work per frame.
      if (barRef.current) barRef.current.style.width = `${progress * 100}%`;
      if (labelRef.current) {
        const stage = STAGES[Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length))];
        if (labelRef.current.textContent !== stage) labelRef.current.textContent = stage;
      }
    };

    const onScroll = () => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, frames]);

  return (
    <div className="hv3-scrub" ref={sectionRef}>
      <div className="hv3-scrub-stage">
        {reduced || !ready ? (
          <img src={poster} alt={alt} className="hv3-scrub-canvas" width={size.w} height={size.h} />
        ) : null}
        {!reduced ? (
          <canvas
            ref={canvasRef}
            width={size.w}
            height={size.h}
            className="hv3-scrub-canvas"
            style={{ display: ready ? 'block' : 'none' }}
            role="img"
            aria-label={alt}
          />
        ) : null}
        {!reduced ? (
          <div className="hv3-scrub-readout" aria-hidden="true">
            <span ref={labelRef} className="hv3-scrub-label">{STAGES[0]}</span>
            <div className="hv3-scrub-track">
              <div ref={barRef} className="hv3-scrub-bar" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
