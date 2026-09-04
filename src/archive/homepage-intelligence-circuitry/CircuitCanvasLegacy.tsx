'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * CircuitCanvasLegacy - Original animated SVG circuit visualization
 * 
 * Visual metaphor: Intelligence flows through quality gates
 * like electricity through a circuit board.
 * 
 * Features:
 * - Animated pulse traveling along traces
 * - Nodes that "activate" when pulse arrives
 * - Output artifact card that "prints in"
 * - Reduced motion support
 * 
 * NOTE: This is the original/legacy version preserved for reference.
 * The active version is CircuitCanvas.tsx with the redesigned pipeline.
 */

interface CircuitCanvasLegacyProps {
  className?: string;
}

const CircuitCanvasLegacy: React.FC<CircuitCanvasLegacyProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection observer to start animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`circuit-canvas-container ${className}`}>
      <svg 
        viewBox="0 0 400 520" 
        className={`circuit-canvas ${isVisible ? 'circuit-canvas--active' : ''}`}
        aria-hidden="true"
        role="img"
      >
        {/* Definitions */}
        <defs>
          {/* Gradient for traces */}
          <linearGradient id="traceGradientLegacy" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.4)" />
          </linearGradient>

          {/* Glow filter for active elements */}
          <filter id="nodeGlowLegacy" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pulse glow */}
          <filter id="pulseGlowLegacy" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Main path for pulse animation */}
          <path 
            id="mainPathLegacy" 
            d="M200,60 L200,120 L200,180 L200,240 L120,280 L120,340 L200,380 L200,440"
            fill="none"
          />
          
          {/* Branch path for parallel gate */}
          <path 
            id="branchPathLegacy" 
            d="M200,240 L280,280 L280,340 L200,380"
            fill="none"
          />
        </defs>

        {/* Background grid pattern */}
        <g className="circuit-grid" opacity="0.03">
          {[...Array(20)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 26} x2="400" y2={i * 26} stroke="#fff" strokeWidth="0.5" />
          ))}
          {[...Array(16)].map((_, i) => (
            <line key={`v-${i}`} x1={i * 26} y1="0" x2={i * 26} y2="520" stroke="#fff" strokeWidth="0.5" />
          ))}
        </g>

        {/* Circuit traces */}
        <g className="circuit-traces">
          {/* Main vertical trace */}
          <path 
            d="M200,60 L200,240" 
            className="circuit-trace"
            stroke="url(#traceGradientLegacy)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Branch to left gate */}
          <path 
            d="M200,240 L120,280 L120,340 L200,380" 
            className="circuit-trace circuit-trace--left"
            stroke="url(#traceGradientLegacy)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Branch to right gate */}
          <path 
            d="M200,240 L280,280 L280,340 L200,380" 
            className="circuit-trace circuit-trace--right"
            stroke="url(#traceGradientLegacy)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Final trace to output */}
          <path 
            d="M200,380 L200,440" 
            className="circuit-trace circuit-trace--output"
            stroke="url(#traceGradientLegacy)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Node: Template Intake */}
        <g className="circuit-node circuit-node--intake" transform="translate(200, 60)">
          <rect 
            x="-60" y="-24" 
            width="120" height="48" 
            rx="8" 
            className="circuit-node-bg"
          />
          <circle cx="0" cy="24" r="4" className="circuit-port circuit-port--output" />
          <text x="0" y="4" className="circuit-node-label">Template</text>
          <text x="0" y="16" className="circuit-node-sublabel">Intake</text>
        </g>

        {/* Node: Research Agent */}
        <g className="circuit-node circuit-node--research" transform="translate(200, 180)">
          <rect 
            x="-55" y="-22" 
            width="110" height="44" 
            rx="8" 
            className="circuit-node-bg"
          />
          <circle cx="0" cy="-22" r="4" className="circuit-port circuit-port--input" />
          <circle cx="0" cy="22" r="4" className="circuit-port circuit-port--output" />
          <text x="0" y="4" className="circuit-node-label">Research</text>
        </g>

        {/* Junction point */}
        <circle cx="200" cy="240" r="6" className="circuit-junction" />

        {/* Gate: Evidence (Left) */}
        <g className="circuit-node circuit-node--gate circuit-node--evidence" transform="translate(120, 310)">
          <rect 
            x="-45" y="-22" 
            width="90" height="44" 
            rx="6" 
            className="circuit-node-bg circuit-node-bg--gate"
          />
          <circle cx="0" cy="-22" r="3" className="circuit-port circuit-port--input" />
          <circle cx="0" cy="22" r="3" className="circuit-port circuit-port--output" />
          <text x="0" y="-2" className="circuit-gate-symbol">∧</text>
          <text x="0" y="12" className="circuit-gate-label">Evidence</text>
        </g>

        {/* Gate: Structure (Right) */}
        <g className="circuit-node circuit-node--gate circuit-node--structure" transform="translate(280, 310)">
          <rect 
            x="-45" y="-22" 
            width="90" height="44" 
            rx="6" 
            className="circuit-node-bg circuit-node-bg--gate"
          />
          <circle cx="0" cy="-22" r="3" className="circuit-port circuit-port--input" />
          <circle cx="0" cy="22" r="3" className="circuit-port circuit-port--output" />
          <text x="0" y="-2" className="circuit-gate-symbol">∨</text>
          <text x="0" y="12" className="circuit-gate-label">Structure</text>
        </g>

        {/* Merge junction */}
        <circle cx="200" cy="380" r="6" className="circuit-junction" />

        {/* Node: Output Artifact */}
        <g className="circuit-node circuit-node--output" transform="translate(200, 470)">
          <rect 
            x="-70" y="-30" 
            width="140" height="60" 
            rx="10" 
            className="circuit-node-bg circuit-node-bg--output"
          />
          <circle cx="0" cy="-30" r="4" className="circuit-port circuit-port--input" />
          
          {/* Mini artifact preview */}
          <rect x="-58" y="-18" width="40" height="32" rx="4" className="artifact-preview-thumb" />
          <line x1="-52" y1="-8" x2="-24" y2="-8" className="artifact-preview-line" />
          <line x1="-52" y1="-2" x2="-30" y2="-2" className="artifact-preview-line" />
          <line x1="-52" y1="4" x2="-28" y2="4" className="artifact-preview-line" />
          
          <text x="20" y="-4" className="circuit-node-label circuit-node-label--output">Output</text>
          <text x="20" y="10" className="circuit-node-sublabel">Artifact</text>
        </g>

        {/* Animated pulse - Main path */}
        <g className="circuit-pulse-group">
          <circle r="6" className="circuit-pulse circuit-pulse--main" filter="url(#pulseGlowLegacy)">
            <animateMotion 
              dur="3s" 
              repeatCount="indefinite"
              keyPoints="0;0.3;0.5;0.7;1"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
            >
              <mpath href="#mainPathLegacy" />
            </animateMotion>
          </circle>
        </g>

        {/* Animated pulse - Branch path (delayed) */}
        <g className="circuit-pulse-group circuit-pulse-group--branch">
          <circle r="5" className="circuit-pulse circuit-pulse--branch" filter="url(#pulseGlowLegacy)">
            <animateMotion 
              dur="3s" 
              repeatCount="indefinite"
              begin="0.3s"
              keyPoints="0;0.5;1"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            >
              <mpath href="#branchPathLegacy" />
            </animateMotion>
          </circle>
        </g>
      </svg>

      {/* Decorative corner accents */}
      <div className="circuit-corner circuit-corner--tl" />
      <div className="circuit-corner circuit-corner--tr" />
      <div className="circuit-corner circuit-corner--bl" />
      <div className="circuit-corner circuit-corner--br" />
    </div>
  );
};

export default CircuitCanvasLegacy;
