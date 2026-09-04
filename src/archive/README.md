# Archive

Code that shipped, was replaced, and is kept out of the live tree rather than
deleted — so a decision can be revisited without digging through history.

## homepage-intelligence-circuitry (retired 2026-09-04)

The esy.com homepage from the "Intelligence Circuitry" era: navy hero on a
56px circuit grid, live RunConsole demo, clip.art case study, artifact
spotlight, workers roster, founder note. Replaced at `/` by the isometric
story homepage (`src/components/HomeV3`), which won a three-way comparison
against this page and the clay-cast candidate (`/homepage-v2`, deleted).

Not imported anywhere. To revive: point `src/app/page.js` back at
`IntelligenceCircuitryPage` and restore the navy nav/footer defaults in
`ConditionalNavigation.js` and `Home/footer.tsx`.
