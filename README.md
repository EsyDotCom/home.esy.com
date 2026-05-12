This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Engineering Workflow

This repo follows the Esy deployment workflow documented in
[`../app.esy.com/docs/DEPLOYMENT_WORKFLOW.md`](../app.esy.com/docs/DEPLOYMENT_WORKFLOW.md).

Minimum gate before pushing:

```bash
npm run lint
npm run build
```

Use a PR for changes touching public routes, SEO, publishing, API contracts,
auth/admin behavior, provider integrations, or deployment behavior.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Style Inspector (Style Analyzer)

The project includes a powerful **Style Inspector** (also called Style Analyzer) tool for visually inspecting and comparing the rendered styles of markdown/MDX content against a reference design system.

### Purpose
- Ensure that your markdown/MDX content matches the intended design system styles (e.g., font sizes, colors, spacing, etc.).
- Quickly identify and debug style mismatches between your implementation and the reference template.
- Facilitate collaboration between developers and designers by making style differences transparent and actionable.
- **Designed to easily share style discrepancy reports with an AI Editor like Cursor for rapid, AI-assisted style correction and review.**

### Features
- **Non-intrusive UI:** Appears as a small button in the bottom-right corner. Click to expand the full panel.
- **Element Hover Inspection:** Hover over any markdown/MDX element (headings, paragraphs, lists, blockquotes, code, custom cards, etc.) to see a live comparison of its computed styles vs. the reference.
- **Unit Conversion:** Displays expected values in their original units (e.g., `1.25rem`) and as computed pixel values (e.g., `20px`).
- **Color Conversion:** Displays expected colors in both hex (e.g., `#94a3b8`) and RGB (e.g., `rgb(148, 163, 184)`) for accurate comparison with computed styles.
- **Mismatch Highlighting:** Clearly indicates which properties do not match, and whether the mismatch is due to unit or color conversion.
- **Full Style Report:** Click "Generate" to analyze all relevant elements on the page and produce a summary of all style mismatches.
- **Copyable Report:** Click "Copy" to copy a markdown-formatted report of all style differences for sharing or documentation.
- **Auto-Refresh:** Enable auto-refresh to automatically re-analyze styles every 2 seconds as you make changes.
- **Minimize/Expand:** Collapse the panel to save space, expand when needed.
- **Self-Exclusion:** The inspector never inspects itself, preventing glitches.

### How to Use
1. **Start your app** and navigate to a page with markdown/MDX content.
2. **Click the "Style Inspector" button** in the bottom-right corner to open the panel.
3. **Hover over elements** to see live style comparisons.
4. **Click "Generate"** for a full-page style analysis.
5. **Click "Copy"** to copy the report for sharing.
6. **Enable "Auto-refresh"** to keep the analysis up-to-date as you edit styles.
7. **Minimize or close** the panel as needed.

This tool is invaluable for maintaining visual consistency and quickly catching style regressions in your content-driven Next.js applications.

## Documentation

This project maintains comprehensive documentation for tracking fixes and issues:

- **CHANGELOG.md** - High-level version history and release notes
- **docs/fixes/** - Detailed documentation of bug fixes and resolved issues
- **docs/QUICK_START.md** - Quick reference guide for documentation practices

See `/docs/README.md` for more information about our documentation standards.
