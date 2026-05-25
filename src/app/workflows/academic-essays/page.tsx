import { Metadata } from 'next';
import AcademicEssaysClient from './AcademicEssaysClient';

export const metadata: Metadata = {
  title: 'Academic Essay Workflow Templates | Research, Argumentative & Analytical | Esy',
  description:
    'Write polished academic essays with guided workflows — argumentative, analytical, expository, narrative, research papers, and college application essays. Each workflow template runs research, outlining, drafting, and formatting automatically.',
  keywords: [
    'academic essay workflow templates',
    'essay writing workflow',
    'argumentative essay template',
    'analytical essay template',
    'research paper template',
    'college application essay',
    'expository essay template',
    'narrative essay template',
    'AI essay writing',
  ],
  openGraph: {
    title: 'Academic Essay Workflow Templates | Esy',
    description:
      'Six guided workflows for every major essay type — from argumentative to college application. Research, draft, and format automatically.',
    url: 'https://esy.com/workflows/academic-essays',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Academic Essay Workflow Templates | Esy',
    description:
      'Guided essay workflows that research, outline, draft, and format your academic writing.',
  },
  robots: { index: true, follow: true },
};

export default function AcademicEssaysPage() {
  return <AcademicEssaysClient />;
}
