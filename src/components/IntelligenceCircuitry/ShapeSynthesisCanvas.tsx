'use client';

import React from 'react';

/**
 * ShapeSynthesisCanvas — the reusable shape language for esy.com.
 *
 * One idea, told in real geometric shapes: scattered, messy pieces (notes,
 * links, goals) are pulled into a synthesis core and come out as one clean,
 * finished piece of work. The hero shows the full story as a wide cinematic
 * band; the three building blocks (messy cluster, template, finished work) are
 * also exported as standalone glyphs so the page sections reuse the exact same
 * vocabulary. Only real shapes are used — circle, triangle, square, diamond,
 * pentagon, hexagon, star — no arrows, plus-signs, or half-shapes.
 */

type ThemeName = 'dark' | 'light' | 'navy-calm' | 'navy-dark';
type ShapeType = 'circle' | 'triangle' | 'square' | 'diamond' | 'pentagon' | 'hexagon' | 'star';
type Palette = (typeof themes)['navy-calm'];

interface ShapeSynthesisCanvasProps {
  className?: string;
  theme?: ThemeName;
}

type GlyphProps = React.SVGProps<SVGSVGElement> & { theme?: ThemeName };

// Per-theme palette mirrors the page tokens so every glyph reads as native to
// its surface (teal-on-white for navy-calm, teal-on-navy for navy-dark, violet
// for the legacy light/dark themes).
const themes = {
  dark: {
    ink: '#fafafa', muted: 'rgba(250, 250, 250, 0.62)',
    panel: '#15151d', panelAlt: '#1d1d27', border: 'rgba(196, 181, 253, 0.24)',
    accent: '#8b5cf6', accent2: '#c4b5fd', accentSoft: 'rgba(139, 92, 246, 0.18)',
    shape: 'rgba(196, 181, 253, 0.72)', shapeFill: 'rgba(139, 92, 246, 0.18)',
    line: 'rgba(250, 250, 250, 0.16)', check: '#22c55e',
    chipBg: '#23232f', chipInk: '#fafafa', chipStroke: 'rgba(196, 181, 253, 0.4)',
    chipShape: 'rgba(196, 181, 253, 0.72)', chipShapeFill: 'rgba(139, 92, 246, 0.18)',
  },
  light: {
    ink: '#0f172a', muted: 'rgba(15, 23, 42, 0.6)',
    panel: '#ffffff', panelAlt: '#f4f4fb', border: 'rgba(124, 58, 237, 0.2)',
    accent: '#7c3aed', accent2: '#a78bfa', accentSoft: 'rgba(124, 58, 237, 0.12)',
    shape: 'rgba(124, 58, 237, 0.55)', shapeFill: 'rgba(124, 58, 237, 0.12)',
    line: 'rgba(15, 23, 42, 0.12)', check: '#16a34a',
    chipBg: '#ffffff', chipInk: '#0f172a', chipStroke: 'rgba(124, 58, 237, 0.28)',
    chipShape: 'rgba(124, 58, 237, 0.55)', chipShapeFill: 'rgba(124, 58, 237, 0.12)',
  },
  'navy-calm': {
    ink: '#0A2540', muted: '#6C757D',
    panel: '#ffffff', panelAlt: '#F1F5F6', border: 'rgba(10, 37, 64, 0.12)',
    accent: '#00A896', accent2: '#00D4AA', accentSoft: 'rgba(0, 168, 150, 0.13)',
    shape: 'rgba(10, 37, 64, 0.5)', shapeFill: 'rgba(0, 168, 150, 0.14)',
    line: 'rgba(10, 37, 64, 0.12)', check: '#2A9D8F',
    chipBg: '#ffffff', chipInk: '#0A2540', chipStroke: 'rgba(0, 168, 150, 0.3)',
    chipShape: 'rgba(10, 37, 64, 0.5)', chipShapeFill: 'rgba(0, 168, 150, 0.14)',
  },
  'navy-dark': {
    ink: '#FFFFFF', muted: 'rgba(255, 255, 255, 0.68)',
    // One cohesive navy/teal elevation system: the page bg is the darkest navy,
    // the template panel sits one step up, and node cards + input/output chips
    // share the lightest surface with teal edges so they lift off the bg.
    panel: '#123254', panelAlt: '#1C436C', border: 'rgba(0, 212, 170, 0.34)',
    accent: '#00D4AA', accent2: '#5EEAD4', accentSoft: 'rgba(0, 212, 170, 0.18)',
    shape: 'rgba(94, 234, 212, 0.7)', shapeFill: 'rgba(0, 212, 170, 0.2)',
    line: 'rgba(255, 255, 255, 0.16)', check: '#2AA98F',
    chipBg: '#1C436C', chipInk: '#FFFFFF', chipStroke: 'rgba(0, 212, 170, 0.4)',
    chipShape: 'rgba(94, 234, 212, 0.7)', chipShapeFill: 'rgba(0, 212, 170, 0.2)',
  },
};

// Regular-polygon vertices, pointy-top by default (rotation -90 puts a vertex
// straight up). Used for every shape except the circle and the rounded square.
const polyPoints = (cx: number, cy: number, r: number, sides: number, rot = -90) => {
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const a = ((rot + (360 / sides) * i) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
};

// Alternating outer/inner radius gives a clean 5-point star.
const starPoints = (cx: number, cy: number, R: number, r: number, points = 5, rot = -90) => {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const rad = i % 2 === 0 ? R : r;
    const a = ((rot + (180 / points) * i) * Math.PI) / 180;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
};

// Draw one real shape centred at (x, y). Outlined by default; a soft fill is
// used for a few so a cluster reads as varied material, not a repeated motif.
const renderShape = (type: ShapeType, x: number, y: number, c: Palette, filled = false, sw = 2) => {
  const common = {
    stroke: c.shape, strokeWidth: sw, fill: filled ? c.shapeFill : 'none',
    strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const,
  };
  switch (type) {
    case 'circle': return <circle cx={x} cy={y} r={13} {...common} />;
    case 'triangle': return <polygon points={polyPoints(x, y, 15, 3)} {...common} />;
    case 'square': return <rect x={x - 12} y={y - 12} width={24} height={24} rx={3} {...common} />;
    case 'diamond': return <polygon points={polyPoints(x, y, 15, 4)} {...common} />;
    case 'pentagon': return <polygon points={polyPoints(x, y, 15, 5)} {...common} />;
    case 'hexagon': return <polygon points={polyPoints(x, y, 15, 6)} {...common} />;
    case 'star': return <polygon points={starPoints(x, y, 16, 7)} {...common} />;
    default: return null;
  }
};

/* ── Messy cluster glyph (reused in the "How it works" step cards) ───────── */
const MESS_SHAPES: Array<{ type: ShapeType; x: number; y: number; delay: number; filled?: boolean }> = [
  { type: 'circle', x: 46, y: 44, delay: 0 },
  { type: 'triangle', x: 118, y: 38, delay: 0.5, filled: true },
  { type: 'square', x: 128, y: 100, delay: 1.0 },
  { type: 'hexagon', x: 42, y: 104, delay: 1.5 },
  { type: 'diamond', x: 110, y: 120, delay: 2.0 },
  { type: 'star', x: 80, y: 74, delay: 2.5, filled: true },
];

export const ShapeMessGlyph: React.FC<GlyphProps> = ({ theme = 'navy-calm', className, ...rest }) => {
  const c = themes[theme];
  return (
    <svg viewBox="0 0 160 150" className={`syn-glyph ${className ?? ''}`} role="img" aria-label="A loose cluster of messy pieces" {...rest}>
      {MESS_SHAPES.map((s) => (
        <g key={`${s.type}-${s.x}`} className="syn-mess-shape" style={{ animationDelay: `${s.delay}s` }}>
          {renderShape(s.type, s.x, s.y, c, s.filled)}
        </g>
      ))}
    </svg>
  );
};

/* ── Template glyph ─────────────────────────────────────────────────────── */
export const ShapeTemplateGlyph: React.FC<GlyphProps> = ({ theme = 'navy-calm', className, ...rest }) => {
  const c = themes[theme];
  return (
    <svg viewBox="0 0 150 190" className={`syn-glyph syn-template-glyph ${className ?? ''}`} role="img" aria-label="A workflow template" {...rest}>
      <g className="syn-template-card">
        <rect x="5" y="5" width="140" height="180" rx="22" fill={c.panel} stroke={c.border} strokeWidth="1.5" />
        <rect x="20" y="22" width="110" height="24" rx="12" fill={c.accent} />
        <text x="75" y="39" textAnchor="middle" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" fontSize="9.5" fontWeight="700" letterSpacing="1.6">TEMPLATE</text>
        <rect x="20" y="66" width="110" height="12" rx="6" fill={c.line} />
        <rect x="20" y="90" width="84" height="12" rx="6" fill={c.line} />
        <rect x="20" y="114" width="100" height="12" rx="6" fill={c.line} />
        <circle cx="122" cy="156" r="13" fill={c.check} />
        <path d="M 116 156 L 120 161 L 129 150" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
};

/* ── Finished-work glyph ────────────────────────────────────────────────── */
export const ShapeArtifactGlyph: React.FC<GlyphProps> = ({ theme = 'navy-calm', className, ...rest }) => {
  const c = themes[theme];
  return (
    <svg viewBox="0 0 120 160" className={`syn-glyph syn-artifact-glyph ${className ?? ''}`} role="img" aria-label="A finished piece of work" {...rest}>
      <rect x="20" y="8" width="86" height="132" rx="12" fill={c.panelAlt} stroke={c.border} opacity="0.6" />
      <g className="syn-artifact-card">
        <rect x="6" y="20" width="98" height="132" rx="14" fill={c.panel} stroke={c.border} strokeWidth="1.5" />
        <rect x="18" y="32" width="74" height="42" rx="8" fill={c.accentSoft} />
        <circle cx="72" cy="45" r="5" fill={c.accent} />
        <path d="M 22 70 L 40 51 L 52 63 L 67 47 L 90 70" fill="none" stroke={c.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        <rect x="18" y="86" width="74" height="8" rx="4" fill={c.line} />
        <rect x="18" y="100" width="56" height="8" rx="4" fill={c.line} />
        <rect x="18" y="114" width="66" height="8" rx="4" fill={c.line} />
        <circle cx="28" cy="135" r="9" fill={c.check} />
        <path d="M 24 135 L 27 138 L 33 131" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect className="syn-artifact-pulse" x="6" y="20" width="98" height="132" rx="14" fill="none" stroke={c.accent} strokeWidth="1.5" />
    </svg>
  );
};

// Beat 1 — just the three strongest "messy pieces" people start with, as loose,
// tilted chips (a real shape + a plain-language label) so it reads as raw,
// unorganized input rather than a tidy UI panel. Less is more here.
const MESS_CHIPS: Array<{ label: string; shape: ShapeType; x: number; y: number; w: number; rot: number; filled?: boolean; delay: number }> = [
  { label: 'Notes', shape: 'circle', x: 64, y: 152, w: 128, rot: -4, delay: 0 },
  { label: 'PDFs', shape: 'diamond', x: 40, y: 242, w: 122, rot: 5, filled: true, delay: 0.5 },
  { label: 'Rough ideas', shape: 'star', x: 86, y: 332, w: 168, rot: -3, delay: 1.0 },
];

// Beat 3 — finished outputs shown as small artifact previews. Each is a vector
// mock of the artifact type (report = text + chart, essay = image + text,
// infographic = donut + bars) so the result reads as concrete finished work.
type OutputType = 'report' | 'essay' | 'infographic';
const OUTPUTS: Array<{ label: string; sub: string; type: OutputType; y: number }> = [
  { label: 'Research report', sub: 'Sourced · structured', type: 'report', y: 140 },
  { label: 'Essay', sub: 'Cited · illustrated', type: 'essay', y: 232 },
  { label: 'Infographic', sub: 'Data · visual', type: 'infographic', y: 324 },
];

// A 46×46 vector mock of each finished-artifact type, drawn on a small inner
// "page" so the output reads as a real document/visual, not a label.
const renderOutputPreview = (type: OutputType, c: Palette) => {
  const page = <rect x="0" y="0" width="46" height="46" rx="9" fill={c.panel} stroke={c.border} strokeWidth="1" />;
  switch (type) {
    // Report: stacked text lines over a small bar chart.
    case 'report':
      return (
        <>
          {page}
          <rect x="9" y="10" width="28" height="3.5" rx="1.75" fill={c.line} />
          <rect x="9" y="17" width="22" height="3" rx="1.5" fill={c.line} />
          <rect x="9" y="23" width="26" height="3" rx="1.5" fill={c.line} />
          <rect x="9" y="36" width="5" height="6" rx="1" fill={c.accent} opacity="0.55" />
          <rect x="17" y="32" width="5" height="10" rx="1" fill={c.accent} opacity="0.8" />
          <rect x="25" y="29" width="5" height="13" rx="1" fill={c.accent} />
          <rect x="33" y="34" width="5" height="8" rx="1" fill={c.accent} opacity="0.7" />
        </>
      );
    // Essay: an image block (sun + horizon) over two text lines.
    case 'essay':
      return (
        <>
          {page}
          <rect x="9" y="9" width="28" height="18" rx="3" fill={c.accentSoft} />
          <circle cx="16" cy="15" r="2.5" fill={c.accent} />
          <path d="M9 27 L18 19 L24 24 L31 17 L37 27 Z" fill={c.accent} opacity="0.5" />
          <rect x="9" y="32" width="28" height="3" rx="1.5" fill={c.line} />
          <rect x="9" y="38" width="20" height="3" rx="1.5" fill={c.line} />
        </>
      );
    // Infographic: a donut stat with two small bars beside it.
    case 'infographic':
      return (
        <>
          {page}
          <circle cx="16" cy="18" r="8" fill="none" stroke={c.line} strokeWidth="3.5" />
          <path d="M16 10 A8 8 0 0 1 23.5 22.5" fill="none" stroke={c.accent} strokeWidth="3.5" strokeLinecap="round" />
          <rect x="29" y="12" width="9" height="3" rx="1.5" fill={c.line} />
          <rect x="29" y="18" width="6" height="3" rx="1.5" fill={c.accent} opacity="0.8" />
          <rect x="9" y="34" width="29" height="3" rx="1.5" fill={c.line} />
          <rect x="9" y="39.5" width="20" height="3" rx="1.5" fill={c.line} />
        </>
      );
  }
};

// Beat 2 — generic synthesis stages, not essay-specific steps. These apply to
// any artifact class the template can produce (reports, visuals, infographics).
const WORKFLOW_STEPS: Array<{ label: string; shape: ShapeType }> = [
  { label: 'Gather sources', shape: 'circle' },
  { label: 'Research & analyze', shape: 'triangle' },
  { label: 'Verify & structure', shape: 'square' },
  { label: 'Quality check', shape: 'diamond' },
];

// Curved flow lines live only in the gaps so chips + card stay crisp.
const MESS_TO_TEMPLATE = [
  'M272,172 C306,170 332,172 356,174',
  'M272,260 C306,260 334,260 356,260',
  'M272,350 C306,352 334,350 356,348',
];
const TEMPLATE_TO_WORK = [
  'M664,200 C686,190 698,180 708,176',
  'M664,320 C686,332 700,350 708,356',
];

/**
 * The hero visual tells the story with concrete examples on both ends and a
 * live workflow in the middle: example messy inputs (notes, links, PDFs…) →
 * a template running its steps in realtime → example finished work (report,
 * visual essay, image pack…). Pinned to navy-dark in the hero.
 */
const ShapeSynthesisCanvas: React.FC<ShapeSynthesisCanvasProps> = ({ className = '', theme = 'navy-calm' }) => {
  const c = themes[theme];
  // Shapes inside the light input/output chips need their own (darker) ink so
  // they read against the pale chip rather than the dark-template palette.
  const chipShapes: Palette = { ...c, shape: c.chipShape, shapeFill: c.chipShapeFill };

  return (
    <div className={`synthesis-canvas-container ${className}`}>
      <svg viewBox="0 0 1000 500" className="synthesis-canvas shape-synthesis-band" role="img" aria-label="Messy example inputs run through a template workflow into example finished work">
        <defs>
          <radialGradient id={`synCore-${theme}`} cx="50%" cy="50%">
            <stop offset="0%" stopColor={c.accent2} stopOpacity="0.4" />
            <stop offset="55%" stopColor={c.accent} stopOpacity="0.14" />
            <stop offset="100%" stopColor={c.accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`synRail-${theme}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={c.shape} stopOpacity="0.08" />
            <stop offset="45%" stopColor={c.accent} stopOpacity="0.42" />
            <stop offset="100%" stopColor={c.accent2} stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Flow lines first, so chips and the card layer cleanly on top. */}
        {[...MESS_TO_TEMPLATE, ...TEMPLATE_TO_WORK].map((d, i) => (
          <path key={`rail-${i}`} className="syn-conn" d={d} fill="none" stroke={`url(#synRail-${theme})`} strokeWidth="2" strokeLinecap="round" />
        ))}

        {/* ── Beat 1: the three strongest messy inputs, as light document chips ── */}
        {MESS_CHIPS.map((chip) => (
          <g key={chip.label} className="syn-io-chip" transform={`translate(${chip.x}, ${chip.y}) rotate(${chip.rot})`}>
            <rect x="0" y="0" width={chip.w} height="36" rx="12" fill={c.chipBg} stroke={c.chipStroke} strokeWidth="1.4" />
            <g transform="translate(20, 18) scale(0.52)">{renderShape(chip.shape, 0, 0, chipShapes, chip.filled)}</g>
            <text className="syn-chip-label" x="38" y="23" fill={c.chipInk}>{chip.label}</text>
          </g>
        ))}

        {/* ── Beat 2: the template running its workflow in realtime ── */}
        <ellipse className="syn-hub-glow" cx="510" cy="262" rx="156" ry="184" fill={`url(#synCore-${theme})`} />
        <g className="syn-tpl-card">
          <rect x="356" y="64" width="308" height="392" rx="26" fill={c.panel} stroke={c.border} strokeWidth="1.5" />

          {/* Template header: just the name so the card reads as a reusable
              workflow template (generic, not an essay-specific doc). */}
          <text className="syn-tpl-title" x="380" y="108" fill={c.accent}>WORKFLOW TEMPLATE</text>
          <line x1="380" y1="124" x2="640" y2="124" stroke={c.line} strokeWidth="1" />

          {/* The workflow spine wires every node into one pipeline (edges). */}
          <line x1="406" y1="167" x2="406" y2="377" stroke={c.border} strokeWidth="2" />

          {/* Each stage is a first-class node card (icon, title, a small config
              line) with an execution-state check that pops in only once the run
              reaches it. Card i top = 140 + i*70; node center = top + 27. */}
          {WORKFLOW_STEPS.map((step, i) => {
            const top = 140 + i * 70;
            const mid = top + 27;
            return (
              <g key={step.label}>
                <rect x="376" y={top} width="268" height="54" rx="14" fill={c.panelAlt} stroke={c.border} strokeWidth="1" />
                <rect x="388" y={top + 9} width="36" height="36" rx="10" fill={c.accentSoft} stroke={c.border} strokeWidth="1" />
                <g transform={`translate(406, ${mid}) scale(0.5)`}>{renderShape(step.shape, 0, 0, c)}</g>
                <text className="syn-step-label" x="436" y={top + 24} fill={c.ink}>{step.label}</text>
                <rect x="436" y={top + 33} width="116" height="5" rx="2.5" fill={c.line} />
                <g className={`syn-step-check syn-step-check--${i + 1}`}>
                  <circle cx="620" cy={mid} r="11" fill={c.check} />
                  <path d={`M 614 ${mid} L 618 ${mid + 4} L 626 ${mid - 5}`} fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </g>
            );
          })}

          {/* The active-node ring sweeps the pipeline (single focal motion). Drawn
              on top of the cards as a clean focus border so it marks, not hides,
              the node currently being processed. */}
          <g className="syn-run-highlight">
            <rect x="370" y="134" width="280" height="66" rx="18" fill="none" stroke={c.accent} strokeWidth="2" />
          </g>

          {/* Run progress fills across the bottom of the template. */}
          <rect x="380" y="426" width="260" height="8" rx="4" fill={c.panelAlt} stroke={c.border} strokeWidth="1" />
          <rect className="syn-progress" x="380" y="426" width="260" height="8" rx="4" fill={c.accent} />
        </g>

        {/* ── Beat 3: finished outputs as artifact preview cards (image + type) ── */}
        <text className="syn-work-eyebrow" x="712" y="128" fill={c.accent}>FINISHED WORK</text>
        {OUTPUTS.map((o) => (
          <g key={o.label} className="syn-io-chip">
            <rect x="708" y={o.y} width="240" height="66" rx="15" fill={c.chipBg} stroke={c.chipStroke} strokeWidth="1.4" />
            <g transform={`translate(720, ${o.y + 10})`}>{renderOutputPreview(o.type, c)}</g>
            <text className="syn-output-title" x="780" y={o.y + 30} fill={c.chipInk}>{o.label}</text>
            <text className="syn-output-sub" x="780" y={o.y + 47} fill={c.muted}>{o.sub}</text>
          </g>
        ))}

        {/* Three plain captions — one per beat. */}
        <text className="syn-caption" x="168" y="486" textAnchor="middle" fill={c.muted}>Messy pieces</text>
        <text className="syn-caption" x="510" y="486" textAnchor="middle" fill={c.muted}>A template runs your workflow</text>
        <text className="syn-caption" x="824" y="486" textAnchor="middle" fill={c.muted}>Finished work</text>
      </svg>
    </div>
  );
};

/**
 * SynthesisField — faint, drifting scatter of the same real shapes behind the
 * hero copy. Texture, not noise: it reinforces the "raw material" idea without
 * competing with the headline.
 */
const FIELD_SHAPES: Array<{ type: ShapeType; x: number; y: number; s: number; delay: number }> = [
  { type: 'circle', x: 120, y: 140, s: 1.3, delay: 0 },
  { type: 'triangle', x: 320, y: 90, s: 1.0, delay: 1.2 },
  { type: 'hexagon', x: 520, y: 220, s: 0.9, delay: 2.4 },
  { type: 'diamond', x: 200, y: 360, s: 1.1, delay: 0.6 },
  { type: 'square', x: 700, y: 120, s: 1.2, delay: 1.8 },
  { type: 'star', x: 880, y: 300, s: 1.0, delay: 3.0 },
  { type: 'circle', x: 1040, y: 160, s: 0.8, delay: 0.9 },
  { type: 'pentagon', x: 420, y: 480, s: 1.2, delay: 2.1 },
  { type: 'triangle', x: 1100, y: 420, s: 1.1, delay: 1.5 },
  { type: 'diamond', x: 620, y: 520, s: 0.9, delay: 0.3 },
  { type: 'hexagon', x: 80, y: 520, s: 1.0, delay: 2.7 },
  { type: 'square', x: 960, y: 560, s: 1.0, delay: 1.0 },
];

export const SynthesisField: React.FC<{ theme?: ThemeName }> = ({ theme = 'navy-calm' }) => {
  const c = themes[theme ?? 'navy-calm'];
  return (
    <svg className="synthesis-field" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {FIELD_SHAPES.map((shape, i) => (
        <g key={`field-${i}`} transform={`translate(${shape.x}, ${shape.y}) scale(${shape.s})`}>
          <g className="syn-field-shape" style={{ animationDelay: `${shape.delay}s` }}>
            {renderShape(shape.type, 0, 0, c)}
          </g>
        </g>
      ))}
    </svg>
  );
};

export default ShapeSynthesisCanvas;
