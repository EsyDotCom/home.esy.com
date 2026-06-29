/**
 * Mock Data for Esy Course Learning System
 * 
 * Contains 3 courses with 3 lessons each, themed around AI upskilling.
 * Each lesson includes transcript segments, commentary, and resources.
 * 
 * To swap in real data later:
 *  - Replace getCourse() / getLesson() with API calls or DB queries
 *  - Keep the same return types (Course, Lesson)
 */

import { Course, Lesson, TranscriptSegment, LessonCommentary } from './types';

// ─── Helper: generate transcript segments ──────────────────
function generateTranscript(texts: string[], startMs = 0, segDuration = 4000): TranscriptSegment[] {
  return texts.map((text, i) => ({
    id: `seg-${i}`,
    startMs: startMs + i * segDuration,
    endMs: startMs + (i + 1) * segDuration,
    text,
    speaker: 'Instructor',
  }));
}

// ─── Course 1: How to use Claude Code ──────────────────────
const claudeCodeTranscript1 = generateTranscript([
  "Welcome to the first lesson on using Claude Code effectively in your development workflow.",
  "Claude Code is a powerful AI coding assistant that runs directly in your terminal.",
  "It can read your codebase, make edits, run commands, and help you build entire features.",
  "Let's start by understanding the basic setup. You'll need to have Node.js installed.",
  "Open your terminal and run the installation command to get Claude Code globally available.",
  "Once installed, navigate to your project directory and simply type 'claude' to start a session.",
  "Claude Code automatically scans your project structure and understands the context.",
  "This means you don't need to manually point it to files — it discovers them intelligently.",
  "The key philosophy is: give clear, specific instructions about what you want to achieve.",
  "For example, instead of saying 'fix the bug', describe the expected behavior versus actual behavior.",
  "Claude Code excels at multi-file changes, refactoring, and implementing new features from scratch.",
  "It can also run your tests, check linter errors, and iterate on fixes automatically.",
  "One powerful pattern is to describe your desired architecture and let Claude Code scaffold it.",
  "You can reference files, paste error messages, or describe UI changes you want to see.",
  "Always review the changes Claude Code makes before committing — it's a pair programming partner.",
  "The tool supports extended thinking for complex architectural decisions.",
  "You can customize Claude Code's behavior with a CLAUDE.md file at your project root.",
  "This file can contain project-specific instructions, coding standards, and preferences.",
  "Think of CLAUDE.md as a living document that evolves with your project's conventions.",
  "In this course, we'll go deep into each of these patterns with real-world examples.",
  "By the end, you'll be using Claude Code to ship features 3-5x faster than manual coding.",
  "Let's move on to the practical setup in the next segment.",
  "First, ensure your environment meets the minimum requirements for running Claude Code.",
  "You'll need Node.js 18 or later, a modern terminal, and at least 4GB of RAM available.",
  "The installation process is straightforward and takes less than a minute.",
  "After installation, verify everything works by running 'claude --version' in your terminal.",
  "You should see the version number and a confirmation that the tool is ready.",
  "Now let's look at the user interface. Claude Code presents a clean conversation interface.",
  "You type your requests in natural language, and Claude responds with explanations and code changes.",
  "The diff view shows you exactly what files were modified, added, or removed.",
  "This transparency is crucial for maintaining control over your codebase.",
  "Each change is presented as a clear diff that you can accept, reject, or modify.",
  "Think of it like a code review where the reviewer also implements the suggestions.",
  "This workflow dramatically reduces the back-and-forth typical of manual code reviews.",
  "Now let's discuss some best practices for writing effective prompts for Claude Code.",
  "The most important principle is specificity — be precise about what you want.",
  "Include file paths, function names, and expected behavior in your requests.",
  "Use examples when describing complex logic or UI patterns you want implemented.",
  "Claude Code also supports multi-turn conversations, so you can iterate on results.",
  "If the first result isn't perfect, provide feedback and ask for refinements.",
  "That wraps up our introduction to Claude Code. In the next lesson, we'll dive into advanced patterns.",
]);

const claudeCodeCommentary1: LessonCommentary = {
  markdown: `## Getting Started with Claude Code

Claude Code represents a paradigm shift in how developers interact with AI assistants. Unlike chat-based coding tools, Claude Code operates directly in your terminal with full access to your project context.

### Key Concepts

**Agentic Coding**: Claude Code doesn't just answer questions — it takes actions. It reads files, makes edits, runs commands, and verifies its own work. This is fundamentally different from copy-pasting code from a chat interface.

**Context-Aware**: By scanning your entire project structure, Claude Code understands your conventions, dependencies, and patterns. This means suggestions are tailored to your specific codebase, not generic templates.

### Setup Checklist

1. Install Node.js 18+ from [nodejs.org](https://nodejs.org)
2. Run the global installation command
3. Create a CLAUDE.md file with your project conventions
4. Start your first session with \`claude\` in your project root

### Pro Tips

> **Tip**: Start with small, well-defined tasks to build confidence with the tool. As you learn its capabilities, gradually increase the complexity of your requests.

> **Tip at 0:36**: When describing bugs, always include the expected behavior, actual behavior, and steps to reproduce.`,
  timestampRefs: [
    { label: 'Installation walkthrough', timeMs: 16000 },
    { label: 'Project scanning explained', timeMs: 28000 },
    { label: 'CLAUDE.md configuration', timeMs: 64000 },
    { label: 'Best practices for prompts', timeMs: 136000 },
  ],
  resources: [
    { title: 'Claude Code Documentation', url: 'https://docs.anthropic.com/claude-code', type: 'link', description: 'Official setup and usage guide' },
    { title: 'CLAUDE.md Template', url: '#', type: 'download', description: 'Starter template for project configuration' },
    { title: 'Example Projects', url: '#', type: 'github', description: 'Open-source projects using Claude Code' },
  ],
};

const claudeCodeTranscript2 = generateTranscript([
  "Welcome back! In this lesson we'll cover advanced patterns for Claude Code.",
  "We're going to look at multi-file refactoring, test-driven development, and architecture scaffolding.",
  "Let's start with multi-file refactoring — one of Claude Code's strongest capabilities.",
  "Imagine you need to rename a component and update all its imports across 50 files.",
  "Instead of find-and-replace, describe the refactoring goal and let Claude Code handle it.",
  "It will find all usages, update imports, rename files, and adjust tests accordingly.",
  "The key is to be explicit about what should change and what should stay the same.",
  "For example: 'Rename UserProfile to AccountProfile everywhere, including tests and styles.'",
  "Claude Code will generate a comprehensive diff showing every file that was modified.",
  "Now let's talk about test-driven development with Claude Code.",
  "You can write your test cases first, then ask Claude Code to implement the code that passes them.",
  "This is incredibly powerful for maintaining code quality and catching edge cases.",
  "Describe the function signature, the expected inputs and outputs, and the edge cases.",
  "Claude Code will write both the implementation and verify it passes your tests.",
  "Moving on to architecture scaffolding — creating entire features from a description.",
  "You can describe a feature like 'Add a user settings page with email, password, and notification preferences.'",
  "Claude Code will create the route, components, API endpoints, and database queries.",
  "It follows your existing patterns, so the new code feels consistent with your codebase.",
  "Another powerful pattern is iterative refinement through multi-turn conversations.",
  "After Claude Code makes changes, you can say 'the styling needs more padding' or 'add error handling here.'",
  "Each iteration builds on the previous context, so you don't need to repeat yourself.",
  "This conversational approach makes complex tasks manageable and incremental.",
  "Let's also discuss error recovery. When something goes wrong, Claude Code can help debug.",
  "Paste an error message and describe the context. Claude Code will trace the issue and fix it.",
  "It can also run your test suite and fix failing tests automatically.",
  "This creates a tight feedback loop: describe → implement → test → fix → ship.",
  "Now let's look at some real-world examples of these patterns in action.",
  "In our demo project, we'll refactor an authentication system from JWT to session-based.",
  "This involves changes to middleware, API routes, database schema, and client-side code.",
  "Watch how Claude Code orchestrates all these changes in a single conversation.",
  "The result is a clean, comprehensive refactoring with no manual file hunting.",
  "That's the power of agentic coding — the AI handles the tedious parts while you direct the strategy.",
  "In our final lesson, we'll cover tips for team workflows and CI/CD integration.",
]);

const claudeCodeCommentary2: LessonCommentary = {
  markdown: `## Advanced Claude Code Patterns

This lesson covers the patterns that separate novice Claude Code users from power users. These techniques can 10x your productivity on complex tasks.

### Multi-File Refactoring

The key to successful refactoring with Claude Code:
- **Be explicit about scope**: Tell it which directories to touch and which to leave alone
- **Specify naming conventions**: "Use camelCase for variables, PascalCase for components"
- **Include edge cases**: "Also update the storybook files and the API documentation"

### Test-Driven Development Flow

\`\`\`
1. Write test cases with expected behavior
2. Ask Claude Code to implement the feature
3. Run tests to verify
4. Iterate on failures
5. Ship with confidence
\`\`\`

### Architecture Scaffolding

When creating new features, provide Claude Code with:
- The feature description (what it does)
- The data model (what entities exist)
- The user flow (how users interact)
- Reference files (existing patterns to follow)`,
  timestampRefs: [
    { label: 'Multi-file refactoring demo', timeMs: 8000 },
    { label: 'Test-driven development', timeMs: 36000 },
    { label: 'Architecture scaffolding', timeMs: 56000 },
    { label: 'Real-world example', timeMs: 108000 },
  ],
  resources: [
    { title: 'Refactoring Patterns Guide', url: '#', type: 'link', description: 'Common refactoring patterns optimized for AI-assisted coding' },
    { title: 'TDD with Claude Code', url: '#', type: 'link', description: 'Step-by-step tutorial on test-driven AI development' },
  ],
};

const claudeCodeTranscript3 = generateTranscript([
  "Welcome to the final lesson on Claude Code — team workflows and CI/CD integration.",
  "So far we've covered individual usage, but Claude Code really shines in team settings.",
  "Let's talk about how to standardize Claude Code usage across your engineering team.",
  "The CLAUDE.md file we mentioned earlier becomes your team's AI coding constitution.",
  "Document your coding standards, architecture decisions, and naming conventions in it.",
  "When any team member uses Claude Code, it follows these shared conventions automatically.",
  "This ensures consistency even when different developers are working on different features.",
  "Next, let's discuss code review workflows with Claude Code.",
  "You can use Claude Code to review pull requests by asking it to analyze the diff.",
  "It can identify potential bugs, suggest improvements, and check for style consistency.",
  "This doesn't replace human review — it augments it by catching mechanical issues.",
  "Now let's look at CI/CD integration possibilities.",
  "Claude Code can be used in automated pipelines for tasks like generating documentation.",
  "It can also update changelogs, generate release notes, and update API documentation.",
  "The key is to define clear, repeatable tasks that benefit from automation.",
  "For deployment workflows, Claude Code can help prepare migration scripts and deploy configs.",
  "Another team pattern is using Claude Code for onboarding new developers.",
  "New team members can ask Claude Code questions about the codebase and get contextual answers.",
  "Since Claude Code reads the actual code, the answers are specific to your project.",
  "This dramatically reduces the time to productivity for new hires.",
  "Let's also cover security considerations when using Claude Code in team settings.",
  "Be mindful of sensitive data — don't include API keys or passwords in your prompts.",
  "Use environment variables and secret management tools instead.",
  "Configure your .gitignore to exclude any files that might contain sensitive information.",
  "Now let's discuss measuring the impact of Claude Code on your team's productivity.",
  "Track metrics like: time to first commit, PR review cycles, and bug fix turnaround.",
  "Teams typically see a 40-60% reduction in time-to-ship after adopting AI coding tools.",
  "But remember, the goal isn't just speed — it's sustainable, high-quality development.",
  "Let's wrap up with some final best practices for long-term Claude Code usage.",
  "Regularly update your CLAUDE.md as your project evolves and conventions change.",
  "Share learnings with your team — what prompts work well, what doesn't.",
  "Build a team library of common prompts for recurring tasks.",
  "And most importantly, stay curious and experiment with new patterns.",
  "Thanks for completing this course on Claude Code! You're now ready to code at 10x speed.",
  "Check the resources section for links to documentation and community forums.",
  "Happy coding, and see you in the next course!",
]);

const claudeCodeCommentary3: LessonCommentary = {
  markdown: `## Team Workflows & CI/CD Integration

Scaling Claude Code from individual to team usage requires intentional setup. This lesson covers the organizational patterns that make AI-assisted coding sustainable.

### CLAUDE.md as Team Constitution

Your CLAUDE.md should include:
- **Architecture overview**: High-level system design
- **Coding standards**: Naming, formatting, patterns
- **File structure**: Where things go and why
- **Review criteria**: What makes code "ready to ship"

### CI/CD Integration Opportunities

| Task | Automation Level | Impact |
|------|-----------------|--------|
| Changelog generation | Full | High |
| API docs update | Full | Medium |
| Code style checks | Augmented | Medium |
| Migration scripts | Guided | High |

### Measuring Impact

Track these metrics before and after adoption:
1. Time from task start to first PR
2. PR review cycle time
3. Bug fix turnaround
4. Onboarding time for new developers`,
  timestampRefs: [
    { label: 'CLAUDE.md for teams', timeMs: 12000 },
    { label: 'Code review workflows', timeMs: 28000 },
    { label: 'CI/CD integration', timeMs: 44000 },
    { label: 'Security considerations', timeMs: 80000 },
  ],
  resources: [
    { title: 'Team CLAUDE.md Template', url: '#', type: 'download', description: 'Enterprise-ready configuration template' },
    { title: 'CI/CD Integration Guide', url: '#', type: 'link', description: 'Setting up Claude Code in your pipeline' },
    { title: 'Security Best Practices', url: '#', type: 'paper', description: 'Whitepaper on secure AI coding workflows' },
  ],
};

// ─── Course 2: ChatGPT for Research Workflows ──────────────
const chatgptTranscript1 = generateTranscript([
  "Welcome to ChatGPT for Research Workflows. In this course, we'll transform how you conduct research.",
  "Traditional research involves hours of reading, note-taking, and synthesizing information.",
  "ChatGPT can dramatically accelerate each of these stages when used strategically.",
  "But let me be clear upfront — AI is a tool to augment your thinking, not replace it.",
  "Critical evaluation of AI outputs is essential for maintaining research integrity.",
  "Let's start with the research planning phase. This is where ChatGPT adds the most value.",
  "You can use ChatGPT to brainstorm research questions and identify knowledge gaps.",
  "Ask it to suggest alternative angles on your topic that you might not have considered.",
  "For example: 'What are the underexplored aspects of climate adaptation in urban planning?'",
  "ChatGPT can generate a structured research outline based on your initial questions.",
  "This outline serves as a roadmap, helping you prioritize which sources to read first.",
  "Now let's discuss using ChatGPT for literature review acceleration.",
  "While ChatGPT can't read papers for you, it can help you quickly summarize and compare findings.",
  "Paste an abstract and ask for a plain-language summary of the key contributions.",
  "You can also ask it to identify the methodology, sample size, and limitations of a study.",
  "This helps you quickly assess whether a paper is worth a deep read.",
  "Another powerful technique is asking ChatGPT to compare multiple papers on the same topic.",
  "Give it summaries of 3-4 papers and ask for a synthesis of their agreements and disagreements.",
  "This creates a landscape view of the research field in minutes rather than hours.",
  "Let's also cover citation management with ChatGPT assistance.",
  "You can ask ChatGPT to format citations in any style — APA, MLA, Chicago, Harvard.",
  "But always verify the citation details against the original source. AI can hallucinate DOIs.",
  "Now let's talk about the writing phase. ChatGPT is excellent for overcoming writer's block.",
  "Use it to generate first draft paragraphs that you then refine with your expert knowledge.",
  "Ask it to rephrase complex ideas in simpler language for broader audiences.",
  "Or conversely, help you express informal ideas in more academic language.",
  "The key is to use ChatGPT as a writing partner, not a ghostwriter.",
  "Your unique insights, analysis, and conclusions should always remain your own.",
  "In the next lesson, we'll dive into specific prompt frameworks for different research stages.",
  "These frameworks will give you a systematic approach to getting the best research outputs.",
  "Thank you for joining this lesson. Let's continue building your AI research toolkit.",
]);

const chatgptCommentary1: LessonCommentary = {
  markdown: `## Introduction to AI-Assisted Research

This lesson establishes the foundation for using ChatGPT as a research accelerator while maintaining academic integrity.

### The AI Research Framework

Think of ChatGPT in research as a **research assistant**, not an **author**:
- ✅ Brainstorming and ideation
- ✅ Literature summarization
- ✅ Citation formatting
- ✅ Draft generation
- ❌ Replacing critical thinking
- ❌ Generating novel findings
- ❌ Bypassing peer review

### Research Stages & AI Value

| Stage | AI Value | Human Value |
|-------|----------|-------------|
| Planning | High — idea generation | Direction setting |
| Literature Review | Medium — summarization | Critical evaluation |
| Analysis | Low — pattern description | Interpretation |
| Writing | Medium — drafting | Voice & argument |
| Review | Medium — consistency checks | Quality judgment |

> **Important**: Always verify AI-generated citations against original sources. Citation hallucination is a known issue.`,
  timestampRefs: [
    { label: 'Research planning with AI', timeMs: 20000 },
    { label: 'Literature review acceleration', timeMs: 44000 },
    { label: 'Citation management', timeMs: 80000 },
    { label: 'Writing with AI assistance', timeMs: 88000 },
  ],
  resources: [
    { title: 'AI Research Ethics Guidelines', url: '#', type: 'paper', description: 'Framework for responsible AI use in academia' },
    { title: 'Prompt Templates for Research', url: '#', type: 'download', description: '50+ research-specific prompt templates' },
    { title: 'Esy Research Workflows', url: '/research', type: 'link', description: 'Explore Esy\'s citation-first research tools' },
  ],
};

const chatgptTranscript2 = generateTranscript([
  "Welcome back! Today we're covering prompt frameworks specifically designed for research tasks.",
  "A prompt framework is a reusable structure that consistently produces high-quality outputs.",
  "The first framework is SCOPE: Situation, Context, Objective, Parameters, Examples.",
  "Let me break each element down with a research-specific example.",
  "Situation sets the scene: 'I am a graduate student researching urban heat islands.'",
  "Context adds detail: 'I'm writing a literature review for my thesis proposal.'",
  "Objective states the goal: 'Identify the top 5 mitigation strategies from recent studies.'",
  "Parameters set constraints: 'Focus on studies from 2020-2024, peer-reviewed journals only.'",
  "Examples show the format: 'Present each strategy with a one-paragraph summary and 3 key citations.'",
  "When you combine all five elements, you get remarkably precise and useful outputs.",
  "Let's try this framework live with a real research question.",
  "The second framework is PEEL: Point, Evidence, Explain, Link. Familiar from academic writing.",
  "You can use PEEL to structure ChatGPT's outputs in an academically rigorous format.",
  "Ask ChatGPT: 'Using the PEEL structure, argue for the effectiveness of green roofs in reducing urban heat.'",
  "The output will have a clear thesis, supporting evidence, analysis, and connection to broader themes.",
  "The third framework is Socratic Dialogue — using questions to deepen analysis.",
  "Instead of asking for answers, ask ChatGPT to challenge your arguments.",
  "For example: 'Here is my thesis. Play devil's advocate and identify the three strongest counterarguments.'",
  "This technique strengthens your research by exposing blind spots in your reasoning.",
  "Now let's discuss chain prompting for complex research tasks.",
  "Break your research into stages and feed the output of one prompt into the next.",
  "Stage 1: 'Summarize this paper's methodology.' Stage 2: 'Compare this methodology with paper B.'",
  "Stage 3: 'Synthesize the strengths and weaknesses of both approaches.'",
  "This chain produces a nuanced comparison that a single prompt couldn't achieve.",
  "Finally, let's cover the verification workflow — how to check AI outputs.",
  "Always cross-reference facts, dates, and statistics with primary sources.",
  "Use citation databases like Google Scholar to verify referenced papers actually exist.",
  "Check for logical consistency — does the argument flow make sense?",
  "And verify that direct quotes are accurate by finding them in the original text.",
  "These verification habits are what separate responsible AI-assisted research from careless usage.",
  "In our next lesson, we'll apply these frameworks to a complete research project from start to finish.",
]);

const chatgptCommentary2: LessonCommentary = {
  markdown: `## Prompt Frameworks for Research

Three battle-tested frameworks for getting consistent, high-quality research outputs from ChatGPT.

### Framework 1: SCOPE

\`\`\`
S — Situation:  Who you are, what stage of research
C — Context:    Background on your topic/project  
O — Objective:  Exactly what you want produced
P — Parameters: Constraints (dates, sources, format)
E — Examples:   Show the desired output format
\`\`\`

### Framework 2: PEEL

Use this when you want academically structured arguments:
- **P**oint — Clear thesis statement
- **E**vidence — Supporting data and citations
- **E**xplain — Analysis of how evidence supports the point
- **L**ink — Connection to broader research question

### Framework 3: Socratic Dialogue

Instead of asking for answers, ask for challenges:
- "What are the counterarguments to this thesis?"
- "What methodological weaknesses does this study have?"
- "What alternative interpretations exist for these findings?"

### Chain Prompting for Complex Tasks

Break research into sequential stages where each output feeds the next input. This produces deeper, more nuanced analysis than any single prompt.`,
  timestampRefs: [
    { label: 'SCOPE framework explained', timeMs: 8000 },
    { label: 'Live SCOPE demo', timeMs: 40000 },
    { label: 'PEEL for academic writing', timeMs: 44000 },
    { label: 'Socratic Dialogue technique', timeMs: 60000 },
    { label: 'Verification workflow', timeMs: 100000 },
  ],
  resources: [
    { title: 'SCOPE Framework Cheat Sheet', url: '#', type: 'download', description: 'Printable reference card for the SCOPE framework' },
    { title: 'Research Prompt Library', url: '#', type: 'link', description: '100+ research prompts organized by stage' },
  ],
};

const chatgptTranscript3 = generateTranscript([
  "Welcome to our final lesson! Today we're doing a complete research project from start to finish.",
  "We'll research the topic: 'The impact of remote work on urban planning in post-pandemic cities.'",
  "I'll demonstrate every technique we've covered in this course, applied to a real project.",
  "Let's start with the planning phase using the SCOPE framework.",
  "First, we define our situation: we're writing a research brief for an urban planning conference.",
  "Next, the context: post-COVID cities are seeing permanent shifts in commuting patterns.",
  "Our objective: produce a 2000-word research brief with 10+ citations.",
  "Parameters: focus on studies from 2021-2024, include data from at least 3 countries.",
  "Now I'll use ChatGPT to brainstorm the key research questions.",
  "Notice how I provide all five SCOPE elements in my prompt. The output is focused and relevant.",
  "ChatGPT suggests looking at transportation infrastructure, housing markets, and commercial real estate.",
  "It also suggests examining the equity implications — who benefits and who loses from remote work.",
  "Excellent. Now let's move to the literature review acceleration phase.",
  "I'll paste three abstracts and ask ChatGPT to synthesize the key findings.",
  "Watch how I use chain prompting: first summarize, then compare, then synthesize.",
  "The synthesis reveals a consensus that remote work reduces commute-related emissions.",
  "But there's disagreement about the impact on suburban sprawl — some studies show increase, others decrease.",
  "This is valuable — it tells us where the debate is and where our brief should focus.",
  "Now let's use the Socratic Dialogue technique to stress-test our preliminary thesis.",
  "Our thesis: 'Remote work fundamentally requires cities to rethink transit investment priorities.'",
  "ChatGPT's counterarguments include: hybrid work may not reduce transit enough to matter.",
  "And: transit serves essential workers who can't work remotely. Good points we need to address.",
  "Now let's move to the writing phase. I'll use PEEL to structure the key sections.",
  "For each section, I provide the point I want to make and ask for evidence and explanation.",
  "I then refine the output with my own analysis and expert knowledge.",
  "Notice I'm not using ChatGPT's text verbatim — I'm using it as a drafting accelerator.",
  "The final step is verification. I check every citation ChatGPT suggested against Google Scholar.",
  "Two out of ten citations needed correction — the papers existed but the details were slightly wrong.",
  "This is why verification is non-negotiable in AI-assisted research.",
  "Let's also run a consistency check: does our argument flow logically from start to finish?",
  "ChatGPT confirms the structure is sound but suggests strengthening the equity section.",
  "Good feedback. I'll add more data on how remote work impacts different income brackets.",
  "And there we have it — a complete research brief, produced in hours instead of days.",
  "The quality is high because we used frameworks, verification, and human expertise throughout.",
  "Thank you for completing this course! You now have a systematic toolkit for AI-assisted research.",
]);

const chatgptCommentary3: LessonCommentary = {
  markdown: `## Complete Research Project Walkthrough

This lesson demonstrates the full AI-assisted research workflow applied to a real topic.

### Project Setup

**Topic**: The impact of remote work on urban planning in post-pandemic cities  
**Format**: 2000-word research brief for an urban planning conference  
**Constraint**: 10+ citations, studies from 2021-2024, 3+ countries

### Workflow Applied

1. **Planning** (SCOPE) → Research questions + outline
2. **Literature Review** (Chain Prompting) → Summarize → Compare → Synthesize
3. **Thesis Development** (Socratic Dialogue) → Stress-test arguments
4. **Writing** (PEEL) → Structured draft sections
5. **Verification** → Cross-reference all citations
6. **Refinement** → Consistency check + strengthen weak sections

### Key Takeaway

> The goal is not to have AI write your research — it's to have AI accelerate the mechanical parts so you can focus more time on the intellectual parts that only humans can do.

### Final Checklist

- [ ] All citations verified against primary sources
- [ ] Logical flow checked from introduction to conclusion
- [ ] Counterarguments addressed
- [ ] Data from multiple sources cross-referenced
- [ ] Your unique analysis clearly distinguishes your contribution`,
  timestampRefs: [
    { label: 'SCOPE framework applied', timeMs: 12000 },
    { label: 'Literature synthesis demo', timeMs: 44000 },
    { label: 'Socratic stress test', timeMs: 76000 },
    { label: 'Verification workflow', timeMs: 108000 },
  ],
  resources: [
    { title: 'Complete Research Brief (PDF)', url: '#', type: 'download', description: 'The finished research brief from this lesson' },
    { title: 'Verification Checklist', url: '#', type: 'download', description: 'Step-by-step citation verification process' },
    { title: 'Urban Planning Research Database', url: '#', type: 'link', description: 'Curated collection of remote work + urban planning studies' },
  ],
};

// ─── Course 3: Educational Infographics with Nano Banana ───
const nanoTranscript1 = generateTranscript([
  "Welcome to Creating Educational Infographics with Nano Banana — Esy's visual artifact engine.",
  "Infographics are one of the most powerful formats for communicating complex ideas quickly.",
  "Research shows that visual content is processed 60,000 times faster than text.",
  "But creating effective infographics traditionally requires design skills and expensive tools.",
  "Nano Banana changes this by turning structured data and research into visual artifacts.",
  "In this lesson, we'll cover the fundamentals of educational infographic design.",
  "The most important principle is: every visual element must serve a communication purpose.",
  "Decorative graphics that don't convey information actually reduce comprehension.",
  "Let's start with the anatomy of an effective educational infographic.",
  "At the top, you need a clear, compelling title that states the main takeaway.",
  "Below the title, a subtitle or introduction provides context in one to two sentences.",
  "The body of the infographic should follow a logical flow — top to bottom, left to right.",
  "Use numbered sections or a visual timeline to guide the reader through the content.",
  "Data visualization is the heart of educational infographics.",
  "Choose the right chart type for your data: bar charts for comparison, line charts for trends.",
  "Pie charts should be used sparingly — they're often less effective than bar charts.",
  "Color is a crucial communication tool, not just decoration.",
  "Use a consistent color scheme that maps to meaning — blue for X, green for Y.",
  "Ensure sufficient contrast for readability. Test with color blindness simulators.",
  "Typography matters too. Use no more than two font families in an infographic.",
  "One for headings, one for body text. Keep text concise — every word should earn its place.",
  "Icons and illustrations should be consistent in style. Don't mix flat and 3D graphics.",
  "White space is your friend. Crowded infographics overwhelm rather than educate.",
  "Give each section room to breathe. Margins and padding create visual hierarchy.",
  "Let's also discuss the research behind effective visual learning.",
  "Mayer's Cognitive Theory of Multimedia Learning tells us that combining text and visuals helps.",
  "But only when they're spatially and temporally aligned — text near its related graphic.",
  "The split-attention effect occurs when readers must mentally integrate separated information.",
  "Avoid this by placing labels directly on or near the data they describe.",
  "In the next lesson, we'll use Nano Banana to create our first infographic from scratch.",
  "You'll see how structured input produces professional-quality visual output.",
]);

const nanoCommentary1: LessonCommentary = {
  markdown: `## Fundamentals of Educational Infographic Design

Effective educational infographics are grounded in cognitive science and visual communication theory. This lesson covers the principles that separate good infographics from great ones.

### The Visual Communication Hierarchy

1. **Title** — The single most important takeaway
2. **Subtitle** — Context in 1-2 sentences
3. **Body Sections** — Logical flow of information
4. **Data Visualizations** — Evidence and patterns
5. **Call to Action** — What should the reader do next?

### Chart Selection Guide

| Data Type | Best Chart | Avoid |
|-----------|-----------|-------|
| Comparison | Bar chart | Pie chart (>4 items) |
| Trend over time | Line chart | Bar chart |
| Part of whole | Stacked bar | 3D pie chart |
| Relationship | Scatter plot | Table |
| Process | Flowchart | Bullet list |

### Cognitive Science Foundations

**Mayer's Principles** that apply to infographics:
- **Multimedia Principle**: People learn better from words + pictures than words alone
- **Spatial Contiguity**: Place text near related graphics
- **Coherence**: Remove extraneous material
- **Signaling**: Use visual cues to highlight organization`,
  timestampRefs: [
    { label: 'Anatomy of an infographic', timeMs: 32000 },
    { label: 'Data visualization choices', timeMs: 52000 },
    { label: 'Color and typography', timeMs: 68000 },
    { label: 'Cognitive science foundations', timeMs: 100000 },
  ],
  resources: [
    { title: 'Infographic Design Checklist', url: '#', type: 'download', description: 'Quality checklist for educational infographics' },
    { title: 'Color Blindness Simulator', url: '#', type: 'link', description: 'Test your designs for accessibility' },
    { title: 'Mayer\'s Multimedia Principles', url: '#', type: 'paper', description: 'Academic paper on cognitive load in visual learning' },
  ],
};

const nanoTranscript2 = generateTranscript([
  "Welcome back! Today we're creating our first infographic using Nano Banana's workflow.",
  "Nano Banana works by taking structured input — your research data — and producing visual output.",
  "The key concept is 'structured input'. The better your input, the better the output.",
  "Let's start by defining our infographic topic: 'The Rise of Remote Work 2020-2024.'",
  "First, we'll prepare our data. I have statistics on remote work adoption across industries.",
  "Technology leads at 67% fully remote, followed by finance at 42%, and education at 38%.",
  "We also have trend data showing year-over-year growth in remote work percentages.",
  "And qualitative data on employee satisfaction and productivity changes.",
  "Now let's input this into Nano Banana using the structured format.",
  "The format requires: title, sections, data points, and optional visual preferences.",
  "Watch as I define each section with its data and preferred visualization type.",
  "Section one: 'Adoption by Industry' — I'll use a horizontal bar chart.",
  "Section two: 'Year-over-Year Growth' — a line chart with annotations for key events.",
  "Section three: 'Employee Impact' — a split visualization showing satisfaction and productivity.",
  "Section four: 'Key Takeaways' — three highlighted statistics with icons.",
  "Now I submit this to Nano Banana and watch the generation process.",
  "Within seconds, Nano Banana produces a first draft of the infographic.",
  "Let's review it together. The layout follows the logical flow we specified.",
  "The color scheme automatically uses our brand palette — navy and teal.",
  "The data visualizations are clear and accurately represent our input data.",
  "But there are always refinements to make. Let's adjust the spacing in section two.",
  "I'll also add a source attribution footer for academic credibility.",
  "The iteration cycle in Nano Banana is fast — changes render in real-time.",
  "Now let's export the final infographic in multiple formats.",
  "PNG for social media, SVG for web embedding, and PDF for print.",
  "Each format is optimized for its medium — resolution, color space, and sizing.",
  "Congratulations! You've created a professional educational infographic in under 15 minutes.",
  "In the next lesson, we'll cover advanced techniques including animated infographics.",
  "We'll also explore how to create infographic series for comprehensive topic coverage.",
  "See you there!",
]);

const nanoCommentary2: LessonCommentary = {
  markdown: `## Creating Your First Infographic with Nano Banana

This lesson walks through the complete workflow from data preparation to finished visual artifact.

### The Structured Input Format

\`\`\`json
{
  "title": "The Rise of Remote Work 2020-2024",
  "sections": [
    {
      "heading": "Adoption by Industry",
      "type": "bar-chart",
      "data": [...]
    }
  ],
  "style": {
    "palette": "navy-teal",
    "layout": "vertical-scroll"
  }
}
\`\`\`

### Iteration Tips

1. **Start with structure** — get the layout right before polishing visuals
2. **Check data accuracy** — verify numbers against source material
3. **Test readability** — zoom to 50% and see if the main message is still clear
4. **Add sources** — academic credibility requires attribution

### Export Formats

| Format | Best For | Resolution |
|--------|----------|-----------|
| PNG | Social media, presentations | 2x for retina |
| SVG | Web embedding, scaling | Vector/infinite |
| PDF | Print, academic submission | 300 DPI |`,
  timestampRefs: [
    { label: 'Data preparation', timeMs: 16000 },
    { label: 'Structured input format', timeMs: 32000 },
    { label: 'Generation process', timeMs: 60000 },
    { label: 'Refinement and export', timeMs: 88000 },
  ],
  resources: [
    { title: 'Nano Banana Input Template', url: '#', type: 'download', description: 'Starter template for structured infographic input' },
    { title: 'Remote Work Dataset', url: '#', type: 'download', description: 'The dataset used in this lesson' },
  ],
};

const nanoTranscript3 = generateTranscript([
  "Welcome to our final lesson on educational infographics — advanced techniques and series creation.",
  "We've covered the fundamentals and created a basic infographic. Now let's level up.",
  "Advanced technique number one: animated infographics for web and social media.",
  "Animated infographics reveal data progressively, which improves comprehension and engagement.",
  "Instead of showing all data at once, animate sections to appear in sequence.",
  "This mirrors how a teacher would present information — one concept at a time.",
  "Nano Banana supports animation through timing annotations in your structured input.",
  "You define when each element appears, how long transitions take, and the animation style.",
  "The result is a smooth, professional animation that can be exported as GIF or MP4.",
  "Advanced technique number two: interactive infographics for web embedding.",
  "Interactive infographics allow readers to hover for details, filter data, and explore.",
  "This is particularly powerful for complex datasets with multiple dimensions.",
  "Users can focus on the data most relevant to them while seeing the broader picture.",
  "Nano Banana generates interactive infographics as embeddable React components.",
  "You can import them directly into your Next.js application — like Esy does.",
  "Advanced technique number three: infographic series for comprehensive topics.",
  "A series is a collection of infographics that cover a topic from multiple angles.",
  "Each infographic stands alone but together they tell a complete story.",
  "Design consistency across the series is crucial — same colors, fonts, and layout grid.",
  "Nano Banana handles this automatically through its series configuration.",
  "You define the series theme once, and each infographic inherits the shared design.",
  "Now let's discuss distribution strategies for educational infographics.",
  "For academic audiences, embed in research papers and presentations.",
  "For broader audiences, optimize for social media with platform-specific dimensions.",
  "LinkedIn posts with infographics get 3x more engagement than text-only posts.",
  "Twitter/X supports image carousels — perfect for multi-part infographic series.",
  "For educational contexts, provide both the infographic and a text alternative for accessibility.",
  "Screen readers can't interpret images, so include alt text and a data table equivalent.",
  "This ensures your educational content reaches everyone, regardless of ability.",
  "Let's wrap up with a summary of everything we've covered in this course.",
  "We started with design principles grounded in cognitive science.",
  "Then we created infographics using Nano Banana's structured workflow.",
  "And now we've covered advanced animations, interactivity, and series creation.",
  "The key takeaway: great infographics start with clear thinking and good data.",
  "The tool amplifies your ideas — but the ideas must come from rigorous research.",
  "Thank you for completing this course! Go create something beautiful and informative.",
]);

const nanoCommentary3: LessonCommentary = {
  markdown: `## Advanced Infographic Techniques

Level up your infographic game with animations, interactivity, and series design.

### Animation Best Practices

- **Progressive reveal**: Show data points one at a time
- **Timing**: 200-400ms per transition, 1-2s pause between sections
- **Easing**: Use ease-out for entrances, ease-in-out for transitions
- **Duration**: Total animation under 60 seconds for social media

### Interactive Features

Nano Banana supports these interaction types:
1. **Hover tooltips** — Show exact values on data points
2. **Filter controls** — Let users focus on specific categories
3. **Zoom** — Enable detail view for dense visualizations
4. **Toggle** — Switch between different data views

### Series Design System

When creating a multi-part series:
- Lock the color palette across all infographics
- Use consistent typography and spacing
- Number or label each part clearly
- Include visual navigation between parts
- Maintain a consistent aspect ratio

### Accessibility Requirements

Every infographic must include:
- Descriptive alt text (100+ characters)
- A data table equivalent for screen readers
- Sufficient color contrast (4.5:1 minimum)
- Text that doesn't rely on color alone to convey meaning`,
  timestampRefs: [
    { label: 'Animation techniques', timeMs: 8000 },
    { label: 'Interactive infographics', timeMs: 40000 },
    { label: 'Series creation', timeMs: 60000 },
    { label: 'Accessibility requirements', timeMs: 104000 },
  ],
  resources: [
    { title: 'Animation Timing Guide', url: '#', type: 'download', description: 'Reference for infographic animation timing' },
    { title: 'Accessibility Testing Tools', url: '#', type: 'link', description: 'Tools for testing infographic accessibility' },
    { title: 'Infographic Distribution Playbook', url: '#', type: 'download', description: 'Platform-specific optimization guide' },
  ],
};

// ─── Assemble Courses ──────────────────────────────────────
const author = {
  name: 'Zev Uhuru',
  role: 'Agentic Engineer',
  avatar: '/images/zev-uhuru.png',
};

export const courses: Course[] = [
  {
    slug: 'how-to-use-claude-code',
    title: 'How to Use Claude Code for the AI Solopreneur',
    description: 'Master the AI coding assistant that lives in your terminal. Learn setup, advanced patterns, team workflows, and CI/CD integration to ship features 3-5x faster.',
    author,
    chapters: [
      {
        title: 'Getting Started',
        lessons: [
          {
            slug: 'introduction-and-setup',
            title: 'Introduction & Setup',
            description: 'Get Claude Code installed and understand the fundamentals of agentic coding.',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            durationMs: 164000,
            durationLabel: '2:44',
            publishedAt: '2025-12-15',
            author,
            transcript: claudeCodeTranscript1,
            commentary: claudeCodeCommentary1,
            order: 1,
          },
          {
            slug: 'advanced-patterns',
            title: 'Advanced Patterns',
            description: 'Multi-file refactoring, TDD, and architecture scaffolding with Claude Code.',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            durationMs: 128000,
            durationLabel: '2:08',
            publishedAt: '2025-12-18',
            author,
            transcript: claudeCodeTranscript2,
            commentary: claudeCodeCommentary2,
            order: 2,
          },
        ],
      },
      {
        title: 'Team & Production',
        lessons: [
          {
            slug: 'team-workflows-and-cicd',
            title: 'Team Workflows & CI/CD',
            description: 'Scale Claude Code across your engineering team with shared conventions and automated pipelines.',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            durationMs: 140000,
            durationLabel: '2:20',
            publishedAt: '2025-12-22',
            author,
            transcript: claudeCodeTranscript3,
            commentary: claudeCodeCommentary3,
            order: 3,
          },
        ],
      },
    ],
    totalLessons: 3,
    totalDurationLabel: '7:12',
    publishedAt: '2025-12-15',
    tags: ['Claude Code', 'AI Coding', 'Developer Tools', 'Productivity'],
  },
  /* Commenting out courses below — only "How to Use Claude Code" is active
  {
    slug: 'chatgpt-for-research-workflows',
    title: 'ChatGPT for Research Workflows',
    description: 'Transform how you conduct research with ChatGPT. Learn systematic frameworks for planning, literature review, writing, and verification.',
    author,
    chapters: [
      {
        title: 'Foundations',
        lessons: [
          {
            slug: 'introduction-to-ai-research',
            title: 'Introduction to AI-Assisted Research',
            description: 'Establish the foundation for using ChatGPT as a research accelerator while maintaining academic integrity.',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            durationMs: 124000,
            durationLabel: '2:04',
            publishedAt: '2026-01-10',
            author,
            transcript: chatgptTranscript1,
            commentary: chatgptCommentary1,
            order: 1,
          },
          {
            slug: 'prompt-frameworks-for-research',
            title: 'Prompt Frameworks for Research',
            description: 'Three battle-tested prompt frameworks for consistent, high-quality research outputs.',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            durationMs: 124000,
            durationLabel: '2:04',
            publishedAt: '2026-01-15',
            author,
            transcript: chatgptTranscript2,
            commentary: chatgptCommentary2,
            order: 2,
          },
        ],
      },
      {
        title: 'Applied Research',
        lessons: [
          {
            slug: 'complete-research-project',
            title: 'Complete Research Project Walkthrough',
            description: 'Apply all frameworks to a real research project from start to finish.',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            durationMs: 140000,
            durationLabel: '2:20',
            publishedAt: '2026-01-20',
            author,
            transcript: chatgptTranscript3,
            commentary: chatgptCommentary3,
            order: 3,
          },
        ],
      },
    ],
    totalLessons: 3,
    totalDurationLabel: '6:28',
    publishedAt: '2026-01-10',
    tags: ['ChatGPT', 'Research', 'Academic Writing', 'Prompt Engineering'],
  },
  {
    slug: 'educational-infographics-nano-banana',
    title: 'Create Educational Infographics with Nano Banana',
    description: 'Design professional educational infographics using Esy\'s visual artifact engine. Learn design principles, workflows, and advanced techniques.',
    author,
    chapters: [
      {
        title: 'Design Principles',
        lessons: [
          {
            slug: 'infographic-design-fundamentals',
            title: 'Infographic Design Fundamentals',
            description: 'Master the cognitive science and design principles behind effective educational infographics.',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            durationMs: 124000,
            durationLabel: '2:04',
            publishedAt: '2026-02-01',
            author,
            transcript: nanoTranscript1,
            commentary: nanoCommentary1,
            order: 1,
          },
        ],
      },
      {
        title: 'Hands-On Creation',
        lessons: [
          {
            slug: 'creating-your-first-infographic',
            title: 'Creating Your First Infographic',
            description: 'Walk through the complete Nano Banana workflow from data preparation to exported visual artifact.',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            durationMs: 116000,
            durationLabel: '1:56',
            publishedAt: '2026-02-05',
            author,
            transcript: nanoTranscript2,
            commentary: nanoCommentary2,
            order: 2,
          },
          {
            slug: 'advanced-techniques',
            title: 'Advanced Techniques & Series',
            description: 'Level up with animated infographics, interactive features, series design, and accessibility.',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            durationMs: 136000,
            durationLabel: '2:16',
            publishedAt: '2026-02-08',
            author,
            transcript: nanoTranscript3,
            commentary: nanoCommentary3,
            order: 3,
          },
        ],
      },
    ],
    totalLessons: 3,
    totalDurationLabel: '6:16',
    publishedAt: '2026-02-01',
    tags: ['Infographics', 'Visual Design', 'Nano Banana', 'Data Visualization'],
  },
  END of commented-out courses */
];

// ─── Lookup Helpers ────────────────────────────────────────

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getLesson(courseSlug: string, lessonSlug: string): { course: Course; lesson: Lesson; chapter: string } | undefined {
  const course = getCourse(courseSlug);
  if (!course) return undefined;
  for (const ch of course.chapters) {
    const lesson = ch.lessons.find((l) => l.slug === lessonSlug);
    if (lesson) return { course, lesson, chapter: ch.title };
  }
  return undefined;
}

export function getAllLessonsFlat(course: Course): Lesson[] {
  return course.chapters.flatMap((ch) => ch.lessons);
}

export function getAdjacentLessons(course: Course, currentSlug: string): { prev?: Lesson; next?: Lesson } {
  const flat = getAllLessonsFlat(course);
  const idx = flat.findIndex((l) => l.slug === currentSlug);
  return {
    prev: idx > 0 ? flat[idx - 1] : undefined,
    next: idx < flat.length - 1 ? flat[idx + 1] : undefined,
  };
}
