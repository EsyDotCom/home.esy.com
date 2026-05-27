"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import {
  publishedVisualEssays,
  featuredEssay as latestEssay,
  nonFeaturedEssays,
  totalReadTime,
  CATEGORY_COLORS,
  isNewEssay,
  type EssayCategory,
  type VisualEssay
} from "@/data/visualEssays";
import './visual-essays.css';

// Manual featured essay override (for hero with clean photographic image)
// Set to null to use the latest essay automatically
const FEATURED_ESSAY_ID = "the-word-essay";

const featuredEssay = FEATURED_ESSAY_ID
  ? publishedVisualEssays.find(e => e.id === FEATURED_ESSAY_ID) || latestEssay
  : latestEssay;

/*
 * Visual Essays Discovery Platform
 *
 * Design Philosophy:
 * - Premium editorial aesthetic
 * - Category-based discovery via carousels
 * - Featured hero showcases latest essay
 * - "More to Explore" for thin categories
 *
 * Data Source: @/data/visualEssays.ts (single source of truth)
 * - Essays sorted by newest first (highest number)
 * - Featured essay: Always the latest (auto-determined)
 * - Stats calculated dynamically
 *
 * Architecture:
 * - Layer 1: Editorial Hero (featured essay - always latest)
 * - Layer 2: Latest Essays (newest 6, excluding featured)
 * - Layer 3: Category Carousels (History, Culture, Technology)
 * - Layer 4: More to Explore (Science, Space, Nature, Economics, Education)
 *
 * Last updated: Dec 2025 - Added The Weight of a Word essay
 */

// ==================== CATEGORY CONFIG ====================

// Main carousel categories (strong content depth)
const CAROUSEL_CATEGORIES: EssayCategory[] = ['History', 'Culture', 'Technology'];

// Thin categories for "More to Explore" section
const MORE_CATEGORIES: EssayCategory[] = ['Science', 'Space', 'Nature', 'Economics', 'Education & Writing'];

// ==================== HELPERS ====================

/**
 * Get the hero image for an essay with fallback chain:
 * 1. heroImage (if defined in data)
 * 2. OG image at /og/[slug].png
 * 3. null (will show category gradient)
 */
const getEssayImage = (essay: VisualEssay): string | null => {
  if (essay.heroImage) return essay.heroImage;
  const slug = essay.href.split('/').pop();
  if (slug) return `/og/${slug}.png`;
  return null;
};

/**
 * Category gradient fallback colors for essays without images
 */
const CATEGORY_GRADIENTS: Record<EssayCategory, string> = {
  'Science': 'linear-gradient(135deg, #064e3b 0%, #10B981 100%)',
  'History': 'linear-gradient(135deg, #78350f 0%, #F59E0B 100%)',
  'Technology': 'linear-gradient(135deg, #1e3a8a 0%, #3B82F6 100%)',
  'Culture': 'linear-gradient(135deg, #831843 0%, #EC4899 100%)',
  'Space': 'linear-gradient(135deg, #4c1d95 0%, #8B5CF6 100%)',
  'Nature': 'linear-gradient(135deg, #164e63 0%, #06B6D4 100%)',
  'Education & Writing': 'linear-gradient(135deg, #134e4a 0%, #14B8A6 100%)',
  'Economics': 'linear-gradient(135deg, #14532d 0%, #22C55E 100%)',
  "Children's Fiction": 'linear-gradient(135deg, #713f12 0%, #FFD700 100%)',
};

/**
 * Deduplication System
 *
 * Prevents the same essay from appearing in multiple sections.
 * Essays are shown in priority order:
 * 1. Hero (featured essay)
 * 2. Latest section
 * 3. Category sections (History, Culture, Technology)
 * 4. More to Explore section
 *
 * Once an essay is shown, it won't appear in subsequent sections.
 */
const buildDeduplicatedSections = () => {
  const shownIds = new Set<string>();

  // 1. Featured essay is always shown in hero
  if (featuredEssay) {
    shownIds.add(featuredEssay.id);
  }

  // Use full published list, not nonFeaturedEssays (which uses slice(1))
  // This ensures manually-featured essays don't cause newest essay to be lost
  const allEssays = publishedVisualEssays;

  // 2. Latest section (newest 6, excluding featured)
  const latestEssays = allEssays
    .filter(e => !shownIds.has(e.id))
    .slice(0, 6);
  latestEssays.forEach(e => shownIds.add(e.id));

  // 3. Category sections - exclude already shown essays
  const categorySections: Record<EssayCategory, VisualEssay[]> = {} as Record<EssayCategory, VisualEssay[]>;
  for (const category of CAROUSEL_CATEGORIES) {
    categorySections[category] = allEssays
      .filter(e => e.category === category && !shownIds.has(e.id));
    categorySections[category].forEach(e => shownIds.add(e.id));
  }

  // 4. More to Explore - exclude already shown essays
  const moreEssays = allEssays
    .filter(e => MORE_CATEGORIES.includes(e.category) && !shownIds.has(e.id));

  return { latestEssays, categorySections, moreEssays };
};

// Build deduplicated sections once
const { latestEssays: LATEST_ESSAYS, categorySections: CATEGORY_SECTIONS, moreEssays: MORE_ESSAYS } = buildDeduplicatedSections();

// ==================== COMPONENTS ====================

// Editorial Hero - Full-bleed featured essay (always the latest)
const EditorialHero: React.FC = () => {
  const featuredImageUrl = featuredEssay ? getEssayImage(featuredEssay) : null;
  const [imageError, setImageError] = React.useState(false);
  const showGradient = !featuredImageUrl || imageError;

  if (!featuredEssay) return null;

  return (
    <section className="editorial-hero-fullbleed">
      {/* Full-bleed Background Image */}
      <div
        className="hero-fullbleed-bg"
        style={showGradient ? { background: CATEGORY_GRADIENTS[featuredEssay.category] } : undefined}
      >
        {featuredImageUrl && !imageError && (
          <Image
            src={featuredImageUrl}
            alt={featuredEssay.title}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
            priority
            unoptimized
            onError={() => setImageError(true)}
          />
        )}
        <div className="hero-fullbleed-overlay" />
      </div>

      {/* Content - Bottom Left Safe Zone */}
      <Link href={featuredEssay.href} className="hero-fullbleed-content">
        {/* "Featured" label removed - hero treatment already signals prominence */}
        {/* <span className="hero-fullbleed-label">Featured</span> */}

        <h1 className="hero-fullbleed-title">{featuredEssay.title}</h1>
        <p className="hero-fullbleed-subtitle">{featuredEssay.subtitle}</p>

        <div className="hero-fullbleed-meta">
          <span
            className="hero-fullbleed-category"
            style={{ color: CATEGORY_COLORS[featuredEssay.category] }}
          >
            {featuredEssay.category}
          </span>
          <span className="hero-fullbleed-divider">·</span>
          <Clock size={14} />
          <span>{featuredEssay.readTime}</span>
          {isNewEssay(featuredEssay) && <span className="hero-fullbleed-new">New</span>}
        </div>

        <span className="hero-fullbleed-cta">
          Read This Essay <ArrowRight size={16} />
        </span>
      </Link>

      {/* Stats Bar - Integrated Footer */}
      <div className="hero-fullbleed-stats">
        <div className="hero-fullbleed-stat">
          <span className="hero-fullbleed-stat-value">{publishedVisualEssays.length}</span>
          <span className="hero-fullbleed-stat-label">Essays</span>
        </div>
        <span className="hero-fullbleed-stat-divider">·</span>
        <div className="hero-fullbleed-stat">
          <span className="hero-fullbleed-stat-value">{totalReadTime}</span>
          <span className="hero-fullbleed-stat-label">Minutes</span>
        </div>
        <span className="hero-fullbleed-stat-divider">·</span>
        <div className="hero-fullbleed-stat">
          <span className="hero-fullbleed-stat-label">All Interactive</span>
        </div>
      </div>

      {/* Framing Line - Sets context */}
      <p className="hero-framing-line">
        A collection of inspectable research artifacts produced using Esy workflows.
      </p>
    </section>
  );
};

// Number of cards to show per section before "See All"
const CARDS_PER_SECTION = 6;

// Section Component - Vertical grid with optional "See All"
interface SectionProps {
  title: string;
  subtitle?: string;
  essays: VisualEssay[];
  accentColor?: string;
  showAll?: boolean;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, essays, accentColor, showAll = false }) => {
  if (essays.length === 0) return null;

  const displayEssays = showAll ? essays : essays.slice(0, CARDS_PER_SECTION);
  const hasMore = !showAll && essays.length > CARDS_PER_SECTION;

  return (
    <section className="essays-section-block">
      <div className="section-header">
        <div className="section-title-group">
          <h2 className="section-title" style={accentColor ? { color: accentColor } : undefined}>
            {title}
          </h2>
          {subtitle && <span className="section-subtitle">{subtitle}</span>}
        </div>
        {hasMore && (
          <span className="section-see-all">
            +{essays.length - CARDS_PER_SECTION} more
          </span>
        )}
      </div>

      <div className="section-grid">
        {displayEssays.map((essay, index) => (
          <EssayCard key={essay.id} essay={essay} priority={index < 4} />
        ))}
      </div>
    </section>
  );
};

// Latest Essays Section (newest 6, deduplicated)
const LatestSection: React.FC = () => {
  return (
    <Section
      title="Latest"
      subtitle="Newest additions"
      essays={LATEST_ESSAYS}
      showAll={true}
    />
  );
};

// Category Section (deduplicated - excludes essays shown in Latest)
interface CategorySectionProps {
  category: EssayCategory;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  const essays = CATEGORY_SECTIONS[category] || [];

  return (
    <Section
      title={category}
      subtitle={`${essays.length} essays`}
      essays={essays}
      accentColor={CATEGORY_COLORS[category]}
    />
  );
};

// More to Explore Section (deduplicated - excludes essays shown in Latest and Category sections)
const MoreToExplore: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);

  if (MORE_ESSAYS.length === 0) return null;

  const displayEssays = expanded ? MORE_ESSAYS : MORE_ESSAYS.slice(0, CARDS_PER_SECTION);
  const hasMore = MORE_ESSAYS.length > CARDS_PER_SECTION;

  return (
    <section className="essays-section-block">
      <div className="section-header">
        <div className="section-title-group">
          <h2 className="section-title">More to Explore</h2>
          <span className="section-subtitle">Science, Space, Nature & More</span>
        </div>
        {!expanded && hasMore && (
          <span className="section-see-all">
            +{MORE_ESSAYS.length - CARDS_PER_SECTION} more
          </span>
        )}
      </div>

      <div className="section-grid">
        {displayEssays.map((essay, index) => (
          <EssayCard key={essay.id} essay={essay} priority={index < 4} />
        ))}
      </div>

      {hasMore && !expanded && (
        <button
          className="show-more-button"
          onClick={() => setExpanded(true)}
        >
          Show {MORE_ESSAYS.length - CARDS_PER_SECTION} More Essays
        </button>
      )}
    </section>
  );
};

// Essay Card (Grid View) - With Hero Image
const EssayCard: React.FC<{ essay: VisualEssay; priority?: boolean }> = ({ essay, priority = false }) => {
  const imageUrl = getEssayImage(essay);
  const [imageError, setImageError] = React.useState(false);
  const showGradient = !imageUrl || imageError;

  return (
    <Link href={essay.href} className="essay-card essay-card-visual">
      {/* Hero Image */}
      <div
        className="essay-card-image"
        style={showGradient ? { background: CATEGORY_GRADIENTS[essay.category] } : undefined}
      >
        {imageUrl && !imageError && (
          <Image
            src={imageUrl}
            alt={essay.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
            priority={priority}
            unoptimized
            onError={() => setImageError(true)}
          />
        )}
        <div className="essay-card-image-overlay" />
      </div>

      {/* Content */}
      <div className="essay-card-content">
        <div className="essay-card-header">
          <span
            className="essay-card-category"
            style={{ color: CATEGORY_COLORS[essay.category] }}
          >
            {essay.category}
          </span>
          <span className="essay-card-artifact-badge">Artifact</span>
          {isNewEssay(essay) && <span className="essay-card-new">New</span>}
        </div>
        <h3 className="essay-card-title">{essay.title}</h3>
        <p className="essay-card-subtitle">{essay.subtitle}</p>
        <div className="essay-card-meta">
          <Clock size={12} />
          <span>{essay.readTime}</span>
          <ArrowRight size={12} className="essay-card-arrow" />
        </div>
      </div>
    </Link>
  );
};

// Artifact CTA Section - Conversion belongs here
const ArtifactCTA: React.FC = () => (
  <section className="artifact-cta-section">
    <h2 className="artifact-cta-title">Want to create artifacts like these?</h2>
    <p className="artifact-cta-subtitle">
      Explore the workflows, inspect the methodology, or start your own.
    </p>
    <div className="artifact-cta-links">
      <a
        href="https://docs.esy.com/concepts/artifacts"
        target="_blank"
        rel="noopener noreferrer"
        className="artifact-cta-link"
      >
        What&apos;s an artifact?
      </a>
      <a
        href="https://docs.esy.com/concepts/workflow-templates"
        target="_blank"
        rel="noopener noreferrer"
        className="artifact-cta-link"
      >
        View the workflow system
      </a>
      <a
        href="https://app.esy.com"
        target="_blank"
        rel="noopener noreferrer"
        className="artifact-cta-link artifact-cta-link-primary"
      >
        Create your own
      </a>
    </div>
  </section>
);

// Coming Soon
const ComingSoon: React.FC = () => (
  <section className="coming-soon">
    <p className="coming-soon-text">
      More visual essays in development. Each piece takes weeks of research
      and design to create an unforgettable experience.
    </p>
  </section>
);

// ==================== MAIN ====================

interface VisualEssaysClientProps {
  basePath?: string;
}

const VisualEssaysClient: React.FC<VisualEssaysClientProps> = () => {
  return (
    <div className="visual-essays-index">
      <EditorialHero />

      {/* Latest Essays */}
      <LatestSection />

      {/* Category Sections */}
      {CAROUSEL_CATEGORIES.map(category => (
        <CategorySection key={category} category={category} />
      ))}

      {/* More to Explore - thin categories */}
      <MoreToExplore />

      {/* Artifact CTA - Conversion section */}
      <ArtifactCTA />

      <ComingSoon />
    </div>
  );
};

export default VisualEssaysClient;

