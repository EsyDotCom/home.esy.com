import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLesson, courses } from '@/lib/learn/mockData';
import LessonClient from './LessonClient';

interface PageProps {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params;
  const result = getLesson(courseSlug, lessonSlug);
  if (!result) return { title: 'Lesson Not Found' };

  const { course, lesson } = result;
  return {
    title: `${lesson.title} | ${course.title} | Esy AI Courses`,
    description: lesson.description,
    openGraph: {
      title: `${lesson.title} | ${course.title} | Esy AI Courses`,
      description: lesson.description,
      type: 'video.other',
      url: `https://esy.com/courses/${courseSlug}/${lessonSlug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${lesson.title} | ${course.title} | Esy AI Courses`,
      description: lesson.description,
    },
  };
}

export async function generateStaticParams() {
  const params: { courseSlug: string; lessonSlug: string }[] = [];
  for (const course of courses) {
    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        params.push({ courseSlug: course.slug, lessonSlug: lesson.slug });
      }
    }
  }
  return params;
}

export default async function LessonPage({ params }: PageProps) {
  const { courseSlug, lessonSlug } = await params;
  const result = getLesson(courseSlug, lessonSlug);
  if (!result) notFound();

  const { course, lesson, chapter } = result;

  return (
    <Suspense fallback={null}>
    <LessonClient
      course={course}
      lesson={lesson}
      chapterTitle={chapter}
    />
    </Suspense>
  );
}
