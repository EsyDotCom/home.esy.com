/**
 * Workflow manifest loader + resolver.
 *
 * The manifest is the single source of truth for what a workflow version does:
 * its pinned models, prompt template, and output contract. See
 * `orchestration/standards/workflow-manifest-standard.md`.
 *
 * This module is import-safe in client components: it reads committed JSON
 * (the manifest + its lockfile) and never touches `node:crypto`. The SHA-256
 * pin is computed at author/CI time by `scripts/hash-workflow-manifests.mjs`
 * and read here from the lockfile.
 */
import clipArtV1 from '@/data/workflow-manifests/generate-clip-art-asset.v1.0.0.json';
import clipArtV1Lock from '@/data/workflow-manifests/generate-clip-art-asset.v1.0.0.lock.json';

export interface ManifestModel {
  provider: string;
  id: string;
  /** Dated/qualified provider snapshot. `null` when pinned by the execution plane. */
  snapshot: string | null;
}

export interface PipelineStage {
  stage: string;
  kind: 'prompt-template' | 'model' | 'model-routed' | 'storage';
  prompt_template?: string;
  model?: ManifestModel;
  routing?: { when: Record<string, string[]>; model: ManifestModel }[];
  destination?: string;
}

export interface WorkflowManifest {
  workflow: string;
  version: string;
  title: string;
  released_at: string;
  status_note?: string;
  input_contract: Record<string, unknown>;
  pipeline: PipelineStage[];
  output_contract: {
    artifact_type: string;
    formats: string[];
    storage_key: string;
  };
}

export interface ManifestLock {
  version: string;
  sha256: string;
}

export interface PinnedManifest {
  manifest: WorkflowManifest;
  lock: ManifestLock;
}

/** Registry keyed by `${slug}@${version}`. Add a line per published manifest. */
const REGISTRY: Record<string, PinnedManifest> = {
  'generate-clip-art-asset@v1.0.0': {
    manifest: clipArtV1 as WorkflowManifest,
    lock: clipArtV1Lock as ManifestLock,
  },
};

export function getManifest(
  slug: string,
  version: string,
): PinnedManifest | undefined {
  return REGISTRY[`${slug}@${version}`];
}

/** Canonical resolved identity of a model: its dated snapshot, else its id. */
export function modelIdentity(model: ManifestModel): string {
  return model.snapshot ?? model.id;
}

/** The single (non-routed) model declared for a stage, if any. */
export function getStageModel(
  manifest: WorkflowManifest,
  stage: string,
): ManifestModel | undefined {
  return manifest.pipeline.find((s) => s.stage === stage)?.model;
}

/**
 * Resolve a routed stage's model for a given input dimension value.
 * Returns the first routing rule whose `when[dimension]` includes `value`.
 */
export function resolveRoutedModel(
  manifest: WorkflowManifest,
  stage: string,
  dimension: string,
  value: string,
): ManifestModel | undefined {
  const routing = manifest.pipeline.find((s) => s.stage === stage)?.routing;
  if (!routing) return undefined;
  const rule = routing.find((r) => r.when[dimension]?.includes(value));
  return rule?.model;
}

export function getPromptTemplateId(
  manifest: WorkflowManifest,
): string | undefined {
  return manifest.pipeline.find((s) => s.kind === 'prompt-template')
    ?.prompt_template;
}

/** Short pin label for UI, e.g. "v1.0.0 · f030c383". */
export function pinLabel(pinned: PinnedManifest): string {
  return `${pinned.manifest.version} · ${pinned.lock.sha256.slice(0, 8)}`;
}
