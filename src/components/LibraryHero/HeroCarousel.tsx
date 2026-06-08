'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './HeroCarousel.css';

export type HeroCarouselItem = {
  id: string;
  href: string;
  imageSrc: string;
  /** Eyebrow caption (e.g. "Visual Essay", a style, or a cluster label). */
  label: string;
  title: string;
};

// Auto-advancing spotlight of featured items inside a .esy-stage hero. One piece
// at a time (image + label + title), clickable through to the artifact. Pauses on
// hover and honors prefers-reduced-motion.
export default function HeroCarousel({
  items,
  ariaLabel = 'Featured artifacts',
}: {
  items: HeroCarouselItem[];
  ariaLabel?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  // Auto-advance unless paused, single-item, or the user prefers reduced motion.
  useEffect(() => {
    if (paused || count <= 1) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 3800);
    return () => window.clearInterval(id);
  }, [paused, count]);

  // Recover if the items list shrinks below the current index.
  useEffect(() => {
    if (index >= count && count > 0) setIndex(0);
  }, [count, index]);

  if (count === 0) return null;

  return (
    <div
      className="esy-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="esy-carousel__stage">
        {items.map((item, i) => {
          const active = i === index;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`esy-carousel__slide ${active ? 'is-active' : ''}`}
              aria-hidden={!active}
              tabIndex={active ? 0 : -1}
            >
              <div
                className="esy-carousel__img"
                style={{ backgroundImage: `url(${item.imageSrc})` }}
              />
              <div className="esy-carousel__cap">
                <span className="esy-carousel__label">{item.label}</span>
                <span className="esy-carousel__title">{item.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="esy-carousel__dots" role="tablist" aria-label={ariaLabel}>
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`esy-carousel__dot ${i === index ? 'is-active' : ''}`}
            aria-label={`Show featured item ${i + 1}`}
            aria-selected={i === index}
            role="tab"
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
