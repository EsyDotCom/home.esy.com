'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * CircuitCanvas - Redesigned Pipeline Visualization
 * 
 * A citation-first pipeline diagram showing:
 * 1. Your Sources (PDFs, Citations, Notes)
 * 2. Research & Analysis
 * 3. Verify + Structure (diamond split with checkmarks)
 * 4. Your Artifact (with accent treatment)
 * 
 * Animation: Ball flows through the pipeline, splits at diamond,
 * triggers checkmarks, and settles at output with pulse.
 */

interface CircuitCanvasProps {
  className?: string;
  theme?: 'dark' | 'light' | 'navy-calm' | 'navy-dark';
}

// Theme-specific colors
const themes = {
  // Original Violet/Purple theme
  dark: {
    nodeFill: '#12121a',
    nodeStroke: '#2a2a3a',
    textPrimary: '#fafafa',
    textSecondary: 'rgba(250, 250, 250, 0.5)',
    traceStart: 'rgba(139, 92, 246, 0.3)',
    traceEnd: 'rgba(139, 92, 246, 0.4)',
    accentGlow: 'rgba(139, 92, 246, 0.3)',
    ballColor: '#8b5cf6',
    gridColor: '#fff',
    gridOpacity: 0.025,
    checkColor: '#22c55e',
    checkGlowStroke: 'rgba(34, 197, 94, 0.5)',
  },
  light: {
    nodeFill: '#ffffff',
    nodeStroke: 'rgba(124, 58, 237, 0.15)',
    textPrimary: '#0f172a',
    textSecondary: 'rgba(15, 23, 42, 0.6)',
    traceStart: 'rgba(124, 58, 237, 0.25)',
    traceEnd: 'rgba(124, 58, 237, 0.4)',
    accentGlow: 'rgba(124, 58, 237, 0.3)',
    ballColor: '#7c3aed',
    gridColor: '#7c3aed',
    gridOpacity: 0.04,
    checkColor: '#16a34a',
    checkGlowStroke: 'rgba(22, 163, 74, 0.6)',
  },
  // Navy Calm theme - Professional academic palette
  'navy-calm': {
    nodeFill: '#FFFFFF',
    nodeStroke: 'rgba(10, 37, 64, 0.1)',
    textPrimary: '#0A2540',
    textSecondary: '#6C757D',
    traceStart: 'rgba(0, 168, 150, 0.2)',
    traceEnd: 'rgba(0, 168, 150, 0.35)',
    accentGlow: 'rgba(0, 168, 150, 0.25)',
    ballColor: '#00A896',
    gridColor: '#0A2540',
    gridOpacity: 0.03,
    checkColor: '#2A9D8F',
    checkGlowStroke: 'rgba(42, 157, 143, 0.5)',
  },
  // Navy Dark theme - Dark mode variant
  'navy-dark': {
    nodeFill: '#0F3460',
    nodeStroke: 'rgba(0, 212, 170, 0.2)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    traceStart: 'rgba(0, 212, 170, 0.25)',
    traceEnd: 'rgba(0, 212, 170, 0.4)',
    accentGlow: 'rgba(0, 212, 170, 0.3)',
    ballColor: '#00D4AA',
    gridColor: '#FFFFFF',
    gridOpacity: 0.03,
    checkColor: '#3AB4A5',
    checkGlowStroke: 'rgba(58, 180, 165, 0.5)',
  },
};

const CircuitCanvas: React.FC<CircuitCanvasProps> = ({ className = '', theme = 'dark' }) => {
  const colors = themes[theme];
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showVerifyCheck, setShowVerifyCheck] = useState(false);
  const [showStructureCheck, setShowStructureCheck] = useState(false);
  const [outputPulse, setOutputPulse] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Animation timing constants (in ms)
  const CYCLE_DURATION = 5000;
  const DIAMOND_START = 0.45; // When ball reaches diamond split
  const DIAMOND_END = 0.75; // When paths reconverge
  const OUTPUT_ARRIVAL = 0.85;
  const CHECK_DURATION = 400;

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    
    const elapsed = timestamp - startTimeRef.current;
    const cycleProgress = (elapsed % CYCLE_DURATION) / CYCLE_DURATION;
    
    setAnimationPhase(cycleProgress);

    // Trigger checkmarks during diamond traversal
    if (cycleProgress >= 0.52 && cycleProgress < 0.52 + (CHECK_DURATION / CYCLE_DURATION)) {
      setShowVerifyCheck(true);
    } else {
      setShowVerifyCheck(false);
    }

    if (cycleProgress >= 0.58 && cycleProgress < 0.58 + (CHECK_DURATION / CYCLE_DURATION)) {
      setShowStructureCheck(true);
    } else {
      setShowStructureCheck(false);
    }

    // Trigger output pulse
    if (cycleProgress >= OUTPUT_ARRIVAL && cycleProgress < OUTPUT_ARRIVAL + 0.08) {
      setOutputPulse(true);
    } else {
      setOutputPulse(false);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

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

  // Start/stop animation based on visibility
  useEffect(() => {
    if (isVisible) {
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, animate]);

  // Y positions for nodes (compact layout)
  const Y = {
    sources: 45,
    research: 130,
    diamondTop: 195,
    diamondNodes: 245,
    diamondBottom: 295,
    output: 370
  };

  // Calculate ball positions based on animation phase
  const getBallPosition = (phase: number, isLeftPath: boolean = true) => {
    // Phase 0-0.2: Top node to Research node
    if (phase < 0.2) {
      const t = phase / 0.2;
      return { x: 200, y: Y.sources + t * (Y.research - Y.sources), opacity: 1 };
    }
    // Phase 0.2-0.45: Research node to diamond top
    if (phase < DIAMOND_START) {
      const t = (phase - 0.2) / (DIAMOND_START - 0.2);
      return { x: 200, y: Y.research + t * (Y.diamondTop - Y.research), opacity: 1 };
    }
    // Phase 0.45-0.75: Diamond split (two balls)
    if (phase < DIAMOND_END) {
      const t = (phase - DIAMOND_START) / (DIAMOND_END - DIAMOND_START);
      if (isLeftPath) {
        // Left path: goes to Verify
        const x = 200 - Math.sin(t * Math.PI) * 80;
        const y = Y.diamondTop + t * (Y.diamondBottom - Y.diamondTop);
        return { x, y, opacity: 1 };
      } else {
        // Right path: goes to Structure
        const x = 200 + Math.sin(t * Math.PI) * 80;
        const y = Y.diamondTop + t * (Y.diamondBottom - Y.diamondTop);
        return { x, y, opacity: 1 };
      }
    }
    // Phase 0.75-0.85: Diamond bottom to output
    if (phase < OUTPUT_ARRIVAL) {
      const t = (phase - DIAMOND_END) / (OUTPUT_ARRIVAL - DIAMOND_END);
      return { x: 200, y: Y.diamondBottom + t * (Y.output - Y.diamondBottom), opacity: 1 };
    }
    // Phase 0.85-1.0: At output, fade out
    const t = (phase - OUTPUT_ARRIVAL) / (1 - OUTPUT_ARRIVAL);
    return { x: 200, y: Y.output, opacity: 1 - t };
  };

  const leftBallPos = getBallPosition(animationPhase, true);
  const rightBallPos = getBallPosition(animationPhase, false);
  const showSplitBalls = animationPhase >= DIAMOND_START && animationPhase < DIAMOND_END;
  const singleBallPos = getBallPosition(animationPhase);

  return (
    <div ref={containerRef} className={`circuit-canvas-container ${className}`}>
      <svg 
        viewBox="0 0 400 430" 
        className={`circuit-canvas ${isVisible ? 'circuit-canvas--active' : ''}`}
        aria-hidden="true"
        role="img"
      >
        {/* Definitions */}
        <defs>
          {/* Gradient for traces */}
          <linearGradient id={`traceGradient-${theme}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.traceStart} />
            <stop offset="100%" stopColor={colors.traceEnd} />
          </linearGradient>

          {/* Glow filter for pulse */}
          <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Output node glow */}
          <filter id="outputGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Checkmark glow */}
          <filter id="checkGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background grid pattern */}
        <g className="circuit-grid" opacity={colors.gridOpacity}>
          {[...Array(17)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 26} x2="400" y2={i * 26} stroke={colors.gridColor} strokeWidth="0.5" />
          ))}
          {[...Array(16)].map((_, i) => (
            <line key={`v-${i}`} x1={i * 26} y1="0" x2={i * 26} y2="430" stroke={colors.gridColor} strokeWidth="0.5" />
          ))}
        </g>

        {/* Circuit traces */}
        <g className="circuit-traces">
          {/* Main vertical trace: Sources to Research */}
          <path 
            d={`M200,${Y.sources + 24} L200,${Y.research - 24}`}
            stroke={`url(#traceGradient-${theme})`}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            className="circuit-trace"
          />
          
          {/* Research to diamond top */}
          <path 
            d={`M200,${Y.research + 24} L200,${Y.diamondTop}`}
            stroke={`url(#traceGradient-${theme})`}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            className="circuit-trace"
          />
          
          {/* Left diamond path */}
          <path 
            d={`M200,${Y.diamondTop} L120,${Y.diamondNodes} L200,${Y.diamondBottom}`}
            stroke={`url(#traceGradient-${theme})`}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="circuit-trace circuit-trace--left"
          />
          
          {/* Right diamond path */}
          <path 
            d={`M200,${Y.diamondTop} L280,${Y.diamondNodes} L200,${Y.diamondBottom}`}
            stroke={`url(#traceGradient-${theme})`}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="circuit-trace circuit-trace--right"
          />
          
          {/* Diamond bottom to output */}
          <path 
            d={`M200,${Y.diamondBottom} L200,${Y.output - 34}`}
            stroke={`url(#traceGradient-${theme})`}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            className="circuit-trace circuit-trace--output"
          />
        </g>

        {/* ═══════════════════════════════════════════════════════════
            NODE 1: YOUR SOURCES
            ═══════════════════════════════════════════════════════════ */}
        <g className="circuit-node circuit-node--sources" transform={`translate(200, ${Y.sources})`}>
          <rect 
            x="-70" y="-22" 
            width="140" height="44" 
            rx="8" 
            fill={colors.nodeFill}
            stroke={colors.nodeStroke}
            strokeWidth="1"
          />
          <text 
            x="0" y="-3" 
            fill={colors.textPrimary}
            fontSize="14"
            fontWeight="500"
            fontFamily="Inter, -apple-system, sans-serif"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Your Sources
          </text>
          <text 
            x="0" y="12" 
            fill={colors.textSecondary}
            fontSize="10"
            fontWeight="400"
            fontFamily="Inter, -apple-system, sans-serif"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            PDFs · Citations · Notes
          </text>
        </g>

        {/* ═══════════════════════════════════════════════════════════
            NODE 2: RESEARCH & ANALYSIS
            ═══════════════════════════════════════════════════════════ */}
        <g className="circuit-node circuit-node--research" transform={`translate(200, ${Y.research})`}>
          <rect 
            x="-75" y="-22" 
            width="150" height="44" 
            rx="8" 
            fill={colors.nodeFill}
            stroke={colors.nodeStroke}
            strokeWidth="1"
          />
          <text 
            x="0" y="2" 
            fill={colors.textPrimary}
            fontSize="14"
            fontWeight="500"
            fontFamily="Inter, -apple-system, sans-serif"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Research &amp; Analysis
          </text>
        </g>

        {/* ═══════════════════════════════════════════════════════════
            NODE 3: DIAMOND - VERIFY & STRUCTURE
            ═══════════════════════════════════════════════════════════ */}
        
        {/* Diamond junction points */}
        <circle cx="200" cy={Y.diamondTop} r="4" fill={colors.nodeFill} stroke={colors.nodeStroke} strokeWidth="1" />
        <circle cx="200" cy={Y.diamondBottom} r="4" fill={colors.nodeFill} stroke={colors.nodeStroke} strokeWidth="1" />

        {/* VERIFY (Left) */}
        <g className="circuit-node circuit-node--verify" transform={`translate(120, ${Y.diamondNodes})`}>
          <rect 
            x="-40" y="-18" 
            width="80" height="36" 
            rx="6" 
            fill={colors.nodeFill}
            stroke={showVerifyCheck ? colors.checkGlowStroke : colors.nodeStroke}
            strokeWidth="1"
            style={{ transition: 'stroke 0.2s ease' }}
          />
          <text 
            x="0" y={showVerifyCheck ? "-3" : "2"} 
            fill={colors.textPrimary}
            fontSize="13"
            fontWeight="500"
            fontFamily="Inter, -apple-system, sans-serif"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Verify
          </text>
          {/* Checkmark - appears when ball passes */}
          <text 
            x="0" y="11" 
            fill={colors.checkColor}
            fontSize="13"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="middle"
            opacity={showVerifyCheck ? 0.8 : 0}
            filter={showVerifyCheck ? "url(#checkGlow)" : undefined}
            style={{ transition: 'opacity 0.15s ease' }}
          >
            ✓
          </text>
        </g>

        {/* STRUCTURE (Right) */}
        <g className="circuit-node circuit-node--structure" transform={`translate(280, ${Y.diamondNodes})`}>
          <rect 
            x="-40" y="-18" 
            width="80" height="36" 
            rx="6" 
            fill={colors.nodeFill}
            stroke={showStructureCheck ? colors.checkGlowStroke : colors.nodeStroke}
            strokeWidth="1"
            style={{ transition: 'stroke 0.2s ease' }}
          />
          <text 
            x="0" y={showStructureCheck ? "-3" : "2"}
            fill={colors.textPrimary}
            fontSize="13"
            fontWeight="500"
            fontFamily="Inter, -apple-system, sans-serif"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Structure
          </text>
          {/* Checkmark - appears when ball passes */}
          <text 
            x="0" y="11" 
            fill={colors.checkColor}
            fontSize="13"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="middle"
            opacity={showStructureCheck ? 0.8 : 0}
            filter={showStructureCheck ? "url(#checkGlow)" : undefined}
            style={{ transition: 'opacity 0.15s ease' }}
          >
            ✓
          </text>
        </g>

        {/* ═══════════════════════════════════════════════════════════
            NODE 4: YOUR ARTIFACT
            ═══════════════════════════════════════════════════════════ */}
        <g className="circuit-node circuit-node--output" transform={`translate(200, ${Y.output})`}>
          {/* Accent glow behind node */}
          <rect 
            x="-90" y="-32" 
            width="180" height="64" 
            rx="12" 
            fill="none"
            stroke={colors.accentGlow}
            strokeWidth="2"
            filter={outputPulse ? "url(#outputGlow)" : undefined}
            opacity={outputPulse ? 1 : 0.6}
            style={{ transition: 'opacity 0.2s ease' }}
          />
          {/* Main node background */}
          <rect 
            x="-86" y="-28" 
            width="172" height="56" 
            rx="8" 
            fill={colors.nodeFill}
            stroke={outputPulse ? colors.ballColor : colors.nodeStroke}
            strokeWidth="1"
            style={{ transition: 'stroke 0.2s ease' }}
          />
          <text 
            x="0" y="-6" 
            fill={colors.textPrimary}
            fontSize="14"
            fontWeight="500"
            fontFamily="Inter, -apple-system, sans-serif"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Your Artifact
          </text>
          <text 
            x="0" y="13" 
            fill={colors.textSecondary}
            fontSize="11"
            fontWeight="400"
            fontFamily="Inter, -apple-system, sans-serif"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Essays · Visuals · Reports
          </text>
        </g>

        {/* ═══════════════════════════════════════════════════════════
            ANIMATED BALLS/PARTICLES
            ═══════════════════════════════════════════════════════════ */}
        {isVisible && (
          <>
            {/* Before and after diamond split: single ball */}
            {!showSplitBalls && (
              <circle 
                cx={singleBallPos.x} 
                cy={singleBallPos.y} 
                r="6" 
                fill={colors.ballColor}
                opacity={singleBallPos.opacity}
                filter="url(#pulseGlow)"
              />
            )}
            
            {/* During diamond split: two balls */}
            {showSplitBalls && (
              <>
                {/* Left ball (Verify path) */}
                <circle 
                  cx={leftBallPos.x} 
                  cy={leftBallPos.y} 
                  r="5" 
                  fill={colors.ballColor}
                  opacity={leftBallPos.opacity}
                  filter="url(#pulseGlow)"
                />
                {/* Right ball (Structure path) */}
                <circle 
                  cx={rightBallPos.x} 
                  cy={rightBallPos.y} 
                  r="5" 
                  fill={colors.ballColor}
                  opacity={rightBallPos.opacity}
                  filter="url(#pulseGlow)"
                />
              </>
            )}
          </>
        )}
      </svg>

      {/* Decorative corner accents */}
      <div className="circuit-corner circuit-corner--tl" />
      <div className="circuit-corner circuit-corner--tr" />
      <div className="circuit-corner circuit-corner--bl" />
      <div className="circuit-corner circuit-corner--br" />
    </div>
  );
};

export default CircuitCanvas;
