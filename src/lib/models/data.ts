// Model Reference System Data
// Canonical model definitions for Esy's infrastructure

import { ModelPage, ModelUsage } from './types';

// Claude Opus Sub-family
const claudeOpusVersions = [
  {
    version: '4.6',
    status: 'recommended' as const,
    note: 'Current production version',
    releaseDate: '2024-12-01',
  },
  {
    version: '4.5',
    status: 'supported' as const,
    note: 'Previous stable version',
    releaseDate: '2024-10-15',
  },
  {
    version: '4.0',
    status: 'legacy' as const,
    note: 'Maintained for compatibility',
    releaseDate: '2024-06-01',
  },
];

const claudeOpusUsage: ModelUsage[] = [
  {
    agentRole: 'code-generation',
    description: 'Generates analysis scripts, automation code, and software tools for research workflows',
    confidence: 'primary',
  },
  {
    agentRole: 'planning',
    description: 'Decomposes complex research tasks into structured workflows with clear dependencies',
    confidence: 'primary',
  },
  {
    agentRole: 'synthesis',
    description: 'Synthesizes findings from multiple sources into coherent long-form narratives',
    confidence: 'primary',
  },
  {
    agentRole: 'verification',
    description: 'Reviews generated content for accuracy, coherence, and alignment with requirements',
    confidence: 'primary',
  },
  {
    agentRole: 'long-context',
    description: 'Processes extended research documents and maintains context across large inputs',
    confidence: 'primary',
  },
  {
    agentRole: 'research',
    description: 'Discovers and evaluates relevant sources for research tasks',
    confidence: 'secondary',
  },
  {
    agentRole: 'code-review',
    description: 'Reviews generated code for correctness and best practices',
    confidence: 'secondary',
  },
];

const claudeOpusTemplates = [
  {
    slug: 'academic-essay',
    title: 'Academic Essay',
    artifactType: 'Essay',
    agentRole: 'synthesis',
    pinnedVersion: '4.6',
  },
  {
    slug: 'research-brief',
    title: 'Research Brief',
    artifactType: 'Brief',
    agentRole: 'synthesis',
  },
  {
    slug: 'visual-essay',
    title: 'Visual Essay',
    artifactType: 'Visual Essay',
    agentRole: 'planning',
  },
];

// GPT Family
const gptVersions = [
  {
    version: '5.2',
    status: 'recommended' as const,
    note: 'Current production version',
    releaseDate: '2024-11-15',
  },
  {
    version: '5.1',
    status: 'supported' as const,
    note: 'Previous stable version',
    releaseDate: '2024-09-20',
  },
  {
    version: '4-turbo',
    status: 'legacy' as const,
    note: 'Maintained for specific use cases',
    releaseDate: '2024-04-01',
  },
];

const gptUsage: ModelUsage[] = [
  {
    agentRole: 'research',
    description: 'Discovers and retrieves relevant information from diverse sources',
    confidence: 'primary',
  },
  {
    agentRole: 'synthesis',
    description: 'Synthesizes information into structured outputs with clear formatting',
    confidence: 'secondary',
  },
  {
    agentRole: 'planning',
    description: 'Creates task breakdowns for research and analysis workflows',
    confidence: 'secondary',
  },
];

const gptTemplates = [
  {
    slug: 'infographic',
    title: 'Infographic',
    artifactType: 'Infographic',
    agentRole: 'synthesis',
    pinnedVersion: '5.2',
  },
];

// Model Page Definitions
export const modelPages: ModelPage[] = [
  // Claude Opus Sub-family Page
  {
    id: 'claude-opus',
    slug: 'claude-opus',
    type: 'subfamily',
    family: {
      id: 'claude',
      name: 'Claude',
      vendor: 'Anthropic',
      description: 'Anthropic\'s Claude family of language models',
      subFamilies: [
        {
          id: 'opus',
          name: 'Opus',
          family: 'Claude',
          description: 'High-capability model for complex reasoning and long-form synthesis',
          versions: claudeOpusVersions,
        },
      ],
    },
    subFamily: {
      id: 'opus',
      name: 'Opus',
      family: 'Claude',
      description: 'High-capability model for complex reasoning and long-form synthesis',
      versions: claudeOpusVersions,
    },
    description: 'Claude Opus is used in Esy exclusively for code generation, as well as high-reliability planning and long-form synthesis.',
    usage: claudeOpusUsage,
    strengths: [
      'Consistent multi-step reasoning across extended contexts',
      'Strong adherence to structured output requirements',
      'Reliable fact-checking and verification capabilities',
      'Effective at maintaining narrative coherence in long-form content',
    ],
    limitations: [
      'Slower response times compared to smaller models',
      'Higher token costs for extended conversations',
      'May be overly cautious in creative tasks',
      'Limited real-time information without tool use',
    ],
    templates: claudeOpusTemplates,
    lastReviewed: '2025-01-15',
    researchLinks: [
      {
        label: 'Model Performance Analysis',
        // No dedicated performance article exists; send readers to the hub.
        href: '/agentic',
      },
    ],
  },
  // GPT Family Page
  {
    id: 'gpt',
    slug: 'gpt',
    type: 'family',
    family: {
      id: 'gpt',
      name: 'GPT',
      vendor: 'OpenAI',
      description: 'OpenAI\'s GPT family of language models',
      versions: gptVersions,
    },
    description: 'GPT models are used in Esy for research discovery and information synthesis tasks.',
    usage: gptUsage,
    strengths: [
      'Fast response times for interactive workflows',
      'Effective at information retrieval and synthesis',
      'Good performance-to-cost ratio for high-volume tasks',
      'Strong performance on research discovery tasks',
    ],
    limitations: [
      'Context window limitations in older versions',
      'May require more explicit instructions for structured outputs',
      'Less consistent reasoning on multi-step tasks compared to Opus',
      'Limited built-in fact-checking capabilities',
    ],
    templates: gptTemplates,
    lastReviewed: '2025-01-15',
  },
  // GPT-5.2 Version Page
  {
    id: 'gpt-5-2',
    slug: 'gpt/5-2',
    type: 'version',
    family: {
      id: 'gpt',
      name: 'GPT',
      vendor: 'OpenAI',
      description: 'OpenAI\'s GPT family of language models',
      versions: gptVersions,
    },
    version: {
      version: '5.2',
      status: 'recommended',
      note: 'Current production version',
      releaseDate: '2024-11-15',
    },
    description: 'GPT-5.2 is the recommended version for research discovery and information synthesis workflows.',
    usage: gptUsage,
    strengths: [
      'Enhanced context handling for longer documents',
      'Better instruction following for structured outputs',
      'Optimized performance for research discovery tasks',
      'Improved information synthesis capabilities',
    ],
    limitations: [
      'Newer version with less production history than 5.1',
      'May have edge cases not yet discovered in all workflows',
      'Cost structure may differ from previous versions',
    ],
    templates: gptTemplates.filter(t => t.pinnedVersion === '5.2' || !t.pinnedVersion),
    lastReviewed: '2025-01-15',
  },
];

// Query Functions
export function getModelPageBySlug(slug: string): ModelPage | undefined {
  return modelPages.find(page => page.slug === slug);
}

export function getAllModelPages(): ModelPage[] {
  return modelPages;
}

export function getModelPagesByType(type: 'family' | 'subfamily' | 'version'): ModelPage[] {
  return modelPages.filter(page => page.type === type);
}

export function getModelFamily(familyId: string): ModelPage | undefined {
  return modelPages.find(page => page.family.id === familyId && page.type === 'family');
}

export function getModelSubFamily(familyId: string, subFamilyId: string): ModelPage | undefined {
  return modelPages.find(
    page => 
      page.family.id === familyId && 
      page.subFamily?.id === subFamilyId && 
      page.type === 'subfamily'
  );
}

export function getModelVersion(familyId: string, version: string): ModelPage | undefined {
  return modelPages.find(
    page => 
      page.family.id === familyId && 
      page.version?.version === version && 
      page.type === 'version'
  );
}
