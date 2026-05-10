# Documentation

This directory contains technical documentation for the Esy.com project.

## Structure

### Design & UX
- `DESIGN_SYSTEM.md` - Core design system principles and components
- `DESIGN_PATTERNS.md` - Common design patterns and implementations
- `RESEARCH_DESIGN_SYSTEM.md` - **Research section premium typography system** ⭐
- `RESPONSIVE_DESIGN_SYSTEM.md` - Responsive design guidelines
- `THEME_SYSTEM_GUIDE.md` - Theme implementation and usage
- `THEME_AUDIT_REPORT.md` - Theme consistency audit findings
- `UX_NAVIGATION_THEME_SYSTEM.md` - Navigation and theme UX patterns
- `AI_STYLE_GUIDE.md` - AI content writing style guide

### Proposals & Analysis
- `ABOUT_PAGE_REDESIGN_PROPOSAL.md` - About page redesign documentation
- `ELEVATED_DARK_THEME_PROPOSAL.md` - Dark theme enhancement proposal
- `SCHOOL_ARTICLES_DESIGN_PROPOSAL.md` - School section design proposal (archived — articles)
- `SCHOOL_VIDEO_PAGES_DESIGN.md` - **School video-first pages design system** ⭐
- `LIGHT_THEME_ANALYSIS.md` - Light theme analysis and recommendations
- `HEADER_LIGHT_MODE_ASSESSMENT.md` - Header light mode evaluation
- `FOOTER_DESIGN_ASSESSMENT.md` - Footer design analysis
- `FOOTER_DESCRIPTIONS_ARCHIVE.md` - Footer descriptions archive
- `COLOR_PSYCHOLOGY_ACADEMIC_APPS.md` - Color psychology research

### Architecture & Systems
- `NAVIGATION_ARCHITECTURE.md` - Site navigation structure
- `SEARCH_CONTEXT_SYSTEM.md` - Search functionality documentation
- `SITEMAP.md` - Complete site structure

### Front-End Patterns
- `/front-end/` - Reusable front-end patterns and components
  - `IMAGE_DISPLAY_PATTERNS.md` - Cover vs. Contain modes for responsive images
  - `INLINE_INTELLIGENCE.md` - Highlight-to-insight system for visual essays

### SEO
- `/seo/` - Tactical SEO patterns and field-level conventions
  - `DESCRIPTION_FIELD_PATTERN.md` - One short field driving meta description, OG description, and listing card preview
- `VISUAL_ESSAY_METADATA_PATTERN.md` - Visual-essay-specific metadata layout (OG / Twitter / canonical)

### Quick Start
- `QUICK_START.md` - Getting started guide

### Bug Fixes
- `/fixes/` - Detailed documentation of bug fixes and issues resolved

## Featured Documentation

### 🎨 Research Design System (New!)

**File:** `RESEARCH_DESIGN_SYSTEM.md`

Complete documentation of the premium academic design system for the `/research` section:
- **Premium typography** - Serif-based system optimized for long-form reading
- **Color system** - Purple accent palette with sophisticated opacity scale
- **Component styles** - Lists, blockquotes, tables, code blocks
- **Responsive design** - Mobile-optimized breakpoints
- **Accessibility** - WCAG AA compliant
- **Implementation guide** - Usage guidelines and best practices

**Implementation:**
- CSS file: `/src/app/research/article-styles.css`
- Applied to: All `/research/*` article pages
- Design philosophy: Academic elegance + minimal sophistication

## Design System Overview

### Core Principles
1. **Transformative & Minimal** - Outstanding layouts with perfect space usage
2. **Academic Elegance** - Scholarly interfaces without clutter
3. **Premium Sophistication** - High-end, professional aesthetic
4. **Conversion Focus** - Design that engages and converts users

### Typography
- **Sans-serif (Primary):** Inter - UI elements, most body text
- **Serif (Research):** Georgia/Literata - Academic long-form content
- **Display:** Origami Incised - Brand typography for headers

### Color Palette
- **Primary Accent:** `#8b5cf6` (Purple)
- **Dark Background:** `#0a0a0f`
- **Elevated Surfaces:** `#16161f`
- **Text Opacity Scale:** 100%, 95%, 88%, 82%, 70%, 50%, 30%

## Fix Documentation

All bug fixes and issues are documented in the `/fixes/` directory with the following naming convention:
- `YYYY-MM-DD-brief-description.md`

Each fix document follows a standard template that captures:
- Issue description and symptoms
- Root cause analysis
- Solution implemented
- Testing approach
- Files affected
- Future considerations

See `/fixes/TEMPLATE.md` for the standard format.

## Contributing to Documentation

When creating new documentation:

1. **Use clear, descriptive filenames** - UPPERCASE with underscores
2. **Follow existing templates** - Maintain consistency
3. **Include practical examples** - Show, don't just tell
4. **Update this README** - Add links to new documentation
5. **Date your documents** - Include "Last Updated" section
6. **Cross-reference** - Link to related documentation

## Documentation Standards

### Format
- Use Markdown (.md)
- Include table of contents for long documents
- Use code blocks with language specification
- Include visual examples where helpful

### Structure
- Start with overview/introduction
- Provide clear section headings
- Include implementation examples
- Add troubleshooting section if applicable
- Conclude with quick reference

### Maintenance
- Review quarterly for accuracy
- Update when systems change
- Archive outdated documentation
- Maintain version history for major changes