/**
 * Clip Art Artifacts — published gallery.
 *
 * Each record mirrors a row in `app.esy.com/artifacts` produced by the
 * `generate-clip-art-asset` workflow. URLs follow the ESY R2 internal
 * artifact convention from `generate-clip-art-asset-mvp.md`:
 *   artifacts/{artifact_type}/{artifact_id}/processed.webp
 *
 * IMPORTANT — Aspect ratio is *not* fixed.
 * Clip art assets can be square, portrait, or landscape depending on the
 * subject and the workflow's selected dimensions. The gallery must render
 * each asset at its intrinsic aspect — never normalize, never crop. Always
 * fill in real `width` / `height` values from the artifact record.
 *
 * To publish a new artifact here:
 *   1. Run the workflow in app.esy.com.
 *   2. Note the artifact ID (UUID prefix) and the source dimensions.
 *   3. Append an entry below with a stable slug for the marketing surface.
 */
export type ClipArtStyle =
  | 'flat'
  | 'chibi'
  | 'cartoon'
  | 'illustrated'
  | 'watercolor';

export type ClipArtAspectRatio = '1:1' | '3:4' | '4:3' | '16:9';

export interface ClipArtArtifact {
  /** Maps 1:1 to the artifact ID in app.esy.com/artifacts. */
  id: string;
  /** URL-safe slug for this gallery (used in marketing routes, NOT in R2 keys). */
  slug: string;
  title: string;
  description: string;
  /** Style classification — matches the workflow's style preset. */
  style: ClipArtStyle;
  /** Public R2 URL via images.esy.com. */
  imageUrl: string;
  /** Raw (pre-processed) asset URL — kept for provenance comparisons. */
  rawImageUrl?: string;
  imageAlt: string;
  /**
   * Intrinsic dimensions of the source asset. Used to render at natural
   * aspect ratio in a masonry layout — clip art is NOT uniformly square.
   * Supported source ratios from the workflow today: 1:1 (1024x1024),
   * 3:4 (1024x1360), 4:3 (1360x1024), 16:9 (1456x816).
   */
  width: number;
  height: number;
  /** Subject tags for filtering / SEO. */
  tags: string[];
  /** Free-text subject group used for grouping in the UI. */
  subjectGroup?: string;
  generatedAt?: string;
  /** Provider model that produced the raw asset. */
  engine?: string;
  /** Resolved prompt sent to the provider. */
  prompt?: string;
  /** Background removal pipeline (none = kept). */
  backgroundRemoval?: 'birefnet-light' | 'none';
  /** Output format(s) available on the CDN. */
  formats?: string[];
}

/** Derives the aspect ratio label from width/height (returns 'custom' for non-standard ratios). */
export function getClipArtAspectRatio(
  artifact: Pick<ClipArtArtifact, 'width' | 'height'>,
): ClipArtAspectRatio | 'custom' {
  const ratio = artifact.width / artifact.height;
  if (Math.abs(ratio - 1) < 0.02) return '1:1';
  if (Math.abs(ratio - 3 / 4) < 0.02) return '3:4';
  if (Math.abs(ratio - 4 / 3) < 0.02) return '4:3';
  if (Math.abs(ratio - 16 / 9) < 0.02) return '16:9';
  return 'custom';
}

export const clipArtArtifacts: ClipArtArtifact[] = [
  {
    id: 'artifact-12559e5e',
    slug: 'bunnys-pancake-breakfast',
    title: "Bunny's Pancake Breakfast",
    description:
      'Cartoon-style asset with bold outlines, flat fills, and a clean transparent background.',
    style: 'cartoon',
    imageUrl:
      'https://images.esy.com/artifacts/clip-art/artifact-12559e5e/processed.webp',
    rawImageUrl:
      'https://images.esy.com/artifacts/clip-art/artifact-12559e5e/raw.png',
    imageAlt: 'Cartoon blue bunny eating pancakes in bed',
    width: 1024,
    height: 1024,
    tags: ['bunny', 'breakfast', 'pancakes', 'animal', 'cute'],
    subjectGroup: 'animals',
    generatedAt: '2026-05-16',
    engine: 'gpt-image-2',
    prompt:
      'Cartoon-style clip art of a blue bunny sitting up in bed eating a stack of pancakes, bold outlines, flat color fills, friendly expression, isolated on white background.',
    backgroundRemoval: 'birefnet-light',
    formats: ['WEBP', 'PNG'],
  },
  {
    id: 'artifact-5876fdfb',
    slug: 'sleeping-duckling',
    title: 'Sleeping Duckling',
    description:
      'Chibi-style asset with soft palette, kawaii proportions, and clean transparent edges.',
    style: 'chibi',
    imageUrl:
      'https://images.esy.com/artifacts/clip-art/artifact-5876fdfb/processed.webp',
    rawImageUrl:
      'https://images.esy.com/artifacts/clip-art/artifact-5876fdfb/raw.png',
    imageAlt: 'Chibi-style sleeping yellow duckling tucked into bed',
    width: 1024,
    height: 1024,
    tags: ['duckling', 'sleeping', 'bedtime', 'animal', 'kawaii'],
    subjectGroup: 'animals',
    generatedAt: '2026-05-16',
    engine: 'gpt-image-2',
    prompt:
      'Chibi-style clip art of a small yellow duckling sleeping peacefully tucked into a tiny bed, soft pastel palette, kawaii proportions, soft outlines, isolated on white background.',
    backgroundRemoval: 'birefnet-light',
    formats: ['WEBP', 'PNG'],
  },
  {
    id: 'artifact-d0c32dbb',
    slug: 'sleeping-chipmunk-family',
    title: 'Sleeping Chipmunk Family',
    description:
      'Illustrated cartoon asset with painterly shading, warm palette, and isolated background.',
    style: 'illustrated',
    imageUrl:
      'https://images.esy.com/artifacts/clip-art/artifact-d0c32dbb/processed.webp',
    rawImageUrl:
      'https://images.esy.com/artifacts/clip-art/artifact-d0c32dbb/raw.png',
    imageAlt: 'Illustrated chipmunk family sleeping in a woven nest',
    width: 1024,
    height: 1024,
    tags: ['chipmunk', 'family', 'sleeping', 'nest', 'animal'],
    subjectGroup: 'animals',
    generatedAt: '2026-05-16',
    engine: 'gpt-image-2',
    prompt:
      'Illustrated clip art of a chipmunk family of three sleeping curled together in a woven grass nest, painterly shading, warm autumn palette, soft lighting, isolated on white background.',
    backgroundRemoval: 'birefnet-light',
    formats: ['WEBP', 'PNG'],
  },
];

export const CLIP_ART_STYLE_LABELS: Record<ClipArtStyle, string> = {
  flat: 'Flat',
  chibi: 'Chibi',
  cartoon: 'Cartoon',
  illustrated: 'Illustrated',
  watercolor: 'Watercolor',
};

/**
 * Style-to-color map for badges. Follows the same pattern as
 * `INFOGRAPHIC_CATEGORY_COLORS` — a single base hex per style; the badge
 * derives `color` from it and `background: ${color}15` for a tinted pill.
 */
export const CLIP_ART_STYLE_COLORS: Record<ClipArtStyle, string> = {
  flat: '#00A896',
  chibi: '#D97706',
  cartoon: '#DC2626',
  illustrated: '#1D4ED8',
  watercolor: '#7C3AED',
};

export function getClipArtBySlug(slug: string): ClipArtArtifact | undefined {
  return clipArtArtifacts.find((a) => a.slug === slug);
}

export function getClipArtSlugs(): string[] {
  return clipArtArtifacts.map((a) => a.slug);
}

export function getClipArtBySubjectGroup(group: string): ClipArtArtifact[] {
  return clipArtArtifacts.filter((a) => a.subjectGroup === group);
}

export function getUniqueStyles(): ClipArtStyle[] {
  return Array.from(new Set(clipArtArtifacts.map((a) => a.style)));
}
