'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  Clock,
  BarChart3,
  Sparkles,
  Layers,
  Zap,
  GraduationCap,
  Palette,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useScrollHeaderSearch } from '@/hooks/useScrollHeaderSearch';
import {
  getWorkflowTemplates,
  searchTemplates,
} from '@/lib/templates';
import {
  getWorkflowCatalog,
  toPipelineStages,
} from '@/lib/workflow-catalog';
import SearchBar from '@/components/SearchBar/SearchBar';
import WorkflowPipelineStrip from '@/components/templates/WorkflowPipelineStrip';

const APP_URL = 'https://app.esy.com';

// Navy Calm Light Theme
const theme = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  surface: '#F1F5F9',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  faint: 'rgba(10, 37, 64, 0.35)',
  border: 'rgba(10, 37, 64, 0.08)',
  divider: 'rgba(10, 37, 64, 0.05)',
  accent: '#00A896',
  accentLight: 'rgba(0, 168, 150, 0.08)',
  accentBorder: 'rgba(0, 168, 150, 0.2)',
};

// Intent-based creation paths with enhanced metadata
const creationPaths = [
  {
    id: 'visual-essays',
    title: 'Visual Essays',
    tagline: 'Scroll-driven narratives',
    description: 'Research + writing + visuals in immersive, explorable stories',
    href: '/workflows/visual-essays',
    icon: FileText,
    category: 'visual-essay',
    count: 12,
  },
  // {
  //   id: 'timelines',
  //   title: 'Timelines',
  //   tagline: 'Chronological narratives',
  //   description: 'Historical overviews and event sequences made visual',
  //   href: '/workflows?category=timeline',
  //   icon: Clock,
  //   category: 'timeline',
  //   count: 8,
  // },
  {
    id: 'infographics',
    title: 'Infographics',
    tagline: 'Data-driven visuals',
    description: 'Complex information distilled into clear visual summaries',
    href: '/workflows/infographics',
    icon: BarChart3,
    category: 'infographic',
    count: 6,
  },
  {
    id: 'clip-art',
    title: 'Clip Art',
    tagline: 'Isolated visual assets',
    description: 'Generate clip art with style presets, background removal, and provenance',
    href: '/workflows/clip-art',
    icon: Palette,
    category: 'clip-art',
    count: 1,
  },
  {
    id: 'academic-essays',
    title: 'Academic Essays',
    tagline: 'Scholarly writing',
    description: 'Research-backed essays with proper structure, citations, and academic rigor',
    href: '/workflows/academic-essays',
    icon: GraduationCap,
    category: 'template',
    count: 6,
  },
  // {
  //   id: 'explainers',
  //   title: 'Explainers',
  //   tagline: 'Clear breakdowns',
  //   description: 'Complex topics made accessible for any audience',
  //   href: '/workflows?category=explainer',
  //   icon: BookOpen,
  //   category: 'explainer',
  //   count: 10,
  // },
];

// Value propositions
const valueProps = [
  {
    icon: Layers,
    title: 'Beyond AI prompts',
    description: 'Move from one-off prompts to guided, repeatable workflows',
  },
  {
    icon: Zap,
    title: 'Choose a workflow template',
    description: 'Start with the kind of work you want to create',
  },
  {
    icon: Sparkles,
    title: 'Finish the work',
    description: 'Research, writing, review, and formatting in one process',
  },
];

export default function TemplatesClient() {
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [featuredHovered, setFeaturedHovered] = useState(false);

  useScrollHeaderSearch(searchBarRef);

  // Search only workflow templates (not legacy prompt pages)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    const results = searchTemplates(searchQuery).filter((t) => t.isWorkflow);
    return results.slice(0, 8).map((template) => ({
      id: template.id,
      title: template.title,
      description: template.shortDescription,
      category: template.subcategory,
      slug: `/workflows/${template.slug}`,
      type: 'category' as const,
      isPro: template.isPro || false,
      metadata: {
        difficulty: template.difficulty,
        tags: template.tags,
        category: template.category,
      },
    }));
  }, [searchQuery]);

  const handleResultSelect = (result: { slug?: string; href?: string }) => {
    const href = result.slug || result.href;
    if (href) {
      router.push(href);
    }
  };

  // The single source of truth for the cards: the live, published platform
  // catalog (build-time fetch of GET /v1/catalog/workflows). No static mock data.
  const platformWorkflows = getWorkflowCatalog();

  // esy.com only statically renders detail pages for templates declared in
  // data.ts; use that set to decide internal link vs. run-on-app fallback (e.g.
  // research-report has no marketing detail page yet, so it deep-links to the app).
  const detailSlugs = new Set(getWorkflowTemplates().map((t) => t.slug));

  const handlePathClick = (href: string) => {
    router.push(href);
  };

  // Featured template surfaced as the hero stage's right-side feature — uses the
  // first live catalog entry and the same card language as the catalog grid.
  const featuredEntry = platformWorkflows[0];
  const featuredStages = featuredEntry ? toPipelineStages(featuredEntry) : [];
  const featuredHasDetail = featuredEntry ? detailSlugs.has(featuredEntry.id) : false;
  const featuredHref = featuredEntry
    ? featuredHasDetail
      ? `/workflows/${featuredEntry.id}`
      : `${APP_URL}/workflows/${featuredEntry.id}`
    : '#';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, color: theme.text }}>
      {/* Hero — shared immersive "stage" (.esy-stage in globals.css): headline +
          meta on the left, a featured workflow-template card on the right. Search
          sits just below on the light surface so its results dropdown isn't
          clipped by the stage's overflow:hidden. */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '5.5rem 2rem 4rem',
        }}
      >
        {/* Breadcrumb on the light page surface, above the dark stage */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            color: theme.subtle,
          }}
        >
          <Link href="/" style={{ color: theme.subtle, textDecoration: 'none' }}>
            Home
          </Link>
          <span>›</span>
          <span style={{ color: theme.muted }}>Agentic Workflows</span>
        </div>

        <div className="esy-stage">
          <div className="esy-stage__copy">
            <h1 className="esy-stage__title">
              Agentic <span>Workflows</span>
            </h1>
            <p className="esy-stage__subhead">
              Move beyond one-off AI prompts. Choose a workflow template and let
              Esy guide the research, writing, review, and formatting.
            </p>
            <div className="esy-stage__meta">
              <span>
                <strong>{platformWorkflows.length}</strong> workflow templates
              </span>
              <span className="esy-stage__meta-dot" aria-hidden="true">
                ·
              </span>
              <span>idea to publishable artifact</span>
            </div>
          </div>

          {/* Featured-template spotlight — same card language as the catalog
              grid, surfaced as a light card on the dark stage. */}
          {featuredEntry && (
            <div className="esy-stage__feature">
              {(() => {
                const cardInner = (
                  <article
                    onMouseEnter={() => setFeaturedHovered(true)}
                    onMouseLeave={() => setFeaturedHovered(false)}
                    style={{
                      background: theme.bg,
                      border: `1px solid ${featuredHovered ? theme.accentBorder : theme.border}`,
                      borderRadius: '16px',
                      padding: '1.75rem',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                      boxShadow: featuredHovered
                        ? '0 28px 64px -18px rgba(0, 0, 0, 0.6)'
                        : '0 22px 50px -20px rgba(0, 0, 0, 0.5)',
                      transform: featuredHovered ? 'translateY(-4px)' : 'translateY(0)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Featured badge */}
                    <div style={{ marginBottom: '1rem' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.2rem 0.5rem',
                          background: theme.accentLight,
                          color: theme.accent,
                          borderRadius: '6px',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          letterSpacing: '0.03em',
                        }}
                      >
                        <Sparkles size={12} />
                        Featured template
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-literata)',
                        fontSize: '1.25rem',
                        fontWeight: 400,
                        letterSpacing: '-0.01em',
                        lineHeight: 1.3,
                        marginBottom: '0.5rem',
                        color: theme.text,
                      }}
                    >
                      {featuredEntry.name}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.9375rem',
                        color: theme.muted,
                        lineHeight: 1.6,
                        marginBottom: '1.25rem',
                      }}
                    >
                      {featuredEntry.shortDescription}
                    </p>

                    {/* Signature workflow pipeline — lit so the hero feels alive. */}
                    {featuredStages.length > 0 && (
                      <div style={{ marginBottom: '1rem' }}>
                        <WorkflowPipelineStrip
                          stages={featuredStages}
                          active={featuredHovered}
                          showCount
                        />
                      </div>
                    )}

                    {/* Meta row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.75rem',
                        borderTop: `1px solid ${theme.divider}`,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', color: theme.subtle }}>
                          <Clock size={13} />
                          {featuredEntry.estimatedRuntime}
                        </span>
                        <span style={{ fontSize: '0.8125rem', color: theme.faint }}>
                          {featuredEntry.outputType}
                        </span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          color: theme.accent,
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                        }}
                      >
                        View
                        <ArrowRight
                          size={14}
                          style={{
                            transform: featuredHovered ? 'translateX(3px)' : 'translateX(0)',
                            transition: 'transform 0.2s ease',
                          }}
                        />
                      </div>
                    </div>
                  </article>
                );

                const linkStyle = { textDecoration: 'none' as const, display: 'block' };
                return featuredHasDetail ? (
                  <Link href={featuredHref} style={linkStyle}>
                    {cardInner}
                  </Link>
                ) : (
                  <a href={featuredHref} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    {cardInner}
                  </a>
                );
              })()}
            </div>
          )}
        </div>

        {/* Search toolbar on the light surface, just below the stage */}
        <div ref={searchBarRef} style={{ maxWidth: '520px', marginTop: '2rem' }}>
          <SearchBar
            placeholder="Search workflow templates..."
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            context="templates"
            inputFontSize="0.9375rem"
            showDropdown={searchQuery.length > 0}
            searchResults={searchResults}
            onResultSelect={handleResultSelect}
            maxResults={8}
            isLightMode={true}
          />
        </div>
      </section>

      {/* Value Props - Subtle, Horizontal */}
      <section
        style={{
          borderTop: `1px solid ${theme.divider}`,
          borderBottom: `1px solid ${theme.divider}`,
          background: theme.elevated,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(2rem, 4vh, 3rem) clamp(1.5rem, 5vw, 3rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {valueProps.map((prop, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <prop.icon size={18} style={{ color: theme.accent }} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: theme.text, marginBottom: '0.25rem' }}>
                  {prop.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: theme.subtle, lineHeight: 1.5, margin: 0 }}>
                  {prop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creation Paths - Primary Navigation */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 3rem)',
        }}
      >
        <div style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: theme.text,
              marginBottom: '0.5rem',
            }}
          >
            What do you want to create?
          </h2>
          <p style={{ fontSize: '1rem', color: theme.subtle }}>
            Choose a workflow template instead of starting from a blank prompt
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          {creationPaths.map((path) => {
            const IconComponent = path.icon;
            const isHovered = hoveredPath === path.id;
            return (
              <button
                key={path.id}
                onClick={() => handlePathClick(path.href)}
                onMouseEnter={() => setHoveredPath(path.id)}
                onMouseLeave={() => setHoveredPath(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '1.5rem',
                  background: isHovered ? theme.bg : theme.elevated,
                  border: `1px solid ${isHovered ? theme.accentBorder : theme.border}`,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  textAlign: 'left',
                  boxShadow: isHovered ? '0 8px 24px rgba(10, 37, 64, 0.08)' : 'none',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: isHovered ? theme.accentLight : theme.bg,
                    border: `1px solid ${isHovered ? theme.accentBorder : theme.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <IconComponent
                    size={22}
                    style={{ color: isHovered ? theme.accent : theme.subtle, transition: 'color 0.25s ease' }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: theme.text,
                    marginBottom: '0.25rem',
                  }}
                >
                  {path.title}
                </h3>
                <span
                  style={{
                    fontSize: '0.8125rem',
                    color: theme.accent,
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                  }}
                >
                  {path.tagline}
                </span>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: theme.subtle,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {path.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Workflow Templates — Primary Showcase */}
      <section
        id="workflow-templates"
        style={{
          background: theme.elevated,
          borderTop: `1px solid ${theme.divider}`,
          borderBottom: `1px solid ${theme.divider}`,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 3rem)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-literata)',
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  color: theme.text,
                  marginBottom: '0.5rem',
                }}
              >
                Workflow Templates
              </h2>
              <p style={{ fontSize: '1rem', color: theme.subtle, margin: 0, maxWidth: '520px' }}>
                Each workflow template gives Esy a repeatable process for turning an idea into finished work.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {platformWorkflows.map((entry) => {
              const isHovered = hoveredCard === entry.id;
              const stages = toPipelineStages(entry);
              // Link to the marketing detail page when one exists; otherwise the
              // template is only runnable on the app, so deep-link there.
              const hasDetail = detailSlugs.has(entry.id);
              const href = hasDetail ? `/workflows/${entry.id}` : `${APP_URL}/workflows/${entry.id}`;

              const cardInner = (
                <article
                  style={{
                    background: theme.bg,
                    border: `1px solid ${isHovered ? theme.accentBorder : theme.border}`,
                    borderRadius: '16px',
                    padding: '1.75rem',
                    transition: 'all 0.3s ease',
                    boxShadow: isHovered
                      ? '0 16px 40px rgba(10, 37, 64, 0.1)'
                      : '0 2px 8px rgba(10, 37, 64, 0.04)',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Top row: badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.2rem 0.5rem',
                        background: theme.accentLight,
                        color: theme.accent,
                        borderRadius: '6px',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                      }}
                    >
                      Workflow Template
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-literata)',
                      fontSize: '1.25rem',
                      fontWeight: 400,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.3,
                      marginBottom: '0.5rem',
                      color: theme.text,
                    }}
                  >
                    {entry.name}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      color: theme.muted,
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      flexGrow: 1,
                    }}
                  >
                    {entry.shortDescription}
                  </p>

                  {/* Workflow pipeline — shared strip (flowing connector + nodes),
                      lights up on card hover. Stages come straight from the catalog. */}
                  {stages.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <WorkflowPipelineStrip
                        stages={stages}
                        active={isHovered}
                        showCount
                      />
                    </div>
                  )}

                  {/* Meta row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '0.75rem',
                      borderTop: `1px solid ${theme.divider}`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', color: theme.subtle }}>
                        <Clock size={13} />
                        {entry.estimatedRuntime}
                      </span>
                      <span style={{ fontSize: '0.8125rem', color: theme.faint }}>
                        {entry.outputType}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        color: theme.accent,
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                      }}
                    >
                      View
                      <ArrowRight
                        size={14}
                        style={{
                          transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                          transition: 'transform 0.2s ease',
                        }}
                      />
                    </div>
                  </div>
                </article>
              );

              const linkStyle = { textDecoration: 'none' as const };
              return hasDetail ? (
                <Link
                  key={entry.id}
                  href={href}
                  style={linkStyle}
                  onMouseEnter={() => setHoveredCard(entry.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {cardInner}
                </Link>
              ) : (
                <a
                  key={entry.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                  onMouseEnter={() => setHoveredCard(entry.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {cardInner}
                </a>
              );
            })}
          </div>
        </div>
      </section>
      {/* CTA Section - Clean, Minimal */}
      <section
        style={{
          background: theme.text,
          color: theme.bg,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 3rem)',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            Ready to start?
          </h2>
          <p
            style={{
              fontSize: '1.125rem',
              opacity: 0.8,
              marginBottom: '2rem',
              maxWidth: '480px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
            }}
          >
            Pick a workflow template and run it in Esy. Adjust as needed, or use it as-is.
          </p>
          <Link
            href="https://app.esy.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '1rem 2rem',
              background: theme.accent,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            Open Esy
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
