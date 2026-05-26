# Workflow Detail Page Layout & Design

**Date:** May 25, 2026
**Type:** Design Session — UX, IA, Page Architecture, Marketing → App Handoff
**Status:** Active — Canonical layout reference for all new workflow templates on `esy.com/workflows/{slug}`.
**Context:** Refined the `/workflows/{slug}` detail page while shipping the first Clip Art workflow template (`generate-clip-art-asset`). This document captures the layout decisions, design system, copy standards, and marketing→app handoff so the next template can reuse the same pattern instead of relitigating.

---

## The Page in One Sentence

A workflow detail page tells the same story every time: **what does this workflow do → what do I give it / get back → how does it run → what happens at each step → what does the output look like → what other workflows are similar**.

If a section doesn't fit somewhere in that arc, it probably shouldn't be on the page.

---

## Final Section Order

The page renders in this exact order, in `src/components/ArtifactDetailTemplate/ArtifactDetailTemplate.tsx`:

| # | Section | Background | Purpose |
|---|---------|------------|---------|
| 1 | **Hero** (breadcrumb + title + description + CTAs + price card) | White + grid mask | Identify the workflow and route to action |
| 2 | **What You Provide / What You Get** | Elevated `#F8FAFC` band | At-a-glance spec — answer "can I actually run this?" |
| 3 | **How this workflow runs** (`WorkflowCircuit`) | White band | Visual hook — the process as a single diagram |
| 4 | **Inside the workflow** (numbered timeline) | White (continues) | Step-by-step explanation with examples |
| 5 | **Example outputs** (sample artifacts) | Elevated `#F8FAFC` band | Show, don't tell — concrete results |
| 6 | **Related Workflow Templates** | White + top border | Lateral exploration |

### Why this order

- The hero answers *what is this?* and offers a primary action immediately.
- "What You Provide / What You Get" is moved to **second**, not buried at the bottom. Inputs and outputs are decision-making information — readers should not have to scroll through the whole process to find out whether they can run it.
- The diagram (`WorkflowCircuit`) comes *after* the spec because the spec frames the diagram. By the time the user sees `Describe → Transform → Generate → Remove → Artifact`, they already know what "Describe" takes and what "Artifact" returns.
- "Inside the workflow" reuses the same stage IDs as the diagram. The diagram is the summary; the timeline is the longform. Hover labels in the diagram and full prose in the timeline reinforce each other.
- "Example outputs" earns its place near the end because it's evidence, not explanation. It should follow the explanation, not replace it.
- "Related Workflow Templates" is always last — it's the off-ramp.

---

## Band System (Visual Demarcation)

The page uses three CSS classes for full-bleed section wrappers:

```
.adt-band              — base wrapper, full-width, vertical padding via clamp()
.adt-band--default     — white background
.adt-band--elevated    — #F8FAFC background + 1px hairline borders + teal halo
.adt-band-inner        — constrains content to max-width: 1200px
```

### Background pattern

```
Hero               white + grid mask
─────────────────────────────────────
Spec               #F8FAFC + halo     ← elevated
─────────────────────────────────────
Workflow circuit   white              ← default
Inside the workflow white              ← default (flows from circuit)
─────────────────────────────────────
Example outputs    #F8FAFC + halo     ← elevated
─────────────────────────────────────
Related            white + top border
```

The rhythm alternates `white → tinted → white → tinted → white`. White bands carry the "main reading" content (the workflow itself); tinted bands carry the framing content (inputs/outputs/examples). The workflow circuit and the step timeline share a single white band so they read as one continuous narrative.

### The teal halo

Elevated bands get a very subtle radial gradient at the top:

```css
.adt-band--elevated::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 60% at 50% 0%,
    rgba(0, 168, 150, 0.045) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: -1;
}
```

This is the **brand teal at 4.5% opacity** — a quiet cue, not decoration. It tells the eye "this is a new section" without competing with content. Do not increase this opacity past ~6% or it starts to feel like a colored panel rather than a tone shift.

### Why this pattern (not boxed cards / divider lines / colored panels)

- **Boxed cards** for full sections fragment reading flow and add visual noise.
- **Divider lines** alone don't change scroll perception — the user still reads one undifferentiated wall.
- **Colored panels** (e.g., navy or teal sections) feel like ads or callouts — they pull focus away from content.
- **Background bands with a subtle halo** are the lightest possible signal that does the job: the eye registers "new context" without any single element shouting.

---

## Hero

### Structure

- **Grid wrapper** (`.adt-hero-wrapper`): white with a faded grid pattern that mask-fades to transparent at the bottom. Covers both the breadcrumb and the hero so they read as one entrance unit.
- **Breadcrumb:** `Agentic Workflows / {Category} / {Title}` — three levels, with `ChevronRight` separators. Final crumb is non-link.
- **Hero badges row:** category badge ("Workflow Template") + optional engine + estimated time + output formats. Pill style, small, low-contrast.
- **Title:** `Literata` serif, `clamp(2rem, 4.5vw, 3.25rem)`, weight 400. Letter-spacing `-0.02em`.
- **Description:** sans-serif, calm color, max ~640px line length.
- **CTAs:**
  - Primary: `Run in Esy →` — opens `https://app.esy.com/create/{slug}` in a new tab.
  - Secondary: `Explore Artifacts` — internal link.
- **Side card:** optional price card (`$X.XX per run`). Only rendered if `pricing.price` is set.

### CTA → app handoff

```ts
const esyEditorUrl = `https://app.esy.com/workflows/${template.slug}`;
```

This URL is the contract between `esy.com` and `app.esy.com`. **Both sites use the same path shape, on different hosts:**

```
esy.com/workflows/{slug}        → browse / learn (marketing detail page)
app.esy.com/workflows/{slug}    → configure & launch (Intent → Context → Review runner)
```

The mirror is intentional. A bookmark to either URL is meaningful and stable. A user who clicks **Run in Esy** on the marketing page lands in the runner with the workflow pre-loaded.

Note: `app.esy.com/create/{slug}` was the previous URL for the runner. It has been removed without a redirect — `app.esy.com` is auth-gated, the only external link was the esy.com CTA (now updated), and the product is too young to have meaningful link rot. New code must use `/workflows/{slug}`.

To add a new workflow:

1. Define the workflow in `esy.com/src/lib/templates/data.ts` with `isWorkflow: true` and the canonical `slug`.
2. Ensure `app.esy.com` has a matching entry in its workflows store keyed by the same `slug` (the runner page at `/workflows/[templateId]` is data-driven from that store).
3. The marketing detail page will automatically deep-link to it.

**Rule:** The slug must be identical in `esy.com/src/lib/templates/data.ts`, in `app.esy.com`'s workflows store, and in both URLs. They are the same workflow; the strings must agree.

---

## Spec Section ("What You Provide / What You Get")

Two-column grid (`1fr` mobile, `1fr 1fr` desktop) inside the elevated band. Each column has:

- Serif `h3` heading.
- Vertical list with a small icon (`Upload` for inputs, `Download` / `Cpu` / `Clock` for outputs).
- Output column also renders `outputFormats` as small pill badges below the list.

This section is **declarative**, not narrative. No prose. Each line is a fact the user can scan in under a second.

### Copy guidance

- Inputs use concrete nouns ("Clip art prompt or subject", "Style preset such as flat, outline, cartoon"). Not "Your input" or "What you want".
- Outputs lead with the artifact itself ("A publication-ready artifact produced by the full workflow pipeline"), then add the runtime metadata (model, time).
- Avoid implementation details that don't change the user's decision (storage backend, internal queue names).

---

## Workflow Visualization (`WorkflowCircuit`)

The diagram is the page's visual hook. It renders the workflow stages as connected rounded rectangles inside an SVG.

### Per-stage data model

```ts
{
  id: 'describe',
  label: 'Describe',         // ≤10 chars, single verb when possible
  sublabel: 'Prompt, style, and aspect ratio',  // shown on hover only
  isFinal?: boolean,         // styles the artifact node distinctly
}
```

### Naming conventions

- Stage labels are **single verbs** (`Describe`, `Transform`, `Generate`, `Remove`), never sentences.
- The final node is the artifact noun (`Artifact`, not `Deliver`).
- Sublabels go in the **hover tooltip**, not on the node itself. Nodes stay scannable.
- Stages should be roughly equal in conceptual weight. If one "stage" is just `console.log`, fold it into a neighbor.

### What does *not* go on the diagram

- Storage (`Store`, `Upload to R2`, etc.) — implementation, not user-visible behavior.
- Auth, billing, logging, telemetry — same reasoning.
- Anything that happens "every time" across all workflows.

The diagram is for the **workflow-specific** sequence. If a step appears on every diagram, it's infrastructure and belongs in the prose, not the picture.

---

## Inside the Workflow (Step Timeline)

Renders `template.workflowDetails` as a numbered vertical timeline (`.adt-steps`). Each step has:

- A circular marker with two-digit number (`01`, `02`, ...).
- A serif `h3` title (matches the diagram label).
- A descriptive paragraph (~1–2 sentences, plain prose).
- Optional examples block:
  - **Before/After** pair (special case): renders as two labeled rows with an arrow between them. Use for the `Transform` step where the user's rough input becomes the resolved prompt.
  - **Generic key/value pairs**: rendered as a definition list (`Model: gpt-image-2`, `Output: Raw clip art image`).

### Data model

```ts
{
  id: 'transform',          // matches workflowStages[].id
  title: 'Transform',
  description: 'Esy turns the rough description into a structured image prompt...',
  examples: [
    { label: 'Before', value: 'A friendly fox waving' },
    { label: 'After',  value: 'A friendly fox waving, flat vector clip art, ...' },
  ],
}
```

### When to show examples

Always show at least one concrete example per step. The whole point of this section is to make the abstract concrete. If a step doesn't have a meaningful example, the step is probably too vague and needs to be rewritten or merged.

### Stage IDs must match the diagram

The `id` on each `workflowDetails` entry must match the `id` on the corresponding `workflowStages` entry. This isn't enforced in code today but is the convention — the diagram is the summary, the timeline is the detail of the *same* stages.

---

## Example Outputs

Two-column card grid inside the elevated band. Each card is **white on tinted bg** with a subtle border and tiny shadow so the cards lift off the panel:

```css
.adt-sample-card {
  background: #FFFFFF;
  border: 1px solid rgba(10, 37, 64, 0.08);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(10, 37, 64, 0.02);
}
.adt-sample-card:hover {
  border-color: rgba(0, 168, 150, 0.25);
  box-shadow: 0 2px 8px rgba(10, 37, 64, 0.04);
}
```

### Copy guidance

- Title is a concrete artifact name ("Friendly Fox Waving", "Watercolor Dinosaur Sticker"), not a category.
- Description is one sentence — what the artifact is and what about it is notable (clean edges, transparent background, stored resolved prompt).
- 2–4 samples is the sweet spot. More starts to feel like a portfolio.

### Section header

Eyebrow (`From this workflow` in teal uppercase) + serif h3 (`Example outputs`). Centered. This matches the "Inside the workflow" header treatment so the two evidence sections feel like siblings.

---

## Related Workflow Templates

Standard `TemplateGrid` with `columns={3}`, populated from `template.relatedSlugs`. White section with a top border to separate from the preceding elevated band.

### Selection guidance

- Pick 2–4 templates that share an audience or output class, not just a tag.
- Avoid linking to templates with the same outcome (cannibalization) — link to adjacent workflows the same user might run next.

---

## Naming Standards (Recap)

These are settled and documented separately in `docs/seo/WORKFLOW_URL_NAMING_STANDARD.md`. Recap for convenience:

- Canonical route: `/workflows` (not `/templates`).
- User-facing label for the category: **Agentic Workflows**.
- User-facing label for individual items: **Workflow Template** (badge, list copy, breadcrumbs).
- Brand name is `Esy` — never `ESY`.
- Categories live at `/workflows/{category}` and inherit the same band layout via `WorkflowCategoryPage`.

---

## Component & File Map

```
src/components/ArtifactDetailTemplate/
  ArtifactDetailTemplate.tsx   ← main layout (sections in order)
  ArtifactDetailTemplate.css   ← band system + spec + steps + samples styling
  WorkflowCircuit.tsx          ← SVG diagram with hover tooltip
  types.ts                     ← ArtifactDetailTemplateProps

src/lib/templates/
  data.ts                      ← all templates (incl. workflowStages + workflowDetails)
  types.ts                     ← Template, WorkflowStage, WorkflowDetail interfaces
  index.ts                     ← getWorkflowTemplatesByTag, getTemplateBreadcrumbs, ...

src/app/workflows/
  [slug]/page.tsx              ← dynamic route, generates metadata, renders ArtifactDetailTemplate
  [slug]/TemplateDetailClient.tsx
  {category}/page.tsx          ← static category routes (clip-art, infographics, ...)
  {category}/{Category}Client.tsx
  TemplatesClient.tsx          ← /workflows index
```

---

## Checklist: Adding a New Workflow Template

1. **Decide the slug.** It must match the `app.esy.com/create/{slug}` route. Lowercase, hyphenated, descriptive.
2. **Add the template record** in `src/lib/templates/data.ts`:
   - `isWorkflow: true`
   - `category`, `subcategory`, `tags`
   - `inputRequirements` — populates the "What You Provide" list
   - `engine`, `estimatedTime`, `outputFormats` — populate the hero badges and "What You Get" list
   - `workflowStages` — the diagram (4–6 stages, single-verb labels)
   - `workflowDetails` — the timeline (same IDs as stages, one paragraph + examples each)
   - `sampleArtifacts` — 2–4 concrete examples
   - `relatedSlugs` — 2–4 adjacent workflows
3. **If it introduces a new subcategory:** add it to `SUBCATEGORY_CATEGORY_MAP` in `src/lib/templates/types.ts` and create `src/app/workflows/{subcategory}/page.tsx` + `{Subcategory}Client.tsx` (mirror `clip-art/`).
4. **Verify the app counterpart exists:** `https://app.esy.com/create/{slug}` should resolve to the workflow runner.
5. **Add a `creationPaths` entry** in `src/app/workflows/TemplatesClient.tsx` if the subcategory should appear on the index "What do you want to make?" grid.
6. **Smoke-test locally:**
   - `/workflows` — new card appears.
   - `/workflows/{subcategory}` — category page lists the template.
   - `/workflows/{slug}` — detail page renders all six sections; Run CTA links to `app.esy.com/create/{slug}`.

---

## Reference Template

The canonical reference is `generate-clip-art-asset` (`wf-8` in `data.ts`). When designing a new template, mirror its data shape:

- 4–6 workflow stages, single-verb labels, sublabel as hover-only tooltip.
- 4–6 workflow details, each with a 1–2 sentence description and a concrete examples block.
- 2 sample artifacts, each named like a real output, not a category.
- Engine + estimated time + output formats populated.

If the new template needs a layout variation that doesn't fit this pattern, that's a signal to discuss before building — the value of this layout is that it's the same across every workflow, so users learn to read it once.

---

## Open Questions (parked for next session)

- Should the spec section get a small centered eyebrow ("At a glance") to frame it now that it sits prominently after the hero?
- Should the related-workflows section live inside an elevated band for symmetry, or stay on white as the page off-ramp?
- Should we add a "Run in Esy" CTA at the bottom of the page (after Example Outputs) so users who scrolled all the way down don't have to scroll back up?
