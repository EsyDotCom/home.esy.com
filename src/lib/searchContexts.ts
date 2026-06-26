/**
 * Centralized Search Context Configuration
 * 
 * This file defines all search contexts, their configurations, and provides
 * utilities for context switching across the application.
 */

export type SearchContext = 
  | 'templates'
  | 'glossary' 
  | 'school' 
  | 'essays' 
  | 'scrollytelling'
  | 'blog' 
  | 'general';

export interface SearchContextConfig {
  context: SearchContext;
  placeholder: string;
  dataSource: 'prompts' | 'templates' | 'glossary' | 'school' | 'essays' | 'scrollytelling' | 'blog' | 'none';
  searchUrl: string;
  resultUrlPattern: string;
  shouldAlwaysExpand: boolean;
  description: string;
}

export const SEARCH_CONTEXTS: Record<SearchContext, SearchContextConfig> = {
  'templates': {
    context: 'templates',
    placeholder: 'Search templates...',
    dataSource: 'templates',
    searchUrl: '/workflows?search=',
    resultUrlPattern: '/workflows/',
    shouldAlwaysExpand: true,
    description: 'Search through writing templates and frameworks'
  },
  'glossary': {
    context: 'glossary',
    placeholder: 'Search glossary terms...',
    dataSource: 'glossary',
    searchUrl: '/glossary?search=',
    resultUrlPattern: '/glossary/',
    shouldAlwaysExpand: true,
    description: 'Search through academic terms and definitions'
  },
  'school': {
    context: 'school',
    placeholder: 'Search articles & guides...',
    dataSource: 'school',
    searchUrl: '/learn?search=',
    resultUrlPattern: '',
    shouldAlwaysExpand: true,
    description: 'Search through educational articles and guides'
  },
  'essays': {
    context: 'essays',
    placeholder: 'Search visual essays...',
    dataSource: 'essays',
    searchUrl: '/essays/?q=',
    resultUrlPattern: '',
    shouldAlwaysExpand: true,
    description: 'Search through visual essays and research'
  },
  'scrollytelling': {
    context: 'scrollytelling',
    placeholder: 'Search stories...',
    dataSource: 'scrollytelling',
    searchUrl: '/scrollytelling?q=',
    resultUrlPattern: '/scrollytelling/',
    shouldAlwaysExpand: true,
    description: 'Search through interactive scrollytelling stories'
  },
  'blog': {
    context: 'blog',
    placeholder: 'Search articles, topics, or authors...',
    dataSource: 'blog',
    searchUrl: '/blog?search=',
    resultUrlPattern: '/blog/',
    shouldAlwaysExpand: true,
    description: 'Search through blog articles and insights'
  },
  'general': {
    context: 'general',
    placeholder: 'Search...',
    dataSource: 'none',
    searchUrl: '/search?q=',
    resultUrlPattern: '',
    shouldAlwaysExpand: false,
    description: 'General search across the platform'
  }
};

/**
 * Get search context configuration by context name
 */
export const getSearchContextConfig = (context: SearchContext): SearchContextConfig => {
  return SEARCH_CONTEXTS[context] || SEARCH_CONTEXTS.general;
};

/**
 * Determine search context from pathname
 */
export const getSearchContextFromPath = (pathname: string): SearchContext => {
  if (pathname?.startsWith('/workflows')) return 'templates';
  if (pathname?.startsWith('/glossary')) return 'glossary';
  if (pathname?.startsWith('/learn')) return 'school';
  if (pathname?.startsWith('/scrollytelling')) return 'scrollytelling';
  if (pathname?.startsWith('/essays')) return 'essays';
  if (pathname?.startsWith('/blog')) return 'blog';
  // Homepage uses essays context for search
  if (pathname === '/' || pathname === '') return 'essays';
  // Info pages use essays context
  if (pathname === '/about' || pathname === '/privacy' || pathname === '/terms' || pathname === '/agentic-workflows') return 'essays';
  return 'general';
};

/**
 * Get search context configuration from pathname
 */
export const getSearchContextConfigFromPath = (pathname: string): SearchContextConfig => {
  const context = getSearchContextFromPath(pathname);
  return getSearchContextConfig(context);
};

/**
 * Check if a context should always expand
 */
export const shouldContextAlwaysExpand = (context: SearchContext): boolean => {
  return getSearchContextConfig(context).shouldAlwaysExpand;
};

/**
 * Get placeholder text for a context
 */
export const getContextPlaceholder = (context: SearchContext): string => {
  return getSearchContextConfig(context).placeholder;
};

/**
 * Get search URL for a context
 */
export const getContextSearchUrl = (context: SearchContext, searchTerm: string): string => {
  const config = getSearchContextConfig(context);
  return `${config.searchUrl}${encodeURIComponent(searchTerm)}`;
};

/**
 * Get result URL for a context and slug
 */
export const getContextResultUrl = (context: SearchContext, slug: string): string => {
  const config = getSearchContextConfig(context);
  return config.resultUrlPattern ? `${config.resultUrlPattern}${slug}` : slug;
};

/**
 * Get all available search contexts
 */
export const getAllSearchContexts = (): SearchContext[] => {
  return Object.keys(SEARCH_CONTEXTS) as SearchContext[];
};

/**
 * Validate if a context is valid
 */
export const isValidSearchContext = (context: string): context is SearchContext => {
  return context in SEARCH_CONTEXTS;
};
