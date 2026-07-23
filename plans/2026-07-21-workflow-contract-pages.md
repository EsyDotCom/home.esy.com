# Workflow contract pages: the clipart suite publishes with a world-class spec surface

> **Status: proposed 2026-07-21.** Companion to api.esy.com
> `docs/plans/2026-07-21-public-workflow-docs.md` (approved) — the API half
> (public contract route `GET /v1/catalog/workflows/{id}` with redaction
> markers, #193) and the rename (#194) are merged. This plan is the esy.com
> half: pages, components, design direction.

## What exists already (build on, don't replace)

- `/workflows` catalog grid + `[slug]` detail (`TemplateDetailClient`),
  rendered from a **committed snapshot** (`src/data/workflow-catalog.json`)
  refreshed by `scripts/sync-workflow-catalog.mjs` at build time. No live
  API dependency at request time — keep this property.
- `WorkflowPipelineStrip` (animated stage strip), the Navy Calm Light theme
  tokens, `/docs` shell with its own theme css.

## New surface

```
/workflows/<template-id>              upgrade: landing (consumer)
/workflows/<template-id>/contract     NEW: the public technical breakdown
/docs/contracts/<rule>                NEW: five cross-cutting rules pages
```

Slug = template id (api plan, ratified). First slice: the clipart suite —
`plan-clipart-pack`, `generate-clip-art-asset-v2`,
`generate-clip-art-asset-ref`, `generate-character-set`,
`generate-pack-cover`, `upscale-to-print-clip-art-asset`, plus the singles
(`edit-image`, `remove-image-background`, `generate-coloring-page`,
`generate-illustration`, `generate-worksheet`).

## Data plumbing

Extend `sync-workflow-catalog.mjs`: after the list fetch, fetch
`GET /v1/catalog/workflows/{id}` per public id → commit
`src/data/workflow-contracts/<id>.json`. Same auditable-snapshot pattern
(`generatedAt` respected). The contract page renders ONLY from its
snapshot; a template change reaches the site by re-sync, never by edit.

## The contract page — design direction

Research anchors: Stripe's docs teardown (three-column reference layout,
prose↔detail synchronization, versioning as a first-class trust surface,
agent-readable structure) and Baymard's spec-sheet findings (92% of spec
UIs fail on scannability/consistency — tables win when rows are scannable,
consistent, and descriptive). Adapted to Esy's identity: **we are
artifact-first, not code-first** — where Stripe's right rail shows code,
ours shows the thing itself: the live contract JSON and example artifacts.

Page anatomy, top to bottom:

1. **Contract header** — template id (monospace, copyable), display name,
   one-line description, status chip (`active` / `deprecated → successor`),
   current version + content hash (truncated, copyable). The trust signal
   IS the header.
2. **Intake table** — the registry's fields: name, type (enum options
   rendered as chips), required, default, full description. Scannable
   rows per Baymard: consistent columns, no prose paragraphs in cells.
   Enum values that have doctrine (e.g. `textPolicy`) deep-link to
   `/docs/contracts/*` rules pages.
3. **Step topology** — extend `WorkflowPipelineStrip` into a vertical
   topology: each step shows kind, role, gate badges (`text gate`,
   `review`), and `repeat` visualized as a stacked-cards motif with the
   chunk math ("≤40 items per call; an 80-item pack plans as 2 chunks").
4. **Redacted properties** — rendered deliberately, not hidden: a
   `sealed` chip style (lock glyph + the key name) with a tooltip:
   "This property exists on every version; its value is not public."
   Transparency-as-brand — the marker says we show the shape and keep
   the interior.
5. **Artifact schema** — what a run produces, linked to a real example
   artifact when `example_artifact_id` is set.
6. **Version timeline** — vertical timeline of immutable versions
   (version, revision, date, content hash). This week's lineage on the
   clipart templates is the launch story told by data.
7. **Full contract JSON** — collapsible, syntax-highlighted, copy button;
   the exact payload the API serves. This is our "runnable code" rail
   equivalent and the agent-readability surface.

Landing page (`[slug]`) upgrade: hero + example artifacts + "what you
provide" (intake summary — same component as the contract table, summary
depth) + "what you get" + version line + prominent `Full contract →`.

## /docs/contracts rules pages (five, curated prose, written once)

`text-policies`, `element-types-and-render-modes`, `quality-tiers`,
`gates-and-checks`, `chunked-planning`. Each: the rule, the doctrine
sentence, a worked example, and which templates use it (derived from
snapshots at build time so the list can't go stale). Incident-derived
doctrine without internal forensics.

## SEO / GEO

- Ids are the URLs (ratified) — descriptive names are the strategy.
- JSON-LD (`TechArticle` / `HowTo` as fits), stable heading anchors,
  `sitemap.ts` entries, per-page metadata from snapshot fields.
- 2026 reality: a large share of docs traffic is AI agents — the
  contract JSON block and consistent anchor structure serve them
  first-class (same content humans see; no cloaking).

## Components (new/extended)

`ContractHeader`, `IntakeTable` (two depths), `StepTopology` (extends
pipeline strip), `SealedValue`, `VersionTimeline`, `ContractJson`,
`RuleCrossLink`. All theme-token driven; light theme first, matching the
existing workflows surface.

## Sequencing

1. Sync-script extension + snapshots committed (mechanical, unblocks all).
2. Contract page + components for ONE template
   (`upscale-to-print-clip-art-asset` — clean lineage, the rename story).
3. The five rules pages.
4. Roll to the full clipart suite + landing upgrades; sitemap + JSON-LD.
5. Design pass with Zev on the built pages (real data beats mockups).

## Open decisions (Zev)

1. Do deprecated ids get real pages that 301, or a "superseded" interstitial
   linking the successor? (Recommend: 301, with the successor's timeline
   noting the lineage.)
2. Example artifacts: which finished pieces are brand-worthy enough to
   feature per template (needs your curation pass).

Sources consulted: [Stripe DX teardown (Moesif)](https://www.moesif.com/blog/best-practices/api-product-management/the-stripe-developer-experience-and-docs-teardown/),
[Baymard spec-sheet examples](https://baymard.com/ecommerce-design-examples/45-product-spec-sheet),
[API documentation examples 2026 (Apidog)](https://apidog.com/blog/api-documentation-example/),
[HeroThemes API docs examples](https://herothemes.com/blog/api-documentation-examples/).
