---
title: "Pipeline Orchestration"
category: "infrastructure"
description: "The system that coordinates the execution order, data flow, and error handling across multiple agents in an agentic workflow."
tldr: "Pipeline orchestration is the infrastructure layer that decides which agent runs when, what data passes between stages, and what happens when something fails. It's the execution engine underneath an agentic workflow — the thing that turns a template definition into a running pipeline."
inEsy: "Esy's orchestration layer executes template-defined workflows: scheduling agent stages, routing data between them, handling retries, and assembling the final artifact. The user runs a template; orchestration handles everything between intent and output. [Browse Templates](/workflows/)"
relatedTerms: ["agentic-workflow", "structured-output", "citation-verification"]
workflowStages:
  - id: "template"
    label: "Template"
    sublabel: "Define Pipeline"
  - id: "schedule"
    label: "Schedule"
    sublabel: "Order & Dependencies"
  - id: "execute"
    label: "Execute"
    sublabel: "Run Agents"
  - id: "route"
    label: "Route"
    sublabel: "Pass Data"
  - id: "assemble"
    label: "Assemble"
    sublabel: "Final Artifact"
    isFinal: true
---

## What the orchestrator does

An agentic workflow defines *what* should happen — research, verify, draft, QA. The orchestrator defines *how* it happens at runtime:

- **Scheduling** — which agent runs first, second, third
- **Data routing** — passing the output of one agent as input to the next
- **Dependency resolution** — ensuring prerequisites complete before dependent stages start
- **Error handling** — retrying failed stages, routing around errors, escalating when needed
- **Resource management** — managing API rate limits, model contexts, and concurrent executions

Without orchestration, an agentic workflow is just a list of tasks. With it, the list becomes an executable pipeline.

## Sequential vs. parallel execution

The simplest orchestration pattern is sequential: stage A completes, its output feeds stage B, and so on. But real pipelines often benefit from parallelism.

```
Sequential:    Research → Analyze → Draft → Verify → Output

Parallel:      Research ──→ Analyze ──→ Draft ──→ Verify → Output
               Research ──→ Fact-check ─────────↗
```

In the parallel case, research feeds both an analysis agent and a fact-checking agent simultaneously. Their outputs converge at the drafting stage. This reduces total pipeline time without sacrificing verification depth.

## Key orchestration patterns

### Fan-out / Fan-in

A single input is processed by multiple agents in parallel, and their outputs are merged:

- **Fan-out**: send the same source material to a research agent, a citation extractor, and a key-themes agent
- **Fan-in**: merge their outputs into a unified analysis that feeds the drafting stage

### Conditional branching

The orchestrator routes execution based on intermediate results:

- If citation verification fails for more than 20% of sources → route back to the research agent for replacement sources
- If QA score is below threshold → re-run the drafting stage with stricter constraints

### Retry with backoff

When an agent stage fails (API timeout, rate limit, malformed output), the orchestrator retries with exponential backoff before marking the stage as failed.

## Why orchestration is infrastructure

Orchestration is not a feature — it's infrastructure. It sits below the application layer and handles concerns that individual agents shouldn't manage:

| Concern | Without Orchestration | With Orchestration |
|---------|----------------------|-------------------|
| Execution order | Manual, fragile | Declarative, reliable |
| Error recovery | Entire pipeline fails | Graceful retry/reroute |
| Parallelism | Not possible | Automatic where defined |
| Observability | None | Full stage-by-stage logging |
| Reproducibility | Inconsistent | Same template → same pipeline |

> Orchestration is what makes the difference between a demo and a production system. Demos can chain prompts manually. Production requires scheduling, error handling, and observability.

## Observability

A well-orchestrated pipeline produces a complete execution trace:

- **Stage timings** — how long each agent took
- **Input/output snapshots** — what data entered and exited each stage
- **Decision points** — where conditional logic branched
- **Error log** — what failed, how many retries, whether recovery succeeded
- **Final assembly** — how the artifact was composed from stage outputs

This trace is what makes pipelines auditable — you can inspect exactly what happened, why, and where.
