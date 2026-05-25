import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import EssayTypeClient, { EssayTypeData } from '../EssayTypeClient';

export const metadata: Metadata = {
  title: 'Expository Essay Template & Outline | Informative Writing Structure | Esy',
  description: 'Free expository essay template with outline, paragraph structure, and AI prompts. Learn how to write clear, informative essays that explain topics effectively.',
  keywords: [
    'expository essay template',
    'expository essay outline',
    'how to write an expository essay',
    'expository essay structure',
    'informative essay template',
    'explanatory essay outline',
    'expository writing examples',
    'expository essay topics',
  ],
  openGraph: {
    title: 'Expository Essay Template & Outline | Esy',
    description: 'Free expository essay template with informative writing structure and AI prompts.',
    url: 'https://esy.com/workflows/essay/expository',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const expositoryData: EssayTypeData = {
  slug: 'expository',
  title: 'Expository Essay',
  subtitle: 'Explain complex topics clearly with logical organization, factual evidence, and accessible language.',
  description: 'The expository essay is a foundational form of academic writing. It requires you to explain a topic thoroughly and objectively, without arguing for a particular position.',
  icon: <FileText size={20} />,
  accentColor: '#22c55e',
  seoIntro: `
    <p>
      <strong>Expository writing</strong> is about explanation, not persuasion. Your goal is to help 
      readers understand a topic clearly, presenting information in a logical, well-organized manner. 
      This is one of the most commonly assigned essay types in high school and introductory college courses.
    </p>
    <p style="margin-top: 1rem;">
      Unlike argumentative essays that take a stance, expository essays inform and explain. You'll 
      present facts, definitions, examples, and analysis—but the aim is clarity and understanding, 
      not convincing readers of your opinion.
    </p>
  `,
  outline: [
    {
      title: 'I. Introduction',
      wordCount: '75-100 words',
      content: `Hook: Open with an interesting fact, question, or scenario that relates to your topic. Create curiosity.

Context: Provide background information the reader needs to understand the topic.

Thesis Statement: State the main idea of your essay clearly. In expository writing, your thesis previews what you'll explain.

Example thesis formats:
• "[Topic] can be understood through examining [aspect 1], [aspect 2], and [aspect 3]."
• "Understanding [topic] requires knowledge of [key component 1], [key component 2], and [key component 3]."

Your thesis should map the structure of your essay.`,
    },
    {
      title: 'II. Body Paragraph 1 — First Main Point',
      wordCount: '125-175 words',
      content: `Topic Sentence: Introduce the first main aspect or component of your explanation.

Explanation: Define terms, provide context, and explain the concept clearly.

Evidence/Examples: Support your explanation with:
• Facts and statistics
• Concrete examples
• Expert explanations
• Real-world applications

Analysis: Explain WHY this information matters and how it connects to your overall thesis.

Transition: Lead into your next point.

Tip: Use clear, straightforward language. If you must use technical terms, define them.`,
    },
    {
      title: 'III. Body Paragraph 2 — Second Main Point',
      wordCount: '125-175 words',
      content: `Topic Sentence: Introduce your second main point, connecting it to the first.

Explanation: Continue building the reader's understanding systematically.

Evidence/Examples: Provide different types of evidence than paragraph 1 for variety:
• If you used statistics before, try an example here
• If you used an example, try an expert quote

Analysis: Show how this point builds on the previous one and contributes to the whole.

Transition: Connect to your third point.

Remember: You're building understanding step by step.`,
    },
    {
      title: 'IV. Body Paragraph 3 — Third Main Point',
      wordCount: '125-175 words',
      content: `Topic Sentence: Introduce your third and often most complex point.

Explanation: This paragraph often addresses:
• A more nuanced aspect of the topic
• Common misconceptions
• Complications or exceptions
• Real-world implications

Evidence/Examples: Use your strongest or most memorable example here.

Analysis: Tie everything together—show how this point completes the picture.

Transition: Signal that you're moving toward conclusion.

By now, your reader should have a comprehensive understanding of the topic.`,
    },
    {
      title: 'V. Conclusion',
      wordCount: '75-100 words',
      content: `Thesis Restatement: Rephrase your thesis to remind readers of the main idea—don't just copy it.

Summary: Briefly synthesize your main points. Show how they work together to create understanding.

Significance: Explain why this topic matters. What should readers take away?

Closing Thought: End with:
• A thought-provoking question
• A connection to the reader's life
• Future implications
• A call to learn more

Don't introduce new information in the conclusion.`,
    },
  ],
  structuralBreakdown: [
    {
      title: 'Clear Explanation',
      description: 'Expository writing succeeds when readers understand the topic clearly. This requires breaking complex ideas into manageable parts.',
      tips: [
        'Define unfamiliar terms when you first use them',
        'Use concrete examples to illustrate abstract concepts',
        'Move from simple to complex—build understanding gradually',
        'Use analogies to connect new ideas to familiar ones',
      ],
    },
    {
      title: 'Objective Tone',
      description: 'Unlike argumentative essays, expository essays present information without taking a position. Your job is to inform, not persuade.',
      tips: [
        'Avoid first person ("I think...") and opinion language',
        'Present multiple perspectives when relevant',
        'Use evidence to explain, not to prove a point',
        'Let facts speak for themselves',
      ],
    },
    {
      title: 'Logical Organization',
      description: 'Information should flow in a logical sequence that helps readers build understanding step by step.',
      tips: [
        'Organize chronologically, spatially, or by importance',
        'Use clear topic sentences that signal each paragraph\'s purpose',
        'Create smooth transitions between paragraphs',
        'Each paragraph should follow logically from the previous one',
      ],
    },
    {
      title: 'Evidence & Examples',
      description: 'Expository essays rely on factual evidence and concrete examples to support explanations. Variety keeps readers engaged.',
      tips: [
        'Use facts, statistics, and expert information',
        'Include specific examples that illustrate concepts',
        'Cite sources when using researched information',
        'Balance general explanations with specific details',
      ],
    },
  ],
  prompts: [
    {
      id: 'expo-topic',
      title: 'Topic Breakdown & Thesis Developer',
      description: 'Break your topic into explainable components and develop a strong thesis',
      variables: ['TOPIC', 'AUDIENCE', 'ESSAY_LENGTH'],
      prompt: `You are an expert in expository writing and educational content. Help me break down my topic and develop a clear thesis.

**My Topic:**
[TOPIC]

**My Audience:**
[AUDIENCE]
(Who needs to understand this? What do they already know?)

**Target Essay Length:**
[ESSAY_LENGTH]

Please help me:

1. **Topic Analysis**
   - What are the key components of this topic?
   - What does someone need to understand to grasp this fully?
   - What are common misconceptions?
   - What's the most logical order to explain things?

2. **Thesis Development**
   Provide 3 thesis options that:
   - State the topic clearly
   - Preview the main points of explanation
   - Set up a logical essay structure

3. **Essay Structure**
   For the recommended thesis, outline:
   - What each body paragraph should cover
   - Logical order of points
   - How points build on each other

4. **Opening Strategies**
   Suggest 3 hooks that could open this essay:
   - A surprising fact
   - A relatable scenario
   - A thought-provoking question

5. **Key Terms to Define**
   - Terms the audience might not know
   - Concepts that need explanation
   - Where definitions should appear`,
      expectedOutput: 'Topic breakdown with thesis options, essay structure, and opening strategies.',
    },
    {
      id: 'expo-paragraph',
      title: 'Expository Paragraph Builder',
      description: 'Develop a clear, informative body paragraph that explains your point effectively',
      variables: ['THESIS', 'PARAGRAPH_TOPIC', 'FACTS_OR_EXAMPLES'],
      prompt: `You are an expert expository writer. Help me develop a clear, informative body paragraph.

**My Thesis:**
[THESIS]

**This Paragraph Should Explain:**
[PARAGRAPH_TOPIC]

**Facts, Examples, or Information I Have:**
[FACTS_OR_EXAMPLES]

Please write a complete body paragraph (150-200 words) that:

1. **Starts with a Clear Topic Sentence**
   - States what this paragraph will explain
   - Connects to the thesis
   - Signals the paragraph's purpose

2. **Provides Clear Explanation**
   - Breaks down the concept logically
   - Uses accessible language
   - Defines any technical terms
   - Builds understanding step by step

3. **Includes Strong Evidence/Examples**
   - Uses the information I provided effectively
   - Adds concrete examples to illustrate points
   - Cites sources if needed

4. **Analyzes the Information**
   - Explains WHY this information matters
   - Shows HOW it connects to the thesis
   - Helps readers understand significance

5. **Transitions Smoothly**
   - Ends with a bridge to the next paragraph

Also provide:
- Notes on what makes this explanation effective
- Alternative examples or evidence to consider
- Tips for making it even clearer`,
      expectedOutput: 'A complete expository paragraph with clear explanation, evidence, and analysis.',
    },
    {
      id: 'expo-clarity',
      title: 'Clarity & Readability Enhancer',
      description: 'Revise your expository writing for maximum clarity and understanding',
      variables: ['DRAFT_TEXT', 'TARGET_AUDIENCE'],
      prompt: `You are an expert editor specializing in clear, accessible expository writing. Help me revise my draft for maximum clarity.

**My Draft:**
[DRAFT_TEXT]

**My Target Audience:**
[TARGET_AUDIENCE]

Please provide:

1. **Clarity Assessment**
   - What's explained well?
   - What's confusing or unclear?
   - What assumptions might not land with the audience?
   - Where do I need more/less explanation?

2. **Jargon & Complexity Check**
   - Technical terms that need definition
   - Sentences that are too complex
   - Areas where language could be simpler
   - Concepts that need examples

3. **Structure Analysis**
   - Is information in logical order?
   - Do paragraphs flow naturally?
   - Are transitions smooth?
   - Does each paragraph have a clear purpose?

4. **Evidence Review**
   - Are claims supported with facts/examples?
   - Is there good variety in evidence types?
   - Where is more support needed?

5. **Revised Version**
   - Rewrite the text for maximum clarity
   - Simplify complex sentences
   - Add explanations where needed
   - Improve transitions

6. **Readability Tips**
   - Sentence length variety
   - Paragraph length balance
   - Use of examples and analogies`,
      expectedOutput: 'Clarity assessment with a revised version optimized for reader understanding.',
    },
  ],
};

export default function ExpositoryEssayPage() {
  return <EssayTypeClient data={expositoryData} />;
}

