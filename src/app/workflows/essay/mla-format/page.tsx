import { Metadata } from 'next';
import { FileCheck } from 'lucide-react';
import EssayTypeClient, { EssayTypeData } from '../EssayTypeClient';

export const metadata: Metadata = {
  title: 'MLA Format Essay Template | Proper MLA Citation & Formatting Guide | Esy',
  description: 'Free MLA format essay template with proper formatting, in-text citations, Works Cited examples, and AI prompts. Master MLA 9th edition style for humanities courses.',
  keywords: [
    'MLA format essay template',
    'MLA format example',
    'MLA citation generator',
    'MLA Works Cited',
    'MLA in-text citation',
    'MLA 9th edition',
    'MLA format paper',
    'how to cite MLA',
  ],
  openGraph: {
    title: 'MLA Format Essay Template | Esy',
    description: 'Free MLA format essay template with proper formatting and citation examples.',
    url: 'https://esy.com/workflows/essay/mla-format',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const mlaData: EssayTypeData = {
  slug: 'mla-format',
  title: 'MLA Format Essay',
  subtitle: 'Master MLA citation style with properly formatted essays, in-text citations, and Works Cited pages.',
  description: 'MLA (Modern Language Association) format is the standard citation style for humanities courses, especially English and literature. This template covers formatting, citations, and structure.',
  icon: <FileCheck size={20} />,
  accentColor: '#f59e0b',
  seoIntro: `
    <p>
      <strong>MLA format</strong> is the citation and formatting standard for humanities disciplines, 
      particularly English, literature, and cultural studies. Getting it right matters—proper formatting 
      signals academic credibility, and incorrect citations can undermine otherwise excellent work.
    </p>
    <p style="margin-top: 1rem;">
      This template covers MLA 9th edition guidelines (the current standard) including page setup, 
      header formatting, in-text citations, and Works Cited page structure. Use our outline for the 
      overall essay structure and our AI prompts for citation help and formatting checks.
    </p>
  `,
  outline: [
    {
      title: 'Page Setup & Header',
      wordCount: 'N/A',
      content: `Document Settings:
• Font: Times New Roman, 12pt
• Margins: 1 inch on all sides
• Line Spacing: Double-spaced throughout (including Works Cited)
• Paragraph Indent: 0.5 inch (first line of each paragraph)

First Page Header (top left, double-spaced):
Your Name
Professor's Name
Course Name
Date (Day Month Year format: 15 December 2025)

Running Header (top right, every page):
Last Name Page# (e.g., "Smith 1")`,
    },
    {
      title: 'Title & Introduction',
      wordCount: '100-150 words',
      content: `Title Formatting:
• Centered, same font as body text
• NOT bold, italicized, underlined, or in quotes
• Title case capitalization
• One double-space below header, one double-space above first paragraph

Introduction Elements:
• Hook: Engage the reader with relevant opening
• Context: Provide necessary background for your argument
• Thesis: Clear, arguable claim at the end of the intro

MLA essays often analyze texts, so your thesis typically addresses how/why an author achieves an effect or what a text reveals.`,
    },
    {
      title: 'Body Paragraphs with In-Text Citations',
      wordCount: '150-200 words each',
      content: `Standard Body Paragraph Structure:
• Topic sentence making a claim
• Evidence (often a quote from the text)
• Analysis explaining the evidence
• Connection back to thesis

In-Text Citation Formats:

Author named in sentence:
According to Smith, "quoted text here" (45).

Author not named in sentence:
The evidence suggests that "quoted text here" (Smith 45).

No author (use shortened title):
The article argues that "quoted text here" ("Title" 12).

Block quotes (over 4 lines):
• Start on new line
• Indent entire quote 0.5 inch from left
• No quotation marks
• Period BEFORE parenthetical citation`,
    },
    {
      title: 'Integrating Quotations',
      wordCount: 'N/A',
      content: `Signal Phrase Examples:
• Smith argues that...
• According to Johnson...
• As Thompson explains...
• The author contends...

Short Quote (under 4 lines):
Fitzgerald uses color symbolically, noting that Gatsby's dream was "a green light" that represented hope (180).

Long Quote (4+ lines):
      The narrator describes the scene in detail:
              Gatsby believed in the green light, the orgastic future 
              that year by year recedes before us. It eluded us then, 
              but that's no matter—tomorrow we will run faster, 
              stretch out our arms farther. (180)
      This passage reveals Gatsby's persistent optimism despite evidence of failure.

Modifying Quotes:
• Use [...] for omitted text
• Use [brackets] for added clarification
• Use (sic) for errors in original`,
    },
    {
      title: 'Conclusion',
      wordCount: '100-150 words',
      content: `Conclusion Elements:
• Restate thesis in new words (don't copy exactly)
• Synthesize main points (don't just repeat them)
• Broader implications or significance
• Closing thought that resonates

In MLA literary essays, conclusions often:
• Connect the text to larger themes or contexts
• Suggest what the analysis reveals about the human condition
• Note the text's continued relevance

Avoid:
• Introducing new quotes or evidence
• Starting with "In conclusion,"
• Making claims beyond your argument's scope`,
    },
    {
      title: 'Works Cited Page',
      wordCount: 'N/A',
      content: `Page Setup:
• Starts on new page
• "Works Cited" centered at top (not bold, italicized, etc.)
• Entries alphabetized by author's last name
• Hanging indent: first line flush left, subsequent lines indented 0.5 inch
• Double-spaced throughout

Core Elements (in order):
Author. "Title of Source." Title of Container, Other contributors, Version, Number, Publisher, Date, Location.

Common Formats:

Book:
Last, First. Title of Book. Publisher, Year.

Journal Article:
Last, First. "Article Title." Journal Name, vol. #, no. #, Year, pp. #-#.

Website:
Author. "Article Title." Website Name, Publisher, Day Month Year, URL.

Note: Include only elements that apply to your source.`,
    },
  ],
  structuralBreakdown: [
    {
      title: 'In-Text Citation Rules',
      description: 'MLA uses parenthetical citations with author and page number. The goal is to direct readers to your Works Cited while minimizing disruption to your prose.',
      tips: [
        'Page numbers only—no "p." or "page"',
        'Period goes AFTER the parenthetical citation',
        'If author is named in your sentence, only put page number in parentheses',
        'For sources without page numbers, omit them entirely',
      ],
    },
    {
      title: 'Works Cited Formatting',
      description: 'The Works Cited page lists all sources you cited in your paper. Accuracy here is crucial—errors undermine credibility.',
      tips: [
        'Alphabetize by first word of each entry (usually author\'s last name)',
        'Italicize titles of long works (books, journals, websites)',
        'Put "quotation marks" around titles of short works (articles, essays)',
        'Use hanging indentation for entries longer than one line',
      ],
    },
    {
      title: 'Integrating Evidence',
      description: 'In MLA papers, particularly literary analysis, how you integrate quotations matters as much as the quotes themselves.',
      tips: [
        'Introduce quotes with signal phrases—don\'t drop them in',
        'Follow every quote with analysis—never end a paragraph on a quote',
        'Blend short phrases into your sentences when possible',
        'Use block quotes sparingly—only when the length is essential',
      ],
    },
    {
      title: 'Common MLA Errors',
      description: 'These mistakes are easy to make and easy to fix. Check your paper against this list before submitting.',
      tips: [
        'Period placement: period comes AFTER parenthetical citation',
        'No comma between author and page: (Smith 45) not (Smith, 45)',
        'Title page: MLA typically doesn\'t have a separate title page',
        'Running header: Last name and page number, not title',
      ],
    },
  ],
  prompts: [
    {
      id: 'mla-citation',
      title: 'MLA Citation Generator',
      description: 'Generate properly formatted MLA citations for any source type',
      variables: ['SOURCE_TYPE', 'SOURCE_DETAILS'],
      prompt: `You are an expert in MLA 9th edition citation style. Help me create a properly formatted citation.

**Source Type:**
[SOURCE_TYPE]
(book, journal article, website, video, interview, etc.)

**Source Details (provide what you have):**
[SOURCE_DETAILS]
(author, title, publication info, dates, URLs, etc.)

Please provide:

1. **Works Cited Entry**
   - The complete, properly formatted citation
   - Correct punctuation and italicization
   - Proper capitalization
   - All required elements in correct order

2. **In-Text Citation Examples**
   - Author named in sentence version
   - Author not named in sentence version
   - If applicable: multiple authors, no author, no page number variations

3. **Formatting Notes**
   - Explanation of each element included
   - Any unusual aspects of this source type
   - Common mistakes to avoid with this type

4. **If Information Is Missing**
   - What additional information would improve the citation
   - How to handle missing elements per MLA guidelines

5. **Alternative Formats**
   - If this source could be cited differently, show options
   - Which approach is preferred and why`,
      expectedOutput: 'Complete MLA citation in Works Cited format with in-text citation examples and formatting notes.',
    },
    {
      id: 'mla-format-check',
      title: 'MLA Formatting Checker',
      description: 'Check your essay for MLA formatting compliance',
      variables: ['ESSAY_EXCERPT', 'CONCERNS'],
      prompt: `You are an expert MLA format editor. Review my essay excerpt for MLA 9th edition compliance.

**Essay Excerpt:**
[ESSAY_EXCERPT]

**My Specific Concerns:**
[CONCERNS]

Please check and provide feedback on:

1. **In-Text Citations**
   - Are they formatted correctly?
   - Is punctuation in the right place?
   - Are author names and page numbers correct?
   - Are signal phrases used effectively?

2. **Quote Integration**
   - Are quotes introduced properly?
   - Is the ICE method (Introduce, Cite, Explain) followed?
   - Are long quotes formatted as block quotes if needed?
   - Are modifications (brackets, ellipses) used correctly?

3. **General Formatting**
   - Font and spacing issues (if discernible)
   - Paragraph structure
   - Header information

4. **Specific Corrections**
   - Line-by-line fixes with explanations
   - Before and after examples

5. **Works Cited Preview**
   - Based on sources mentioned, preview Works Cited entries
   - Note any missing information needed

6. **Corrected Version**
   - Rewrite the excerpt with all corrections applied`,
      expectedOutput: 'Detailed MLA compliance review with specific corrections and a corrected version.',
    },
    {
      id: 'mla-literary-analysis',
      title: 'MLA Literary Analysis Developer',
      description: 'Develop a literary analysis paragraph with proper MLA integration',
      variables: ['TEXT_ANALYZED', 'ARGUMENT_POINT', 'QUOTES_TO_USE'],
      prompt: `You are an expert in literary analysis and MLA academic writing. Help me develop an analysis paragraph.

**Text I'm Analyzing:**
[TEXT_ANALYZED]

**My Argument Point:**
[ARGUMENT_POINT]

**Quotes I Want to Use (with page numbers):**
[QUOTES_TO_USE]

Please write a developed analysis paragraph (200-250 words) that:

1. **Opens with a Strong Topic Sentence**
   - Makes an interpretive claim
   - Connects to the broader thesis

2. **Integrates Evidence Properly**
   - Uses effective signal phrases
   - Cites correctly in MLA format
   - Blends quotes smoothly into prose
   - Uses short quotes integrated into sentences when possible

3. **Provides Deep Analysis**
   - Explains HOW the quote supports the argument
   - Examines specific word choices, imagery, or techniques
   - Goes beyond plot summary to interpretation
   - Shows original thinking

4. **Maintains MLA Style**
   - Proper in-text citations
   - Correct punctuation around quotes
   - Present tense for literary analysis
   - Appropriate academic voice

5. **Transitions Effectively**
   - Connects to what comes before/after

Also provide:
- The Works Cited entry for this source
- Notes on the analytical techniques used
- Alternative ways to frame this evidence`,
      expectedOutput: 'A developed literary analysis paragraph with proper MLA formatting and deep textual analysis.',
    },
  ],
};

export default function MLAFormatEssayPage() {
  return <EssayTypeClient data={mlaData} />;
}

