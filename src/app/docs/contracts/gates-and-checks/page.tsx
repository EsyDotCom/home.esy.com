import { DocsPageShell } from '@/components/docs/DocsPageShell';
import { Callout, PageHeader, Table } from '@/components/docs/Primitives';

export const metadata = {
  title: 'Gates & checks',
  description:
    'Humans approve at gates; machines preserve between them. What a recorded check is, and why nothing unexamined can be approved.',
};

export default function Page() {
  return (
    <DocsPageShell>
      <PageHeader
        eyebrow="Contract rules"
        title="Gates & checks"
        lead="Three kinds of things happen to an artifact in a pipeline: steps do, gates judge, checks verify. The doctrine in one line: humans approve at gates; machines preserve between them."
      />

      <h2 id="the-three-kinds">The three kinds</h2>
      <Table
        head={['Kind', 'Who acts', 'What it does']}
        rows={[
          ['Step', 'The pipeline', 'Transforms the artifact — renders, removes a background, upscales, exports.'],
          ['Gate', 'A human (or a hard vision verdict)', 'Judges what machines cannot decide alone: is this good, what category is it, does the text match. A failed hard gate fails the run loudly.'],
          ['Check', 'The platform, automatically', 'Verifies that a property someone approved still holds after a step that could destroy it — and records the measurement on the artifact.'],
        ]}
      />

      <h2 id="recorded-or-it-didnt-happen">Recorded, or it didn&rsquo;t happen</h2>
      <p>
        A check appears on an artifact <em>only</em> when something actually evaluated it — there
        are no permanently-&ldquo;pending&rdquo; placeholder checklists. And approval is downstream
        of the record: an artifact with a failed check is not approvable (reject or re-render),
        and a real check that never recorded blocks approval until it does.
      </p>
      <Callout title="Why this is strict">
        The rule exists because the alternative was observed: an artifact once reached approved
        while visually destroyed, under a reassuring checklist that had never run. Every check you
        see on an artifact is a measurement, with numbers — provenance of quality, not just of
        origin.
      </Callout>

      <h2 id="examples">Checks in the wild</h2>
      <p>
        The export step measures that an approved cutout&rsquo;s transparency survived the print
        pipeline (soft-edge alpha in versus out). The text gate&rsquo;s verdict lands on the
        artifact with what OCR actually read. Consistency checks flag an item whose processing
        contradicts its declared render mode.
      </p>
    </DocsPageShell>
  );
}
