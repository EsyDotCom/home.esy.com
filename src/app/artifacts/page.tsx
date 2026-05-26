import ArtifactsIndexClient from './ArtifactsIndexClient';

export const metadata = {
  title: 'Artifacts — Durable Outputs from Esy Workflows | Esy',
  description:
    'Browse Esy artifacts: visual essays, citation-verified infographics, and review-ready clip art — stable outputs from repeatable workflows with provenance.',
  keywords: [
    'esy artifacts',
    'visual essays',
    'research infographics',
    'clip art',
    'workflow outputs',
  ],
  openGraph: {
    title: 'Artifacts | Esy',
    description:
      'Durable outputs from Esy workflows — essays, infographics, and clip art.',
    url: 'https://esy.com/artifacts/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Artifacts | Esy',
    description:
      'Durable outputs from Esy workflows — essays, infographics, and clip art.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://esy.com/artifacts/',
  },
};

export default function ArtifactsHub() {
  return <ArtifactsIndexClient />;
}
