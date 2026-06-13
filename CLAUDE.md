# esy.com — Repo Context

Marketing and content site for the Esy brand. For Esy ecosystem context, see `../../CLAUDE.md`. For company-level context, see `../../../CLAUDE.md`.

## What This Repo Is

The public-facing marketing site at esy.com. Visual essays, brand storytelling, SEO content, documentation landing pages. This is NOT the app — the app lives at `app.esy.com/`.

## What This Repo Is NOT

- Not the dashboard (that's `client/app.esy.com/`)
- Not the API (that's `server/api.esy.com/`)
- Not a generation tool — it markets and explains what Esy does

## Deployment Workflow

Before pushing or deploying, read `../app.esy.com/docs/DEPLOYMENT_WORKFLOW.md`. This repo follows the shared Esy workflow: run `npm run lint` and `npm run build`, use PRs for public-route/SEO/publishing/API-contract/auth/deployment-risk changes, and keep `main` deployable.

### Direct push vs PR (this repo's quick rule)

Per the shared workflow's "When Direct Push To Main Is Allowed" section, this is a marketing/copy-heavy repo so the carve-out gets used often. The heuristic:

- **Direct push to `main`:** 1–2 line copy edits, typos, sentence rewrites, metadata/comment changes, tiny style tweaks with no behavior change. Run a build first if the change isn't trivially safe.
- **PR required:** anything that touches structure, routes, components, navigation behavior, data shape, image domains, or the artifact/workflow taxonomy. Also anything covered by the shared workflow's "Direct push is not acceptable for" list.

When in doubt, open the PR — agent overhead is cheap, broken `main` isn't.

## Key Documentation (In This Repo)

- `../../../org-docs/brand/ESY_DEFINITION.md` (org.esy) — Canonical brand definition and product philosophy (moved out of this repo; `docs/brand/ESY_DEFINITION.md` is now a pointer stub)
- `docs/strategy/sessions/2026-04-12-engineer-first-rebrand-and-homepage-redesign.md` — Current positioning: engineer-first
- `docs/strategy/GROWTH_STRATEGY.md` — Growth and distribution strategy
