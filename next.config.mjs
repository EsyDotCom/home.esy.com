import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Pre-existing react/no-unescaped-entities warnings across many essays.
    // These don't affect runtime and will be cleaned up separately.
    ignoreDuringBuilds: true,
  },
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true
    }
  }),
  images: {
    domains: ['images.unsplash.com', 'upload.wikimedia.org', 'images.metmuseum.org', 'images.esy.com', 'images.clip.art'],
    ...(process.env.NODE_ENV === 'production' && {
      unoptimized: true
    })
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
  },
  // Proxy CDN assets through dev server to avoid CORS issues with varying localhost ports
  async rewrites() {
    return [
      {
        source: '/cdn-proxy/:path*',
        destination: 'https://images.esy.com/:path*',
      },
    ];
  },
  // Redirect legacy paths to /essays/
  async redirects() {
    return [
      // Prompt library retired (Jun 2026) — send old traffic to workflows
      {
        source: '/prompt-library',
        destination: '/workflows',
        permanent: true,
      },
      {
        source: '/prompt-library/:path*',
        destination: '/workflows',
        permanent: true,
      },
      {
        source: '/prompts',
        destination: '/workflows',
        permanent: true,
      },
      {
        source: '/prompts/:path*',
        destination: '/workflows',
        permanent: true,
      },
      // Templates renamed to Workflows (May 2026)
      {
        source: '/templates',
        destination: '/workflows',
        permanent: true,
      },
      {
        source: '/templates/:path*',
        destination: '/workflows/:path*',
        permanent: true,
      },
      // Retired legacy SEO subtree /workflows/essay/* (captured "essay template"
      // back when /workflows was /templates). Superseded by /workflows/academic-essays.
      {
        source: '/workflows/essay',
        destination: '/workflows/academic-essays',
        permanent: true,
      },
      {
        source: '/workflows/essay/:path*',
        destination: '/workflows/academic-essays',
        permanent: true,
      },
      // Workflow detail slugs adopted the verb-first standard (generate-*) to
      // match the platform's canonical template ids (June 2026). Preserve the
      // pre-rename SEO URLs with permanent redirects to the new slugs.
      {
        source: '/workflows/argumentative-essay',
        destination: '/workflows/generate-essay-argumentative',
        permanent: true,
      },
      {
        source: '/workflows/analytical-essay',
        destination: '/workflows/generate-essay-analytical',
        permanent: true,
      },
      {
        source: '/workflows/expository-essay',
        destination: '/workflows/generate-essay-expository',
        permanent: true,
      },
      {
        source: '/workflows/narrative-essay',
        destination: '/workflows/generate-essay-narrative',
        permanent: true,
      },
      {
        source: '/workflows/research-paper',
        destination: '/workflows/generate-research-paper',
        permanent: true,
      },
      {
        source: '/workflows/college-application-essay',
        destination: '/workflows/generate-essay-college-application',
        permanent: true,
      },
      {
        source: '/workflows/research-infographic',
        destination: '/workflows/generate-research-infographic',
        permanent: true,
      },
      // Redirect /essays/visual/etymology to /essays/etymology/
      {
        source: '/essays/visual/the-word-dick',
        destination: '/essays/etymology/the-word-dick',
        permanent: true,
      },
      {
        source: '/essays/visual/the-origin-of-the-word-dick',
        destination: '/essays/etymology/the-origin-of-the-word-dick',
        permanent: true,
      },
      // Redirect other /essays/visual/* to /essays/*
      {
        source: '/essays/visual/:slug',
        destination: '/essays/:slug',
        permanent: true,
      },
      // Redirect /essays/the-manhattan-project to /essays/history/the-manhattan-project
      {
        source: '/essays/the-manhattan-project',
        destination: '/essays/history/the-manhattan-project',
        permanent: true,
      },
      // Redirect /essays/fentanyl-timeline to /essays/history/fentanyl-crisis-timeline
      {
        source: '/essays/fentanyl-timeline',
        destination: '/essays/history/fentanyl-crisis-timeline',
        permanent: true,
      },
      // Redirect /essays/fentanyl-crisis-timeline to /essays/history/fentanyl-crisis-timeline
      {
        source: '/essays/fentanyl-crisis-timeline',
        destination: '/essays/history/fentanyl-crisis-timeline',
        permanent: true,
      },
      // Etymology essays redirects - moved from /essays/ to /essays/etymology/
      {
        source: '/essays/the-word-essay',
        destination: '/essays/etymology/the-word-essay',
        permanent: true,
      },
      {
        source: '/essays/the-word-robot',
        destination: '/essays/etymology/the-word-robot',
        permanent: true,
      },
      {
        source: '/essays/the-word-dick',
        destination: '/essays/etymology/the-word-dick',
        permanent: true,
      },
      {
        source: '/essays/the-word-pussy',
        destination: '/essays/etymology/the-word-pussy',
        permanent: true,
      },
      {
        source: '/essays/the-word-han',
        destination: '/essays/etymology/the-word-han',
        permanent: true,
      },
      {
        source: '/essays/the-word-animal',
        destination: '/essays/etymology/the-word-animal',
        permanent: true,
      },
      {
        source: '/essays/the-origin-of-animal',
        destination: '/essays/etymology/the-origin-of-animal',
        permanent: true,
      },
      {
        source: '/essays/the-origin-of-sex',
        destination: '/essays/etymology/the-origin-of-sex',
        permanent: true,
      },
      {
        source: '/essays/the-origin-of-toy',
        destination: '/essays/etymology/the-origin-of-toy',
        permanent: true,
      },
      {
        source: '/essays/the-origin-of-the-word-dick',
        destination: '/essays/etymology/the-origin-of-the-word-dick',
        permanent: true,
      },
      {
        source: '/essays/the-origin-of-the-word-porn',
        destination: '/essays/etymology/the-origin-of-the-word-porn',
        permanent: true,
      },
      {
        source: '/essays/pornography-etymology',
        destination: '/essays/etymology/pornography-etymology',
        permanent: true,
      },
      // Archived writing glossary terms → glossary index
      {
        source: '/glossary/thesis-statement',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/topic-sentence',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/argumentative-essay',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/body-paragraph',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/conclusion',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/introduction',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/hook',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/transition',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/evidence',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/citation',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/mla-format',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/apa-format',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/works-cited',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/plagiarism',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/paraphrase',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/quote',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/analysis',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/counterargument',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/outline',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/brainstorming',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/revision',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/proofreading',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/subject-verb-agreement',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/comma-splice',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/run-on-sentence',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/parallel-structure',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/active-voice',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/passive-voice',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/peer-review',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/research-question',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/bibliography',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/chicago-style',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/essay',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/grammar',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/punctuation',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/research',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/sentence-structure',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/writing',
        destination: '/glossary',
        permanent: true,
      },
    ];
  },
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
})(nextConfig);
