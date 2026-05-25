import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import EssayTypeClient, { EssayTypeData } from '../EssayTypeClient';

export const metadata: Metadata = {
  title: 'Research Essay Template & Outline | Academic Research Paper Structure | Esy',
  description: 'Free research essay template with academic paper outline, methodology structure, and AI prompts for literature reviews, source integration, and thesis development.',
  keywords: [
    'research essay template',
    'research paper outline',
    'academic research paper structure',
    'how to write a research paper',
    'research essay structure',
    'literature review template',
    'source integration',
    'research methodology',
  ],
  openGraph: {
    title: 'Research Essay Template & Outline | Esy',
    description: 'Free research essay template with academic paper structure and AI prompts.',
    url: 'https://esy.com/workflows/essay/research',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const researchData: EssayTypeData = {
  slug: 'research',
  title: 'Research Essay',
  subtitle: 'Structure comprehensive research papers with proper methodology, source integration, and academic rigor.',
  description: 'Research essays require you to investigate a topic deeply, synthesize multiple sources, and present original analysis supported by evidence from scholarly literature.',
  icon: <BookOpen size={20} />,
  accentColor: '#06b6d4',
  seoIntro: `
    <p>
      A <strong>research essay</strong> demonstrates your ability to investigate a topic, evaluate sources 
      critically, and synthesize information into a coherent argument. Unlike simpler essays, research papers 
      require engagement with scholarly sources and often contribute new analysis or perspectives to academic 
      conversations.
    </p>
    <p style="margin-top: 1rem;">
      This template provides the standard structure for academic research papers across most disciplines. 
      Whether you're writing a literature review, empirical study, or analytical research paper, this 
      outline and these prompts will help you organize your research and present it effectively.
    </p>
  `,
  outline: [
    {
      title: 'I. Introduction',
      wordCount: '150-250 words',
      content: `Hook: Open with a compelling fact, question, or observation that establishes the significance of your topic.

Context: Provide background information that situates your research within the broader field or conversation.

Research Gap or Problem: Identify what's missing in current understanding or what problem needs addressing.

Thesis Statement: Present your central argument or the main finding your research will demonstrate.

Roadmap (optional): Briefly preview the structure of your paper.

Tip: Your introduction should move from broad context to your specific contribution—like a funnel.`,
    },
    {
      title: 'II. Literature Review / Background',
      wordCount: '300-500 words',
      content: `Purpose: Demonstrate your knowledge of existing scholarship and position your work within it.

Organization Options:
• Chronological: Trace how understanding has evolved
• Thematic: Group sources by subtopic or approach
• Methodological: Compare different research methods used

For Each Source/Group:
• Summarize key findings or arguments
• Analyze strengths and limitations
• Show how it connects to your research question

Synthesis: Don't just summarize sources individually—show how they relate to each other and where gaps exist.

End by clearly identifying the gap your research fills.`,
    },
    {
      title: 'III. Methodology (if applicable)',
      wordCount: '100-200 words',
      content: `For empirical research, explain:
• Research design (qualitative, quantitative, mixed)
• Data sources and collection methods
• Analysis approach
• Limitations and how you addressed them

For analytical/argumentative research:
• Your analytical framework or approach
• Why this approach is appropriate
• Key terms or concepts you're working with

This section should be detailed enough that another researcher could replicate your approach.`,
    },
    {
      title: 'IV. Analysis / Findings',
      wordCount: '500-800 words',
      content: `This is the core of your paper where you present your research findings or analysis.

Structure by:
• Major themes or findings (use subheadings)
• Chronological development
• Order of importance
• Compare/contrast framework

For Each Section:
• Present evidence (data, quotes, examples)
• Analyze what the evidence shows
• Connect findings to your thesis
• Acknowledge complexity or contradictions

Use topic sentences that advance your argument, not just introduce topics.

Integrate sources using ICE: Introduce the source, Cite it, Explain its significance.`,
    },
    {
      title: 'V. Discussion',
      wordCount: '200-300 words',
      content: `Interpret your findings:
• What do your results mean?
• How do they relate to existing literature?
• Were there surprises or unexpected findings?
• What are the implications?

Address limitations:
• What couldn't your research address?
• What factors might affect interpretation?
• How might these be addressed in future research?

Note: In some papers, Discussion and Conclusion are combined. In others, they're separate sections.`,
    },
    {
      title: 'VI. Conclusion',
      wordCount: '150-200 words',
      content: `Restate your thesis: Remind readers of your central argument (rephrased, not copied).

Summarize key findings: Highlight the most important points without repeating all details.

Significance: Explain why your research matters—what does it contribute?

Future directions: Suggest what research should come next.

Final thought: End with a memorable statement about the broader implications.

Don't: Introduce new information or make claims beyond what your research supports.`,
    },
  ],
  structuralBreakdown: [
    {
      title: 'Research Question Development',
      description: 'A strong research paper starts with a focused, answerable question. Your question should be specific enough to investigate thoroughly but significant enough to matter.',
      tips: [
        'Start broad, then narrow: Topic → Issue → Question → Thesis',
        'Your question should be debatable, not factual',
        'Consider: What gap does this fill? Why does this matter?',
        'Test your question: Can you find enough sources? Too many?',
      ],
    },
    {
      title: 'Source Integration',
      description: 'Research writing is a conversation with sources. You need to synthesize, not just summarize—show how sources relate to each other and to your argument.',
      tips: [
        'Use sources to support your argument, not replace it',
        'Paraphrase more than you quote; quote only distinctive language',
        'Always analyze sources—don\'t just drop quotes and move on',
        'Show disagreements between sources, don\'t ignore them',
      ],
    },
    {
      title: 'Critical Analysis',
      description: 'Research essays require you to evaluate evidence, not just present it. Your analysis is what makes the paper original.',
      tips: [
        'Ask "So what?" after every piece of evidence',
        'Consider alternative interpretations',
        'Look for patterns across sources',
        'Your voice should guide the reader through the sources',
      ],
    },
    {
      title: 'Academic Voice',
      description: 'Research writing has conventions that signal credibility. Master these without becoming stiff or jargon-heavy.',
      tips: [
        'Use hedging language appropriately: "suggests," "indicates," "may"',
        'Cite sources for claims that aren\'t common knowledge',
        'Avoid first person in formal papers (unless your discipline allows it)',
        'Be precise with terminology; define key terms',
      ],
    },
  ],
  prompts: [
    {
      id: 'research-question',
      title: 'Research Question Developer',
      description: 'Refine your topic into a focused, researchable question with thesis potential',
      variables: ['BROAD_TOPIC', 'WHAT_INTERESTS_YOU', 'SOURCES_FOUND'],
      prompt: `You are a research methodology expert who helps students develop focused research questions. Guide me from a broad topic to a specific, researchable question.

**My Broad Topic:**
[BROAD_TOPIC]

**What Specifically Interests Me:**
[WHAT_INTERESTS_YOU]

**Sources I've Found So Far (if any):**
[SOURCES_FOUND]

Please help me:

1. **Topic Narrowing**
   - Show 3 progressively narrower versions of my topic
   - Explain the rationale for each narrowing
   - Assess which scope is appropriate for my paper length

2. **Research Question Options**
   Generate 5 potential research questions, including:
   - A descriptive question (what/how)
   - An analytical question (why/how)
   - A comparative question
   - An evaluative question
   - A causal question

3. **Question Quality Assessment**
   For the top 2 questions:
   - Is it specific enough to answer well?
   - Is it significant enough to matter?
   - Is it feasible with available sources?
   - What type of evidence would answer it?

4. **Thesis Potential**
   For your recommended question:
   - What might a possible thesis look like?
   - What are the main areas of investigation?
   - What sources/evidence would you need?

5. **Next Steps**
   - Suggested search terms
   - Types of sources to look for
   - Key scholars or works in this area`,
      expectedOutput: 'A refined research question with thesis potential, assessment of feasibility, and research direction.',
    },
    {
      id: 'research-synthesis',
      title: 'Source Synthesis Assistant',
      description: 'Synthesize multiple sources into a coherent literature review or background section',
      variables: ['RESEARCH_QUESTION', 'SOURCE_SUMMARIES', 'SYNTHESIS_GOAL'],
      prompt: `You are an expert in academic writing and research synthesis. Help me synthesize my sources into coherent analysis.

**My Research Question:**
[RESEARCH_QUESTION]

**My Sources (with brief summaries):**
[SOURCE_SUMMARIES]

**What This Section Should Accomplish:**
[SYNTHESIS_GOAL]

Please help me:

1. **Thematic Organization**
   - Identify 3-5 themes across my sources
   - Group sources by theme
   - Suggest a logical order for presenting themes

2. **Synthesis Matrix**
   Create a comparison showing:
   - Where sources agree
   - Where they disagree or differ
   - Different methodological approaches
   - Gaps in the literature

3. **Draft Synthesis Paragraphs**
   Write 2-3 paragraphs that:
   - Present sources in conversation with each other (not one-by-one summaries)
   - Use synthesis phrases: "While X argues... Y contends..."
   - Show how sources build on, contradict, or extend each other
   - Connect to my research question

4. **Gap Identification**
   - What questions remain unanswered?
   - What perspectives are missing?
   - How does my research address these gaps?

5. **Integration Tips**
   - Signal phrases to use
   - How to balance paraphrase and quotes
   - Transitions between sources`,
      expectedOutput: 'Thematic organization with draft synthesis paragraphs showing sources in conversation.',
    },
    {
      id: 'research-analysis',
      title: 'Research Analysis Developer',
      description: 'Develop your findings into strong analytical paragraphs',
      variables: ['THESIS', 'KEY_FINDING', 'SUPPORTING_EVIDENCE'],
      prompt: `You are an expert academic writing coach. Help me develop my research findings into compelling analytical writing.

**My Thesis:**
[THESIS]

**The Finding I'm Developing:**
[KEY_FINDING]

**Evidence I Have:**
[SUPPORTING_EVIDENCE]

Please help me write analysis (300-400 words) that:

1. **Strong Topic Sentence**
   - States the finding/argument clearly
   - Connects to the thesis
   - Sets up what the paragraph will prove

2. **Evidence Integration**
   - Present evidence using proper citation
   - Use ICE method: Introduce, Cite, Explain
   - Show how evidence supports the finding

3. **Deep Analysis**
   - Explain WHY this evidence matters
   - Connect to broader patterns or theories
   - Address potential counterarguments
   - Show original thinking, not just summary

4. **Scholarly Voice**
   - Appropriate hedging language
   - Discipline-appropriate terminology
   - Objective but authoritative tone

5. **Transition to Next Point**
   - Connect to the next paragraph or section

Also provide:
- Notes on how to strengthen the analysis
- Alternative ways to frame this finding
- What additional evidence might strengthen this section`,
      expectedOutput: 'Developed analytical paragraphs with proper evidence integration and scholarly voice.',
    },
  ],
};

export default function ResearchEssayPage() {
  return <EssayTypeClient data={researchData} />;
}

