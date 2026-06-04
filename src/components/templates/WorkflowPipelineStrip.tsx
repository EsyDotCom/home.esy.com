'use client';

import React from 'react';
import type { WorkflowStage } from '@/lib/templates';

/**
 * WorkflowPipelineStrip — the shared card-level pipeline vocabulary.
 *
 * A compact, light-theme sibling of the Factory's assembly rail and the detail
 * page's WorkflowCircuit: labeled nodes joined by a flowing accent connector,
 * with the final (artifact) node accented. Used on every card surface
 * (/workflows index, category pages, related grids) so browsing → detail speaks
 * one continuous visual language. CSS-driven (no rAF) so a dense grid stays cheap;
 * the connector flow is disabled under prefers-reduced-motion (see globals.css).
 */

// Navy-calm light palette — these card surfaces are always light, so the tokens
// are intentionally hardcoded rather than themed.
const ACCENT = '#00A896';
const NODE_IDLE = 'rgba(10, 37, 64, 0.18)';
const LABEL_IDLE = 'rgba(10, 37, 64, 0.55)';
const COUNT_COLOR = 'rgba(10, 37, 64, 0.35)';

interface WorkflowPipelineStripProps {
  stages: WorkflowStage[];
  // Hover/emphasis state from the parent card — brightens non-final nodes and
  // intensifies the connector so the whole line "lights up" on card hover.
  active?: boolean;
  // Trailing "N stages" affordance (used on the index where space allows).
  showCount?: boolean;
}

export default function WorkflowPipelineStrip({
  stages,
  active = false,
  showCount = false,
}: WorkflowPipelineStripProps) {
  if (!stages || stages.length === 0) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.375rem' }}>
      {stages.map((stage, i) => {
        const lit = stage.isFinal || active;
        return (
          <React.Fragment key={stage.id}>
            <span
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
              title={stage.sublabel ? `${stage.label}: ${stage.sublabel}` : stage.label}
            >
              <span
                style={{
                  width: stage.isFinal ? '9px' : '7px',
                  height: stage.isFinal ? '9px' : '7px',
                  borderRadius: '50%',
                  background: lit ? ACCENT : NODE_IDLE,
                  boxShadow: stage.isFinal ? `0 0 8px ${ACCENT}55` : 'none',
                  transition: 'all 0.3s ease',
                  transitionDelay: active ? `${i * 60}ms` : '0ms',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: stage.isFinal ? 600 : 500,
                  color: stage.isFinal ? ACCENT : LABEL_IDLE,
                  whiteSpace: 'nowrap',
                }}
              >
                {stage.label}
              </span>
            </span>
            {i < stages.length - 1 && (
              <span
                className={`esy-pipe-connector${active ? ' esy-pipe-connector--active' : ''}`}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
      {showCount && (
        <span style={{ marginLeft: '0.25rem', fontSize: '0.6875rem', color: COUNT_COLOR }}>
          {stages.length} stages
        </span>
      )}
    </div>
  );
}
