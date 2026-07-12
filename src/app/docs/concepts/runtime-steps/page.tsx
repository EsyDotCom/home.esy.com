import Link from 'next/link';
import { DocsPageShell } from '@/components/docs/DocsPageShell';
import { Callout, CodeBlock, PageHeader, Table } from '@/components/docs/Primitives';

export const metadata = {
  title: 'Runtime steps',
  description:
    'The executable program inside a Workflow Template: step kinds, prompt references, model binding, and the sizing contract — maxTokens, timeoutSeconds, estimatedTokens — with a worked step-by-step example.',
};

const stepShape = `{
  "id": "step-2",                      // stable id; later steps reference outputs by it
  "name": "Synthesize report",         // human label shown in run telemetry
  "kind": "llm",                       // llm | image | tool | subWorkflow | agent | code | qa
  "capability": "text",                // resolves a model from providers when no role/model is set
  "role": "writer",                    // optional: binds providers[role] instead of capability
  "system": "You are an expert research analyst...",
  "promptTemplate": "Using this outline:\\n{step-1.text}\\n\\nWrite a report on \\"{intake.topic}\\"...",
  "expectJson": true,                  // parse the response as JSON into the step's .json slot
  "jsonSchema": { "...": "..." },      // native structured output — the response IS valid JSON
  "maxTokens": 3000,                   // hard output ceiling for THIS step (see sizing below)
  "timeoutSeconds": 720,               // optional wall-clock override (clamped; see limits)
  "estimatedTokens": { "input": 4000, "output": 3000 }  // feeds the pre-run budget gate
}`;

const referenceTable = `{intake.topic}            the run's intake field
{step-1.text}             an earlier step's raw text output
{step-1.json.title}       a field of an earlier step's parsed JSON
{step-1.report.summary}   a sub-workflow step's child artifact content
{inputs.sourceReport}     a supplied artifactReference intake (content object)
{lookup.styleDescriptor}  a declarative lookup resolved from intake`;

const reportSteps = `"runtimeSteps": [
  {
    "id": "step-1",
    "name": "Outline report",
    "kind": "llm",
    "capability": "text",
    "system": "You are an expert research analyst...",
    "promptTemplate": "Create a tight section outline for a research report on: {intake.topic}. Audience: {intake.audience}. List 3-5 sections with one-line descriptions.",
    "maxTokens": 800
  },
  {
    "id": "step-2",
    "name": "Synthesize report",
    "kind": "llm",
    "capability": "text",
    "expectJson": true,
    "system": "You are an expert research analyst...",
    "promptTemplate": "Using this outline:\\n{step-1.text}\\n\\nWrite a research report on \\"{intake.topic}\\". Return ONLY JSON with keys: title, summary, sections (array of {heading, body}), sources (array of strings).",
    "maxTokens": 3000
  }
]`;

const walkthrough = `POST /v1/runs { templateId: "generate-research-report",
                intake: { topic: "urban heat islands", audience: "city planners" } }

── step-1 · Outline report ────────────────────────────────────────────
engine renders promptTemplate against the context blackboard:
  "Create a tight section outline for a research report on: urban heat
   islands. Audience: city planners. List 3-5 sections..."
→ provider call with max_tokens = 800
→ context["step-1"] = { text: "1. What heat islands are...", json: null }

── step-2 · Synthesize report ─────────────────────────────────────────
engine renders promptTemplate — {step-1.text} interpolates the outline:
  "Using this outline:\\n1. What heat islands are...\\n\\nWrite a research
   report on \\"urban heat islands\\". Return ONLY JSON with keys: ..."
→ provider call with max_tokens = 3000, expectJson
→ context["step-2"] = { text: "{\\"title\\": ...}", json: { title, summary,
                        sections, sources } }

── assembly ───────────────────────────────────────────────────────────
the artifactType's assembler shapes the terminal step's output into the
artifact content + QA envelope → the Run completes with an Artifact.`;

const compositionStep = `{
  "id": "step-1",
  "name": "Research report",
  "kind": "subWorkflow",
  "subWorkflow": {
    "templateId": "generate-research-report",
    "intakeMapping": { "intake.topic": "topic", "intake.audience": "audience" }
  },
  "satisfiedBy": "inputs.sourceReport"   // a supplied report skips the child run
}
// downstream, the child's artifact content is addressable:
//   "promptTemplate": "...visualizes the key findings below.\\n\\nFindings:\\n{step-1.report.summary}"`;

export default function RuntimeStepsPage() {
  return (
    <DocsPageShell>
      <PageHeader
        eyebrow="Concepts · Workflow primitives"
        title="Runtime steps"
        lead={
          <>
            A <Link href="/docs/concepts/workflow-templates">Workflow Template</Link>&apos;s{' '}
            <code>runtimeSteps</code> are not documentation of a process — they <em>are</em> the process. One
            generic engine reads the ordered list and executes each step by its <code>kind</code>: an LLM call, an
            image generation, a tool invocation, a sub-workflow, an agent loop. This page is the step contract —
            every field, the prompt-reference syntax, and the sizing limits (<code>maxTokens</code>,{' '}
            <code>timeoutSeconds</code>, <code>estimatedTokens</code>) that decide whether a step succeeds, fails
            loudly, or never launches.
          </>
        }
      />

      <h2>How steps execute</h2>
      <p>
        Steps run in order. Each step&apos;s output is written to a <strong>run-context blackboard</strong> under
        the step&apos;s <code>id</code>, and later steps (and the terminal artifact assembler) address earlier
        outputs by dotted path. There is no per-template execution code — the stored step list is the program, and
        every run freezes the exact list it executed into its{' '}
        <Link href="/docs/concepts/workflow-specifications">Specification</Link> for reproducibility.
      </p>

      <h2>Step kinds</h2>
      <Table
        head={['kind', 'What it does', 'Key fields']}
        rows={[
          [
            <code key="llm">llm</code>,
            'One model call: render system + promptTemplate against the context, call the bound text model, store { text, json }.',
            'system, promptTemplate, expectJson, jsonSchema, maxTokens',
          ],
          [
            <code key="image">image</code>,
            'Image generation from an upstream prompt.',
            'promptPath, aspectRatio, model',
          ],
          [
            <code key="tool">tool</code>,
            'A registered deterministic tool (live keyword data, URL fetch, transcript extraction, aggregation).',
            'tool, inputPath',
          ],
          [
            <code key="sub">subWorkflow</code>,
            'Runs another Template as a linked child run; its artifact content lands at {step-N.report...}. Costs roll up to the parent.',
            'subWorkflow { templateId, templateVersion, intakeMapping }, satisfiedBy',
          ],
          [
            <code key="agent">agent</code>,
            'A bounded LLM loop whose tools are sub-workflows.',
            'tools, maxIterations, maxCostUsd',
          ],
          [
            <code key="code">code / qa</code>,
            'Recorded seam steps — no provider call, no metering.',
            '—',
          ],
        ]}
      />

      <h2>The step contract</h2>
      <CodeBlock title="an llm step, annotated" language="json">
        {stepShape}
      </CodeBlock>

      <h3>Model binding</h3>
      <p>
        A step resolves its model in a fixed order: an explicit <code>model</code> pin wins; otherwise{' '}
        <code>providers[role]</code>; otherwise <code>providers[capability]</code>. Binding roles (
        <code>&quot;role&quot;: &quot;designResearcher&quot;</code>) rather than pinning lets a run override the
        model without editing the Template — and lets sibling Templates (e.g. a model-comparison twin) swap one
        binding while sharing every step definition.
      </p>

      <h3>Prompt references</h3>
      <p>
        <code>system</code> and <code>promptTemplate</code> interpolate <code>{'{dotted.path}'}</code> references
        against the blackboard. Publishing validates every reference — a prompt that mentions a step that
        doesn&apos;t exist (or exists only later) is rejected before the Template can go live.
      </p>
      <CodeBlock title="reference syntax" language="text">
        {referenceTable}
      </CodeBlock>

      <h3>Structured output</h3>
      <p>
        <code>jsonSchema</code> engages the provider&apos;s <em>native</em> structured output — the response is
        schema-constrained server-side, never prompt-and-scrape. Keep schemas provider-portable: array bounds like{' '}
        <code>minItems</code>/<code>maxItems</code> beyond 0/1 are rejected by some providers — enforce ranges in
        prompt text instead (&quot;5–8 colors&quot;).
      </p>

      <h2>Sizing maxTokens — the field that decides completeness</h2>
      <p>
        <code>maxTokens</code> is a <strong>per-step output ceiling</strong>. Size it to the <em>deliverable</em>{' '}
        that step produces, not to a habit:
      </p>
      <Table
        head={['Deliverable', 'Realistic output', 'maxTokens']}
        rows={[
          ['A seed phrase or short classification', '≤ 100 tokens', '300'],
          ['A structured research object (keywords, questions, spec)', '3–5k tokens', '8000'],
          ['A design brief (typography, palette, motion, layout)', '~2.5k tokens', '6000'],
          ['A complete single-file HTML page (inline CSS/JS + JSON-LD)', '13–16k tokens', '32000'],
          ['A full-page rewrite that re-emits the corrected document', '14–18k tokens', '36000'],
        ]}
      />
      <Callout title="Thinking models spend maxTokens before they write.">
        On models with always-on reasoning, internal thinking tokens <strong>count against the same
        budget</strong>. A 14,000-token cap that comfortably fits a page on a non-thinking model can yield ~2,000
        tokens of actual text after ~12,000 tokens of reasoning — a truncated document. If a Template can bind a
        thinking model (directly or via a twin&apos;s provider swap), size caps for <em>output plus reasoning</em>.
      </Callout>
      <Callout title="Truncation fails loudly — never silently.">
        A response stopped by <code>max_tokens</code> is never shippable: mid-document JSON fails parsing, and a
        mid-document page is a broken artifact. The engine fails the step with the real cause —{' '}
        <code>output truncated at max_tokens=N — the step&apos;s maxTokens is too small for its output</code> —
        instead of letting a truncated result ride to the next step. If you see this error, raise the step&apos;s
        cap; nothing was published.
      </Callout>

      <h2>The other two limits</h2>
      <Table
        head={['Field', 'Default', 'Behavior']}
        rows={[
          [
            <code key="t">timeoutSeconds</code>,
            'per kind: llm 300s · image 300s · tool 240s · agent 900s',
            'Wall-clock budget for the whole step (provider call + processing). A step may override upward for legitimately long generations; overrides are clamped by the platform so no step is unbounded. subWorkflow steps carry no budget of their own — they are bounded by their children’s.',
          ],
          [
            <code key="e">estimatedTokens</code>,
            'input 4000 · output 2000',
            'Feeds the pre-run cost estimate that budget caps enforce. A step that really emits 16k tokens but omits estimatedTokens is priced at 2k — the budget gate under-reads real spend. Declare honest estimates on every metered step.',
          ],
        ]}
      />

      <h2>Worked example — a two-step workflow, step by step</h2>
      <p>
        <code>generate-research-report</code> is the platform&apos;s canonical minimal pipeline: outline, then
        synthesize. Two llm steps, one reference between them, one structured terminal output.
      </p>
      <CodeBlock title="generate-research-report · runtimeSteps" language="json">
        {reportSteps}
      </CodeBlock>
      <p>What actually happens when a run executes it:</p>
      <CodeBlock title="execution walkthrough" language="text">
        {walkthrough}
      </CodeBlock>
      <p>
        Note the sizing: the outline step gets <code>800</code> (a list of five lines), the synthesis step{' '}
        <code>3000</code> (a full report as JSON). Neither number is arbitrary — each is the deliverable&apos;s
        realistic ceiling with headroom, and each would fail loudly rather than truncate.
      </p>

      <h3>Composition: a step that runs another workflow</h3>
      <p>
        <code>generate-research-infographic</code> starts by running the report Template above as a{' '}
        <Link href="/docs/concepts/sub-workflows">sub-workflow</Link> — unless the operator supplies an existing
        report, in which case <code>satisfiedBy</code> binds the supplied artifact into the same slot and the
        child run never happens. Downstream steps read the same reference either way.
      </p>
      <CodeBlock title="generate-research-infographic · step-1" language="json">
        {compositionStep}
      </CodeBlock>

      <h2>When limits hit</h2>
      <ul>
        <li>
          <strong>Truncation</strong> — the step fails naming the cap. Fix: raise that step&apos;s{' '}
          <code>maxTokens</code>.
        </li>
        <li>
          <strong>Timeout</strong> — the step fails with its wall-clock budget. Fix: raise{' '}
          <code>timeoutSeconds</code> (bounded), or split the step.
        </li>
        <li>
          <strong>Budget gate</strong> — the run never launches: its estimate exceeds an applicable{' '}
          <Link href="/docs/concepts/budgets">budget</Link>&apos;s per-run cap. Fix: honest{' '}
          <code>estimatedTokens</code> and a cap that reflects the pipeline&apos;s real cost.
        </li>
      </ul>

      <Callout title="Templates execute from the platform, not from your editor.">
        Step definitions live in the published Template. Changing <code>maxTokens</code> in an authoring file does
        nothing until the Template is republished — a new immutable version is minted and subsequent runs freeze
        that version. If a run&apos;s error shows an old cap, the fix is published, not deployed.
      </Callout>

      <h2>Related concepts</h2>
      <ul>
        <li>
          <Link href="/docs/concepts/workflow-templates">Workflow templates</Link> — the declared workflow these
          steps live inside.
        </li>
        <li>
          <Link href="/docs/concepts/sub-workflows">Sub-workflows</Link> — composition via child runs.
        </li>
        <li>
          <Link href="/docs/concepts/costs">Costs</Link> — how metered steps become estimates, ledgers, and
          reconciled spend.
        </li>
        <li>
          <Link href="/docs/concepts/runs">Runs</Link> — per-step telemetry: the exact rendered prompt, tokens,
          duration, and cost of every step described here.
        </li>
      </ul>
    </DocsPageShell>
  );
}
