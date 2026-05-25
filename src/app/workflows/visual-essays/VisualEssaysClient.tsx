'use client';

import React from 'react';
import { WorkflowCategoryPage } from '@/components/templates';
import { getWorkflowTemplates } from '@/lib/templates';

export default function VisualEssaysClient() {
  // Visual essays are the templates that don't fall into essay or infographic categories
  // For now, filter by tags — future visual essay workflow templates will include the 'visual essay' tag
  const templates = getWorkflowTemplates().filter(
    (t) =>
      t.tags.some((tag) => tag.includes('visual')) &&
      !t.tags.includes('infographic')
  );

  return (
    <WorkflowCategoryPage
      title="Visual Essay Templates"
      breadcrumbLabel="Visual Essays"
      subtitle="Scroll-driven narratives that combine research, writing, and interactive visualizations into a single explorable artifact."
      templates={templates}
    />
  );
}
