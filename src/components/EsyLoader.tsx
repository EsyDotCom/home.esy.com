'use client';

// The official Esy loader: the real Black Ops One "e" rendered as its three
// chamfered glyph pieces (spine / bowl / bar), animated as a brand motion rather
// than a generic spinner. Drop-in replacement for the lucide Loader2 — the mark
// fills with `currentColor`, so it matches whatever context it sits in.
//
//   - flow:      the e stays whole; a teal verify-pulse travels through it. Default.
//   - synthesis: the pieces converge into the e, pulse, then disperse and re-form.
//   - static:    the assembled e, no motion.
//
// Animation + clip-path geometry live in globals.css under `.esy-loader`.

type EsyLoaderVariant = 'flow' | 'synthesis' | 'static';

interface EsyLoaderProps {
  /** Glyph height in px; width keeps the glyph's aspect ratio. */
  size?: number;
  variant?: EsyLoaderVariant;
  /** Layout/color overrides — color flows through via `currentColor`. */
  className?: string;
  /** Accessible label; pass "" for decorative spinners next to text. */
  label?: string;
}

// The glyph's native aspect ratio (font box, 1152 x 1062).
const GLYPH_W = 1152;
const GLYPH_H = 1062;

export function EsyLoader({ size = 18, variant = 'flow', className, label = 'Loading' }: EsyLoaderProps) {
  const width = Math.round((size * GLYPH_W) / GLYPH_H);
  const classes = ['esy-loader', `esy-loader--${variant}`, className].filter(Boolean).join(' ');
  return (
    <span
      role="status"
      aria-label={label || undefined}
      className={classes}
      style={{ width, height: size }}
    >
      <span className="esy-e-piece esy-e-spine" />
      <span className="esy-e-piece esy-e-bowl" />
      <span className="esy-e-piece esy-e-bar" />
    </span>
  );
}

export default EsyLoader;
