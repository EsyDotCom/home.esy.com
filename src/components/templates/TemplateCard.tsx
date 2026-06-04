'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { Template } from '@/lib/templates';
import WorkflowPipelineStrip from './WorkflowPipelineStrip';

// Navy Calm Light Theme
const theme = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  faint: 'rgba(10, 37, 64, 0.35)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
  accentLight: 'rgba(0, 168, 150, 0.08)',
  accentBorder: 'rgba(0, 168, 150, 0.25)',
  success: '#2A9D8F',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

interface TemplateCardProps {
  template: Template;
  showCategory?: boolean;
}

export default function TemplateCard({ template, showCategory = true }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = () => theme.accent;

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner':
        return theme.success;
      case 'intermediate':
        return theme.warning;
      case 'advanced':
        return theme.error;
      default:
        return theme.subtle;
    }
  };

  const cardBadgeLabel = template.isWorkflow ? 'Workflow Template' : template.category;

  return (
    <Link
      href={`/workflows/${template.slug}/`}
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article
        style={{
          background: theme.bg,
          border: `1px solid ${isHovered ? theme.accentBorder : theme.border}`,
          borderRadius: '16px',
          padding: 'clamp(1.25rem, 3vw, 1.75rem)',
          transition: 'all 0.25s ease',
          cursor: 'pointer',
          boxShadow: isHovered
            ? '0 12px 32px rgba(10, 37, 64, 0.1)'
            : '0 2px 8px rgba(10, 37, 64, 0.04)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header with badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {showCategory && (
              <span
                style={{
                  padding: '0.25rem 0.625rem',
                  background: theme.accentLight,
                  color: theme.accent,
                  borderRadius: '6px',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {cardBadgeLabel}
              </span>
            )}
            {template.difficulty && (
              <span
                style={{
                  padding: '0.25rem 0.5rem',
                  background: `${getDifficultyColor(template.difficulty)}15`,
                  color: getDifficultyColor(template.difficulty),
                  borderRadius: '6px',
                  fontSize: '0.625rem',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                }}
              >
                {template.difficulty}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {template.isNew && (
              <span
                style={{
                  padding: '0.25rem 0.5rem',
                  background: theme.accent,
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                }}
              >
                New
              </span>
            )}
            {template.isPro && (
              <span
                style={{
                  padding: '0.25rem 0.5rem',
                  background: `${theme.warning}15`,
                  color: theme.warning,
                  borderRadius: '6px',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <Star size={10} fill="currentColor" />
                {template.pricing?.price ? `$${template.pricing.price}` : 'Pro'}
              </span>
            )}
            {template.isFeatured && !template.isNew && !template.isPro && (
              <Sparkles size={16} style={{ color: theme.accent, opacity: 0.8 }} />
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            marginBottom: '0.75rem',
            color: theme.text,
            fontFamily: 'var(--font-literata)',
          }}
        >
          {template.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: 'clamp(0.85rem, 2vw, 0.9375rem)',
            color: theme.muted,
            lineHeight: 1.6,
            marginBottom: '1rem',
            flexGrow: 1,
          }}
        >
          {template.shortDescription}
        </p>

        {/* Workflow pipeline — for workflow templates, the stage strip stands in
            for tags (lights up on hover, rhymes with the detail-page circuit). */}
        {template.isWorkflow && template.workflowStages && template.workflowStages.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <WorkflowPipelineStrip stages={template.workflowStages} active={isHovered} />
          </div>
        )}

        {/* Tags — suppressed on workflow cards that show the pipeline strip above. */}
        {!(template.isWorkflow && template.workflowStages && template.workflowStages.length > 0) &&
          template.tags && template.tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.375rem',
              marginBottom: '1rem',
            }}
          >
            {template.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.2rem 0.5rem',
                  background: 'rgba(10, 37, 64, 0.04)',
                  color: theme.subtle,
                  borderRadius: '4px',
                  fontSize: '0.6875rem',
                }}
              >
                {tag}
              </span>
            ))}
            {template.tags.length > 3 && (
              <span
                style={{
                  padding: '0.2rem 0.5rem',
                  color: theme.faint,
                  fontSize: '0.6875rem',
                }}
              >
                +{template.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: theme.accent,
            fontSize: '0.875rem',
            fontWeight: 500,
            marginTop: 'auto',
          }}
        >
          View Details
          <ArrowRight
            size={16}
            style={{
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.2s ease',
            }}
          />
        </div>
      </article>
    </Link>
  );
}
