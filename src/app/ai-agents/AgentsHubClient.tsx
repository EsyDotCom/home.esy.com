"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Book, ArrowRight, Sparkles, Search, Zap } from "lucide-react";
import { AgentsSectionCards, AgentsBreadcrumbs } from "@/components/agents";
import { agentsNavigation, getAgentPagesByType } from "@/lib/agents-navigation";
import { getHubContent } from "@/content/agents/content";
import { navyCalmDarkTheme } from "@/lib/theme";

// Light theme
const lightTheme = {
  bg: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  accent: '#00A896',
  accentLight: 'rgba(0, 168, 150, 0.1)',
  accentBorder: 'rgba(0, 168, 150, 0.2)',
  accentMuted: 'rgba(0, 168, 150, 0.08)',
  border: 'rgba(10, 37, 64, 0.06)',
  infoBg: 'rgba(10, 37, 64, 0.02)',
  infoBorder: 'rgba(10, 37, 64, 0.06)',
};

// Dark theme
const darkTheme = {
  bg: navyCalmDarkTheme.bg,
  surface: navyCalmDarkTheme.surface,
  text: navyCalmDarkTheme.text,
  muted: navyCalmDarkTheme.muted,
  subtle: navyCalmDarkTheme.subtle,
  accent: navyCalmDarkTheme.accent,
  accentLight: navyCalmDarkTheme.accentTint,
  accentBorder: navyCalmDarkTheme.accentBorder,
  accentMuted: navyCalmDarkTheme.accentTint,
  border: navyCalmDarkTheme.border,
  infoBg: navyCalmDarkTheme.accentTint,
  infoBorder: navyCalmDarkTheme.accentBorder,
};

// JSON-LD for the hub page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Agents Reference",
  description: "A comprehensive reference guide to AI agents, agentic workflows, and orchestration patterns.",
  url: "https://esy.com/ai-agents",
  publisher: {
    "@type": "Organization",
    name: "Esy",
    url: "https://esy.com",
  },
  mainEntity: {
    "@type": "TechArticle",
    headline: "AI Agents Reference Guide",
    description: "Learn core concepts, architecture patterns, and implementation examples for AI agent systems.",
    articleSection: "Reference",
  },
};

export function AgentsHubClient() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const content = getHubContent();
  const terms = getAgentPagesByType('term');
  const patterns = getAgentPagesByType('pattern');
  const workflows = getAgentPagesByType('workflow');
  const canonical = agentsNavigation[0].items.find(item => item.href === '/ai-agents/what-are-ai-agents');

  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem('theme-agents');
      setIsDarkMode(storedTheme === 'dark');
    };
    
    checkTheme();
    window.addEventListener('themechange', checkTheme);
    return () => window.removeEventListener('themechange', checkTheme);
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="agents-hub">
        {/* Breadcrumbs */}
        <AgentsBreadcrumbs items={[
          { title: 'Home', href: '/' },
          { title: 'AI Agents', href: '/ai-agents' },
        ]} />

        {/* Header */}
        <header className="agents-hub-header">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 0.75rem',
            background: theme.accentLight,
            border: `1px solid ${theme.accentBorder}`,
            borderRadius: '6px',
            marginBottom: '1.25rem',
          }}>
            <Book className="w-4 h-4" style={{ color: theme.accent }} />
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 600, 
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: theme.accent,
            }}>
              Reference Book
            </span>
          </div>
          
          <h1>{content.title}</h1>
          <p>{content.lede}</p>
        </header>

        {/* Featured: What are AI Agents? */}
        {canonical && (
          <section style={{ marginBottom: '3rem' }}>
            <Link
              href={canonical.href}
              className="agents-featured-card"
              style={{
                display: 'flex',
                gap: '1.5rem',
                padding: '1.5rem',
                background: isDarkMode
                  ? `linear-gradient(135deg, ${theme.accentMuted} 0%, ${theme.accentLight} 100%)`
                  : 'linear-gradient(135deg, rgba(0, 168, 150, 0.08) 0%, rgba(0, 212, 170, 0.04) 100%)',
                border: `1px solid ${theme.accentBorder}`,
                borderRadius: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #00A896 0%, #00D4AA 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Sparkles className="w-6 h-6" style={{ color: '#FFFFFF' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.375rem',
                }}>
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: theme.accent,
                  }}>
                    Start Here
                  </span>
                  {canonical.isNew && (
                    <span style={{
                      padding: '0.125rem 0.375rem',
                      background: 'linear-gradient(135deg, #00A896 0%, #00D4AA 100%)',
                      color: '#FFFFFF',
                      borderRadius: '4px',
                      fontSize: '0.5625rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}>
                      New
                    </span>
                  )}
                </div>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: theme.text,
                  marginBottom: '0.375rem',
                  letterSpacing: '-0.02em',
                }}>
                  {canonical.title}
                </h2>
                <p style={{
                  fontSize: '0.9375rem',
                  color: theme.muted,
                  marginBottom: '0.5rem',
                  lineHeight: 1.5,
                }}>
                  {canonical.description}
                </p>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: theme.accent,
                }}>
                  Read the overview
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* How to use this guide */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{
            padding: '1.25rem 1.5rem',
            background: theme.infoBg,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
          }}>
            <h2 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: theme.text,
              marginBottom: '0.75rem',
              letterSpacing: '-0.01em',
            }}>
              How to Use This Reference
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'rgba(0, 168, 150, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Book className="w-3.5 h-3.5" style={{ color: '#00A896' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: theme.text, marginBottom: '0.125rem' }}>
                    Core Terms
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: theme.subtle }}>
                    Foundational definitions
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: theme.accentLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Zap className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: theme.text, marginBottom: '0.125rem' }}>
                    Patterns
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: theme.subtle }}>
                    Proven architectures
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: theme.accentLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Search className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: theme.text, marginBottom: '0.125rem' }}>
                    Workflows
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: theme.subtle }}>
                    Esy implementations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <AgentsSectionCards 
          title="Core Terms" 
          description="Foundational definitions for understanding AI agent systems"
          items={terms}
        />
        
        <AgentsSectionCards 
          title="Architecture Patterns" 
          description="Proven approaches for structuring agent systems"
          items={patterns}
        />
        
        <AgentsSectionCards 
          title="Esy Workflows" 
          description="Implementation examples showing patterns in practice"
          items={workflows}
        />

        {/* Implementation Note */}
        <section style={{ marginTop: '2rem' }}>
          <div style={{
            padding: '1rem 1.25rem',
            background: theme.accentLight,
            border: `1px solid ${theme.accentBorder}`,
            borderRadius: '10px',
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: theme.muted,
              margin: 0,
              lineHeight: 1.6,
            }}>
              <strong style={{ color: theme.accent }}>Esy Implementation Track:</strong>{' '}
              Where relevant, entries include practical implementation examples from Esy&apos;s research workflows. 
              These demonstrate how abstract concepts translate to working systems.
            </p>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .agents-featured-card:hover {
          transform: translateY(-2px);
          box-shadow: ${isDarkMode 
            ? '0 8px 24px rgba(0, 212, 170, 0.2)' 
            : '0 8px 24px rgba(0, 168, 150, 0.15)'} !important;
        }
      `}</style>
    </>
  );
}

export default AgentsHubClient;
