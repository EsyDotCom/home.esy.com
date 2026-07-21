import type { Template, WorkflowStage } from '@/lib/templates/types';

export type { WorkflowStage };

export interface WorkflowCircuitProps {
  stages: WorkflowStage[];
  className?: string;
}

export interface ArtifactDetailTemplateProps {
  template: Template;
  relatedTemplates: Template[];
  // Public contract page for this workflow (registry-rendered). When present,
  // the hero gains a "Full contract" link and the version note below the CTAs.
  contractHref?: string;
  contractVersion?: string;
}
