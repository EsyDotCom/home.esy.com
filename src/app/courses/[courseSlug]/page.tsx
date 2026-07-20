import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCourse, courses } from '@/lib/learn/mockData';
import CourseDetailClient from './CourseDetailClient';

interface PageProps {
  params: Promise<{ courseSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) return { title: 'Course Not Found' };

  return {
    title: `${course.title} | Esy AI Courses`,
    description: course.description,
    openGraph: {
      title: `${course.title} | Esy AI Courses`,
      description: course.description,
      type: 'website',
      url: `https://esy.com/courses/${courseSlug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${course.title} | Esy AI Courses`,
      description: course.description,
    },
  };
}

export async function generateStaticParams() {
  return courses.map((c) => ({ courseSlug: c.slug }));
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) notFound();

  return <CourseDetailClient course={course} />;
}
