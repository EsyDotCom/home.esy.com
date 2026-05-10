# SEO Patterns

Repo-side SEO documentation. Tactical patterns for how individual fields, components, and pages on esy.com surface to search engines and social platforms.

This folder is for **patterns and conventions** — the repeatable techniques we use across content types. For broader strategy and orchestration, see:

- `docs/strategy/GROWTH_STRATEGY.md` — distribution and growth strategy (includes SEO positioning)
- `docs/strategy/clusters/CLUSTER-STRATEGY.md` — content cluster strategy
- `docs/VISUAL_ESSAY_METADATA_PATTERN.md` — visual-essay-specific metadata layout (OG / Twitter / canonical), pre-dates this folder
- `orchestration/agents/auditors/seo-audit-agent.md` — agent-side SEO auditing
- `orchestration/skills/seo-element-extraction/SKILL.md` — agent skill for SEO extraction

## Contents

| Document | Description |
|----------|-------------|
| [DESCRIPTION_FIELD_PATTERN.md](./DESCRIPTION_FIELD_PATTERN.md) | One short content field that does triple-duty as meta description, OG description, and listing card preview |

## When To Add Here

Add a doc to `docs/seo/` when you discover a repeatable technique that affects how the site is crawled, indexed, or unfurled — i.e., something that should be applied consistently across content types, not just on one page.

Examples of things that belong here:

- Field-level patterns (e.g., how `description`, `keywords`, `canonical` are populated and constrained)
- Routing patterns that affect indexing (URL shape, trailing slashes, canonicalization)
- Structured data patterns (JSON-LD, schema.org types)
- Crawl/budget patterns (robots, sitemaps, noindex strategy)
- OG / Twitter / iMessage unfurl patterns
- Internal linking conventions

Examples of things that don't:

- Strategy and positioning → `docs/strategy/`
- Specific essay layouts → `docs/RESEARCH_DESIGN_SYSTEM.md` or essay-specific docs
- Agent prompts and skills → `orchestration/`
