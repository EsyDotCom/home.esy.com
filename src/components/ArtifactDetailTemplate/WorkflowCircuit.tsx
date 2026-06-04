'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import type { WorkflowCircuitProps, WorkflowStage } from './types';

/**
 * WorkflowCircuit — Data-driven pipeline visualization
 *
 * Renders an animated SVG showing workflow stages as nodes connected by
 * teal trace lines. A teal energy ball flows through each stage, triggers
 * check marks, and pulses at the final output node.
 *
 * - Horizontal on desktop (>=768px), vertical on mobile
 * - Continuous animation loop via requestAnimationFrame
 * - IntersectionObserver triggers start
 * - prefers-reduced-motion: static completed state
 */

// ─── Theme Tokens ────────────────────────────────────────────────
const colors = {
  nodeFill: '#FFFFFF',
  nodeStroke: 'rgba(10, 37, 64, 0.1)',
  nodeStrokeActive: 'rgba(0, 168, 150, 0.45)',
  textPrimary: '#0A2540',
  textSecondary: '#6C757D',
  traceDefault: 'rgba(10, 37, 64, 0.06)',
  traceActive: 'rgba(0, 168, 150, 0.35)',
  ballColor: '#00A896',
  glowColor: 'rgba(0, 168, 150, 0.25)',
  checkColor: '#2A9D8F',
};

// ─── Layout Constants ────────────────────────────────────────────
// Nodes are taller/wider than the original flat chips so each station can carry
// a permanent sublabel + a numbered badge (the data used to live only in a hover
// tooltip). Geometry stays responsive (horizontal desktop / vertical mobile).
const NODE_W = 174;
const NODE_H = 80;
const NODE_RX = 14;
const NODE_GAP = 46; // gap between nodes (horizontal)
const VERT_GAP = 44; // gap between nodes (vertical)
const PAD = 30;
const TOOLTIP_W = 280;
const TOOLTIP_PAD = 12;
const TOOLTIP_LINE_H = 16;

// ─── Animation Constants ─────────────────────────────────────────
const CYCLE_MS = 5400;
const DWELL_FRAC = 0.06; // fraction of cycle to dwell at a node

// ─── Helpers ─────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(t: number) {
  return Math.max(0, Math.min(1, t));
}

// Keep the in-node sublabel to one tidy line; the full text still lives in the
// node's hover <title>. Cuts at a word boundary so we don't slice mid-word.
function truncateLabel(text: string, maxChars = 26): string {
  if (text.length <= maxChars) return text;
  const slice = text.slice(0, maxChars);
  const lastSpace = slice.lastIndexOf(' ');
  return `${slice.slice(0, lastSpace > 12 ? lastSpace : maxChars).trimEnd()}…`;
}

function wrapTooltipText(text: string, maxChars = 34): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) {
    lines.push(current);
  }

  return lines;
}

// ─── Component ───────────────────────────────────────────────────
const WorkflowCircuit: React.FC<WorkflowCircuitProps> = ({ stages, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  const n = stages.length;

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Responsive: horizontal vs vertical
  useEffect(() => {
    const check = () => setIsHorizontal(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Animation loop
  const tick = useCallback(
    (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      setPhase((elapsed % CYCLE_MS) / CYCLE_MS);
      animRef.current = requestAnimationFrame(tick);
    },
    []
  );

  useEffect(() => {
    if (isVisible && !reducedMotion) {
      animRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isVisible, reducedMotion, tick]);

  // ─── Geometry ───────────────────────────────────────────
  const nodePositions = useMemo(() => {
    return stages.map((_, i) => {
      if (isHorizontal) {
        const x = PAD + NODE_W / 2 + i * (NODE_W + NODE_GAP);
        const y = PAD + NODE_H / 2 + 12; // extra top for grid
        return { x, y };
      } else {
        const x = PAD + NODE_W / 2;
        const y = PAD + NODE_H / 2 + 12 + i * (NODE_H + VERT_GAP);
        return { x, y };
      }
    });
  }, [stages, isHorizontal]);

  const svgW = isHorizontal
    ? PAD * 2 + n * NODE_W + (n - 1) * NODE_GAP
    : PAD * 2 + NODE_W;
  const svgH = isHorizontal
    ? PAD * 2 + NODE_H + 24
    : PAD * 2 + n * NODE_H + (n - 1) * VERT_GAP + 24;

  // ─── Animation state per node ───────────────────────────
  // The ball travels through n segments (n-1 edges + arrival).
  // Each segment takes equal time, minus a small dwell at each node.
  const segmentFrac = 1 / n; // fraction of cycle per segment

  const getActiveNodeIndex = (p: number): number => {
    return Math.min(Math.floor(p / segmentFrac), n - 1);
  };

  const isNodeChecked = (i: number, p: number): boolean => {
    if (reducedMotion) return true;
    // Node is checked once the ball has passed its center
    const nodeArrival = i * segmentFrac + DWELL_FRAC;
    return p >= nodeArrival;
  };

  const isNodeActive = (i: number, p: number): boolean => {
    if (reducedMotion) return i === n - 1;
    const active = getActiveNodeIndex(p);
    return i === active;
  };

  // Ball position along the path
  const getBallPos = (p: number): { x: number; y: number; opacity: number } => {
    if (reducedMotion || n < 2) {
      const last = nodePositions[n - 1];
      return { x: last.x, y: last.y, opacity: 0 };
    }

    // Map phase to position between nodes
    const totalSegments = n - 1;
    // Compress travel into 85% of cycle, last 15% is dwell at final + fade
    const travelFrac = 0.82;
    const fadeStart = 0.88;

    if (p >= fadeStart) {
      // Fade out at final node
      const last = nodePositions[n - 1];
      const fadeProgress = clamp01((p - fadeStart) / (1 - fadeStart));
      return { x: last.x, y: last.y, opacity: 1 - fadeProgress };
    }

    if (p >= travelFrac) {
      // Dwell at final
      const last = nodePositions[n - 1];
      return { x: last.x, y: last.y, opacity: 1 };
    }

    const normalized = clamp01(p / travelFrac);
    const segIdx = Math.min(Math.floor(normalized * totalSegments), totalSegments - 1);
    const segT = clamp01((normalized * totalSegments) - segIdx);

    const from = nodePositions[segIdx];
    const to = nodePositions[segIdx + 1];

    // Ease-in-out per segment
    const eased = segT < 0.5
      ? 2 * segT * segT
      : 1 - Math.pow(-2 * segT + 2, 2) / 2;

    return {
      x: lerp(from.x, to.x, eased),
      y: lerp(from.y, to.y, eased),
      opacity: 1,
    };
  };

  const isFinalPulsing = (p: number): boolean => {
    if (reducedMotion) return false;
    return p >= 0.82 && p < 0.92;
  };

  const ballPos = getBallPos(phase);
  const tooltipStage =
    hoveredStage !== null && stages[hoveredStage]?.sublabel
      ? stages[hoveredStage]
      : null;
  const tooltipPos =
    hoveredStage !== null && nodePositions[hoveredStage]
      ? nodePositions[hoveredStage]
      : null;
  const tooltipLines = tooltipStage?.sublabel
    ? wrapTooltipText(tooltipStage.sublabel)
    : [];
  const tooltipH = TOOLTIP_PAD * 2 + 18 + tooltipLines.length * TOOLTIP_LINE_H;
  const tooltipX = tooltipPos
    ? Math.max(8, Math.min(tooltipPos.x - TOOLTIP_W / 2, svgW - TOOLTIP_W - 8))
    : 0;
  const tooltipY = tooltipPos
    ? tooltipPos.y - NODE_H / 2 - tooltipH - 14
    : 0;

  // Unique filter IDs to avoid conflicts
  const filterId = 'wc-ball-glow';
  const outputFilterId = 'wc-output-glow';
  const checkFilterId = 'wc-check-glow';
  const nodeShadowId = 'wc-node-shadow';

  return (
    <div
      ref={containerRef}
      className={`adt-workflow-circuit ${className}`}
      style={{ width: '100%', maxWidth: svgW, margin: '0 auto' }}
    >
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        width="100%"
        aria-hidden="true"
        role="img"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {/* Ball glow */}
          <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Output pulse glow */}
          <filter id={outputFilterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Check glow */}
          <filter id={checkFilterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Soft node drop shadow — lifts each station off the band. */}
          <filter id={nodeShadowId} x="-40%" y="-40%" width="180%" height="200%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#0A2540" floodOpacity="0.08" />
          </filter>
          {/* Subtle vertical fill so nodes read as raised cards, not flat boxes. */}
          <linearGradient id="wc-node-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F6F9FB" />
          </linearGradient>
          {/* Trace gradient */}
          {isHorizontal ? (
            <linearGradient id="wc-trace-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.traceActive} stopOpacity={0.4} />
              <stop offset="100%" stopColor={colors.traceActive} stopOpacity={1} />
            </linearGradient>
          ) : (
            <linearGradient id="wc-trace-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.traceActive} stopOpacity={0.4} />
              <stop offset="100%" stopColor={colors.traceActive} stopOpacity={1} />
            </linearGradient>
          )}
        </defs>

        {/* Trace lines between nodes — a static base rail plus a dashed overlay
            that flows continuously (when motion is allowed), so the whole
            pipeline reads as "alive" rather than relying only on the single ball. */}
        {nodePositions.map((pos, i) => {
          if (i === 0) return null;
          const prev = nodePositions[i - 1];
          const checked = isNodeChecked(i, phase);
          const x1 = isHorizontal ? prev.x + NODE_W / 2 : prev.x;
          const y1 = isHorizontal ? prev.y : prev.y + NODE_H / 2;
          const x2 = isHorizontal ? pos.x - NODE_W / 2 : pos.x;
          const y2 = isHorizontal ? pos.y : pos.y - NODE_H / 2;
          return (
            <g key={`trace-${i}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={checked ? colors.traceActive : colors.traceDefault}
                strokeWidth="2"
                strokeLinecap="round"
                style={{ transition: 'stroke 0.4s ease' }}
              />
              {!reducedMotion && (
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={colors.ballColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="2 12"
                  opacity={checked ? 0.65 : 0.3}
                  style={{ transition: 'opacity 0.4s ease' }}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-28"
                    dur="1.1s"
                    repeatCount="indefinite"
                  />
                </line>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {stages.map((stage, i) => {
          const pos = nodePositions[i];
          const checked = isNodeChecked(i, phase);
          const active = isNodeActive(i, phase);
          const finalPulse = stage.isFinal && isFinalPulsing(phase);

          return (
            <g
              key={stage.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              onMouseEnter={() => setHoveredStage(i)}
              onMouseLeave={() => setHoveredStage(null)}
              style={{ cursor: stage.sublabel ? 'help' : 'default' }}
            >
              {/* Final node accent glow ring */}
              {stage.isFinal && (
                <rect
                  x={-NODE_W / 2 - 4}
                  y={-NODE_H / 2 - 4}
                  width={NODE_W + 8}
                  height={NODE_H + 8}
                  rx={NODE_RX + 2}
                  fill="none"
                  stroke={colors.glowColor}
                  strokeWidth="2"
                  opacity={finalPulse ? 1 : 0.5}
                  filter={finalPulse ? `url(#${outputFilterId})` : undefined}
                  style={{ transition: 'opacity 0.25s ease' }}
                />
              )}

              {/* Node background — raised card (gradient + soft shadow). */}
              <rect
                x={-NODE_W / 2}
                y={-NODE_H / 2}
                width={NODE_W}
                height={NODE_H}
                rx={NODE_RX}
                fill="url(#wc-node-fill)"
                stroke={
                  active
                    ? colors.nodeStrokeActive
                    : checked
                      ? colors.checkColor + '40'
                      : colors.nodeStroke
                }
                strokeWidth={active ? 1.5 : 1}
                filter={`url(#${nodeShadowId})`}
                style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
              />
              {stage.sublabel && (
                <title>{`${stage.label}: ${stage.sublabel}`}</title>
              )}

              {/* Top accent bar — fills in as the stage is reached (progress cue). */}
              <rect
                x={-16}
                y={-NODE_H / 2 - 1}
                width={32}
                height={3}
                rx={1.5}
                fill={colors.ballColor}
                opacity={active ? 1 : checked ? 0.55 : 0.18}
                style={{ transition: 'opacity 0.3s ease' }}
              />

              {/* Numbered station badge (top-left, straddling the border). */}
              <g transform={`translate(${-NODE_W / 2 + 15}, ${-NODE_H / 2})`}>
                <circle
                  r="11"
                  fill={checked || active ? colors.ballColor : '#FFFFFF'}
                  stroke={checked || active ? colors.ballColor : colors.nodeStroke}
                  strokeWidth="1"
                  style={{ transition: 'fill 0.3s ease, stroke 0.3s ease' }}
                />
                <text
                  x={0}
                  y={0.5}
                  fill={checked || active ? '#FFFFFF' : colors.textSecondary}
                  fontSize="10"
                  fontWeight="700"
                  fontFamily="Inter, -apple-system, sans-serif"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {String(i + 1).padStart(2, '0')}
                </text>
              </g>

              {/* Label */}
              <text
                x={0}
                y={stage.sublabel ? -8 : 0}
                fill={colors.textPrimary}
                fontSize="13.5"
                fontWeight="600"
                fontFamily="Inter, -apple-system, sans-serif"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {stage.label}
              </text>

              {/* Permanent sublabel — surfaces detail that used to be hover-only. */}
              {stage.sublabel && (
                <text
                  x={0}
                  y={12}
                  fill={colors.textSecondary}
                  fontSize="10.5"
                  fontWeight="400"
                  fontFamily="Inter, -apple-system, sans-serif"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {truncateLabel(stage.sublabel)}
                </text>
              )}

              {/* Check mark — only on the final (output) node once reached. */}
              {checked && stage.isFinal && (
                <g
                  transform={`translate(${NODE_W / 2 - 12}, ${-NODE_H / 2 - 6})`}
                  opacity={0.9}
                  filter={`url(#${checkFilterId})`}
                >
                  <circle r="8" fill={colors.checkColor} />
                  <path
                    d="M-3,0 L-1,3 L3.5,-2.5"
                    stroke="#fff"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              )}
            </g>
          );
        })}

        {/* Visible hover tooltip */}
        {tooltipStage && tooltipPos && (
          <g
            transform={`translate(${tooltipX}, ${tooltipY})`}
            style={{ pointerEvents: 'none' }}
          >
            <rect
              width={TOOLTIP_W}
              height={tooltipH}
              rx="12"
              fill="#FFFFFF"
              stroke="rgba(10, 37, 64, 0.12)"
              filter={`url(#${outputFilterId})`}
            />
            <text
              x={TOOLTIP_PAD}
              y={TOOLTIP_PAD + 12}
              fill={colors.textPrimary}
              fontSize="11.5"
              fontWeight="700"
              fontFamily="Inter, -apple-system, sans-serif"
            >
              {tooltipStage.label}
            </text>
            {tooltipLines.map((line, i) => (
              <text
                key={line}
                x={TOOLTIP_PAD}
                y={TOOLTIP_PAD + 32 + i * TOOLTIP_LINE_H}
                fill={colors.textSecondary}
                fontSize="11"
                fontWeight="400"
                fontFamily="Inter, -apple-system, sans-serif"
              >
                {line}
              </text>
            ))}
          </g>
        )}

        {/* Animated energy ball */}
        {isVisible && ballPos.opacity > 0 && (
          <circle
            cx={ballPos.x}
            cy={ballPos.y}
            r="5.5"
            fill={colors.ballColor}
            opacity={ballPos.opacity}
            filter={`url(#${filterId})`}
          />
        )}
      </svg>
    </div>
  );
};

export default WorkflowCircuit;
