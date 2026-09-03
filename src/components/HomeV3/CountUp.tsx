'use client';

/* Proof that moves.
 *
 * A number that counts up when it scrolls into view — the one place on this
 * page where motion carries data rather than atmosphere. It runs once, the
 * way every other reveal on the site does, and someone who has asked for
 * reduced motion simply gets the final number immediately.
 *
 * The digits are tabular so the text never reflows while counting.
 */

import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 1100;

export default function CountUp({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(value);
  const decimals = Number.isInteger(value) ? 0 : String(value).split('.')[1].length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setShown(0);
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          // Ease out: fast first, settling — the count should feel like it
          // arrives at the number rather than stopping at it.
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(value * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      {shown.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
