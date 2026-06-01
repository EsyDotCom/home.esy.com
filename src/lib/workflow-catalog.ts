// Public workflow catalog loader.
//
// Reads the committed snapshot (src/data/workflow-catalog.json) synced from
// api.esy.com's GET /v1/catalog/workflows by scripts/sync-workflow-catalog.mjs. esy.com is
// a static export, so the /catalog page renders from this snapshot at build time
// rather than fetching at runtime. Regenerate the snapshot with:
//   node scripts/sync-workflow-catalog.mjs

import catalog from '@/data/workflow-catalog.json';

export type ArtifactClass = 'research' | 'visual' | 'video' | 'knowledge';

export interface WorkflowCatalogEntry {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  artifactClass: ArtifactClass | string;
  outputType: string;
  depth: string;
  estimatedRuntime: string;
  includesQa: boolean;
  whatYouProvide: string[];
  whatYouGet: string[];
  qaChecks: string[];
  version: string;
  cadence: string;
  updatedAt: string | null;
}

interface CatalogSnapshot {
  generatedAt: string;
  total: number;
  items: WorkflowCatalogEntry[];
}

const snapshot = catalog as unknown as CatalogSnapshot;

export function getWorkflowCatalog(): WorkflowCatalogEntry[] {
  return snapshot.items;
}

export function getCatalogEntry(id: string): WorkflowCatalogEntry | undefined {
  return snapshot.items.find((e) => e.id === id);
}

/** When the committed snapshot was last synced from the platform. */
export function getCatalogGeneratedAt(): string {
  return snapshot.generatedAt;
}

/** Human label for an artifact class (drives the catalog's grouping pills). */
export const ARTIFACT_CLASS_LABELS: Record<string, string> = {
  research: 'Research',
  visual: 'Visual',
  video: 'Video',
  knowledge: 'Knowledge',
};
