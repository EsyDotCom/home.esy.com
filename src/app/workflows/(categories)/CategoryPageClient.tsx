'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles, Brain, Zap, Search as SearchIcon } from 'lucide-react';
import { elevatedDarkTheme } from '@/lib/theme';
import { Template, TemplateDifficulty } from '@/lib/templates/types';
import { TemplateGrid, TemplateFilters } from '@/components/templates';
import { getAllSubcategories } from '@/lib/templates';

interface CategoryPageClientProps {
  title: string;
  subtitle: string;
  description: string; // SEO intro text
  subcategory: string;
  templates: Template[];
  icon: React.ReactNode;
  modelName?: string;
  accentColor?: string;
}

export default function CategoryPageClient({
  title,
  subtitle,
  description,
  subcategory,
  templates,
  icon,
  modelName,
  accentColor = elevatedDarkTheme.accent,
}: CategoryPageClientProps) {
  const [activeDifficulty, setActiveDifficulty] = useState<TemplateDifficulty | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let result = templates;

    if (activeDifficulty) {
      result = result.filter((t) => t.difficulty === activeDifficulty);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.shortDescription.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [templates, activeDifficulty, searchQuery]);

  const subcategories = getAllSubcategories().filter((s) => s.slug === subcategory);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: elevatedDarkTheme.bg,
        color: elevatedDarkTheme.text,
        fontFamily: 'var(--font-inter)',
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          paddingTop: 'clamp(8rem, 18vh, 12rem)',
          paddingBottom: 'clamp(3rem, 6vh, 4rem)',
          background: `linear-gradient(180deg, ${elevatedDarkTheme.bg} 0%, ${elevatedDarkTheme.elevated} 100%)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '400px',
            background: `radial-gradient(ellipse, ${accentColor}15 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 clamp(1.5rem, 5vw, 3rem)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Breadcrumb */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
              fontSize: '0.875rem',
            }}
          >
            <Link
              href="/workflows"
              style={{
                color: elevatedDarkTheme.muted,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'color 0.2s ease',
              }}
            >
              <ArrowLeft size={16} />
              Workflows
            </Link>
            <span style={{ color: elevatedDarkTheme.border }}>/</span>
            <span style={{ color: elevatedDarkTheme.text }}>{title}</span>
          </nav>

          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}30`,
              borderRadius: '24px',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ color: accentColor }}>{icon}</span>
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: accentColor,
              }}
            >
              {modelName || title}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '1rem',
              color: elevatedDarkTheme.text,
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              lineHeight: 1.7,
              color: elevatedDarkTheme.muted,
              maxWidth: '700px',
              marginBottom: '2rem',
            }}
          >
            {subtitle}
          </p>

          {/* Search */}
          <div
            style={{
              position: 'relative',
              maxWidth: '500px',
            }}
          >
            <SearchIcon
              size={20}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: elevatedDarkTheme.subtle,
              }}
            />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                background: elevatedDarkTheme.elevated,
                border: `1px solid ${elevatedDarkTheme.border}`,
                borderRadius: '12px',
                color: elevatedDarkTheme.text,
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
            />
          </div>
        </div>
      </section>

      {/* SEO Introduction */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 3rem)',
          marginBottom: 'clamp(3rem, 6vh, 4rem)',
        }}
      >
        <div
          style={{
            background: elevatedDarkTheme.gradients.card,
            border: `1px solid ${elevatedDarkTheme.border}`,
            borderRadius: '16px',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          }}
        >
          <div
            style={{
              fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
              lineHeight: 1.8,
              color: elevatedDarkTheme.muted,
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </section>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 3rem)',
        }}
      >
        {/* Content Layout with Sidebar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '240px 1fr',
            gap: '2rem',
            paddingBottom: 'clamp(4rem, 8vh, 6rem)',
          }}
        >
          {/* Sidebar Filters */}
          <div style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
            <TemplateFilters
              subcategories={subcategories}
              activeSubcategory={subcategory}
              activeDifficulty={activeDifficulty}
              onSubcategoryChange={() => {}}
              onDifficultyChange={setActiveDifficulty}
              onClearFilters={() => setActiveDifficulty(null)}
              hideSubcategories={true}
            />
          </div>

          {/* Main Grid */}
          <div>
            {/* Results header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-literata)',
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                  color: elevatedDarkTheme.text,
                }}
              >
                {searchQuery ? 'Search Results' : 'All Prompts'}
                <span
                  style={{
                    marginLeft: '0.75rem',
                    fontSize: '0.875rem',
                    color: elevatedDarkTheme.subtle,
                    fontWeight: 400,
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  ({filteredTemplates.length})
                </span>
              </h2>
            </div>

            <TemplateGrid
              templates={filteredTemplates}
              showCategory={false}
              columns={2}
              emptyMessage={
                searchQuery
                  ? `No results found for "${searchQuery}"`
                  : 'No prompts available in this category yet.'
              }
            />
          </div>
        </div>

        {/* CTA Section */}
        <section
          style={{
            padding: 'clamp(3rem, 6vh, 4rem)',
            background: elevatedDarkTheme.gradients.card,
            borderRadius: '24px',
            border: `1px solid ${elevatedDarkTheme.border}`,
            textAlign: 'center',
            marginBottom: 'clamp(4rem, 8vh, 6rem)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              color: elevatedDarkTheme.text,
            }}
          >
            Explore All Workflow Templates
          </h2>
          <p
            style={{
              fontSize: '1.0625rem',
              color: elevatedDarkTheme.muted,
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: '0 auto 2rem',
            }}
          >
            Browse our complete library of AI prompts and workflow templates.
          </p>
          <Link
            href="/workflows"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '1rem 2rem',
              background: `linear-gradient(135deg, ${accentColor}dd 0%, ${accentColor} 100%)`,
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: `0 4px 15px ${accentColor}40`,
            }}
          >
            Browse All Workflow Templates
            <ArrowRight size={18} />
          </Link>
        </section>
      </div>

      {/* Footer spacer */}
      <div style={{ height: '2rem' }} />
    </div>
  );
}

