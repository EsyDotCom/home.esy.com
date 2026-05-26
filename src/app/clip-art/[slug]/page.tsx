import { notFound } from 'next/navigation';
import {
  getClipArtBySlug,
  getClipArtSlugs,
} from '@/data/clip-art-artifacts';
import ClipArtDetailClient from './ClipArtDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getClipArtSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const artifact = getClipArtBySlug(slug);
  if (!artifact) return {};

  return {
    title: `${artifact.title} — ${artifact.style} clip art | Esy`,
    description: artifact.description,
    openGraph: {
      title: `${artifact.title} | Esy Clip Art`,
      description: artifact.description,
      url: `https://esy.com/clip-art/${artifact.slug}/`,
      type: 'website' as const,
      images: [
        {
          url: artifact.imageUrl,
          alt: artifact.imageAlt,
          width: artifact.width,
          height: artifact.height,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${artifact.title} | Esy Clip Art`,
      description: artifact.description,
      images: [artifact.imageUrl],
    },
    alternates: {
      canonical: `https://esy.com/clip-art/${artifact.slug}/`,
    },
  };
}

export default async function ClipArtDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const artifact = getClipArtBySlug(slug);
  if (!artifact) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: artifact.title,
    description: artifact.description,
    contentUrl: artifact.imageUrl,
    url: `https://esy.com/clip-art/${artifact.slug}/`,
    width: { '@type': 'QuantitativeValue', value: artifact.width },
    height: { '@type': 'QuantitativeValue', value: artifact.height },
    encodingFormat: 'image/webp',
    creator: {
      '@type': 'Organization',
      name: 'Esy',
      url: 'https://esy.com',
    },
    datePublished: artifact.generatedAt,
    keywords: artifact.tags?.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClipArtDetailClient artifact={artifact} />
    </>
  );
}
