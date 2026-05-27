# Foundations

Foundational principles that define how Esy thinks about workflows, artifacts, and the vocabulary used across the platform. Each document here captures a settled architectural distinction — not a proposal, not a fix, but a primitive that downstream work depends on.

## Documents

- **[WORKFLOW_PRIMITIVES.md](./WORKFLOW_PRIMITIVES.md)** — Defines the three-level workflow primitive model: `Workflow Schema` (the rules), `Workflow Template` (a predesigned workflow), `Workflow Specification` (a per-run populated instance). Applies to every workflow shipped on `api.esy.com` and `app.esy.com`, from deterministic ETL through fully agentic synthesis. Public canonical reference: [`docs.esy.com/concepts/workflow-schemas`](https://docs.esy.com/concepts/workflow-schemas).

## Conventions

- Each document is stable and load-bearing. Edits should reflect a deliberate evolution of the principle, not casual revision.
- Each document declares its `Status`, `Established` date, `Applies to` scope, and `Canonical reference` link at the top.
- When a foundational principle changes, mark the previous version archived rather than overwriting it silently.
- Foundations are referenced by `/docs/*` rendered pages and by repo-level architectural docs across `esy.com`, `app.esy.com`, and `api.esy.com`.
- Public-facing canonical pages for each foundation live on `docs.esy.com`. The markdown here is the engineering source of truth that the public pages draw from.
