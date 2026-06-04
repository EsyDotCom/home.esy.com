// Templates Marketplace Static Data
// This will be replaced with database queries in Phase 2

import { Template, TemplateCategoryInfo, TemplateSubcategory } from './types';

// Category definitions with subcategories
export const templateCategories: TemplateCategoryInfo[] = [
  {
    id: 'prompt',
    name: 'Prompts',
    slug: 'prompts',
    description: 'Ready-to-use AI prompts for academic writing, research, and creative projects',
    count: 35,
    subcategories: [
      {
        id: 'essay-writing',
        slug: 'essay-writing',
        name: 'Essay Writing',
        description: 'Prompts for structuring and writing academic essays',
        count: 3,
      },
      {
        id: 'research',
        slug: 'research',
        name: 'Research & Analysis',
        description: 'Prompts for conducting research and analysis',
        count: 3,
      },
      {
        id: 'creative-writing',
        slug: 'creative-writing',
        name: 'Creative Writing',
        description: 'Prompts for fiction, storytelling, and creative projects',
        count: 2,
      },
      {
        id: 'professional',
        slug: 'professional',
        name: 'Professional Writing',
        description: 'Prompts for business and professional communication',
        count: 2,
      },
      {
        id: 'chatgpt',
        slug: 'chatgpt',
        name: 'ChatGPT Prompts',
        description: 'Optimized prompts for OpenAI ChatGPT models',
        count: 6,
      },
      {
        id: 'claude',
        slug: 'claude',
        name: 'Claude Prompts',
        description: 'Optimized prompts for Anthropic Claude models',
        count: 6,
      },
      {
        id: 'gemini',
        slug: 'gemini',
        name: 'Gemini Prompts',
        description: 'Optimized prompts for Google Gemini models',
        count: 6,
      },
      {
        id: 'seo',
        slug: 'seo',
        name: 'SEO Writing',
        description: 'Prompts for search engine optimized content',
        count: 6,
      },
    ],
  },
  {
    id: 'template',
    name: 'Templates',
    slug: 'templates',
    description: 'Structured writing templates and frameworks',
    count: 9,
    isComingSoon: false,
    subcategories: [
      {
        id: 'essay-argumentative',
        slug: 'essay-argumentative',
        name: 'Argumentative Essay',
        description: 'Templates for argumentative essays with thesis, evidence, and counterarguments',
        count: 1,
      },
      {
        id: 'essay-analytical',
        slug: 'essay-analytical',
        name: 'Analytical Essay',
        description: 'Templates for analytical, literary analysis, and critical review essays',
        count: 1,
      },
      {
        id: 'essay-expository',
        slug: 'essay-expository',
        name: 'Expository Essay',
        description: 'Informative and explanatory essay templates',
        count: 1,
      },
      {
        id: 'essay-narrative',
        slug: 'essay-narrative',
        name: 'Narrative Essay',
        description: 'Templates for narrative, descriptive, and reflective essays',
        count: 1,
      },
      {
        id: 'essay-research',
        slug: 'essay-research',
        name: 'Research Essay',
        description: 'Academic research paper templates and outlines',
        count: 2,
      },
      {
        id: 'essay-college-application',
        slug: 'essay-college-application',
        name: 'College Application Essay',
        description: 'Personal statement and college essay templates',
        count: 1,
      },
      {
        id: 'essay-mla-format',
        slug: 'essay-mla-format',
        name: 'MLA Format Essay',
        description: 'MLA citation and formatting templates',
        count: 1,
      },
      {
        id: 'clip-art',
        slug: 'clip-art',
        name: 'Clip Art',
        description: 'Workflow templates for generating isolated visual assets',
        count: 1,
      },
    ],
  },
  {
    id: 'bundle',
    name: 'Bundles',
    slug: 'bundles',
    description: 'Curated collections of prompts and templates',
    count: 0,
    isComingSoon: true,
    subcategories: [],
  },
];

// Static templates/prompts data
export const templates: Template[] = [
  // Essay Writing Prompts
  {
    id: '1',
    slug: 'argumentative-essay-builder',
    title: 'Argumentative Essay Builder',
    shortDescription: 'Craft compelling argumentative essays with clear thesis statements and supporting evidence.',
    description: 'This comprehensive prompt helps you structure and write persuasive argumentative essays. It guides you through developing a clear thesis, organizing supporting arguments, addressing counterarguments, and creating a compelling conclusion.',
    category: 'prompt',
    subcategory: 'essay-writing',
    tags: ['essay', 'argumentative', 'thesis', 'academic'],
    difficulty: 'intermediate',
    isNew: true,
    isFeatured: true,
    variables: ['TOPIC', 'THESIS_STATEMENT', 'TARGET_AUDIENCE', 'WORD_COUNT'],
    content: `You are an expert academic writing assistant. Help me write a compelling argumentative essay on the following topic:

**Topic:** [TOPIC]

**My Thesis Statement:** [THESIS_STATEMENT]

**Target Audience:** [TARGET_AUDIENCE]

**Desired Length:** [WORD_COUNT] words

Please help me structure this essay with:

1. **Introduction**
   - Hook to grab reader attention
   - Background context on the topic
   - Clear thesis statement positioned at the end

2. **Body Paragraphs** (3-4 paragraphs)
   - Topic sentence for each paragraph
   - Supporting evidence with citations
   - Analysis connecting evidence to thesis
   - Smooth transitions between paragraphs

3. **Counterargument Section**
   - Acknowledge opposing viewpoints fairly
   - Refute with logical reasoning and evidence
   - Strengthen original position

4. **Conclusion**
   - Restate thesis in new words
   - Summarize key arguments
   - End with call to action or thought-provoking statement

Please provide specific, well-researched content rather than placeholder text.`,
    expectedOutput: 'A structured argumentative essay outline with detailed content for each section, including specific examples and evidence.',
    useCases: [
      'Academic essays for courses',
      'Opinion pieces and editorials',
      'Debate preparation',
      'Policy position papers',
    ],
    relatedSlugs: ['thesis-statement-generator', 'essay-outline-creator'],
  },
  {
    id: '2',
    slug: 'thesis-statement-generator',
    title: 'Thesis Statement Generator',
    shortDescription: 'Generate strong, arguable thesis statements for any essay type.',
    description: 'This prompt helps you craft clear, specific, and arguable thesis statements. It provides multiple options based on your topic and guides you in selecting the strongest approach for your essay.',
    category: 'prompt',
    subcategory: 'essay-writing',
    tags: ['thesis', 'essay', 'academic', 'writing'],
    difficulty: 'beginner',
    isFeatured: true,
    variables: ['TOPIC', 'ESSAY_TYPE', 'STANCE'],
    content: `You are an expert academic writing coach specializing in thesis development. Help me create a strong thesis statement.

**Topic:** [TOPIC]

**Essay Type:** [ESSAY_TYPE] (argumentative, expository, analytical, compare/contrast)

**My Initial Stance/Angle:** [STANCE]

Please provide:

1. **3 Different Thesis Statement Options**
   - Each should be specific, arguable, and appropriately scoped
   - Vary the approach (cause/effect, comparison, evaluation, etc.)

2. **For Each Thesis:**
   - Explain why it works
   - Identify potential body paragraph topics
   - Note any weaknesses to address

3. **Thesis Refinement Tips**
   - How to make each thesis more specific
   - Common pitfalls to avoid
   - Questions to test thesis strength

4. **Recommended Thesis**
   - Which option is strongest and why
   - Final polished version`,
    expectedOutput: 'Three thesis statement options with analysis, recommendations, and a final polished thesis.',
    useCases: [
      'Starting any academic essay',
      'Refining unclear thesis statements',
      'Brainstorming essay directions',
      'Academic writing workshops',
    ],
    relatedSlugs: ['argumentative-essay-builder', 'essay-outline-creator'],
  },
  {
    id: '3',
    slug: 'essay-outline-creator',
    title: 'Essay Outline Creator',
    shortDescription: 'Create detailed essay outlines with logical structure and flow.',
    description: 'Generate comprehensive essay outlines that organize your ideas logically. This prompt creates hierarchical outlines with main points, subpoints, and transitions.',
    category: 'prompt',
    subcategory: 'essay-writing',
    tags: ['outline', 'structure', 'organization', 'essay'],
    difficulty: 'beginner',
    variables: ['THESIS', 'MAIN_POINTS', 'ESSAY_LENGTH'],
    content: `You are an expert essay structure consultant. Help me create a detailed outline for my essay.

**Thesis Statement:** [THESIS]

**Main Points/Arguments:** [MAIN_POINTS]

**Target Length:** [ESSAY_LENGTH]

Please create:

1. **Hierarchical Outline**
   - Roman numerals for main sections
   - Capital letters for main points
   - Numbers for supporting details
   - Lowercase letters for examples/evidence

2. **For Each Section:**
   - Clear topic sentence
   - 2-3 supporting points
   - Suggested evidence or examples
   - Transition phrases to next section

3. **Introduction Blueprint**
   - Hook options (3 choices)
   - Context/background points
   - Thesis placement

4. **Conclusion Framework**
   - Thesis restatement approach
   - Summary strategy
   - Closing impact options

5. **Paragraph-Level Guidance**
   - Estimated word count per section
   - Key vocabulary to incorporate
   - Potential challenges and solutions`,
    expectedOutput: 'A detailed hierarchical outline with all sections mapped, transitions planned, and writing guidance included.',
    useCases: [
      'Planning any essay type',
      'Organizing complex arguments',
      'Preparing for timed writing',
      'Research paper structure',
    ],
    relatedSlugs: ['argumentative-essay-builder', 'thesis-statement-generator'],
  },

  // Research & Analysis Prompts
  {
    id: '4',
    slug: 'literature-review-assistant',
    title: 'Literature Review Assistant',
    shortDescription: 'Synthesize sources and structure comprehensive literature reviews.',
    description: 'This prompt guides you through organizing, analyzing, and synthesizing multiple sources into a coherent literature review. It helps identify themes, gaps, and connections across your research.',
    category: 'prompt',
    subcategory: 'research',
    tags: ['research', 'literature review', 'synthesis', 'academic'],
    difficulty: 'advanced',
    isPro: true,
    isFeatured: true,
    variables: ['RESEARCH_TOPIC', 'SOURCE_LIST', 'REVIEW_PURPOSE'],
    content: `You are a research methodology expert specializing in literature reviews. Help me synthesize my sources.

**Research Topic:** [RESEARCH_TOPIC]

**Sources to Review:** [SOURCE_LIST]

**Purpose of Review:** [REVIEW_PURPOSE]

Please help me:

1. **Thematic Organization**
   - Identify 3-5 major themes across sources
   - Group sources by theme
   - Note methodological approaches

2. **Source Analysis Matrix**
   - Key arguments from each source
   - Methodologies used
   - Main findings
   - Strengths and limitations

3. **Synthesis Strategies**
   - Points of agreement across sources
   - Contradictions or debates
   - Evolution of thinking over time
   - Gaps in current research

4. **Literature Review Structure**
   - Introduction approach
   - Thematic sections outline
   - Critical analysis integration
   - Conclusion and gap identification

5. **Writing Guidance**
   - Transition phrases for synthesis
   - Citation integration strategies
   - Maintaining your analytical voice`,
    expectedOutput: 'A thematic organization with source matrix, synthesis analysis, and structured outline for writing the literature review.',
    useCases: [
      'Thesis and dissertation chapters',
      'Research paper introductions',
      'Grant proposal backgrounds',
      'Systematic reviews',
    ],
    relatedSlugs: ['research-question-refiner', 'source-evaluation-framework'],
  },
  {
    id: '5',
    slug: 'research-question-refiner',
    title: 'Research Question Refiner',
    shortDescription: 'Transform broad topics into focused, researchable questions.',
    description: 'This prompt helps you narrow down broad research interests into specific, answerable research questions. It guides you through the process of scoping, refining, and validating your research questions.',
    category: 'prompt',
    subcategory: 'research',
    tags: ['research', 'questions', 'methodology', 'academic'],
    difficulty: 'intermediate',
    variables: ['BROAD_TOPIC', 'DISCIPLINE', 'CONSTRAINTS'],
    content: `You are a research design specialist. Help me develop a focused research question.

**Broad Topic Area:** [BROAD_TOPIC]

**Discipline/Field:** [DISCIPLINE]

**Constraints:** [CONSTRAINTS] (time, resources, access, etc.)

Please provide:

1. **Topic Narrowing Process**
   - 3 progressively narrower versions of the topic
   - Rationale for each narrowing decision
   - Scope assessment

2. **Research Question Options**
   - 5 potential research questions
   - Question types (descriptive, comparative, causal, etc.)
   - Feasibility assessment for each

3. **Question Quality Check**
   For the top 2 questions:
   - Is it specific enough?
   - Is it researchable with available methods?
   - Is it significant to the field?
   - Is it achievable within constraints?

4. **Recommended Question**
   - Final refined question
   - Sub-questions to address
   - Potential hypotheses (if applicable)

5. **Next Steps**
   - Suggested methodology approach
   - Key variables to consider
   - Initial source recommendations`,
    expectedOutput: 'A refined, focused research question with sub-questions, feasibility analysis, and methodology suggestions.',
    useCases: [
      'Thesis and dissertation proposals',
      'Research project initiation',
      'Grant applications',
      'Independent research',
    ],
    relatedSlugs: ['literature-review-assistant', 'source-evaluation-framework'],
  },
  {
    id: '6',
    slug: 'source-evaluation-framework',
    title: 'Source Evaluation Framework',
    shortDescription: 'Critically evaluate sources for credibility, relevance, and quality.',
    description: 'This prompt provides a systematic framework for evaluating academic and non-academic sources. It helps you assess credibility, identify bias, and determine source quality.',
    category: 'prompt',
    subcategory: 'research',
    tags: ['research', 'sources', 'evaluation', 'critical thinking'],
    difficulty: 'intermediate',
    isNew: true,
    variables: ['SOURCE_TYPE', 'SOURCE_DETAILS', 'RESEARCH_CONTEXT'],
    content: `You are an information literacy expert. Help me evaluate this source critically.

**Source Type:** [SOURCE_TYPE] (journal article, book, website, report, etc.)

**Source Details:** [SOURCE_DETAILS]

**My Research Context:** [RESEARCH_CONTEXT]

Please evaluate using:

1. **CRAAP Test Analysis**
   - Currency: How recent? Is timeliness important?
   - Relevance: How well does it fit my research?
   - Authority: Who created it? What are their credentials?
   - Accuracy: Is information verifiable? Evidence-based?
   - Purpose: Why was this created? Any bias?

2. **Scholarly Quality Indicators**
   - Peer review status
   - Citation count and impact
   - Methodology transparency
   - Data availability

3. **Bias Assessment**
   - Funding sources
   - Author affiliations
   - Language and framing analysis
   - Missing perspectives

4. **Contextual Evaluation**
   - Position in scholarly conversation
   - Reception by other scholars
   - Limitations acknowledged by authors

5. **Recommendation**
   - Overall quality rating (1-5)
   - Best use case for this source
   - Caveats for using this source
   - Alternative sources to consider`,
    expectedOutput: 'Comprehensive source evaluation with ratings, bias assessment, and usage recommendations.',
    useCases: [
      'Research paper source selection',
      'Fact-checking and verification',
      'Literature review quality control',
      'Teaching critical evaluation',
    ],
    relatedSlugs: ['literature-review-assistant', 'research-question-refiner'],
  },

  // Creative Writing Prompts
  {
    id: '7',
    slug: 'character-development-deep-dive',
    title: 'Character Development Deep Dive',
    shortDescription: 'Create complex, multi-dimensional characters with rich backstories.',
    description: 'This comprehensive prompt helps you develop fully realized characters with psychological depth, consistent motivations, and compelling backstories.',
    category: 'prompt',
    subcategory: 'creative-writing',
    tags: ['creative writing', 'character', 'fiction', 'storytelling'],
    difficulty: 'intermediate',
    isFeatured: true,
    variables: ['CHARACTER_NAME', 'STORY_GENRE', 'CHARACTER_ROLE'],
    content: `You are a master storyteller and character development expert. Help me create a compelling character.

**Character Name:** [CHARACTER_NAME]

**Story Genre:** [STORY_GENRE]

**Role in Story:** [CHARACTER_ROLE] (protagonist, antagonist, supporting, etc.)

Please develop:

1. **Core Identity**
   - Age, appearance, distinguishing features
   - Voice and speech patterns
   - Body language and mannerisms
   - First impression they create

2. **Psychological Profile**
   - Core values and beliefs
   - Greatest fear and deepest desire
   - Internal contradictions
   - Defense mechanisms

3. **Backstory Architecture**
   - Formative childhood experiences
   - Key relationships that shaped them
   - Wounds and traumas
   - Proud moments and achievements

4. **Character Arc Potential**
   - Starting point (beliefs, limitations)
   - What needs to change
   - Catalysts for growth
   - Potential ending states

5. **Relationship Dynamics**
   - How they interact with different character types
   - Trust patterns
   - Conflict styles
   - What they need from others

6. **Distinctive Details**
   - Quirks and habits
   - Possessions that matter to them
   - Secrets they keep
   - Contradictory behaviors`,
    expectedOutput: 'A fully developed character profile with psychological depth, backstory, arc potential, and distinctive details.',
    useCases: [
      'Novel and short story writing',
      'Screenwriting',
      'Role-playing games',
      'Creative writing courses',
    ],
    relatedSlugs: ['story-structure-architect', 'dialogue-polish-workshop'],
  },
  {
    id: '8',
    slug: 'story-structure-architect',
    title: 'Story Structure Architect',
    shortDescription: 'Design compelling narratives using proven story structure frameworks.',
    description: 'This prompt helps you structure your story using classic and contemporary narrative frameworks. Choose from multiple structure options to find the best fit for your story.',
    category: 'prompt',
    subcategory: 'creative-writing',
    tags: ['story', 'structure', 'plot', 'narrative'],
    difficulty: 'intermediate',
    variables: ['STORY_PREMISE', 'GENRE', 'TARGET_LENGTH'],
    content: `You are a narrative structure expert and story consultant. Help me architect my story.

**Story Premise:** [STORY_PREMISE]

**Genre:** [GENRE]

**Target Length:** [TARGET_LENGTH]

Please provide:

1. **Structure Options**
   Apply my premise to THREE different structures:
   - Three-Act Structure
   - Hero's Journey
   - Save the Cat! Beat Sheet

2. **For Each Structure:**
   - Key plot points mapped to premise
   - Suggested scene list
   - Pacing recommendations
   - Strengths for this particular story

3. **Recommended Structure**
   - Which structure fits best and why
   - Detailed beat-by-beat breakdown
   - Scene-by-scene outline

4. **Subplot Integration**
   - 2-3 subplot suggestions
   - How subplots reinforce main theme
   - Weaving strategy

5. **Opening and Closing**
   - 3 opening hook options
   - Climax staging suggestions
   - Resolution approaches

6. **Pacing Guide**
   - Word count distribution by section
   - Tension escalation map
   - Breather moments placement`,
    expectedOutput: 'Complete story structure analysis with multiple framework options, detailed beat sheet, and pacing guide.',
    useCases: [
      'Novel planning',
      'Screenplay outlining',
      'Short story structure',
      'Story revision and restructuring',
    ],
    relatedSlugs: ['character-development-deep-dive', 'dialogue-polish-workshop'],
  },

  // Professional Writing Prompts
  {
    id: '9',
    slug: 'executive-summary-generator',
    title: 'Executive Summary Generator',
    shortDescription: 'Create concise, impactful executive summaries for reports and proposals.',
    description: 'This prompt helps you distill complex information into clear, actionable executive summaries that busy stakeholders can quickly understand and act upon.',
    category: 'prompt',
    subcategory: 'professional',
    tags: ['business', 'executive summary', 'professional', 'reports'],
    difficulty: 'intermediate',
    isPro: true,
    variables: ['DOCUMENT_TYPE', 'FULL_CONTENT', 'TARGET_AUDIENCE', 'DESIRED_ACTION'],
    content: `You are a business communication expert specializing in executive communications. Help me create an executive summary.

**Document Type:** [DOCUMENT_TYPE] (report, proposal, analysis, etc.)

**Full Content to Summarize:** [FULL_CONTENT]

**Target Audience:** [TARGET_AUDIENCE]

**Desired Reader Action:** [DESIRED_ACTION]

Please create:

1. **Executive Summary** (1 page max)
   - Opening hook with key insight
   - Problem/opportunity statement
   - Solution/findings overview
   - Key recommendations
   - Call to action

2. **Key Takeaways Box**
   - 3-5 bullet points
   - Most critical data points
   - Bottom-line message

3. **At-a-Glance Elements**
   - Suggested header
   - Key metrics to highlight
   - Visual element recommendations

4. **Tone Calibration**
   - Adjust formality for audience
   - Action-oriented language
   - Confidence level appropriate to findings

5. **Alternative Versions**
   - 50-word version (email subject + first line)
   - 100-word version (slack/email)
   - 250-word version (brief memo)`,
    expectedOutput: 'A polished executive summary with key takeaways, multiple length versions, and tone-appropriate language.',
    useCases: [
      'Board presentations',
      'Investor updates',
      'Project proposals',
      'Research report summaries',
    ],
    relatedSlugs: ['professional-email-crafter', 'presentation-outline-builder'],
  },
  {
    id: '10',
    slug: 'professional-email-crafter',
    title: 'Professional Email Crafter',
    shortDescription: 'Write clear, professional emails that get results.',
    description: 'This prompt helps you compose effective professional emails for various business situations, ensuring clarity, appropriate tone, and actionable outcomes.',
    category: 'prompt',
    subcategory: 'professional',
    tags: ['email', 'business', 'communication', 'professional'],
    difficulty: 'beginner',
    isNew: true,
    variables: ['EMAIL_PURPOSE', 'RECIPIENT', 'KEY_MESSAGE', 'DESIRED_OUTCOME'],
    content: `You are a business communication expert. Help me craft an effective professional email.

**Email Purpose:** [EMAIL_PURPOSE]

**Recipient:** [RECIPIENT] (role, relationship, context)

**Key Message:** [KEY_MESSAGE]

**Desired Outcome:** [DESIRED_OUTCOME]

Please provide:

1. **Subject Line Options**
   - 3 clear, action-oriented subject lines
   - Open rate optimization tips

2. **Email Body**
   - Professional greeting
   - Opening that establishes context
   - Clear main message
   - Specific ask or call to action
   - Professional closing

3. **Tone Variations**
   - Formal version
   - Conversational version
   - Urgent version (if applicable)

4. **Structure Analysis**
   - Paragraph breakdown
   - Readability check
   - Mobile-friendly formatting

5. **Response Facilitation**
   - Easy-to-answer questions
   - Clear next steps
   - Deadline handling

6. **Common Pitfalls Avoided**
   - Passive language removed
   - Ambiguity eliminated
   - Appropriate length maintained`,
    expectedOutput: 'Complete professional email with subject lines, multiple tone versions, and structure optimized for response.',
    useCases: [
      'Client communication',
      'Internal requests',
      'Follow-up emails',
      'Difficult conversations',
    ],
    relatedSlugs: ['executive-summary-generator', 'presentation-outline-builder'],
  },

  // ============================================
  // ChatGPT Academic Prompts
  // ============================================
  {
    id: '11',
    slug: 'chatgpt-argument-analysis-prompt',
    title: 'ChatGPT Argument Analysis Prompt',
    shortDescription: 'Analyze arguments, identify logical fallacies, and strengthen your reasoning with ChatGPT.',
    description: 'This prompt leverages ChatGPT\'s analytical capabilities to break down arguments, identify strengths and weaknesses, detect logical fallacies, and suggest improvements for more rigorous academic discourse.',
    category: 'prompt',
    subcategory: 'chatgpt',
    tags: ['chatgpt', 'argument', 'analysis', 'logic', 'academic'],
    difficulty: 'intermediate',
    isNew: true,
    model: 'ChatGPT',
    pricing: { type: 'free' },
    variables: ['ARGUMENT_TEXT', 'CONTEXT', 'EVALUATION_CRITERIA'],
    content: `You are an expert in logic and argumentation. Analyze the following argument using rigorous academic standards.

**Argument to Analyze:**
[ARGUMENT_TEXT]

**Context:** [CONTEXT]

**Evaluation Focus:** [EVALUATION_CRITERIA]

Please provide:

1. **Argument Structure Analysis**
   - Identify the main claim/thesis
   - Map supporting premises
   - Identify implicit assumptions
   - Diagram the logical flow

2. **Logical Assessment**
   - Evaluate validity of reasoning
   - Check for logical fallacies (name and explain each)
   - Assess evidence quality
   - Identify unsupported claims

3. **Strength Analysis**
   - What makes this argument compelling?
   - Most effective rhetorical elements
   - Best-supported claims

4. **Weakness Identification**
   - Gaps in reasoning
   - Missing evidence
   - Counterarguments not addressed
   - Potential biases

5. **Improvement Recommendations**
   - How to strengthen the argument
   - Additional evidence needed
   - Rhetorical improvements
   - Rewritten stronger version`,
    expectedOutput: 'Comprehensive argument analysis with logical assessment, fallacy identification, and actionable improvements.',
    useCases: [
      'Essay argument evaluation',
      'Debate preparation',
      'Critical reading exercises',
      'Academic peer review',
    ],
    relatedSlugs: ['chatgpt-critical-thinking-essay-prompt', 'thesis-statement-generator'],
  },
  {
    id: '12',
    slug: 'chatgpt-critical-thinking-essay-prompt',
    title: 'ChatGPT Critical Thinking Essay Prompt',
    shortDescription: 'Develop essays that demonstrate sophisticated critical thinking and analysis.',
    description: 'Use ChatGPT to craft essays that showcase higher-order thinking skills, including analysis, synthesis, evaluation, and the ability to consider multiple perspectives on complex issues.',
    category: 'prompt',
    subcategory: 'chatgpt',
    tags: ['chatgpt', 'critical thinking', 'essay', 'analysis', 'academic'],
    difficulty: 'advanced',
    model: 'ChatGPT',
    pricing: { type: 'free' },
    variables: ['TOPIC', 'THESIS', 'PERSPECTIVES', 'WORD_COUNT'],
    content: `You are an expert academic writing coach specializing in critical thinking development. Help me write an essay that demonstrates sophisticated analytical skills.

**Topic:** [TOPIC]

**Working Thesis:** [THESIS]

**Perspectives to Consider:** [PERSPECTIVES]

**Target Length:** [WORD_COUNT] words

Guide me through:

1. **Critical Framework Selection**
   - Appropriate analytical lenses for this topic
   - Key questions to investigate
   - Theoretical frameworks to apply

2. **Multi-Perspective Analysis**
   - Present each perspective fairly
   - Identify underlying assumptions
   - Compare and contrast viewpoints
   - Synthesize insights

3. **Evidence Evaluation**
   - Assess source credibility
   - Identify potential biases
   - Weigh conflicting evidence
   - Draw supported conclusions

4. **Argument Development**
   - Build nuanced claims
   - Acknowledge complexity
   - Address counterarguments substantively
   - Avoid oversimplification

5. **Synthesis and Conclusion**
   - Integrate multiple perspectives
   - Articulate original insights
   - Identify implications
   - Propose areas for further inquiry`,
    expectedOutput: 'A sophisticated essay framework demonstrating critical thinking through multi-perspective analysis and nuanced argumentation.',
    useCases: [
      'Graduate-level essays',
      'Philosophy papers',
      'Policy analysis',
      'Ethics discussions',
    ],
    relatedSlugs: ['chatgpt-argument-analysis-prompt', 'chatgpt-research-synthesis-prompt'],
  },
  {
    id: '13',
    slug: 'chatgpt-research-synthesis-prompt',
    title: 'ChatGPT Research Synthesis Prompt',
    shortDescription: 'Synthesize multiple research sources into coherent, insightful analysis.',
    description: 'This prompt helps you use ChatGPT to combine findings from multiple research sources, identify patterns, resolve contradictions, and develop original insights from existing literature.',
    category: 'prompt',
    subcategory: 'chatgpt',
    tags: ['chatgpt', 'research', 'synthesis', 'literature', 'academic'],
    difficulty: 'advanced',
    model: 'ChatGPT',
    pricing: { type: 'free' },
    variables: ['RESEARCH_TOPIC', 'SOURCE_SUMMARIES', 'SYNTHESIS_GOAL'],
    content: `You are a research methodology expert. Help me synthesize these sources into coherent analysis.

**Research Topic:** [RESEARCH_TOPIC]

**Source Summaries:** [SOURCE_SUMMARIES]

**Synthesis Goal:** [SYNTHESIS_GOAL]

Please synthesize by:

1. **Pattern Identification**
   - Common themes across sources
   - Recurring methodologies
   - Shared conclusions
   - Consistent evidence

2. **Contradiction Resolution**
   - Identify conflicting findings
   - Analyze reasons for differences
   - Evaluate which positions are better supported
   - Propose reconciliation where possible

3. **Gap Analysis**
   - What questions remain unanswered?
   - What perspectives are missing?
   - Where is evidence insufficient?
   - What future research is needed?

4. **Original Insight Development**
   - Connections not explicitly made in sources
   - New interpretations of combined evidence
   - Theoretical implications
   - Practical applications

5. **Synthesis Narrative**
   - Coherent story from disparate sources
   - Logical flow of ideas
   - Clear thesis emerging from synthesis
   - Compelling conclusion`,
    expectedOutput: 'A synthesized analysis that identifies patterns, resolves contradictions, and generates original insights from multiple sources.',
    useCases: [
      'Literature reviews',
      'Research paper backgrounds',
      'Systematic reviews',
      'Thesis chapters',
    ],
    relatedSlugs: ['literature-review-assistant', 'chatgpt-literature-comparison-prompt'],
  },
  {
    id: '14',
    slug: 'chatgpt-literature-comparison-prompt',
    title: 'ChatGPT Literature Comparison Prompt',
    shortDescription: 'Compare and contrast multiple literary works or academic sources systematically.',
    description: 'Use ChatGPT to conduct sophisticated comparative analysis of texts, identifying thematic connections, methodological differences, and creating comprehensive comparison frameworks.',
    category: 'prompt',
    subcategory: 'chatgpt',
    tags: ['chatgpt', 'comparison', 'literature', 'analysis', 'academic'],
    difficulty: 'intermediate',
    model: 'ChatGPT',
    pricing: { type: 'free' },
    variables: ['TEXT_A', 'TEXT_B', 'COMPARISON_FOCUS', 'ANALYSIS_PURPOSE'],
    content: `You are a comparative literature and analysis expert. Help me compare these texts systematically.

**Text/Source A:** [TEXT_A]

**Text/Source B:** [TEXT_B]

**Comparison Focus:** [COMPARISON_FOCUS]

**Purpose of Analysis:** [ANALYSIS_PURPOSE]

Provide comprehensive comparison:

1. **Overview Matrix**
   - Side-by-side key elements
   - Author background/context
   - Publication context
   - Intended audience

2. **Thematic Comparison**
   - Shared themes
   - Divergent themes
   - Treatment of common themes
   - Thematic evolution

3. **Methodological Analysis**
   - Approaches used
   - Evidence types
   - Analytical frameworks
   - Strengths of each approach

4. **Stylistic Elements**
   - Writing style
   - Rhetorical strategies
   - Tone and voice
   - Structural choices

5. **Synthesis and Evaluation**
   - What each contributes uniquely
   - How they complement each other
   - Which is more effective for what purpose
   - Combined insights`,
    expectedOutput: 'Comprehensive comparative analysis with thematic, methodological, and stylistic dimensions.',
    useCases: [
      'Comparative essays',
      'Literature reviews',
      'Source evaluation',
      'Academic debates',
    ],
    relatedSlugs: ['chatgpt-research-synthesis-prompt', 'source-evaluation-framework'],
  },
  {
    id: '15',
    slug: 'chatgpt-academic-tone-conversion-prompt',
    title: 'ChatGPT Academic Tone Conversion Prompt',
    shortDescription: 'Convert casual writing to polished academic prose while preserving meaning.',
    description: 'Transform informal or draft writing into polished academic prose using ChatGPT. This prompt helps elevate language, improve precision, and ensure appropriate scholarly tone.',
    category: 'prompt',
    subcategory: 'chatgpt',
    tags: ['chatgpt', 'academic writing', 'tone', 'editing', 'style'],
    difficulty: 'beginner',
    isNew: true,
    model: 'ChatGPT',
    pricing: { type: 'free' },
    variables: ['ORIGINAL_TEXT', 'DISCIPLINE', 'FORMALITY_LEVEL'],
    content: `You are an expert academic editor. Convert this text to polished academic prose.

**Original Text:** [ORIGINAL_TEXT]

**Academic Discipline:** [DISCIPLINE]

**Formality Level:** [FORMALITY_LEVEL] (undergraduate/graduate/publication)

Please transform by:

1. **Tone Elevation**
   - Replace casual language with academic alternatives
   - Remove colloquialisms
   - Adjust sentence structure for formality
   - Maintain author's voice while elevating register

2. **Precision Enhancement**
   - Replace vague terms with specific ones
   - Add appropriate hedging language
   - Clarify ambiguous statements
   - Ensure technical accuracy

3. **Structure Improvement**
   - Improve paragraph organization
   - Add transition phrases
   - Enhance logical flow
   - Create clear topic sentences

4. **Citation Readiness**
   - Identify claims needing citation
   - Suggest where evidence should be added
   - Format for citation integration
   - Balance assertion with support

5. **Final Polish**
   - Check discipline-specific conventions
   - Ensure consistent voice
   - Verify appropriate complexity
   - Provide before/after comparison`,
    expectedOutput: 'Academically polished version of the text with explanations of changes made.',
    useCases: [
      'Draft revision',
      'Freewriting to formal prose',
      'ESL academic writing support',
      'Quick tone adjustment',
    ],
    relatedSlugs: ['professional-email-crafter', 'chatgpt-critical-thinking-essay-prompt'],
  },

  // ============================================
  // Claude Academic Prompts
  // ============================================
  {
    id: '16',
    slug: 'claude-high-level-research-assistant',
    title: 'Claude High-Level Research Assistant',
    shortDescription: 'Leverage Claude\'s nuanced reasoning for sophisticated research guidance.',
    description: 'This prompt harnesses Claude\'s strength in nuanced analysis and careful reasoning to provide high-level research guidance, methodology recommendations, and strategic research planning.',
    category: 'prompt',
    subcategory: 'claude',
    tags: ['claude', 'research', 'methodology', 'academic', 'planning'],
    difficulty: 'advanced',
    isNew: true,
    model: 'Claude',
    pricing: { type: 'free' },
    variables: ['RESEARCH_AREA', 'CURRENT_STAGE', 'CHALLENGES', 'GOALS'],
    content: `You are a senior research advisor with expertise in research design and methodology. Provide high-level guidance for this research project.

**Research Area:** [RESEARCH_AREA]

**Current Stage:** [CURRENT_STAGE]

**Key Challenges:** [CHALLENGES]

**Research Goals:** [GOALS]

Provide strategic guidance on:

1. **Research Design Assessment**
   - Evaluate current approach
   - Identify methodological strengths
   - Flag potential weaknesses
   - Suggest design refinements

2. **Strategic Direction**
   - Prioritize research activities
   - Identify critical path items
   - Suggest resource allocation
   - Timeline recommendations

3. **Methodological Recommendations**
   - Appropriate methods for questions
   - Data collection strategies
   - Analysis approach options
   - Validity and reliability considerations

4. **Risk Mitigation**
   - Anticipate potential problems
   - Suggest contingency plans
   - Identify ethical considerations
   - Address feasibility concerns

5. **Quality Assurance**
   - Standards to meet
   - Peer review preparation
   - Documentation requirements
   - Publication positioning`,
    expectedOutput: 'Strategic research guidance with methodology recommendations and risk mitigation strategies.',
    useCases: [
      'Dissertation planning',
      'Grant proposal development',
      'Research project management',
      'Methodology consultation',
    ],
    relatedSlugs: ['research-question-refiner', 'claude-multi-source-literature-review-prompt'],
  },
  {
    id: '17',
    slug: 'claude-multi-source-literature-review-prompt',
    title: 'Claude Multi-Source Literature Review Prompt',
    shortDescription: 'Construct comprehensive literature reviews with Claude\'s analytical depth.',
    description: 'Use Claude\'s capacity for handling complex, nuanced information to build thorough literature reviews that synthesize diverse sources while maintaining critical perspective.',
    category: 'prompt',
    subcategory: 'claude',
    tags: ['claude', 'literature review', 'research', 'synthesis', 'academic'],
    difficulty: 'advanced',
    model: 'Claude',
    pricing: { type: 'free' },
    variables: ['TOPIC', 'SOURCE_TYPES', 'REVIEW_SCOPE', 'ANALYTICAL_FOCUS'],
    content: `You are an expert in systematic literature review methodology. Help construct a comprehensive literature review.

**Topic:** [TOPIC]

**Source Types to Include:** [SOURCE_TYPES]

**Review Scope:** [REVIEW_SCOPE]

**Analytical Focus:** [ANALYTICAL_FOCUS]

Guide the review construction:

1. **Systematic Framework**
   - Search strategy recommendations
   - Inclusion/exclusion criteria
   - Quality assessment approach
   - Documentation standards

2. **Source Organization**
   - Chronological evolution of field
   - Thematic clustering
   - Methodological groupings
   - Theoretical frameworks

3. **Critical Analysis Structure**
   - Evaluate evidence quality
   - Assess methodological rigor
   - Identify bias patterns
   - Note limitations systematically

4. **Synthesis Strategy**
   - Connect disparate findings
   - Resolve contradictions
   - Identify consensus areas
   - Map disagreements

5. **Gap Identification**
   - Underexplored questions
   - Methodological gaps
   - Population gaps
   - Theoretical gaps

6. **Narrative Development**
   - Compelling structure
   - Logical flow
   - Clear argumentation
   - Strong conclusion`,
    expectedOutput: 'Comprehensive literature review framework with systematic organization and critical analysis.',
    useCases: [
      'Thesis literature chapters',
      'Systematic reviews',
      'Research proposals',
      'Academic publications',
    ],
    relatedSlugs: ['literature-review-assistant', 'claude-high-level-research-assistant'],
  },
  {
    id: '18',
    slug: 'claude-bias-perspective-analyzer',
    title: 'Claude Bias & Perspective Analyzer',
    shortDescription: 'Identify biases, assumptions, and perspectives in texts with Claude\'s nuanced analysis.',
    description: 'Leverage Claude\'s sophisticated reasoning to uncover hidden biases, unstated assumptions, and perspective limitations in academic and professional texts.',
    category: 'prompt',
    subcategory: 'claude',
    tags: ['claude', 'bias', 'analysis', 'critical thinking', 'perspective'],
    difficulty: 'intermediate',
    model: 'Claude',
    pricing: { type: 'free' },
    variables: ['TEXT_TO_ANALYZE', 'CONTEXT', 'ANALYSIS_DEPTH'],
    content: `You are an expert in critical discourse analysis and bias detection. Analyze this text for biases and perspectives.

**Text to Analyze:** [TEXT_TO_ANALYZE]

**Context:** [CONTEXT]

**Analysis Depth:** [ANALYSIS_DEPTH]

Conduct thorough analysis:

1. **Perspective Identification**
   - Author's apparent viewpoint
   - Disciplinary lens
   - Cultural/historical context
   - Stakeholder alignment

2. **Assumption Mapping**
   - Explicit assumptions
   - Implicit assumptions
   - Foundational premises
   - Unquestioned beliefs

3. **Bias Detection**
   - Selection bias (what's included/excluded)
   - Framing bias (how issues are presented)
   - Language bias (loaded terms)
   - Confirmation bias indicators

4. **Missing Perspectives**
   - Voices not represented
   - Alternative interpretations
   - Counterarguments not addressed
   - Stakeholders ignored

5. **Impact Assessment**
   - How biases affect conclusions
   - Validity implications
   - Generalizability limits
   - Practical consequences

6. **Balanced Interpretation**
   - How to read the text critically
   - Valid insights despite biases
   - Complementary sources needed
   - Appropriate use cases`,
    expectedOutput: 'Detailed bias and perspective analysis with practical guidance for critical interpretation.',
    useCases: [
      'Source evaluation',
      'Media literacy',
      'Academic criticism',
      'Research assessment',
    ],
    relatedSlugs: ['source-evaluation-framework', 'claude-academic-debate-simulator'],
  },
  {
    id: '19',
    slug: 'claude-academic-debate-simulator',
    title: 'Claude Academic Debate Simulator',
    shortDescription: 'Simulate rigorous academic debates to strengthen arguments and anticipate objections.',
    description: 'Use Claude to simulate scholarly debate, generating strong counterarguments, testing your positions, and developing more robust academic arguments.',
    category: 'prompt',
    subcategory: 'claude',
    tags: ['claude', 'debate', 'argumentation', 'academic', 'critical thinking'],
    difficulty: 'advanced',
    model: 'Claude',
    pricing: { type: 'free' },
    variables: ['YOUR_POSITION', 'TOPIC', 'DEBATE_CONTEXT', 'OPPOSING_VIEW'],
    content: `You are a skilled academic debater and argumentation expert. Simulate a rigorous academic debate on this topic.

**Your Position:** [YOUR_POSITION]

**Topic:** [TOPIC]

**Debate Context:** [DEBATE_CONTEXT]

**Known Opposing View:** [OPPOSING_VIEW]

Conduct the debate simulation:

1. **Position Strengthening**
   - Best arguments for your position
   - Strongest evidence available
   - Most compelling framing
   - Rhetorical strategies

2. **Opposition Construction**
   - Strongest counterarguments
   - Evidence against your position
   - Logical challenges
   - Alternative interpretations

3. **Cross-Examination**
   - Questions opponents would ask
   - Weak points they'd target
   - Evidence they'd demand
   - Logical gaps they'd exploit

4. **Rebuttal Development**
   - Responses to key objections
   - Evidence to address concerns
   - Concessions to make strategically
   - Ground to defend firmly

5. **Synthesis**
   - Common ground identification
   - Nuanced final position
   - Acknowledged limitations
   - Stronger revised argument`,
    expectedOutput: 'Comprehensive debate simulation with counterarguments, rebuttals, and strengthened position.',
    useCases: [
      'Thesis defense preparation',
      'Paper strengthening',
      'Peer review preparation',
      'Academic presentations',
    ],
    relatedSlugs: ['chatgpt-argument-analysis-prompt', 'claude-evidence-based-writing-enhancer'],
  },
  {
    id: '20',
    slug: 'claude-evidence-based-writing-enhancer',
    title: 'Claude Evidence-Based Writing Enhancer',
    shortDescription: 'Strengthen academic writing with better evidence integration and citation practices.',
    description: 'Use Claude to improve how you integrate evidence into your writing, ensuring claims are well-supported, citations are properly used, and arguments are substantiated.',
    category: 'prompt',
    subcategory: 'claude',
    tags: ['claude', 'evidence', 'citations', 'academic writing', 'research'],
    difficulty: 'intermediate',
    isNew: true,
    model: 'Claude',
    pricing: { type: 'free' },
    variables: ['DRAFT_TEXT', 'AVAILABLE_SOURCES', 'CITATION_STYLE'],
    content: `You are an expert in academic writing and evidence integration. Help strengthen this text with better evidence use.

**Draft Text:** [DRAFT_TEXT]

**Available Sources:** [AVAILABLE_SOURCES]

**Citation Style:** [CITATION_STYLE]

Enhance evidence integration:

1. **Claim Audit**
   - Identify all claims made
   - Categorize by evidence needs
   - Flag unsupported assertions
   - Note over-reliance on any source

2. **Evidence Mapping**
   - Match claims to available evidence
   - Identify gaps in support
   - Suggest additional evidence needed
   - Recommend source types

3. **Integration Improvement**
   - Better quote integration
   - Paraphrase suggestions
   - Signal phrase variety
   - Analysis after evidence

4. **Citation Enhancement**
   - Proper citation format
   - Strategic citation placement
   - Attribution clarity
   - Avoiding over-citation

5. **Balance Assessment**
   - Source diversity check
   - Perspective balance
   - Primary vs. secondary sources
   - Recent vs. foundational sources

6. **Revised Version**
   - Provide enhanced text
   - Explain improvements
   - Note remaining needs
   - Citation checklist`,
    expectedOutput: 'Enhanced text with improved evidence integration, proper citations, and well-supported claims.',
    useCases: [
      'Draft revision',
      'Citation improvement',
      'Argument strengthening',
      'Academic editing',
    ],
    relatedSlugs: ['claude-bias-perspective-analyzer', 'source-evaluation-framework'],
  },

  // ============================================
  // Gemini Academic Prompts
  // ============================================
  {
    id: '21',
    slug: 'gemini-graduate-level-essay-planner',
    title: 'Gemini Graduate-Level Essay Planner',
    shortDescription: 'Plan sophisticated graduate-level essays with Gemini\'s advanced reasoning.',
    description: 'Leverage Google Gemini\'s capabilities to plan complex, graduate-level academic essays with appropriate depth, rigor, and scholarly conventions.',
    category: 'prompt',
    subcategory: 'gemini',
    tags: ['gemini', 'graduate', 'essay', 'planning', 'academic'],
    difficulty: 'advanced',
    isNew: true,
    model: 'Gemini',
    pricing: { type: 'free' },
    variables: ['ESSAY_TOPIC', 'COURSE_LEVEL', 'WORD_COUNT', 'KEY_TEXTS'],
    content: `You are an expert academic advisor specializing in graduate-level writing. Help plan a sophisticated essay.

**Essay Topic:** [ESSAY_TOPIC]

**Course Level:** [COURSE_LEVEL]

**Word Count:** [WORD_COUNT]

**Key Texts to Engage:** [KEY_TEXTS]

Create comprehensive essay plan:

1. **Scholarly Positioning**
   - Place topic in academic discourse
   - Identify relevant debates
   - Determine contribution potential
   - Frame scholarly intervention

2. **Thesis Development**
   - Craft graduate-level thesis
   - Ensure appropriate scope
   - Build argumentative complexity
   - Allow for nuance

3. **Structural Architecture**
   - Section breakdown
   - Argument progression
   - Evidence distribution
   - Transition logic

4. **Source Integration Plan**
   - Primary source engagement
   - Secondary source dialogue
   - Theoretical framework use
   - Citation density planning

5. **Methodological Approach**
   - Analytical methods
   - Interpretive frameworks
   - Disciplinary conventions
   - Originality elements

6. **Quality Checkpoints**
   - Graduate-level expectations
   - Depth indicators
   - Sophistication markers
   - Common pitfalls to avoid`,
    expectedOutput: 'Comprehensive graduate-level essay plan with scholarly positioning and structural architecture.',
    useCases: [
      'Master\'s essays',
      'PhD coursework',
      'Comprehensive exams',
      'Seminar papers',
    ],
    relatedSlugs: ['gemini-academic-outline-generator', 'gemini-concept-to-essay-builder'],
  },
  {
    id: '22',
    slug: 'gemini-source-evaluation-framework',
    title: 'Gemini Source Evaluation Framework',
    shortDescription: 'Systematically evaluate academic sources using Gemini\'s analytical capabilities.',
    description: 'Use Google Gemini to conduct thorough, multi-dimensional evaluation of academic sources, assessing credibility, relevance, methodology, and scholarly impact.',
    category: 'prompt',
    subcategory: 'gemini',
    tags: ['gemini', 'source evaluation', 'research', 'credibility', 'academic'],
    difficulty: 'intermediate',
    model: 'Gemini',
    pricing: { type: 'free' },
    variables: ['SOURCE_INFO', 'RESEARCH_PURPOSE', 'EVALUATION_CRITERIA'],
    content: `You are an expert in information literacy and source evaluation. Conduct a comprehensive source assessment.

**Source Information:** [SOURCE_INFO]

**Research Purpose:** [RESEARCH_PURPOSE]

**Specific Evaluation Criteria:** [EVALUATION_CRITERIA]

Evaluate systematically:

1. **Authority Assessment**
   - Author credentials
   - Institutional affiliation
   - Publication venue
   - Peer review status

2. **Methodological Review**
   - Research design quality
   - Data collection rigor
   - Analysis appropriateness
   - Limitations acknowledged

3. **Currency Analysis**
   - Publication date
   - Field evolution since
   - Continued relevance
   - Updated perspectives

4. **Relevance Mapping**
   - Alignment with research question
   - Applicable findings
   - Generalizable insights
   - Context fit

5. **Impact Assessment**
   - Citation metrics
   - Scholarly reception
   - Influence on field
   - Subsequent research

6. **Bias Screening**
   - Funding sources
   - Conflicts of interest
   - Methodological biases
   - Interpretive biases

7. **Use Recommendation**
   - Appropriate uses
   - Caveats for use
   - Complementary sources
   - Alternative sources`,
    expectedOutput: 'Comprehensive source evaluation with authority, methodology, relevance, and bias assessments.',
    useCases: [
      'Literature review',
      'Research paper writing',
      'Academic fact-checking',
      'Source selection',
    ],
    relatedSlugs: ['source-evaluation-framework', 'gemini-graduate-level-essay-planner'],
  },
  {
    id: '23',
    slug: 'gemini-academic-outline-generator',
    title: 'Gemini Academic Outline Generator',
    shortDescription: 'Generate detailed, hierarchical outlines for academic papers with Gemini.',
    description: 'Use Google Gemini to create comprehensive, logically structured outlines that serve as effective roadmaps for academic writing projects of any scope.',
    category: 'prompt',
    subcategory: 'gemini',
    tags: ['gemini', 'outline', 'academic', 'structure', 'planning'],
    difficulty: 'beginner',
    model: 'Gemini',
    pricing: { type: 'free' },
    variables: ['PAPER_TOPIC', 'THESIS', 'PAPER_TYPE', 'LENGTH'],
    content: `You are an expert in academic writing structure and organization. Create a detailed outline for this paper.

**Paper Topic:** [PAPER_TOPIC]

**Thesis/Main Argument:** [THESIS]

**Paper Type:** [PAPER_TYPE]

**Target Length:** [LENGTH]

Generate comprehensive outline:

1. **Introduction Section**
   - Hook options (3 approaches)
   - Background/context elements
   - Problem statement
   - Thesis placement
   - Roadmap preview

2. **Body Structure**
   - Main sections with rationale
   - Subsection breakdown
   - Point-by-point organization
   - Evidence placement markers
   - Transition points

3. **Each Body Section Includes:**
   - Topic sentence
   - Key arguments (2-4)
   - Evidence needs
   - Analysis prompts
   - Connection to thesis

4. **Counterargument/Limitation Section**
   - Opposing views to address
   - Rebuttal approach
   - Concession points
   - Strengthening moves

5. **Conclusion Framework**
   - Thesis restatement approach
   - Summary strategy
   - Broader implications
   - Future directions
   - Closing impact

6. **Supplementary Elements**
   - Word count allocation
   - Source distribution
   - Visual/table suggestions
   - Appendix considerations`,
    expectedOutput: 'Detailed hierarchical outline with all sections mapped and writing guidance included.',
    useCases: [
      'Research papers',
      'Essays',
      'Dissertations',
      'Reports',
    ],
    relatedSlugs: ['essay-outline-creator', 'gemini-concept-to-essay-builder'],
  },
  {
    id: '24',
    slug: 'gemini-concept-to-essay-builder',
    title: 'Gemini Concept-to-Essay Builder',
    shortDescription: 'Transform abstract concepts into well-structured academic essays with Gemini.',
    description: 'Use Google Gemini to develop vague ideas or concepts into fully realized academic essays, with proper argumentation, evidence integration, and scholarly conventions.',
    category: 'prompt',
    subcategory: 'gemini',
    tags: ['gemini', 'essay', 'concept development', 'academic', 'writing'],
    difficulty: 'intermediate',
    model: 'Gemini',
    pricing: { type: 'free' },
    variables: ['CONCEPT', 'DISCIPLINE', 'ESSAY_TYPE', 'AUDIENCE'],
    content: `You are an expert at developing abstract ideas into rigorous academic arguments. Help transform this concept into an essay.

**Core Concept/Idea:** [CONCEPT]

**Academic Discipline:** [DISCIPLINE]

**Essay Type:** [ESSAY_TYPE]

**Target Audience:** [AUDIENCE]

Guide the development:

1. **Concept Clarification**
   - Define the core idea precisely
   - Identify key components
   - Map related concepts
   - Establish boundaries

2. **Academic Framing**
   - Place in scholarly context
   - Identify relevant literature
   - Connect to existing debates
   - Find disciplinary home

3. **Thesis Crystallization**
   - Move from concept to argument
   - Develop specific claim
   - Ensure it's arguable
   - Test thesis strength

4. **Evidence Strategy**
   - Types of evidence needed
   - Potential sources
   - Research direction
   - Data requirements

5. **Argument Architecture**
   - Build from concept to conclusion
   - Create logical progression
   - Plan supporting arguments
   - Anticipate objections

6. **Essay Draft Blueprint**
   - Full outline from concept
   - Section summaries
   - Key points per section
   - Transition strategy`,
    expectedOutput: 'Complete essay development plan from abstract concept to structured argument.',
    useCases: [
      'Brainstorming to essay',
      'Concept papers',
      'Early draft development',
      'Idea refinement',
    ],
    relatedSlugs: ['gemini-academic-outline-generator', 'thesis-statement-generator'],
  },
  {
    id: '25',
    slug: 'gemini-research-question-expander',
    title: 'Gemini Research Question Expander',
    shortDescription: 'Expand and refine research questions for comprehensive academic inquiry.',
    description: 'Use Google Gemini to develop initial research questions into comprehensive inquiry frameworks, with sub-questions, methodology considerations, and scope refinement.',
    category: 'prompt',
    subcategory: 'gemini',
    tags: ['gemini', 'research questions', 'methodology', 'academic', 'inquiry'],
    difficulty: 'intermediate',
    isNew: true,
    model: 'Gemini',
    pricing: { type: 'free' },
    variables: ['INITIAL_QUESTION', 'FIELD', 'SCOPE_CONSTRAINTS', 'METHODOLOGY_PREFERENCES'],
    content: `You are a research design expert. Help expand and refine this research question.

**Initial Research Question:** [INITIAL_QUESTION]

**Field/Discipline:** [FIELD]

**Scope Constraints:** [SCOPE_CONSTRAINTS]

**Methodology Preferences:** [METHODOLOGY_PREFERENCES]

Develop comprehensive research framework:

1. **Question Analysis**
   - Deconstruct the question
   - Identify key variables
   - Clarify concepts
   - Map assumptions

2. **Question Refinement**
   - More specific versions (3-5)
   - Different angles
   - Scope variations
   - Feasibility adjustments

3. **Sub-Question Development**
   - Break into components
   - Logical sequence
   - Dependencies between questions
   - Priority ordering

4. **Methodology Alignment**
   - Methods for each question
   - Data requirements
   - Analysis approaches
   - Resource needs

5. **Scope Optimization**
   - Narrow vs. broad trade-offs
   - Depth vs. breadth balance
   - Time/resource fit
   - Contribution potential

6. **Final Question Set**
   - Primary research question
   - Sub-questions (3-5)
   - Operational definitions
   - Success criteria`,
    expectedOutput: 'Expanded research question framework with sub-questions, methodology alignment, and scope optimization.',
    useCases: [
      'Research proposals',
      'Thesis development',
      'Grant applications',
      'Preliminary research',
    ],
    relatedSlugs: ['research-question-refiner', 'gemini-source-evaluation-framework'],
  },

  // ============================================
  // SEO Writing Prompts
  // ============================================
  {
    id: '26',
    slug: 'seo-blog-outline-generator',
    title: 'SEO Blog Outline Generator',
    shortDescription: 'Create SEO-optimized blog post outlines that rank and engage readers.',
    description: 'Generate comprehensive blog post outlines optimized for search engines while maintaining reader engagement and value delivery.',
    category: 'prompt',
    subcategory: 'seo',
    tags: ['seo', 'blog', 'content', 'outline', 'marketing'],
    difficulty: 'intermediate',
    isNew: true,
    model: null,
    pricing: { type: 'free' },
    variables: ['PRIMARY_KEYWORD', 'SECONDARY_KEYWORDS', 'TARGET_AUDIENCE', 'WORD_COUNT'],
    content: `You are an SEO content strategist. Create an optimized blog outline.

**Primary Keyword:** [PRIMARY_KEYWORD]

**Secondary Keywords:** [SECONDARY_KEYWORDS]

**Target Audience:** [TARGET_AUDIENCE]

**Target Word Count:** [WORD_COUNT]

Create SEO-optimized outline:

1. **Title Options** (5 variations)
   - Include primary keyword
   - Optimize for CTR
   - Power words inclusion
   - Length optimization (50-60 chars)

2. **Meta Description**
   - Include primary keyword
   - Compelling hook
   - Call to action
   - 150-160 characters

3. **Header Structure (H1-H4)**
   - H1: Title with keyword
   - H2s: Major sections with secondary keywords
   - H3s: Subsections with related terms
   - Natural keyword distribution

4. **Content Sections**
   - Introduction (hook + keyword)
   - Each H2 section:
     - Key points to cover
     - Keywords to include
     - Word count target
     - Internal link opportunities

5. **Featured Snippet Optimization**
   - Definition paragraph
   - Listicle section
   - How-to steps
   - FAQ section

6. **Engagement Elements**
   - Visual placement suggestions
   - Quote/stat opportunities
   - CTA positions
   - Internal/external links`,
    expectedOutput: 'Complete SEO-optimized blog outline with headers, keywords, and engagement elements.',
    useCases: [
      'Blog content planning',
      'Content marketing',
      'SEO campaigns',
      'Editorial calendars',
    ],
    relatedSlugs: ['seo-keyword-expansion-prompt', 'seo-high-intent-landing-page-prompt'],
  },
  {
    id: '27',
    slug: 'seo-keyword-expansion-prompt',
    title: 'SEO Keyword Expansion Prompt',
    shortDescription: 'Expand seed keywords into comprehensive keyword clusters for content strategy.',
    description: 'Transform a seed keyword into a complete keyword strategy with long-tail variations, related terms, questions, and content mapping.',
    category: 'prompt',
    subcategory: 'seo',
    tags: ['seo', 'keywords', 'content strategy', 'research', 'marketing'],
    difficulty: 'intermediate',
    model: null,
    pricing: { type: 'free' },
    variables: ['SEED_KEYWORD', 'INDUSTRY', 'CONTENT_GOALS', 'COMPETITOR_URLS'],
    content: `You are an SEO keyword research expert. Expand this seed keyword into a comprehensive strategy.

**Seed Keyword:** [SEED_KEYWORD]

**Industry:** [INDUSTRY]

**Content Goals:** [CONTENT_GOALS]

**Competitor Reference:** [COMPETITOR_URLS]

Generate keyword expansion:

1. **Core Keyword Cluster**
   - Primary keyword variations (10)
   - Synonyms and related terms (10)
   - Industry-specific variations (5)
   - Brand-safe alternatives (5)

2. **Long-Tail Expansion**
   - Question-based keywords (10)
   - Comparison keywords (5)
   - "Best" and "top" keywords (5)
   - Location-based (if relevant) (5)

3. **Search Intent Mapping**
   - Informational keywords
   - Navigational keywords
   - Commercial keywords
   - Transactional keywords

4. **Content Mapping**
   - Blog post topics
   - Landing page keywords
   - Product/service page keywords
   - FAQ content keywords

5. **Difficulty Assessment**
   - Low competition opportunities
   - Medium competition targets
   - High competition aspirational
   - Quick win suggestions

6. **Implementation Priority**
   - Immediate targets (high value, lower difficulty)
   - Medium-term goals
   - Long-term authority building
   - Content calendar suggestions`,
    expectedOutput: 'Comprehensive keyword strategy with clusters, intent mapping, and implementation priority.',
    useCases: [
      'SEO campaigns',
      'Content planning',
      'PPC research',
      'Competitive analysis',
    ],
    relatedSlugs: ['seo-blog-outline-generator', 'seo-competitor-rewrite-prompt'],
  },
  {
    id: '28',
    slug: 'seo-competitor-rewrite-prompt',
    title: 'SEO Competitor Rewrite Prompt',
    shortDescription: 'Create superior content that outranks competitor articles.',
    description: 'Analyze competitor content and create a framework for writing superior, more comprehensive content that can outrank existing top results.',
    category: 'prompt',
    subcategory: 'seo',
    tags: ['seo', 'competitor analysis', 'content', 'ranking', 'marketing'],
    difficulty: 'advanced',
    model: null,
    pricing: { type: 'free' },
    variables: ['TARGET_KEYWORD', 'COMPETITOR_CONTENT', 'YOUR_UNIQUE_ANGLE', 'RESOURCES'],
    content: `You are an SEO content strategist specializing in competitive content. Help create content that outranks competitors.

**Target Keyword:** [TARGET_KEYWORD]

**Competitor Content to Beat:** [COMPETITOR_CONTENT]

**Your Unique Angle:** [YOUR_UNIQUE_ANGLE]

**Available Resources:** [RESOURCES]

Create outranking strategy:

1. **Competitor Analysis**
   - Content structure breakdown
   - Keyword usage mapping
   - Strengths to match
   - Weaknesses to exploit
   - Missing information

2. **Content Gap Identification**
   - Topics not covered
   - Questions not answered
   - Depth lacking
   - Freshness issues
   - User intent gaps

3. **Superior Content Framework**
   - More comprehensive outline
   - Better structure
   - Enhanced depth
   - Unique value additions
   - Expert insights to include

4. **Differentiation Strategy**
   - Original research opportunities
   - Case studies to add
   - Expert quotes to include
   - Visual content improvements
   - Interactive elements

5. **Technical SEO Improvements**
   - Better header structure
   - Schema markup opportunities
   - Page speed considerations
   - Mobile optimization
   - Featured snippet targeting

6. **Promotion Strategy**
   - Link building opportunities
   - Social amplification
   - Community engagement
   - Update schedule`,
    expectedOutput: 'Complete strategy for creating content that outranks competitor articles.',
    useCases: [
      'Competitive SEO',
      'Content refreshes',
      'Market entry',
      'Traffic recovery',
    ],
    relatedSlugs: ['seo-blog-outline-generator', 'seo-keyword-expansion-prompt'],
  },
  {
    id: '29',
    slug: 'seo-high-intent-landing-page-prompt',
    title: 'SEO High-Intent Landing Page Prompt',
    shortDescription: 'Create conversion-optimized landing pages that rank for commercial keywords.',
    description: 'Design landing pages that satisfy both search engine requirements and conversion optimization best practices for high-intent commercial queries.',
    category: 'prompt',
    subcategory: 'seo',
    tags: ['seo', 'landing page', 'conversion', 'commercial', 'marketing'],
    difficulty: 'advanced',
    model: null,
    pricing: { type: 'free' },
    variables: ['TARGET_KEYWORD', 'PRODUCT_SERVICE', 'VALUE_PROPOSITION', 'TARGET_AUDIENCE'],
    content: `You are a conversion rate optimization and SEO expert. Create a high-converting, SEO-optimized landing page.

**Target Keyword:** [TARGET_KEYWORD]

**Product/Service:** [PRODUCT_SERVICE]

**Value Proposition:** [VALUE_PROPOSITION]

**Target Audience:** [TARGET_AUDIENCE]

Design landing page framework:

1. **Above the Fold**
   - Headline (keyword + benefit)
   - Subheadline (value prop)
   - Hero image/video concept
   - Primary CTA
   - Trust indicators

2. **SEO Content Section**
   - H2 with secondary keyword
   - Problem/solution narrative
   - Feature-benefit matrix
   - Keyword-rich descriptions
   - Internal link anchor text

3. **Social Proof Section**
   - Testimonial structure
   - Case study summaries
   - Trust badges
   - Stats and numbers
   - Client logos

4. **Feature Breakdown**
   - Feature sections with H3s
   - Benefit-focused copy
   - Visual representations
   - Comparison elements

5. **FAQ Section (Schema)**
   - 5-7 keyword-rich questions
   - Comprehensive answers
   - FAQ schema markup
   - Related search coverage

6. **Conversion Elements**
   - Multiple CTAs
   - Form optimization
   - Urgency elements
   - Risk reversal
   - Contact options

7. **Technical Requirements**
   - Page speed targets
   - Mobile layout
   - Schema markup list
   - Meta tags`,
    expectedOutput: 'Complete landing page framework optimized for both SEO and conversions.',
    useCases: [
      'Product launches',
      'Service pages',
      'Lead generation',
      'Sales pages',
    ],
    relatedSlugs: ['seo-meta-description-snippet-prompt', 'seo-blog-outline-generator'],
  },
  {
    id: '30',
    slug: 'seo-meta-description-snippet-prompt',
    title: 'SEO Meta Description & Snippet Set Prompt',
    shortDescription: 'Generate optimized meta descriptions and rich snippet content for better CTR.',
    description: 'Create compelling meta descriptions and structured data content that improves click-through rates from search engine results pages.',
    category: 'prompt',
    subcategory: 'seo',
    tags: ['seo', 'meta description', 'snippets', 'ctr', 'serp'],
    difficulty: 'beginner',
    model: null,
    pricing: { type: 'free' },
    variables: ['PAGE_TITLE', 'PAGE_CONTENT_SUMMARY', 'TARGET_KEYWORD', 'PAGE_TYPE'],
    content: `You are an SEO specialist focused on SERP optimization. Create meta descriptions and snippet content.

**Page Title:** [PAGE_TITLE]

**Content Summary:** [PAGE_CONTENT_SUMMARY]

**Target Keyword:** [TARGET_KEYWORD]

**Page Type:** [PAGE_TYPE]

Generate optimized elements:

1. **Meta Description Options** (5 variations)
   - Include target keyword naturally
   - Compelling hook/benefit
   - Call to action
   - 150-160 characters each
   - Different emotional angles

2. **Title Tag Variations** (3 options)
   - Primary keyword near start
   - Brand inclusion
   - 50-60 characters
   - Click-worthy format

3. **Featured Snippet Content**
   - Definition paragraph (40-50 words)
   - List format (5-7 items)
   - Table format (if applicable)
   - Step-by-step format

4. **FAQ Schema Content**
   - 5 relevant questions
   - Concise, complete answers
   - Keyword integration
   - User intent focused

5. **Rich Snippet Data**
   - Relevant schema type
   - Key properties
   - Implementation notes

6. **Social Meta Tags**
   - Open Graph title
   - OG description
   - Twitter card content
   - Image alt text`,
    expectedOutput: 'Complete set of meta descriptions, titles, and structured snippet content.',
    useCases: [
      'Page optimization',
      'CTR improvement',
      'SERP appearance',
      'Content updates',
    ],
    relatedSlugs: ['seo-blog-outline-generator', 'seo-high-intent-landing-page-prompt'],
  },

  // ============================================
  // Premium Prompts
  // ============================================
  {
    id: '31',
    slug: 'gemini-advanced-literature-review-generator',
    title: 'Gemini Advanced Literature Review Generator',
    shortDescription: 'Generate comprehensive, publication-ready literature reviews with advanced AI assistance.',
    description: 'This premium prompt provides a complete framework for generating sophisticated literature reviews suitable for academic publication, with systematic methodology, critical analysis, and synthesis guidance.',
    category: 'prompt',
    subcategory: 'gemini',
    tags: ['gemini', 'literature review', 'research', 'premium', 'publication'],
    difficulty: 'advanced',
    isPro: true,
    isFeatured: true,
    model: 'Gemini',
    pricing: { type: 'premium', price: 7 },
    variables: ['RESEARCH_DOMAIN', 'REVIEW_SCOPE', 'METHODOLOGY', 'TARGET_JOURNAL'],
    content: `You are a senior academic researcher with expertise in systematic literature reviews. Generate a publication-ready literature review framework.

**Research Domain:** [RESEARCH_DOMAIN]

**Review Scope:** [REVIEW_SCOPE]

**Methodology Preference:** [METHODOLOGY]

**Target Journal/Venue:** [TARGET_JOURNAL]

Generate comprehensive literature review:

1. **Systematic Search Protocol**
   - Database selection rationale
   - Search string development
   - Boolean operator optimization
   - Date range justification
   - Language and publication type criteria

2. **PRISMA-Compliant Framework**
   - Identification phase
   - Screening criteria
   - Eligibility assessment
   - Inclusion decision tree
   - Flow diagram structure

3. **Quality Assessment Matrix**
   - Study quality indicators
   - Bias risk assessment
   - Methodological rigor scoring
   - Evidence level classification
   - Confidence grading

4. **Thematic Analysis Structure**
   - Major theme identification
   - Theme relationship mapping
   - Subtheme organization
   - Cross-theme connections
   - Temporal evolution tracking

5. **Critical Synthesis Framework**
   - Agreement/disagreement mapping
   - Methodological comparison
   - Finding integration strategy
   - Gap identification systematic
   - Future direction derivation

6. **Publication-Ready Components**
   - Abstract structure
   - Introduction framework
   - Methods section template
   - Results organization
   - Discussion outline
   - Conclusion elements

7. **Supplementary Materials**
   - Search strategy documentation
   - Included studies table
   - Quality assessment results
   - PRISMA checklist completion`,
    expectedOutput: 'Complete publication-ready literature review framework with systematic methodology and critical synthesis.',
    useCases: [
      'Journal submissions',
      'Dissertation chapters',
      'Systematic reviews',
      'Meta-analyses',
    ],
    relatedSlugs: ['claude-multi-source-literature-review-prompt', 'literature-review-assistant'],
  },
  {
    id: '32',
    slug: 'chatgpt-graduate-thesis-builder',
    title: 'ChatGPT Graduate-Level Thesis Builder',
    shortDescription: 'Build comprehensive thesis frameworks with expert academic guidance.',
    description: 'This premium prompt provides complete thesis development support, from research question refinement through chapter structuring and defense preparation.',
    category: 'prompt',
    subcategory: 'chatgpt',
    tags: ['chatgpt', 'thesis', 'graduate', 'premium', 'dissertation'],
    difficulty: 'advanced',
    isPro: true,
    isFeatured: true,
    model: 'ChatGPT',
    pricing: { type: 'premium', price: 7 },
    variables: ['THESIS_TOPIC', 'DEGREE_LEVEL', 'DISCIPLINE', 'TIMELINE'],
    content: `You are an experienced thesis advisor with decades of graduate supervision experience. Provide comprehensive thesis development guidance.

**Thesis Topic:** [THESIS_TOPIC]

**Degree Level:** [DEGREE_LEVEL]

**Discipline:** [DISCIPLINE]

**Available Timeline:** [TIMELINE]

Develop complete thesis framework:

1. **Research Foundation**
   - Research question refinement
   - Hypothesis development (if applicable)
   - Theoretical framework selection
   - Conceptual model building
   - Operational definitions

2. **Literature Review Architecture**
   - Chapter structure
   - Thematic organization
   - Critical analysis approach
   - Synthesis methodology
   - Gap justification

3. **Methodology Framework**
   - Research design justification
   - Method selection rationale
   - Data collection protocols
   - Analysis plan
   - Validity/reliability strategies
   - Ethical considerations

4. **Chapter-by-Chapter Blueprint**
   For each chapter:
   - Purpose and contribution
   - Key arguments
   - Evidence requirements
   - Page/word targets
   - Dependencies

5. **Timeline and Milestones**
   - Phase breakdown
   - Key deliverables
   - Review points
   - Buffer time allocation
   - Defense preparation

6. **Quality Assurance**
   - Committee expectations
   - Common pitfalls
   - Excellence indicators
   - Revision strategy

7. **Defense Preparation**
   - Anticipated questions
   - Weakness acknowledgment strategy
   - Contribution articulation
   - Future research positioning`,
    expectedOutput: 'Complete thesis development framework with chapter blueprints, methodology, and defense preparation.',
    useCases: [
      'Master\'s thesis',
      'PhD dissertation',
      'Research proposals',
      'Academic planning',
    ],
    relatedSlugs: ['chatgpt-research-synthesis-prompt', 'gemini-graduate-level-essay-planner'],
  },
  {
    id: '33',
    slug: 'claude-deep-research-synthesizer',
    title: 'Claude Deep Research Synthesizer',
    shortDescription: 'Synthesize complex research into actionable insights with Claude\'s analytical depth.',
    description: 'This premium prompt leverages Claude\'s sophisticated reasoning to synthesize complex, multi-disciplinary research into coherent frameworks and actionable insights.',
    category: 'prompt',
    subcategory: 'claude',
    tags: ['claude', 'research', 'synthesis', 'premium', 'analysis'],
    difficulty: 'advanced',
    isPro: true,
    model: 'Claude',
    pricing: { type: 'premium', price: 9 },
    variables: ['RESEARCH_SOURCES', 'SYNTHESIS_OBJECTIVE', 'OUTPUT_FORMAT', 'STAKEHOLDER'],
    content: `You are a senior research analyst specializing in complex synthesis across disciplines. Provide deep research synthesis.

**Research Sources:** [RESEARCH_SOURCES]

**Synthesis Objective:** [SYNTHESIS_OBJECTIVE]

**Desired Output Format:** [OUTPUT_FORMAT]

**Primary Stakeholder:** [STAKEHOLDER]

Conduct deep synthesis:

1. **Source Deconstruction**
   - Extract key findings
   - Identify methodologies
   - Map theoretical bases
   - Note limitations
   - Assess evidence quality

2. **Cross-Source Analysis**
   - Convergence identification
   - Divergence mapping
   - Contradiction resolution
   - Complementarity assessment
   - Integration opportunities

3. **Pattern Recognition**
   - Emergent themes
   - Trend identification
   - Causal relationships
   - Correlation patterns
   - Anomaly detection

4. **Framework Development**
   - Integrative model creation
   - Relationship visualization
   - Hierarchy establishment
   - Process mapping
   - Decision framework

5. **Insight Generation**
   - Novel connections
   - Practical implications
   - Strategic recommendations
   - Risk identification
   - Opportunity mapping

6. **Stakeholder Translation**
   - Executive summary
   - Technical details
   - Action items
   - Implementation roadmap
   - Success metrics

7. **Future Directions**
   - Research gaps
   - Investigation priorities
   - Resource requirements
   - Timeline estimates
   - Success indicators`,
    expectedOutput: 'Deep research synthesis with integrative framework, actionable insights, and stakeholder-ready outputs.',
    useCases: [
      'Strategic planning',
      'Policy development',
      'Investment decisions',
      'Innovation research',
    ],
    relatedSlugs: ['chatgpt-research-synthesis-prompt', 'claude-high-level-research-assistant'],
  },
  {
    id: '34',
    slug: 'seo-long-form-article-blueprint',
    title: 'SEO Long-Form Article Blueprint',
    shortDescription: 'Create comprehensive, authority-building long-form content that dominates search.',
    description: 'This premium prompt provides a complete framework for creating pillar content that establishes topical authority, ranks for multiple keywords, and drives sustained organic traffic.',
    category: 'prompt',
    subcategory: 'seo',
    tags: ['seo', 'long-form', 'pillar content', 'premium', 'authority'],
    difficulty: 'advanced',
    isPro: true,
    model: null,
    pricing: { type: 'premium', price: 5 },
    variables: ['TOPIC_CLUSTER', 'PRIMARY_KEYWORD', 'WORD_COUNT_TARGET', 'BUSINESS_GOAL'],
    content: `You are a senior content strategist specializing in authority-building long-form content. Create a comprehensive article blueprint.

**Topic Cluster:** [TOPIC_CLUSTER]

**Primary Keyword:** [PRIMARY_KEYWORD]

**Word Count Target:** [WORD_COUNT_TARGET]

**Business Goal:** [BUSINESS_GOAL]

Generate comprehensive blueprint:

1. **Keyword Architecture**
   - Primary keyword placement strategy
   - Secondary keywords (15-20)
   - Long-tail variations (20-30)
   - Semantic keywords (15-20)
   - Question keywords (10-15)

2. **Content Structure**
   - Title variations (10 options)
   - Meta description (5 versions)
   - Header hierarchy (H1-H4)
   - Section word counts
   - Internal linking map

3. **Section-by-Section Guide**
   For each major section:
   - Key points to cover
   - Keywords to include
   - Expert quotes to seek
   - Data/stats to include
   - Internal link opportunities
   - External link suggestions

4. **Featured Snippet Optimization**
   - Definition snippets
   - List snippets
   - Table snippets
   - Process snippets
   - Comparison snippets

5. **Multimedia Integration**
   - Image concepts
   - Infographic outlines
   - Video opportunities
   - Interactive elements
   - Downloadable resources

6. **Link Building Strategy**
   - Linkable asset identification
   - Outreach angle development
   - Resource page targets
   - Expert contributor strategy
   - Original research opportunities

7. **Update and Maintenance**
   - Freshness indicators
   - Update schedule
   - Expansion opportunities
   - Competitor monitoring
   - Performance metrics`,
    expectedOutput: 'Complete long-form content blueprint with keyword architecture, section guides, and promotion strategy.',
    useCases: [
      'Pillar pages',
      'Ultimate guides',
      'Resource centers',
      'Authority building',
    ],
    relatedSlugs: ['seo-blog-outline-generator', 'seo-competitor-rewrite-prompt'],
  },
  {
    id: '35',
    slug: 'academic-argument-master-prompt',
    title: 'Academic Argument Master Prompt',
    shortDescription: 'Master the art of academic argumentation with this comprehensive framework.',
    description: 'This premium prompt provides expert-level guidance on constructing, analyzing, and defending sophisticated academic arguments across any discipline.',
    category: 'prompt',
    subcategory: 'essay-writing',
    tags: ['academic', 'argument', 'premium', 'master', 'advanced'],
    difficulty: 'advanced',
    isPro: true,
    isFeatured: true,
    model: null,
    pricing: { type: 'premium', price: 9 },
    variables: ['ARGUMENT_TOPIC', 'DISCIPLINE', 'AUDIENCE', 'COMPLEXITY_LEVEL'],
    content: `You are a master academic argumentation coach with expertise across disciplines. Provide comprehensive argument development guidance.

**Argument Topic:** [ARGUMENT_TOPIC]

**Discipline:** [DISCIPLINE]

**Target Audience:** [AUDIENCE]

**Complexity Level:** [COMPLEXITY_LEVEL]

Develop master argument framework:

1. **Argument Architecture**
   - Claim taxonomy (main, supporting, subsidiary)
   - Evidence hierarchy
   - Warrant structure
   - Backing requirements
   - Qualifier placement

2. **Logic Framework**
   - Deductive structure
   - Inductive reasoning
   - Abductive elements
   - Analogical arguments
   - Causal claims

3. **Evidence Strategy**
   - Evidence type selection
   - Source credibility matrix
   - Data integration
   - Expert testimony use
   - Case study deployment

4. **Counterargument Mastery**
   - Strongest objections
   - Steel man construction
   - Rebuttal development
   - Concession strategy
   - Synthesis moves

5. **Rhetorical Enhancement**
   - Ethos establishment
   - Pathos integration
   - Logos reinforcement
   - Kairos awareness
   - Style optimization

6. **Discipline-Specific Conventions**
   - Field expectations
   - Methodology norms
   - Citation practices
   - Discourse patterns
   - Evaluation criteria

7. **Defense Preparation**
   - Weakness anticipation
   - Q&A preparation
   - Pivot strategies
   - Confidence building
   - Response templates`,
    expectedOutput: 'Comprehensive argument master framework with logic, evidence, rhetoric, and defense preparation.',
    useCases: [
      'High-stakes essays',
      'Dissertation arguments',
      'Academic debates',
      'Publication submissions',
    ],
    relatedSlugs: ['argumentative-essay-builder', 'chatgpt-argument-analysis-prompt'],
  },

  // ═══════════════════════════════════════════════════════════
  // WORKFLOW TEMPLATES
  // ═══════════════════════════════════════════════════════════

  {
    id: 'wf-1',
    slug: 'research-infographic',
    title: 'Research Infographic',
    shortDescription:
      'Turn a citation, DOI, or research concept into a publication-ready infographic.',
    description:
      'Provide a research citation, DOI, or topic description and Esy produces a structured, data-driven infographic. The workflow extracts key findings, selects appropriate visualizations, generates the layout, and exports in multiple formats — all without prompting.',
    category: 'template',
    subcategory: 'essay-research',
    tags: [
      'infographic',
      'research',
      'data visualization',
      'workflow',
      'nano banana',
      'visual artifact',
    ],
    difficulty: 'beginner',
    isNew: true,
    isFeatured: true,
    content: '',
    variables: [],
    expectedOutput:
      'A publication-ready infographic exported as PNG (2x retina), SVG (web embed), and PDF (print 300 DPI).',
    useCases: [
      'Academic conference posters',
      'Research paper supplementary visuals',
      'Grant proposal figures',
      'Social media research summaries',
      'Classroom educational materials',
    ],
    relatedSlugs: ['research-paper-builder'],
    model: 'Gemini',
    pricing: { type: 'premium', price: 2.99 },
    // Workflow-specific fields
    isWorkflow: true,
    engine: 'Nano Banana Pro',
    estimatedTime: '~2 min',
    outputFormats: ['PNG', 'SVG', 'PDF'],
    inputRequirements: [
      'Citation, DOI, or topic description',
      'Data or statistics (optional — auto-extracted if not provided)',
      'Brand palette preference (optional)',
    ],
    workflowStages: [
      {
        id: 'intake',
        label: 'Intake',
        sublabel: 'Citation or topic',
      },
      {
        id: 'research',
        label: 'Research',
        sublabel: 'Extract key findings',
      },
      {
        id: 'design',
        label: 'Design',
        sublabel: 'Layout & viz selection',
      },
      {
        id: 'render',
        label: 'Render',
        sublabel: 'Generate visual',
      },
      {
        id: 'artifact',
        label: 'Artifact',
        sublabel: 'PNG · SVG · PDF',
        isFinal: true,
      },
    ],
    workflowDetails: [
      {
        id: 'intake',
        title: 'Intake',
        description:
          'Hand Esy a citation, DOI, or topic. Optional data, statistics, and a brand palette sharpen the result.',
        examples: [
          { label: 'Input', value: 'DOI: 10.1038/s41586-022-05172-4' },
          { label: 'Optional', value: 'Brand palette, key statistics' },
        ],
      },
      {
        id: 'research',
        title: 'Research',
        description:
          'Esy reads the source, extracts the key findings, and pulls the figures worth visualizing.',
        examples: [
          { label: 'Extracts', value: 'Headline findings, comparative stats, trends' },
          { label: 'Output', value: 'Structured fact set' },
        ],
      },
      {
        id: 'design',
        title: 'Design',
        description:
          'Findings are mapped to the right chart types and arranged into a balanced, readable layout.',
        examples: [
          { label: 'Selects', value: 'Bar, line, and proportion charts' },
          { label: 'Layout', value: 'Title, hero stat, supporting panels' },
        ],
      },
      {
        id: 'render',
        title: 'Render',
        description:
          'Esy generates the finished visual with the selected palette and exports at production resolution.',
        examples: [
          { label: 'Engine', value: 'Nano Banana Pro' },
          { label: 'Output', value: 'Composed infographic' },
        ],
      },
      {
        id: 'artifact',
        title: 'Artifact',
        description:
          'The result includes print- and web-ready exports plus the resolved data, palette, and run history.',
        examples: [
          { label: 'Formats', value: 'PNG (2x), SVG, PDF (300 DPI)' },
          { label: 'Provenance', value: 'Source, data, palette, run history' },
        ],
      },
    ],
    sampleArtifacts: [
      {
        title: 'The Rise of Remote Work 2020–2024',
        description:
          'Adoption rates by industry, year-over-year growth trends, and employee satisfaction data synthesized into a single infographic.',
      },
      {
        title: 'Global Water Scarcity Indicators',
        description:
          'Geospatial data mapped with consumption trends and projected shortages by region.',
      },
    ],
  },

  // ─── Argumentative Essay ────────────────────────────────────
  {
    id: 'wf-2',
    slug: 'argumentative-essay',
    title: 'Argumentative Essay',
    shortDescription:
      'Build a thesis-driven essay with evidence, counterarguments, and a compelling conclusion.',
    description:
      'Provide your topic and stance, and Esy researches supporting evidence, maps counterarguments, and drafts a fully cited argumentative essay. Covers argumentative, persuasive, and synthesis essay formats.',
    category: 'template',
    subcategory: 'essay-argumentative',
    tags: [
      'essay',
      'argumentative',
      'persuasive',
      'synthesis',
      'thesis',
      'debate',
      'evidence',
      'academic',
      'workflow',
    ],
    difficulty: 'intermediate',
    isNew: true,
    isFeatured: true,
    content: '',
    variables: [],
    expectedOutput:
      'A fully structured argumentative essay with thesis, evidence paragraphs, counterargument section, and conclusion — exported as DOCX or PDF.',
    useCases: [
      'College coursework assignments',
      'Debate preparation',
      'Policy position papers',
      'Op-ed drafts',
      'Standardized test essay practice',
    ],
    relatedSlugs: [
      'analytical-essay',
      'expository-essay',
      'narrative-essay',
      'research-paper',
      'college-application-essay',
    ],
    model: 'Claude',
    pricing: { type: 'premium', price: 1.49 },
    isWorkflow: true,
    engine: 'Claude',
    estimatedTime: '~3 min',
    outputFormats: ['DOCX', 'PDF'],
    inputRequirements: [
      'Topic or question',
      'Your position or stance',
      'Target audience (optional)',
      'Required sources (optional)',
    ],
    workflowStages: [
      { id: 'intake', label: 'Intake', sublabel: 'Topic & stance' },
      { id: 'research', label: 'Research', sublabel: 'Evidence & counterargs' },
      { id: 'outline', label: 'Outline', sublabel: 'Thesis & evidence map' },
      { id: 'draft', label: 'Draft', sublabel: 'Argument composition' },
      { id: 'cite', label: 'Cite & Format', sublabel: 'APA/MLA + counterarg check' },
      { id: 'artifact', label: 'Artifact', sublabel: 'DOCX · PDF', isFinal: true },
    ],
    workflowDetails: [
      {
        id: 'intake',
        title: 'Intake',
        description:
          'Give Esy your topic and the stance you want to defend. Audience and required sources are optional.',
        examples: [
          { label: 'Topic', value: 'Should universities abolish standardized testing?' },
          { label: 'Stance', value: 'Yes — equity outweighs predictive value' },
        ],
      },
      {
        id: 'research',
        title: 'Research',
        description:
          'Esy gathers supporting evidence and maps the strongest counterarguments so the essay can answer them.',
        examples: [
          { label: 'Evidence', value: 'Studies on predictive validity & equity' },
          { label: 'Counterargs', value: 'Merit signaling, comparability' },
        ],
      },
      {
        id: 'outline',
        title: 'Outline',
        description:
          'Evidence is organized under a clear thesis, with each body paragraph assigned a claim and its support.',
        examples: [
          { label: 'Thesis', value: 'One arguable, specific claim' },
          { label: 'Map', value: 'Claim → evidence per paragraph' },
        ],
      },
      {
        id: 'draft',
        title: 'Draft',
        description:
          'Esy composes the argument — thesis, evidence paragraphs, a counterargument section, and conclusion.',
        examples: [
          { label: 'Structure', value: 'Intro · evidence · rebuttal · conclusion' },
          { label: 'Output', value: 'Full argumentative draft' },
        ],
      },
      {
        id: 'cite',
        title: 'Cite & Format',
        description:
          'Citations are formatted to your style and a counterargument check confirms the rebuttal holds.',
        examples: [
          { label: 'Citations', value: 'APA or MLA, fully formatted' },
          { label: 'Check', value: 'Counterargument addressed' },
        ],
      },
      {
        id: 'artifact',
        title: 'Artifact',
        description:
          'The finished essay is exported with formatting intact, alongside its sources and run history.',
        examples: [
          { label: 'Formats', value: 'DOCX, PDF' },
          { label: 'Provenance', value: 'Sources, citations, run history' },
        ],
      },
    ],
    sampleArtifacts: [
      {
        title: 'Should Universities Abolish Standardized Testing?',
        description:
          'A five-paragraph argument examining equity, predictive validity, and institutional incentives, with APA citations.',
      },
      {
        title: 'The Case for Universal Basic Income',
        description:
          'A synthesis essay weaving economic research, pilot program data, and philosophical arguments into a cohesive position.',
      },
    ],
  },

  // ─── Analytical Essay ───────────────────────────────────────
  {
    id: 'wf-3',
    slug: 'analytical-essay',
    title: 'Analytical Essay',
    shortDescription:
      'Deconstruct a text, event, or concept through a critical analytical framework.',
    description:
      'Provide your source material and analytical lens, and Esy performs close reading, identifies patterns and themes, and produces a structured analytical essay with textual evidence. Covers analytical, literary analysis, and critical review formats.',
    category: 'template',
    subcategory: 'essay-analytical',
    tags: [
      'essay',
      'analytical',
      'literary analysis',
      'critical review',
      'interpretation',
      'close reading',
      'academic',
      'workflow',
    ],
    difficulty: 'intermediate',
    isNew: true,
    isFeatured: false,
    content: '',
    variables: [],
    expectedOutput:
      'A structured analytical essay with thesis, close-reading evidence, interpretive framework, and textual citations — exported as DOCX or PDF.',
    useCases: [
      'Literature course assignments',
      'Film or media analysis',
      'Historical document analysis',
      'Art criticism',
      'Peer review responses',
    ],
    relatedSlugs: [
      'argumentative-essay',
      'expository-essay',
      'narrative-essay',
      'research-paper',
      'college-application-essay',
    ],
    model: 'Claude',
    pricing: { type: 'premium', price: 1.49 },
    isWorkflow: true,
    engine: 'Claude',
    estimatedTime: '~3 min',
    outputFormats: ['DOCX', 'PDF'],
    inputRequirements: [
      'Source text or subject',
      'Analytical lens or framework',
      'Specific focus or question',
    ],
    workflowStages: [
      { id: 'intake', label: 'Intake', sublabel: 'Text & lens' },
      { id: 'research', label: 'Research', sublabel: 'Source close-reading' },
      { id: 'outline', label: 'Outline', sublabel: 'Framework & sections' },
      { id: 'draft', label: 'Draft', sublabel: 'Interpretive analysis' },
      { id: 'cite', label: 'Cite & Format', sublabel: 'Textual citations' },
      { id: 'artifact', label: 'Artifact', sublabel: 'DOCX · PDF', isFinal: true },
    ],
    workflowDetails: [
      {
        id: 'intake',
        title: 'Intake',
        description:
          'Provide the text or subject and the analytical lens you want Esy to read it through.',
        examples: [
          { label: 'Source', value: 'Toni Morrison, Beloved' },
          { label: 'Lens', value: 'Symbolism — water, trees, color' },
        ],
      },
      {
        id: 'research',
        title: 'Research',
        description:
          'Esy performs a close reading, surfacing patterns, motifs, and the passages that anchor them.',
        examples: [
          { label: 'Finds', value: 'Recurring motifs & key passages' },
          { label: 'Output', value: 'Annotated evidence set' },
        ],
      },
      {
        id: 'outline',
        title: 'Outline',
        description:
          'The interpretation is structured around a framework, with each section tied to specific textual evidence.',
        examples: [
          { label: 'Framework', value: 'Motif → meaning → significance' },
          { label: 'Map', value: 'Evidence assigned per section' },
        ],
      },
      {
        id: 'draft',
        title: 'Draft',
        description:
          'Esy writes the analysis, integrating quotations and building an interpretive argument passage by passage.',
        examples: [
          { label: 'Method', value: 'Quote → analysis → claim' },
          { label: 'Output', value: 'Full analytical draft' },
        ],
      },
      {
        id: 'cite',
        title: 'Cite & Format',
        description:
          'Textual citations are formatted and checked against the source for accuracy.',
        examples: [
          { label: 'Citations', value: 'In-text + works cited' },
          { label: 'Check', value: 'Quotes verified to source' },
        ],
      },
      {
        id: 'artifact',
        title: 'Artifact',
        description:
          'The essay exports with citations and the run history that shows how each reading was reached.',
        examples: [
          { label: 'Formats', value: 'DOCX, PDF' },
          { label: 'Provenance', value: 'Source, citations, run history' },
        ],
      },
    ],
    sampleArtifacts: [
      {
        title: 'Symbolism in Toni Morrison\'s Beloved',
        description:
          'A close-reading analysis tracing the motif of water, trees, and color through the novel\'s key passages.',
      },
      {
        title: 'Power Dynamics in Orwell\'s 1984',
        description:
          'A Foucauldian analysis of surveillance, language control, and institutional power in the dystopian narrative.',
      },
    ],
  },

  // ─── Expository Essay ───────────────────────────────────────
  {
    id: 'wf-4',
    slug: 'expository-essay',
    title: 'Expository Essay',
    shortDescription:
      'Explain a topic clearly and objectively with facts, data, and logical structure.',
    description:
      'Provide your topic and scope, and Esy researches the subject, selects the appropriate organizational pattern, and produces a clear, well-sourced expository essay. Covers expository, cause and effect, compare and contrast, definition, and process essay formats.',
    category: 'template',
    subcategory: 'essay-expository',
    tags: [
      'essay',
      'expository',
      'cause and effect',
      'compare and contrast',
      'definition',
      'process',
      'informative',
      'academic',
      'workflow',
    ],
    difficulty: 'beginner',
    isNew: true,
    isFeatured: false,
    content: '',
    variables: [],
    expectedOutput:
      'A clearly structured expository essay with topic sentences, factual evidence, logical transitions, and source attributions — exported as DOCX or PDF.',
    useCases: [
      'Introductory course assignments',
      'Textbook chapter summaries',
      'How-to guides and explainers',
      'Science and technology overviews',
      'Comparative analyses',
    ],
    relatedSlugs: [
      'argumentative-essay',
      'analytical-essay',
      'narrative-essay',
      'research-paper',
      'college-application-essay',
    ],
    model: 'Claude',
    pricing: { type: 'premium', price: 1.49 },
    isWorkflow: true,
    engine: 'Claude',
    estimatedTime: '~3 min',
    outputFormats: ['DOCX', 'PDF'],
    inputRequirements: [
      'Topic or concept',
      'Essay subtype (compare/contrast, cause/effect, definition, process)',
      'Scope and depth level',
    ],
    workflowStages: [
      { id: 'intake', label: 'Intake', sublabel: 'Topic & scope' },
      { id: 'research', label: 'Research', sublabel: 'Facts & data' },
      { id: 'outline', label: 'Outline', sublabel: 'Logic structure' },
      { id: 'draft', label: 'Draft', sublabel: 'Explanatory prose' },
      { id: 'cite', label: 'Cite & Format', sublabel: 'Source attribution' },
      { id: 'artifact', label: 'Artifact', sublabel: 'DOCX · PDF', isFinal: true },
    ],
    workflowDetails: [
      {
        id: 'intake',
        title: 'Intake',
        description:
          'Name the topic and pick the organizational pattern — compare/contrast, cause/effect, definition, or process.',
        examples: [
          { label: 'Topic', value: 'How CRISPR gene editing works' },
          { label: 'Pattern', value: 'Process explanation' },
        ],
      },
      {
        id: 'research',
        title: 'Research',
        description:
          'Esy gathers the facts, data, and definitions needed to explain the topic accurately and objectively.',
        examples: [
          { label: 'Gathers', value: 'Mechanisms, data, definitions' },
          { label: 'Output', value: 'Sourced fact set' },
        ],
      },
      {
        id: 'outline',
        title: 'Outline',
        description:
          'Information is sequenced into a logical structure with clear topic sentences and transitions.',
        examples: [
          { label: 'Structure', value: 'Step-by-step or point-by-point' },
          { label: 'Map', value: 'Topic sentence per section' },
        ],
      },
      {
        id: 'draft',
        title: 'Draft',
        description:
          'Esy writes clear, neutral explanatory prose that moves the reader through the topic.',
        examples: [
          { label: 'Tone', value: 'Objective, informative' },
          { label: 'Output', value: 'Full expository draft' },
        ],
      },
      {
        id: 'cite',
        title: 'Cite & Format',
        description:
          'Facts are attributed to their sources and formatted in your chosen citation style.',
        examples: [
          { label: 'Citations', value: 'APA or MLA' },
          { label: 'Check', value: 'Claims attributed to sources' },
        ],
      },
      {
        id: 'artifact',
        title: 'Artifact',
        description:
          'The explainer exports cleanly with its sources and run history attached.',
        examples: [
          { label: 'Formats', value: 'DOCX, PDF' },
          { label: 'Provenance', value: 'Sources, citations, run history' },
        ],
      },
    ],
    sampleArtifacts: [
      {
        title: 'How CRISPR Gene Editing Works',
        description:
          'A process essay explaining the mechanism, applications, and ethical considerations of CRISPR-Cas9 technology.',
      },
      {
        title: 'Comparing Keynesian and Austrian Economics',
        description:
          'A compare-and-contrast essay examining fiscal policy, market intervention, and business cycle theories across two schools of thought.',
      },
    ],
  },

  // ─── Narrative Essay ────────────────────────────────────────
  {
    id: 'wf-5',
    slug: 'narrative-essay',
    title: 'Narrative Essay',
    shortDescription:
      'Tell a compelling story grounded in personal experience, research, and vivid detail.',
    description:
      'Provide your theme and perspective, and Esy researches contextual background, structures a narrative arc, and crafts a polished essay with sensory detail and reflection. Covers narrative, descriptive, and reflective essay formats.',
    category: 'template',
    subcategory: 'essay-narrative',
    tags: [
      'essay',
      'narrative',
      'descriptive',
      'reflective',
      'personal',
      'storytelling',
      'creative nonfiction',
      'academic',
      'workflow',
    ],
    difficulty: 'beginner',
    isNew: true,
    isFeatured: false,
    content: '',
    variables: [],
    expectedOutput:
      'A polished narrative essay with story arc, sensory detail, dialogue (if applicable), and reflective conclusion — exported as DOCX or PDF.',
    useCases: [
      'Creative writing courses',
      'Personal essay portfolios',
      'Memoir excerpts',
      'Journalism and longform features',
      'Scholarship applications',
    ],
    relatedSlugs: [
      'argumentative-essay',
      'analytical-essay',
      'expository-essay',
      'research-paper',
      'college-application-essay',
    ],
    model: 'Claude',
    pricing: { type: 'premium', price: 1.49 },
    isWorkflow: true,
    engine: 'Claude',
    estimatedTime: '~3 min',
    outputFormats: ['DOCX', 'PDF'],
    inputRequirements: [
      'Theme or experience',
      'Narrative perspective (first-person, third-person)',
      'Tone or mood preference (optional)',
    ],
    workflowStages: [
      { id: 'intake', label: 'Intake', sublabel: 'Theme & voice' },
      { id: 'research', label: 'Research', sublabel: 'Context & setting' },
      { id: 'outline', label: 'Outline', sublabel: 'Story arc & scenes' },
      { id: 'draft', label: 'Draft', sublabel: 'Scene writing' },
      { id: 'cite', label: 'Cite & Format', sublabel: 'Style & voice polish' },
      { id: 'artifact', label: 'Artifact', sublabel: 'DOCX · PDF', isFinal: true },
    ],
    workflowDetails: [
      {
        id: 'intake',
        title: 'Intake',
        description:
          'Share the theme or experience, the narrative voice, and any tone or mood you want to set.',
        examples: [
          { label: 'Theme', value: 'A pivotal summer' },
          { label: 'Voice', value: 'First-person, reflective' },
        ],
      },
      {
        id: 'research',
        title: 'Research',
        description:
          'Esy builds out the context and setting so the story stays grounded in concrete, believable detail.',
        examples: [
          { label: 'Builds', value: 'Setting, period, sensory context' },
          { label: 'Output', value: 'Background notes' },
        ],
      },
      {
        id: 'outline',
        title: 'Outline',
        description:
          'The experience is shaped into a story arc with distinct scenes and a clear turning point.',
        examples: [
          { label: 'Arc', value: 'Setup · rising action · turn · reflection' },
          { label: 'Map', value: 'Scene-by-scene beats' },
        ],
      },
      {
        id: 'draft',
        title: 'Draft',
        description:
          'Esy writes the scenes with sensory detail, pacing, and dialogue where it fits.',
        examples: [
          { label: 'Craft', value: 'Show, don\'t tell; sensory detail' },
          { label: 'Output', value: 'Full narrative draft' },
        ],
      },
      {
        id: 'cite',
        title: 'Cite & Format',
        description:
          'A final pass polishes voice, tightens pacing, and locks consistent style throughout.',
        examples: [
          { label: 'Polish', value: 'Voice & pacing pass' },
          { label: 'Check', value: 'Consistent tense & tone' },
        ],
      },
      {
        id: 'artifact',
        title: 'Artifact',
        description:
          'The finished essay exports with formatting intact and its run history attached.',
        examples: [
          { label: 'Formats', value: 'DOCX, PDF' },
          { label: 'Provenance', value: 'Draft history & run record' },
        ],
      },
    ],
    sampleArtifacts: [
      {
        title: 'The Summer That Changed Everything',
        description:
          'A reflective narrative tracing a pivotal summer experience through vivid scenes and personal growth.',
      },
      {
        title: 'Finding Home in a Foreign Language',
        description:
          'A descriptive essay exploring identity and belonging through the lens of language acquisition and cultural immersion.',
      },
    ],
  },

  // ─── Research Paper ─────────────────────────────────────────
  {
    id: 'wf-6',
    slug: 'research-paper',
    title: 'Research Paper',
    shortDescription:
      'Produce a fully cited academic research paper with literature review, methodology, and findings.',
    description:
      'Provide your research question and field, and Esy conducts a literature review, designs a methodology section, drafts findings and discussion, and formats the full paper with your chosen citation style. Covers research papers in MLA, APA, and Chicago formats.',
    category: 'template',
    subcategory: 'essay-research',
    tags: [
      'essay',
      'research paper',
      'MLA',
      'APA',
      'Chicago',
      'literature review',
      'methodology',
      'citations',
      'thesis',
      'academic',
      'workflow',
    ],
    difficulty: 'advanced',
    isNew: true,
    isFeatured: true,
    content: '',
    variables: [],
    expectedOutput:
      'A complete research paper with abstract, literature review, methodology, findings, discussion, and bibliography — exported as DOCX or PDF.',
    useCases: [
      'Graduate-level coursework',
      'Undergraduate capstone projects',
      'Conference paper submissions',
      'Journal article drafts',
      'Grant proposal literature reviews',
    ],
    relatedSlugs: [
      'argumentative-essay',
      'analytical-essay',
      'expository-essay',
      'narrative-essay',
      'college-application-essay',
    ],
    model: 'Claude',
    pricing: { type: 'premium', price: 1.49 },
    isWorkflow: true,
    engine: 'Claude',
    estimatedTime: '~5 min',
    outputFormats: ['DOCX', 'PDF'],
    inputRequirements: [
      'Research question',
      'Academic field or discipline',
      'Citation format (MLA, APA, or Chicago)',
      'Key sources (optional)',
    ],
    workflowStages: [
      { id: 'intake', label: 'Intake', sublabel: 'Question & field' },
      { id: 'research', label: 'Research', sublabel: 'Literature review' },
      { id: 'outline', label: 'Outline', sublabel: 'Methodology design' },
      { id: 'draft', label: 'Draft', sublabel: 'Findings & discussion' },
      { id: 'cite', label: 'Cite & Format', sublabel: 'Full bibliography' },
      { id: 'artifact', label: 'Artifact', sublabel: 'DOCX · PDF', isFinal: true },
    ],
    workflowDetails: [
      {
        id: 'intake',
        title: 'Intake',
        description:
          'Provide your research question, field, and citation format. Known sources can be supplied up front.',
        examples: [
          { label: 'Question', value: 'Does social media affect adolescent mental health?' },
          { label: 'Format', value: 'APA · psychology' },
        ],
      },
      {
        id: 'research',
        title: 'Research',
        description:
          'Esy conducts a literature review, synthesizing prior findings and identifying the gap your paper addresses.',
        examples: [
          { label: 'Reviews', value: '30+ studies synthesized' },
          { label: 'Output', value: 'Literature review & gap' },
        ],
      },
      {
        id: 'outline',
        title: 'Outline',
        description:
          'A methodology section is designed and the paper is structured from abstract through discussion.',
        examples: [
          { label: 'Designs', value: 'Methodology & section plan' },
          { label: 'Structure', value: 'Abstract → methods → findings → discussion' },
        ],
      },
      {
        id: 'draft',
        title: 'Draft',
        description:
          'Esy drafts the findings and discussion, building the argument from the reviewed evidence.',
        examples: [
          { label: 'Writes', value: 'Findings, analysis, discussion' },
          { label: 'Output', value: 'Full paper draft' },
        ],
      },
      {
        id: 'cite',
        title: 'Cite & Format',
        description:
          'Every source is formatted and a complete bibliography is assembled in your chosen style.',
        examples: [
          { label: 'Citations', value: 'MLA, APA, or Chicago' },
          { label: 'Output', value: 'Full bibliography' },
        ],
      },
      {
        id: 'artifact',
        title: 'Artifact',
        description:
          'The complete paper exports with bibliography, sources, and full run provenance.',
        examples: [
          { label: 'Formats', value: 'DOCX, PDF' },
          { label: 'Provenance', value: 'Sources, citations, run history' },
        ],
      },
    ],
    sampleArtifacts: [
      {
        title: 'The Impact of Social Media on Adolescent Mental Health',
        description:
          'A psychology research paper reviewing 30+ studies on screen time, social comparison, and anxiety in teens aged 13–18.',
      },
      {
        title: 'Renewable Energy Adoption in Developing Nations',
        description:
          'An economics research paper analyzing policy frameworks, investment trends, and infrastructure barriers across sub-Saharan Africa.',
      },
    ],
  },

  // ─── College Application Essay ──────────────────────────────
  {
    id: 'wf-7',
    slug: 'college-application-essay',
    title: 'College Application Essay',
    shortDescription:
      'Craft a standout personal statement or supplemental essay for college admissions.',
    description:
      'Provide the essay prompt, target schools, and your key experiences, and Esy researches program fit, structures a compelling narrative arc, and drafts a polished personal essay that meets word count and tone requirements. Covers Common App essays, supplementals, and personal statements.',
    category: 'template',
    subcategory: 'essay-college-application',
    tags: [
      'essay',
      'college application',
      'personal statement',
      'supplemental',
      'admissions',
      'Common App',
      'academic',
      'workflow',
    ],
    difficulty: 'intermediate',
    isNew: true,
    isFeatured: true,
    content: '',
    variables: [],
    expectedOutput:
      'A polished college application essay meeting the prompt requirements, word count, and authentic personal voice — exported as DOCX or PDF.',
    useCases: [
      'Common App main essay',
      'University-specific supplemental essays',
      'Scholarship personal statements',
      'Graduate school statements of purpose',
      'Transfer application essays',
    ],
    relatedSlugs: [
      'argumentative-essay',
      'analytical-essay',
      'expository-essay',
      'narrative-essay',
      'research-paper',
    ],
    model: 'Claude',
    pricing: { type: 'premium', price: 1.49 },
    isWorkflow: true,
    engine: 'Claude',
    estimatedTime: '~3 min',
    outputFormats: ['DOCX', 'PDF'],
    inputRequirements: [
      'Essay prompt or question',
      'Target school(s)',
      'Word count limit',
      'Key experiences or themes to highlight',
    ],
    workflowStages: [
      { id: 'intake', label: 'Intake', sublabel: 'Prompt & goals' },
      { id: 'research', label: 'Research', sublabel: 'Program research' },
      { id: 'outline', label: 'Outline', sublabel: 'Narrative arc' },
      { id: 'draft', label: 'Draft', sublabel: 'Personal narrative' },
      { id: 'cite', label: 'Cite & Format', sublabel: 'Word count & tone' },
      { id: 'artifact', label: 'Artifact', sublabel: 'DOCX · PDF', isFinal: true },
    ],
    workflowDetails: [
      {
        id: 'intake',
        title: 'Intake',
        description:
          'Give Esy the prompt, your target schools, the word limit, and the experiences you want to highlight.',
        examples: [
          { label: 'Prompt', value: 'Why this university? (MIT · engineering)' },
          { label: 'Limit', value: '350 words' },
        ],
      },
      {
        id: 'research',
        title: 'Research',
        description:
          'Esy researches program fit — specific labs, faculty, and values — so the essay feels genuinely tailored.',
        examples: [
          { label: 'Finds', value: 'Relevant labs, faculty, programs' },
          { label: 'Output', value: 'Program-fit notes' },
        ],
      },
      {
        id: 'outline',
        title: 'Outline',
        description:
          'Your experiences are arranged into a narrative arc that answers the prompt and shows growth.',
        examples: [
          { label: 'Arc', value: 'Hook · experience · reflection · fit' },
          { label: 'Map', value: 'Beat-by-beat plan' },
        ],
      },
      {
        id: 'draft',
        title: 'Draft',
        description:
          'Esy drafts a personal essay in an authentic voice, connecting your story to the school.',
        examples: [
          { label: 'Voice', value: 'Authentic, first-person' },
          { label: 'Output', value: 'Full personal essay' },
        ],
      },
      {
        id: 'cite',
        title: 'Cite & Format',
        description:
          'The draft is trimmed to the word limit and tuned for tone and admissions expectations.',
        examples: [
          { label: 'Fit', value: 'Trimmed to word count' },
          { label: 'Check', value: 'Tone & prompt alignment' },
        ],
      },
      {
        id: 'artifact',
        title: 'Artifact',
        description:
          'The polished essay exports ready to paste into the application, with its draft history retained.',
        examples: [
          { label: 'Formats', value: 'DOCX, PDF' },
          { label: 'Provenance', value: 'Draft history & run record' },
        ],
      },
    ],
    sampleArtifacts: [
      {
        title: 'Why This University: Engineering at MIT',
        description:
          'A supplemental essay connecting specific MIT labs, faculty research, and the applicant\'s robotics experience.',
      },
      {
        title: 'Overcoming Adversity: A First-Generation Story',
        description:
          'A Common App personal statement weaving family history, academic perseverance, and community impact into a cohesive narrative.',
      },
    ],
  },
  {
    id: 'wf-8',
    slug: 'generate-clip-art-asset',
    title: 'Generate Clip Art Asset',
    shortDescription:
      'Generate isolated clip art with style controls, background removal, and provenance.',
    description:
      'Describe the asset you need, choose a style and aspect ratio, and Esy runs the clip.art image workflow. The workflow resolves the provider prompt, generates the image with gpt-image-2, removes the background with birefnet-light when enabled, and returns a review-ready visual artifact.',
    category: 'template',
    subcategory: 'clip-art',
    tags: [
      'clip-art',
      'clip art',
      'visual artifact',
      'image generation',
      'background removal',
      'gpt-image-2',
      'birefnet-light',
      'workflow',
    ],
    difficulty: 'beginner',
    isNew: true,
    isFeatured: true,
    content: '',
    variables: [],
    expectedOutput:
      'A review-ready clip art artifact with raw and processed image assets, resolved prompt, style, aspect ratio, storage metadata, and cost provenance.',
    useCases: [
      'clip.art catalog asset generation',
      'Isolated illustrations for packs and collections',
      'Transparent-background clip art',
      'Style-consistent visual asset batches',
      'Internal review queues before publishing',
    ],
    relatedSlugs: ['research-infographic'],
    model: null,
    pricing: { type: 'premium' },
    isWorkflow: true,
    engine: 'gpt-image-2',
    estimatedTime: '~30 sec',
    outputFormats: ['PNG', 'WEBP'],
    inputRequirements: [
      'Clip art prompt or subject',
      'Style preset such as flat, outline, cartoon, sticker, or watercolor',
      'Aspect ratio: 1:1, 3:4, or 4:3',
      'Background removal preference',
    ],
    workflowStages: [
      { id: 'describe', label: 'Describe', sublabel: 'Prompt, style, and aspect ratio' },
      { id: 'transform', label: 'Transform', sublabel: 'Turns your idea into a clear image prompt' },
      { id: 'generate', label: 'Generate', sublabel: 'gpt-image-2 image generation' },
      { id: 'remove-background', label: 'Remove', sublabel: 'Background removal with birefnet-light' },
      { id: 'artifact', label: 'Artifact', sublabel: 'PNG, WEBP, prompt, model, style, and run history', isFinal: true },
    ],
    workflowDetails: [
      {
        id: 'describe',
        title: 'Describe',
        description:
          'Start with the subject, style, aspect ratio, and whether you want the background removed.',
        examples: [
          { label: 'Input', value: 'A friendly fox waving' },
          { label: 'Style', value: 'Flat clip art, 1:1, background removed' },
        ],
      },
      {
        id: 'transform',
        title: 'Transform',
        description:
          'Esy turns the rough description into a structured image prompt the model can follow.',
        examples: [
          { label: 'Before', value: 'A friendly fox waving' },
          {
            label: 'After',
            value:
              'A friendly fox waving, flat vector clip art, isolated object, clean edges, centered composition, no text.',
          },
        ],
      },
      {
        id: 'generate',
        title: 'Generate',
        description:
          'The image is generated with gpt-image-2 using the transformed prompt and selected style.',
        examples: [
          { label: 'Model', value: 'gpt-image-2' },
          { label: 'Output', value: 'Raw clip art image' },
        ],
      },
      {
        id: 'remove-background',
        title: 'Remove',
        description:
          'When enabled, background removal creates a cleaner isolated asset for download or review.',
        examples: [
          { label: 'Model', value: 'birefnet-light' },
          { label: 'Result', value: 'Transparent-background asset' },
        ],
      },
      {
        id: 'artifact',
        title: 'Artifact',
        description:
          'The final result includes the image files plus the prompt, model, style, and run history.',
        examples: [
          { label: 'Formats', value: 'PNG, WEBP' },
          { label: 'Provenance', value: 'Prompt, model, style, and run history' },
        ],
      },
    ],
    // Real artifacts produced by the Generate Clip Art Asset workflow,
    // served from ESY R2 via images.esy.com. Each entry mirrors a record
    // shown in app.esy.com/artifacts; key shape follows the MVP convention:
    // artifacts/{artifact_type}/{artifact_id}/processed.webp.
    sampleArtifacts: [
      {
        title: "Bunny's Pancake Breakfast",
        description: 'Cartoon style with bold outlines and flat fills — generated via gpt-image-2, post-processed, and stored as an Esy artifact.',
        imageUrl: 'https://images.esy.com/artifacts/clip-art/artifact-12559e5e/processed.webp',
        imageAlt: 'Cartoon blue bunny eating pancakes in bed',
        imageAspectRatio: '1:1',
      },
      {
        title: 'Sleeping Duckling',
        description: 'Chibi style with soft palette and clean transparent edges — runtime metadata captured for review.',
        imageUrl: 'https://images.esy.com/artifacts/clip-art/artifact-5876fdfb/processed.webp',
        imageAlt: 'Chibi-style sleeping yellow duckling tucked into bed',
        imageAspectRatio: '1:1',
      },
      {
        title: 'Sleeping Chipmunk Family',
        description: 'Illustrated cartoon style with painterly shading — full provenance: prompt, model, R2 storage, and cost.',
        imageUrl: 'https://images.esy.com/artifacts/clip-art/artifact-d0c32dbb/processed.webp',
        imageAlt: 'Illustrated chipmunk family sleeping in a woven nest',
        imageAspectRatio: '1:1',
      },
    ],
  },
];

// Utility functions for data access
export function getAllTemplates(): Template[] {
  return templates;
}

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}

export function getTemplatesByCategory(category: string): Template[] {
  if (category === 'all') return templates;
  return templates.filter((t) => t.category === category);
}

export function getTemplatesBySubcategory(subcategory: string): Template[] {
  return templates.filter((t) => t.subcategory === subcategory);
}

export function getFeaturedTemplates(): Template[] {
  return templates.filter((t) => t.isFeatured);
}

export function getWorkflowTemplates(): Template[] {
  return templates.filter((t) => t.isWorkflow);
}

export function getWorkflowTemplatesByTag(tag: string): Template[] {
  return templates.filter(
    (t) => t.isWorkflow && t.tags.some((tg) => tg.toLowerCase() === tag.toLowerCase())
  );
}

export function getNewTemplates(): Template[] {
  return templates.filter((t) => t.isNew);
}

export function searchTemplates(query: string): Template[] {
  const searchTerm = query.toLowerCase();
  return templates.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm) ||
      t.description.toLowerCase().includes(searchTerm) ||
      t.shortDescription.toLowerCase().includes(searchTerm) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
}

export function getRelatedTemplates(slug: string, limit: number = 3): Template[] {
  const template = getTemplateBySlug(slug);
  if (!template) return [];

  // First try related slugs
  if (template.relatedSlugs && template.relatedSlugs.length > 0) {
    const related = template.relatedSlugs
      .map((s) => getTemplateBySlug(s))
      .filter((t): t is Template => t !== undefined)
      .slice(0, limit);
    if (related.length >= limit) return related;
  }

  // Fall back to same subcategory
  const sameSubcategory = templates
    .filter((t) => t.subcategory === template.subcategory && t.slug !== slug)
    .slice(0, limit);

  return sameSubcategory;
}

export function getCategoryInfo(categoryId: string): TemplateCategoryInfo | undefined {
  return templateCategories.find((c) => c.id === categoryId || c.slug === categoryId);
}

export function getAllSubcategories(): TemplateSubcategory[] {
  return templateCategories.flatMap((c) => c.subcategories);
}

export function getSubcategoryInfo(subcategoryId: string): TemplateSubcategory | undefined {
  return getAllSubcategories().find((s) => s.id === subcategoryId || s.slug === subcategoryId);
}

// New functions for SEO categories
export function getTemplatesByModel(model: string): Template[] {
  return templates.filter((t) => t.model === model);
}

export function getPremiumTemplates(): Template[] {
  return templates.filter((t) => t.pricing?.type === 'premium');
}

// Model Reference System query functions
export function getTemplatesByModelFamily(family: string): Template[] {
  return templates.filter((t) => t.modelFamily?.toLowerCase() === family.toLowerCase());
}

export function getTemplatesByModelSubFamily(family: string, subFamily: string): Template[] {
  return templates.filter(
    (t) => 
      t.modelFamily?.toLowerCase() === family.toLowerCase() &&
      t.modelSubFamily?.toLowerCase() === subFamily.toLowerCase()
  );
}

export function getTemplatesByModelVersion(family: string, version: string): Template[] {
  return templates.filter(
    (t) => 
      t.modelFamily?.toLowerCase() === family.toLowerCase() &&
      t.modelVersion === version
  );
}

export function getTemplatesByAgentRole(role: string): Template[] {
  return templates.filter((t) => t.agentRole === role);
}

export function getFreeTemplates(): Template[] {
  return templates.filter((t) => !t.pricing || t.pricing.type === 'free');
}

