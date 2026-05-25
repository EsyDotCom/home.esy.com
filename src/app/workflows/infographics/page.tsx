import { Metadata } from 'next';
import InfographicsClient from './InfographicsClient';

export const metadata: Metadata = {
  title: 'Infographic Workflow Templates | Data-Driven Visual Summaries | Esy',
  description:
    'Transform research citations, data, and concepts into publication-ready infographics. Automated layout, visualization selection, and multi-format export with Esy workflow templates.',
  keywords: [
    'infographic workflow templates',
    'research infographic',
    'data visualization',
    'infographic maker',
    'academic infographic',
    'research poster',
    'visual data summary',
  ],
  openGraph: {
    title: 'Infographic Workflow Templates | Esy',
    description:
      'Turn citations and data into publication-ready infographics — automated research extraction, layout, and export.',
    url: 'https://esy.com/workflows/infographics',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infographic Workflow Templates | Esy',
    description:
      'Create data-driven infographics from research with Esy workflow templates.',
  },
  robots: { index: true, follow: true },
};

export default function InfographicsPage() {
  return <InfographicsClient />;
}
