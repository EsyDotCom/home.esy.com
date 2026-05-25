'use client';

import React from 'react';
import { WorkflowCategoryPage } from '@/components/templates';
import { getWorkflowTemplatesByTag } from '@/lib/templates';

export default function AcademicEssaysClient() {
  const templates = getWorkflowTemplatesByTag('essay');

  return (
    <WorkflowCategoryPage
      title="Academic Essay Templates"
      breadcrumbLabel="Academic Essays"
      subtitle="Structured workflows for every major essay type — research, outlining, drafting, and citation formatting, handled automatically."
      templates={templates}
    />
  );
}
