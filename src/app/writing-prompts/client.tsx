"use client";

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, PenTool, Brain, BookOpen, ArrowRight, 
  RefreshCw, Copy, Check, ChevronDown, Search,
  Zap, Users, TrendingUp, Mail
} from 'lucide-react';
import Link from 'next/link';

const WritingPromptsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [copiedPrompt, setCopiedPrompt] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showTryModal, setShowTryModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Creative Writing Prompts (Traditional)
  const creativePrompts = [
    // Fiction Prompts
    {
      id: 1,
      category: 'fiction',
      prompt: "Write about a character who discovers an old letter in a library book that changes everything they thought they knew about their family.",
      type: 'Story Starter',
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      category: 'character',
      prompt: "Your protagonist has been afraid of the dark their entire life. Today, they wake up to find the sun hasn't risen.",
      type: 'Character Development',
      difficulty: 'Advanced'
    },
    {
      id: 5,
      category: 'fiction',
      prompt: "The last person on Earth sits alone in a room. There's a knock at the door.",
      type: 'Story Starter',
      difficulty: 'Intermediate'
    },
    {
      id: 6,
      category: 'fiction',
      prompt: "A time traveler is stuck in the past and falls in love with someone. They know they must leave soon.",
      type: 'Romance',
      difficulty: 'Advanced'
    },
    {
      id: 7,
      category: 'fiction',
      prompt: "Every night at 3:33 AM, your character wakes up to the same song playing from an unknown source.",
      type: 'Mystery',
      difficulty: 'Intermediate'
    },
    {
      id: 8,
      category: 'fiction',
      prompt: "In a world where memories can be bought and sold, your character discovers they own a memory that isn't theirs.",
      type: 'Sci-Fi',
      difficulty: 'Advanced'
    },
    {
      id: 9,
      category: 'kids',
      prompt: "Write about a magical pencil that brings drawings to life, but only between 3 PM and 4 PM each day.",
      type: 'Children\'s Story',
      difficulty: 'Beginner'
    },
    {
      id: 10,
      category: 'kids',
      prompt: "A young dragon is afraid of flying. How do they overcome their fear?",
      type: 'Children\'s Story',
      difficulty: 'Beginner'
    },
    {
      id: 11,
      category: 'kids',
      prompt: "Your pet goldfish can grant three wishes, but they're all slightly wrong. What happens?",
      type: 'Humorous',
      difficulty: 'Beginner'
    },
    
    // Poetry Prompts
    {
      id: 3,
      category: 'poetry',
      prompt: "Write a poem using only the words you can see from where you're sitting right now.",
      type: 'Poetry Exercise',
      difficulty: 'Beginner'
    },
    {
      id: 12,
      category: 'poetry',
      prompt: "Create a haiku about the last thing that made you smile.",
      type: 'Haiku',
      difficulty: 'Beginner'
    },
    {
      id: 13,
      category: 'poetry',
      prompt: "Write a poem where each line begins with the next letter of the alphabet.",
      type: 'Structured Poetry',
      difficulty: 'Intermediate'
    },
    {
      id: 14,
      category: 'poetry',
      prompt: "Describe a color to someone who has never seen it, using only emotions and sensations.",
      type: 'Sensory Poetry',
      difficulty: 'Advanced'
    },
    
    // Journal Prompts
    {
      id: 4,
      category: 'journal',
      prompt: "If you could have dinner with any three people from history, who would they be and what would you ask them?",
      type: 'Reflection',
      difficulty: 'Beginner'
    },
    {
      id: 15,
      category: 'journal',
      prompt: "What would your 10-year-old self think of who you are today?",
      type: 'Self-Reflection',
      difficulty: 'Beginner'
    },
    {
      id: 16,
      category: 'journal',
      prompt: "Write about a moment when you felt completely at peace. What made it special?",
      type: 'Mindfulness',
      difficulty: 'Beginner'
    },
    {
      id: 17,
      category: 'journal',
      prompt: "List 50 things that make you happy, no matter how small.",
      type: 'Gratitude',
      difficulty: 'Beginner'
    },
    {
      id: 18,
      category: 'journal',
      prompt: "If your life was a book, what would this chapter be called?",
      type: 'Life Reflection',
      difficulty: 'Intermediate'
    },
    
    // Middle School Prompts
    {
      id: 19,
      category: 'middle-school',
      prompt: "You wake up one morning with the ability to understand what animals are saying. What's the first thing you hear?",
      type: 'Fantasy',
      difficulty: 'Beginner'
    },
    {
      id: 20,
      category: 'middle-school',
      prompt: "Write about the worst school field trip that turns into the best adventure.",
      type: 'Adventure',
      difficulty: 'Intermediate'
    },
    {
      id: 21,
      category: 'middle-school',
      prompt: "If you could create a new holiday, what would it celebrate and how would people observe it?",
      type: 'Creative',
      difficulty: 'Beginner'
    },
    
    // High School Prompts
    {
      id: 22,
      category: 'high-school',
      prompt: "Write about a society where everyone's career is chosen for them at age 16 based on their dreams.",
      type: 'Dystopian',
      difficulty: 'Advanced'
    },
    {
      id: 23,
      category: 'high-school',
      prompt: "Explore the theme of identity through a character who discovers they've been living someone else's life.",
      type: 'Literary Fiction',
      difficulty: 'Advanced'
    },
    {
      id: 24,
      category: 'high-school',
      prompt: "Write a story told entirely through text messages, revealing a mystery.",
      type: 'Experimental',
      difficulty: 'Intermediate'
    }
  ];

  // AI Writing Prompts (Modern)
  const aiPrompts = [
    // Essay Prompts
    {
      id: 101,
      category: 'essay',
      prompt: "Analyze the impact of [SPECIFIC TECHNOLOGY] on [SPECIFIC INDUSTRY] over the past decade. Include statistical evidence, expert opinions, and future predictions.",
      type: 'Academic Essay',
      aiTool: 'GPT-4, Claude',
      tokens: '~800'
    },
    {
      id: 102,
      category: 'essay',
      prompt: "Compare and contrast [THEORY A] and [THEORY B] in [FIELD]. Discuss their origins, key principles, practical applications, and limitations.",
      type: 'Comparative Essay',
      aiTool: 'Claude, Esy',
      tokens: '~1000'
    },
    {
      id: 103,
      category: 'essay',
      prompt: "Write a persuasive essay arguing for/against [CONTROVERSIAL TOPIC]. Include counterarguments, refutations, and evidence from at least 5 credible sources.",
      type: 'Argumentative Essay',
      aiTool: 'All AI Tools',
      tokens: '~1200'
    },
    {
      id: 104,
      category: 'essay',
      prompt: "Explain [COMPLEX CONCEPT] to a general audience. Use analogies, real-world examples, and break down technical terms.",
      type: 'Expository Essay',
      aiTool: 'GPT-4, Claude',
      tokens: '~600'
    },
    
    // Blog Prompts
    {
      id: 105,
      category: 'blog',
      prompt: "Create a comprehensive guide on [TOPIC] for beginners. Include: introduction, 5-7 main points with examples, common mistakes, and actionable takeaways.",
      type: 'How-To Guide',
      aiTool: 'All AI Tools',
      tokens: '~1200'
    },
    {
      id: 106,
      category: 'blog',
      prompt: "Write a listicle: '10 [ITEMS/TIPS/STRATEGIES] for [ACHIEVING GOAL]'. Each item needs a catchy subheading, explanation, and practical example.",
      type: 'Listicle',
      aiTool: 'All AI Tools',
      tokens: '~1000'
    },
    {
      id: 107,
      category: 'blog',
      prompt: "Create an SEO-optimized blog post about [KEYWORD]. Include: meta description, H2/H3 headings, internal linking suggestions, and a FAQ section.",
      type: 'SEO Content',
      aiTool: 'GPT-4, Esy',
      tokens: '~1500'
    },
    {
      id: 108,
      category: 'blog',
      prompt: "Write a case study about [SUCCESS STORY]. Include: background, challenge, solution, implementation, results with metrics, and key takeaways.",
      type: 'Case Study',
      aiTool: 'Claude, Esy',
      tokens: '~800'
    },
    
    // Business Prompts
    {
      id: 109,
      category: 'business',
      prompt: "Draft a professional email to [RECIPIENT] regarding [SITUATION]. Tone: [formal/friendly]. Include: context, main request, next steps, and clear CTA.",
      type: 'Business Email',
      aiTool: 'All AI Tools',
      tokens: '~300'
    },
    {
      id: 110,
      category: 'business',
      prompt: "Create an executive summary for [PROJECT/PROPOSAL]. Include: overview, objectives, methodology, expected outcomes, timeline, and budget highlights.",
      type: 'Executive Summary',
      aiTool: 'Claude, GPT-4',
      tokens: '~500'
    },
    {
      id: 111,
      category: 'business',
      prompt: "Write a LinkedIn post about [PROFESSIONAL ACHIEVEMENT/INSIGHT]. Make it engaging, include a personal story, professional takeaway, and end with a question.",
      type: 'Social Media',
      aiTool: 'All AI Tools',
      tokens: '~200'
    },
    {
      id: 112,
      category: 'business',
      prompt: "Develop a project proposal for [PROJECT NAME]. Include: problem statement, proposed solution, deliverables, timeline, team requirements, and success metrics.",
      type: 'Project Proposal',
      aiTool: 'Claude, Esy',
      tokens: '~1000'
    },
    
    // Academic Prompts
    {
      id: 113,
      category: 'academic',
      prompt: "Develop a thesis statement and outline for a research paper on [TOPIC]. Include: hypothesis, methodology overview, expected findings, and 5 key sources.",
      type: 'Research Planning',
      aiTool: 'Claude, Esy',
      tokens: '~600'
    },
    {
      id: 114,
      category: 'academic',
      prompt: "Write an annotated bibliography for [NUMBER] sources on [TOPIC]. Each entry: citation (APA/MLA), 150-word summary, relevance to research.",
      type: 'Bibliography',
      aiTool: 'All AI Tools',
      tokens: '~800'
    },
    {
      id: 115,
      category: 'academic',
      prompt: "Create a literature review on [TOPIC]. Synthesize findings from 10+ sources, identify gaps, discuss methodologies, and suggest future research.",
      type: 'Literature Review',
      aiTool: 'Claude, Esy',
      tokens: '~1500'
    },
    {
      id: 116,
      category: 'academic',
      prompt: "Draft an abstract for a research paper on [TOPIC]. Include: background, objective, methodology, results, conclusion. Maximum 250 words.",
      type: 'Abstract',
      aiTool: 'All AI Tools',
      tokens: '~300'
    },
    
    // Creative AI Prompts
    {
      id: 117,
      category: 'creative-ai',
      prompt: "Generate a detailed world-building guide for [GENRE] story. Include: geography, political system, magic/technology rules, cultures, conflicts, and unique elements.",
      type: 'World Building',
      aiTool: 'GPT-4, Claude',
      tokens: '~1200'
    },
    {
      id: 118,
      category: 'creative-ai',
      prompt: "Create character profiles for [NUMBER] main characters. Include: appearance, personality, backstory, motivations, flaws, character arc, and key relationships.",
      type: 'Character Development',
      aiTool: 'All AI Tools',
      tokens: '~800'
    },
    {
      id: 119,
      category: 'creative-ai',
      prompt: "Outline a [GENRE] novel with three-act structure. Include: hook, plot points, character arcs, subplots, themes, and chapter-by-chapter summary.",
      type: 'Story Planning',
      aiTool: 'Claude, GPT-4',
      tokens: '~1500'
    },
    
    // Technical Writing
    {
      id: 120,
      category: 'technical',
      prompt: "Write technical documentation for [SOFTWARE/PROCESS]. Include: overview, requirements, step-by-step instructions with screenshots placeholders, troubleshooting, and FAQs.",
      type: 'Documentation',
      aiTool: 'Claude, GPT-4',
      tokens: '~1000'
    },
    {
      id: 121,
      category: 'technical',
      prompt: "Create a tutorial on [TECHNICAL TOPIC]. Break down into: prerequisites, theory explanation, practical example, code snippets, common errors, and best practices.",
      type: 'Tutorial',
      aiTool: 'GPT-4, Claude',
      tokens: '~1200'
    },
    
    // Marketing Prompts
    {
      id: 122,
      category: 'marketing',
      prompt: "Write product descriptions for [PRODUCT]. Create 3 versions: short (50 words), medium (150 words), long (300 words). Focus on benefits, not features.",
      type: 'Product Copy',
      aiTool: 'All AI Tools',
      tokens: '~500'
    },
    {
      id: 123,
      category: 'marketing',
      prompt: "Develop an email campaign for [PRODUCT/SERVICE]. Create: subject lines (5 options), preview text, body copy, CTA buttons, and A/B test variations.",
      type: 'Email Marketing',
      aiTool: 'GPT-4, Esy',
      tokens: '~600'
    }
  ];

  // Hybrid prompts showing both uses
  const hybridExamples = [
    {
      traditional: "Write about a time you felt completely out of place.",
      ai_enhanced: "Help me write a personal essay about feeling out of place. Include sensory details, emotional reflection, and a meaningful conclusion about belonging.",
      benefit: "AI helps structure and enhance your personal story"
    },
    {
      traditional: "Describe a futuristic city 100 years from now.",
      ai_enhanced: "Create a detailed description of a futuristic city in 2125. Include: transportation, architecture, social systems, and environmental adaptations. Make it feel lived-in and realistic.",
      benefit: "AI adds depth and consistency to worldbuilding"
    },
    {
      traditional: "Write about your biggest fear.",
      ai_enhanced: "Craft a reflective essay about my biggest fear. Structure: vivid opening scene, exploration of origins, physical/emotional manifestations, attempts to overcome, and insight gained.",
      benefit: "AI helps organize emotional content effectively"
    },
    {
      traditional: "Create a story that begins and ends with the same sentence.",
      ai_enhanced: "Write a circular narrative that begins and ends with the same sentence. Show how the meaning changes through the story. Include: character growth, ironic reversal, and thematic depth.",
      benefit: "AI ensures structural coherence and thematic resonance"
    }
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'All Prompts', icon: '📚' },
    { id: 'fiction', name: 'Fiction', icon: '📖' },
    { id: 'essay', name: 'Essays', icon: '📝' },
    { id: 'poetry', name: 'Poetry', icon: '🎭' },
    { id: 'journal', name: 'Journaling', icon: '📔' },
    { id: 'blog', name: 'Blog Posts', icon: '💻' },
    { id: 'academic', name: 'Academic', icon: '🎓' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'kids', name: 'For Kids', icon: '🦄' },
    { id: 'middle-school', name: 'Middle School', icon: '🎒' },
    { id: 'high-school', name: 'High School', icon: '📚' },
    { id: 'creative-ai', name: 'Creative AI', icon: '🎨' },
    { id: 'technical', name: 'Technical', icon: '⚙️' },
    { id: 'marketing', name: 'Marketing', icon: '📈' }
  ];

  // Stats for credibility
  const stats = [
    { number: '10,000+', label: 'Writers helped' },
    { number: '150+', label: 'Free prompts' },
    { number: '4.8/5', label: 'User rating' },
    { number: '24/7', label: 'AI assistance' }
  ];

  // Featured prompt of the day
  const featuredPrompt = {
    title: "Today's Featured Prompt",
    prompt: "Write about a tradition that exists only in your family, real or imagined.",
    aiVersion: "Help me write a short story about a unique family tradition. Include cultural context, generational perspectives, and why this tradition matters to the family.",
    category: "Creative Writing"
  };

  const handleCopyPrompt = (promptId) => {
    setCopiedPrompt(promptId);
    // Copy to clipboard logic
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const handleTryInEsy = (prompt) => {
    setSelectedPrompt(prompt);
    setShowTryModal(true);
    setGeneratedPreview('');
    setShowSignupPrompt(false);
    
    // Save to localStorage for remarketing
    if (typeof window !== 'undefined') {
      localStorage.setItem('pendingPrompt', JSON.stringify({
        prompt: prompt,
        timestamp: new Date().toISOString()
      }));
    }
  };

  const handleGeneratePreview = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const preview = `Based on your prompt, here's how Esy AI enhances your writing:

Your essay explores the fascinating intersection of technology and human experience. Beginning with a compelling anecdote about discovering that old letter, you'll weave together themes of family secrets, digital archaeology, and the permanence of written words.

The narrative structure builds tension through three key revelations:
1. The letter's mysterious origin and cryptic contents
2. Your investigation using both traditional research and modern tools
3. The shocking truth about your family's hidden history

Each paragraph transitions smoothly, using sensory details to ground readers in both the dusty library setting and your emotional journey. The conclusion reflects on how this discovery changed not just your understanding of your family, but your relationship with...`;
      
      setGeneratedPreview(preview);
      setIsGenerating(false);
      
      // Show signup prompt after preview
      setTimeout(() => {
        setShowSignupPrompt(true);
      }, 2000);
    }, 3000);
  };

  const handleModalSignup = () => {
    if (userEmail) {
      // In production, this would create account and redirect
      console.log('Creating account for:', userEmail);
      window.location.href = `/app?prompt=${encodeURIComponent(selectedPrompt.prompt)}`;
    }
  };

  const handleQuickSignin = () => {
    // In production, this would go to login
    window.location.href = '/login';
  };

  const handleRandomPrompt = () => {
    const allPrompts = [...creativePrompts, ...aiPrompts];
    const randomIndex = Math.floor(Math.random() * allPrompts.length);
    setCurrentPromptIndex(randomIndex);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      // Handle subscription logic
    }
  };

  // Filter prompts based on search and category
  const filterPrompts = (prompts) => {
    return prompts.filter(prompt => {
      const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
      const matchesSearch = prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: '#ffffff',
      fontFamily: 'var(--font-inter)'
    }}>
      {/* Hero Section - SEO Optimized */}
      <section style={{
        padding: isMobile ? '6rem 1.5rem 3rem' : '9rem 2rem 6rem',
        textAlign: 'center',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: isMobile ? '2.5rem' : '4rem',
          fontWeight: 300,
          lineHeight: 1.3,
          letterSpacing: '0.01em',
          marginBottom: '1.5rem',
          fontFamily: 'var(--font-literata)'
        }}>
          Writing Prompts for
          <br />
          <span style={{ color: '#8b5cf6', fontWeight: 400 }}>Every Writer</span>
        </h1>
        
        <p style={{
          fontSize: isMobile ? '1.125rem' : '1.375rem',
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: 1.6,
          marginBottom: '2rem',
          maxWidth: '700px',
          margin: '0 auto 2rem'
        }}>
          From creative sparks to AI-powered assistance — find the perfect prompt 
          to inspire your writing journey. Free prompts for stories, essays, blogs, and more.
        </p>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(139, 92, 246, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(139, 92, 246, 0.1)'
            }}>
              <div style={{
                fontSize: '1.875rem',
                fontWeight: 300,
                color: '#8b5cf6',
                marginBottom: '0.25rem'
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '0.813rem',
                color: 'rgba(255, 255, 255, 0.5)'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'all', label: 'All Prompts', icon: Sparkles },
            { id: 'creative', label: 'Creative Writing', icon: PenTool },
            { id: 'ai', label: 'AI Prompts', icon: Brain },
            { id: 'hybrid', label: 'Best of Both', icon: Zap }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: isMobile ? '0.75rem 1.25rem' : '0.875rem 1.75rem',
                backgroundColor: activeTab === tab.id ? '#8b5cf6' : 'transparent',
                border: `1px solid ${activeTab === tab.id ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.938rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Prompt of the Day */}
      <section style={{
        padding: isMobile ? '3rem 1.5rem' : '4rem 2rem',
        backgroundColor: '#16161f',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.5rem' : '2rem',
            fontWeight: 300,
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-literata)'
          }}>
            <Sparkles size={24} style={{ color: '#8b5cf6' }} />
            {featuredPrompt.title}
          </h2>

          <div style={{
            backgroundColor: 'rgba(139, 92, 246, 0.05)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '12px',
            padding: isMobile ? '1.5rem' : '2rem'
          }}>
            <p style={{
              fontSize: '1.125rem',
              lineHeight: 1.7,
              marginBottom: '1rem'
            }}>
              &ldquo;{featuredPrompt.prompt}&rdquo;
            </p>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => handleCopyPrompt('featured')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '0.813rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Copy size={14} />
                {copiedPrompt === 'featured' ? 'Copied!' : 'Copy Prompt'}
              </button>
              
              <button
                onClick={() => handleTryInEsy({
                  prompt: featuredPrompt.aiVersion,
                  type: 'Featured Prompt'
                })}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#8b5cf6',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '0.813rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                Try with Esy AI
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{
        padding: isMobile ? '3rem 1.5rem' : '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Search and Filter */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            flex: 1,
            position: 'relative'
          }}>
            <Search size={20} style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255, 255, 255, 0.5)'
            }} />
            <input
              type="text"
              placeholder="Search writing prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                backgroundColor: '#16161f',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.938rem',
                outline: 'none'
              }}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '0.875rem 1rem',
              backgroundColor: '#16161f',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '0.938rem',
              outline: 'none',
              cursor: 'pointer',
              minWidth: '200px'
            }}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleRandomPrompt}
            style={{
              padding: '0.875rem 1.5rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '0.938rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            <RefreshCw size={16} />
            Random Prompt
          </button>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'all' && (
          <div>
            <h2 style={{
              fontSize: isMobile ? '1.75rem' : '2.5rem',
              fontWeight: 300,
              marginBottom: '2rem',
              textAlign: 'center',
              fontFamily: 'var(--font-literata)'
            }}>
              All Writing Prompts
            </h2>

            {/* Creative Writing Section */}
            <div style={{ marginBottom: '4rem' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 400,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <PenTool size={20} style={{ color: '#8b5cf6' }} />
                Creative Writing Prompts
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '1.5rem'
              }}>
                {filterPrompts(creativePrompts).map(prompt => (
                  <div
                    key={prompt.id}
                    style={{
                      padding: '1.5rem',
                      backgroundColor: '#16161f',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.75rem'
                    }}>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        color: '#8b5cf6',
                        borderRadius: '4px'
                      }}>
                        {prompt.type}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.5)'
                      }}>
                        {prompt.difficulty}
                      </span>
                    </div>
                    
                    <p style={{
                      fontSize: '0.938rem',
                      lineHeight: 1.7,
                      marginBottom: '1rem'
                    }}>
                      {prompt.prompt}
                    </p>
                    
                    <button
                      onClick={() => handleCopyPrompt(prompt.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        color: copiedPrompt === prompt.id ? '#4ade80' : 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.813rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      {copiedPrompt === prompt.id ? <Check size={14} /> : <Copy size={14} />}
                      {copiedPrompt === prompt.id ? 'Copied!' : 'Use This Prompt'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Writing Section */}
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 400,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Brain size={20} style={{ color: '#8b5cf6' }} />
                AI Writing Prompts
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '1.5rem'
              }}>
                {filterPrompts(aiPrompts).map(prompt => (
                  <div
                    key={prompt.id}
                    style={{
                      padding: '1.5rem',
                      backgroundColor: '#16161f',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.75rem'
                    }}>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        color: '#8b5cf6',
                        borderRadius: '4px'
                      }}>
                        {prompt.type}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.5)'
                      }}>
                        {prompt.aiTool}
                      </span>
                    </div>
                    
                    <p style={{
                      fontSize: '0.938rem',
                      lineHeight: 1.7,
                      marginBottom: '0.75rem',
                      fontFamily: 'monospace',
                      backgroundColor: 'rgba(139, 92, 246, 0.03)',
                      padding: '0.75rem',
                      borderRadius: '6px'
                    }}>
                      {prompt.prompt}
                    </p>

                    <div style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      marginBottom: '1rem'
                    }}>
                      Tokens: {prompt.tokens}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      <button
                        onClick={() => handleCopyPrompt(prompt.id)}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          color: copiedPrompt === prompt.id ? '#4ade80' : 'rgba(255, 255, 255, 0.7)',
                          fontSize: '0.813rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        {copiedPrompt === prompt.id ? <Check size={14} /> : <Copy size={14} />}
                        Copy
                      </button>
                      
                      <button
                        onClick={() => handleTryInEsy(prompt)}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          backgroundColor: '#8b5cf6',
                          borderRadius: '6px',
                          color: '#ffffff',
                          fontSize: '0.813rem',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          cursor: 'pointer',
                          border: 'none'
                        }}
                      >
                        Try in Esy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'creative' && (
          <div>
            <h2 style={{
              fontSize: isMobile ? '1.75rem' : '2.5rem',
              fontWeight: 300,
              marginBottom: '1rem',
              textAlign: 'center',
              fontFamily: 'var(--font-literata)'
            }}>
              Creative Writing Prompts
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem'
            }}>
              Spark your imagination with these creative writing prompts for stories, 
              poetry, journaling, and more.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '1.5rem'
            }}>
              {filterPrompts(creativePrompts).map(prompt => (
                <div
                  key={prompt.id}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: '#16161f',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      color: '#8b5cf6',
                      borderRadius: '4px'
                    }}>
                      {prompt.type}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}>
                      {prompt.difficulty}
                    </span>
                  </div>
                  
                  <p style={{
                    fontSize: '0.938rem',
                    lineHeight: 1.7,
                    marginBottom: '1rem'
                  }}>
                    {prompt.prompt}
                  </p>
                  
                  <button
                    onClick={() => handleCopyPrompt(prompt.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      color: copiedPrompt === prompt.id ? '#4ade80' : 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.813rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {copiedPrompt === prompt.id ? <Check size={14} /> : <Copy size={14} />}
                    {copiedPrompt === prompt.id ? 'Copied!' : 'Use This Prompt'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div>
            <h2 style={{
              fontSize: isMobile ? '1.75rem' : '2.5rem',
              fontWeight: 300,
              marginBottom: '1rem',
              textAlign: 'center',
              fontFamily: 'var(--font-literata)'
            }}>
              AI Writing Prompts
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem'
            }}>
              Professional prompts optimized for AI tools like GPT-4, Claude, and Esy.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '1.5rem'
            }}>
              {filterPrompts(aiPrompts).map(prompt => (
                <div
                  key={prompt.id}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: '#16161f',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      color: '#8b5cf6',
                      borderRadius: '4px'
                    }}>
                      {prompt.type}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}>
                      {prompt.aiTool}
                    </span>
                  </div>
                  
                  <p style={{
                    fontSize: '0.938rem',
                    lineHeight: 1.7,
                    marginBottom: '0.75rem',
                    fontFamily: 'monospace',
                    backgroundColor: 'rgba(139, 92, 246, 0.03)',
                    padding: '0.75rem',
                    borderRadius: '6px'
                  }}>
                    {prompt.prompt}
                  </p>

                  <div style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '1rem'
                  }}>
                    Tokens: {prompt.tokens}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    <button
                      onClick={() => handleCopyPrompt(prompt.id)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        color: copiedPrompt === prompt.id ? '#4ade80' : 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.813rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {copiedPrompt === prompt.id ? <Check size={14} /> : <Copy size={14} />}
                      Copy
                    </button>
                    
                    <button
                      onClick={() => handleTryInEsy(prompt)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        backgroundColor: '#8b5cf6',
                        borderRadius: '6px',
                        color: '#ffffff',
                        fontSize: '0.813rem',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        border: 'none'
                      }}
                    >
                      Try in Esy
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA for Premium Prompts */}
            <div style={{
              marginTop: '3rem',
              padding: '2rem',
              backgroundColor: 'rgba(139, 92, 246, 0.05)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 400,
                marginBottom: '0.75rem'
              }}>
                Need More Advanced Prompts?
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '1.5rem'
              }}>
                Get access to 500+ premium prompts crafted by professionals
              </p>
              <a
                href="https://prompt.esy.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 2rem',
                  backgroundColor: '#8b5cf6',
                  borderRadius: '8px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500
                }}
              >
                Browse Premium Prompts
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        )}

        {activeTab === 'hybrid' && (
          <div>
            <h2 style={{
              fontSize: isMobile ? '1.75rem' : '2.5rem',
              fontWeight: 300,
              marginBottom: '1rem',
              textAlign: 'center',
              fontFamily: 'var(--font-literata)'
            }}>
              Best of Both Worlds
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              marginBottom: '3rem',
              maxWidth: '700px',
              margin: '0 auto 3rem'
            }}>
              See how traditional writing prompts become more powerful with AI enhancement.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}>
              {hybridExamples.map((example, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#16161f',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    minHeight: '200px'
                  }}>
                    {/* Traditional Side */}
                    <div style={{
                      padding: '2rem',
                      borderRight: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderBottom: isMobile ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'
                    }}>
                      <h4 style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <PenTool size={16} />
                        Traditional Prompt
                      </h4>
                      <p style={{
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        marginBottom: '1rem'
                      }}>
                        {example.traditional}
                      </p>
                      <button
                        onClick={() => handleCopyPrompt(`trad-${index}`)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          color: copiedPrompt === `trad-${index}` ? '#4ade80' : 'rgba(255, 255, 255, 0.7)',
                          fontSize: '0.813rem',
                          cursor: 'pointer'
                        }}
                      >
                        {copiedPrompt === `trad-${index}` ? 'Copied!' : 'Copy'}
                      </button>
                    </div>

                    {/* AI Enhanced Side */}
                    <div style={{
                      padding: '2rem',
                      backgroundColor: 'rgba(139, 92, 246, 0.03)'
                    }}>
                      <h4 style={{
                        fontSize: '0.875rem',
                        color: '#8b5cf6',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <Brain size={16} />
                        AI Enhanced Version
                      </h4>
                      <p style={{
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        marginBottom: '1rem',
                        fontFamily: 'monospace'
                      }}>
                        {example.ai_enhanced}
                      </p>
                      <button
                        onClick={() => handleTryInEsy({
                          prompt: example.ai_enhanced,
                          type: 'AI Enhanced'
                        })}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: '#8b5cf6',
                          borderRadius: '6px',
                          color: '#ffffff',
                          fontSize: '0.813rem',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          border: 'none'
                        }}
                      >
                        Try with AI
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Benefit Bar */}
                  <div style={{
                    padding: '1rem 2rem',
                    backgroundColor: 'rgba(139, 92, 246, 0.05)',
                    borderTop: '1px solid rgba(139, 92, 246, 0.1)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Zap size={16} style={{ color: '#8b5cf6' }} />
                    {example.benefit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* FAQ Section for SEO */}
      <section style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        backgroundColor: '#16161f',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: 300,
            marginBottom: '3rem',
            textAlign: 'center',
            fontFamily: 'var(--font-literata)'
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              {
                question: "What are writing prompts?",
                answer: "Writing prompts are ideas, questions, or scenarios designed to inspire creative writing. They help overcome writer's block and spark new ideas for stories, essays, poems, and other written content."
              },
              {
                question: "How do AI writing prompts differ from traditional prompts?",
                answer: "AI writing prompts are specifically formatted instructions for AI tools like ChatGPT, Claude, or Esy. They include detailed parameters, context, and output specifications to help AI generate better content."
              },
              {
                question: "Can I use these prompts for commercial projects?",
                answer: "Yes! All prompts on this page are free to use for any purpose, including commercial projects. Premium prompts come with extended licenses."
              },
              {
                question: "How often are new prompts added?",
                answer: "We add new prompts weekly. Subscribe to our newsletter to get a fresh prompt delivered to your inbox every week."
              }
            ].map((faq, index) => (
              <div
                key={index}
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  marginBottom: '0.75rem'
                }}>
                  {faq.question}
                </h3>
                <p style={{
                  fontSize: '0.938rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.7
                }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: 300,
            marginBottom: '1rem',
            fontFamily: 'var(--font-literata)'
          }}>
            Get a Free Prompt Every Week
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2rem'
          }}>
            Join 10,000+ writers receiving weekly prompts and writing tips
          </p>

          {!subscribed ? (
            <div style={{
              display: 'flex',
              gap: '1rem',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.875rem',
                  backgroundColor: '#16161f',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '0.938rem',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSubscribe}
                style={{
                  padding: '0.875rem 1.5rem',
                  backgroundColor: '#8b5cf6',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '0.938rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Mail size={16} />
                Subscribe
              </button>
            </div>
          ) : (
            <div style={{
              padding: '1rem',
              backgroundColor: 'rgba(74, 222, 128, 0.1)',
              border: '1px solid rgba(74, 222, 128, 0.2)',
              borderRadius: '8px',
              color: '#4ade80'
            }}>
              ✓ Success! Check your email for confirmation.
            </div>
          )}
        </div>
      </section>



      {/* Try in Esy Modal */}
      {showTryModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{
            backgroundColor: '#16161f',
            borderRadius: '12px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            animation: 'slideUp 0.3s ease'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '2rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 300,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Sparkles size={24} style={{ color: '#8b5cf6' }} />
                See this prompt in action
              </h2>
              <button
                onClick={() => setShowTryModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  fontSize: '1.5rem',
                  lineHeight: 1
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '2rem' }}>
              {/* Selected Prompt */}
              <div style={{
                backgroundColor: 'rgba(139, 92, 246, 0.05)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  fontFamily: selectedPrompt?.aiTool ? 'monospace' : 'inherit'
                }}>
                  {selectedPrompt?.prompt}
                </p>
              </div>

              {/* AI Benefits */}
              {!isGenerating && !generatedPreview && (
                <div style={{
                  marginBottom: '2rem'
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    marginBottom: '1rem'
                  }}>
                    AI will help you:
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}>
                    {[
                      'Structure your writing with clear organization',
                      'Add depth and supporting details',
                      'Maintain your unique voice and style',
                      'Generate ideas and overcome writer\'s block'
                    ].map((benefit, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.938rem',
                          color: 'rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        <Check size={16} style={{ color: '#8b5cf6' }} />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Generation Area */}
              {(isGenerating || generatedPreview) && (
                <div style={{
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  minHeight: '200px'
                }}>
                  {isGenerating ? (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '200px',
                      gap: '1rem'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid rgba(139, 92, 246, 0.2)',
                        borderTopColor: '#8b5cf6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      <p style={{
                        fontSize: '0.938rem',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>
                        AI is enhancing your prompt...
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div style={{
                        fontSize: '0.813rem',
                        color: '#8b5cf6',
                        marginBottom: '1rem',
                        fontWeight: 500
                      }}>
                        AI-Enhanced Preview:
                      </div>
                      <div style={{
                        fontSize: '0.938rem',
                        lineHeight: 1.8,
                        color: 'rgba(255, 255, 255, 0.9)',
                        whiteSpace: 'pre-line'
                      }}>
                        {generatedPreview}
                      </div>
                      {showSignupPrompt && (
                        <div style={{
                          marginTop: '1.5rem',
                          padding: '1rem',
                          backgroundColor: 'rgba(139, 92, 246, 0.1)',
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          color: '#8b5cf6',
                          textAlign: 'center'
                        }}>
                          ✨ Create a free account to see the full response and continue writing
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {!generatedPreview ? (
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center'
                }}>
                  <button
                    onClick={handleGeneratePreview}
                    style={{
                      padding: '0.875rem 2rem',
                      backgroundColor: '#8b5cf6',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <Sparkles size={18} />
                    Try Now - Free
                  </button>
                  <button
                    onClick={handleQuickSignin}
                    style={{
                      padding: '0.875rem 2rem',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                    }}
                  >
                    Sign In
                  </button>
                </div>
              ) : showSignupPrompt ? (
                <div>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '0.875rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        color: '#ffffff',
                        fontSize: '0.938rem',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                    <button
                      onClick={handleModalSignup}
                      style={{
                        padding: '0.875rem 1.5rem',
                        backgroundColor: '#8b5cf6',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#ffffff',
                        fontSize: '0.938rem',
                        fontWeight: 500,
                        cursor: 'pointer'
                      }}
                    >
                      Continue Free
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default WritingPromptsPage; 