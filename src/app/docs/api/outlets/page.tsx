import { DocsPageShell } from '@/components/docs/DocsPageShell';
import { Callout, CodeBlock, EndpointList, PageHeader } from '@/components/docs/Primitives';

export const metadata = {
  title: 'Outlets API',
  description:
    'Manage outlets, publish and unpublish documents and artifacts, read the published feed, and receive signed revalidation webhooks.',
};

const publishExample = `POST /v1/outlets/{outletId}/items/publish
{ "artifactIds": ["artifact-9f1e2d3c", "artifact-8a7b6c5d", "artifact-unclassified"] }

// per-id results — the gate explains itself
{
  "results": [
    { "artifactId": "artifact-9f1e2d3c", "ok": true },
    { "artifactId": "artifact-8a7b6c5d", "ok": true },
    { "artifactId": "artifact-unclassified", "ok": false,
      "problem": "Artifact has no classification (title + category) — the consumer can't build a page." }
  ],
  "changed": 2
}`;

const feedExample = `GET /v1/outlets/{outletId}/items?status=published&limit=100&offset=0

{
  "items": [{
    "id": "pubitem-1a2b3c4d",
    "outletId": "…",
    "artifactId": "artifact-9f1e2d3c",
    "status": "published",
    "publishedBy": "worker-06997927",
    "publishedAt": "2026-07-06T10:14:02Z",
    "artifact": {
      "id": "artifact-9f1e2d3c",
      "templateId": "generate-clip-art-asset-v2",
      "title": "Apple on Books",
      "content": { "type": "image", "url": "…", "classification": { "…": "…" } }
    }
  }],
  "total": 82
}`;

export default function OutletsApiPage() {
  return (
    <DocsPageShell>
      <PageHeader
        eyebrow="Reference · Outlets API"
        title="Outlets API"
        lead={
          <>
            Outlets are the destination channels finished work ships to. Public reads need no auth; everything
            else uses a bearer token (session or <code>esy_sk_</code> key). Publishing is per-item and gated;
            every publish or unpublish act fires one signed webhook to the outlet’s consumer.
          </>
        }
      />

      <h2>Public reads (no auth)</h2>
      <EndpointList
        items={[
          { method: 'GET', path: '/v1/outlets/public/{slug}/articles', desc: 'Published documents of a public outlet, newest first.' },
          { method: 'GET', path: '/v1/outlets/public/{slug}/articles/{articleSlug}', desc: 'One published document.' },
          { method: 'GET', path: '/v1/outlets/public/{slug}/categories', desc: 'The outlet’s ordered category taxonomy.' },
        ]}
      />

      <h2>Managing outlets</h2>
      <EndpointList
        items={[
          { method: 'GET', path: '/v1/outlets', desc: 'Your outlets, with delivery health.' },
          { method: 'POST', path: '/v1/outlets', desc: 'Create an outlet (public outlets are admin-only). The webhook secret is revealed once.' },
          { method: 'PATCH', path: '/v1/outlets/{outletId}', desc: 'Update destination binding, accepted kinds, and metadata.' },
          { method: 'POST', path: '/v1/outlets/{outletId}/secret/rotate', desc: 'Rotate the webhook secret (revealed once).' },
          { method: 'POST', path: '/v1/outlets/{outletId}/verify', desc: 'Send a test ping to the consumer’s webhook.' },
        ]}
      />

      <h2>Publishing artifacts</h2>
      <EndpointList
        items={[
          { method: 'POST', path: '/v1/outlets/{outletId}/items/publish', desc: 'Publish a batch of artifacts (gated: finished + classified + kind accepted). One webhook per act.' },
          { method: 'POST', path: '/v1/outlets/{outletId}/items/unpublish', desc: 'Unpublish a batch — the consumer hides those pages within seconds.' },
          { method: 'GET', path: '/v1/outlets/{outletId}/items', desc: 'The published-items feed a consumer reads (artifact data embedded).' },
          { method: 'GET', path: '/v1/outlets/items/by-artifact/{artifactId}', desc: 'Everywhere one artifact is filed — powers publish/unpublish controls.' },
        ]}
      />

      <CodeBlock title="publish, with the gate explaining itself" language="json">
        {publishExample}
      </CodeBlock>

      <CodeBlock title="the consumer feed" language="json">
        {feedExample}
      </CodeBlock>

      <h2>The webhook</h2>
      <p>
        One POST per act to the outlet’s <code>revalidateUrl</code>, authenticated twice:{' '}
        <code>Authorization: Bearer &lt;secret&gt;</code> and an HMAC-SHA256 signature over the exact body bytes.
        Document acts send <code>{'{ outlet, slug, action, categories }'}</code>; artifact acts send{' '}
        <code>{'{ outlet, action, artifactIds }'}</code>. Delivery is best-effort — health lands on the outlet
        record, and your periodic re-pull is the backstop.
      </p>

      <Callout title="Legacy path">
        <code>/v1/publications/…</code> remains mounted as an alias of every route above, and webhook payloads
        carry a legacy <code>publication</code> key alongside <code>outlet</code> during the rename transition.
        New integrations should use <code>/v1/outlets</code>.
      </Callout>
    </DocsPageShell>
  );
}
