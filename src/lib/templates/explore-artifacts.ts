import type { Template } from './types';

/**
 * Resolves the secondary "Explore Artifacts" CTA on workflow detail pages.
 * Maps each workflow to its relevant public gallery when one exists.
 */
export function getExploreArtifactsHref(
  template: Pick<Template, 'exploreArtifactsHref' | 'subcategory' | 'slug' | 'tags'>,
): string {
  if (template.exploreArtifactsHref) {
    return template.exploreArtifactsHref;
  }

  if (template.subcategory === 'clip-art') {
    return '/clip-art/';
  }

  if (
    template.slug === 'research-infographic' ||
    template.tags?.includes('infographic')
  ) {
    return '/infographics/';
  }

  if (template.subcategory?.startsWith('essay')) {
    return '/essays/';
  }

  return '/artifacts/';
}
