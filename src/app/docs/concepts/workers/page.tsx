import { DocsPageShell } from '@/components/docs/DocsPageShell';
import { Callout, CodeBlock, PageHeader, Table } from '@/components/docs/Primitives';

export const metadata = {
  title: 'Workers',
  description:
    'Durable principals that run bounded shifts on a schedule, produce artifacts against a standing job, and report to your Inbox in plain language.',
};

const shiftShape = `trigger (schedule or run-now)
   └─▶ SHIFT
        1. CONTEXT — read the catalog census + assigned work
        2. PLAN    — run a plan template (an internal, attributed run)
        3. EXECUTE — place a Generation Order (children fan out)
        4. PUBLISH — ship gated output to the job's outlet (optional)
        5. REPORT  — one Inbox report, in the worker's own voice
        └─▶ HALT   — a shift always ends; stop conditions escalate`;

const jobShape = `{
  "contentTypes": [{
    "key": "clipart",
    "planTemplate": "plan-clipart-batch",
    "targetTemplate": "generate-clip-art-asset-v2",
    "count": 50,
    "budgetUsd": 3.50
  }],
  "failureThreshold": 0.2,
  "defaultPriorities": "flowers, animals, space",
  "publishTo": "clip-art-catalog",
  "publishPolicy": "classified",
  "messaging": {
    "tone": "warm, direct, first person",
    "cadence": "every-shift",
    "requirements": ["per-type counts", "total spend"]
  }
}`;

export default function WorkersPage() {
  return (
    <DocsPageShell>
      <PageHeader
        eyebrow="Concepts · Workers"
        title="Workers"
        lead={
          <>
            A worker is a durable principal you hire to own one responsibility — one worker per report you want to
            read. It runs bounded <strong>shifts</strong> on its <strong>schedule</strong>, produces artifacts
            against its standing <strong>job</strong>, optionally publishes them to an <strong>outlet</strong>, and
            reports to your Inbox in plain language.
          </>
        }
      />

      <h2>Vocabulary</h2>
      <Table
        head={['Term', 'Meaning']}
        rows={[
          [<strong key="w">Worker</strong>, 'The durable principal: identity, job, template allow-list, status (active | paused | retired). Tenure ends only by decision.'],
          [<strong key="j">Job</strong>, 'The standing per-shift spec: what to produce, how many, at what caps, in what voice, and where it publishes. Singular by discipline — the countable things that run are runs and orders.'],
          [<strong key="s">Shift</strong>, 'One bounded activation: trigger → plan → execute → publish → report → halt. A shift always ends; its record links every run, order, artifact, and message it touched.'],
          [<strong key="sc">Schedule</strong>, 'The WHEN primitive — a cron expression (UTC) that wakes a worker, or fires a single template directly.'],
          [<strong key="t">Trigger</strong>, 'What started a shift: schedule or manual run-now.'],
          [<strong key="r">Report</strong>, 'One Inbox message per shift, written in the worker’s own voice per its messaging spec. Figures come from the mechanical record — never invented.'],
        ]}
      />

      <h2>The shift</h2>
      <CodeBlock title="one shift" language="ascii">
        {shiftShape}
      </CodeBlock>
      <p>
        Every run a shift creates is attributed to the worker (<code>createdVia: &quot;worker&quot;</code> +{' '}
        <code>workerId</code>), so the whole trail — plan runs, order children, artifacts, spend — is auditable
        per worker, per shift.
      </p>

      <h2>The job</h2>
      <CodeBlock title="Worker.job" language="json">
        {jobShape}
      </CodeBlock>
      <p>
        Producing is not publishing: <code>publishTo</code> names the outlet its finished work ships to, and{' '}
        <code>publishPolicy</code> is the worker’s selection bar (<code>classified</code> publishes only work the
        classifier titled and categorized; <code>none</code>, the default, publishes nothing).
      </p>

      <h2>Stop conditions</h2>
      <p>
        A shift halts — never silently — when a stop condition trips: hard budget caps, a child-failure rate above
        the job’s threshold, or empty and skipped plans. Every breach files a high-priority task and an Inbox
        alert in the worker’s name, with the technical detail attached behind a disclosure.
      </p>

      <Callout title="The inbox speaks human">
        Workers communicate in natural language: what happened, what was done, what needs you. A report may be
        plain (the voice layer falls back to the mechanical summary on any failure) — but it may never be lost,
        and it may never omit assigned work.
      </Callout>

      <h2>Steering a worker</h2>
      <p>
        You steer a worker by <strong>assigning work</strong>, not by editing its job: goals carry measurable
        targets it plans against every shift, and scheduled tasks are day directives it checks off itself. See{' '}
        <a href="/docs/concepts/assigned-work">Assigned work</a>.
      </p>
    </DocsPageShell>
  );
}
