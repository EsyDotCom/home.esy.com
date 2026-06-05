# Catalog-Native Workflow Detail Pages

**Date:** June 4, 2026
**Type:** Plan — Schema/API + Marketing, Factory → Public Page Handoff
**Status:** Planned — not yet started.
**Context:** `esy.com/workflows` and the detail-page `WorkflowCircuit` + related cards now render from the live catalog (`GET /v1/catalog/workflows`), and the pipeline is framed with universal Intake/Artifact bookends. But the detail page is still ~70% hand-authored in `src/lib/templates/data.ts`. This plan closes that gap so **creating a workflow in the Factory produces a complete detail page** with no per-template hand-coding.

---

## The Gap

The canonical detail-page arc (see `2026-05-25-workflow-detail-page-layout-and-design.md`) has six sections. Today they split like this:

| # | Section | Source today | Catalog-native? |
|---|---------|--------------|-----------------|
| 1 | Hero (name, description, CTAs) | catalog | ✅ |
| 2 | What You Provide / What You Get | catalog (`whatYouProvide` / `whatYouGet`) | ✅ |
| 3 | How this workflow runs (`WorkflowCircuit`) | catalog `stages` + bookends | ✅ |
| 4 | **Inside the workflow** (per-step prose + before/after examples) | `data.ts` `workflowDetails` | ❌ hand-authored |
| 5 | **Example outputs** (sample artifacts) | `data.ts` `sampleArtifacts` | ❌ hand-authored |
| 6 | Related Workflow Templates | catalog (by artifact class) | ✅ |

A Factory-created workflow gets sections 1–3 and 6 for free, but renders **no** "Inside the workflow" and **no** "Example outputs" — the two sections that carry most of the page's depth.

## Goal

Every published Workflow Template renders all six sections from catalog data alone. `data.ts` becomes an optional *enrichment/override* layer, not a requirement. Acceptance test: **publish a workflow in the Factory → `/workflows/{id}` renders a complete page with zero `esy.com` code changes.**

## Plan

**Phase 1 — Schema + API (`api.esy.com`).** Extend the Workflow Template so each runtime/process stage can carry presentation detail, and the template can carry example outputs:
- Per-stage `detail`: `title`, `description`, optional `examples[]` (`label` + `value`, supports the before/after pair the timeline already renders).
- Template-level `sampleArtifacts[]`: `title`, `description`, optional artifact ref / image.
- Expose all of it presentation-safe on the catalog entry (same rule as `stages`: no prompts, providers, or raw step graph). Keep it derived where possible (the bookends stay derived from `whatYouProvide` / `whatYouGet`).

**Phase 2 — Marketing reads catalog (`esy.com`).** `ArtifactDetailTemplate` sources sections 4 and 5 from the catalog entry, falling back to `data.ts` when present. Migrate the existing 8 hand-authored pages into the catalog so `data.ts` carries only true overrides (SEO copy, curated samples), then shrink it.

**Phase 3 — Factory captures depth at authoring time (`app.esy.com`).** The workflow publisher prompts for per-stage descriptions/examples and lets the author attach sample artifacts (or auto-selects recent approved run outputs). Publish writes them to the template → catalog → live page automatically.

## Open Decision (bookends)

Bookends (Intake/Artifact) currently live in `esy.com`'s `toPipelineStages` presentation adapter, derived from real catalog fields. If `app.esy.com`'s runner should show the identical pipeline, promote the bookends into the catalog response so the shape is canonical for every consumer. Decide this when Phase 1 lands.
