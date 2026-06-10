/**
 * CTA Mapping Configuration
 * Maps URL paths to their corresponding CTA text and links
 */

export interface CTAConfig {
  ctaText: string;
  ctaHref: string;
  isNewsletter?: boolean;
  isProduct?: boolean;
}

export interface CTAMapping {
  [pathPattern: string]: CTAConfig;
}

// CTA mapping configuration
export const ctaMapping: CTAMapping = {
  // Homepage - gallery-first, link to app
  '/': {
    ctaText: 'App',
    ctaHref: 'https://app.esy.com',
    isProduct: true
  },
  
  // Docs pages
  '/docs': {
    ctaText: 'Try Esy Free',
    ctaHref: 'https://app.esy.com/signup',
    isProduct: true
  },
  
  // Blog pages
  '/blog': {
    ctaText: 'Get Weekly AI Writing Tips',
    ctaHref: '#newsletter', // Newsletter signup route
    isNewsletter: true
  },
  
  // School pages
  '/school': {
    ctaText: 'App',
    ctaHref: 'https://app.esy.com',
    isProduct: true
  },
  
  // Essays pages
  '/essays': {
    ctaText: 'App',
    ctaHref: 'https://app.esy.com',
    isProduct: true
  },
  
  // Individual essay pages (bonus feature)
  '/essays/': {
    ctaText: 'Learn How We Wrote This',
    ctaHref: '/school', // Link to related tutorial
    isNewsletter: false
  }
};

// Dynamic CTA pool for A/B testing
export const dynamicCTAPool: string[] = [
  'Write for Free',
  'Start Writing Free',
  'Get Free AI Essay Writer',
  'Write My Essay'
];

// Function to get dynamic CTA based on hour
export function getDynamicCTA(): string {
  const hour = new Date().getHours();
  const index = hour % dynamicCTAPool.length;
  return dynamicCTAPool[index];
}

// Default fallback CTA
export const defaultCTA: CTAConfig = {
  ctaText: 'App',
  ctaHref: 'https://app.esy.com',
  isProduct: true
};

/**
 * Get CTA configuration based on current pathname
 * @param pathname - Current URL pathname
 * @returns CTA configuration object
 */
export function getCTAConfig(pathname: string): CTAConfig {
  if (!pathname) return defaultCTA;
  
  // Normalize pathname (remove trailing slash except for root)
  const normalizedPath = pathname.endsWith('/') && pathname.length > 1 
    ? pathname.slice(0, -1) 
    : pathname;
  
  // Check for exact matches first
  if (ctaMapping[normalizedPath]) {
    return ctaMapping[normalizedPath];
  }
  
  // Check for pattern matches (for sub-pages)
  for (const [pattern, config] of Object.entries(ctaMapping)) {
    // Match patterns that end with '/' or exact base paths
    if ((pattern.endsWith('/') && normalizedPath.startsWith(pattern)) || 
        (!pattern.endsWith('/') && normalizedPath.startsWith(pattern + '/'))) {
      return config;
    }
  }
  
  // Return default if no match found
  return {
    ctaText: 'App',
    ctaHref: 'https://app.esy.com',
    isProduct: true
  };
}

/**
 * Get responsive CTA text that handles longer text gracefully
 * @param ctaText - The CTA text
 * @param isMobile - Whether the viewport is mobile
 * @returns Responsive CTA text configuration
 */
export function getResponsiveCTAText(ctaText: string, isMobile: boolean = false) {
  const maxMobileLength = 20; // Characters before wrapping
  
  return {
    text: ctaText,
    shouldWrap: isMobile && ctaText.length > maxMobileLength,
    maxLength: isMobile ? maxMobileLength : undefined
  };
}
