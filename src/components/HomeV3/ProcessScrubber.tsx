'use client';

/* The machine the visitor operates.
 *
 * Scroll position drives a real production cycle — stock in, press, seal,
 * eject, stack — and scrolling back runs it backwards. That is the whole
 * argument of the page made physical: this is a factory, and you can see it
 * work.
 *
 * Why frames on a canvas instead of scrubbing a <video>: seeking a video
 * backwards is at the mercy of the codec's keyframe spacing, so it stutters
 * on some devices and not others. Individual images are exact in both
 * directions, every time.
 *
 * Three failure modes are designed for, because each one is what makes this
 * effect look broken elsewhere:
 *   - blank flashes while frames are still downloading → nothing scrubs until
 *     every frame is decoded, and the poster holds the space until then;
 *   - work on the scroll event itself → scroll only records a number,
 *     requestAnimationFrame does the drawing;
 *   - ignoring someone who asked for less motion → they get one still frame
 *     and no downloads at all.
 */

import { useEffect, useRef, useState } from 'react';

export default function ProcessScrubber({
  dir,
  frames,
  poster,
  alt,
  width = 1024,
  height = 768,
}: {
  dir: string;
  frames: number;
  poster: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastDrawn = useRef<number>(-1);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  const src = (i: number) => `${dir}/frame-${String(i).padStart(3, '0')}.webp`;

  // Decide motion first, and only download frames if they will be used.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }
    const section = sectionRef.current;
    if (!section) return;

    let cancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // One viewport of lead time, so the sequence is decoded before the
        // section is anywhere near the middle of the screen.
        let loaded = 0;
        const images: HTMLImageElement[] = [];
        for (let i = 0; i < frames; i += 1) {
          const img = new Image();
          img.decoding = 'async';
          img.onload = () => {
            loaded += 1;
            if (loaded === frames && !cancelled) {
              imagesRef.current = images;
              setReady(true);
            }
          };
          img.onerror = () => {
            loaded += 1;
            if (loaded === frames && !cancelled) {
              imagesRef.current = images;
              setReady(true);
            }
          };
          img.src = src(i);
          images.push(img);
        }
      },
      { rootMargin: '100% 0px' }
    );
    observer.observe(section);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [dir, frames]);

  // Scroll writes a number; rAF does the drawing.
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
      // 0 at the moment the section sticks, 1 when it releases.
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const index = Math.min(frames - 1, Math.round(progress * (frames - 1)));
      if (index === lastDrawn.current) return;
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      lastDrawn.current = index;
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
          <img src={poster} alt={alt} width={width} height={height} className="hv3-scrub-canvas" />
        ) : null}
        {!reduced ? (
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="hv3-scrub-canvas"
            style={{ display: ready ? 'block' : 'none' }}
            role="img"
            aria-label={alt}
          />
        ) : null}
      </div>
    </div>
  );
}
