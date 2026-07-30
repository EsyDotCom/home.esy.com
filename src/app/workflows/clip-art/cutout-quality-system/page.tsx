import { Metadata } from 'next';
import Script from 'next/script';
import CutoutQualitySystemClient from './CutoutQualitySystemClient';

const TITLE = 'The Cutout Quality System | Clip Art Workflows | Esy';
const DESCRIPTION =
  'How Esy produces clip art with true transparency: the chroma-key render pipeline, despill, perceptual quality gates, the self-healing removal ladder, lossless storage, and the eight experiment waves that set every threshold. System documentation for engineers.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'clip art pipeline',
    'chroma key background removal',
    'despill',
    'alpha matting quality metrics',
    'transparent PNG quality',
    'image generation QA',
    'lossless WebP transparency',
  ],
  alternates: { canonical: 'https://esy.com/workflows/clip-art/cutout-quality-system/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://esy.com/workflows/clip-art/cutout-quality-system/',
    type: 'article',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Workflows', item: 'https://esy.com/workflows/' },
    { '@type': 'ListItem', position: 2, name: 'Clip Art', item: 'https://esy.com/workflows/clip-art/' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'The Cutout Quality System',
      item: 'https://esy.com/workflows/clip-art/cutout-quality-system/',
    },
  ],
};

export default function CutoutQualitySystemPage() {
  return (
    <>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CutoutQualitySystemClient />
    </>
  );
}
