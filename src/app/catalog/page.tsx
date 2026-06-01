import CatalogClient from './CatalogClient';

export const metadata = {
  title: 'Workflow Catalog — Runnable Esy Workflows | Esy',
  description:
    "The live catalog of workflow templates you can run on the Esy platform. Each is a versioned, repeatable workflow that produces a durable, provenance-tracked artifact.",
  keywords: [
    'esy workflows',
    'workflow templates',
    'ai workflow catalog',
    'research report workflow',
    'clip art workflow',
    'infographic workflow',
  ],
  openGraph: {
    title: 'Workflow Catalog | Esy',
    description:
      'Versioned, runnable workflow templates on the Esy platform — research reports, infographics, clip art, and more.',
    url: 'https://esy.com/catalog/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Workflow Catalog | Esy',
    description: 'Versioned, runnable workflow templates on the Esy platform.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://esy.com/catalog/' },
};

export default function CatalogPage() {
  return <CatalogClient />;
}
