import { DocsPageShell } from '@/components/docs/DocsPageShell';
import { Callout, CodeBlock, PageHeader, Table } from '@/components/docs/Primitives';

export const metadata = {
  title: 'Outlets',
  description:
    'Channels for publishing artifacts of any kind from app.esy.com — your site mirrors publish/unpublish state via a signed webhook.',
};

const outletShape = `{
  "name": "clip.art catalog",
  "slug": "clip-art-catalog",
  "siteUrl": "https://clip.art",
  "acceptedKinds": ["clip-art", "coloring-page"],
  "revalidateUrl": "https://clip.art/api/ingest/esy",
  "lastDeliveryStatus": "ok"
}`;

const webhookPayloads = `{ "outlet": "clip-art-catalog", "action": "publish",
  "artifactIds": ["artifact-9f1e2d3c", "artifact-8a7b6c5d"] }

{ "outlet": "clip-art-catalog", "action": "unpublish",
  "artifactIds": ["artifact-9f1e2d3c"] }`;

export default function OutletsPage() {
  return (
    <DocsPageShell>
      <PageHeader
        eyebrow="Concepts · Outlets"
        title="Outlets"
        lead={
          <>
            An outlet is the channel <strong>artifacts</strong> ship to — a factory outlet and a media outlet at
            once. Artifacts of any kind, published from app.esy.com (by you, or by a worker whose job says so),
            with unpublishing a single flip at the platform. Outlets are their own plane: hand-authored documents
            publish through <a href="/docs/concepts/publications">Publications</a> instead — same pattern,
            separate systems.
          </>
        }
      />

      <h2>The outlet record</h2>
      <CodeBlock title="an outlet" language="json">
        {outletShape}
      </CodeBlock>
      <p>
        An outlet owns its destination binding: the site it feeds, the artifact kinds it accepts (empty = any
        kind), the consumer’s revalidation webhook with an encrypted reveal-once secret, and delivery health.
      </p>

      <h2>Outlet vs Publication</h2>
      <Table
        head={['', 'Outlet (artifacts)', 'Publication (documents)']}
        rows={[
          ['The content', 'run-produced artifacts of any kind (images, research, …)', 'hand-authored articles (compose)'],
          ['Filing + state', <span key="oi"><code>outlet items</code>: artifact ↔ outlet, published | unpublished</span>, 'the document’s publication + draft/published status'],
          [
            'The gate',
            'finished + classified (title + category) + kind accepted (empty acceptedKinds = any kind)',
            'title, slug, description, category, video',
          ],
          ['Who publishes', 'you — or a worker whose job says so (its report accounts for it)', 'you, per item'],
          ['Where it lives', <code key="o">/v1/outlets</code>, <code key="p">/v1/publications</code>],
        ]}
      />

      <h2>How your site follows</h2>
      <CodeBlock title="the outlet webhook (Bearer secret + HMAC signature)" language="json">
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
