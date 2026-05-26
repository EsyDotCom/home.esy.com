import { Metadata } from 'next';
import EssayTemplatesClient from './EssayTemplatesClient';

export const metadata: Metadata = {
  title: 'Essay Workflow Templates & Writing Prompts | Outlines, Structures & AI Prompts | Esy',
  description: 'Free essay workflow templates, outlines, and AI writing prompts for argumentative, research, college application, MLA format, and expository essays. Choose a workflow template instead of starting from a blank prompt.',
  keywords: [
    'essay workflow templates',
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
    title: 'Essay Workflow Templates & Writing Prompts | Esy',
    description: 'Free essay workflow templates, outlines, and AI prompts. From argumentative essays to college applications.',
    url: 'https://esy.com/workflows/essay',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Essay Workflow Templates & Writing Prompts | Esy',
    description: 'Free essay workflow templates, outlines, and AI prompts for every essay type.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EssayTemplatesPage() {
  return <EssayTemplatesClient />;
}

