// Adapter: registry catalog entry (+ contract snapshot) → the Template shape
// ArtifactDetailTemplate renders. One detail-page format for every workflow
// (Zev, 2026-07-21): catalog-published workflows get the same premium page —
// animated WorkflowCircuit included — as the curated set, synthesized from
// committed snapshots instead of hand-authored data.

import type { Template, WorkflowDetail } from '@/lib/templates/types';
import type { WorkflowCatalogEntry } from '@/lib/workflow-catalog';
import { getWorkflowCatalog } from '@/lib/workflow-catalog';
import type { WorkflowContract } from '@/lib/workflow-contracts';

// Registry ids are verb-first; the artifact class gives the browse subcategory.
const CLASS_SUBCATEGORY: Record<string, string> = {
  research: 'research',
  visual: 'visual',
  video: 'video',
  knowledge: 'knowledge',
};

const CLASS_OUTPUT_FORMATS: Record<string, string[]> = {
  visual: ['PNG', 'WEBP'],
  research: ['DOCX', 'PDF'],
  knowledge: ['JSON'],
};

// Curated example outputs per template — real, published pieces from the live
// packs on clip.art (all URLs verified against images.clip.art). Selection:
// strongest finished work per workflow, image-first (Zev delegated the picks,
// 2026-07-21). Extend as new packs ship; never point at unpublished work.
const SAMPLE_ARTIFACTS: Record<string, Template['sampleArtifacts']> = {
  'generate-clip-art-asset-v2': [
    {
      title: 'Angry Chibi Spicy Miso Ramen Bowl',
      description: 'From The Ramen Chibi Collection — kawaii style, transparent PNG, text-free by policy.',
      imageUrl: 'https://images.clip.art/free/angry-chibi-spicy-miso-ramen-bowl-iq8mr0.webp',
      imageAlt: 'Angry chibi character in a spicy miso ramen bowl, kawaii clip art',
    },
    {
      title: 'Whimsical Spring Woman',
      description: 'Floral-hat portrait from the Whimsical Spring Woman pack — soft-edged cutout.',
      imageUrl: 'https://images.clip.art/free/whimsical-spring-woman-floral-hat-ukem7s.webp',
      imageAlt: 'Whimsical woman wearing a floral hat, spring clip art',
    },
    {
      title: 'Talk to the Hand',
      description: 'From the 90s Clipart Pack — retro gesture, isolated element.',
      imageUrl: 'https://images.clip.art/free/talk-to-the-hand-gesture-mok7yb.webp',
      imageAlt: 'Retro 90s talk-to-the-hand gesture clip art',
    },
  ],
  'plan-clipart-pack': [
    {
      title: 'Watercolor Kitchen Herbs — a planned pack, shipped',
      description: 'This 6-item bundle was planned by this workflow end to end: manifest, per-item text policies, listing, and cover concept.',
      imageUrl: 'https://images.clip.art/packs/all/6-watercolor-kitchen-herb-clipart-pngs-basil-rosemary-thyme-/cover.webp',
      imageAlt: 'Watercolor kitchen herb clip art pack cover with basil, rosemary and thyme',
      imageAspectRatio: '3:4',
    },
  ],
  'generate-pack-cover': [
    {
      title: 'Watercolor Kitchen Herbs cover',
      description: 'Marketplace cover composed from the pack\u2019s own approved assets as references.',
      imageUrl: 'https://images.clip.art/packs/all/6-watercolor-kitchen-herb-clipart-pngs-basil-rosemary-thyme-/cover.webp',
      imageAlt: 'Composed marketplace cover for the watercolor kitchen herbs pack',
      imageAspectRatio: '3:4',
    },
  ],
};

function stageDetails(entry: WorkflowCatalogEntry): WorkflowDetail[] {
  return (entry.stages || [])
    .filter((s) => s.name)
    .map((s, i) => ({
      id: `stage-${i + 1}`,
      title: s.name,
      description: s.description || '',
    }));
}

export function catalogEntryToTemplate(
  entry: WorkflowCatalogEntry,
  contract: WorkflowContract | null,
): Template {
  return {
    id: entry.id,
    slug: entry.id,
    title: entry.name,
    description: entry.description,
    shortDescription: entry.shortDescription || entry.description,
    category: 'template',
    subcategory: CLASS_SUBCATEGORY[entry.artifactClass] || entry.artifactClass,
    tags: [entry.artifactClass, entry.outputType, 'workflow'].filter(Boolean),
    content: '',
    isWorkflow: true,
    estimatedTime: entry.estimatedRuntime || undefined,
    outputFormats: CLASS_OUTPUT_FORMATS[entry.artifactClass],
    inputRequirements: entry.whatYouProvide?.length ? entry.whatYouProvide : undefined,
    expectedOutput: entry.whatYouGet?.length ? entry.whatYouGet.join(' · ') : undefined,
    useCases: entry.whatYouGet?.length ? entry.whatYouGet : undefined,
    // The animated circuit resolves stages by slug from the catalog itself
    // (getCatalogStages inside the component); these are the prose fallbacks.
    workflowDetails: stageDetails(entry),
    sampleArtifacts: SAMPLE_ARTIFACTS[entry.id] ?? [],
    updatedAt: contract?.updatedAt || undefined,
  };
}

// Related = other public workflows of the same artifact class (the same shelf).
export function getCatalogRelated(entry: WorkflowCatalogEntry, limit = 3): Template[] {
  return getWorkflowCatalog()
    .filter((e) => e.id !== entry.id && e.artifactClass === entry.artifactClass)
    .slice(0, limit)
    .map((e) => catalogEntryToTemplate(e, null));
}
