#!/usr/bin/env node
/**
 * hash-workflow-manifests.mjs
 *
 * Computes the SHA-256 of each workflow manifest over a canonical
 * (key-sorted, whitespace-free) serialization and writes a committed
 * lockfile next to it: `{base}.lock.json` -> { version, sha256 }.
 *
 * The lockfile is the immutable half of the pin (see
 * orchestration/standards/workflow-manifest-standard.md). The TS loader reads
 * the committed hash; nothing recomputes it at runtime (keeps node:crypto out
 * of the client bundle).
 *
 * Usage:
 *   node scripts/hash-workflow-manifests.mjs           # write/refresh locks
 *   node scripts/hash-workflow-manifests.mjs --check   # fail if any lock stale
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MANIFEST_DIR = join(__dirname, '..', 'src', 'data', 'workflow-manifests');

/** Recursively sort object keys so serialization is deterministic. */
function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = canonicalize(value[key]);
        return acc;
      }, {});
  }
  return value;
}

export function manifestSha256(manifest) {
  const canonical = JSON.stringify(canonicalize(manifest));
  return createHash('sha256').update(canonical).digest('hex');
}

function manifestFiles() {
  if (!existsSync(MANIFEST_DIR)) return [];
  return readdirSync(MANIFEST_DIR)
    .filter((f) => f.endsWith('.json') && !f.endsWith('.lock.json'))
    .map((f) => join(MANIFEST_DIR, f));
}

function lockPathFor(manifestPath) {
  return manifestPath.replace(/\.json$/, '.lock.json');
}

const checkOnly = process.argv.includes('--check');
let stale = 0;

for (const manifestPath of manifestFiles()) {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const sha256 = manifestSha256(manifest);
  const lock = { version: manifest.version, sha256 };
  const lockPath = lockPathFor(manifestPath);

  const existing = existsSync(lockPath)
    ? JSON.parse(readFileSync(lockPath, 'utf8'))
    : null;
  const isStale = !existing || existing.sha256 !== sha256;

  if (checkOnly) {
    if (isStale) {
      stale += 1;
      console.error(
        `✗ stale lock: ${lockPath.split('/').pop()} (run npm run manifests:hash)`,
      );
    }
  } else if (isStale) {
    writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');
    console.log(`✓ wrote ${lockPath.split('/').pop()} -> ${sha256.slice(0, 12)}…`);
  } else {
    console.log(`= up to date ${lockPath.split('/').pop()}`);
  }
}

if (checkOnly && stale > 0) {
  console.error(`\n${stale} manifest lock(s) out of date.`);
  process.exit(1);
}
