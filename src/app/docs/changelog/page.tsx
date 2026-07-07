import { DocsPageShell } from '@/components/docs/DocsPageShell';
import { PageHeader } from '@/components/docs/Primitives';

export const metadata = {
  title: 'Changelog',
  description:
    'Public API and platform changes as Esy formalizes runtime contracts. Breaking changes will land under a new versioned path.',
};

const entries = [
  {
    date: '2026-07-07',
    tag: 'platform',
    title: 'Teams: workers organized into crews with titles and a shared channel',
    items: [
      'Teams group the roster: one team has many workers (a worker belongs to at most one), and a team carries a default outlet — the last rung of the publish ladder, so every worker on a team gets a sane publish destination with no per-worker config.',
      'Workers gain a title — their role, especially within a team (e.g. Illustrator) — which colors how they sign their reports. Workers on one team can hold different titles.',
      'A worker’s publish destination is now a first-class, validated default outlet (promoting the old job.publishTo slug, which still works for compatibility).',
      'The routing ladder grows to four rungs, most specific first: the goal’s outlet → category/section match → the worker’s default outlet → the team’s outlet → unpublished.',
      'New Teams management on the Workers page: workers grouped under team headers, inline team create/rename/outlet-change, and an Assignment card on each worker for title, team, and default outlet.',
    ],
  },
  {
    date: '2026-07-07',
    tag: 'platform',
    title: 'Outlets go URL-defined: sections, the routing ladder, endpoint secrets',
    items: [
      'An outlet is now URL-defined (siteUrl + sectionPath): clip.art/free, clip.art/flowers, and clip.art/worksheets are different outlets; any site — including esy.com/* surfaces — is another. projectId scopes which workers publish where.',
      'The publish routing ladder decides WHERE each artifact ships, most specific rung first: the assigned goal’s outlet (goals carry an optional outletId) → the same-site outlet whose section matches the artifact’s category → the job’s publishTo fallback. No rung matched → the artifact stays unpublished.',
      'Webhook secrets belong to the endpoint, not the channel (the Stripe model): outlets sharing a revalidateUrl share one secret; rotating any rotates the endpoint. A consumer holds exactly one secret no matter how many outlets ship to it.',
      'Consumers discover their outlets from the platform roster (GET /v1/outlets filtered by their own domain) — channel lists never live in consumer configuration.',
      'The items feed pages deterministically (stable id tiebreak), so consumer scans never re-serve or skip rows across page boundaries.',
    ],
  },
  {
    date: '2026-07-06',
    tag: 'platform',
    title: 'The manufacturing tier: Workers, Assigned work, Orders, and Outlets',
    items: [
      'Workers: durable principals that run bounded shifts on schedules, produce against a standing job, and report to your Inbox in their own voice (with stop-condition escalation).',
      'Assigned work: goals and tasks carry an assignee — yours or a worker\u2019s. Worker goals require measurable targets, progress by live catalog census, and achieve themselves; scheduled tasks are day directives workers check off with a completion note.',
      'Generation Orders documented: one template fanned into N child runs with variation, per-child dedupe keys, and a hard budget cap — two-phase (planned \u2192 start).',
      'Outlets (new, separate from compose\u2019s Publications): channels for publishing artifacts of any kind from app.esy.com. Publish/unpublish are platform acts fired to your site as signed webhooks ({ outlet, action, artifactIds }).',
      'New references: Workers API, Planning API (goals/tasks/messages), and the expanded Outlets API.',
    ],
  },
  {
    date: '2026-06-04',
    tag: 'platform',
    title: 'Workflow publishing — visibility ladder + admin-gated authoring',
    items: [
      'Introduced template visibility (draft → internal → public) as the single control over where a template is listed, decoupled from lifecycle status.',
      'Publish-time validation (executability + estimability) now runs when a template is promoted to a listed rung, not on a status flag.',
      'Gated workflow create/update behind admin; admin-published templates are system-owned and the public catalog lists only public, system-owned templates.',
    ],
  },
  {
    date: '2026-05-16',
    tag: 'docs',
    title: 'Public reference layer',
    items: [
      'Launched docs.esy.com with the Esy brand system aligned to esy.com and app.esy.com.',
      'Added concept pages for Workflow templates, Runs, Artifacts, and Costs.',
      'Documented the generate-clip-art-asset workflow end-to-end with step-level telemetry.',
      'Introduced the provider cost ledger with estimated, provider-reported, and reconciled states.',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <DocsPageShell>
      <PageHeader
        eyebrow="Reference · Changelog"
        title="Changelog"
        lead={
          <>
            Public API and platform changes are tracked here as Esy formalizes runtime contracts. Breaking
            changes will move to a new versioned path; non-breaking additions ship continuously.
          </>
        }
      />

      <div style={{ marginTop: 16 }}>
        {entries.map((entry) => (
          <article key={entry.date} className="changelogEntry">
            <div>
              <div className="changelogDate">{entry.date}</div>
              <span className="changelogTag">{entry.tag}</span>
            </div>
            <div>
              <h3>{entry.title}</h3>
              <ul>
                {entry.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </DocsPageShell>
  );
}
