// Templates Marketplace Type Definitions

export type TemplateCategory = 'prompt' | 'template' | 'bundle';

export type TemplateDifficulty = 'beginner' | 'intermediate' | 'advanced';

// AI Model targeting for SEO
export type AIModel = 'ChatGPT' | 'Claude' | 'Gemini' | null;

// Workflow pipeline stage definition
export interface WorkflowStage {
  id: string;
  label: string;
  sublabel?: string;
  isFinal?: boolean;
}

// Pricing for premium prompts
export interface TemplatePricing {
  type: 'free' | 'premium';
  price?: number; // Price in USD
}

export interface Template {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  category: TemplateCategory;
  subcategory: string;
  tags: string[];
  content: string;
  difficulty?: TemplateDifficulty;
  isPro?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  variables?: string[];
  expectedOutput?: string;
  useCases?: string[];
  relatedSlugs?: string[];
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  // New fields for SEO expansion
  model?: AIModel;
  pricing?: TemplatePricing;
  // Model Reference System fields
  modelFamily?: string; // e.g., 'Claude', 'GPT'
  modelSubFamily?: string; // e.g., 'Opus'
  modelVersion?: string; // e.g., '4.6', '5.2'
  agentRole?: string; // e.g., 'planning', 'synthesis', 'code-generation'
  // Workflow template fields
  isWorkflow?: boolean;
  workflowStages?: WorkflowStage[];
  outputFormats?: string[]; // e.g., ['PNG', 'SVG', 'PDF']
  estimatedTime?: string; // e.g., '~2 min'
  inputRequirements?: string[]; // e.g., ['Citation or DOI', 'Data (optional)']
  sampleArtifacts?: { title: string; description: string }[];
  engine?: string; // e.g., 'Nano Banana Pro', 'Claude Opus'
}

export interface TemplateSubcategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  count: number;
  icon?: string;
}

export interface TemplateCategoryInfo {
  id: TemplateCategory;
  name: string;
  slug: string;
  description: string;
  subcategories: TemplateSubcategory[];
  count: number;
  isComingSoon?: boolean;
}

export interface TemplateFilter {
  category?: TemplateCategory;
  subcategory?: string;
  difficulty?: TemplateDifficulty;
  tags?: string[];
  search?: string;
  isPro?: boolean;
}

// Utility function to generate slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Breadcrumb types and utilities
export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface ModelCategoryInfo {
  label: string;
  href: string;
}

// Map AI models to their category page info
export const MODEL_CATEGORY_MAP: Record<string, ModelCategoryInfo> = {
  ChatGPT: {
    label: 'ChatGPT Prompts',
    href: '/workflows/chatgpt-prompts',
  },
  Gemini: {
    label: 'Gemini Prompts',
    href: '/workflows/gemini-prompts',
  },
  Claude: {
    label: 'Claude Prompts',
    href: '/workflows/claude-prompts',
  },
};

// SEO subcategory mapping (for templates without a model but with SEO subcategory)
export const SUBCATEGORY_CATEGORY_MAP: Record<string, ModelCategoryInfo> = {
  seo: {
    label: 'SEO Writing Prompts',
    href: '/workflows/seo-writing-prompts',
  },
  chatgpt: {
    label: 'ChatGPT Prompts',
    href: '/workflows/chatgpt-prompts',
  },
  gemini: {
    label: 'Gemini Prompts',
    href: '/workflows/gemini-prompts',
  },
  claude: {
    label: 'Claude Prompts',
    href: '/workflows/claude-prompts',
  },
  // Essay templates
  'essay-argumentative': {
    label: 'Argumentative Essay',
    href: '/workflows/essay/argumentative',
  },
  'essay-college-application': {
    label: 'College Application Essay',
    href: '/workflows/essay/college-application',
  },
  'essay-research': {
    label: 'Research Essay',
    href: '/workflows/essay/research',
  },
  'essay-mla-format': {
    label: 'MLA Format Essay',
    href: '/workflows/essay/mla-format',
  },
  'essay-expository': {
    label: 'Expository Essay',
    href: '/workflows/essay/expository',
  },
  'essay-analytical': {
    label: 'Analytical Essay',
    href: '/workflows/essay/analytical',
  },
  'essay-narrative': {
    label: 'Narrative Essay',
    href: '/workflows/essay/narrative',
  },
};

/**
 * Generate breadcrumb items for a template detail page.
 * Returns items for: Agentic Workflows -> {Category} -> {Template Title}
 */
export function getTemplateBreadcrumbs(template: Template): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    {
      label: template.isWorkflow ? 'Agentic Workflows' : 'Workflows',
      href: '/workflows',
    },
  ];

  // Try to get category from model field first
  if (template.model && MODEL_CATEGORY_MAP[template.model]) {
    const modelCategory = MODEL_CATEGORY_MAP[template.model];
    items.push({
      label: modelCategory.label,
      href: modelCategory.href,
    });
  }
  // Fall back to subcategory if no model
  else if (template.subcategory && SUBCATEGORY_CATEGORY_MAP[template.subcategory]) {
    const subcategoryInfo = SUBCATEGORY_CATEGORY_MAP[template.subcategory];
    items.push({
      label: subcategoryInfo.label,
      href: subcategoryInfo.href,
    });
  }
  // Default fallback
  else {
    items.push({
      label: template.isWorkflow ? 'Workflow Templates' : 'Prompts',
      href: '/workflows',
    });
  }

  // Add current template (no link)
  items.push({
    label: template.title,
    isCurrent: true,
  });

  return items;
}

/**
 * Generate JSON-LD BreadcrumbList structured data
 */
export function getTemplateBreadcrumbJsonLd(template: Template, baseUrl: string = 'https://esy.com'): object {
  const breadcrumbs = getTemplateBreadcrumbs(template);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : `${baseUrl}/workflows/${template.slug}`,
    })),
  };
}

