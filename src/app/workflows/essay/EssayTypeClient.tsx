'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  Copy, 
  Check, 
  Download, 
  Zap,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import './essay-templates.css';

interface OutlineSection {
  title: string;
  content: string;
  wordCount?: string;
}

interface EssayPrompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  variables: string[];
  expectedOutput: string;
}

interface StructuralElement {
  title: string;
  description: string;
  tips: string[];
}

export interface EssayTypeData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  outline: OutlineSection[];
  structuralBreakdown: StructuralElement[];
  prompts: EssayPrompt[];
  seoIntro: string;
}

interface EssayTypeClientProps {
  data: EssayTypeData;
}

export default function EssayTypeClient({ data }: EssayTypeClientProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);
  const [outlineCopied, setOutlineCopied] = useState(false);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyOutline = async () => {
    const outlineText = data.outline
      .map((section) => `## ${section.title}\n${section.content}`)
      .join('\n\n');
    
    try {
      await navigator.clipboard.writeText(outlineText);
      setOutlineCopied(true);
      setTimeout(() => setOutlineCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // CSS custom properties for accent color theming
  const accentStyles = {
    '--accent-color': data.accentColor,
    '--accent-glow': `${data.accentColor}12`,
    '--accent-muted': `${data.accentColor}15`,
    '--accent-border': `${data.accentColor}30`,
    '--btn-color': data.accentColor,
    '--btn-color-dark': data.accentColor,
    '--btn-shadow': `${data.accentColor}40`,
    '--btn-shadow-hover': `${data.accentColor}50`,
    '--cta-glow': `${data.accentColor}10`,
    '--cta-border': `${data.accentColor}20`,
  } as React.CSSProperties;

  return (
    <div className="essay-templates" style={accentStyles}>
      {/* Hero Section */}
      <section className="essay-hero">
        <div className="essay-hero-glow" />
        <div className="essay-hero-content">
          {/* Breadcrumb */}
          <nav className="essay-breadcrumb">
            <Link href="/workflows">Workflows</Link>
            <span className="essay-breadcrumb-separator">/</span>
            <Link href="/workflows/essay">Essay Templates</Link>
            <span className="essay-breadcrumb-separator">/</span>
            <span className="essay-breadcrumb-current">{data.title}</span>
          </nav>

          {/* Badge */}
          <div className="essay-badge">
            <span className="essay-badge-icon">{data.icon}</span>
            <span className="essay-badge-text">Essay Template</span>
          </div>

          {/* Title */}
          <h1 className="essay-title">{data.title} Template</h1>

          {/* Subtitle */}
          <p className="essay-subtitle">{data.subtitle}</p>

          {/* Quick Stats */}
          <div className="essay-quick-stats">
            <div className="essay-quick-stat">
              <Download size={16} style={{ color: data.accentColor }} />
              <span>1 Outline Template</span>
            </div>
            <div className="essay-quick-stat">
              <Zap size={16} style={{ color: '#f59e0b' }} />
              <span>{data.prompts.length} AI Prompts</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Intro */}
      <section className="essay-container">
        <div 
          className="essay-intro-card"
          dangerouslySetInnerHTML={{ __html: data.seoIntro }}
        />
      </section>

      {/* Main Content */}
      <div className="essay-container">
        {/* Essay Outline Section */}
        <section className="essay-section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 className="essay-section-title" style={{ marginBottom: 0 }}>
              <Download size={24} className="essay-section-title-icon" style={{ color: data.accentColor }} />
              Essay Outline Template
            </h2>
            <button
              onClick={copyOutline}
              className={`essay-copy-btn essay-copy-btn-large ${outlineCopied ? 'copied' : ''}`}
              style={!outlineCopied ? { 
                background: `${data.accentColor}20`,
                borderColor: `${data.accentColor}40`,
                color: data.accentColor,
              } : undefined}
            >
              {outlineCopied ? (
                <>
                  <Check size={16} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy Outline
                </>
              )}
            </button>
          </div>

          <div className="essay-outline">
            {data.outline.map((section, index) => (
              <div key={index} className="essay-outline-section">
                <div className="essay-outline-header">
                  <h3 className="essay-outline-title">{section.title}</h3>
                  {section.wordCount && (
                    <span className="essay-outline-wordcount">{section.wordCount}</span>
                  )}
                </div>
                <div className="essay-outline-content">{section.content}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Structural Breakdown Section */}
        <section className="essay-section">
          <h2 className="essay-section-title">
            <Sparkles size={24} className="essay-section-title-icon" style={{ color: '#ec4899' }} />
            Structural Breakdown
          </h2>

          <div className="essay-breakdown-grid">
            {data.structuralBreakdown.map((element, index) => (
              <div key={index} className="essay-breakdown-card">
                <h3 className="essay-breakdown-title">{element.title}</h3>
                <p className="essay-breakdown-description">{element.description}</p>
                <ul className="essay-breakdown-tips">
                  {element.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="essay-breakdown-tip">{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* AI Prompts Section */}
        <section className="essay-section">
          <h2 className="essay-section-title">
            <Zap size={24} className="essay-section-title-icon" style={{ color: '#f59e0b' }} />
            AI Writing Prompts
          </h2>

          <div className="essay-prompts">
            {data.prompts.map((prompt) => (
              <div key={prompt.id} className="essay-prompt-card">
                {/* Prompt Header */}
                <button
                  onClick={() => setExpandedPrompt(expandedPrompt === prompt.id ? null : prompt.id)}
                  className="essay-prompt-header"
                >
                  <div>
                    <h3 className="essay-prompt-title">{prompt.title}</h3>
                    <p className="essay-prompt-description">{prompt.description}</p>
                  </div>
                  <div className="essay-prompt-toggle">
                    {expandedPrompt === prompt.id ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedPrompt === prompt.id && (
                  <div className="essay-prompt-body">
                    {/* Variables */}
                    {prompt.variables.length > 0 && (
                      <div className="essay-prompt-variables">
                        <span className="essay-prompt-variables-label">Variables to fill:</span>
                        <div className="essay-prompt-variables-list">
                          {prompt.variables.map((variable) => (
                            <span key={variable} className="essay-prompt-variable">
                              [{variable}]
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Prompt Content */}
                    <div className="essay-prompt-content">
                      <button
                        onClick={() => copyToClipboard(prompt.prompt, prompt.id)}
                        className={`essay-copy-btn essay-prompt-copy-btn ${copiedId === prompt.id ? 'copied' : ''}`}
                      >
                        {copiedId === prompt.id ? (
                          <>
                            <Check size={14} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            Copy
                          </>
                        )}
                      </button>
                      <pre className="essay-prompt-text">{prompt.prompt}</pre>
                    </div>

                    {/* Expected Output */}
                    <div className="essay-prompt-expected">
                      <span className="essay-prompt-expected-label">Expected Output:</span>
                      <p className="essay-prompt-expected-text">{prompt.expectedOutput}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="essay-section">
          <div className="essay-cta-section">
            <h2 className="essay-cta-title">Write your {data.title.toLowerCase()} with AI</h2>
            <p className="essay-cta-text">
              Use these prompts in the Esy editor for AI-powered writing assistance that helps you craft better essays faster.
            </p>
            <div className="essay-cta-buttons">
              <Link
                href="https://app.esy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="essay-btn-primary"
              >
                Try Esy Editor
                <ArrowRight size={18} />
              </Link>
              <Link href="/workflows/essay" className="essay-btn-ghost">
                <ArrowLeft size={18} />
                More Essay Types
              </Link>
            </div>
          </div>
        </section>
      </div>

      <div className="essay-footer-spacer" />
    </div>
  );
}
