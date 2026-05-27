# Workflow Primitives — Schema, Template, Specification

**Status:** Foundational principle
**Established:** 2026-05-27
**Applies to:** Every workflow shipped on `api.esy.com` and `app.esy.com` — visual essay, clip art batch, educational coloring page, micro film, SEO landing page, daily SERP snapshot, R2 backup, and every workflow we will design from here forward.
**Canonical reference:** [`docs.esy.com/concepts/workflow-schemas`](https://docs.esy.com/concepts/workflow-schemas), [`docs.esy.com/concepts/workflow-templates`](https://docs.esy.com/concepts/workflow-templates), [`docs.esy.com/concepts/workflow-specifications`](https://docs.esy.com/concepts/workflow-specifications).

A workflow is defined by three distinct objects at three layers of abstraction: a **Workflow Schema** declares the rules. A **Workflow Template** is a predesigned workflow that satisfies those rules. A **Workflow Specification** is one populated instance of a Template, produced during a single Run. This document defines the vocabulary and the reasoning behind it.

---

## TL;DR

- A **Workflow Schema** declares the rules every workflow must obey — what fields a workflow has, what shape a gate takes, what types intake and output can be. One Schema across the platform, versioned.
- A **Workflow Template** is a specific predesigned workflow conforming to the Schema (e.g., `generate-clip-art-asset`, `visual-essay`). Many Templates exist; one per artifact class, versioned.
- A **Workflow Specification** is the per-run populated blueprint produced by running a Template with operator inputs. Production reads it to build the artifact. Many Specifications exist; one per Run.

> A Workflow Schema declares the rules. A Workflow Template is a predesigned workflow that satisfies those rules. A Workflow Specification is one populated instance of a Template, produced during a single Run, that production reads to build the artifact.

---

## The Three Levels

```
┌───────────────────────────────────────────────────────────────────┐
│                                                                   │
│   Workflow Schema      ← The rules. The platform's contract.      │
│   (meta-definition)      What every Template must obey.           │
│                                                                   │
│        ▼ a Template satisfies the Schema                          │
│                                                                   │
│   Workflow Template    ← The predesigned workflow. Authored once, │
│   (declared workflow)    runs many times. Versioned.              │
│                                                                   │
│        ▼ a Run instantiates the Template                          │
│                                                                   │
│   Workflow Specification  ← The per-run populated blueprint.      │
│   (runtime instance)        One per Run. Production reads it.     │
│                                                                   │
│        ▼ production executes the Specification                    │
│                                                                   │
│   Workflow Run + Artifact ← The execution and the output.         │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

Each level has a different definition, a different audience, and a different lifecycle. Most people interacting with Esy work at only one level.

---

## Core Vocabulary

| Term | Layer | Definition |
|---|---|---|
| **Workflow Schema** | Meta | The rules every Workflow Template must conform to. Declares the shape of a workflow itself — what fields are required, what types are allowed, what an intake/gate/provider policy/output shape must look like. |
| **Workflow Template** | Declared | A specific predesigned workflow that satisfies the Schema. Has a stable id, a version, an artifact class, gates, providers, budget policy, output shape. Authored once; reused for every Run. |
| **Workflow Specification** | Runtime | A single populated instance of a Template, produced when a Run begins. Contains operator inputs, intermediate artifacts (research, design research), synthesis decisions, and the deterministic blueprint production reads. |
| **Workflow Run** | Runtime | A single execution of a Template. Produces a Specification, executes it, produces an Artifact. |
| **Artifact** | Output | The final output of a Run, with provenance back to its Specification, Template, and Schema versions. |
| **Workflow Framework** | Companion | An agent-facing operating manual that complements a Template — patterns, heuristics, anti-patterns, expansion protocols. Distinct from the Schema and the Template. |

---

## Workflow Schema (Meta)

The Workflow Schema is the platform's contract for what counts as a workflow. It declares:

- What fields a Workflow Template must contain (id, name, artifact class, version, cadence, intake, runtime steps, providers, gates, budget policy, output shape).
- What types and shapes those fields can take (e.g., `gates` must be an ordered list of strings; `providers` must be a record mapping step names to provider identifiers).
- What gate-unlock conditions are valid (e.g., "unlocks when upstream artifact of type X is approved").
- What sub-workflow references look like (e.g., a Template can declare that a step delegates to another Template).
- Versioning conventions for Templates.
- Validation rules a Template must pass to be publishable.

There is **one** Workflow Schema across the platform, versioned as the platform evolves (`workflow-schema-v1`, `workflow-schema-v2`). New Workflow Templates are authored against the current Schema. The Schema rarely changes; when it does, existing Templates either remain on their prior Schema version or migrate.

**Audience:** Platform engineers designing the workflow system itself. Most operators and even most workflow designers never interact with the Schema directly — they work with Templates that already conform to it.

**Frequency:** One, versioned.

**Where it lives:**
- *Today:* implicit, distributed across `orchestration/agents/orchestrators/*.md`, `client/docs/src/app/concepts/workflow-templates/page.tsx` (the "Anatomy" section), and `client/app.esy.com/docs/plans/generation-templates/*.md`.
- *Future:* a single declarative document on `api.esy.com` (`workflow-schema-v1.json` or equivalent) that the platform validates Templates against.

---

## Workflow Template (Declared)

A Workflow Template is a specific predesigned workflow conforming to the Schema. It is the named, packaged thing an operator picks when starting work — "Generate Clip Art Asset," "Visual Essay," "Generate Coloring Page."

**Already documented as a first-class concept on docs.esy.com at [`/concepts/workflow-templates`](https://docs.esy.com/concepts/workflow-templates).**

A Template specifies:

- **`id`** — Stable workflow identifier. Cannot change once published.
- **`name`** — Human-readable label shown in the app and admin tooling.
- **`artifactClass`** — One of `visual`, `video`, `research`, or `knowledge`. Determines the artifact contract.
- **`version`** — Date-tagged version of the workflow template definition.
- **`cadence`** — How the template is invoked: on demand, scheduled, continuous, per pack.
- **`gates`** — Quality, safety, approval, and budget checkpoints between runtime steps.
- **`providers`** — Provider routing for each runtime step.
- **`budgetPolicy`** — Constraints that keep execution predictable before a Run launches.
- **`outputShape`** — The contract for the artifact this Template produces.
- **`intakeSchema`** — The structured input form an operator fills to start a Run.

**Audience:** Workflow designers who author new workflows. App.esy.com operators who pick a Template from a library and run it.

**Frequency:** Many. One per artifact class, versioned (e.g., `generate-clip-art-asset v2026.05.16`, `visual-essay v1.4.0`).

**Examples:**
- `generate-clip-art-asset` — Produces a single clip art artifact via gpt-image-2 with optional background removal.
- `visual-essay` — Produces a scroll-driven visual essay artifact through a 14-gate pipeline.
- `generate-coloring-page-educational` — Produces a coloring page with verified educational facts.

**Where it lives:**
- *Today:* described in `orchestration/agents/orchestrators/*.md` and in `client/app.esy.com/docs/plans/generation-templates/*.md`. The Visual Essay Framework (`orchestration/skills/visual-essay-invocation/SKILL.md`) doubles as both Template description and operating manual.
- *Future:* a registered, versioned `workflow.json` (or equivalent) on `api.esy.com` that operators reference by id.

---

## Workflow Specification (Runtime)

A Workflow Specification is the per-run populated blueprint produced when a Template is instantiated with operator inputs. It is the deterministic source of truth that production reads to build the artifact.

A Specification contains:

- **Operator inputs** — the values supplied for this Run (topic, audience, prompt, style, etc.).
- **Intermediate artifacts** — linked references to research packages, design research, and other artifacts the workflow generated along the way.
- **Synthesis decisions** — choices made by spec-construction steps (selected chapters, picked figures, chosen facts, designed scroll-lock sequences).
- **Production-ready content** — the deterministic blueprint downstream production gates read to build the artifact.
- **Provenance pointers** — which Template version produced this Specification, which Schema version that Template conforms to, which Run produced it.

Specifications scale in size from a few lines (trivial workflows where the inputs effectively *are* the spec) to thousands of lines (visual essays with full 6-layer populated structure). The primitive is the same.

**Audience:** Production agents and code that consume the Specification to build the artifact. Reviewers inspecting the run's lineage.

**Frequency:** Many. One per Run.

**Examples (in this repo today):**
- `src/app/essays/etymology/pornography-etymology/SPEC.md` — 494-line populated Visual Essay Specification.
- `src/app/essays/rock-and-roll/SPEC.md` — published Visual Essay Specification.
- `src/app/essays/history/kpop-history/SPEC.md` — K-pop Visual Essay Specification.

**Where it lives:**
- *Today:* `SPEC.md` files colocated with their rendered artifacts at `src/app/essays/*/SPEC.md`.
- *Future:* typed `Specification` artifacts on `api.esy.com`, addressable by Run id, with full provenance back to their Template and Schema versions.

---

## Why Three Levels, Not Two

Conflating the Schema and the Template into one object — which is a tempting simplification — fails because the two objects serve different purposes:

- The Schema is the platform's API for defining workflows. It changes rarely.
- A Template is a specific declared workflow. New Templates are authored often.

If you have only one "schema" object that means both, you can't answer simple questions like:
- "What rules must a new Template satisfy?" (Schema-level)
- "What does the Visual Essay workflow produce?" (Template-level)

Three levels gives each concern its own home, with clear up-and-down relationships:

```
Schema  ──defines──▶  Template  ──instantiates──▶  Specification  ──executes──▶  Run + Artifact
```

This mirrors how programming language type systems work:

| Workflow vocab | TypeScript analogy |
|---|---|
| Workflow Schema | The TypeScript language spec — defines what a type can be |
| Workflow Template | A specific `interface User { ... }` declaration |
| Workflow Specification | A specific value `{ name: "alice", id: 1 }` satisfying that interface |
| Workflow Run / Artifact | The runtime behavior using that value |

---

## Foundational Principles

These are the takeaways that produced this vocabulary. Carry them forward.

### 1. Every Workflow Run produces a Workflow Specification

Even trivial workflows. For a daily SERP snapshot, the Specification might be ten lines — essentially the validated inputs. For a visual essay, it is 500–1,500 lines. Complexity varies; the primitive is universal. Production always reads the Specification, never the raw inputs.

### 2. The three-level pattern is universal across workflow complexity

It applies regardless of what runs inside each gate:

- Deterministic ETL (SERP fetch, R2 backup, sitemap rebuild) — same primitives
- LLM-assisted production (clip art batch with prompt expansion) — same primitives
- Mixed agent/deterministic (educational coloring with research) — same primitives
- Heavy agentic synthesis (visual essay, micro film) — same primitives

What runs inside each step is implementation, not type.

### 3. LLM call ≠ agent loop ≠ workflow

Three concepts at three granularities:

- **LLM call** — a single inference, deterministic in shape (one input, one output).
- **Agent loop** — LLM + tools + loop + memory + stop condition. Branches on findings. Decides when to stop.
- **Workflow** — a typed graph of steps. May contain zero, one, or many of either.

Most "LLM-involved" steps in production workflows are LLM calls, not agent loops. A step doesn't become agentic just because an LLM is invoked.

### 4. The primitive is "Workflow," not "Agentic Workflow"

Implementation properties belong on instances, not in type names. A workflow is a workflow whether it runs agents, deterministic code, or both. Agentic-ness is metadata on a Template (`is_agentic: true`, `agent_count: 5`), not part of the primitives that name all workflows.

### 5. Templates and Frameworks are distinct objects

A Template is a declarative spec the platform reads (id, gates, providers, output shape). A Framework is an agent-facing operating manual that complements a Template (patterns, heuristics, anti-patterns). They describe the same workflow but serve different audiences.

In this repo today, the two are bundled inside `SKILL.md` files because Claude Code's skill primitive was the available container. On the platform, they separate into two registered objects with the same workflow identity.

### 6. Three voices in current workflow documentation

When reading a current `SKILL.md`, three voices coexist. The platform will eventually separate them into three objects:

| Voice | What it says | Belongs in |
|---|---|---|
| **Contract voice** | "The output MUST contain X, Y, Z." | Workflow Schema (rules) / Template's output shape (specific contract) |
| **Procedural voice** | "First do X, then Y, then Z." | Workflow Framework |
| **Knowledge voice** | "Here are tested patterns — draw from them or invent." | Pattern Library |

### 7. Each level has a different audience

| Level | Primary audience | Frequency of interaction |
|---|---|---|
| Workflow Schema | Platform engineers | Rare — only when designing how workflows themselves work |
| Workflow Template | Workflow designers, then operators picking what to run | Common — designers author; operators pick from a library |
| Workflow Specification | Production agents/code; reviewers inspecting provenance | Constant — every Run produces one |

Designing docs and tooling around these audiences avoids cognitive overload. Operators don't need to read the Schema. Platform engineers rarely look at individual Specifications.

---

## How This Shows Up in This Repo Today

| Today (in this repo) | Conceptual role | Future platform object |
|---|---|---|
| `client/docs/src/app/concepts/workflow-templates/page.tsx` | Documents Templates publicly (correctly, at its level) | Stays. Cross-linked from Schema and Specification concept pages. |
| `orchestration/skills/visual-essay-invocation/SKILL.md` | Workflow Framework (with embedded Template description and pattern library) | Decomposes into `VisualEssaySchema` (rules) + `VisualEssayTemplate` (specific declared workflow) + `VisualEssayFramework` (agent manual) + `VisualEssayPatternLibrary` (reference knowledge) |
| Lines 22–62 of that `SKILL.md` (Invocation Architecture) | Output shape for the Visual Essay Template | Declarative `outputShape` field on `visual-essay v1.4.0` |
| Sections "Workflow," "Common Patterns," "Progress Bar Patterns" in `SKILL.md` | Framework + Pattern Library mixed | Pattern Library separated into queryable reference objects |
| `src/app/essays/*/SPEC.md` | Workflow Specifications (populated instances) | Typed Specification artifacts in the artifact graph |
| `orchestration/agents/orchestrators/visual-essay-orchestrator.md` | Visual Essay Template in narrative form (gates, agents, sub-workflows described in prose) | Folded into the declarative `visual-essay` Template |
| `orchestration/agents/research/*.md`, `orchestration/agents/auditors/*.md` | Agent role definitions referenced by Template steps | First-class Agent records bound to Template steps |
| `client/app.esy.com/docs/plans/generation-templates/generate-clip-art-asset-mvp.md` | Plan for the `generate-clip-art-asset` Template | Becomes the declarative Template `workflow.json` |

You do not need to refactor anything right now. The current structure works while Claude Code is the runtime. The vocabulary above is the bridge to the platform shape, not a demand to rewrite the existing files.

---

## Important Distinction: Workflow Specification vs Artifact Specification

A note for readers of [`/docs/specs`](https://esy.com/docs/specs) ("Artifact Specifications") on esy.com. Those docs describe the metadata panel displayed on published artifacts — title, sourceCount, authorship, palette, visualizations. That is **artifact-level inspection data** rendered on the published page.

A **Workflow Specification** is a different object:

| | Workflow Specification | Artifact Specification |
|---|---|---|
| **What it is** | Populated blueprint of one Workflow Run | Inspectable metadata of one published artifact |
| **When it exists** | During and immediately after a Run | Lives on the published artifact forever |
| **Audience** | Production agents/code that consume it | Readers inspecting "how was this made?" |
| **Example** | `src/app/essays/silk/SPEC.md` body content | The spec panel on the published Silk essay page |

The Artifact Specification is a downstream projection of the Workflow Specification plus Run metadata — but they are not the same object. When this vocabulary moves into `api.esy.com`, the Workflow Specification is the upstream record and the Artifact Specification is one of its downstream renderings.

---

## Future State (api.esy.com and app.esy.com)

When this vocabulary moves into platform objects:

1. **Workflow Schema becomes a single declarative document on the platform.** Versioned (`workflow-schema-v1.json`). Validates all Workflow Templates before publication.

2. **Workflow Templates become first-class registered objects.** Each is versioned (`generate-clip-art-asset v2026.05.16`, `visual-essay v1.4.0`), declares its full shape, and is queryable. Templates can reference other Templates as sub-workflows.

3. **Workflow Specifications become typed artifacts in the artifact graph.** Each Run produces a Specification with full provenance — what Template version it instantiated, what inputs it received, what research it consumed, what synthesis decisions it captured.

4. **Frameworks separate from Templates.** The agent operating manual lives as its own versioned object, attached to the Template but independently editable.

5. **Pattern libraries become queryable resources.** "Show me all progress bar patterns" returns structured data, not prose embedded in a Markdown body.

6. **`app.esy.com` renders the workflow UI from the Template declaratively.** Intake forms, gate visualizations, artifact pages all derive from the Template. No bespoke UI per workflow type.

7. **`api.esy.com` validates Templates against the Schema and Runs against their Templates.** Every produced artifact is checked against its declared output shape. Every gate-unlock condition is verified. Reproducibility falls out for free.

---

## Adoption Notes for Collaborators

When introducing this vocabulary to others, three things help adoption:

1. **It maps to vocabulary they already know.** "Template" carries decades of meaning in SaaS workflow tools (Zapier, n8n, Airflow). "Schema" is familiar from databases and APIs. "Specification" reads naturally as "the spec for this run."

2. **It mirrors programming language type systems.** Schema/Template/Specification ↔ language spec / type declaration / value. Engineers reading docs pattern-match instantly.

3. **It separates concerns by audience.** Platform engineers think about the Schema. Workflow designers author Templates. Operators run Templates and produce Specifications. Three distinct jobs, three distinct objects.

---

## Related

- **Public reference (canonical):** [`docs.esy.com/concepts/workflow-schemas`](https://docs.esy.com/concepts/workflow-schemas), [`docs.esy.com/concepts/workflow-templates`](https://docs.esy.com/concepts/workflow-templates), [`docs.esy.com/concepts/workflow-specifications`](https://docs.esy.com/concepts/workflow-specifications)
- **Rendered overview:** [`esy.com/docs/foundations`](https://esy.com/docs/foundations)
- **Operating model:** `esy.com/docs/core-model`
- **Example Workflow Framework today:** `orchestration/skills/visual-essay-invocation/SKILL.md`
- **Example Workflow Specifications today:** `src/app/essays/*/SPEC.md`

---

*This document captures the three-level workflow primitive model (Schema → Template → Specification), established through an architectural discussion on 2026-05-27. It supersedes informal uses of "schema" and "spec" elsewhere in the repo when they conflict with the definitions above.*
