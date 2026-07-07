import { DocsPageShell } from '@/components/docs/DocsPageShell';
import { Callout, CodeBlock, PageHeader, Table } from '@/components/docs/Primitives';

export const metadata = {
  title: 'Outlets',
  description:
    'Channels for publishing artifacts of any kind from app.esy.com — your site mirrors publish/unpublish state via a signed webhook.',
};

const outletShape = `{
  "name": "clip.art/flowers",
  "slug": "clip-art-flowers",
  "siteUrl": "https://clip.art",
  "sectionPath": "/flowers",
  "description": "The flowers section of the clip.art catalog",
  "projectId": null,
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
        An outlet is <strong>URL-defined</strong>: <code>siteUrl</code> + <code>sectionPath</code>.{' '}
        <code>clip.art/free</code> and <code>clip.art/flowers</code> are different outlets; another site is
        another outlet. Beyond the address, an outlet owns the artifact kinds it accepts (empty = any kind), an
        optional project scope (a project-bound outlet is invisible to other projects’ workers), the consumer’s
        revalidation webhook with an encrypted reveal-once secret, and delivery health.
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

      <h2>Workers publish to outlets — the routing ladder</h2>
      <p>
        The job’s <code>publishPolicy</code> decides <em>if</em> a shift publishes (<code>"classified"</code> —
        what passed the classifier; <code>"none"</code> — nothing, the default). <em>Where</em> each artifact
        ships is a ladder, most specific rung first:
      </p>
      <ol>
        <li>
          <strong>The goal names the outlet.</strong> A goal assigned to a worker can carry an{' '}
          <code>outletId</code> — the expected common case. Artifacts matching the goal’s target categories ship
          there: “the education push ships to clip.art/school.”
        </li>
        <li>
          <strong>Category routing.</strong> Otherwise, an artifact routes to the same-site outlet whose{' '}
          <code>sectionPath</code> matches its classification category (<code>/flowers</code> catches{' '}
          <code>flowers</code>).
        </li>
        <li>
          <strong>The job’s <code>publishTo</code></strong> — the fallback channel. No rung matched → the
          artifact stays unpublished, never a wrong page.
        </li>
      </ol>
      <p>
        Publishing happens in one act per outlet, stamped <code>publishedBy: worker-…</code>, and the report
        accounts per channel: “Published 76/80 — clip.art/flowers: 16, clip.art catalog: 60.” See{' '}
        <a href="/docs/concepts/workers">Workers</a> and{' '}
        <a href="/docs/concepts/assigned-work">Assigned work</a>.
      </p>
    </DocsPageShell>
  );
}
