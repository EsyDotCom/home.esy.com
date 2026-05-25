import { Metadata } from 'next';
import { Brain } from 'lucide-react';
import CategoryPageClient from '../(categories)/CategoryPageClient';
import { getTemplatesBySubcategory } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Claude Prompts for Research & Analysis | Esy Templates',
  description: 'Discover Claude prompts for nuanced research assistance, literature reviews, bias analysis, and evidence-based writing. Harness Claude\'s analytical depth for academic excellence.',
  keywords: 'Claude prompts, Anthropic Claude prompts, Claude for research, academic Claude prompts, literature review prompts, bias analysis prompts, Claude academic writing',
  openGraph: {
    title: 'Claude Prompts for Research & Analysis | Esy',
    description: 'Anthropic Claude prompts for sophisticated research analysis and academic writing.',
    url: 'https://esy.com/workflows/claude-prompts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Prompts for Research & Analysis | Esy',
    description: 'Anthropic Claude prompts for sophisticated research analysis and academic writing.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const seoDescription = `
<p>
  <strong>Claude prompts for academic research</strong> take advantage of Anthropic's Claude model's exceptional 
  ability to handle nuanced, complex analysis. Claude excels at tasks requiring careful reasoning, perspective 
  taking, and balanced evaluation—making it ideal for sophisticated academic work.
</p>
<p style="margin-top: 1rem;">
  Our <strong>Claude academic prompts</strong> are specifically designed to leverage the model's strengths in 
  multi-source literature reviews, bias detection, academic debate simulation, and evidence-based writing enhancement. 
  These prompts help you produce work that demonstrates the depth of analysis expected at graduate and professional levels.
</p>
<p style="margin-top: 1rem;">
  Whether you're conducting comprehensive literature reviews, analyzing texts for hidden biases, preparing for 
  thesis defenses, or strengthening your evidence integration, these <strong>Claude research prompts</strong> 
  provide structured frameworks that yield consistent, high-quality results. Each prompt has been refined through 
  extensive testing to maximize Claude's analytical capabilities for academic applications.
</p>
`;

export default function ClaudePromptsPage() {
  const templates = getTemplatesBySubcategory('claude');

  return (
    <CategoryPageClient
      title="Claude Prompts"
      subtitle="Harness Claude's nuanced reasoning for deep research analysis and sophisticated academic writing."
      description={seoDescription}
      subcategory="claude"
      templates={templates}
      icon={<Brain size={16} />}
      modelName="Anthropic Claude"
      accentColor="#d97706"
    />
  );
}

