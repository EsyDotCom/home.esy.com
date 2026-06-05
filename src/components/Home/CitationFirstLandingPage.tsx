'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  ChevronDown, 
  FileText, 
  Layers, 
  GraduationCap,
  CheckCircle2,
  Shield,
  BookOpen,
  Clock,
  FileCheck,
  Link2,
  Eye,
  Download
} from 'lucide-react';
import { useScrollHeaderSearch } from '@/hooks/useScrollHeaderSearch';
import './CitationFirstLandingPage.css';

/**
 * CitationFirstLandingPage - Complete Redesign
 * 
 * Goal: A first-time visitor understands what Esy is within 5 seconds.
 * 
 * Success test: Visitor can say:
 * "This is a citation-first research workflow platform.
 *  I bring sources. It enforces rigor.
 *  This is not a chat tool."
 * 
 * Design: Premium, cinematic, confident, calm, human.
 */

// Proof artifacts - visual essays produced by the platform
const proofArtifacts = [
  {
    title: "The Manhattan Project",
    subtitle: "The Race for Atomic Power",
    category: "History",
    readTime: "12 min",
    sources: 8,
    qaStatus: "Verified",
    image: "/images/great-fire/great-fire-london-1675.jpg",
    href: "/essays/history/the-manhattan-project/"
  },
  {
    title: "The Great Fire of London",
    subtitle: "How a City Rose from Ashes",
    category: "History",
    readTime: "10 min",
    sources: 6,
    qaStatus: "Verified",
    image: "/images/great-fire/great-fire-london-1675.jpg",
    href: "/essays/history/great-fire-of-london/"
  },
  {
    title: "The Fork",
    subtitle: "A Tool That Changed Civilization",
    category: "Culture",
    readTime: "8 min",
    sources: 5,
    qaStatus: "Verified",
    image: "/images/great-fire/great-fire-london-1675.jpg",
    href: "/scrollytelling/the-fork/"
  },
  {
    title: "The History of the Bicycle",
    subtitle: "Two Wheels, Infinite Freedom",
    category: "Technology",
    readTime: "11 min",
    sources: 7,
    qaStatus: "Verified",
    image: "/images/great-fire/great-fire-london-1675.jpg",
    href: "/scrollytelling/bicycle-history/"
  }
];

// Process steps - simplified 5-step flow
const processSteps = [
  {
    number: "01",
    title: "Upload Sources",
    description: "PDFs, URLs, or citation sets. You control what goes in.",
    icon: FileText
  },
  {
    number: "02",
    title: "Extract Claims",
    description: "Esy maps every assertion to supporting evidence.",
    icon: Link2
  },
  {
    number: "03",
    title: "Run QA Gates",
    description: "Source balance, claim coverage, citation accuracy.",
    icon: FileCheck
  },
  {
    number: "04",
    title: "Generate Artifact",
    description: "Essays, visuals, or teaching materials—with provenance.",
    icon: Layers
  },
  {
    number: "05",
    title: "Publish or Export",
    description: "Share publicly or export for professional use.",
    icon: Download
  }
];

const CitationFirstLandingPage: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  useScrollHeaderSearch(heroRef);

  return (
    <div className="citation-first-page">
      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION
          Goal: Explain what Esy is in 5 seconds
          Structure: Category → Differentiation → Human explanation
          ══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="cf-hero" aria-labelledby="hero-title">
        {/* Atmospheric Background */}
        <div className="cf-hero-background" aria-hidden="true">
          <div className="cf-hero-gradient" />
          <div className="cf-hero-mesh" />
          <div className="cf-hero-noise" />
        </div>

        {/* Hero Content */}
        <div className="cf-hero-content">
          {/* Main Headline - 2-line structure */}
          <h1 id="hero-title" className="cf-hero-title">
            <span className="cf-hero-title-line cf-hero-title-primary">
              Research That Starts With
            </span>
            <span className="cf-hero-title-line">
              <span className="cf-hero-title-emphasis">Sources,</span>
              {" "}Not Prompts.
            </span>
          </h1>
          
          {/* Human Explanation - Supporting copy */}
          <p className="cf-hero-subtitle">
            Esy is a citation-first research platform. You bring the PDFs and references. 
            Esy enforces rigor—mapping claims to evidence, running quality gates, and 
            producing artifacts you can actually defend.
          </p>
          
          {/* CTA Group */}
          <div className="cf-hero-cta-group">
            <Link href="/agentic-workflows/" className="cf-hero-cta-primary">
              <FileText size={18} />
              <span>Start With Your PDFs</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/essays/" className="cf-hero-cta-secondary">
              <span>See What It Produces</span>
            </Link>
          </div>

          {/* Trust Signals - Key differentiators */}
          <div className="cf-hero-trust">
            <div className="cf-hero-trust-item">
              <CheckCircle2 size={16} />
              <span>No synthesis without sources</span>
            </div>
            <div className="cf-hero-trust-separator">•</div>
            <div className="cf-hero-trust-item">
              <Shield size={16} />
              <span>Every claim traced to evidence</span>
            </div>
            <div className="cf-hero-trust-separator">•</div>
            <div className="cf-hero-trust-item">
              <Eye size={16} />
              <span>QA gates are explicit</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="cf-scroll-indicator" aria-hidden="true">
          <span>How it&apos;s different</span>
          <ChevronDown className="cf-scroll-arrow" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHY CITATION-FIRST SECTION
          Goal: Show consequences of the difference, not features
          ══════════════════════════════════════════════════════════════ */}
      <section className="cf-why-section" aria-labelledby="why-title">
        <div className="cf-why-container">
          <div className="cf-why-header">
            <span className="cf-section-eyebrow">The Problem</span>
            <h2 id="why-title" className="cf-why-title">
              Most AI Tools Generate First,{" "}
              <span className="cf-gradient-text">Cite Later.</span>
            </h2>
            <p className="cf-why-description">
              They produce fluent text immediately. Citations are optional—bolted on after, 
              or worse, hallucinated. The result? Outputs that look authoritative but can&apos;t 
              withstand scrutiny. You can&apos;t defend what you can&apos;t trace.
            </p>
          </div>

          <div className="cf-why-comparison">
            {/* Generation-First Column */}
            <div className="cf-why-column cf-why-column-generation">
              <div className="cf-why-column-header">
                <span className="cf-why-column-label cf-label-muted">Generation-First Approach</span>
                <span className="cf-why-column-tag cf-tag-warning">Common AI Tools</span>
              </div>
              <ul className="cf-why-list">
                <li className="cf-why-list-item cf-why-item-negative">
                  <span className="cf-why-icon">×</span>
                  <span>Generate text immediately from prompts</span>
                </li>
                <li className="cf-why-list-item cf-why-item-negative">
                  <span className="cf-why-icon">×</span>
                  <span>Citations added afterward (if at all)</span>
                </li>
                <li className="cf-why-list-item cf-why-item-negative">
                  <span className="cf-why-icon">×</span>
                  <span>No provenance chain for claims</span>
                </li>
                <li className="cf-why-list-item cf-why-item-negative">
                  <span className="cf-why-icon">×</span>
                  <span>Hard to verify, hard to defend</span>
                </li>
              </ul>
              <p className="cf-why-consequence">
                → Fast output, fragile foundation
              </p>
            </div>

            {/* Citation-First Column */}
            <div className="cf-why-column cf-why-column-citation">
              <div className="cf-why-column-header">
                <span className="cf-why-column-label cf-label-accent">Citation-First Approach</span>
                <span className="cf-why-column-tag cf-tag-accent">Esy</span>
              </div>
              <ul className="cf-why-list">
                <li className="cf-why-list-item cf-why-item-positive">
                  <span className="cf-why-icon">✓</span>
                  <span>Sources come first—you control input</span>
                </li>
                <li className="cf-why-list-item cf-why-item-positive">
                  <span className="cf-why-icon">✓</span>
                  <span>Claims are bound to evidence</span>
                </li>
                <li className="cf-why-list-item cf-why-item-positive">
                  <span className="cf-why-icon">✓</span>
                  <span>Artifacts inherit full provenance</span>
                </li>
                <li className="cf-why-list-item cf-why-item-positive">
                  <span className="cf-why-icon">✓</span>
                  <span>QA gates catch gaps before output</span>
                </li>
              </ul>
              <p className="cf-why-consequence cf-why-consequence-positive">
                → Structured output, defensible by design
              </p>
            </div>
          </div>

          <div className="cf-why-bottom">
            <p className="cf-why-tagline">
              Esy inverts the model: <strong>no synthesis without a verified citation set.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WORKFLOWS SECTION
          Goal: Make one flagship workflow obvious, two secondary clear
          ══════════════════════════════════════════════════════════════ */}
      <section className="cf-workflows-section" aria-labelledby="workflows-title">
        <div className="cf-workflows-container">
          <div className="cf-workflows-header">
            <span className="cf-section-eyebrow">The Product</span>
            <h2 id="workflows-title" className="cf-workflows-title">
              Start With a <span className="cf-gradient-text">Workflow</span>
            </h2>
            <p className="cf-workflows-description">
              Each workflow transforms sources into a specific artifact type. 
              Pick one. Upload your sources. Let Esy enforce the rigor.
            </p>
          </div>

          {/* Flagship Workflow - Prominent */}
          <div className="cf-workflow-flagship">
            <div className="cf-workflow-flagship-badge">
              <span>Flagship Workflow</span>
            </div>
            <div className="cf-workflow-flagship-card">
              <div className="cf-workflow-flagship-content">
                <div className="cf-workflow-flagship-icon">
                  <FileText size={32} />
                </div>
                <div className="cf-workflow-flagship-text">
                  <h3 className="cf-workflow-flagship-title">
                    Research PDFs → Structured Research Package
                  </h3>
                  <p className="cf-workflow-flagship-description">
                    Upload academic PDFs. Esy extracts claims, maps them to evidence, 
                    verifies source balance, and produces a structured research package 
                    with normalized citations.
                  </p>
                  <div className="cf-workflow-flagship-outputs">
                    <span className="cf-workflow-output-tag">Claim → Evidence Mapping</span>
                    <span className="cf-workflow-output-tag">Methods Summary</span>
                    <span className="cf-workflow-output-tag">BibTeX/APA Citations</span>
                    <span className="cf-workflow-output-tag">QA Confidence Score</span>
                  </div>
                </div>
                <Link href="/agentic-workflows/" className="cf-workflow-flagship-cta">
                  <span>Start This Workflow</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Secondary Workflows */}
          <div className="cf-workflows-secondary">
            <h4 className="cf-workflows-secondary-label">Also available</h4>
            <div className="cf-workflows-grid">
              {/* Visual Essay Workflow */}
              <div className="cf-workflow-card cf-workflow-card--pink">
                <div className="cf-workflow-header">
                  <div className="cf-workflow-icon cf-workflow-icon--pink">
                    <Layers size={24} />
                  </div>
                </div>
                <h3 className="cf-workflow-title">Synthesis → Visual Essay</h3>
                <p className="cf-workflow-description">
                  Combine multiple research packages into narrative essays with 
                  visual storytelling and full source traceability.
                </p>
                <div className="cf-workflow-outputs">
                  <span className="cf-workflow-outputs-label">Produces:</span>
                  <ul className="cf-workflow-outputs-list">
                    <li className="cf-workflow-output-item">
                      <CheckCircle2 size={12} />
                      <span>Narrative essay structure</span>
                    </li>
                    <li className="cf-workflow-output-item">
                      <CheckCircle2 size={12} />
                      <span>Charts, timelines, diagrams</span>
                    </li>
                    <li className="cf-workflow-output-item">
                      <CheckCircle2 size={12} />
                      <span>Source-balanced synthesis</span>
                    </li>
                  </ul>
                </div>
                <Link href="/agentic-workflows/" className="cf-workflow-cta cf-workflow-cta--pink">
                  <span>Start Workflow</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Teaching Artifacts Workflow */}
              <div className="cf-workflow-card cf-workflow-card--amber">
                <div className="cf-workflow-header">
                  <div className="cf-workflow-icon cf-workflow-icon--amber">
                    <GraduationCap size={24} />
                  </div>
                </div>
                <h3 className="cf-workflow-title">Teaching Artifacts</h3>
                <p className="cf-workflow-description">
                  Create worksheets, flashcards, and quizzes from verified sources 
                  with reading-level verification and curriculum alignment.
                </p>
                <div className="cf-workflow-outputs">
                  <span className="cf-workflow-outputs-label">Produces:</span>
                  <ul className="cf-workflow-outputs-list">
                    <li className="cf-workflow-output-item">
                      <CheckCircle2 size={12} />
                      <span>Worksheets & answer keys</span>
                    </li>
                    <li className="cf-workflow-output-item">
                      <CheckCircle2 size={12} />
                      <span>Flashcards (Anki-ready)</span>
                    </li>
                    <li className="cf-workflow-output-item">
                      <CheckCircle2 size={12} />
                      <span>Reading level verified</span>
                    </li>
                  </ul>
                </div>
                <Link href="/agentic-workflows/" className="cf-workflow-cta cf-workflow-cta--amber">
                  <span>Start Workflow</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ARTIFACTS SECTION
          Goal: Show real artifacts as PROOF, not identity
          ══════════════════════════════════════════════════════════════ */}
      <section className="cf-artifacts-section" aria-labelledby="artifacts-title">
        <div className="cf-artifacts-container">
          <div className="cf-artifacts-header">
            <span className="cf-section-eyebrow">Proof of Method</span>
            <h2 id="artifacts-title" className="cf-artifacts-title">
              Built From <span className="cf-gradient-text">Real Sources</span>
            </h2>
            <p className="cf-artifacts-description">
              These visual essays were created through Esy workflows. Every claim traces 
              to evidence. Every artifact carries its provenance.
            </p>
          </div>

          <div className="cf-artifacts-grid">
            {proofArtifacts.map((artifact, index) => (
              <Link 
                key={index} 
                href={artifact.href}
                className="cf-artifact-card"
              >
                <div className="cf-artifact-image">
                  <Image
                    src={artifact.image}
                    alt={artifact.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="cf-artifact-overlay" />
                </div>
                
                <div className="cf-artifact-content">
                  <span className="cf-artifact-category">{artifact.category}</span>
                  <h3 className="cf-artifact-title">{artifact.title}</h3>
                  <p className="cf-artifact-subtitle">{artifact.subtitle}</p>
                  
                  {/* Trust Metadata - Key differentiator */}
                  <div className="cf-artifact-meta">
                    <span className="cf-artifact-meta-item">
                      <BookOpen size={12} />
                      {artifact.sources} sources
                    </span>
                    <span className="cf-artifact-meta-item">
                      <Clock size={12} />
                      {artifact.readTime}
                    </span>
                    <span className="cf-artifact-meta-badge cf-artifact-meta-badge--verified">
                      <CheckCircle2 size={10} />
                      {artifact.qaStatus}
                    </span>
                  </div>
                </div>

                <div className="cf-artifact-hover-cta">
                  <span>Read Essay</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          <div className="cf-artifacts-footer">
            <p className="cf-artifacts-note">
              Each essay includes source citations, evidence mapping, and QA verification.
            </p>
            <Link href="/essays/" className="cf-artifacts-view-all">
              <span>Explore All Essays</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HOW IT WORKS SECTION
          Goal: Simple 5-step flow showing the method
          ══════════════════════════════════════════════════════════════ */}
      <section className="cf-process-section" aria-labelledby="process-title">
        <div className="cf-process-container">
          <div className="cf-process-header">
            <span className="cf-section-eyebrow">The Method</span>
            <h2 id="process-title" className="cf-process-title">
              How <span className="cf-gradient-text">Citation-First</span> Works
            </h2>
            <p className="cf-process-description">
              Sources in. Quality gates enforced. Artifacts out.
            </p>
          </div>

          <div className="cf-process-steps">
            <div className="cf-process-line" aria-hidden="true" />
            
            {processSteps.map((step, index) => (
              <div key={index} className="cf-process-step">
                <div className="cf-process-step-icon">
                  <step.icon size={20} />
                </div>
                <div className="cf-process-number">{step.number}</div>
                <h3 className="cf-process-step-title">{step.title}</h3>
                <p className="cf-process-step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          DEFENSIBILITY SECTION
          Goal: Explain WHY this matters - reliability, auditability
          ══════════════════════════════════════════════════════════════ */}
      <section className="cf-trust-section" aria-labelledby="trust-title">
        <div className="cf-trust-container">
          <div className="cf-trust-content">
            <span className="cf-section-eyebrow">The Payoff</span>
            <h2 id="trust-title" className="cf-trust-title">
              Research You Can <span className="cf-gradient-text">Stand Behind</span>
            </h2>
            <p className="cf-trust-description">
              Citation-first isn&apos;t just a methodology—it&apos;s a commitment to defensibility. 
              When someone asks &ldquo;where did this come from?&rdquo; you have an answer.
            </p>
          </div>

          <div className="cf-trust-features">
            <div className="cf-trust-feature">
              <div className="cf-trust-feature-icon">
                <Link2 size={24} />
              </div>
              <h3 className="cf-trust-feature-title">Full Traceability</h3>
              <p className="cf-trust-feature-description">
                Every claim links to its source. Every artifact carries its provenance chain. 
                Nothing is generated without a foundation.
              </p>
            </div>

            <div className="cf-trust-feature">
              <div className="cf-trust-feature-icon">
                <FileCheck size={24} />
              </div>
              <h3 className="cf-trust-feature-title">Explicit QA Gates</h3>
              <p className="cf-trust-feature-description">
                Source balance, claim coverage, citation accuracy—all verified before 
                output. Gaps are caught, not hidden.
              </p>
            </div>

            <div className="cf-trust-feature">
              <div className="cf-trust-feature-icon">
                <Shield size={24} />
              </div>
              <h3 className="cf-trust-feature-title">Audit-Ready Output</h3>
              <p className="cf-trust-feature-description">
                Formatted for academic, professional, and public scrutiny. 
                Built for people who need to defend their work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINAL CTA SECTION
          Goal: Direct users to start a workflow
          ══════════════════════════════════════════════════════════════ */}
      <section className="cf-final-cta-section" aria-labelledby="final-cta-title">
        <div className="cf-final-cta-background" aria-hidden="true" />
        
        <div className="cf-final-cta-container">
          <h2 id="final-cta-title" className="cf-final-cta-title">
            Ready to Work With <span className="cf-gradient-text">Real Sources?</span>
          </h2>
          <p className="cf-final-cta-description">
            Start with PDFs or build a citation set. Pick a workflow. 
            Let Esy enforce the rigor so you can focus on the research.
          </p>
          
          <div className="cf-final-cta-buttons">
            <Link href="/agentic-workflows/" className="cf-final-cta-primary">
              <FileText size={18} />
              <span>Start a Workflow</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/docs" className="cf-final-cta-secondary">
              <span>Read the Docs</span>
            </Link>
          </div>

          <p className="cf-final-cta-note">
            For researchers, teachers, journalists, and anyone who needs to defend their work.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CitationFirstLandingPage;
