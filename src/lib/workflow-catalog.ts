// Public workflow catalog loader.
//
// Reads the committed snapshot (src/data/workflow-catalog.json). esy.com is a
// static export (no runtime/ISR fetch), so the catalog is fetched from
// api.esy.com's GET /v1/catalog/workflows at BUILD time: the `prebuild` npm hook
// runs scripts/sync-workflow-catalog.mjs, which refreshes this snapshot before
// next build. The fetch is non-fatal — on an API outage the build falls back to
// the committed snapshot, so the public catalog can never blank. Regenerate
// manually with: node scripts/sync-workflow-catalog.mjs

import catalog from '@/data/workflow-catalog.json';
import type { WorkflowStage } from '@/lib/templates';

export type ArtifactClass = 'research' | 'visual' | 'video' | 'knowledge';

/** Display-only pipeline summary from the catalog (no runtime/provider internals). */
export interface CatalogStage {
  name: string;
  description: string;
  stepCount: number;
}

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
  stages: CatalogStage[];
  whatYouProvide: string[];
  whatYouGet: string[];
  qaChecks: string[];
  version: string;
  cadence: string;
  updatedAt: string | null;
}

// Short, human phrase for the Intake bookend, built from the workflow's real
// required inputs (optional ones are dropped so the cap stays terse).
function intakeSublabel(entry: WorkflowCatalogEntry): string {
  const required = (entry.whatYouProvide ?? []).filter((p) => !/optional/i.test(p));
  if (required.length === 0) return 'Provide your inputs';
  const list = required.join(', ');
  return `Provide ${list.charAt(0).toLowerCase()}${list.slice(1)}`;
}

// Short phrase for the Artifact bookend — the workflow's headline deliverable.
function artifactSublabel(entry: WorkflowCatalogEntry): string {
  return entry.whatYouGet?.[0] ?? `Finished ${entry.outputType}`;
}

/**
 * Adapt a catalog entry to the card/circuit pipeline-strip shape.
 *
 * The catalog stores only the *process* (model) stages. Every Esy workflow is
 * intake → process → artifact, so we frame those process stages with the two
 * universal bookends — Intake (the operator's inputs) and Artifact (the output,
 * marked final/accented). Bookend copy is sourced from the entry's real intake
 * (whatYouProvide) and output (whatYouGet) fields, not invented strings.
 */
export function toPipelineStages(entry: WorkflowCatalogEntry): WorkflowStage[] {
  const process = (entry.stages ?? []).map((s, i) => ({
    id: `${entry.id}-stage-${i}`,
    label: s.name,
    sublabel: s.description,
    isFinal: false,
  }));

  return [
    { id: `${entry.id}-intake`, label: 'Intake', sublabel: intakeSublabel(entry), isFinal: false },
    ...process,
    { id: `${entry.id}-artifact`, label: 'Artifact', sublabel: artifactSublabel(entry), isFinal: true },
  ];
}

/**
 * Pipeline stages for a workflow by id/slug, sourced from the live catalog.
 * Returns [] when the id isn't a published platform template, so callers can
 * fall back to any local stages they have. Marketing slugs now equal catalog
 * ids (verb-first generate-*), so this join is a direct id lookup.
 */
export function getCatalogStages(id: string): WorkflowStage[] {
  const entry = getCatalogEntry(id);
  return entry ? toPipelineStages(entry) : [];
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
