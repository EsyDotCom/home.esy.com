import { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  FileCode,
  GitBranch,
  BookOpen,
  CheckCircle,
  Workflow,
  Box,
  Library,
  Package,
  ExternalLink,
} from "lucide-react";
import { DocsPageNav, DocsCallout } from "@/components/docs";

const colors = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  surface: '#F1F5F9',
  text: '#0A2540',
  textSecondary: 'rgba(10, 37, 64, 0.85)',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
  accentHover: '#00D4AA',
  accentLight: '#00D4AA',
};

export const metadata: Metadata = {
  title: "Foundations: Workflow Primitives | Esy Documentation",
  description: "The three-level workflow model: Workflow Schema (the rules), Workflow Template (a predesigned workflow), Workflow Specification (a per-run populated instance) — the primitives every Esy workflow is built on.",
  openGraph: {
    title: "Foundations: Workflow Primitives | Esy Documentation",
    description: "Schema declares the rules. Template is a predesigned workflow. Specification is one populated instance per run. The primitives every Esy workflow follows.",
    url: "https://esy.com/docs/foundations",
  },
};

const levels = [
  {
    name: 'Workflow Schema',
    layer: 'Meta',
    icon: Box,
    summary: 'The rules every Workflow Template must obey. Declares what fields a workflow has, what shape a gate takes, what types intake and output can be.',
    audience: 'Platform engineers',
    frequency: 'One, versioned',
    canonical: 'https://docs.esy.com/concepts/workflow-schemas',
    bullets: [
      'Required fields a Template must contain',
      'Allowed types and shapes per field',
      'Gate-unlock condition grammar',
      'Sub-workflow reference rules',
      'Versioning conventions',
      'Validation rules for Template publication',
    ],
  },
  {
    name: 'Workflow Template',
    layer: 'Declared',
    icon: Package,
    summary: 'A specific predesigned workflow conforming to the Schema. The named, packaged thing an operator picks when starting work.',
    audience: 'Workflow designers; operators',
    frequency: 'Many — one per artifact class',
    canonical: 'https://docs.esy.com/concepts/workflow-templates',
    bullets: [
      'Stable id, version, artifact class',
      'Intake schema for operator inputs',
      'Runtime steps and gates',
      'Provider routing per step',
      'Budget policy',
      'Output shape contract',
    ],
  },
  {
    name: 'Workflow Specification',
    layer: 'Runtime',
    icon: FileCode,
    summary: 'A per-run populated instance of a Template. The deterministic blueprint production reads to build the artifact.',
    audience: 'Production agents/code; reviewers',
    frequency: 'Many — one per Run',
    canonical: 'https://docs.esy.com/concepts/workflow-specifications',
    bullets: [
      'Operator inputs filled in',
      'Intermediate artifacts linked',
      'Synthesis decisions captured',
      'Production-ready blueprint',
      'Provenance pointers (Template, Schema, Run)',
    ],
  },
];

const principles = [
  {
    n: 1,
    title: 'Every Workflow Run produces a Workflow Specification',
    body: 'Even trivial workflows. For a daily SERP snapshot, the Specification may be ten lines — essentially the validated inputs. For a visual essay, it is 500–1,500 lines. Complexity varies; the primitive is universal. Production always reads the Specification, never the raw inputs.',
  },
  {
    n: 2,
    title: 'The three-level pattern is universal across workflow complexity',
    body: 'Deterministic ETL, LLM-assisted production, mixed agent/code, fully agentic synthesis — all use the same Schema → Template → Specification primitives. What runs inside each gate is implementation, not type.',
  },
  {
    n: 3,
    title: 'LLM call ≠ agent loop ≠ workflow',
    body: 'Three concepts at three granularities. An LLM call is a single inference. An agent is LLM + tools + loop + memory + stop condition. A workflow is a typed graph that may contain zero, one, or many of either. A step is not agentic just because an LLM is invoked.',
  },
  {
    n: 4,
    title: 'The primitive is "Workflow," not "Agentic Workflow"',
    body: 'Implementation properties belong on instances, not in type names. Whether a Template runs agents, deterministic code, or both is metadata on the Template, not part of the primitives that name all workflows.',
  },
  {
    n: 5,
    title: 'Templates and Frameworks are distinct objects',
    body: 'A Template is a declarative spec the platform reads. A Framework is an agent-facing operating manual that complements a Template — patterns, heuristics, anti-patterns. They describe the same workflow but serve different audiences.',
  },
  {
    n: 6,
    title: 'Each level has a different audience',
    body: 'Operators rarely see the Schema. Platform engineers rarely look at individual Specifications. Designing docs and tooling around the right audience per level avoids cognitive overload.',
  },
];

const todayMapping = [
  {
    today: 'client/docs/src/app/concepts/workflow-templates/',
    role: 'Documents Workflow Templates publicly (correctly, at its level)',
    future: 'Stays. Cross-linked from Workflow Schema and Workflow Specification concept pages on docs.esy.com.',
  },
  {
    today: 'orchestration/skills/visual-essay-invocation/SKILL.md',
    role: 'Workflow Framework (with embedded Template description and pattern library)',
    future: 'Decomposes into VisualEssaySchema + VisualEssayTemplate + VisualEssayFramework + VisualEssayPatternLibrary',
  },
  {
    today: 'src/app/essays/*/SPEC.md',
    role: 'Workflow Specifications (populated instances)',
    future: 'Typed Specification artifacts in the artifact graph',
  },
  {
    today: 'orchestration/agents/orchestrators/visual-essay-orchestrator.md',
    role: 'Visual Essay Template in narrative form',
    future: 'Folded into the declarative visual-essay Template',
  },
];

const typeSystemAnalogy = [
  { workflow: 'Workflow Schema', typescript: 'The TypeScript language spec — defines what a type can be' },
  { workflow: 'Workflow Template', typescript: 'A specific interface declaration (e.g., interface User { ... })' },
  { workflow: 'Workflow Specification', typescript: 'A specific value satisfying the interface ({ name: "alice", id: 1 })' },
  { workflow: 'Workflow Run / Artifact', typescript: 'The runtime behavior using that value' },
];

export default function FoundationsPage() {
  return (
    <article
      style={{
        maxWidth: '760px',
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 5vw, 2rem)',
        paddingTop: 'clamp(5rem, 12vh, 7rem)',
        paddingBottom: 'clamp(4rem, 8vh, 6rem)',
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: 'clamp(3rem, 8vh, 5rem)' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            fontSize: '0.8125rem',
            color: colors.accentLight,
            letterSpacing: '0.02em',
          }}
        >
          <Layers style={{ width: 16, height: 16 }} />
          Foundations
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            marginBottom: '1.5rem',
            color: colors.text,
          }}
        >
          Workflow Primitives
        </h1>

        <p
          style={{
            fontSize: '1.1875rem',
            lineHeight: 1.7,
            color: colors.muted,
            maxWidth: '640px',
          }}
        >
          A workflow is defined by three distinct objects at three layers of abstraction. A <strong style={{ color: colors.text, fontWeight: 600 }}>Workflow Schema</strong> declares the rules. A <strong style={{ color: colors.text, fontWeight: 600 }}>Workflow Template</strong> is a predesigned workflow that satisfies those rules. A <strong style={{ color: colors.text, fontWeight: 600 }}>Workflow Specification</strong> is one populated instance of a Template, produced during a single Run.
        </p>
      </header>

      {/* TL;DR */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <div
          style={{
            padding: '1.5rem 1.75rem',
            background: colors.elevated,
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            borderLeft: `3px solid ${colors.accent}`,
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-literata), Georgia, serif',
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: colors.accentLight,
              marginBottom: '1rem',
            }}
          >
            TL;DR
          </h3>
          <p
            style={{
              fontSize: '1.0625rem',
              lineHeight: 1.75,
              color: colors.textSecondary,
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            A Workflow Schema declares the rules. A Workflow Template is a predesigned workflow that satisfies those rules. A Workflow Specification is one populated instance of a Template, produced during a single Run, that production reads to build the artifact.
          </p>
        </div>
      </section>

      {/* The Three Levels Diagram */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="three-levels"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text,
          }}
        >
          The Three Levels
        </h2>

        <p
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.85,
            color: colors.textSecondary,
            marginBottom: '2rem',
          }}
        >
          Each level has a different definition, a different audience, and a different lifecycle. Most people interacting with Esy work at only one level.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {levels.map((level, idx) => {
            const Icon = level.icon;
            return (
              <div
                key={level.name}
                style={{
                  padding: '1.5rem',
                  background: colors.elevated,
                  borderRadius: '12px',
                  border: `1px solid ${colors.border}`,
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '8px',
                      background: `${colors.accent}12`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon style={{ width: 20, height: 20, color: colors.accent }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: colors.accentLight,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        marginBottom: '0.25rem',
                      }}
                    >
                      Layer {idx + 1} · {level.layer}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: colors.text, marginBottom: '0.5rem' }}>
                      {level.name}
                    </h3>
                    <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: colors.muted, margin: 0 }}>
                      {level.summary}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '0.625rem',
                    marginBottom: '1rem',
                    paddingTop: '1rem',
                    borderTop: `1px solid ${colors.border}`,
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: colors.subtle, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                      Audience
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: colors.text, fontWeight: 500 }}>{level.audience}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: colors.subtle, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                      Frequency
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: colors.text, fontWeight: 500 }}>{level.frequency}</div>
                  </div>
                </div>

                <details style={{ marginBottom: '0.75rem' }}>
                  <summary
                    style={{
                      fontSize: '0.8125rem',
                      color: colors.muted,
                      cursor: 'pointer',
                      paddingBottom: '0.5rem',
                      fontWeight: 500,
                    }}
                  >
                    Declares
                  </summary>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 0 0' }}>
                    {level.bullets.map((b) => (
                      <li
                        key={b}
                        style={{
                          fontSize: '0.8125rem',
                          color: colors.subtle,
                          paddingLeft: '0.875rem',
                          position: 'relative',
                          marginBottom: '0.375rem',
                          lineHeight: 1.6,
                        }}
                      >
                        <span style={{ position: 'absolute', left: 0, color: colors.accent }}>•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </details>

                <a
                  href={level.canonical}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    fontSize: '0.8125rem',
                    color: colors.accentLight,
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                  }}
                >
                  Canonical reference on docs.esy.com
                  <ExternalLink style={{ width: 12, height: 12 }} />
                </a>
              </div>
            );
          })}
        </div>

        <DocsCallout type="tip" title="Each level satisfies the level above it.">
          A Workflow Template satisfies the Workflow Schema. A Workflow Specification instantiates a Workflow Template. The relationships are top-down: rules → declared workflow → populated instance → executed run + final artifact.
        </DocsCallout>
      </section>

      {/* Type System Analogy */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="analogy"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text,
          }}
        >
          Type System Analogy
        </h2>

        <p
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.85,
            color: colors.textSecondary,
            marginBottom: '2rem',
          }}
        >
          The three-level pattern mirrors how programming language type systems work. If TypeScript is familiar:
        </p>

        <div
          style={{
            background: colors.elevated,
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            overflow: 'hidden',
          }}
        >
          {typeSystemAnalogy.map((row, idx) => (
            <div
              key={row.workflow}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1rem 1.25rem',
                borderBottom: idx < typeSystemAnalogy.length - 1 ? `1px solid ${colors.border}` : 'none',
              }}
            >
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: colors.text }}>{row.workflow}</div>
              <div style={{ fontSize: '0.875rem', color: colors.muted, lineHeight: 1.6 }}>{row.typescript}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Foundational Principles */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="principles"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text,
          }}
        >
          Foundational Principles
        </h2>

        <p
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.85,
            color: colors.textSecondary,
            marginBottom: '2rem',
          }}
        >
          The takeaways that produced this vocabulary. Carry them forward.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {principles.map((p) => (
            <div
              key={p.n}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                padding: '1.25rem 1.5rem',
                background: colors.elevated,
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: colors.accent,
                  background: `${colors.accent}12`,
                  flexShrink: 0,
                  fontFamily: 'var(--font-literata), Georgia, serif',
                }}
              >
                {p.n}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: colors.text, marginBottom: '0.5rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: colors.muted, margin: 0 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How This Shows Up Today */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="today"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text,
          }}
        >
          How This Shows Up in the Repo Today
        </h2>

        <p
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.85,
            color: colors.textSecondary,
            marginBottom: '2rem',
          }}
        >
          You do not need to refactor anything right now. The current structure works while Claude Code is the runtime. The vocabulary is the bridge to the platform shape, not a demand to rewrite existing files.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {todayMapping.map((row) => (
            <div
              key={row.today}
              style={{
                padding: '1.125rem 1.25rem',
                background: colors.elevated,
                borderRadius: '10px',
                border: `1px solid ${colors.border}`,
              }}
            >
              <code
                style={{
                  display: 'block',
                  fontSize: '0.8125rem',
                  color: colors.text,
                  background: colors.surface,
                  padding: '0.375rem 0.625rem',
                  borderRadius: '4px',
                  marginBottom: '0.625rem',
                  fontFamily: 'monospace',
                  wordBreak: 'break-word',
                }}
              >
                {row.today}
              </code>
              <div style={{ fontSize: '0.875rem', color: colors.muted, lineHeight: 1.6, marginBottom: '0.5rem' }}>
                <strong style={{ color: colors.text, fontWeight: 600 }}>Role today:</strong> {row.role}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: colors.muted, lineHeight: 1.6 }}>
                <ArrowRight style={{ width: 14, height: 14, color: colors.accent, flexShrink: 0, marginTop: '0.25rem' }} />
                <div>
                  <strong style={{ color: colors.text, fontWeight: 600 }}>Future platform object:</strong> {row.future}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow Spec vs Artifact Spec */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="vs-artifact-spec"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text,
          }}
        >
          Workflow Specification vs Artifact Specification
        </h2>

        <p
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.85,
            color: colors.textSecondary,
            marginBottom: '1.5rem',
          }}
        >
          A note for readers of <Link href="/docs/specs" style={{ color: colors.accentLight, textDecoration: 'underline', textUnderlineOffset: '3px' }}>Artifact Specifications</Link>. Those docs describe the metadata panel displayed on published artifacts — title, sourceCount, authorship. That is <em style={{ color: colors.text, fontStyle: 'italic' }}>artifact-level inspection data</em> rendered on the published page. A Workflow Specification is a different object.
        </p>

        <DocsCallout type="warning" title="Two distinct concepts using similar words">
          <strong>Workflow Specification</strong> = the populated blueprint of one workflow run. Production reads it. Typically discarded or archived after the artifact is built.
          <br />
          <br />
          <strong>Artifact Specification</strong> = the published artifact&apos;s inspectable metadata panel. Lives forever on the published page. Readers see it.
          <br />
          <br />
          The Artifact Specification is a downstream projection of the Workflow Specification plus Run metadata — but they are not the same object.
        </DocsCallout>
      </section>

      {/* Canonical Reference Pointer */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="canonical"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text,
          }}
        >
          Canonical Reference on docs.esy.com
        </h2>

        <p
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.85,
            color: colors.textSecondary,
            marginBottom: '2rem',
          }}
        >
          The detailed reference for each primitive — fields, types, validation rules, examples — lives at docs.esy.com. This page is the foundational overview; those pages are the working reference.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { href: 'https://docs.esy.com/concepts/workflow-schemas', title: 'Workflow schemas', desc: 'The platform contract that all Templates must satisfy.' },
            { href: 'https://docs.esy.com/concepts/workflow-templates', title: 'Workflow templates', desc: 'Predesigned workflows: intake, steps, providers, gates, output shape.' },
            { href: 'https://docs.esy.com/concepts/workflow-specifications', title: 'Workflow specifications', desc: 'Per-run populated instances of a Template.' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                padding: '1rem 1.25rem',
                background: colors.elevated,
                borderRadius: '10px',
                border: `1px solid ${colors.border}`,
                textDecoration: 'none',
              }}
            >
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: colors.text, marginBottom: '0.25rem' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.8125rem', color: colors.muted, lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </div>
              <ExternalLink style={{ width: 16, height: 16, color: colors.accent, flexShrink: 0 }} />
            </a>
          ))}
        </div>
      </section>

      {/* Closing statement */}
      <section style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
        <div
          style={{
            padding: '1.75rem 2rem',
            background: colors.elevated,
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: colors.text,
              fontFamily: 'var(--font-literata), Georgia, serif',
              fontStyle: 'italic',
              margin: 0,
              fontWeight: 300,
            }}
          >
            &ldquo;Schema declares the rules. Template is a predesigned workflow. Specification is one populated instance per run. Production reads the specification to build the artifact.&rdquo;
          </p>
        </div>
      </section>

      <DocsPageNav
        prev={{ href: '/docs/workflows', title: 'Workflows' }}
        next={{ href: '/docs/specs', title: 'Artifact Specifications' }}
      />
    </article>
  );
}
