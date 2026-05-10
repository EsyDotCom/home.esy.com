# Blurb Card Pattern

A tinted, accent-bordered summary card used to render a short descriptive blurb above the body of a long-form post. The pattern gives the description visual weight without competing with the title or the body, signalling "this is the orienting summary" to the reader.

**Status:** Active — first shipped on the research post page (`/research/[slug]`) on 2026-05-09.

## Intent

When a long-form page has both:

1. A **title** (h2/h1, serif, dominant), and
2. A **body** (markdown prose), and
3. A short **description / standfirst** that summarizes the piece,

…the description tends to either disappear (rendered as muted prose under the metadata) or fight the title (rendered as a big serif lede). The blurb card solves this by giving the description its own designed surface — tinted, bordered, and quietly accented — so it reads as a distinct orienting layer between metadata and body.

## Where It's Used

| Surface | Field | Reference |
|---------|-------|-----------|
| Research post page | `ResearchVideo.description` | `src/app/research/[slug]/client.tsx` |

Apply the same pattern any time a page has a short summary blurb that should sit between metadata and body content (school articles, future essay landing pages, template detail pages, etc.).

## Visual Anatomy

```
┌────────────────────────────────────────────╮  ← radial accent glow (top-right)
│                                          ◯  │
│   Short description blurb that orients     │  ← body-weight prose, full theme.text
│   the reader before the post body.         │
│                                             │
└─────────────────────────────────────────────┘
   ↑ 1px theme.accentBorder, radius 14
   ↑ background: linear-gradient(135deg, accentTint → near-clear)
```

Five design moves, in priority order:

1. **Tinted accent gradient background** — `linear-gradient(135deg, theme.accentTint, rgba(0, 168, 150, 0.02))`. Soft enough to read as "highlighted" rather than "boxed."
2. **Hairline accent border** — `1px solid theme.accentBorder` keeps the card defined without weight.
3. **Generous corner radius** — `14px`. Larger than form inputs, smaller than hero modules.
4. **Radial accent glow in the top-right corner** — `theme.accentGlow` fading to transparent. Decorative but quiet; gives the card a sense of light direction.
5. **Body-weight type, full text color** — `theme.text`, `1rem` desktop / `0.9375rem` mobile, `lineHeight: 1.6`. Not a lede, not a footnote — orienting prose.

No eyebrow label by default. The visual treatment alone is enough; an eyebrow ("INTRODUCTION", "STANDFIRST", "TL;DR") competes with the page title and reads as over-designed.

## Recipe

Drop-in JSX using the `navyCalmLightTheme`. `isMobile` comes from the page's existing breakpoint hook.

```tsx
{description && (
  <div
    style={{
      position: "relative",
      marginTop: isMobile ? "1.25rem" : "1.75rem",
      padding: isMobile ? "1rem 1.125rem" : "1.125rem 1.375rem",
      borderRadius: 14,
      background: `linear-gradient(135deg, ${theme.accentTint} 0%, rgba(0, 168, 150, 0.02) 100%)`,
      border: `1px solid ${theme.accentBorder}`,
      overflow: "hidden",
    }}
  >
    <span
      aria-hidden
      style={{
        position: "absolute",
        top: -22,
        right: -22,
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.accentGlow} 0%, rgba(0, 168, 150, 0) 70%)`,
        pointerEvents: "none",
      }}
    />
    <p
      style={{
        position: "relative",
        fontSize: isMobile ? "0.9375rem" : "1rem",
        lineHeight: 1.6,
        color: theme.text,
        margin: 0,
        fontWeight: 400,
        wordBreak: "break-word" as const,
      }}
    >
      {description}
    </p>
  </div>
)}
```

The `position: relative` on the inner `<p>` keeps the text above the absolutely-positioned glow. The `aria-hidden` on the glow keeps it out of the accessibility tree.

## Theme Token Dependencies

All tokens come from `navyCalmLightTheme` in `src/lib/theme.js`:

| Token | Role | Value (current) |
|-------|------|-----------------|
| `theme.accentTint` | Background top-left | `rgba(0, 168, 150, 0.08)` |
| `theme.accentBorder` | Card border | `rgba(0, 168, 150, 0.2)` |
| `theme.accentGlow` | Corner glow center | `rgba(0, 168, 150, 0.15)` |
| `theme.text` | Body text color | `#333333` |

If you port this pattern to another theme (terracotta, violet, navy dark), substitute the equivalent `accent*` and `text` tokens — the gradient stops should remain at the same opacities so the tint stays consistent across themes.

## Responsive Behavior

| Breakpoint | Padding | Font size | Line height |
|------------|---------|-----------|-------------|
| Mobile (`< 640px`) | `1rem 1.125rem` | `0.9375rem` | `1.6` |
| Tablet / Desktop | `1.125rem 1.375rem` | `1rem` | `1.6` |

The corner glow keeps the same `80px` size at all widths. On very narrow viewports it's clipped by `overflow: hidden`, which is intentional — it should never push the card to scroll.

## Knobs (Variants)

If you need to dial the card up or down, change one variable at a time. Don't stack changes — the pattern depends on quietness.

- **Quieter**: drop the radial glow `<span>` entirely. You're left with a clean tinted card.
- **Louder**: change the gradient end stop from `0.02` to `0.06`, or swap the start stop to `theme.accentGlow`.
- **With label**: add a small eyebrow above the `<p>` using `0.625rem`, weight `700`, `letterSpacing: 0.12em`, `color: theme.accent`. **Use sparingly** — it tends to fight the page title.
- **Different accent**: any `accent*` token swap works (e.g., `premium*` for a gold "featured" treatment, `successGlow` for a "shipped" treatment).
- **No border**: works if the page already has a high border density. The gradient alone defines the surface.

## When NOT to Use

- **Don't use it for the first paragraph of body content.** That's a lede / standfirst, which is a different pattern (and one we explicitly rejected on the research page — it competed with the title).
- **Don't stack two of these on the same page.** It loses meaning.
- **Don't use it inside the body markdown.** Pull-quotes, callouts, and inline notes are separate patterns.
- **Don't add interactive elements inside it** (links, buttons). The card reads as a passive summary surface — interactivity sends the wrong signal.
- **Don't use it on dashboard / app surfaces.** This is editorial chrome; product UIs use different elevation patterns.

## Accessibility

- Decorative radial glow uses `aria-hidden` and `pointerEvents: "none"` — it never enters the tab order or the AX tree.
- Card has no semantic role; the inner `<p>` carries the meaning. Don't wrap it in `role="note"` or similar — screen readers should hear the description as ordinary prose, just visually distinguished.
- Contrast: `theme.text` (`#333333`) on `accentTint` (`#fffefe`-equivalent over white) clears WCAG AA at all sizes used.

## Reference Implementation

`src/app/research/[slug]/client.tsx` — search for the `{video.description && (` block. The pattern is rendered between the metadata row (date + duration + tags) and the workflow pipeline / body content.

## Related Patterns

- [`docs/seo/DESCRIPTION_FIELD_PATTERN.md`](../seo/DESCRIPTION_FIELD_PATTERN.md) — the `description` field rendered by this card also drives `<meta name="description">`, `og:description`, and listing-card preview text. The blurb card is the on-page surface; the SEO doc covers the other three.

## Change Log

- **2026-05-09** — Initial pattern. Replaced muted plain-text description on research post pages with the tinted blurb card. Briefly tried a "standfirst" treatment for the long lede paragraph; rejected because it competed with the title — the lede now flows through the regular markdown renderer.
