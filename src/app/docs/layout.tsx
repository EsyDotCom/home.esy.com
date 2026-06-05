import type { Metadata } from 'next';
import { DocsLayout } from '@/components/docs/DocsLayout';
// Scoped here (not in the root layout) so Next only ships the docs design
// system on /docs/* routes — it never loads on the marketing pages.
import './docs-theme.css';

export const metadata: Metadata = {
  title: {
    default: 'Docs — Esy',
    template: '%s — Esy Docs',
  },
  description:
    'API, runtime, and workflow reference for Esy — the platform for producing high-quality, reviewable artifacts.',
  alternates: {
    canonical: '/docs',
  },
  openGraph: {
    siteName: 'Esy Docs',
    title: 'Docs — Esy',
    description:
      'API, runtime, and workflow reference for Esy — the platform for producing high-quality, reviewable artifacts.',
    url: 'https://esy.com/docs',
    type: 'website',
  },
};

export default function DocsRouteLayout({ children }: { children: React.ReactNode }) {
  // .esy-docs scopes the design system; the root layout already provides the
  // <html>/<body> and the font CSS variables the docs theme references.
  return (
    <div className="esy-docs">
      <DocsLayout>{children}</DocsLayout>
    </div>
  );
}
