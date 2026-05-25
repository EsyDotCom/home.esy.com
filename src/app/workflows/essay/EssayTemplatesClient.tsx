'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  PenTool, 
  GraduationCap, 
  BookOpen, 
  FileCheck,
  Sparkles,
  Download,
  Zap
} from 'lucide-react';
import './essay-templates.css';

interface EssayType {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  templateCount: number;
  promptCount: number;
  searchVolume: string;
  tags: string[];
}

const essayTypes: EssayType[] = [
  {
    slug: 'argumentative',
    title: 'Argumentative Essay',
    shortTitle: 'Argumentative',
    description: 'Build compelling arguments with clear thesis statements, supporting evidence, and counterargument analysis. The most commonly assigned essay type in academic settings.',
    icon: <PenTool size={24} />,
    accentColor: '#8b5cf6',
    templateCount: 1,
    promptCount: 3,
    searchVolume: 'High',
    tags: ['Academic', 'Debate', 'Persuasion'],
  },
  {
    slug: 'college-application',
    title: 'College Application Essay',
    shortTitle: 'College App',
    description: 'Craft authentic personal narratives that showcase your unique voice, experiences, and potential. Stand out in competitive admissions with compelling storytelling.',
    icon: <GraduationCap size={24} />,
    accentColor: '#ec4899',
    templateCount: 1,
    promptCount: 3,
    searchVolume: 'High',
    tags: ['Admissions', 'Personal', 'Narrative'],
  },
  {
    slug: 'research',
    title: 'Research Essay',
    shortTitle: 'Research',
    description: 'Structure comprehensive research papers with proper methodology, source integration, and academic rigor. From literature reviews to empirical studies.',
    icon: <BookOpen size={24} />,
    accentColor: '#06b6d4',
    templateCount: 1,
    promptCount: 3,
    searchVolume: 'High',
    tags: ['Academic', 'Citations', 'Analysis'],
  },
  {
    slug: 'mla-format',
    title: 'MLA Format Essay',
    shortTitle: 'MLA Format',
    description: 'Master MLA citation style with properly formatted essays, works cited pages, and in-text citations. Essential for humanities and liberal arts courses.',
    icon: <FileCheck size={24} />,
    accentColor: '#f59e0b',
    templateCount: 1,
    promptCount: 3,
    searchVolume: '30K+',
    tags: ['Formatting', 'Citations', 'Academic'],
  },
  {
    slug: 'expository',
    title: 'Expository Essay',
    shortTitle: 'Expository',
    description: 'Explain complex topics clearly with logical organization and factual evidence. The foundational essay type for informative writing across disciplines.',
    icon: <FileText size={24} />,
    accentColor: '#22c55e',
    templateCount: 1,
    promptCount: 3,
    searchVolume: 'High',
    tags: ['Informative', 'Educational', 'Clarity'],
  },
];

export default function EssayTemplatesClient() {
  return (
    <div className="essay-templates">
      {/* Hero Section */}
      <section className="essay-hero">
        <div className="essay-hero-glow" />
        <div className="essay-hero-content">
          {/* Breadcrumb */}
          <nav className="essay-breadcrumb">
            <Link href="/workflows">
              <ArrowLeft size={16} />
              Agentic Workflows
            </Link>
            <span className="essay-breadcrumb-separator">/</span>
            <span className="essay-breadcrumb-current">Essay Workflow Templates</span>
          </nav>

          {/* Badge */}
          <div className="essay-badge">
            <FileText size={16} className="essay-badge-icon" />
            <span className="essay-badge-text">Essay Workflow Templates</span>
          </div>

          {/* Title */}
          <h1 className="essay-title">Essay Workflow Templates & AI Prompts</h1>

          {/* Subtitle */}
          <p className="essay-subtitle">
            Move beyond a blank AI prompt with ready-to-use essay workflow templates.
            Each workflow template includes a structural breakdown and 2-3 specialized prompts for
            thesis development, body paragraphs, and revision.
          </p>

          {/* Stats */}
          <div className="essay-stats">
            <div className="essay-stat">
              <Download size={18} className="essay-stat-icon" style={{ color: '#9f7aea' }} />
              <span className="essay-stat-text">
                <strong>5</strong> Workflow Templates
              </span>
            </div>
            <div className="essay-stat">
              <Zap size={18} className="essay-stat-icon" style={{ color: '#ec4899' }} />
              <span className="essay-stat-text">
                <strong>15+</strong> AI Prompts
              </span>
            </div>
            <div className="essay-stat">
              <Sparkles size={18} className="essay-stat-icon" style={{ color: '#f59e0b' }} />
              <span className="essay-stat-text">
                <strong>100%</strong> Free
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Essay Types Grid */}
      <section className="essay-container essay-section">
        <h2 className="essay-section-title">Choose Your Essay Type</h2>

        <div className="essay-types-grid">
          {essayTypes.map((essay) => (
            <Link
              key={essay.slug}
              href={`/workflows/essay/${essay.slug}`}
              className="essay-type-card"
              style={{
                '--card-accent': essay.accentColor,
                '--icon-bg': `${essay.accentColor}15`,
                '--icon-color': essay.accentColor,
                '--cta-color': essay.accentColor,
              } as React.CSSProperties}
            >
              {/* Header */}
              <div className="essay-card-header">
                <div className="essay-card-icon">
                  {essay.icon}
                </div>
                <div className="essay-card-badges">
                  <span 
                    className="essay-card-badge"
                    style={{ 
                      background: `${essay.accentColor}20`,
                      color: essay.accentColor,
                    }}
                  >
                    {essay.templateCount} Outline
                  </span>
                  <span 
                    className="essay-card-badge"
                    style={{ 
                      background: 'rgba(159, 122, 234, 0.2)',
                      color: '#9f7aea',
                    }}
                  >
                    {essay.promptCount} Prompts
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="essay-card-title">{essay.title}</h3>

              {/* Description */}
              <p className="essay-card-description">{essay.description}</p>

              {/* Tags */}
              <div className="essay-card-tags">
                {essay.tags.map((tag) => (
                  <span key={tag} className="essay-card-tag">{tag}</span>
                ))}
              </div>

              {/* CTA */}
              <div className="essay-card-footer">
                <span className="essay-card-cta">
                  View Workflow Templates
                  <ArrowRight size={16} />
                </span>
                <span className="essay-card-meta">
                  {essay.searchVolume} search volume
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* What's Included Section */}
      <section className="essay-container essay-section">
        <div className="essay-included-card">
          <h2 className="essay-included-title">What&apos;s Included in Each Workflow Template</h2>

          <div className="essay-included-grid">
            {/* Outline Template */}
            <div className="essay-included-item">
              <div className="essay-included-item-header">
                <div 
                  className="essay-included-item-icon"
                  style={{ background: 'rgba(159, 122, 234, 0.15)' }}
                >
                  <Download size={20} style={{ color: '#9f7aea' }} />
                </div>
                <h3 className="essay-included-item-title">Downloadable Outline</h3>
              </div>
              <p className="essay-included-item-text">
                A ready-to-use essay outline with section headers, paragraph structure, 
                word count targets, and transition suggestions. Copy into your document 
                and start writing immediately.
              </p>
            </div>

            {/* Structural Breakdown */}
            <div className="essay-included-item">
              <div className="essay-included-item-header">
                <div 
                  className="essay-included-item-icon"
                  style={{ background: 'rgba(236, 72, 153, 0.15)' }}
                >
                  <FileText size={20} style={{ color: '#ec4899' }} />
                </div>
                <h3 className="essay-included-item-title">Structural Breakdown</h3>
              </div>
              <p className="essay-included-item-text">
                Educational content explaining what makes this essay type effective. 
                Learn the key components, common pitfalls, and how to structure 
                each section for maximum impact.
              </p>
            </div>

            {/* AI Prompts */}
            <div className="essay-included-item">
              <div className="essay-included-item-header">
                <div 
                  className="essay-included-item-icon"
                  style={{ background: 'rgba(245, 158, 11, 0.15)' }}
                >
                  <Zap size={20} style={{ color: '#f59e0b' }} />
                </div>
                <h3 className="essay-included-item-title">AI Writing Prompts</h3>
              </div>
              <p className="essay-included-item-text">
                2-3 specialized prompts for thesis development, body paragraph expansion, 
                and revision. Optimized for ChatGPT, Claude, and the Esy editor to 
                produce high-quality output.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="essay-container essay-coming-soon">
        <h2 className="essay-coming-soon-title">Coming Soon</h2>
        <p className="essay-coming-soon-text">More essay workflow templates are on the way:</p>
        <div className="essay-coming-soon-tags">
          {['Persuasive', 'Analytical', 'Compare/Contrast', 'Narrative', 'Synthesis'].map((type) => (
            <span key={type} className="essay-coming-soon-tag">{type}</span>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="essay-container essay-section">
        <div className="essay-cta-section">
          <h2 className="essay-cta-title">Ready to write better essays?</h2>
          <p className="essay-cta-text">
            Use our AI-powered editor to bring these workflow templates to life with intelligent writing assistance.
          </p>
          <div className="essay-cta-buttons">
            <Link
              href="https://app.esy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="essay-btn-primary"
            >
              Try Esy Editor Free
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <div className="essay-footer-spacer" />
    </div>
  );
}
