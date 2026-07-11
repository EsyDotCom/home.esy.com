/**
 * Sidebar information architecture for docs.esy.com.
 * Sections render top-down in the order listed here. Items support
 * an optional `icon` (from the lucide icon map in Sidebar.tsx),
 * a `since` date (drives an auto-expiring "New" badge), an `external`
 * flag, and a `description` for search / hub rendering.
 */

export type NavIcon =
  | 'home'
  | 'rocket'
  | 'layers'
  | 'workflow'
  | 'play'
  | 'image'
  | 'wallet'
  | 'book'
  | 'history'
  | 'compass'
  | 'cpu'
  | 'users'
  | 'file-text'
  | 'palette'
  | 'app-window'
  | 'globe'
  | 'plug'
  | 'key';

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: NavIcon;
  /**
   * ISO date (YYYY-MM-DD) the item was added. Drives the "New" badge, which
   * auto-expires after NEW_BADGE_DAYS — so badges don't linger for weeks.
   */
  since?: string;
  external?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: 'Get started',
    items: [
      {
        title: 'Overview',
        href: '/docs',
        description: 'What the Esy docs cover and how the API is structured.',
        icon: 'home',
      },
    ],
  },
  {
    title: 'Concepts',
    items: [
      {
        title: 'Workflow schemas',
        href: '/docs/concepts/workflow-schemas',
        description: 'The platform contract every Workflow Template must satisfy.',
        icon: 'layers',
      },
      {
        title: 'Workflow templates',
        href: '/docs/concepts/workflow-templates',
        description: 'Reusable, versioned blueprints that produce a class of artifacts.',
        icon: 'workflow',
      },
      {
        title: 'Template naming',
        href: '/docs/concepts/template-naming',
        description: 'The verb-first id convention and the verb registry — generate invents, build computes, compose writes from sources.',
        icon: 'book',
        since: '2026-07-11',
      },
      {
        title: 'Workflow specifications',
        href: '/docs/concepts/workflow-specifications',
        description: 'Per-run populated instances of a Template. The deterministic blueprint production reads.',
        icon: 'file-text',
      },
      {
        title: 'Workflow versioning',
        href: '/docs/concepts/workflow-versioning',
        description: 'Templates are immutable and versioned; runs pin the exact version they executed for reproducibility.',
        icon: 'history',
      },
      {
        title: 'Runs',
        href: '/docs/concepts/runs',
        description: 'One execution of a workflow template, with cost and step telemetry.',
        icon: 'play',
      },
      {
        title: 'Artifacts',
        href: '/docs/concepts/artifacts',
        description: 'The output of a run — files, metadata, and provenance.',
        icon: 'image',
      },
      {
        title: 'Sub-workflows',
        href: '/docs/concepts/sub-workflows',
        description: 'How a workflow composes another workflow as a child run, with linked artifacts and rolled-up cost.',
        icon: 'workflow',
      },
      {
        title: 'Costs',
        href: '/docs/concepts/costs',
        description: 'How cost is tracked across steps, runs, workflows, and projects.',
        icon: 'wallet',
      },
      {
        title: 'Budgets',
        href: '/docs/concepts/budgets',
        description: 'Spend limits at organization, project, or workflow scope, enforced before a run executes.',
        icon: 'wallet',
      },
      {
        title: 'Workers',
        href: '/docs/concepts/workers',
        description: 'Durable principals that run bounded shifts on a schedule and report in plain language.',
        icon: 'users',
      },
      {
        title: 'Assigned work',
        href: '/docs/concepts/assigned-work',
        description: 'Goals and tasks, assignable to you or a worker — measurable, tracked, and accounted for.',
        icon: 'compass',
      },
      {
        title: 'Generation Orders',
        href: '/docs/concepts/orders',
        description: 'One template fanned into N child runs with variation, dedupe keys, and a budget cap.',
        icon: 'layers',
      },
      {
        title: 'Publications',
        href: '/docs/concepts/publications',
        description: 'Headless destinations that own published documents, categories, and a revalidation webhook.',
        icon: 'globe',
      },
      {
        title: 'Outlets',
        href: '/docs/concepts/outlets',
        description: 'Channels for publishing artifacts of any kind from app.esy.com — separate from Publications.',
        icon: 'globe',
      },
    ],
  },
  {
    title: 'Reference',
    items: [
      {
        title: 'API',
        href: '/docs/api',
        description: 'Endpoints, request shapes, and response schemas.',
        icon: 'plug',
      },
      {
        title: 'Publications API',
        href: '/docs/api/publications',
        description: 'Public reads plus authoring endpoints for publications and categories.',
        icon: 'globe',
      },
      {
        title: 'Outlets API',
        href: '/docs/api/outlets',
        description: 'Publish and unpublish artifacts, read the consumer feed, receive signed webhooks.',
        icon: 'globe',
      },
      {
        title: 'Workers API',
        href: '/docs/api/workers',
        description: 'Hire and steer workers: run-now, shift records, and the schedules that wake them.',
        icon: 'users',
      },
      {
        title: 'Planning API',
        href: '/docs/api/planning',
        description: 'Goals, tasks, and Inbox messages — the assignable planning plane.',
        icon: 'compass',
      },
      {
        title: 'API Keys',
        href: '/docs/api/api-keys',
        description: 'Machine credentials — create, workspace-bind, authenticate, and revoke.',
        icon: 'key',
      },
      {
        title: 'Changelog',
        href: '/docs/changelog',
        description: 'API and platform changes over time.',
        icon: 'history',
      },
    ],
  },
  {
    title: 'Integrations',
    items: [
      {
        title: 'Beehiiv (newsletters)',
        href: '/docs/integrations/beehiiv',
        description:
          'Connect a publication to your Beehiiv newsletter — articles become email-safe drafts you send from Beehiiv.',
        icon: 'plug',
      },
    ],
  },
  {
    title: 'Guides',
    items: [
      {
        title: 'All guides',
        href: '/docs/guides',
        description: 'Walkthroughs for common Esy workflows.',
        icon: 'compass',
      },
      {
        title: 'Generate clip art',
        href: '/docs/guides/generate-clip-art-asset',
        description: 'Run the clip-art workflow end-to-end.',
        icon: 'image',
      },
      {
        title: 'Compose with artifact inputs',
        href: '/docs/guides/compose-with-artifact-inputs',
        description: 'Let a workflow accept an existing artifact as input — supply one or generate it.',
        icon: 'workflow',
      },
      {
        title: 'Connect a consumer site',
        href: '/docs/guides/connect-a-consumer-site',
        description: 'Render a public publication and verify Esy’s revalidation webhooks with HMAC.',
        icon: 'plug',
      },
      {
        title: 'Send articles to Beehiiv',
        href: '/docs/guides/send-articles-to-beehiiv',
        description: 'Connect a publication to Beehiiv and turn any article into a reviewed email draft.',
        icon: 'globe',
      },
    ],
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'Open the app',
        href: 'https://app.esy.com',
        description: 'Manage projects, runs, and costs in the Esy dashboard.',
        icon: 'app-window',
        external: true,
      },
      {
        title: 'Esy on the web',
        href: 'https://esy.com',
        description: 'Marketing site, essays, templates, and glossary.',
        icon: 'globe',
        external: true,
      },
    ],
  },
];

/**
 * "New" badge standard.
 *
 * A nav item shows NEW for exactly ONE WEEK after its `since` date, then the
 * badge auto-expires. The window is strict: an item whose `since` is 7+ days
 * old is no longer new (see `isItemNew`).
 *
 * Rationale: the badge exists to catch a returning reader up on what changed
 * since their last visit — it must mean *genuinely recent*. A week is the right
 * horizon: long enough that a weekly visitor sees each addition at least once,
 * short enough that nothing week-old still claims to be new. (It was 21 days,
 * which left a month-old page badged.)
 *
 * `since` is the date the page went live. Set it when adding an item; never
 * bump it to re-badge an old page — that is what a changelog entry is for.
 */
export const NEW_BADGE_DAYS = 7;

/**
 * Whether an item should show the "New" badge: it has a `since` date in the past
 * and within the freshness window (strictly less than NEW_BADGE_DAYS old). Time-
 * based so badges retire on their own instead of lingering until someone
 * remembers to delete the flag.
 */
export function isItemNew(item: NavItem, now: Date = new Date()): boolean {
  if (!item.since) return false;
  const since = new Date(item.since);
  if (Number.isNaN(since.getTime())) return false;
  const ageMs = now.getTime() - since.getTime();
  return ageMs >= 0 && ageMs < NEW_BADGE_DAYS * 24 * 60 * 60 * 1000;
}

/** Flat list of every nav item across all sections. */
export const allNavItems: NavItem[] = navigation.flatMap((s) => s.items);

/** Look up a nav item by its href (exact match, ignoring trailing slash). */
export function getNavItemByHref(href: string): NavItem | undefined {
  const norm = (h: string) => (h.endsWith('/') && h.length > 1 ? h.slice(0, -1) : h);
  const target = norm(href);
  return allNavItems.find((item) => norm(item.href) === target);
}

/** Internal-only items, used to derive prev/next page navigation. */
export const orderedInternalPages: NavItem[] = allNavItems.filter((item) => !item.external);

/** Get the items immediately before/after a given href in the flat order. */
export function getAdjacentPages(currentHref: string): {
  prev: NavItem | null;
  next: NavItem | null;
} {
  const norm = (h: string) => (h.endsWith('/') && h.length > 1 ? h.slice(0, -1) : h);
  const target = norm(currentHref);
  const i = orderedInternalPages.findIndex((p) => norm(p.href) === target);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? orderedInternalPages[i - 1] : null,
    next: i < orderedInternalPages.length - 1 ? orderedInternalPages[i + 1] : null,
  };
}
