import { Metadata } from 'next';
import EssayTemplatesClient from './EssayTemplatesClient';

export const metadata: Metadata = {
  title: 'Essay Templates & Writing Prompts | Outlines, Structures & AI Prompts | Esy',
  description: 'Free essay templates, outlines, and AI writing prompts for argumentative, research, college application, MLA format, and expository essays. Download ready-to-use templates or generate essays with AI.',
  keywords: [
    'essay templates',
    'essay outline',
    'essay structure',
    'argumentative essay template',
    'research essay outline',
    'college application essay template',
    'MLA format essay template',
    'expository essay outline',
    'AI essay prompts',
    'essay writing help',
  ],
  openGraph: {
    title: 'Essay Templates & Writing Prompts | Esy',
    description: 'Free essay templates, outlines, and AI prompts. From argumentative essays to college applications.',
    url: 'https://esy.com/workflows/essay',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Essay Templates & Writing Prompts | Esy',
    description: 'Free essay templates, outlines, and AI prompts for every essay type.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EssayTemplatesPage() {
  return <EssayTemplatesClient />;
}

