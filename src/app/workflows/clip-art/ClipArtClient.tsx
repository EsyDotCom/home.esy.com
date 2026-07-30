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
      guide={{
        href: '/workflows/clip-art/cutout-quality-system/',
        eyebrow: 'Engineering Notebook',
        title: 'The Cutout Quality System',
        description:
          'How Esy makes clip art that is truly transparent: the green-screen render pipeline, the despill math, the perceptual quality gates, the self-healing retry ladder — and the eight experiment waves that taught us every rule. Written for an engineer taking over the system.',
      }}
    />
  );
}
