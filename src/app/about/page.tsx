"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ─── Circuit Grid Animation — single subtle pulse ─── */
interface Pulse {
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed: number;
  life: number;
  maxLife: number;
  trail: { x: number; y: number; alpha: number }[];
}

function CircuitGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pulseRef = useRef<Pulse | null>(null);
  const rafRef = useRef<number>(0);
  const gridSize = 60;

  const spawnPulse = useCallback((w: number, h: number): Pulse => {
    const cols = Math.floor(w / gridSize);
    const rows = Math.floor(h / gridSize);
    const col = Math.floor(Math.random() * cols);
    const row = Math.floor(Math.random() * rows);
    const horizontal = Math.random() > 0.5;
    const forward = Math.random() > 0.5 ? 1 : -1;
    return {
      x: col * gridSize,
      y: row * gridSize,
      dx: horizontal ? forward : 0,
      dy: horizontal ? 0 : forward,
      speed: 0.35 + Math.random() * 0.25,
      life: 0,
      maxLife: 500 + Math.random() * 400,
      trail: [],
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const rect = canvas.parentElement!.getBoundingClientRect();
    pulseRef.current = spawnPulse(rect.width, rect.height);

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(0, 212, 170, 0.045)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const p = pulseRef.current!;
      p.life++;

      p.x += p.dx * p.speed;
      p.y += p.dy * p.speed;

      const lifeRatio = 1 - p.life / p.maxLife;
      p.trail.push({ x: p.x, y: p.y, alpha: lifeRatio });
      if (p.trail.length > 60) p.trail.shift();

      const atCol = Math.abs(p.x % gridSize) < p.speed + 0.5;
      const atRow = Math.abs(p.y % gridSize) < p.speed + 0.5;
      if (atCol && atRow && Math.random() < 0.25) {
        if (p.dx !== 0) {
          p.dx = 0;
          p.dy = Math.random() > 0.5 ? 1 : -1;
        } else {
          p.dy = 0;
          p.dx = Math.random() > 0.5 ? 1 : -1;
        }
      }

      if (p.life >= p.maxLife || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
        pulseRef.current = spawnPulse(w, h);
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      for (let t = 0; t < p.trail.length; t++) {
        const pt = p.trail[t];
        const progress = t / p.trail.length;
        const a = pt.alpha * progress * 0.35;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1 + progress * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 170, ${a})`;
        ctx.fill();
      }

      const headAlpha = lifeRatio * 0.6;
      ctx.save();
      ctx.shadowColor = 'rgba(0, 212, 170, 0.5)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 170, ${headAlpha})`;
      ctx.fill();
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [spawnPulse]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8,
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
      }}
    />
  );
}

export default function AboutPage() {
  const theme = {
    bg: '#FFFFFF',
    elevated: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#0A2540',
    muted: '#6C757D',
    subtle: '#8E9AAF',
    faint: '#ADB5BD',
    accent: '#00A896',
    accentLight: '#00D4AA',
    border: '#E9ECEF',
    dark: {
      bg: '#0A2540',
      surface: '#0F3460',
      text: '#FFFFFF',
      muted: 'rgba(255, 255, 255, 0.8)',
      subtle: 'rgba(255, 255, 255, 0.6)',
      border: 'rgba(255, 255, 255, 0.1)',
      accent: '#00D4AA'
    }
  };

  const principles = [
    {
      title: 'Pipelines over prompts',
      desc: 'Workflows are predefined. You run a template, not a chat window.'
    },
    {
      title: 'Artifacts over conversations',
      desc: 'The output is a publishable thing — not a transcript.'
    },
    {
      title: 'Auditable by default',
      desc: 'Every artifact carries its source chain. Citations verified, QA logged.'
    },
    {
      title: 'Agents do the work',
      desc: 'Research, verification, structuring, QA — agents handle the pipeline end to end.'
    }
  ];

  const artifactTypes = [
    'Visual essays with citation chains and embedded graphics',
    'Research briefs with source-verified claims',
    'Batch-processed generative media with subject-data QA',
    'Structured documents with full audit metadata'
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: 'var(--font-inter)'
    }}>

      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        padding: '10rem 2rem 5rem',
        maxWidth: '800px',
        margin: '0 auto',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(10, 37, 64, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 37, 64, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
            fontWeight: 300,
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            fontFamily: 'var(--font-literata)',
            color: theme.text
          }}>
            About
          </h1>

          <p style={{
            fontSize: '1.375rem',
            lineHeight: 1.8,
            color: theme.muted,
            marginBottom: '1.75rem',
            fontWeight: 400
          }}>
            Esy (pronounced &quot;Eh-see&quot;) runs agentic workflows that automate generation, quality-score outputs, and deliver approved artifacts at scale.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.text,
            fontWeight: 500,
            fontStyle: 'italic',
            marginBottom: '1.75rem'
          }}>
            Templates define the pipeline. Agents execute it. Output is structured, auditable, and publishable.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted
          }}>
            The name comes from{' '}
            <Link
              href="/essays/etymology/the-word-essay/"
              style={{
                color: theme.muted,
                textDecoration: 'none',
                borderBottom: `1px solid ${theme.subtle}`,
                fontStyle: 'italic',
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.subtle}
            >
              Essay Synthesis
            </Link> — &quot;essay&quot; in its original sense, from the French <em>essayer</em>: to attempt, to try. Synthesis is the pipeline that turns the attempt into a verified artifact.
          </p>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: theme.dark.bg,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <CircuitGrid />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 400,
            marginBottom: '2.5rem',
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-literata)',
            color: theme.dark.text
          }}>
            The problem
          </h2>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.dark.muted,
            marginBottom: '1.5rem'
          }}>
            Language models hallucinate citations. They reference papers that don&apos;t exist, fabricate quotes, and present invented data as fact. Image models produce anatomically wrong generations, mislabeled subjects, and artifacts that fail basic accuracy checks.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.dark.muted,
            marginBottom: '1.5rem'
          }}>
            Most tools ship these errors directly to the user and call it done. No verification layer. No QA step. No audit trail.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.dark.text,
            fontWeight: 500
          }}>
            The missing piece isn&apos;t better generation — it&apos;s a system that audits and catches these errors before anything gets published.
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: theme.elevated
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 400,
            marginBottom: '2.5rem',
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-literata)'
          }}>
            How it works
          </h2>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            A template defines the workflow: what agents run, what verification steps execute, and what output format gets produced. Templates are predefined — users pick one, provide their sources or intent, and run it.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Agents handle the pipeline. Research, source gathering, citation verification, content structuring, and quality assurance all run in sequence. Each step feeds the next. No manual prompt chaining, no copy-paste between tools.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.text,
            fontWeight: 500,
            fontStyle: 'italic'
          }}>
            The output is a structured, publishable artifact with a full audit trail — not a chat transcript.
          </p>
        </div>
      </section>

      {/* ── What Esy Produces (commented out — may revisit) ──
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: theme.dark.bg,
        borderTop: `1px solid ${theme.dark.border}`,
        borderBottom: `1px solid ${theme.dark.border}`
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 400,
            marginBottom: '2.5rem',
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-literata)',
            color: theme.dark.text
          }}>
            What Esy produces
          </h2>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.dark.muted,
            marginBottom: '1.5rem'
          }}>
            Every workflow produces a typed artifact. The format depends on the template — but the contract is the same: structured, verified, publishable.
          </p>

          <div style={{
            padding: '1.5rem',
            borderRadius: '12px',
            border: `1px solid ${theme.dark.border}`,
            backgroundColor: theme.dark.surface,
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {artifactTypes.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: theme.dark.accent,
                    marginTop: '10px',
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: '1rem', color: theme.dark.muted, lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.dark.muted
          }}>
            <Link
              href="/essays"
              style={{
                color: theme.dark.text,
                fontWeight: 500,
                textDecoration: 'none',
                borderBottom: `1px solid ${theme.dark.subtle}`,
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.dark.accent}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.dark.subtle}
            >
              Visual Essays
            </Link> — long-form artifacts combining research, narrative, and graphics — are the most comprehensive workflow. They demonstrate what happens when research agents, citation verification, and generative production are composed into a single pipeline.
          </p>
        </div>
      </section>
      */}

      {/* ── Principles ── */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: theme.dark.bg
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 400,
            marginBottom: '3.5rem',
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-literata)',
            color: theme.dark.text
          }}>
            Principles
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem'
          }}>
            {principles.map((item, index) => (
              <div key={index} style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr',
                gap: '1.5rem',
                alignItems: 'start'
              }}>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 300,
                  color: theme.dark.subtle,
                  paddingTop: '0.125rem'
                }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.01em',
                    color: theme.dark.text
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.8,
                    color: theme.dark.muted
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built by ── */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: theme.surface,
        borderTop: `1px solid ${theme.border}`
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          <p style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: theme.faint,
            marginBottom: '2.5rem'
          }}>
            Built by
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '2.5rem',
            alignItems: 'start'
          }}>
            {/* Avatar */}
            <div
              className="zev-about-avatar"
              style={{
                width: 112,
                height: 112,
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 0 0 1px rgba(10,37,64,0.08), 0 2px 12px rgba(10,37,64,0.08)'
              }}
            >
              <Image
                src="/images/zev-uhuru.png"
                alt="Zev Uhuru"
                width={112}
                height={112}
                style={{ width: 112, height: 112, objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Bio */}
            <div>
              {/* Name + role lockup */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.375rem',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: theme.text,
                  marginBottom: '0.3rem',
                  fontFamily: 'var(--font-literata)'
                }}>
                  Zev Uhuru
                </h3>
                <span style={{
                  fontSize: '0.875rem',
                  color: theme.subtle,
                  fontWeight: 500,
                  letterSpacing: '0.01em'
                }}>
                  Agentic Engineer — New York
                </span>
              </div>

              {/* Bio text */}
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.85,
                color: theme.muted,
                marginBottom: '0.875rem'
              }}>
                I built Esy to evaluate whether agentic workflows can reliably produce artifacts that pass quality gates, across models, at scale, with humans in the loop for borderline outputs.
              </p>
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.85,
                color: theme.muted,
                marginBottom: '0.875rem'
              }}>
                The first real test was{' '}
                <a
                  href="https://clip.art"
                  target="_blank"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}` }}
                >
                  clip.art
                </a>
                , a platform I built to generate children&apos;s educational material at scale, used daily by my 4-year-old daughter. That became the production pipeline: 250–1,000 clipart, coloring pages, illustrations, worksheets, and infographics a day through provider routing, quality scoring, human-in-the-loop (HITL) review, and R2 delivery.
              </p>
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.85,
                color: theme.muted,
                marginBottom: '2rem'
              }}>
                That work is ongoing. The same infrastructure is available to other engineers through my{' '}
                <Link
                  href="/templates"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}` }}
                >
                  templates
                </Link>
                {' '}and the API.
              </p>

              {/* Links */}
              <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' as const }}>
                {[
                  { label: 'GitHub', href: 'https://github.com/ZevUhuru' },
                  { label: 'YouTube', href: 'https://youtube.com/@EsyDotCom' },
                  { label: 'Substack', href: 'https://synthesize.esy.com' },
                  { label: 'X', href: 'https://x.com/EsyDotCom' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      color: theme.muted,
                      textDecoration: 'none',
                      padding: '0.375rem 0.875rem',
                      borderRadius: '999px',
                      border: `1px solid ${theme.border}`,
                      backgroundColor: theme.elevated,
                      transition: 'border-color 0.2s ease, color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = theme.accent;
                      e.currentTarget.style.color = theme.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = theme.border;
                      e.currentTarget.style.color = theme.muted;
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Footer ── */}
      <section style={{
        padding: '3rem 2rem',
        borderTop: `1px solid ${theme.dark.border}`,
        backgroundColor: theme.dark.bg
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.dark.subtle,
            textAlign: 'center'
          }}>
            Questions? Email me at{' '}
            <a
              href="mailto:zev@esy.com"
              style={{
                color: theme.dark.accent,
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              zev@esy.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
