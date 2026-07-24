'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import WorkflowCircuit from '@/components/ArtifactDetailTemplate/WorkflowCircuit';
import { getCatalogEntry, toPipelineStages } from '@/lib/workflow-catalog';
import './WorkflowRunnerDemo.css';

/**
 * WorkflowRunnerDemo — reusable, drop-in "watch this workflow run" card.
 *
 * Wraps the animated WorkflowCircuit (the runner visualization from the
 * workflow detail pages) in a self-contained console-style card, sourced
 * from the live workflow catalog by id. Default is the flagship
 * Generate Clip Art Asset workflow, but any published catalog id works,
 * so the same card can be reused across the site (homepage, docs,
 * category landings, agentic posts).
 */

interface WorkflowRunnerDemoProps {
  /** Catalog workflow id (also the /workflows slug). */
  workflowId?: string;
  /** Override the "open workflow" link target; defaults to /workflows/{id}. */
  href?: string;
  /** Extra content rendered inside the card, below the circuit (e.g. an intake → artifact strip). */
  children?: React.ReactNode;
  className?: string;
}

const WorkflowRunnerDemo: React.FC<WorkflowRunnerDemoProps> = ({
  workflowId = 'generate-clip-art-asset',
  href,
  children,
  className = '',
}) => {
  const entry = getCatalogEntry(workflowId);
  // Only published catalog workflows can render a live runner; bail quietly
  // so a stale id never breaks the page that embeds the demo.
  if (!entry) return null;

  const stages = toPipelineStages(entry);
  const target = href ?? `/workflows/${entry.id}/`;

  return (
    <div className={`wrd-card ${className}`}>
      {/* Console header — reads like a run in progress, not a static diagram */}
      <div className="wrd-header">
        <div className="wrd-header-id">
          <span className="wrd-live" aria-hidden="true" />
          <span className="wrd-name">{entry.name}</span>
          <span className="wrd-version">v{entry.version}</span>
        </div>
        <Link href={target} className="wrd-open">
          Open workflow
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="wrd-body">
        <WorkflowCircuit stages={stages} />
      </div>

      {children}
    </div>
  );
};

export default WorkflowRunnerDemo;
