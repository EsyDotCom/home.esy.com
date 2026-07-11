import Link from 'next/link';
import { DocsPageShell } from '@/components/docs/DocsPageShell';
import { Callout, CodeBlock, PageHeader, Table } from '@/components/docs/Primitives';

export const metadata = {
  title: 'Template naming & the verb registry',
  description:
    'Workflow template ids are verb-first: the verb names the act, the rest names the artifact. The registry is the source of truth for which verb to use — generate invents, build computes, compose writes from sources.',
};

const shapeExample = `verb-noun            kebab-case, verb first

generate-clip-art-asset      generate → invents the image
build-demand-brief           build    → computes from an upload
compose-youtube-core-points  compose  → writes from a transcript
transcribe-youtube-video     transcribe → converts, adds nothing`;

export default function TemplateNamingPage() {
  return (
    <DocsPageShell>
      <PageHeader
        eyebrow="Concepts · Template naming"
        title="Template naming & the verb registry"
        lead={
          <>
            Every <Link href="/docs/concepts/workflow-templates">workflow template</Link> id is
            <strong> verb-first</strong>: the verb names the act, the rest names the artifact. The
            verb is not decoration — it declares what the template <em>does</em> to produce its
            output. This registry is the source of truth for which verb to use; it is extended
            deliberately, because a new verb is a vocabulary decision, not a convenience.
          </>
        }
      />

      <h2>The shape</h2>
      <p>
        A template id is <code>verb-noun</code>, kebab-case, verb first. The id is{' '}
        <strong>stable</strong> — it is referenced by runs, orders, and worker allow-lists, so it is
        chosen once and does not change on a whim (see <a href="#renames">Renames</a>). The name
        answers two things at a glance: <em>what act</em> the template performs (the verb) and{' '}
        <em>what artifact</em> it produces (the rest).
      </p>
      <CodeBlock title="template ids" language="text">
        {shapeExample}
      </CodeBlock>

      <h2>The registry</h2>
      <p>
        Each verb carries a distinct meaning. Pick the verb whose meaning matches what the template
        actually does to its inputs, not the one that sounds closest.
      </p>
      <Table
        head={['Verb', 'Meaning', 'Use when']}
        rows={[
          [
            <code key="generate">generate</code>,
            'Invent new content from an intent',
            'The artifact did not exist in any form before — the model creates it (text or image).',
          ],
          [
            <code key="plan">plan</code>,
            'Decide what to make, before making it',
            'The output is a work list another template executes (items plus rationale).',
          ],
          [
            <code key="build">build</code>,
            'Construct a structured product from supplied data',
            'Deterministic computation is the core; any prose is a layer on top; the output has exact, referenceable structure (keys, segments, tables).',
          ],
          [
            <code key="compose">compose</code>,
            'Write a document from existing sources',
            'The essence is authored writing — human or agent — grounded in supplied inputs: sources in, prose out.',
          ],
          [
            <code key="transcribe">transcribe</code>,
            'Convert a medium faithfully, adding nothing',
            'Pure extraction with zero invention.',
          ],
          [
            <code key="edit">edit</code>,
            'Transform an existing artifact per an instruction',
            'Input artifact → modified artifact, shape preserved.',
          ],
          [
            <code key="remove">remove</code>,
            'Strip something from an existing artifact',
            'A narrower edit: the instruction is fixed by the template.',
          ],
        ]}
      />

      <h2>The boundary that matters most</h2>
      <p>
        <strong>generate invents, build computes, compose writes from sources.</strong> Three verbs
        sit close enough to be confused, so the line between them is worth stating plainly:
      </p>
      <ul>
        <li>
          A <strong>demand brief</strong> is a <code>build</code>. Its load-bearing parts (segments,
          tiers, calendar, coverage) are computed exactly from an uploaded export; the analyst prose
          is the wrapper. Calling it <code>generate</code> would imply the numbers were invented;
          calling it <code>compose</code> would emphasize the wrong layer.
        </li>
        <li>
          A <strong>core-points brief</strong> is a <code>compose</code>. The transcript is the
          source; the written brief is the product.
        </li>
        <li>
          An <strong>essay</strong> is a <code>generate</code>. Nothing upstream constrains its
          content but the intent.
        </li>
      </ul>
      <Callout title="“Compose” is the act of writing, not a claim about the author">
        <code>compose</code> means writing a document from sources — it does <em>not</em> imply a
        human author (agents compose too), and it is unrelated to any product surface that shares the
        word. It is simply the natural verb for turning sources into prose.
      </Callout>

      <h2>Verbs deliberately not used</h2>
      <Table
        head={['Verb', 'Why it is reserved']}
        rows={[
          [
            <code key="assemble">assemble</code>,
            <>
              Taken by the engine: every template&rsquo;s terminal stage is an <em>assembler</em> that
              shapes step outputs into artifact content. A template id using it would name ~5% of the
              pipeline, not the template&rsquo;s purpose.
            </>,
          ],
          [
            <span key="cm">
              <code>create</code> / <code>make</code>
            </span>,
            'Too generic to carry a boundary — every template creates something. A verb has to distinguish.',
          ],
        ]}
      />

      <h2 id="renames">Renames are a lifecycle event</h2>
      <p>
        Because an id is referenced by runs, orders, and worker allow-lists, a rename is a{' '}
        <strong>lifecycle event, never a content edit</strong>. The successor id is registered as a
        new template; the old id stays registered with its <em>original</em> content plus{' '}
        <code>status=deprecated</code> and a <code>supersededById</code> pointer. New runs against the
        old id fail with a pointer to the successor, and the deprecated id drops out of listings —
        while existing runs that referenced it stay resolvable.
      </p>
      <Callout title="Precedent">
        <code>youtube-core-points-brief</code> → <code>compose-youtube-core-points</code>{' '}
        (2026-07-08) — the one pre-registry id that had no verb, brought into the pattern. Its
        predecessor <code>plan-daily-clipart-batch</code> → <code>plan-clipart-batch</code>{' '}
        (2026-07-05) established the deprecate-and-supersede mechanics.
      </Callout>

      <h2>Related concepts</h2>
      <ul>
        <li>
          <Link href="/docs/concepts/workflow-templates">Workflow templates</Link> — the reusable
          definitions these ids name, and where the <code>id</code> field is specified.
        </li>
        <li>
          <Link href="/docs/concepts/workflow-versioning">Workflow versioning</Link> — how a
          template&rsquo;s immutable versions are published and pinned, distinct from renaming the id.
        </li>
        <li>
          <Link href="/docs/concepts/runs">Runs</Link> — durable executions that reference a template
          id, which is why the id must stay stable.
        </li>
      </ul>
    </DocsPageShell>
  );
}
