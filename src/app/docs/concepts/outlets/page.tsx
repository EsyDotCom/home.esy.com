import { DocsPageShell } from '@/components/docs/DocsPageShell';
import { Callout, CodeBlock, PageHeader, Table } from '@/components/docs/Primitives';

export const metadata = {
  title: 'Outlets',
  description:
    'The destination channel finished work ships to — documents and artifacts publish into an outlet; your site mirrors its state via a signed webhook.',
};

const outletShape = `{
  "name": "clip.art catalog",
  "slug": "clip-art-catalog",
  "siteUrl": "https://clip.art",
  "acceptedKinds": ["clip-art", "coloring-page"],
  "revalidateUrl": "https://clip.art/api/ingest/esy",
  "lastDeliveryStatus": "ok"
}`;

const webhookPayloads = `// documents (editorial)
{ "outlet": "esy-research", "slug": "attention-atlas",
  "action": "publish", "categories": ["methods"] }

// artifacts (production)
{ "outlet": "clip-art-catalog", "action": "publish",
  "artifactIds": ["artifact-9f1e2d3c", "artifact-8a7b6c5d"] }`;

export default function OutletsPage() {
  return (
    <DocsPageShell>
      <PageHeader
        eyebrow="Concepts · Outlets"
        title="Outlets"
        lead={
          <>
            An outlet is the destination channel finished work ships to — a factory outlet and a media outlet at
            once. esy.com/research and esy.com/learn are outlets for hand-authored documents; the clip.art
            catalog is an outlet for worker-produced artifacts. Producing is not publishing: work goes public by
            being <strong>published into an outlet</strong>, and unpublishing anywhere is one flip at the
            platform.
          </>
        }
      />

      <h2>The outlet record</h2>
      <CodeBlock title="an outlet" language="json">
        {outletShape}
      </CodeBlock>
      <p>
        An outlet owns its destination binding (site, accepted kinds, the consumer’s revalidation webhook and its
        encrypted secret), its category taxonomy, delivery health, and — optionally — an email channel.
      </p>

      <h2>Two content types, one model</h2>
      <Table
        head={['', 'Documents (editorial)', 'Artifacts (production)']}
        rows={[
          ['The content', 'hand-authored articles', 'run-produced work (images, research, …)'],
          ['Filing + state', 'the document’s outlet + draft/published status', <span key="oi"><code>outlet items</code>: artifact ↔ outlet, published | unpublished</span>],
          [
            'The gate',
            'title, slug, description, category, video',
            'finished + classified (title + category) + kind accepted by the outlet',
          ],
          ['Who publishes', 'you, per item', 'you — or a worker whose job says so (its report accounts for it)'],
          ['Unpublish', 'one flip; your site hides the page in seconds', 'same — from the platform, no site admin involved'],
        ]}
      />

      <h2>How your site follows</h2>
      <CodeBlock title="webhook payloads (Bearer secret + HMAC signature)" language="json">
        {webhookPayloads}
      </CodeBlock>
      <p>
        Publish and unpublish fire one signed webhook per act; delivery is best-effort with health recorded on
        the outlet, and your site’s periodic re-pull is the backstop. Thin sites render straight from the read
        API (the esy.com pattern); catalog sites with local search and related-item machinery mirror the outlet’s
        published items into their own rows (the clip.art pattern — an <em>ingest</em>).
      </p>

      <Callout title="Which consumption pattern?">
        Render-time reads are the default: fetch the outlet’s published items, cache, revalidate on webhook —
        zero infrastructure. Build an ingest only when your pages need local rows (full-text search, related
        items, sitemaps at catalog scale).
      </Callout>

      <h2>Workers publish to outlets</h2>
      <p>
        A worker’s job may name an outlet (<code>publishTo</code>) and a selection bar (<code>publishPolicy</code>).
        Its shift publishes the passing work in one act, stamped <code>publishedBy: worker-…</code>, and the
        report says so: “Published 76/80 to clip.art catalog.” See{' '}
        <a href="/docs/concepts/workers">Workers</a>.
      </p>
    </DocsPageShell>
  );
}
