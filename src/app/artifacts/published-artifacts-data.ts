import {
  CLIP_ART_STYLE_COLORS,
  CLIP_ART_STYLE_LABELS,
  clipArtArtifacts,
  type ClipArtStyle,
} from '@/data/clip-art-artifacts';
import {
  CLUSTER_LABELS,
  INFOGRAPHIC_CATEGORY_COLORS,
  publishedInfographics,
  type InfographicCategory,
} from '@/data/infographics';
import {
  CATEGORY_COLORS as ESSAY_CATEGORY_COLORS,
  publishedVisualEssays,
  type EssayCategory,
} from '@/data/visualEssays';

export type PublishedArtifactKind = 'essay' | 'infographic' | 'clip-art';

export type PublishedArtifactItem = {
  id: string;
  kind: PublishedArtifactKind;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  accentColor: string;
  label: string;
  /** Optional meta string shown next to the label (e.g. read time). */
  meta?: string;
};

export type PublishedArtifactRails = {
  essays: PublishedArtifactItem[];
  infographics: PublishedArtifactItem[];
  clipArt: PublishedArtifactItem[];
};

const MAX_PER_RAIL = 3;

/** Drop entries that reuse the same image. Showcase must look curated, not padded. */
function dedupeByImage<T>(
  items: T[],
  getKey: (item: T) => string = (item) =>
    (item as unknown as { imageSrc: string }).imageSrc,
): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of items) {
    const key = getKey(item);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

export function getPublishedArtifactRails(): PublishedArtifactRails {
  const essays = dedupeByImage(
    publishedVisualEssays
      .filter((e) => Boolean(e.heroImage))
      .map((e) => ({
        id: e.id,
        title: e.title,
        description: e.description,
        href: e.href,
        imageSrc: e.heroImage as string,
        imageAlt: e.subtitle || e.title,
        category: e.category,
        readTime: e.readTime,
      })),
  )
    .slice(0, MAX_PER_RAIL)
    .map((e) => ({
      id: e.id,
      kind: 'essay' as const,
      title: e.title,
      description: e.description,
      href: e.href,
      imageSrc: e.imageSrc,
      imageAlt: e.imageAlt,
      width: 1600,
      height: 1000,
      accentColor:
        ESSAY_CATEGORY_COLORS[e.category as EssayCategory] || '#00A896',
      label: e.category,
      meta: e.readTime,
    }));

  const infographics = dedupeByImage(publishedInfographics)
    .slice(0, MAX_PER_RAIL)
    .map((item) => ({
      id: item.id,
      kind: 'infographic' as const,
      title: item.title,
      description: item.description,
      href: `/infographics/${item.id}/`,
      imageSrc: item.thumbnailSrc || item.imageSrc,
      imageAlt: item.imageAlt,
      width: item.width,
      height: item.height,
      accentColor:
        INFOGRAPHIC_CATEGORY_COLORS[item.category as InfographicCategory] ||
        '#00A896',
      label: CLUSTER_LABELS[item.cluster] || item.category,
    }));

  const clipArt = dedupeByImage(clipArtArtifacts, (item) => item.imageUrl)
    .slice(0, MAX_PER_RAIL)
    .map((item) => ({
      id: item.id,
      kind: 'clip-art' as const,
      title: item.title,
      description: item.description,
      href: `/clip-art/${item.slug}/`,
      imageSrc: item.imageUrl,
      imageAlt: item.imageAlt,
      width: item.width,
      height: item.height,
      accentColor:
        CLIP_ART_STYLE_COLORS[item.style as ClipArtStyle] || '#00A896',
      label: CLIP_ART_STYLE_LABELS[item.style as ClipArtStyle] || item.style,
    }));

  return { essays, infographics, clipArt };
}
