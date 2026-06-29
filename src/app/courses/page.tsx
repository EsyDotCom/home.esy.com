import { Metadata } from 'next';
import CoursesListClient from './CoursesListClient';

export const metadata: Metadata = {
  title: 'Courses | Esy',
  description: 'Practical courses for the AI solopreneur — learn to build agents, design agentic workflows, and use AI Coding Tools to run and grow your business. Each course pairs a walkthrough with something you can apply immediately.',
  openGraph: {
    title: 'Courses | Esy',
    description: 'Practical courses for the AI solopreneur — learn to build agents, design agentic workflows, and use AI Coding Tools to run and grow your business.',
    type: 'website',
  },
};

export default function CoursesPage() {
  return <CoursesListClient />;
}
