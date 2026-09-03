'use client';

/* A scene that loops, or doesn't.
 *
 * Two things the site cares about, both handled here so no caller has to
 * remember them:
 *
 * 1. Someone who has asked their OS to reduce motion gets the still image and
 *    no <video> at all. The page-wide reduced-motion CSS block cannot help
 *    here — it flattens CSS animation, and a looping video ignores it
 *    completely — so this has to be decided in JavaScript, the same way
 *    RunConsole and RunChecklistCard already decide it.
 * 2. A clip that is off-screen should not be decoding frames. The video only
 *    plays while it is in view, using the same IntersectionObserver idiom the
 *    rest of the site reveals with.
 */

import { useEffect, useRef, useState } from 'react';

export default function SceneMedia({
  name,
  alt,
  className,
  width = 1024,
  height = 768,
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const [motionOk, setMotionOk] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setMotionOk(true);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Not disconnected on first hit, unlike the reveal pattern: this one
        // has to keep working in both directions for the life of the page.
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [motionOk]);

  const poster = `/brand/scenes/${name}.webp`;

  if (!motionOk) {
    return (
      <img
        src={poster}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      autoPlay
      preload={priority ? 'metadata' : 'none'}
      aria-label={alt}
    >
      <source src={`/brand/scenes/${name}.webm`} type="video/webm" />
      <source src={`/brand/scenes/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
