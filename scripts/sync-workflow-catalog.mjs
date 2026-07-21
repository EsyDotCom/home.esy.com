#!/usr/bin/env node

/**
 * Sync the public workflow catalog from api.esy.com into a committed snapshot.
 *
 * The workflows page reads a committed JSON snapshot at build time. This script
 * pulls the platform's
 * published templates from `GET /v1/catalog/workflows` (no auth) and writes that snapshot
 * to src/data/workflow-catalog.json. Run it (and commit the result) whenever
 * the platform's published templates change.
 *
 * Usage:
 *   node scripts/sync-workflow-catalog.mjs                 # sync from default API
 *   ESY_API_URL=http://localhost:8000 node scripts/sync-workflow-catalog.mjs
 *   node scripts/sync-workflow-catalog.mjs --check         # CI: fail if the snapshot is malformed/empty
 *
 * Safety: a failed fetch or an empty/invalid response is treated as an error and
 * the committed snapshot is left untouched, so a transient API outage can never
 * blank the public catalog.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUTPUT_PATH = path.join(ROOT, 'src/data/workflow-catalog.json');
const API_BASE = process.env.ESY_API_URL || process.env.NEXT_PUBLIC_ESY_API_URL || 'https://api.esy.com';

const REQUIRED_FIELDS = [
  'id', 'name', 'description', 'shortDescription', 'artifactClass', 'outputType',
  'depth', 'estimatedRuntime', 'includesQa', 'stages', 'whatYouProvide', 'whatYouGet',
  'qaChecks', 'version', 'cadence',
];

function validateEntry(entry, i) {
  for (const f of REQUIRED_FIELDS) {
    if (!(f in entry)) throw new Error(`catalog item [${i}] (${entry.id ?? '?'}) is missing required field "${f}"`);
  }
}

// --check: validate the committed snapshot without touching the network. Used in
// CI so a malformed/empty catalog can't ship.
function check() {
  if (!fs.existsSync(OUTPUT_PATH)) throw new Error(`missing snapshot: ${OUTPUT_PATH}`);
  const data = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'));
  if (!Array.isArray(data.items) || data.items.length === 0) {
    throw new Error('catalog snapshot has no items');
  }
  data.items.forEach(validateEntry);
  if (data.total !== data.items.length) {
    throw new Error(`catalog "total" (${data.total}) != items length (${data.items.length})`);
  }
  console.log(`OK — ${data.items.length} catalog entries valid (generated ${data.generatedAt}).`);
}

async function sync() {
  const url = `${API_BASE.replace(/\/$/, '')}/v1/catalog/workflows`;
  console.log(`Fetching catalog from ${url} …`);

  let payload;
  try {
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    payload = await res.json();
  } catch (err) {
    console.error(`Fetch failed: ${err.message}`);
    console.error('Leaving the existing snapshot untouched.');
    process.exit(1);
  }

  if (!payload || !Array.isArray(payload.items) || payload.items.length === 0) {
    console.error('Catalog response had no items — refusing to overwrite the snapshot.');
    process.exit(1);
  }
  payload.items.forEach(validateEntry);

  // Re-shape to the committed snapshot format (stable key order + provenance comment).
  const snapshot = {
    _comment: 'SYNCED SNAPSHOT — do not hand-edit. Regenerate with: node scripts/sync-workflow-catalog.mjs (pulls api.esy.com GET /v1/catalog/workflows). Mirrors the platform\'s published, versioned workflow templates.',
    generatedAt: payload.generatedAt || new Date().toISOString(),
    total: payload.items.length,
    items: payload.items,
  };
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(snapshot, null, 2) + '\n');
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)} (${snapshot.total} entries).`);

  // Per-template contract snapshots (plans/2026-07-21-workflow-contract-pages.md):
  // GET /v1/catalog/workflows/{id} serves the public contract — whitelisted step
  // topology, artifact schema, version lineage, redaction markers. Each becomes
  // src/data/workflow-contracts/<id>.json; /workflows/<id>/contract renders ONLY
  // from these committed files. Same safety rule: a failed per-id fetch keeps
  // the existing file and fails the run loudly.
  const contractsDir = path.join(ROOT, 'src/data/workflow-contracts');
  fs.mkdirSync(contractsDir, { recursive: true });
  let wrote = 0;
  for (const item of payload.items) {
    const contractUrl = `${API_BASE.replace(/\/$/, '')}/v1/catalog/workflows/${item.id}`;
    let contract;
    try {
      const res = await fetch(contractUrl, { headers: { accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      contract = await res.json();
    } catch (err) {
      console.error(`Contract fetch failed for ${item.id}: ${err.message}`);
      console.error('Leaving existing contract snapshots untouched.');
      process.exit(1);
    }
    if (!contract || contract.id !== item.id || !contract.intakeSchema) {
      console.error(`Contract payload for ${item.id} is malformed — refusing to overwrite.`);
      process.exit(1);
    }
    const out = {
      _comment: 'SYNCED SNAPSHOT — do not hand-edit. Regenerate with: node scripts/sync-workflow-catalog.mjs (pulls api.esy.com GET /v1/catalog/workflows/{id}).',
      generatedAt: snapshot.generatedAt,
      ...contract,
    };
    fs.writeFileSync(path.join(contractsDir, `${item.id}.json`), JSON.stringify(out, null, 2) + '\n');
    wrote += 1;
  }
  console.log(`Wrote ${wrote} contract snapshots to src/data/workflow-contracts/.`);
}

const arg = process.argv[2];
if (arg === '--check') {
  try {
    check();
  } catch (err) {
    console.error(`Catalog check failed: ${err.message}`);
    process.exit(1);
  }
} else {
  sync().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
