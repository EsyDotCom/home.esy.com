import { useState, useEffect, useMemo } from 'react';
import type { SearchResult } from '@/components/SearchBar/SearchBar';

interface SchoolArticle {
  type: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  featured?: boolean;
  link: string;
}

interface SchoolResource {
  icon: string;
  title: string;
  description: string;
  link?: string;
}

interface SchoolCourse {
  title: string;
  duration: string;
  level: string;
  students: string;
}

interface UseSchoolSearchProps {
  articles: SchoolArticle[];
  resources: SchoolResource[];
  courses: SchoolCourse[];
  debounceMs?: number;
  maxResults?: number;
}

interface UseSchoolSearchReturn {
  searchResults: SearchResult[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showDropdown: boolean;
}

export const useSchoolSearch = ({ 
  articles, 
  resources, 
  courses, 
  debounceMs = 300, 
  maxResults = 8 
}: UseSchoolSearchProps): UseSchoolSearchReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search term
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsLoading(false);
    }, debounceMs);

    return () => {
      clearTimeout(timer);
      setIsLoading(false);
    };
  }, [searchTerm, debounceMs]);

  // Filter all content based on search term
  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return [];
    }

    const searchLower = debouncedSearchTerm.toLowerCase();
    const results: SearchResult[] = [];

    // Search articles
    const matchingArticles = articles
      .filter(article => {
        return (
          article.title.toLowerCase().includes(searchLower) ||
          article.excerpt.toLowerCase().includes(searchLower) ||
          article.category.toLowerCase().includes(searchLower) ||
          article.type.toLowerCase().includes(searchLower) ||
          article.author.toLowerCase().includes(searchLower)
        );
      })
      .map(article => ({
        id: `article-${article.link}`,
        title: article.title,
        description: article.excerpt,
        category: article.category,
        slug: article.link,
        type: 'article' as const,
        isPro: article.featured || false,
        metadata: {
          type: article.type,
          author: article.author,
          readTime: article.readTime
        }
      }));

    // Search resources
    const matchingResources = resources
      .filter(resource => {
        return (
          resource.title.toLowerCase().includes(searchLower) ||
          resource.description.toLowerCase().includes(searchLower)
        );
      })
      .map(resource => ({
        id: `resource-${resource.title}`,
        title: resource.title,
        description: resource.description,
        category: 'Resources',
        slug: resource.link,
        type: 'resource' as const,
        isPro: false,
        metadata: {
          icon: resource.icon
        }
      }));

    // Search courses
    const matchingCourses = courses
      .filter(course => {
        return (
          course.title.toLowerCase().includes(searchLower) ||
          course.level.toLowerCase().includes(searchLower)
        );
      })
      .map(course => ({
        id: `course-${course.title}`,
        title: course.title,
        description: `${course.duration} • ${course.level} • ${course.students}`,
        category: 'AI Courses',
        type: 'course' as const,
        isPro: false,
        metadata: {
          duration: course.duration,
          level: course.level,
          students: course.students
        }
      }));

    // Combine and sort results
    results.push(...matchingArticles, ...matchingResources, ...matchingCourses);
    
    // Sort by relevance (articles first, then resources, then courses)
    return results
      .sort((a, b) => {
        if (a.type === 'article' && b.type !== 'article') return -1;
        if (a.type !== 'article' && b.type === 'article') return 1;
        if (a.type === 'resource' && b.type === 'course') return -1;
        if (a.type === 'course' && b.type === 'resource') return 1;
        return 0;
      })
      .slice(0, maxResults);
  }, [articles, resources, courses, debouncedSearchTerm, maxResults]);

  const showDropdown = searchTerm.length > 0;

  return {
    searchResults,
    isLoading,
    searchTerm,
    setSearchTerm,
    showDropdown
  };
};
