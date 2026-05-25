'use client';

import React from 'react';
import { WorkflowCategoryPage } from '@/components/templates';
import { getWorkflowTemplatesByTag } from '@/lib/templates';

export default function InfographicsClient() {
  const templates = getWorkflowTemplatesByTag('infographic');

  return (
    <WorkflowCategoryPage
      title="Infographic Templates"
      breadcrumbLabel="Infographics"
      subtitle="Turn citations, datasets, and research concepts into publication-ready infographics — no prompting required."
      templates={templates}
    />
  );
}
