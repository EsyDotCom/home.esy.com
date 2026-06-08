"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Youtube } from 'lucide-react';

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
    border: '#E9ECEF'
  };

  const principles = [
    {
      title: 'Pipelines over prompts',
      desc: 'Workflows are predefined. You run a template, not a chat window.'
    },
    {
      title: 'Artifacts over conversations',
      desc: 'The output is a publishable thing, not a transcript.'
    },
    {
      title: 'Auditable by default',
      desc: 'Every artifact carries its source chain. Citations verified, QA logged.'
    },
    {
      title: 'Agents do the work',
      desc: 'Research, verification, structuring, QA. Agents handle the pipeline end to end.'
    }
  ];

  // Shared "letter" treatment: small uppercase eyebrow + flowing prose on the
  // light surface, so every section after the hero reads as one continuous note.
  const sectionStyle: React.CSSProperties = {
    padding: 'clamp(2.75rem, 5.5vh, 4rem) 2rem 0',
    maxWidth: '800px',
    margin: '0 auto'
  };
  // Teal eyebrow makes the brand color the section marker, so the page reads
  // as Esy's note rather than pure black-and-white body copy.
  const eyebrowStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: theme.accent,
    marginBottom: '1.5rem'
  };
  const proseStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    lineHeight: 1.85,
    color: theme.muted,
    marginBottom: '1.5rem'
  };
  // Pull-quote for each section's thesis line: serif + teal left bar lifts the
  // key claim out of the prose and gives the letter visual structure.
  const quoteStyle: React.CSSProperties = {
    margin: '0.25rem 0 0',
    padding: '0.1rem 0 0.1rem 1.5rem',
    borderLeft: `3px solid ${theme.accent}`,
    fontFamily: 'var(--font-literata)',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontStyle: 'italic',
    fontWeight: 500,
    color: theme.text
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: 'var(--font-inter)'
    }}>

      {/* ── Hero — immersive profile stage (the person behind Esy) ── */}
      <section className="about-hero">
        <div className="about-hero__panel">
          {/* Identity column */}
          <div className="about-hero__copy">
            <span className="about-hero__eyebrow">Built by</span>
            <h1 className="about-hero__name">Zev Uhuru</h1>
            <span className="about-hero__role">Agentic Engineer, NYC &amp; Miami</span>

            <p className="about-hero__bio">
              I built Esy as a personal research project. I wanted to understand how
              AI agents and agentic workflows could automate the production of digital
              educational assets, reliably and at scale.
            </p>

            <div className="about-hero__links">
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zevuhuru', Icon: Linkedin },
                { label: 'YouTube', href: 'https://youtube.com/@EsyDotCom', Icon: Youtube },
              ].map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                  <Icon size={15} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Portrait feature — white ring, framed circle. */}
          <div className="about-hero__portrait">
            <div className="about-hero__portrait-frame">
              <div className="about-hero__portrait-inner zev-about-avatar">
                <Image
                  src="/images/zev-uhuru.png"
                  alt="Zev Uhuru"
                  fill
                  sizes="280px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>
            <div className="about-hero__portrait-cap">
              Building in NYC &amp; Miami
            </div>
          </div>
        </div>
      </section>

      {/* ── The first test — first-person note that opens the letter ── */}
      <section style={{ ...sectionStyle, paddingTop: 'clamp(3.5rem, 7vh, 5.5rem)' }}>
        <p style={eyebrowStyle}>The first test</p>

        <p style={proseStyle}>
          The first real test was{' '}
          <a
            href="https://clip.art"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}` }}
          >
            clip.art
          </a>
          , a platform I built to generate children&apos;s educational material at scale, used daily by my 4-year-old daughter. That became the production pipeline: 250–1,000 clipart, coloring pages, illustrations, worksheets, and infographics a day through provider routing, quality scoring, human-in-the-loop (HITL) review, and R2 delivery.
        </p>

        <p style={{ ...proseStyle, marginBottom: 0 }}>
          The same infrastructure is available to other engineers through my{' '}
          <Link
            href="/workflows"
            style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}` }}
          >
            workflow templates
          </Link>
          {' '}and the API.
        </p>
      </section>

      {/* ── What is Esy — intro on the light surface ── */}
      <section style={sectionStyle}>
        <p style={eyebrowStyle}>What is Esy</p>

        <p style={{
          fontSize: '1.375rem',
          lineHeight: 1.8,
          color: theme.muted,
          marginBottom: '1.75rem',
          fontWeight: 400
        }}>
          Esy (pronounced &quot;Eh-see&quot;) runs agentic workflows that automate generation, quality-score outputs, and deliver approved artifacts at scale.
        </p>

        <blockquote style={{ ...quoteStyle, margin: '0 0 1.75rem' }}>
          Templates define the pipeline. Agents execute it. Output is structured, auditable, and publishable.
        </blockquote>

        <p style={{ ...proseStyle, marginBottom: 0 }}>
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
          </Link>, &quot;essay&quot; in its original sense, from the French <em>essayer</em>: to attempt, to try. Synthesis is the pipeline that turns the attempt into a verified artifact.
        </p>
      </section>

      {/* ── The problem ── */}
      <section style={sectionStyle}>
        <p style={eyebrowStyle}>The problem</p>

        <p style={proseStyle}>
          Language models hallucinate citations. They reference papers that don&apos;t exist, fabricate quotes, and present invented data as fact. Image models produce anatomically wrong generations, mislabeled subjects, and artifacts that fail basic accuracy checks.
        </p>

        <p style={proseStyle}>
          Most tools ship these errors directly to the user and call it done. No verification layer. No QA step. No audit trail.
        </p>

        <blockquote style={quoteStyle}>
          The missing piece isn&apos;t better generation. It&apos;s a system that audits and catches these errors before anything gets published.
        </blockquote>
      </section>

      {/* ── How it works ── */}
      <section style={sectionStyle}>
        <p style={eyebrowStyle}>How it works</p>

        <p style={proseStyle}>
          A template defines the workflow: what agents run, what verification steps execute, and what output format gets produced. Templates are predefined. Users pick one, provide their sources or intent, and run it.
        </p>

        <p style={proseStyle}>
          Agents handle the pipeline. Research, source gathering, citation verification, content structuring, and quality assurance all run in sequence. Each step feeds the next. No manual prompt chaining, no copy-paste between tools.
        </p>

        <blockquote style={quoteStyle}>
          The output is a structured, publishable artifact with a full audit trail, not a chat transcript.
        </blockquote>
      </section>

      {/* ── Principles — enumerated within the same light flow ── */}
      <section style={sectionStyle}>
        <p style={eyebrowStyle}>Principles</p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2.25rem'
        }}>
          {principles.map((item, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: '1.25rem',
              alignItems: 'start'
            }}>
              {/* Teal serif index threads the brand accent through the list */}
              <div style={{
                fontSize: '1.125rem',
                fontWeight: 400,
                color: theme.accent,
                paddingTop: '0.15rem',
                fontFamily: 'var(--font-literata)'
              }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.4rem',
                  letterSpacing: '-0.01em',
                  color: theme.text
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '1.0625rem',
                  lineHeight: 1.8,
                  color: theme.muted,
                  margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Get in touch — the letter's sign-off ── */}
      <section style={{ ...sectionStyle, paddingBottom: 'clamp(3.5rem, 7vh, 5.5rem)' }}>
        <p style={eyebrowStyle}>Get in touch</p>

        <p style={{ ...proseStyle, marginBottom: 0 }}>
          Questions? Email me at{' '}
          <a
            href="mailto:zev@esy.com"
            style={{
              color: theme.accent,
              textDecoration: 'none',
              borderBottom: `1px solid ${theme.accent}`,
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            zev@esy.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
