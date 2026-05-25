import { Metadata } from 'next';
import { Zap } from 'lucide-react';
import CategoryPageClient from '../(categories)/CategoryPageClient';
import { getTemplatesBySubcategory } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Gemini Prompts for Academic Research | Esy Templates',
  description: 'Explore Google Gemini prompts for graduate-level essays, source evaluation, academic outlines, and research expansion. Leverage Gemini\'s reasoning for superior academic work.',
  keywords: 'Gemini prompts, Google Gemini prompts, Gemini for research, academic Gemini prompts, graduate essay prompts, AI research prompts, Gemini academic writing',
  openGraph: {
    title: 'Gemini Prompts for Academic Research | Esy',
    description: 'Google Gemini prompts optimized for academic research and graduate-level writing.',
    url: 'https://esy.com/workflows/gemini-prompts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gemini Prompts for Academic Research | Esy',
    description: 'Google Gemini prompts optimized for academic research and graduate-level writing.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const seoDescription = `
<p>
  <strong>Google Gemini prompts</strong> offer unique advantages for academic research and graduate-level writing. 
  Gemini's advanced reasoning capabilities and multimodal understanding make it particularly effective for complex 
  research tasks that require synthesizing diverse information sources.
</p>
<p style="margin-top: 1rem;">
  Our collection of <strong>Gemini prompts for academic writing</strong> is designed to leverage the model's strengths 
  in logical reasoning, source evaluation, and structured analysis. These prompts are ideal for graduate students 
  working on thesis projects, researchers conducting literature reviews, and academics developing comprehensive 
  research frameworks.
</p>
<p style="margin-top: 1rem;">
  From graduate-level essay planning to research question expansion, each <strong>Gemini academic prompt</strong> has 
  been crafted to produce sophisticated, nuanced outputs that meet the demands of higher education. Whether you're 
  evaluating source credibility, generating detailed outlines, or transforming concepts into formal essays, these 
  prompts provide the structured guidance needed for excellence.
</p>
`;

export default function GeminiPromptsPage() {
  const templates = getTemplatesBySubcategory('gemini');

  return (
    <CategoryPageClient
      title="Gemini Prompts"
      subtitle="Advanced prompts for Google Gemini, optimized for graduate-level research and academic excellence."
      description={seoDescription}
      subcategory="gemini"
      templates={templates}
      icon={<Zap size={16} />}
      modelName="Google Gemini"
      accentColor="#4285f4"
    />
  );
}

