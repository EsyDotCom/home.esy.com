import { Metadata } from 'next';
import VisualEssaysClient from './VisualEssaysClient';

export const metadata: Metadata = {
  title: 'Visual Essay Workflow Templates | Scroll-Driven Narratives & Interactive Stories | Esy',
  description:
    'Create immersive, scroll-driven visual essays that combine research, writing, and interactive visualizations. Turn complex topics into explorable stories with Esy workflow templates.',
  keywords: [
    'visual essay workflow templates',
    'interactive essays',
    'scroll-driven narratives',
    'data visualization essays',
    'interactive storytelling',
    'visual research',
    'explorable explanations',
  ],
  openGraph: {
    title: 'Visual Essay Workflow Templates | Esy',
    description:
      'Immersive, scroll-driven visual essays — research, writing, and interactive visuals in one artifact.',
    url: 'https://esy.com/workflows/visual-essays',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Essay Workflow Templates | Esy',
    description:
      'Create interactive, scroll-driven visual essays with Esy workflow templates.',
  },
  robots: { index: true, follow: true },
};

export default function VisualEssaysPage() {
  return <VisualEssaysClient />;
}
