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

  // Shared "letter" treatment: small uppercase eyebrow + flowing prose on the
  // light surface, so every section after the hero reads as one continuous note.
  const sectionStyle: React.CSSProperties = {
    padding: 'clamp(2.75rem, 5.5vh, 4rem) 2rem 0',
    maxWidth: '800px',
    margin: '0 auto'
  };
  // Navy eyebrow is the structural label; teal is reserved for interactive and
  // emphasis moments (links, pull-quotes, numbers) so the accent stays distinct.
  // Uses the lighter brand navy so it reads as blue rather than near-black.
  const eyebrowStyle: React.CSSProperties = {
    fontSize: '0.8125rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#0F3460',
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

        <p style={{ ...proseStyle, marginBottom: '1.75rem' }}>
          Esy lets you automate agentic workflow templates instead of engineering prompts. Each template turns well thought-out intent into a guided form that asks the right questions, so you describe what you want made step by step.
        </p>

        {/* Concrete example of an intent form so the abstract pitch lands */}
        <figure style={{
          margin: '0 0 0',
          borderRadius: '12px',
          overflow: 'hidden',
          border: `1px solid ${theme.border}`,
          boxShadow: '0 18px 40px -24px rgba(10, 37, 64, 0.35)'
        }}>
          <Image
            src="/images/generate-argumentative-essay-intake.png"
            alt="Intake form for the Generate Argumentative Essay template, with fields for the essay topic, the position to defend, audience, and citation style next to the workflow pipeline."
            width={1024}
            height={625}
            sizes="(max-width: 860px) 100vw, 800px"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <figcaption style={{
            fontSize: '0.8125rem',
            color: theme.muted,
            padding: '0.75rem 1rem',
            borderTop: `1px solid ${theme.border}`,
            backgroundColor: theme.elevated
          }}>
            The intake form for the Generate Argumentative Essay template.
          </figcaption>
        </figure>
      </section>

      {/* ── How it works — run, batch, schedule, then audit ── */}
      <section style={sectionStyle}>
        <p style={eyebrowStyle}>How it works</p>

        <p style={{ ...proseStyle, marginBottom: '1.75rem' }}>
          Esy runs the workflow for you, and you can go further: batch many templates at once, or schedule batches to run on their own. From there, the output can be audited with human-in-the-loop review before anything ships.
        </p>

        <blockquote style={{ ...quoteStyle, marginBottom: 0 }}>
          No prompt engineering. You fill in an intent form, Esy runs the templates one at a time or in scheduled batches, and you review the results before they ship.
        </blockquote>
      </section>

      {/* ── Etymology — where the name comes from ── */}
      <section style={sectionStyle}>
        <p style={eyebrowStyle}>Etymology</p>

        <p style={{ ...proseStyle, marginBottom: 0 }}>
          The name comes from{' '}
          <Link
            href="/essays/etymology/the-word-essay/"
            style={{
              color: theme.accent,
              textDecoration: 'none',
              borderBottom: `1px solid ${theme.accent}`,
              fontStyle: 'italic'
            }}
          >
            Synthesis Essay
          </Link>, reversed into the acronym ESY and styled Esy, pronounced &quot;Eh-see.&quot;
        </p>
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
