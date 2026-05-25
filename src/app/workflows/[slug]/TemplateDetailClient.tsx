'use client';
/* eslint-disable react/no-unescaped-entities */

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Star,
  Sparkles,
  Target,
  Lightbulb,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import { elevatedDarkTheme } from '@/lib/theme';
import { Template, TemplateCategoryInfo, TemplateSubcategory, getTemplateBreadcrumbs, BreadcrumbItem } from '@/lib/templates';
import {
  TemplatePreview,
  TemplateCTA,
  TemplateGrid,
} from '@/components/templates';

interface TemplateDetailClientProps {
  template: Template;
  relatedTemplates: Template[];
  categoryInfo?: TemplateCategoryInfo;
  subcategoryInfo?: TemplateSubcategory;
}

export default function TemplateDetailClient({
  template,
  relatedTemplates,
  categoryInfo,
  subcategoryInfo,
}: TemplateDetailClientProps) {
  const [activeTab, setActiveTab] = useState<'template' | 'output' | 'uses'>('template');

  // Generate dynamic breadcrumbs based on template model/subcategory
  const breadcrumbs = getTemplateBreadcrumbs(template);

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner':
        return elevatedDarkTheme.success;
      case 'intermediate':
        return elevatedDarkTheme.warning;
      case 'advanced':
        return elevatedDarkTheme.error;
      default:
        return elevatedDarkTheme.muted;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: elevatedDarkTheme.bg,
        color: elevatedDarkTheme.text,
        fontFamily: 'var(--font-inter)',
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 3rem)',
          paddingTop: 'clamp(8rem, 18vh, 12rem)',
        }}
      >
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            fontSize: '0.875rem',
            flexWrap: 'wrap',
          }}
        >
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index === 0 ? (
                // First item with back arrow
                <Link
                  href={item.href || '/workflows'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    color: elevatedDarkTheme.muted,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                >
                  <ArrowLeft size={16} />
                  {item.label}
                </Link>
              ) : item.isCurrent ? (
                // Current page (no link)
                <span style={{ color: elevatedDarkTheme.text }}>{item.label}</span>
              ) : (
                // Middle items with links
                <Link
                  href={item.href || '/workflows'}
                  style={{
                    color: elevatedDarkTheme.muted,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {item.label}
                </Link>
              )}
              {index < breadcrumbs.length - 1 && (
                <ChevronRight size={14} style={{ color: elevatedDarkTheme.subtle }} />
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Header Content */}
        <header style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
          {/* Badges */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1.25rem',
            }}
          >
            <span
              style={{
                padding: '0.375rem 1rem',
                background: `${elevatedDarkTheme.accent}20`,
                color: elevatedDarkTheme.accent,
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                border: `1px solid ${elevatedDarkTheme.accent}30`,
              }}
            >
              {template.category}
            </span>
            {subcategoryInfo && (
              <span
                style={{
                  padding: '0.375rem 1rem',
                  background: elevatedDarkTheme.borderSubtle,
                  color: elevatedDarkTheme.muted,
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              >
                {subcategoryInfo.name}
              </span>
            )}
            {template.difficulty && (
              <span
                style={{
                  padding: '0.375rem 0.875rem',
                  background: `${getDifficultyColor(template.difficulty)}15`,
                  color: getDifficultyColor(template.difficulty),
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                }}
              >
                {template.difficulty}
              </span>
            )}
            {template.isNew && (
              <span
                style={{
                  padding: '0.375rem 0.875rem',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                New
              </span>
            )}
            {template.isPro && (
              <span
                style={{
                  padding: '0.375rem 0.875rem',
                  background: `${elevatedDarkTheme.warning}20`,
                  color: elevatedDarkTheme.warning,
                  borderRadius: '8px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <Star size={12} fill="currentColor" />
                Pro
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '1.25rem',
              color: elevatedDarkTheme.text,
            }}
          >
            {template.title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              lineHeight: 1.7,
              color: elevatedDarkTheme.muted,
              maxWidth: '800px',
              marginBottom: '2rem',
            }}
          >
            {template.description}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <TemplateCTA slug={template.slug} title="Use in Esy Editor" variant="primary" />
            <TemplateCTA slug={template.slug} title="Try Now" variant="secondary" />
          </div>
        </header>

        {/* Tags */}
        {template.tags && template.tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: 'clamp(2rem, 4vh, 3rem)',
            }}
          >
            {template.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.375rem 0.875rem',
                  background: elevatedDarkTheme.borderSubtle,
                  color: elevatedDarkTheme.subtle,
                  borderRadius: '8px',
                  fontSize: '0.8125rem',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 3rem)',
        }}
      >
        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '0',
            borderBottom: `1px solid ${elevatedDarkTheme.border}`,
          }}
        >
          {[
            { id: 'template', label: 'Prompt Template', icon: Sparkles },
            { id: 'output', label: 'Expected Output', icon: Target },
            { id: 'uses', label: 'Use Cases', icon: Lightbulb },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 1.5rem',
                background: 'transparent',
                border: 'none',
                color:
                  activeTab === id
                    ? elevatedDarkTheme.accent
                    : elevatedDarkTheme.muted,
                fontSize: '0.9375rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderBottom:
                  activeTab === id
                    ? `2px solid ${elevatedDarkTheme.accent}`
                    : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          style={{
            paddingTop: '2rem',
            paddingBottom: 'clamp(3rem, 6vh, 4rem)',
          }}
        >
          {activeTab === 'template' && (
            <TemplatePreview
              content={template.content}
              variables={template.variables}
              title="Prompt Template"
            />
          )}

          {activeTab === 'output' && (
            <div
              style={{
                background: elevatedDarkTheme.gradients.card,
                border: `1px solid ${elevatedDarkTheme.border}`,
                borderRadius: '16px',
                padding: 'clamp(1.5rem, 4vw, 2rem)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-literata)',
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  marginBottom: '1rem',
                  color: elevatedDarkTheme.text,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Target size={20} style={{ color: elevatedDarkTheme.accent }} />
                What You'll Get
              </h3>
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: elevatedDarkTheme.muted,
                }}
              >
                {template.expectedOutput ||
                  'When you use this prompt with an AI like ChatGPT or Claude, you\'ll receive a comprehensive, structured response tailored to your specific inputs. The AI will follow the framework provided to generate high-quality content that addresses your needs.'}
              </p>
            </div>
          )}

          {activeTab === 'uses' && (
            <div
              style={{
                background: elevatedDarkTheme.gradients.card,
                border: `1px solid ${elevatedDarkTheme.border}`,
                borderRadius: '16px',
                padding: 'clamp(1.5rem, 4vw, 2rem)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-literata)',
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  marginBottom: '1.5rem',
                  color: elevatedDarkTheme.text,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Lightbulb size={20} style={{ color: elevatedDarkTheme.warning }} />
                Best Use Cases
              </h3>
              {template.useCases && template.useCases.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {template.useCases.map((useCase, index) => (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        marginBottom: '1rem',
                        fontSize: '1rem',
                        color: elevatedDarkTheme.muted,
                      }}
                    >
                      <CheckCircle
                        size={20}
                        style={{
                          color: elevatedDarkTheme.success,
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      />
                      {useCase}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: elevatedDarkTheme.muted }}>
                  This prompt is versatile and can be used for various academic and professional writing tasks.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Related Templates */}
        {relatedTemplates.length > 0 && (
          <section
            style={{
              paddingTop: 'clamp(2rem, 4vh, 3rem)',
              paddingBottom: 'clamp(4rem, 8vh, 6rem)',
              borderTop: `1px solid ${elevatedDarkTheme.divider}`,
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-literata)',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
                color: elevatedDarkTheme.text,
              }}
            >
              Related Prompts
            </h2>
            <TemplateGrid templates={relatedTemplates} columns={3} />
          </section>
        )}
      </div>
    </div>
  );
}

