// Agents Reference Book Navigation Structure
// A hierarchical navigation tree that drives sidebar, breadcrumbs, prev/next, and SEO

export type PageType = 'hub' | 'canonical' | 'term' | 'pattern' | 'workflow' | 'guide';

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  type: PageType;
  icon?: string;
  isNew?: boolean;
}

export interface NavSection {
  title: string;
  description?: string;
  items: NavItem[];
}

// Main navigation structure - drives everything
export const agentsNavigation: NavSection[] = [
  {
    title: "Overview",
    description: "Start here",
    items: [
      {
        title: "AI Agents Reference",
        href: "/ai-agents",
        description: "A reference guide to AI agents and orchestration",
        type: "hub",
        icon: "book",
      },
      {
        title: "What are AI Agents?",
        href: "/ai-agents/what-are-ai-agents",
        description: "Definition, capabilities, and the agentic loop",
        type: "canonical",
        icon: "bot",
        isNew: true,
      },
    ],
  },
  {
    title: "Core Terms",
    description: "Foundational definitions",
    items: [
      {
        title: "Agentic Workflow",
        href: "/ai-agents/terms/agentic-workflow",
        description: "Multi-step AI task automation",
        type: "term",
        icon: "workflow",
      },
      {
        title: "Agentic Loop",
        href: "/ai-agents/terms/agentic-loop",
        description: "The perceive-reason-act-evaluate cycle",
        type: "term",
        icon: "refresh",
      },
      {
        title: "Tool Use",
        href: "/ai-agents/terms/tool-use",
        description: "How agents interact with external systems",
        type: "term",
        icon: "wrench",
      },
      {
        title: "Memory",
        href: "/ai-agents/terms/memory",
        description: "Short-term and long-term context retention",
        type: "term",
        icon: "database",
      },
      {
        title: "Planning",
        href: "/ai-agents/terms/planning",
        description: "Goal decomposition and task sequencing",
        type: "term",
        icon: "map",
      },
      {
        title: "Orchestration",
        href: "/ai-agents/terms/orchestration",
        description: "Coordinating multiple agents or steps",
        type: "term",
        icon: "network",
      },
      {
        title: "Human-in-the-Loop",
        href: "/ai-agents/terms/human-in-the-loop",
        description: "Human oversight in autonomous systems",
        type: "term",
        icon: "user-check",
      },
    ],
  },
  {
    title: "Architecture Patterns",
    description: "Proven design approaches",
    items: [
      {
        title: "Planner-Executor",
        href: "/ai-agents/patterns/planner-executor",
        description: "Separate planning from execution",
        type: "pattern",
        icon: "git-branch",
      },
      {
        title: "Router-Supervisor",
        href: "/ai-agents/patterns/router-supervisor",
        description: "Dynamic task routing with oversight",
        type: "pattern",
        icon: "git-merge",
      },
      {
        title: "Reflect-Revise",
        href: "/ai-agents/patterns/reflect-revise",
        description: "Self-evaluation and iterative improvement",
        type: "pattern",
        icon: "repeat",
      },
    ],
  },
  {
    title: "Esy Workflows",
    description: "Implementation examples",
    items: [
      {
        title: "Gated Agent Pipeline",
        href: "/ai-agents/workflows/gated-agent-pipeline",
        description: "Quality gates between agent steps",
        type: "workflow",
        icon: "shield-check",
      },
      {
        title: "Research Agent Workflow",
        href: "/ai-agents/workflows/research-agent-workflow",
        description: "End-to-end research automation",
        type: "workflow",
        icon: "search",
      },
    ],
  },
];

// Flat list of all pages for easy lookup
export const allAgentPages: NavItem[] = agentsNavigation.flatMap(
  (section) => section.items
);

// Get page by href
export function getAgentPageByHref(href: string): NavItem | undefined {
  return allAgentPages.find((page) => page.href === href);
}

// Get section by page href
export function getSectionByPageHref(href: string): NavSection | undefined {
  return agentsNavigation.find((section) =>
    section.items.some((item) => item.href === href)
  );
}

// Get adjacent pages for prev/next navigation
export function getAdjacentAgentPages(currentHref: string): {
  prev: NavItem | null;
  next: NavItem | null;
} {
  const index = allAgentPages.findIndex((page) => page.href === currentHref);
  return {
    prev: index > 0 ? allAgentPages[index - 1] : null,
    next: index < allAgentPages.length - 1 ? allAgentPages[index + 1] : null,
  };
}

// Generate breadcrumbs from href
export function getAgentBreadcrumbs(
  href: string
): { title: string; href: string }[] {
  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "AI Agents", href: "/ai-agents" },
  ];

  if (href !== "/ai-agents") {
    const page = getAgentPageByHref(href);
    if (page) {
      // Add type-based intermediate breadcrumb
      if (page.type === "term") {
        breadcrumbs.push({ title: "Terms", href: "/ai-agents#terms" });
      } else if (page.type === "pattern") {
        breadcrumbs.push({ title: "Patterns", href: "/ai-agents#patterns" });
      } else if (page.type === "workflow") {
        breadcrumbs.push({ title: "Workflows", href: "/ai-agents#workflows" });
      }
      breadcrumbs.push({ title: page.title, href: page.href });
    }
  }

  return breadcrumbs;
}

// Get pages by type
export function getAgentPagesByType(type: PageType): NavItem[] {
  return allAgentPages.filter((page) => page.type === type);
}

// Get related terms for a page (for "Related Terms" sections)
export function getRelatedTerms(currentHref: string, termSlugs: string[]): NavItem[] {
  const terms = getAgentPagesByType('term');
  return terms.filter((term) => {
    const slug = term.href.split('/').pop();
    return slug && termSlugs.includes(slug) && term.href !== currentHref;
  });
}

// Search index generation (for client-side search)
export interface SearchIndexItem {
  title: string;
  href: string;
  description: string;
  section: string;
  type: PageType;
  keywords?: string[];
}

export function generateSearchIndex(): SearchIndexItem[] {
  return agentsNavigation.flatMap((section) =>
    section.items.map((item) => ({
      title: item.title,
      href: item.href,
      description: item.description || '',
      section: section.title,
      type: item.type,
    }))
  );
}
