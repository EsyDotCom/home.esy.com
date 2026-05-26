'use client';

import React from 'react';
import { WorkflowCategoryPage } from '@/components/templates';
import { getWorkflowTemplatesByTag } from '@/lib/templates';

export default function ClipArtClient() {
  const templates = getWorkflowTemplatesByTag('clip-art');

  return (
    <WorkflowCategoryPage
      title="Clip Art Workflow Templates"
      breadcrumbLabel="Clip Art"
      subtitle="Generate isolated clip art assets with style control, background removal, and provenance."
      templates={templates}
    />
  );
}
