import { Metadata } from 'next';
import CoursesListClient from './CoursesListClient';

export const metadata: Metadata = {
  title: 'AI Courses | Esy',
  description: 'Practical courses for the AI solopreneur — learn to build agents, design agentic workflows, and use AI Coding Tools to run and grow your business. Each course pairs a walkthrough with something you can apply immediately.',
  openGraph: {
    title: 'AI Courses | Esy',
    description: 'Practical courses for the AI solopreneur — learn to build agents, design agentic workflows, and use AI Coding Tools to run and grow your business.',
    type: 'website',
    url: 'https://esy.com/courses/',
    siteName: 'Esy',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Courses | Esy',
    description: 'Practical courses for the AI solopreneur — learn to build agents, design agentic workflows, and use AI Coding Tools to run and grow your business.',
  },
  alternates: {
    canonical: '/courses/',
  },
};

export default function CoursesPage() {
  return <CoursesListClient />;
}
