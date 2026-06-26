import { DocsPageShell } from '@/components/docs/DocsPageShell';
import { Callout, CodeBlock, PageHeader, Table } from '@/components/docs/Primitives';

export const metadata = {
  title: 'Publications',
  description:
    'A Publication is a headless destination: it owns published documents, defines where they go live, and exposes them through a public read API plus a revalidation webhook.',
};

const publicArticleExample = `{
  "slug": "the-economics-of-desalination",
  "title": "The economics of desalination",
  "description": "Cost drivers, energy intensity, and where the curve bends.",
  "category": "policy",
  "categoryLabel": "Policy",
  "categories": [
    { "slug": "policy", "label": "Policy" },
    { "slug": "energy", "label": "Energy" }
  ],
  "kind": "article",
  "content": "<article>…</article>",
  "publishedAt": "2026-06-20T14:02:11.004Z",
  "tags": ["water", "energy"],
  "relatedSlugs": ["the-cost-of-carbon-capture"],
  "author": { "name": "Jane Rivera" }
}`;

export default function PublicationsConceptPage() {
  return (
    <DocsPageShell>
      <PageHeader
        eyebrow="Concepts · Publications"
        title="Publications"
        lead={
          <>
            A <strong>Publication</strong> is a headless destination. It owns a set of published
            documents, knows where they go live (a site and a section), organizes them with its own
            categories, and exposes them through a public read API plus a revalidation webhook. Author
            once in Compose; render anywhere.
          </>
        }
      />

      <h2>Three orthogonal axes</h2>
      <p>
        Publishing in Esy is described by three independent ideas. Keeping them separate is what makes
        the same document renderable on many surfaces.
      </p>
      <Table
        head={['Axis', 'What it is', 'Example']}
        rows={[
          [<code key="k">kind</code>, 'The universal document type. Independent of where it publishes.', 'essay, article'],
          [
            <code key="p">publication</code>,
            'The headless destination a document is filed into — the site, section, and webhook.',
            'Esy Research, clip.art Learn',
          ],
          [
            <code key="c">category</code>,
            'A publication-owned taxonomy for grouping its documents.',
            'Policy, Energy',
          ],
        ]}
      />

      <h2>What a publication holds</h2>
      <Table
        head={['Field', 'Meaning']}
        rows={[
          [<code key="n">name</code>, 'Human label, e.g. “Esy Research”.'],
          [<code key="s">slug</code>, 'Stable id used in public read URLs and the webhook payload.'],
          [<code key="ak">acceptedKinds</code>, 'Which document kinds may be filed here.'],
          [
            <span key="su">
              <code>siteUrl</code> + <code>sectionPath</code>
            </span>,
            'Where documents go live, e.g. https://esy.com + /research.',
          ],
          [<code key="ru">revalidateUrl</code>, 'The consumer’s webhook Esy pings on publish/unpublish.'],
          [<code key="ip">isPublic</code>, 'Whether the publication is exposed through the public read API.'],
        ]}
      />

      <Callout title="Public publications">
        Public publications (the ones served by the read API below) are provisioned by Esy. Any
        account can create private publications to organize its own documents; exposing one publicly
        is handled by the Esy team while the public surface is in early access.
      </Callout>

      <h2>The public read contract</h2>
      <p>
        Once a publication is public, consumers read its published documents with no authentication.
        The shape is a stable, additively-versioned DTO — this <em>is</em> the contract every consumer
        maps from.
      </p>
      <CodeBlock title="GET /v1/publications/public/esy-research/articles/{slug}" language="json">
        {publicArticleExample}
      </CodeBlock>
      <p>
        See the <a href="/docs/api/publications">Publications API</a> for every endpoint, and the{' '}
        <a href="/docs/guides/connect-a-consumer-site">connect a consumer site</a> guide for receiving
        and verifying revalidation webhooks.
      </p>

      <h2>How a document reaches a reader</h2>
      <ol>
        <li>An author files a document into a publication and assigns categories in Compose.</li>
        <li>On publish, the document joins the publication’s public article list.</li>
        <li>
          Esy POSTs the publication’s <code>revalidateUrl</code> so the consumer can refresh just the
          affected pages.
        </li>
        <li>The consumer re-fetches the public read API and renders the new content.</li>
      </ol>
    </DocsPageShell>
  );
}
