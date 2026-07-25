import { clipArtArtifacts } from '@/data/clip-art-artifacts';
import { publishedInfographics } from '@/data/infographics';
import { publishedVisualEssays } from '@/data/visualEssays';

export type ArtifactNavKindId = 'essays' | 'infographics' | 'clip-art';

export type ArtifactNavKind = {
  id: ArtifactNavKindId;
  label: string;
  desc: string;
  href: string;
  /** Live total for this kind — the same arrays /artifacts counts in its chips. */
  count: number;
  /** Representative thumbnail: first published item that ships an image. */
  thumb: string;
};

// The Artifacts nav panel shows one row per artifact kind. Counts and
// thumbnails come from the published arrays the gallery itself renders, so the
// panel can never advertise work the gallery doesn't actually have.
export const ARTIFACT_NAV_KINDS: ArtifactNavKind[] = [
  {
    id: 'essays',
    label: 'Essays',
    desc: 'Visual research narratives',
    href: '/essays/',
    count: publishedVisualEssays.length,
    thumb: publishedVisualEssays.find((essay) => essay.heroImage)?.heroImage ?? '',
  },
  {
    id: 'infographics',
    label: 'Infographics',
    desc: 'Citation-verified visual data',
    href: '/infographics/',
    count: publishedInfographics.length,
    thumb:
      publishedInfographics[0]?.thumbnailSrc || publishedInfographics[0]?.imageSrc || '',
  },
  {
    id: 'clip-art',
    label: 'Clip Art',
    desc: 'Isolated assets, generated & reviewed',
    href: '/clip-art/',
    count: clipArtArtifacts.length,
    thumb: clipArtArtifacts[0]?.imageUrl ?? '',
  },
];

export const ARTIFACT_NAV_TOTAL = ARTIFACT_NAV_KINDS.reduce(
  (total, kind) => total + kind.count,
  0,
);
