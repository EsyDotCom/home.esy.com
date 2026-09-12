import { DocsPageShell } from '@/components/docs/DocsPageShell';
import { PageHeader } from '@/components/docs/Primitives';

export const metadata = {
  title: 'Changelog',
  description:
    'Public API and platform changes as Esy formalizes runtime contracts. Breaking changes will land under a new versioned path.',
};

const entries = [
  {
    date: '2026-09-12',
    tag: 'platform',
    title: 'Source policies: a subject picks the sources it may be researched from',
    items: [
      'Two new Library resources. /v1/sources holds one approved source per item — its domain derived from the URL, the edition that makes a quote checkable, and what it is good for. /v1/source-policies holds one subject’s standing decision: which of those sources, what the subject covers, and where it stops.',
      'They are peers, not a nesting: a policy names several sources and a source is named by several policies, so neither owns the other.',
      'A policy’s slug IS its subject, so a run names researchSubject and preflight resolves it by name — no mapping table, and no way for two policies to claim one subject.',
      'A subject with no policy, or a member that will not resolve, fails the run in preflight at zero spend. Researching the wrong sources quietly is worse than stopping.',
      'Provenance keeps the policy version and every member version, and each retrieved passage is stamped with when it was read, so a citation read back months later resolves to what that run actually had.',
    ],
  },
  {
    date: '2026-07-07',
    tag: 'platform',
    title: 'Specialty: the demand hierarchy — team produces → worker specialty → goals',
    items: [
      'A team is a department, named for what it produces: teams gain a “produces” domain, and members inherit it as their specialty when they don’t state a narrower one.',
      'A worker’s specialty (formerly “description”) now steers every shift’s planning — identity that never reached the planner produced off-mission batches.',
      'No worker without a WHAT: creation requires a specialty or a producing team; shifts refuse to run without one, loudly.',
      'Reporters may not flatter: reports describe the record’s actual categories and must flag batches that don’t match the specialty.',
      'The new-worker form gains a Publishing choice (publish classified work / keep private) — previously new workers silently never published.',
    ],
  },
  {
    date: '2026-07-07',
    tag: 'platform',
    title: 'The publish routing framework: the fence, Solo outlets, provenance, syndication',
    items: [
      'One law: goals decide WHAT gets made; designations and sections decide WHERE it ships. Goals no longer carry outlets — steering demand and routing distribution are separate systems.',
      'The fence: a team with a designated outlet is a publishing contract — everything the crew publishes ships there; a member’s Solo outlet defers (kept dormant, wakes on leaving), sibling sections can’t poach, and “this team publishes only to X” is provable by one query.',
      'Solo outlets replace the worker default (and the legacy job.publishTo, now fully retired): a worker’s own channel while solo — the home site’s sections sort by category, the rest lands home.',
      'Publish provenance: every published item records why it landed where it did (routedVia: team | section | solo | manual | subscription); every assignment change is on the record.',
      'Syndication (wire-service model): an outlet can carry every published artifact of its accepted kinds as its own act — one artifact on many sites, unpublishable per outlet, with worker fences untouched.',
    ],
  },
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
      'Outlets (new, separate from compose\u2019s Publications): channels for publishing artifacts of any kind from os.esy.com. Publish/unpublish are platform acts fired to your site as signed webhooks ({ outlet, action, artifactIds }).',
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
      'Launched docs.esy.com with the Esy brand system aligned to esy.com and os.esy.com.',
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
