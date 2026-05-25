import { Metadata } from 'next';
import { PenTool } from 'lucide-react';
import EssayTypeClient, { EssayTypeData } from '../EssayTypeClient';

export const metadata: Metadata = {
  title: 'Argumentative Essay Template & Outline | Free Download + AI Prompts | Esy',
  description: 'Free argumentative essay template with downloadable outline, structural breakdown, and AI writing prompts. Learn how to write compelling arguments with thesis, evidence, and counterarguments.',
  keywords: [
    'argumentative essay template',
    'argumentative essay outline',
    'how to write an argumentative essay',
    'argumentative essay structure',
    'thesis statement generator',
    'argumentative essay examples',
    'persuasive essay template',
    'debate essay outline',
  ],
  openGraph: {
    title: 'Argumentative Essay Template & Outline | Esy',
    description: 'Free argumentative essay template with outline, structure guide, and AI prompts.',
    url: 'https://esy.com/workflows/essay/argumentative',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const argumentativeData: EssayTypeData = {
  slug: 'argumentative',
  title: 'Argumentative Essay',
  subtitle: 'Build compelling arguments with clear thesis statements, supporting evidence, and effective counterargument analysis.',
  description: 'The argumentative essay is the most commonly assigned essay type in academic settings. It requires you to take a clear stance on an issue and defend it with evidence and logical reasoning.',
  icon: <PenTool size={20} />,
  accentColor: '#8b5cf6',
  seoIntro: `
    <p>
      <strong>Argumentative essays</strong> are the backbone of academic writing. They require you to 
      investigate a topic, collect and evaluate evidence, and establish a position on the topic in a 
      concise manner. Unlike expository essays which simply inform, argumentative essays demand that 
      you take a clear stance and defend it.
    </p>
    <p style="margin-top: 1rem;">
      This template provides everything you need: a <strong>ready-to-use outline</strong> you can copy 
      directly into your document, a <strong>structural breakdown</strong> explaining what makes each 
      section effective, and <strong>AI prompts</strong> optimized for thesis development, body paragraph 
      expansion, and revision.
    </p>
  `,
  outline: [
    {
      title: 'I. Introduction',
      wordCount: '100-150 words',
      content: `Hook: Start with a compelling statistic, question, or provocative statement that relates to your topic.

Background Context: Provide 2-3 sentences of background information that helps readers understand the significance of the issue.

Thesis Statement: End with a clear, arguable thesis that states your position and previews your main arguments.

Example structure: "While [opposing view seems reasonable], [your position] because [reason 1], [reason 2], and [reason 3]."`,
    },
    {
      title: 'II. Body Paragraph 1 — Strongest Argument',
      wordCount: '150-200 words',
      content: `Topic Sentence: State your first and strongest supporting argument.

Evidence: Present your most compelling evidence (statistics, expert quotes, research findings).

Analysis: Explain HOW this evidence supports your thesis. Don't just present facts—interpret them.

Transition: Connect to your next point.

Tip: Lead with your strongest argument to establish credibility early.`,
    },
    {
      title: 'III. Body Paragraph 2 — Supporting Argument',
      wordCount: '150-200 words',
      content: `Topic Sentence: Introduce your second supporting argument.

Evidence: Provide different type of evidence from paragraph 1 (if you used statistics, try expert testimony here).

Analysis: Demonstrate the logical connection between evidence and thesis.

Transition: Bridge to your third argument or counterargument section.`,
    },
    {
      title: 'IV. Body Paragraph 3 — Additional Support or Counterargument',
      wordCount: '150-200 words',
      content: `Option A — Third Supporting Argument:
Topic sentence, evidence, and analysis following the same pattern.

Option B — Counterargument + Rebuttal:
Acknowledge the strongest opposing viewpoint fairly.
Present evidence or reasoning that refutes this position.
Explain why your position remains stronger.

Tip: Addressing counterarguments strengthens your essay by showing intellectual honesty.`,
    },
    {
      title: 'V. Conclusion',
      wordCount: '100-150 words',
      content: `Thesis Restatement: Rephrase your thesis in light of the arguments you've made (don't just copy it).

Summary: Briefly synthesize your main points—don't introduce new information.

Broader Implications: Connect your argument to larger themes or call readers to action.

Closing Statement: End with a memorable final thought that reinforces your position.`,
    },
  ],
  structuralBreakdown: [
    {
      title: 'The Thesis Statement',
      description: 'Your thesis is the backbone of your essay. It must be specific, arguable, and defensible with evidence.',
      tips: [
        'Avoid stating obvious facts—your thesis should be debatable',
        'Include your position AND a preview of your reasoning',
        'Keep it to one clear sentence when possible',
        'Place it at the end of your introduction',
      ],
    },
    {
      title: 'Evidence Integration',
      description: 'Strong arguments require strong evidence. Each piece of evidence should be introduced, presented, and analyzed.',
      tips: [
        'Use the ICE method: Introduce, Cite, Explain',
        'Vary your evidence types (statistics, examples, expert quotes)',
        'Always explain WHY evidence matters—don\'t let it speak for itself',
        'Cite sources properly according to your required format',
      ],
    },
    {
      title: 'Counterargument Strategy',
      description: 'Addressing opposing views demonstrates critical thinking and strengthens your position by showing you\'ve considered alternatives.',
      tips: [
        'Present the counterargument fairly—don\'t create a "straw man"',
        'Use phrases like "Critics argue..." or "Some may contend..."',
        'Provide a strong rebuttal with evidence',
        'Show why your position is ultimately more compelling',
      ],
    },
    {
      title: 'Transitions & Flow',
      description: 'Smooth transitions guide readers through your argument and show logical connections between ideas.',
      tips: [
        'Use transitional phrases: "Furthermore," "However," "In contrast"',
        'Echo key terms from previous paragraphs',
        'Each paragraph should logically follow the previous one',
        'The first sentence of each paragraph should connect to the last',
      ],
    },
  ],
  prompts: [
    {
      id: 'arg-thesis',
      title: 'Thesis Statement Generator',
      description: 'Generate a strong, arguable thesis statement for your argumentative essay',
      variables: ['TOPIC', 'YOUR_POSITION', 'MAIN_REASONS'],
      prompt: `You are an expert academic writing coach specializing in thesis development. Help me create a compelling thesis statement for my argumentative essay.

**Topic:** [TOPIC]

**My Position:** [YOUR_POSITION]

**My Main Reasons (rough ideas):** [MAIN_REASONS]

Please provide:

1. **3 Thesis Statement Options**
   - A direct thesis that clearly states my position
   - A thesis that acknowledges the counterargument ("Although X, Y because Z")
   - A thesis that previews my essay structure

2. **For Each Thesis:**
   - Explain what makes it effective
   - Identify the implied body paragraph topics
   - Note any potential weaknesses

3. **Recommended Thesis**
   - Which option is strongest and why
   - A final polished version ready to use

Make sure each thesis is:
- Specific (not vague or overly broad)
- Arguable (not a statement of fact)
- Defensible with evidence
- Appropriately scoped for a standard essay`,
      expectedOutput: 'Three thesis statement options with analysis and a final recommended thesis ready to use in your essay.',
    },
    {
      id: 'arg-body',
      title: 'Body Paragraph Developer',
      description: 'Expand your argument into a well-structured body paragraph with evidence and analysis',
      variables: ['THESIS', 'ARGUMENT_POINT', 'AVAILABLE_EVIDENCE'],
      prompt: `You are an expert academic writing assistant. Help me develop a strong body paragraph for my argumentative essay.

**My Thesis:** [THESIS]

**This Paragraph's Argument:** [ARGUMENT_POINT]

**Evidence I Have (or topics to research):** [AVAILABLE_EVIDENCE]

Please write a complete body paragraph (150-200 words) that includes:

1. **Topic Sentence**
   - Clearly states this paragraph's main argument
   - Connects logically to the thesis

2. **Evidence Integration**
   - Use the ICE method (Introduce, Cite, Explain)
   - If I provided evidence, integrate it effectively
   - If not, suggest specific types of evidence I should find

3. **Analysis**
   - Explain HOW the evidence supports my argument
   - Connect back to the thesis
   - Show the significance of this point

4. **Transition**
   - End with a sentence that leads to the next paragraph

Also provide:
- Notes on what makes this paragraph effective
- Suggestions for strengthening the evidence if needed`,
      expectedOutput: 'A complete, well-structured body paragraph with topic sentence, evidence, analysis, and transition, plus revision notes.',
    },
    {
      id: 'arg-revision',
      title: 'Argument Strength Analyzer',
      description: 'Analyze and strengthen your argumentative essay draft',
      variables: ['ESSAY_DRAFT', 'SPECIFIC_CONCERNS'],
      prompt: `You are an expert academic editor specializing in argumentative writing. Analyze my essay draft and help me strengthen my argument.

**My Essay Draft:**
[ESSAY_DRAFT]

**My Specific Concerns (optional):**
[SPECIFIC_CONCERNS]

Please provide:

1. **Argument Analysis**
   - Is my thesis clear and arguable?
   - Are my arguments logically structured?
   - Is there a clear progression from point to point?

2. **Evidence Assessment**
   - Is each claim supported with evidence?
   - Is the evidence properly integrated and analyzed?
   - Where do I need stronger support?

3. **Counterargument Check**
   - Have I addressed the strongest opposing views?
   - Are my rebuttals effective?
   - Any objections I've missed?

4. **Specific Improvements**
   - 3-5 concrete revisions with before/after examples
   - Prioritized by impact on argument strength

5. **Revised Key Sections**
   - Rewritten thesis (if needed)
   - Strengthened topic sentences
   - Improved transitions

Focus on making the argument more persuasive and logically sound.`,
      expectedOutput: 'Comprehensive analysis of argument strength with specific revision suggestions and rewritten sections.',
    },
  ],
};

export default function ArgumentativeEssayPage() {
  return <EssayTypeClient data={argumentativeData} />;
}

