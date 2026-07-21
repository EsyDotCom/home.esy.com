// Committed per-template contract snapshots (plans/2026-07-21-workflow-contract-pages.md).
// Synced by scripts/sync-workflow-catalog.mjs from api.esy.com
// GET /v1/catalog/workflows/{id} — the registry IS the contract; these pages
// render it and never restate it. Server-only (fs at build time).

import fs from 'fs';
import path from 'path';

const CONTRACTS_DIR = path.join(process.cwd(), 'src/data/workflow-contracts');

export interface ContractStep {
  id: string;
  name?: string;
  kind?: string;
  capability?: string;
  role?: string;
  inputPath?: string;
  repeat?: {
    countPath?: string;
    maxPerChunk?: number;
    mergeKey?: string;
    sliceListPath?: string;
  };
  emitsArtifact?: { artifactType?: string; title?: string };
  requireTrue?: string;
  failMessage?: string;
  jsonSchema?: Record<string, unknown>;
  // Redaction markers — the literal string "redacted" (key public, value not).
  system?: string;
  promptTemplate?: string;
  maxTokens?: number | string;
}

export interface WorkflowContract {
  generatedAt?: string;
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  artifactClass: string;
  outputType: string;
  status: string;
  supersededById?: string | null;
  version: string;
  stages: { name: string; description?: string; stepCount?: number }[];
  intakeSchema: { fields?: IntakeField[] };
  runtimeSteps: ContractStep[];
  gates: { id?: string; name?: string; type?: string }[];
  artifactSchema: Record<string, unknown>;
  providers: Record<string, string>;
  budgetPolicy?: string | null;
  versions: { version: string; revision: number; contentHash: string; createdAt?: string }[];
  updatedAt?: string;
}

export interface IntakeField {
  name: string;
  type: string;
  required?: boolean;
  default?: unknown;
  description?: string;
  options?: string[];
  artifactType?: string;
}

export function getContractIds(): string[] {
  if (!fs.existsSync(CONTRACTS_DIR)) return [];
  return fs
    .readdirSync(CONTRACTS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
    .sort();
}

export function getContract(id: string): WorkflowContract | null {
  // ids are our own registry slugs, but never trust a URL segment as a path.
  if (!/^[a-z0-9-]+$/.test(id)) return null;
  const file = path.join(CONTRACTS_DIR, `${id}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8')) as WorkflowContract;
}

// Enum values with doctrine get deep links into the rules pages
// (/docs/contracts/*). Keys are intake field names or enum members.
export const RULE_LINKS: Record<string, string> = {
  textPolicy: '/docs/contracts/text-policies',
  none: '/docs/contracts/text-policies',
  exact: '/docs/contracts/text-policies',
  freeform: '/docs/contracts/text-policies',
  elementType: '/docs/contracts/element-types-and-render-modes',
  pattern: '/docs/contracts/element-types-and-render-modes',
  quality: '/docs/contracts/quality-tiers',
};
