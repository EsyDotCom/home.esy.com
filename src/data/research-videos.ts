export interface WorkflowStage {
  label: string;
  sublabel: string;
}

export interface ResearchVideo {
  slug: string;
  title: string;
  description: string;
  category: "ai-tools" | "workflows";
  categoryLabel: "AI Coding Tools" | "Workflow Research";
  durationSeconds: number;
  publishedAt: string;
  muxPlaybackId: string;
  thumbnailUrl?: string;
  transcript?: string;
  content: string;
  tags: string[];
  relatedSlugs: string[];
  templateSlug?: string;
  stages?: WorkflowStage[];
}

export const researchVideos: ResearchVideo[] = [
  {
    slug: "chatgpt-images-2-vs-nano-banana-2",
    title: "ChatGPT Images 2.0: A Monster Upgrade for Educational Artifacts",
    description:
      "A side-by-side look at ChatGPT Images 2.0 and Nano Banana 2 (Gemini 3.1 Flash Image) across clipart with text, illustrations, infographics, and character reference sheets — and where each fits inside an automated educational artifact pipeline.",
    category: "workflows",
    categoryLabel: "Workflow Research",
    durationSeconds: 600,
    publishedAt: "2026-05-09",
    muxPlaybackId: "EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs",
    transcript: "",
    content: `Two weeks ago, OpenAI released its biggest update of the year — and a real shift forward for AI image generation. Clearly the most significant release since Nano Banana 2 (Gemini 3.1 Flash Image) dropped earlier this year. NB2 set the bar with its powerful editing capabilities and text accuracy, which bumped the quality and detail of educational infographics you could produce — hence their mass circulation on X in recent months. My first impression of ChatGPT Images 2.0 is that it beats NB2 on both fronts. In this piece, we'll compare and explore the differences between each, their pros and cons and how each perform as components within a larger agentic workflow to produce reliable educational artifacts. Using examples such as clipart vectors with text, illustrations, infographics, and character reference sheets for animations we'll dive deep with examples and assess where each is optimal within an automated content generation pipeline.`,
    tags: [
      "chatgpt-images-2",
      "nano-banana-2",
      "gemini",
      "image-generation",
      "agentic-workflows",
    ],
    relatedSlugs: [
      "agentic-research-pipeline-design",
      "building-multi-agent-workflows-claude-code",
      "mux-video-pipeline-nextjs",
    ],
  },
  {
    slug: "building-multi-agent-workflows-claude-code",
    title: "Building Multi-Agent Workflows with Claude Code",
    description:
      "How I orchestrate 34 specialized agents to produce research artifacts at Esy — the architecture decisions, failure modes, and why single-LLM approaches break down at scale.",
    category: "ai-tools",
    categoryLabel: "AI Coding Tools",
    durationSeconds: 720,
    publishedAt: "2026-02-20",
    muxPlaybackId: "EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs",
    transcript: "",
    content: `Building a production workflow engine on top of LLMs sounds straightforward until you try it. A single prompt chain works for demos. It falls apart the moment you need reliable, cited, structured output across dozens of use cases. This is the story of how Esy's multi-agent architecture evolved from a single Claude API call to a 34-agent orchestration system — and what broke along the way.

## The Single-Agent Trap

Most AI coding tools start here: one model, one prompt, one output. It works beautifully for small tasks. But the moment you need an agent to research *and* outline *and* draft *and* cite — the context window becomes the bottleneck. Not because it runs out of tokens, but because the model loses focus. A 4,000-word essay prompt that includes research instructions, style guidelines, and citation rules produces mediocre output across every dimension.

## Why Multi-Agent

The insight is simple: specialization works. An agent dedicated to citation verification doesn't need to know anything about narrative structure. An agent that designs infographic layouts doesn't need to parse DOIs. By decomposing the workflow into discrete stages — Intake, Research, Outline, Draft, Cite & Format — each agent can be small, focused, and testable.

## The Architecture

Each workflow template at Esy maps to a pipeline of agents. The pipeline definition lives in a configuration file — not in code. This means adding a new workflow type (say, a grant proposal) doesn't require engineering work. It requires defining which agents participate and in what order.

## What Broke

Three things consistently broke during development:

1. **Agent handoff serialization** — passing structured data between agents without losing context or introducing hallucinations in the intermediate state
2. **Citation grounding** — ensuring the research agent's sources actually make it into the final artifact without being paraphrased into oblivion
3. **Error recovery** — when agent 4 of 6 fails, you can't just restart the pipeline. The cost (time + API credits) is too high. Partial recovery is essential.

## Lessons

The biggest lesson: treat agents like microservices, not like a conversation. They don't need to know about each other. They read from a shared state, do their job, write back. The orchestrator manages sequencing, retries, and validation between stages.`,
    tags: ["claude-code", "multi-agent", "architecture", "LLM orchestration"],
    relatedSlugs: [
      "cursor-workflow-patterns-production",
      "agentic-research-pipeline-design",
      "mux-video-pipeline-nextjs",
    ],
  },
  {
    slug: "cursor-workflow-patterns-production",
    title: "Cursor Workflow Patterns That Actually Ship to Production",
    description:
      "The specific Cursor workflows I use daily to build and ship Esy — from agent-assisted refactoring to test-driven component generation. No demos, only patterns that survived production.",
    category: "ai-tools",
    categoryLabel: "AI Coding Tools",
    durationSeconds: 540,
    publishedAt: "2026-02-15",
    muxPlaybackId: "EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs",
    transcript: "",
    content: `Every Cursor tutorial shows the same demo: "look, I typed a comment and it wrote the function." That's table stakes. This video covers the patterns I actually use to ship production code at Esy — patterns that work when the codebase is 50,000+ lines, the components are interconnected, and a wrong edit breaks the build.

## Pattern 1: Context-Bounded Refactoring

The key to using Cursor effectively in a large codebase is limiting the context window to exactly what matters. When refactoring a component, I explicitly include only:
- The component file
- Its direct imports
- The test file (if it exists)
- The type definitions it depends on

Including the entire directory kills output quality. The model starts "improving" code you didn't ask it to touch.

## Pattern 2: Test-First Component Generation

When building a new component, I write the test first — describing the expected behavior, props, and edge cases. Then I feed the test file to Cursor and ask it to implement the component that passes. The test file acts as a specification, not just a safety net.

## Pattern 3: Build-Error-Driven Iteration

After any significant edit, I run the build immediately. Cursor is remarkably good at fixing its own TypeScript errors and Next.js build failures when you feed it the error output. The workflow becomes: edit → build → fix → build → commit.

## What Doesn't Work

- **Asking Cursor to "improve" a file** — too vague, produces noise
- **Multi-file edits in one prompt** — model loses track of changes across files
- **Ignoring the build** — Cursor can write code that looks correct but fails SSR safety checks

## The Meta-Pattern

The overarching pattern: AI coding tools amplify your engineering judgment, they don't replace it. Every Cursor output goes through the same review I'd give a junior developer's PR. The speed gain comes from not typing boilerplate, not from skipping review.`,
    tags: ["cursor", "ai-coding", "developer-workflow", "production"],
    relatedSlugs: [
      "building-multi-agent-workflows-claude-code",
      "mux-video-pipeline-nextjs",
      "agentic-research-pipeline-design",
    ],
  },
  {
    slug: "agentic-research-pipeline-design",
    title: "Designing the Esy Research Pipeline — From Question to Cited Artifact",
    description:
      "A deep dive into how Esy's workflow engine transforms a research question into a fully cited, structured artifact — the pipeline stages, LLM selection per stage, and quality gates.",
    category: "workflows",
    categoryLabel: "Workflow Research",
    durationSeconds: 660,
    publishedAt: "2026-02-10",
    muxPlaybackId: "EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs",
    transcript: "",
    content: `The promise of Esy is simple: you provide a research question, and you receive a structured, cited artifact. The engineering behind that promise is anything but simple. This post breaks down the complete research pipeline — every stage, every decision point, and every quality gate between input and output.

## The Pipeline

Every Esy workflow follows the same macro-structure, though the specifics vary by template:

1. **Intake** — Parse the user's input, extract intent, identify constraints
2. **Research** — Source discovery, relevance scoring, fact extraction
3. **Outline** — Structural design based on artifact type and content
4. **Draft** — Content generation within the structural framework
5. **Cite & Format** — Citation verification, format compliance, consistency checks
6. **Artifact** — Final assembly, export formatting, metadata attachment

## LLM Selection Per Stage

Not every stage benefits from the same model. Research-heavy stages need models with strong factual grounding and source awareness. Drafting stages need models with strong prose quality. Citation stages need precision and consistency over creativity.

At Esy, different pipeline stages use different models — and this isn't about cost optimization. It's about quality optimization. A model that writes beautiful prose might hallucinate citations. A model that's rigorous about facts might produce stilted writing.

## Quality Gates

Between each stage, a validation step checks the output before passing it downstream:
- After Research: Are sources real? Are they relevant? Is there sufficient coverage?
- After Outline: Does the structure match the artifact type? Are all sources assigned?
- After Draft: Does the content follow the outline? Are claims supported?
- After Cite: Do all citations resolve? Is the format consistent?

These gates are the difference between a demo and a product. Without them, you get impressive-looking output that falls apart under scrutiny.

## The Hard Problem: Citation Grounding

The single hardest engineering problem in this pipeline is citation grounding — ensuring that when the artifact says "According to Smith et al. (2024)," there's an actual Smith et al. (2024) paper that actually says what the artifact claims it says. This is where most AI writing tools fail, and it's where Esy invests the most engineering effort.`,
    tags: ["workflow-engine", "research-pipeline", "citation", "architecture"],
    relatedSlugs: [
      "building-multi-agent-workflows-claude-code",
      "mux-video-pipeline-nextjs",
      "cursor-workflow-patterns-production",
    ],
  },
  {
    slug: "mux-video-pipeline-nextjs",
    title: "Building a Video-First Content Platform with MUX and Next.js",
    description:
      "How Esy's school and research pages use MUX for video hosting, transcript generation, and SEO-optimized content delivery — the full technical implementation from upload to ranked page.",
    category: "workflows",
    categoryLabel: "Workflow Research",
    durationSeconds: 480,
    publishedAt: "2026-02-05",
    muxPlaybackId: "EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs",
    transcript: "",
    content: `Video-first content pages are an SEO weapon hiding in plain sight. A page with a MUX-hosted video hero, crawlable transcript below, and written content underneath hits three ranking signals simultaneously: dwell time (video), content depth (article), and keyword density (transcript). This post covers the full technical implementation at Esy.

## The Architecture

The content platform runs on Next.js 15 with static generation. Each video page is a statically generated route that includes:
- A MUX video player at the hero position
- A collapsible transcript toggle below the player
- A full written article underneath
- Related content in a sticky sidebar

The data model for each video lives in a TypeScript data file — not a CMS. This keeps the build pipeline simple and the content version-controlled.

## MUX Integration

MUX handles video hosting, adaptive bitrate streaming, and thumbnail generation. The integration is minimal:
- Upload a video to MUX, get a playback ID
- Use \`@mux/mux-player-react\` in a client component
- Generate thumbnails via \`https://image.mux.com/{playbackId}/thumbnail.jpg\`

The player is configured for on-demand streaming with custom brand colors, playback rate controls, and keyboard shortcuts.

## The SEO Play

The transcript is the key. MUX can generate transcripts automatically, but even a manually written transcript serves the same purpose: it puts the video's spoken content into crawlable HTML. A 10-minute video about "building agentic workflows with Claude Code" produces 2,000+ words of keyword-rich content that Google indexes immediately.

Combined with the written article below the video, each page targets long-tail keywords with very low competition. "How to build multi-agent workflows" has almost no SEO competition right now. In 12 months, it will.

## Build-Time Generation

Every video page uses \`generateStaticParams\` to produce static HTML at build time. No server-side rendering, no edge functions, no API calls at request time. The page loads instantly from a CDN. MUX handles the video streaming separately.`,
    tags: ["mux", "next.js", "video-platform", "seo", "static-generation"],
    relatedSlugs: [
      "agentic-research-pipeline-design",
      "building-multi-agent-workflows-claude-code",
      "cursor-workflow-patterns-production",
    ],
  },
];

export function getPublishedResearchVideos(): ResearchVideo[] {
  return [...researchVideos].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getResearchVideoBySlug(
  slug: string
): ResearchVideo | undefined {
  return researchVideos.find((v) => v.slug === slug);
}

export function getRelatedResearchVideos(
  currentSlug: string,
  relatedSlugs: string[],
  limit = 4
): ResearchVideo[] {
  const related = relatedSlugs
    .map((slug) => researchVideos.find((v) => v.slug === slug))
    .filter((v): v is ResearchVideo => v !== undefined);

  if (related.length >= limit) return related.slice(0, limit);

  const remaining = getPublishedResearchVideos()
    .filter((v) => v.slug !== currentSlug && !relatedSlugs.includes(v.slug))
    .slice(0, limit - related.length);

  return [...related, ...remaining].slice(0, limit);
}

export function getResearchVideosByCategory(
  category: ResearchVideo["category"]
): ResearchVideo[] {
  return getPublishedResearchVideos().filter((v) => v.category === category);
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
