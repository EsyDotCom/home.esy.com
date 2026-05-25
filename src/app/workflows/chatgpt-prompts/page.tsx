import { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import CategoryPageClient from '../(categories)/CategoryPageClient';
import { getTemplatesBySubcategory } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'ChatGPT Prompts for Academic Writing | Esy Prompts',
  description: 'Discover powerful ChatGPT prompts optimized for academic writing, research synthesis, argument analysis, and critical thinking. Enhance your essays and research papers with AI assistance.',
  keywords: 'ChatGPT prompts, academic writing prompts, ChatGPT for essays, AI writing prompts, research prompts, academic ChatGPT, essay writing AI',
  openGraph: {
    title: 'ChatGPT Prompts for Academic Writing | Esy',
    description: 'Powerful ChatGPT prompts for academic writing, research, and critical analysis.',
    url: 'https://esy.com/workflows/chatgpt-prompts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChatGPT Prompts for Academic Writing | Esy',
    description: 'Powerful ChatGPT prompts for academic writing, research, and critical analysis.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const seoDescription = `
<p>
  <strong>ChatGPT prompts for academic writing</strong> have transformed how students and researchers approach complex writing tasks. 
  Our curated collection of ChatGPT prompts is specifically designed to enhance your academic workflow, from initial research 
  to final revisions.
</p>
<p style="margin-top: 1rem;">
  Whether you're analyzing arguments, synthesizing research from multiple sources, or converting casual drafts into polished 
  academic prose, these prompts leverage ChatGPT's strengths in logical reasoning and structured output. Each prompt has been 
  tested and refined to produce consistent, high-quality results that maintain academic integrity while saving you hours of work.
</p>
<p style="margin-top: 1rem;">
  Our <strong>ChatGPT academic prompts</strong> cover essential skills including argument analysis, critical thinking essay 
  development, research synthesis, literature comparison, and academic tone conversion. These are the same prompt frameworks 
  used by graduate students and professional researchers to accelerate their writing process without sacrificing quality.
</p>
`;

export default function ChatGPTPromptsPage() {
  const templates = getTemplatesBySubcategory('chatgpt');

  return (
    <CategoryPageClient
      title="ChatGPT Prompts"
      subtitle="Optimized prompts for OpenAI's ChatGPT models, designed for academic writing and research."
      description={seoDescription}
      subcategory="chatgpt"
      templates={templates}
      icon={<Sparkles size={16} />}
      modelName="ChatGPT"
      accentColor="#10a37f"
    />
  );
}

