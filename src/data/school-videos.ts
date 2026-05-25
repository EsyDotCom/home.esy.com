export interface WorkflowStage {
  label: string;
  sublabel: string;
}

export interface SchoolVideo {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
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

export const schoolVideos: SchoolVideo[] = [
  {
    slug: "build-research-infographic",
    title: "Turn Any Citation into a Publication-Ready Infographic",
    description:
      "Drop in a DOI, citation, or topic — the Research Infographic workflow extracts the data, picks the right chart types, and renders a polished PNG, SVG, or PDF in under two minutes.",
    category: "infographics",
    categoryLabel: "Infographics",
    durationSeconds: 145,
    publishedAt: "2026-02-17",
    muxPlaybackId: "a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M",
    templateSlug: "research-infographic",
    stages: [
      { label: "Intake", sublabel: "Citation or topic" },
      { label: "Research", sublabel: "Extract key findings" },
      { label: "Design", sublabel: "Layout & viz selection" },
      { label: "Render", sublabel: "Generate visual" },
      { label: "Artifact", sublabel: "PNG · SVG · PDF" },
    ],
    transcript: "",
    content: `Every researcher knows the pain: you have a dense, data-rich paper and forty-eight hours until the conference poster deadline. Translating findings into clean visuals usually means wrestling with design tools you barely know. The Research Infographic workflow eliminates that detour entirely — paste a citation, and get a finished visual back.

![Data visualization dashboard with charts and analytics](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80)

## What You'll Create

> A fully designed, source-linked infographic — exported as high-resolution PNG, scalable SVG, or print-ready PDF — built directly from your research data.

## How the Workflow Runs

### 1. Intake
Provide a citation, DOI, or plain-language topic. Optionally attach raw datasets or a brand color palette to keep the output on-identity.

### 2. Research
The engine pulls and parses the source material — extracting key statistics, relationships, and findings. A DOI resolves to the full paper automatically.

### 3. Design
Layout and chart types are selected based on data structure. Comparisons get bar charts, chronological data gets timelines, processes get flow diagrams. Nothing is templated — every visual is composed for the specific dataset.

### 4. Render
The infographic is generated at publication resolution. Brand colors are applied if you provided a palette; otherwise, a clean default scheme is used.

### 5. Artifact
Your finished infographic is ready to download. Every data point links back to the original source, so your audience can verify any claim on the graphic.

![Analytics and business data on laptop screen](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80)

## Perfect For

- Conference posters and presentation slide assets
- Research visuals for grant proposals and funding decks
- Social media summaries of published findings
- Data figures for reports, white papers, and briefs

## Sample Artifacts

**"The Rise of Remote Work 2020–2024"** — A timeline infographic mapping workforce distribution shifts, productivity metrics, and policy changes across four years of remote-work data.

**"Global Water Scarcity Indicators"** — A regional comparison infographic visualizing access rates, consumption trends, and infrastructure gaps across 40 countries.

Open the [Research Infographic](/workflows/research-infographic) to get started.`,
    tags: ["infographics", "workflow", "data visualization", "research"],
    relatedSlugs: [
      "write-argumentative-essay",
      "from-question-to-research-paper",
      "write-expository-essay",
    ],
  },
  {
    slug: "write-argumentative-essay",
    title: "Build a Bulletproof Argumentative Essay in Minutes",
    description:
      "Pick a stance, and the Argumentative Essay workflow finds the evidence, maps the counterarguments, and delivers a fully cited DOCX or PDF — complete with APA, MLA, or Chicago formatting.",
    category: "essays",
    categoryLabel: "Academic Essays",
    durationSeconds: 380,
    publishedAt: "2026-02-14",
    muxPlaybackId: "a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M",
    templateSlug: "argumentative-essay-builder",
    stages: [
      { label: "Intake", sublabel: "Topic & stance" },
      { label: "Research", sublabel: "Evidence & counterargs" },
      { label: "Outline", sublabel: "Thesis & evidence map" },
      { label: "Draft", sublabel: "Argument composition" },
      { label: "Cite & Format", sublabel: "APA/MLA + check" },
      { label: "Artifact", sublabel: "DOCX · PDF" },
    ],
    transcript: "",
    content: `A strong argument isn't just an opinion with footnotes — it's a structure. Thesis, evidence, counterargument, rebuttal, synthesis. Most students understand this in theory but stall when it's time to build the scaffolding. The Argumentative Essay workflow handles the architecture so you can focus on the ideas.

![Student writing and researching at a desk](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80)

## What You'll Create

> A thesis-driven argumentative essay with sourced evidence, addressed counterarguments, and properly formatted citations — exported as DOCX or PDF.

## How the Workflow Runs

### 1. Intake
Provide your topic and your position. Optionally specify a target audience, required sources, or a particular angle — the more specific you are, the sharper the output.

### 2. Research
The engine gathers supporting evidence from academic databases and identifies the strongest counterarguments. Source quality is evaluated automatically — no Wikipedia deep-links making it into your bibliography.

### 3. Outline
A structured outline maps your thesis statement to specific evidence blocks. Each body section gets assigned sources, and every counterargument is paired with a planned rebuttal.

### 4. Draft
The full essay is composed section by section. Evidence is woven into the argument — not dumped in block quotes — and transitions maintain logical momentum from claim to claim.

### 5. Cite & Format
Citations are formatted in APA, MLA, or Chicago. The engine cross-checks every factual claim against its source and verifies that no counterargument is left unaddressed.

### 6. Artifact
Your finished essay is ready to download with formatted headers, in-text citations, and a complete bibliography.

![Notebook and pen on wooden desk for essay writing](https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&q=80)

## Perfect For

- College coursework and timed essay assignments
- Debate prep and competitive argumentation
- Policy papers and position briefs
- Op-eds and persuasive journalism

## Sample Artifacts

**"Should Universities Abolish Standardized Testing?"** — A five-section argument weighing equity, predictive validity, and institutional incentives, backed by 12 APA-formatted sources.

**"The Case for Universal Basic Income"** — A synthesis essay threading economic research, pilot-program data from Finland and Stockton, and philosophical arguments into a cohesive position paper.

Open the [Argumentative Essay Builder](/workflows/argumentative-essay-builder) to get started.`,
    tags: ["essays", "workflow", "argumentative", "academic writing"],
    relatedSlugs: [
      "create-analytical-essay",
      "from-question-to-research-paper",
      "write-expository-essay",
    ],
  },
  {
    slug: "create-analytical-essay",
    title: "Write a Sharp Analytical Essay — From Source Text to Polished Draft",
    description:
      "Hand the Analytical Essay workflow a text and a critical lens. It performs a close reading, builds an interpretive framework, and delivers a fully cited analysis in DOCX or PDF.",
    category: "essays",
    categoryLabel: "Academic Essays",
    durationSeconds: 350,
    publishedAt: "2026-02-10",
    muxPlaybackId: "a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M",
    templateSlug: "analytical-essay",
    stages: [
      { label: "Intake", sublabel: "Text & lens" },
      { label: "Research", sublabel: "Source close-reading" },
      { label: "Outline", sublabel: "Framework & sections" },
      { label: "Draft", sublabel: "Interpretive analysis" },
      { label: "Cite & Format", sublabel: "Textual citations" },
      { label: "Artifact", sublabel: "DOCX · PDF" },
    ],
    transcript: "",
    content: `Analysis is not summary. Every writing instructor says it; most students still struggle with the difference. The gap between "here's what happens in the text" and "here's what the text is doing and why it matters" is where analytical essays live — and where most drafts fall apart. This workflow bridges that gap by anchoring every paragraph to textual evidence and a consistent interpretive lens.

![Library shelves filled with books for literary research](https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80)

## What You'll Create

> An interpretive analytical essay grounded in close reading, structured around a critical framework, with properly formatted textual citations — exported as DOCX or PDF.

## How the Workflow Runs

### 1. Intake
Provide the source text (or identify it by title), choose an analytical lens — feminist, Marxist, postcolonial, formalist, psychoanalytic, or your own — and specify a focus question to anchor the analysis.

### 2. Research
The engine performs a close reading, flagging patterns, motifs, structural choices, and moments of tension relevant to your chosen framework. It surfaces textual evidence you might have missed.

### 3. Outline
An analytical structure is assembled around your framework. Each section receives specific textual evidence and a clear interpretive claim, building toward a unified thesis.

### 4. Draft
The essay is composed with close attention to the evidence-to-analysis ratio. Quotes are integrated into sentences — not dropped in isolation — and every paragraph advances the argument.

### 5. Cite & Format
In-text citations are formatted correctly for direct quotes and paraphrases. Page numbers, line references, and act/scene markers are handled based on the source type.

### 6. Artifact
Your polished analytical essay is ready with a works-cited page, consistent formatting, and proper headers.

![Stack of classic literature books on a reading table](https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80)

## Perfect For

- Literature courses and English department seminars
- Film analysis and media studies assignments
- Historical document interpretation
- Art criticism and visual culture essays

## Sample Artifacts

**"Symbolism in Toni Morrison's Beloved"** — A close-reading analysis tracing motifs of water, trees, and color through the novel's central passages, grounded in a postcolonial framework.

**"Power Dynamics in Orwell's 1984"** — A Foucauldian analysis of surveillance architecture, Newspeak as linguistic control, and the Party's institutional power structures across the narrative.

Open the [Analytical Essay](/workflows/analytical-essay) to get started.`,
    tags: ["essays", "workflow", "analytical", "literary analysis", "close reading"],
    relatedSlugs: [
      "write-argumentative-essay",
      "write-narrative-essay",
      "from-question-to-research-paper",
    ],
  },
  {
    slug: "write-expository-essay",
    title: "Explain Anything Clearly with the Expository Essay Workflow",
    description:
      "Choose a topic and a structure — compare/contrast, cause/effect, process, or definition — and the Expository Essay workflow delivers a fact-backed, clearly organized essay in DOCX or PDF.",
    category: "essays",
    categoryLabel: "Academic Essays",
    durationSeconds: 320,
    publishedAt: "2026-02-06",
    muxPlaybackId: "a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M",
    templateSlug: "expository-essay",
    stages: [
      { label: "Intake", sublabel: "Topic & scope" },
      { label: "Research", sublabel: "Facts & data" },
      { label: "Outline", sublabel: "Logic structure" },
      { label: "Draft", sublabel: "Explanatory prose" },
      { label: "Cite & Format", sublabel: "Source attribution" },
      { label: "Artifact", sublabel: "DOCX · PDF" },
    ],
    transcript: "",
    content: `The best expository writing makes complex subjects feel inevitable — as if the explanation could not have been organized any other way. That clarity doesn't happen by accident. It requires the right structure matched to the right content. This workflow picks the structure for you based on your topic and subtype, then fills it with sourced, accurate information.

![Student studying with textbooks and notes spread across a desk](https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80)

## What You'll Create

> A clearly organized expository essay — compare/contrast, cause/effect, process, or definition — backed by reliable sources and formatted in your chosen citation style as DOCX or PDF.

## How the Workflow Runs

### 1. Intake
Provide your topic, select the essay subtype (compare/contrast, cause/effect, process, or definition), and set the scope. The subtype selection determines the entire structural logic downstream.

### 2. Research
The engine gathers factual information, data, and expert perspectives. Sources are evaluated for reliability and relevance — prioritizing peer-reviewed material and authoritative references.

### 3. Outline
A logical structure is built specific to your subtype. Compare/contrast essays get point-by-point or block organization. Process essays get sequential stages. Cause/effect essays get clearly traced causal chains.

### 4. Draft
Clear, objective prose is composed. No persuasion, no opinion — just precise explanation. Each paragraph serves the structure, and transitions guide the reader through the logic without effort.

### 5. Cite & Format
All factual claims are attributed to sources. The engine ensures every statement is backed and formatting matches APA, MLA, or Chicago style consistently throughout.

### 6. Artifact
Your finished expository essay is ready with headers, source attributions, and a complete bibliography.

![Code and data on a computer screen representing structured information](https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80)

## Perfect For

- Introductory courses and general education assignments
- Textbook chapter summaries and study guides
- How-to guides and technical explanations
- Science overviews and explainer articles

## Sample Artifacts

**"How CRISPR Gene Editing Works"** — A process essay walking through the Cas9 mechanism, current therapeutic applications, and the ethical landscape of human germline editing.

**"Comparing Keynesian and Austrian Economics"** — A point-by-point compare/contrast essay examining fiscal policy philosophy, market intervention approaches, and business cycle theories across both schools.

Open the [Expository Essay](/workflows/expository-essay) to get started.`,
    tags: ["essays", "workflow", "expository", "academic writing"],
    relatedSlugs: [
      "write-argumentative-essay",
      "create-analytical-essay",
      "from-question-to-research-paper",
    ],
  },
  {
    slug: "write-narrative-essay",
    title: "Tell Your Story — The Narrative Essay Workflow",
    description:
      "Give the Narrative Essay workflow a theme and a perspective. It builds a story arc, enriches scenes with contextual detail, and delivers a polished personal essay in DOCX or PDF.",
    category: "essays",
    categoryLabel: "Academic Essays",
    durationSeconds: 310,
    publishedAt: "2026-01-30",
    muxPlaybackId: "a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M",
    templateSlug: "narrative-essay",
    stages: [
      { label: "Intake", sublabel: "Theme & voice" },
      { label: "Research", sublabel: "Context & setting" },
      { label: "Outline", sublabel: "Story arc & scenes" },
      { label: "Draft", sublabel: "Scene writing" },
      { label: "Cite & Format", sublabel: "Style & voice polish" },
      { label: "Artifact", sublabel: "DOCX · PDF" },
    ],
    transcript: "",
    content: `Everyone has a story worth telling. The hard part is never the experience itself — it's the craft. Choosing the right moment to open on, knowing when to slow down for sensory detail and when to cut forward, balancing vulnerability with restraint. The Narrative Essay workflow gives your story the structure it needs without flattening the voice that makes it yours.

![Pen resting on an open notebook, ready for writing](https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80)

## What You'll Create

> A vivid, arc-driven narrative essay that blends personal experience with reflective insight — formatted and polished as DOCX or PDF.

## How the Workflow Runs

### 1. Intake
Provide your theme or core experience, choose a narrative perspective (first-person or third-person), and optionally set a tone — reflective, urgent, humorous, bittersweet. The more specific your seed, the more distinct the voice.

### 2. Research
The engine researches contextual details that enrich your narrative — historical backdrop, sensory textures, cultural references, and setting-specific information that make scenes feel grounded rather than generic.

### 3. Outline
A story arc is constructed with a clear beginning, rising action, climax, and resolution. Key scenes are identified, sequenced, and assigned emotional beats that serve the larger theme.

### 4. Draft
Each scene is composed with attention to pacing, sensory detail, and dialogue. The narrative voice stays consistent — no sudden shifts from intimate to academic — and every paragraph earns its place in the arc.

### 5. Cite & Format
The essay is refined for voice consistency and emotional impact. Clichés are stripped. Vague generalizations are replaced with concrete, specific details. Pacing is tightened.

### 6. Artifact
Your finished narrative essay is ready with clean formatting and a polished final line.

![Mountain landscape under starry night sky evoking reflection](https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80)

## Perfect For

- Creative writing courses and workshop submissions
- Personal portfolio pieces and writing samples
- Memoir chapters and personal journalism
- Scholarship applications that ask for a personal narrative

## Sample Artifacts

**"The Summer That Changed Everything"** — A reflective first-person narrative tracing a pivotal three months through five vivid scenes — a road trip, a conversation on a rooftop, a decision made in silence.

**"Finding Home in a Foreign Language"** — A lyrical essay exploring identity and belonging through the daily friction and unexpected intimacy of learning to think in a second language.

Open the [Narrative Essay](/workflows/narrative-essay) to get started.`,
    tags: ["essays", "workflow", "narrative", "creative writing", "personal essay"],
    relatedSlugs: [
      "craft-college-application-essay",
      "create-analytical-essay",
      "write-argumentative-essay",
    ],
  },
  {
    slug: "from-question-to-research-paper",
    title: "From Research Question to Finished Paper — The Full Workflow",
    description:
      "Start with a question and an academic field. The Research Paper workflow runs a literature review, designs methodology, composes findings, and exports a fully cited paper in DOCX or PDF.",
    category: "research",
    categoryLabel: "Research",
    durationSeconds: 480,
    publishedAt: "2026-01-24",
    muxPlaybackId: "a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M",
    templateSlug: "research-paper",
    stages: [
      { label: "Intake", sublabel: "Question & field" },
      { label: "Research", sublabel: "Literature review" },
      { label: "Outline", sublabel: "Methodology design" },
      { label: "Draft", sublabel: "Findings & discussion" },
      { label: "Cite & Format", sublabel: "Full bibliography" },
      { label: "Artifact", sublabel: "DOCX · PDF" },
    ],
    transcript: "",
    content: `A research paper isn't one task — it's six. Formulating the question, surveying the literature, designing a methodology, writing up findings, threading the discussion, and formatting every citation correctly. Most students spend more time on the mechanics than the thinking. This workflow inverts that ratio. You bring the question and the intellectual direction; the engine handles the scaffolding, sourcing, and formatting.

![Open book and research materials on a study desk](https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80)

## What You'll Create

> A complete academic research paper — introduction, literature review, methodology, findings, discussion, conclusion, and bibliography — properly formatted in your citation style as DOCX or PDF.

## How the Workflow Runs

### 1. Intake
Provide your research question, academic field or discipline, preferred citation format (APA, MLA, or Chicago), and any key sources you want the paper to engage with.

### 2. Research
The engine conducts a literature review — identifying relevant studies, mapping key debates, and surfacing gaps in existing research. Sources are evaluated for academic rigor, recency, and relevance to your specific question.

### 3. Outline
A full paper structure is designed: introduction with thesis, literature review organized by theme or chronology, methodology section, findings, discussion, and conclusion. Each section gets assigned its sources and argumentative role.

### 4. Draft
The paper is composed section by section. The literature review synthesizes rather than summarizes. The discussion connects your findings to the broader scholarly conversation and acknowledges limitations honestly.

### 5. Cite & Format
Every in-text citation is formatted correctly and cross-referenced against the bibliography. The engine catches orphaned citations, missing page numbers, and inconsistent formatting.

### 6. Artifact
Your research paper is ready with academic formatting — title page, running headers, page numbers, and a complete bibliography.

![Laboratory research with scientific equipment and samples](https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80)

## Perfect For

- Graduate coursework and seminar papers
- Capstone and thesis projects
- Conference paper submissions
- Journal article first drafts

## Sample Artifacts

**"Impact of Social Media on Adolescent Mental Health"** — A psychology paper synthesizing 30+ studies on screen time, social comparison, and anxiety prevalence in teens aged 13–18, with APA formatting throughout.

**"Renewable Energy Adoption in Developing Nations"** — An economics paper analyzing policy frameworks, foreign direct investment trends, and infrastructure barriers across twelve sub-Saharan African nations.

Open the [Research Paper](/workflows/research-paper) to get started.`,
    tags: ["research", "workflow", "academic writing", "literature review"],
    relatedSlugs: [
      "write-argumentative-essay",
      "create-analytical-essay",
      "build-research-infographic",
    ],
  },
  {
    slug: "craft-college-application-essay",
    title: "Nail Your College Application Essay — Personal, Specific, Authentic",
    description:
      "Provide the prompt, your target schools, and the experiences that matter. The College Application Essay workflow researches each program, builds a narrative arc, and delivers a polished personal statement in DOCX or PDF.",
    category: "essays",
    categoryLabel: "Academic Essays",
    durationSeconds: 290,
    publishedAt: "2026-01-18",
    muxPlaybackId: "a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M",
    templateSlug: "college-application-essay",
    stages: [
      { label: "Intake", sublabel: "Prompt & goals" },
      { label: "Research", sublabel: "Program research" },
      { label: "Outline", sublabel: "Narrative arc" },
      { label: "Draft", sublabel: "Personal narrative" },
      { label: "Cite & Format", sublabel: "Word count & tone" },
      { label: "Artifact", sublabel: "DOCX · PDF" },
    ],
    transcript: "",
    content: `Admissions officers read thousands of essays a cycle. They can spot a generic personal statement in the first sentence. What cuts through isn't dramatic life events — it's specificity, self-awareness, and a voice that sounds like a real person wrote it. This workflow helps you find the story only you can tell, then shapes it into something an admissions committee will remember.

![University campus with students walking between buildings](https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80)

## What You'll Create

> A polished, word-count-perfect personal statement or supplemental essay — tailored to specific schools and prompts — exported as DOCX or PDF.

## How the Workflow Runs

### 1. Intake
Provide the essay prompt, your target school(s), the word count limit, and the key experiences or themes you want to highlight. The more raw material you give, the more personal the output.

### 2. Research
The engine researches your target programs — specific labs, faculty, courses, campus initiatives, and institutional values. This context shapes the "why this school" thread that admissions officers look for.

### 3. Outline
A narrative arc is built around your experiences. The structure connects who you were, what changed you, and why this program is the next chapter — without sounding formulaic.

### 4. Draft
Your essay is written with a focus on showing over telling. Specific details replace vague claims. Dialogue and scene-setting replace lists of accomplishments. The voice stays authentically yours.

### 5. Cite & Format
The essay is refined to hit the exact word count. Tone is checked for authenticity — clichés are cut, overwrought language is dialed back, and every sentence earns its place.

### 6. Artifact
Your polished personal statement is ready to paste into the Common App, upload to a portal, or submit as a PDF.

![Graduation caps thrown in the air at a university ceremony](https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80)

## Perfect For

- Common App personal statements (650 words)
- School-specific supplemental essays
- Scholarship personal statements and essays
- Graduate school statements of purpose

## Sample Artifacts

**"Why This University: Engineering at MIT"** — A supplemental essay connecting the applicant's robotics competition experience to specific MIT labs, faculty research areas, and the UROP program.

**"Overcoming Adversity: A First-Generation Story"** — A Common App personal statement weaving family immigration history, academic perseverance, and community mentorship into a narrative about redefining what's possible.

Open the [College Application Essay](/workflows/college-application-essay) to get started.`,
    tags: ["essays", "workflow", "college application", "personal statement", "admissions"],
    relatedSlugs: [
      "write-narrative-essay",
      "write-argumentative-essay",
      "from-question-to-research-paper",
    ],
  },
];

export function getPublishedVideos(): SchoolVideo[] {
  return [...schoolVideos].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getVideoBySlug(slug: string): SchoolVideo | undefined {
  return schoolVideos.find((v) => v.slug === slug);
}

export function getRelatedVideos(
  currentSlug: string,
  relatedSlugs: string[],
  limit = 4
): SchoolVideo[] {
  const related = relatedSlugs
    .map((slug) => schoolVideos.find((v) => v.slug === slug))
    .filter((v): v is SchoolVideo => v !== undefined);

  if (related.length >= limit) return related.slice(0, limit);

  const remaining = getPublishedVideos()
    .filter((v) => v.slug !== currentSlug && !relatedSlugs.includes(v.slug))
    .slice(0, limit - related.length);

  return [...related, ...remaining].slice(0, limit);
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
