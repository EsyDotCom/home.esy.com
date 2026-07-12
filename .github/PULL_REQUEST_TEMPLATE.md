<!-- ESY PR framework: write for a smart reader with ZERO context.
     Full standard: org.esy/frameworks/PR_WRITING_FRAMEWORK.md
     Calibrate: typo = one sentence; fix = Why + What + After merging;
     feature = all five; architecture/UI = all five + visuals. -->

## Why
<!-- 2-4 plain sentences. What was broken as the USER experiences it.
     Name the run/artifact id if an incident prompted this. -->

## What changed
<!-- Grouped bullets, ONE idea per bullet. Plain words first, precise
     term in parentheses after. Expand every acronym once. -->

## How it works
<!-- Only when the change has a shape. Flows → mermaid flowchart;
     sequences → sequenceDiagram; layouts → screenshots (UI PRs ALWAYS);
     decisions → option/cost/why table. Delete this section for fixes. -->

## What could break
<!-- Every consumer of a changed contract, NAMED, with what protects it.
     "Nothing consumes this yet" is a valid answer — say it explicitly. -->

## After merging
<!-- Numbered operator checklist: deploy waits, migrations, REPUBLISH
     steps, what to click to verify. "Nothing — deploy handles it" counts. -->
