import { Metadata } from 'next';
import { GraduationCap } from 'lucide-react';
import EssayTypeClient, { EssayTypeData } from '../EssayTypeClient';

export const metadata: Metadata = {
  title: 'College Application Essay Workflow Template | Personal Statement Outline + AI Prompts | Esy',
  description: 'Free college application essay workflow template with personal statement outline, Common App essay structure, and AI writing prompts. Stand out in admissions with authentic storytelling.',
  keywords: [
    'college application essay workflow template',
    'personal statement workflow template',
    'Common App essay outline',
    'college essay examples',
    'how to write a college essay',
    'admissions essay workflow template',
    'college essay structure',
    'personal narrative workflow template',
  ],
  openGraph: {
    title: 'College Application Essay Workflow Template | Esy',
    description: 'Free college application essay workflow template with personal statement structure and AI prompts.',
    url: 'https://esy.com/workflows/essay/college-application',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const collegeAppData: EssayTypeData = {
  slug: 'college-application',
  title: 'College Application Essay',
  subtitle: 'Craft an authentic personal narrative that showcases your unique voice, experiences, and potential to admissions committees.',
  description: 'The college application essay is your opportunity to show admissions officers who you are beyond grades and test scores. It should reveal your personality, values, and growth through compelling storytelling.',
  icon: <GraduationCap size={20} />,
  accentColor: '#ec4899',
  seoIntro: `
    <p>
      Your <strong>college application essay</strong> is one of the few places where you control the narrative. 
      While your transcript shows what you've accomplished, your essay shows <em>who you are</em>—your values, 
      your thinking, and what matters to you.
    </p>
    <p style="margin-top: 1rem;">
      This template follows the structure that works for Common App essays, Coalition essays, and most 
      school-specific prompts. The key isn't following a formula—it's finding an authentic story that 
      reveals something meaningful about you. Our outline and prompts help you discover and tell that story.
    </p>
  `,
  outline: [
    {
      title: 'I. The Hook — Opening Scene',
      wordCount: '50-75 words',
      content: `Start in the middle of a specific moment. Don't begin with generic statements ("I've always loved..." or "Ever since I was young...").

Techniques that work:
• Drop the reader into a scene with sensory details
• Start with dialogue
• Begin with a surprising statement or contradiction
• Open with a moment of tension or decision

Example: Instead of "I've always been interested in medicine," try "The first time I held a human heart, my hands didn't shake."`,
    },
    {
      title: 'II. Context & Stakes',
      wordCount: '75-100 words',
      content: `After hooking the reader, zoom out briefly to provide context.

What to include:
• Why this moment/experience mattered
• What was at stake for you
• Any relevant background the reader needs
• The challenge or question you faced

Keep this section brief—you want to get to the meat of your story quickly. The reader should understand the situation but still be curious about what happens next.`,
    },
    {
      title: 'III. The Story — Action & Reflection',
      wordCount: '200-250 words',
      content: `This is the heart of your essay. Show what happened AND what you thought/felt.

Structure:
• Describe key moments with specific details (not summaries)
• Include your internal dialogue—what were you thinking?
• Show your actions and decisions
• Weave in reflection naturally, don't save it all for the end

The best essays move between scene (showing) and reflection (telling). Don't just narrate events—reveal how you processed them.

Avoid: Listing accomplishments, summarizing activities, or telling readers what to think about you.`,
    },
    {
      title: 'IV. The Turn — Insight or Change',
      wordCount: '100-125 words',
      content: `Show how this experience changed you or what you learned. This is your essay's "so what?"

Elements of a strong turn:
• A realization or shift in perspective
• How your understanding deepened
• What you do differently now
• The values or qualities this revealed

This should feel earned by the story you've told, not tacked on. The insight should be specific to YOUR experience, not a generic life lesson everyone already knows.

Weak: "I learned that hard work pays off."
Strong: "I realized that my fear of disappointing my grandmother had been driving my choices—and that I needed to find my own reasons."`,
    },
    {
      title: 'V. The Landing — Forward Look',
      wordCount: '50-75 words',
      content: `End by connecting your story to who you are now and who you're becoming.

Strong endings:
• Circle back to your opening image/scene with new meaning
• Show how this shapes what you want to study or do
• Hint at future impact without being grandiose
• End with a memorable line that captures your essence

Don't: Summarize your essay, make promises about what you'll do in college, or end with clichés ("I can't wait to see what the future holds").`,
    },
  ],
  structuralBreakdown: [
    {
      title: 'Show, Don\'t Tell',
      description: 'Admissions officers read thousands of essays. The ones that stand out use specific scenes and details rather than general claims.',
      tips: [
        '"I am hardworking" → Show a specific moment of hard work',
        'Use sensory details: what did you see, hear, feel?',
        'Include dialogue when appropriate',
        'Let readers draw conclusions from your actions',
      ],
    },
    {
      title: 'Find Your Unique Angle',
      description: 'Common topics can work—it\'s about your unique perspective and what the topic reveals about you.',
      tips: [
        'The "small" moment that reveals big truths often works better than big events',
        'What would only YOU notice or think about?',
        'Avoid the "hero narrative" where everything works out perfectly',
        'Vulnerability and growth are more compelling than flawless achievement',
      ],
    },
    {
      title: 'Authentic Voice',
      description: 'Write like yourself, not like you think a college essay "should" sound. Admissions officers can spot inauthenticity instantly.',
      tips: [
        'Read your essay aloud—does it sound like you?',
        'Avoid thesaurus words you wouldn\'t naturally use',
        'Include your sense of humor if that\'s part of who you are',
        'Don\'t try to impress with vocabulary; impress with insight',
      ],
    },
    {
      title: 'Meaningful Reflection',
      description: 'The best essays show a mind at work—not just what happened, but what you made of it.',
      tips: [
        'Reflection should be specific to your experience, not generic wisdom',
        'Show complexity: what did you struggle to understand?',
        'It\'s okay not to have everything figured out',
        'Connect insights to your values and future direction',
      ],
    },
  ],
  prompts: [
    {
      id: 'college-brainstorm',
      title: 'Essay Topic Discovery',
      description: 'Find the right story to tell by exploring your experiences and values',
      variables: ['SIGNIFICANT_EXPERIENCES', 'WHAT_MATTERS_TO_YOU', 'QUIRKS_OR_INTERESTS'],
      prompt: `You are an experienced college admissions essay coach who has helped thousands of students find their authentic stories. Help me discover the right topic for my college essay.

**Significant Experiences (list a few):**
[SIGNIFICANT_EXPERIENCES]

**What Matters Most to Me:**
[WHAT_MATTERS_TO_YOU]

**Unusual Interests, Quirks, or Perspectives:**
[QUIRKS_OR_INTERESTS]

Please help me by:

1. **Topic Analysis**
   For each experience I listed:
   - What might this reveal about who I am?
   - Is there a unique angle only I could take?
   - What's the potential "so what?" or insight?

2. **Hidden Story Mining**
   - Questions to uncover stories I might be overlooking
   - Prompts to explore the "small moments" that might be more powerful than big events
   - Connections between my interests and values I might not see

3. **3 Potential Essay Directions**
   For each:
   - The core story or moment
   - What it could reveal about me
   - A potential hook/opening
   - Why an admissions officer would find this compelling

4. **Recommendation**
   - Which direction has the most potential and why
   - What makes this authentically "me"
   - Warning signs if I'm veering toward cliché

Help me find a topic that only I could write—not what I think colleges want to hear.`,
      expectedOutput: 'Analysis of potential topics with three developed essay directions and a recommended approach with opening hooks.',
    },
    {
      id: 'college-draft',
      title: 'Personal Statement Developer',
      description: 'Transform your story idea into a compelling first draft',
      variables: ['STORY_TOPIC', 'KEY_MOMENT', 'WHAT_I_LEARNED'],
      prompt: `You are an expert college essay writing coach. Help me develop my story into a compelling personal statement draft.

**My Story Topic:**
[STORY_TOPIC]

**The Key Moment or Scene:**
[KEY_MOMENT]

**What This Revealed or How I Changed:**
[WHAT_I_LEARNED]

Please help me write a draft (500-650 words) that:

1. **Opens Strong**
   - Drop the reader into a specific scene
   - Include sensory details and/or dialogue
   - Create immediate curiosity

2. **Develops the Story**
   - Show key moments with specificity
   - Weave in reflection naturally (not just at the end)
   - Include my internal thoughts and feelings
   - Maintain my authentic voice

3. **Delivers the Turn**
   - Show genuine insight or change
   - Make the "so what?" specific to my experience
   - Avoid generic life lessons

4. **Lands Meaningfully**
   - Connect to who I am now
   - Suggest future direction without being prescriptive
   - End memorably

Also provide:
- Notes on where the draft is strongest
- 2-3 specific areas to develop in revision
- Alternative approaches for the opening and closing`,
      expectedOutput: 'A complete 500-650 word personal statement draft with notes on strengths and areas for revision.',
    },
    {
      id: 'college-revision',
      title: 'Personal Statement Refiner',
      description: 'Polish your draft to make every word count',
      variables: ['CURRENT_DRAFT', 'CONCERNS'],
      prompt: `You are an expert college admissions essay editor who has helped students get into top universities. Review and refine my personal statement.

**My Current Draft:**
[CURRENT_DRAFT]

**My Concerns About This Draft:**
[CONCERNS]

Please provide:

1. **Admissions Lens Review**
   - What does this essay reveal about me as a person?
   - Would I stand out? Why or why not?
   - Is my voice authentic and distinct?
   - Does the "so what?" land effectively?

2. **Structural Analysis**
   - Does the opening hook effectively?
   - Is the pacing right?
   - Does the reflection feel earned or tacked on?
   - Is the ending memorable?

3. **Line-Level Improvements**
   - Sentences that could be more specific or vivid
   - Places where I'm telling instead of showing
   - Clichés or generic phrases to cut
   - Word choices that don't sound like me

4. **Revised Version**
   - A polished version of the essay
   - Track changes notes explaining significant edits
   - Alternative phrasings for key sentences

5. **Final Checklist**
   - Does it answer the prompt (if applicable)?
   - Is it the right length?
   - Would this make an admissions officer want to meet me?

Focus on making this unmistakably mine while being as compelling as possible.`,
      expectedOutput: 'Comprehensive review with a polished revised version and detailed editing notes.',
    },
  ],
};

export default function CollegeApplicationEssayPage() {
  return <EssayTypeClient data={collegeAppData} />;
}

