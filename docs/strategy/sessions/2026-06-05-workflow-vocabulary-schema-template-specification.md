# Workflow Vocabulary: Schema → Template → Specification

**Date:** June 5, 2026
**Type:** Decision — Vocabulary / product nomenclature (app.esy.com + docs.esy.com)
**Status:** Settled. Implemented in app.esy.com (`/specs` retired, "Inspect template" added); docs.esy.com already covers the triad.
**Context:** While merging the legacy `/specs` window into `/workflows` in app.esy.com, a naming question surfaced: what do you call the read-only view that shows a workflow's intake → steps → gates → providers → output? The candidates on the table were "Schema," "Spec," and "Definition." Picking the wrong word would have been a vocabulary commitment that fights the settled `Schema → Template → Specification` triad. This doc captures the confusion and the resolution, because the confusion is a common one and worth having on the record.

---

## The confusion (worth stating plainly)

The intuition that tripped us up:

> "The template-level contract should be the Workflow **Schema**? Shouldn't we have 'Inspect Schema'? Since a Specification is the filled-in Schema?"

That reasoning collapses a three-level model into two. It assumes `Schema → (filled in) → Specification`, with the Template either being the Schema or not existing. The fix is to see that **the Template sits in the middle**, and a Specification is a filled-in *Template*, not a filled-in *Schema*.

## The triad, stated precisely

ESY's settled chain (from `esy/CLAUDE.md`) is **three** levels, joined by *conformance* and *population*:

```
Workflow Schema   ──conforms-to──   Workflow Template   ──populated-into──   Workflow Specification
(the grammar)                       (a declared workflow)                    (one resolved run)
```

- **Schema** — the *platform-wide grammar* every template must satisfy: required fields, allowed artifact classes, gate-unlock rules, validation. There is essentially **one**, versioned (`workflow-schema-v1`). It is not per-workflow.
- **Template** — *one declared workflow* ("Generate Clip Art Asset"): its `intakeSchema`, `runtimeSteps`, `gates`, `providers`, `artifactSchema`, `budgetPolicy`. This is what a `/workflows` card **is**.
- **Specification** — *one run's* fully-resolved blueprint (intake values filled, prompts resolved, providers bound). One per run — that's the `specVersionHash` on a run.

Key correction to the premise: **a Specification is a filled-in *Template*, not a filled-in *Schema*.** The thing you inspect from a card is the **Template** — and a Template *contains* schemas (it declares `intakeSchema` in and `artifactSchema` out) but it is not "the Schema" itself.

That means **neither** `/spec` **nor** `/schema` is strictly correct for the card:

- `/schema` → collides with the one platform grammar (`workflow-schema-v1`), and undersells the page (you're showing steps, gates, providers, cost — not just field shapes).
- `/spec` → collides with the per-run resolved instance.

The honest name for what the card shows is the **Template / its definition**.

## Is this how the real world works?

Partly — and this is the source of the unease.

- **Schema** (JSON Schema, GraphQL schema, DB schema) = a *structure/shape* definition that validates many instances. ESY's "Schema" matches this well.
- **Template** (Terraform module, a GitHub Actions workflow file, a CloudFormation template) = a parameterized definition you instantiate. ESY's "Template" matches this well. The cleanest real-world mirror is **GitHub Actions**: a *workflow-syntax schema* → you author a *workflow* → each trigger produces a *workflow run*.
- **Specification** — here's the friction. In the wild, "specification/spec" usually means **the reusable contract** (OpenAPI **Specification**, a spec sheet, an RFC), which sits at the *Template/Schema* level — **not** a single instance. So an outsider hearing "Workflow **Specification**" will most likely expect *the definition*, and be surprised it means *one run*. ESY's "Specification = one run" is the one term in the triad that fights real-world intuition. GitHub Actions sidesteps this entirely by calling the instance a **"run,"** not a "specification."

A complementary framing (via Gemini) that the team found clarifying:

> If the **Schema** is the legal code (what is allowed) and the **Template** is the blueprint (how to build it), the **Specification** is the exact order form for a single house.

## The composite has a real name: it *is* the Template

A later question was: *"Is the 'Inspect Template' view just a combination of the procedure + schema expectations for a specific workflow? Is there no real name for it?"*

It **does** have a real name — it *is* the **Workflow Template**. The page isn't "procedure + schemas glued together with no name"; that bundle is precisely what the word "Template" denotes. A Template's anatomy is exactly:

```
intakeSchema        ← input contract  (the "schema expectations", in)
runtimeSteps        ┐
gates               │← the procedure + policy (what it does, in what order,
providers           │   behind which checkpoints, under what cap)
budgetPolicy        ┘
artifactSchema      ← output contract (the "schema expectations", out)
+ id, name, artifactClass, version, cadence
```

So: **Workflow Template = in-schema + procedure/policy + out-schema.** The "Inspect template" view is just a read-only rendering of that one object. The only thing without its own noun is the *page/view* itself — and it doesn't need one; it's a presentation of the Template, the way a profile page is a view of a User. The underlying thing has the name; the rendering borrows it.

If you want a shorthand for "the whole declared bundle," the natural words are **template definition** or **contract** — but they're synonyms for Template, not a fourth concept.

## Decisions

1. **Card action + route:** `Inspect template` → `/workflows/[templateId]/definition`. Accurate against the triad, collides with nothing, and shows the full intake → steps → gates → output → cost contract. (Avoid `/schema` and `/spec`.)

2. **View label:** the page eyebrow is **"Template definition"** (short form **"Definition"**). This is a *display label* for the thing the page renders — not a new concept, not a type, not a fourth tier. It does **not** rename anything: the persisted type stays `WorkflowTemplate`.

   - **"Contract" was rejected** for the view label specifically because the canonical docs reserve it for the Schema: *"The Schema is the contract. Templates are concrete instances of that contract."* Reusing "contract" for the Template view would recreate the exact Schema↔Template confusion this discussion resolved.
   - "Blueprint" works as an *explanatory analogy* but is too metaphorical for an engineer-first product label.

   Settled mapping:

   ```
   Schema         = the contract / the rules        (reserve "contract" here)
   Template       = this declared workflow          (the concept + the persisted type)
     └ "Template definition" = the label for inspecting that Template's full declaration
   Specification  = one run's filled-in instance
   ```

3. **Templates are not org/project-scoped.** The Template Definition view shows no org/project anchor — templates are generally available. The `visibility` rung (`Draft` / `Internal` / `Public`) stays, but without spelling out which surfaces list each rung.

4. **factory.esy.com scope refinement.** The Factory manages **Templates**, not **Schemas**:
   - **Templates** → fully Factory-managed: author, version, publish (draft → internal → public), validate, dry-run, retire seeds.
   - **Schema** (`workflow-schema-v1`) → **not** edited in the Factory. It is authored and versioned by platform engineers, rarely changes, and is a singleton. The Factory's relationship to it is **enforcement** at publish time (gate-id uniqueness, unlocks resolve, ArtifactType/provider registered, version format) — **not** authoring. Practical guardrail: don't build a "schema editor" into the Factory; build template authoring + a validator that reads the schema.

## On the deeper "Specification" rename (deferred)

Because "Specification = one run" is the term that fights real-world intuition, there's a larger, optional realignment: claim "spec" for the workflow contract (OpenAPI-style) and rename the per-run instance to "Run." That would make the public words match the world, at the cost of relitigating a settled term and touching `specVersionHash` semantics across all three repos. **Deferred** — treat as a separate, deliberate vocabulary decision to revisit only if the per-run "Specification" term actually trips a real user. The triad stays as-is for now.

## Implementation (app.esy.com)

- New read-only inspector at `/workflows/[templateId]/definition`, rendered from the canonical `WorkflowTemplate` (`getCanonicalById`). Sections: Intake schema → Runtime steps → Gates → Providers → Artifact schema → Cost & budget.
- "Inspect template" action added to each `/workflows` card.
- Legacy `/specs` route, side-rail item, `specs-store`, `mock-specs`, and `lib/api/specs.ts` removed. Run and artifact detail pages re-point their old "View Spec" links to the new inspector; the per-run frozen `specVersionHash` (the real Workflow Specification) is untouched.
- Template Definition view carries no org/project reference; visibility badge simplified to the rung name only.

## docs.esy.com

The existing concept pages already cover the triad faithfully and need no structural change:

- `concepts/workflow-schemas` — Schema as the platform contract; closes with "The Schema is the contract. Templates are concrete instances of that contract."
- `concepts/workflow-templates` — Template as the middle layer; anatomy = intake schema + procedure/policy + artifact schema; publish/visibility ladder.
- `concepts/workflow-specifications` — Specification as the per-run populated instance; "production reads the Specification, never the raw intake."

Optional future enrichment (not required): add the "legal code / blueprint / order form" parallel and the GitHub Actions mirror to the specifications page intro, since both proved effective at dissolving the "spec = contract?" intuition. Left out for now to avoid over-explaining what the pages already state.
