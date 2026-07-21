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
    sampleArtifacts: [],
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
