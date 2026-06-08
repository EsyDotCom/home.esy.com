'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  Clock,
  BarChart3,
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
  ARTIFACT_CLASS_LABELS,
  type WorkflowCatalogEntry,
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

// Canonical artifact-class ordering for the library sections + chips. Any class
// the catalog adds later that isn't listed here is appended after these.
const CLASS_ORDER = ['research', 'visual', 'video', 'knowledge'];

// The SEO category landing pages this site also ships. Counts are derived from
// real data at render time (never hardcoded) using the exact same predicate each
// category page uses, so the numbers can't drift from what the route shows.
const BROWSE_TYPES = [
  { id: 'visual-essays', title: 'Visual Essays', href: '/workflows/visual-essays', icon: FileText },
  { id: 'infographics', title: 'Infographics', href: '/workflows/infographics', icon: BarChart3 },
  { id: 'clip-art', title: 'Clip Art', href: '/workflows/clip-art', icon: Palette },
  { id: 'academic-essays', title: 'Academic Essays', href: '/workflows/academic-essays', icon: GraduationCap },
];

export default function TemplatesClient() {
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  // Library facet: 'all' shows every class as sections; a class id narrows to one.
  const [activeClass, setActiveClass] = useState<string>('all');

  useScrollHeaderSearch(searchBarRef);

  // The single source of truth for the library: the live, published platform
  // catalog (build-time fetch of GET /v1/catalog/workflows). No static mock data.
  const platformWorkflows = getWorkflowCatalog();

  // esy.com only statically renders detail pages for templates declared in
  // data.ts; use that set to decide internal link vs. run-on-app fallback (e.g.
  // research-report has no marketing detail page yet, so it deep-links to the app).
  const detailSlugs = useMemo(
    () => new Set(getWorkflowTemplates().map((t) => t.slug)),
    [],
  );

  // Search dropdown (autocomplete → navigate). Only workflow templates, not the
  // legacy prompt pages.
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchTemplates(searchQuery)
      .filter((t) => t.isWorkflow)
      .slice(0, 8)
      .map((template) => ({
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

  // Classes actually present in the catalog, ordered canonically (known first,
  // then any new ones). Drives both the chip row and the section order.
  const presentClasses = useMemo(() => {
    const all = Array.from(new Set(platformWorkflows.map((e) => String(e.artifactClass))));
    const known = CLASS_ORDER.filter((c) => all.includes(c));
    const extra = all.filter((c) => !CLASS_ORDER.includes(c));
    return [...known, ...extra];
  }, [platformWorkflows]);

  const classLabel = (c: string) =>
    ARTIFACT_CLASS_LABELS[c] ?? `${c.charAt(0).toUpperCase()}${c.slice(1)}`;

  // Library filtering: active class facet + free-text match across the catalog
  // entry's own fields, so the grid always reflects exactly what's visible.
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery = (e: WorkflowCatalogEntry) =>
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.shortDescription.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      String(e.outputType).toLowerCase().includes(q);
    return platformWorkflows.filter(
      (e) => (activeClass === 'all' || e.artifactClass === activeClass) && matchesQuery(e),
    );
  }, [platformWorkflows, searchQuery, activeClass]);

  // Group the filtered set into the sections we'll render. 'all' yields one
  // section per present class (empty ones dropped); a specific facet yields one.
  const groups = useMemo(() => {
    const classesToShow = activeClass === 'all' ? presentClasses : [activeClass];
    return classesToShow
      .map((c) => ({ id: c, label: classLabel(c), items: filtered.filter((e) => e.artifactClass === c) }))
      .filter((g) => g.items.length > 0);
  }, [filtered, presentClasses, activeClass]);

  // Real counts for the SEO "Browse by type" row, computed with each category
  // page's exact predicate against the local workflow templates.
  const browseCounts = useMemo(() => {
    const all = getWorkflowTemplates();
    const byTag = (tag: string) =>
      all.filter((t) => t.tags.some((tg) => tg.toLowerCase() === tag.toLowerCase())).length;
    return {
      'visual-essays': all.filter(
        (t) => t.tags.some((tag) => tag.includes('visual')) && !t.tags.includes('infographic'),
      ).length,
      infographics: byTag('infographic'),
      'clip-art': byTag('clip-art'),
      'academic-essays': byTag('essay'),
    } as Record<string, number>;
  }, []);

  const handleResultSelect = (result: { slug?: string; href?: string }) => {
    const href = result.slug || result.href;
    if (href) router.push(href);
  };

  // One catalog card. Links to the marketing detail page when one exists;
  // otherwise the template is only runnable on the app, so it deep-links there.
  const renderCard = (entry: WorkflowCatalogEntry) => {
    const isHovered = hoveredCard === entry.id;
    const stages = toPipelineStages(entry);
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
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
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

        {/* Workflow pipeline — shared strip (flowing connector + nodes), lights
            up on card hover. Stages come straight from the catalog. */}
        {stages.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <WorkflowPipelineStrip stages={stages} active={isHovered} showCount />
          </div>
        )}

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
            <span style={{ fontSize: '0.8125rem', color: theme.faint }}>{entry.outputType}</span>
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
  };

  // Reusable chip for the facet row (All + one per present class).
  const renderChip = (id: string, label: string, count: number) => {
    const isActive = activeClass === id;
    return (
      <button
        key={id}
        onClick={() => setActiveClass(id)}
        aria-pressed={isActive}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          padding: '0.4rem 0.85rem',
          borderRadius: '999px',
          border: `1px solid ${isActive ? theme.accentBorder : theme.border}`,
          background: isActive ? theme.accentLight : theme.bg,
          color: isActive ? theme.accent : theme.muted,
          fontSize: '0.8125rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        {label}
        <span style={{ color: isActive ? theme.accent : theme.faint, fontWeight: 500 }}>{count}</span>
      </button>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, color: theme.text }}>
      {/* ── Hero — compact: title, one-liner, library search ── */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '6rem 2rem 2.5rem',
          position: 'relative',
        }}
      >
        {/* Grid background pattern */}
        <div
          style={{
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
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
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

          <h1
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              color: theme.text,
            }}
          >
            Agentic Workflow <span style={{ color: theme.accent }}>Templates</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.1875rem)',
              lineHeight: 1.6,
              color: theme.muted,
              maxWidth: '620px',
              marginBottom: '2rem',
            }}
          >
            Each template turns a topic or a few sources into finished, cited work.
            Esy runs every step, checks the result, and keeps a record of how it was
            made. No prompt engineering required.
          </p>

          <div ref={searchBarRef} style={{ maxWidth: '480px' }}>
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
        </div>
      </section>

      {/* ── Library — the real catalog leads, grouped by artifact class ── */}
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
            padding: 'clamp(2.5rem, 5vh, 3.5rem) clamp(1.5rem, 5vw, 3rem)',
          }}
        >
          {/* Facet bar: All + per-class chips, with a live result count. */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {renderChip('all', 'All', platformWorkflows.length)}
              {presentClasses.map((c) =>
                renderChip(c, classLabel(c), platformWorkflows.filter((e) => e.artifactClass === c).length),
              )}
            </div>
            <span style={{ fontSize: '0.8125rem', color: theme.subtle }}>
              {filtered.length} {filtered.length === 1 ? 'template' : 'templates'}
              {searchQuery.trim() && ` for “${searchQuery.trim()}”`}
            </span>
          </div>

          {/* Sections (one per class when "All"; otherwise the selected class). */}
          {groups.length === 0 ? (
            <div
              style={{
                padding: '3rem 1rem',
                textAlign: 'center',
                color: theme.subtle,
                border: `1px dashed ${theme.border}`,
                borderRadius: '16px',
                background: theme.bg,
              }}
            >
              No workflow templates match your search yet.
            </div>
          ) : (
            groups.map((group) => (
              <div key={group.id} style={{ marginBottom: '2.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.625rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <h2
                    style={{
                      fontFamily: 'var(--font-literata)',
                      fontSize: '1.375rem',
                      fontWeight: 400,
                      letterSpacing: '-0.01em',
                      color: theme.text,
                      margin: 0,
                    }}
                  >
                    {group.label}
                  </h2>
                  <span style={{ fontSize: '0.8125rem', color: theme.faint }}>
                    {group.items.length}
                  </span>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: '1.25rem',
                  }}
                >
                  {group.items.map((entry) => renderCard(entry))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ── Browse by type — internal links to the SEO category pages (real counts) ── */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vh, 4.5rem) clamp(1.5rem, 5vw, 3rem)',
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(1.375rem, 3vw, 1.75rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: theme.text,
              marginBottom: '0.5rem',
            }}
          >
            Browse by type
          </h2>
          <p style={{ fontSize: '0.9375rem', color: theme.subtle, margin: 0 }}>
            Prefer to start from a specific kind of work? Jump into a focused collection.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {BROWSE_TYPES.map((type) => {
            const Icon = type.icon;
            const count = browseCounts[type.id] ?? 0;
            const isHovered = hoveredPath === type.id;
            return (
              <Link
                key={type.id}
                href={type.href}
                onMouseEnter={() => setHoveredPath(type.id)}
                onMouseLeave={() => setHoveredPath(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  padding: '1.125rem 1.25rem',
                  background: isHovered ? theme.bg : theme.elevated,
                  border: `1px solid ${isHovered ? theme.accentBorder : theme.border}`,
                  borderRadius: '14px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: isHovered ? '0 8px 24px rgba(10, 37, 64, 0.08)' : 'none',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: isHovered ? theme.accentLight : theme.bg,
                    border: `1px solid ${isHovered ? theme.accentBorder : theme.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={18} style={{ color: isHovered ? theme.accent : theme.subtle }} />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: theme.text }}>
                    {type.title}
                  </div>
                  {count > 0 && (
                    <div style={{ fontSize: '0.8125rem', color: theme.subtle }}>
                      {count} {count === 1 ? 'template' : 'templates'}
                    </div>
                  )}
                </div>
                <ArrowRight
                  size={16}
                  style={{
                    color: theme.accent,
                    transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                    transition: 'transform 0.2s ease',
                    flexShrink: 0,
                  }}
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── CTA — slim, run on the app ── */}
      <section style={{ background: theme.text, color: theme.bg }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(3rem, 6vh, 4.5rem) clamp(1.5rem, 5vw, 3rem)',
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
