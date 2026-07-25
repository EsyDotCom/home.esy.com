/**
 * PARKED — data for the shelved Workflows nav panel
 * (`components/Home/WorkflowsNavPanel.tsx`). Nothing renders this today; see
 * that file for why the panel is parked and what has to be true to revive it.
 */
import { getWorkflowTemplates, getWorkflowTemplatesByTag } from '@/lib/templates';

export type WorkflowNavCategoryId =
  | 'visual-essays'
  | 'infographics'
  | 'clip-art'
  | 'academic-essays';

export type WorkflowNavCategory = {
  id: WorkflowNavCategoryId;
  label: string;
  desc: string;
  href: string;
  count: number;
};

// Visual essays is the one category without a single canonical tag: the route
// takes anything tagged "visual" that isn't an infographic. Mirrored from the
// route so the panel's count can't diverge from the page it links to.
function countVisualEssayWorkflows(): number {
  return getWorkflowTemplates().filter(
    (template) =>
      template.tags.some((tag) => tag.includes('visual')) &&
      !template.tags.includes('infographic'),
  ).length;
}

// The four SEO category landing pages under /workflows. Each count uses the
// exact predicate its route uses, so the panel promises what the page delivers.
export const WORKFLOW_NAV_CATEGORIES: WorkflowNavCategory[] = [
  {
    id: 'visual-essays',
    label: 'Visual Essays',
    desc: 'Narrative research with generated imagery',
    href: '/workflows/visual-essays/',
    count: countVisualEssayWorkflows(),
  },
  {
    id: 'infographics',
    label: 'Infographics',
    desc: 'Cited data rendered to spec',
    href: '/workflows/infographics/',
    count: getWorkflowTemplatesByTag('infographic').length,
  },
  {
    id: 'clip-art',
    label: 'Clip Art',
    desc: 'Transparent assets, QA gated',
    href: '/workflows/clip-art/',
    count: getWorkflowTemplatesByTag('clip-art').length,
  },
  {
    id: 'academic-essays',
    label: 'Academic Essays',
    desc: 'Structured argument with sources',
    href: '/workflows/academic-essays/',
    count: getWorkflowTemplatesByTag('essay').length,
  },
];

