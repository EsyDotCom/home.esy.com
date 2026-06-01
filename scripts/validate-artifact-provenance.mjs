#!/usr/bin/env node
/**
 * validate-artifact-provenance.mjs
 *
 * Drift guard. Fails the build if any published artifact cites a model (or
 * prompt template) that is NOT declared in the workflow manifest version it
 * references. This is what keeps "every version pins its models" structurally
 * true — the spec card can only show provenance the manifest actually allows.
 *
 * See orchestration/standards/workflow-manifest-standard.md.
 *
 * Run: node scripts/validate-artifact-provenance.mjs
 */
import { readFileSync, existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL, fileURLToPath } from 'node:url';
import ts from 'typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MANIFEST_DIR = join(ROOT, 'src', 'data', 'workflow-manifests');

/** Collect every model identity (snapshot ?? id) declared anywhere in a manifest. */
function declaredModels(manifest) {
  const ids = new Set();
  for (const stage of manifest.pipeline) {
    if (stage.model) ids.add(stage.model.snapshot ?? stage.model.id);
    if (stage.routing) {
      for (const rule of stage.routing) {
        ids.add(rule.model.snapshot ?? rule.model.id);
      }
    }
  }
  return ids;
}

/** Collect every prompt template id declared in a manifest. */
function declaredPromptTemplates(manifest) {
  const ids = new Set();
  for (const stage of manifest.pipeline) {
    if (stage.prompt_template) ids.add(stage.prompt_template);
  }
  return ids;
}

/** Import a self-contained (import-free) .ts data module by transpiling it. */
async function importTsData(relPath) {
  const source = readFileSync(join(ROOT, relPath), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: 'ESNext', target: 'ES2020' },
  });
  const dir = mkdtempSync(join(tmpdir(), 'esy-provenance-'));
  const out = join(dir, 'module.mjs');
  writeFileSync(out, outputText);
  return import(pathToFileURL(out).href);
}

const errors = [];

const manifests = await loadManifestsAsync();
const { clipArtArtifacts } = await importTsData('src/data/clip-art-artifacts.ts');

for (const artifact of clipArtArtifacts) {
  const key = `${artifact.workflowSlug}@${artifact.workflowVersion}`;
  const manifest = manifests.get(key);
  if (!manifest) {
    errors.push(`${artifact.slug}: references unknown manifest ${key}`);
    continue;
  }
  const models = declaredModels(manifest);
  const templates = declaredPromptTemplates(manifest);
  const { renderModel, backgroundRemovalModel, promptTemplate } =
    artifact.resolved;

  if (!models.has(renderModel)) {
    errors.push(
      `${artifact.slug}: renderModel "${renderModel}" not declared in ${key} (declared: ${[...models].join(', ')})`,
    );
  }
  if (!models.has(backgroundRemovalModel)) {
    errors.push(
      `${artifact.slug}: backgroundRemovalModel "${backgroundRemovalModel}" not declared in ${key} (declared: ${[...models].join(', ')})`,
    );
  }
  if (!templates.has(promptTemplate)) {
    errors.push(
      `${artifact.slug}: promptTemplate "${promptTemplate}" not declared in ${key} (declared: ${[...templates].join(', ')})`,
    );
  }
}

if (errors.length > 0) {
  console.error('✗ Artifact provenance drift detected:\n');
  for (const e of errors) console.error(`  - ${e}`);
  console.error(
    `\n${errors.length} provenance error(s). Either fix the artifact's resolved models or publish a manifest version that declares them.`,
  );
  process.exit(1);
}

console.log(
  `✓ Provenance valid: ${clipArtArtifacts.length} clip-art artifact(s) match their manifest versions.`,
);

// --- helpers that need top-level await ---
async function loadManifestsAsync() {
  const { readdirSync } = await import('node:fs');
  const registry = new Map();
  if (!existsSync(MANIFEST_DIR)) return registry;
  for (const file of readdirSync(MANIFEST_DIR)) {
    if (!file.endsWith('.json') || file.endsWith('.lock.json')) continue;
    const manifest = JSON.parse(readFileSync(join(MANIFEST_DIR, file), 'utf8'));
    registry.set(`${manifest.workflow}@${manifest.version}`, manifest);
  }
  return registry;
}
