# Description Field Pattern

A short content field — typically called `description` — written to do triple-duty across three SEO-relevant surfaces simultaneously. One field, one author intent, one canonical string. Three placements.

**Status:** Active — first formalized on the research post page (`/research/[slug]`) on 2026-05-09.

## The Pattern

Every long-form content type on esy.com (research posts, school videos, essays, templates) carries a short `description` string in its data model. That single string gets rendered into three surfaces:

```
                        ┌─────────────────────────────────┐
                        │  description: "A side-by-side   │
                        │  look at ChatGPT Images 2.0…"   │
                        └────────────────┬────────────────┘
                                         │
              ┌──────────────────────────┼──────────────────────────┐
              │                          │                          │
              ▼                          ▼                          ▼
    ┌───────────────────┐      ┌───────────────────┐      ┌───────────────────┐
    │  <meta name=      │      │  og:description   │      │  Listing card     │
    │  "description">   │      │  twitter:         │      │  preview text on  │
    │                   │      │  description      │      │  index pages      │
    │  (Search snippet, │      │                   │      │                   │
    │   sliced to 160)  │      │  (Social unfurls) │      │  (In-product)     │
    └───────────────────┘      └───────────────────┘      └───────────────────┘
         Crawler-facing             Share-facing               Reader-facing
```

The string is the same on all three surfaces. The constraints are not — meta description has the tightest cap, social previews are slightly looser, and the listing card has the most flexibility. Writing to the tightest constraint (meta description, ~160 chars) makes the field work everywhere without per-surface variants.

## Why One Field, Not Three

Tempting alternatives we explicitly rejected:

| Alternative | Why we don't do it |
|-------------|--------------------|
| Separate `metaDescription`, `ogDescription`, `cardBlurb` fields | Authors forget to write the second and third. The first one ends up on every surface anyway. Maintenance cost > value. |
| Auto-generate `description` from the first paragraph of `content` | The first paragraph is written for the reader who already clicked. The description is written for the reader who hasn't. Different jobs. |
| Skip `description`, just rely on `title` + body | Search engines synthesize their own snippet from body text — usually badly. We lose control of the snippet, and listing cards have nothing to render. |

A single hand-written `description` field is the lowest-effort, highest-leverage point.

## Constraints (Write to the Tightest)

| Surface | Hard cap | Practical cap | Notes |
|---------|----------|---------------|-------|
| Google search snippet | ~160 chars | 150–155 | Truncates with ellipsis after this on most queries; mobile snippets sometimes shorter. |
| `og:description` (most platforms) | ~200 chars | ≤160 | Facebook, LinkedIn, Discord, iMessage. iMessage often shows even less. |
| `twitter:description` | 200 chars | ≤160 | X truncates around 200; matching meta description avoids a separate variant. |
| In-product listing card | flexible | ≤200 | Card layout determines the practical cap; matching the meta description keeps card text crisp. |

**Rule of thumb:** Write to **150 characters**. If you can't, write to **160 max**. Anything longer either truncates in search or fails the cleanest social unfurl.

## Voice Guidance

The description is read by people who haven't decided to click yet. It's not a teaser. It's not the first sentence of the post. It's a self-contained, factual hook.

Good descriptions:

- Open with a noun phrase or a verb, not a personal pronoun (`A side-by-side look at…`, `How Esy's pipeline turns…`, not `I take a look at…`).
- State the subject and the angle in one sentence.
- Are readable out of context — they make sense in a search result with no surrounding page.
- Avoid in-jokes, acronyms, or jargon the cold reader won't recognize.

Bad descriptions:

- Restate the title.
- Are written as a teaser ("In this piece I'll explore…") that withholds the actual content.
- Cut off mid-thought because the author wrote past 160 chars and Google truncated for them.
- Use passive voice that's longer than the active equivalent.

## Reference Implementation

The research post page is the canonical reference.

**Data model** (`src/data/research-videos.ts`):

```ts
export interface ResearchVideo {
  // …
  description: string; // The triple-duty field
  // …
}
```

**Surface 1 — `<meta>` and OG tags** (`src/app/research/[slug]/page.tsx`):

```ts
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = getResearchVideoBySlug(slug);
  if (!video) return {};

  return {
    title: `${video.title} — Esy Research`,
    description: video.description.slice(0, 160),
    openGraph: {
      title: video.title,
      description: video.description.slice(0, 160),
      type: "video.other",
      images: ogImage ? [ogImage] : [],
    },
  };
}
```

The `.slice(0, 160)` is a defensive cap — even if an author writes long, search engines and unfurl crawlers receive a clean truncation.

**Surface 2 — Listing card** (`src/components/Research/ResearchVideoCard.tsx`):

The same `description` string is passed to the card component on the `/research` index. No transformation, no separate copy.

**Surface 3 — On-page rendering**: The same string is rendered on the post page as a styled blurb card so the description does visible work for human readers, not just metadata work for crawlers. See [`docs/patterns/BLURB_CARD_PATTERN.md`](../patterns/BLURB_CARD_PATTERN.md) for the visual treatment.

## Verification

Verify the field is doing all three jobs after publishing:

| Surface | Tool |
|---------|------|
| `<meta name="description">` | View page source, search for `<meta name="description"` |
| `og:description` | [opengraph.xyz](https://www.opengraph.xyz/) or [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) |
| `twitter:description` | [Twitter Card Validator](https://cards-dev.twitter.com/validator) (now mostly via X) |
| Search snippet | `site:esy.com "<title>"` after Google has crawled the page |
| iMessage / Discord / Slack unfurl | Paste the link in each surface and check |

If the snippet looks wrong, the issue is almost always one of:

1. The string is longer than 160 chars and Google synthesized its own.
2. `generateMetadata` isn't returning `description` (typo, conditional return path).
3. The page isn't yet indexed — wait 2–7 days after sitemap submission.

## Anti-Patterns

Things to avoid:

- **Per-surface variants.** Don't introduce `metaDescription`, `socialDescription`, `cardDescription`. The pattern's value is one field, one truth. If a specific surface genuinely needs different copy (rare), add a narrowly-scoped optional field with an explicit reason in the doc comment.
- **Auto-generation from content.** Tempting (especially with LLMs) but fragile. The description should be intentional, not derived.
- **Writing past 160 characters.** If the constraint feels tight, that's the constraint doing its job. Tighten the sentence.
- **Restating the title.** The `<title>` and `description` ride together in search results. Repeating the title wastes the snippet.
- **Marketing fluff.** "Discover the future of…" reads as ad copy. Cold readers tune it out. Lead with the subject.

## Related Patterns

- [`docs/patterns/BLURB_CARD_PATTERN.md`](../patterns/BLURB_CARD_PATTERN.md) — visual treatment for rendering this same `description` field on-page.
- [`docs/VISUAL_ESSAY_METADATA_PATTERN.md`](../VISUAL_ESSAY_METADATA_PATTERN.md) — broader metadata layout (canonical, OG image, Twitter card type) for visual essays. The description-field pattern is one input into that larger metadata structure.

## Change Log

- **2026-05-09** — Initial pattern. Formalized after rendering the research post page's `description` as a styled on-page blurb card; the same field already drove `<meta>`, OG, and listing-card surfaces, but the triple-duty contract was undocumented.
