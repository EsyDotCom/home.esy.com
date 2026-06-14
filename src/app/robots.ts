import { MetadataRoute } from 'next';

/**
 * Static robots.txt generation.
 * 
 * Vercel evaluates the QA flag at build time for each environment.
 * - QA builds (NEXT_PUBLIC_IS_QA=true): Block all crawlers
 * - Production builds: Allow crawlers, block AI training bots
 */

// Robots policy only depends on deployment env, so keep it cacheable.
export const dynamic = 'force-static';

// Check QA environment at build time
const isQA = process.env.NEXT_PUBLIC_IS_QA === 'true';

export default function robots(): MetadataRoute.Robots {
  if (isQA) {
    // Block everything on QA
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
        // Explicitly block AI crawlers
        {
          userAgent: 'GPTBot',
          disallow: '/',
        },
        {
          userAgent: 'ChatGPT-User',
          disallow: '/',
        },
        {
          userAgent: 'CCBot',
          disallow: '/',
        },
        {
          userAgent: 'anthropic-ai',
          disallow: '/',
        },
        {
          userAgent: 'Claude-Web',
          disallow: '/',
        },
        {
          userAgent: 'Google-Extended',
          disallow: '/',
        },
        {
          userAgent: 'Bytespider',
          disallow: '/',
        },
        {
          userAgent: 'cohere-ai',
          disallow: '/',
        },
      ],
    };
  }

  // Production: Allow crawlers with sitemap
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
      // Block AI training bots on production too
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
    ],
    sitemap: 'https://esy.com/sitemap.xml',
  };
}
