import { Metadata } from 'next';
import { Search } from 'lucide-react';
import CategoryPageClient from '../(categories)/CategoryPageClient';
import { getTemplatesBySubcategory } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'SEO Writing Prompts & Content Workflow Templates | Esy Prompts',
  description: 'Professional SEO writing prompts for blog outlines, keyword expansion, competitor analysis, landing pages, and meta descriptions. Create content that ranks and converts.',
  keywords: 'SEO writing prompts, SEO content prompts, blog outline generator, keyword research prompts, SEO copywriting, content marketing prompts, SEO workflow templates',
  openGraph: {
    title: 'SEO Writing Prompts & Content Workflow Templates | Esy',
    description: 'Professional SEO writing prompts for content that ranks and converts.',
    url: 'https://esy.com/workflows/seo-writing-prompts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Writing Prompts & Content Workflow Templates | Esy',
    description: 'Professional SEO writing prompts for content that ranks and converts.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const seoDescription = `
<p>
  <strong>SEO writing prompts</strong> bridge the gap between quality content and search engine visibility. 
  Our collection provides structured frameworks for creating content that ranks well while genuinely serving 
  your audience's needs. These aren't shortcuts—they're systematic approaches to content excellence.
</p>
<p style="margin-top: 1rem;">
  From <strong>SEO blog outline generators</strong> to keyword expansion frameworks, each prompt is designed 
  to help you create comprehensive, authoritative content that search engines reward. Whether you're building 
  pillar pages, crafting landing pages, or optimizing existing content, these prompts provide the strategic 
  structure you need.
</p>
<p style="margin-top: 1rem;">
  Our <strong>SEO content prompts</strong> cover the full content creation workflow: keyword research and 
  clustering, competitive analysis, content structuring, featured snippet optimization, and meta description 
  crafting. These are the same frameworks used by professional content marketers and SEO specialists to 
  consistently produce content that drives organic traffic and achieves business goals.
</p>
`;

export default function SEOWritingPromptsPage() {
  const templates = getTemplatesBySubcategory('seo');

  return (
    <CategoryPageClient
      title="SEO Writing Prompts"
      subtitle="Create search-optimized content that ranks and converts with professional SEO frameworks."
      description={seoDescription}
      subcategory="seo"
      templates={templates}
      icon={<Search size={16} />}
      modelName="SEO Content"
      accentColor="#059669"
    />
  );
}

