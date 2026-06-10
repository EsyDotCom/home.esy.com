/**
 * EssayGeneratorPro Component
 * © 2025 Esy.com - All Rights Reserved
 * 
 * World-class essay generation interface with intelligent prompt integration
 * MVP+ Architecture: Perfect balance of power and simplicity
 * 
 * Features:
 * - 3 Core customization options (Type, Level, Length)
 * - Intelligent prompt library integration
 * - Smart prompt matching based on topic
 * - Post-generation email capture
 * - Mobile-first responsive design
 */

"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  PenTool,
  Sparkles, 
  Zap, 
  BookOpen, 
  GraduationCap,
  FileText,
  Brain,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Award,
  ChevronRight,
  Clock,
  Users,
  Star,
  Lock,
  Mail,
  Eye,
  EyeOff,
  X,
  type LucideIcon
} from 'lucide-react';

// Prompt library types
interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  uses: number;
  rating: number;
  isPro?: boolean;
  tags: string[];
  icon?: LucideIcon;
}

interface EssayOptions {
  type: 'argumentative' | 'analytical' | 'research' | 'general';
  level: 'high-school' | 'college' | 'graduate';
  length: 'short' | 'medium' | 'long';
  promptId?: string;
}

interface EssayGeneratorProProps {
  onGenerate?: (topic: string, options: EssayOptions) => void;
  isGenerating?: boolean;
  style?: React.CSSProperties;
  promptLibrary?: Prompt[];
}

const EssayGeneratorPro: React.FC<EssayGeneratorProProps> = ({
  onGenerate,
  isGenerating = false,
  style = {},
  promptLibrary = []
}) => {
  const [topic, setTopic] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<EssayOptions>({
    type: 'general',
    level: 'college',
    length: 'medium'
  });
  const [showPrompts, setShowPrompts] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [isPreviewBlurred, setIsPreviewBlurred] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Responsive detection
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isSmallMobile = windowWidth < 480;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample prompt library - actual essay topics/prompts
  const defaultPrompts: Prompt[] = [
    {
      id: 'social-media-impact',
      title: 'Should social media platforms be held responsible for misinformation?',
      description: 'Explore the debate around platform accountability, free speech, and content moderation in the digital age',
      category: 'Technology & Society',
      uses: 2341,
      rating: 4.9,
      tags: ['argumentative', 'technology', 'ethics'],
      icon: Brain
    },
    {
      id: 'climate-policy',
      title: 'Analyze the effectiveness of carbon tax policies in combating climate change',
      description: 'Examine economic impacts, environmental benefits, and implementation challenges across different countries',
      category: 'Environment',
      uses: 1876,
      rating: 4.8,
      tags: ['analytical', 'environment', 'policy'],
      icon: TrendingUp
    },
    {
      id: 'ai-education',
      title: 'How is artificial intelligence transforming modern education?',
      description: 'Research the benefits, challenges, and future implications of AI-powered learning systems',
      category: 'Education',
      uses: 956,
      rating: 4.7,
      tags: ['research', 'technology', 'education'],
      icon: GraduationCap
    },
    {
      id: 'mental-health',
      title: 'The correlation between social media use and teenage mental health',
      description: 'Critical analysis of recent studies linking screen time to anxiety and depression in adolescents',
      category: 'Psychology',
      uses: 3102,
      rating: 4.9,
      isPro: true,
      tags: ['research', 'psychology', 'health'],
      icon: Brain
    }
  ];

  const prompts = promptLibrary.length > 0 ? promptLibrary : defaultPrompts;

  // Rotating placeholders
  const placeholders = [
    "The impact of artificial intelligence on modern education...",
    "Climate change and sustainable urban development strategies...",
    "The psychology behind social media addiction in teenagers...",
    "Quantum computing's role in solving complex global problems...",
    "The ethics of gene editing in human enhancement..."
  ];

  // Animate placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Smart prompt matching based on topic and essay type
  const suggestedPrompt = useMemo(() => {
    if (!topic) return null;
    
    const topicLower = topic.toLowerCase();
    
    // Match prompts based on keywords and essay type
    if (topicLower.includes('social media') || topicLower.includes('platform') || topicLower.includes('misinformation')) {
      return prompts.find(p => p.id === 'social-media-impact');
    }
    if (topicLower.includes('climate') || topicLower.includes('carbon') || topicLower.includes('environment')) {
      return prompts.find(p => p.id === 'climate-policy');
    }
    if (topicLower.includes('ai') || topicLower.includes('artificial intelligence') || topicLower.includes('education')) {
      return prompts.find(p => p.id === 'ai-education');
    }
    if (topicLower.includes('mental health') || topicLower.includes('teenage') || topicLower.includes('social media')) {
      return prompts.find(p => p.id === 'mental-health');
    }
    
    // Also suggest based on selected essay type
    if (selectedOptions.type === 'argumentative') {
      return prompts.find(p => p.tags.includes('argumentative'));
    }
    if (selectedOptions.type === 'analytical') {
      return prompts.find(p => p.tags.includes('analytical'));
    }
    if (selectedOptions.type === 'research') {
      return prompts.find(p => p.tags.includes('research'));
    }
    
    return null;
  }, [topic, prompts, selectedOptions.type]);

  // Handle input
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTopic(value);
    
    // Auto-resize
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`;
    }
  };

  // Handle generation
  const handleGenerate = async () => {
    if (!topic.trim()) return;

    // Simulate generation and show preview
    setPreviewText(`
# ${topic}

## Introduction

The topic of ${topic} represents one of the most significant challenges facing our modern society. This essay will explore the multifaceted nature of this issue, examining both historical context and contemporary implications. Through careful analysis of current research and expert opinions, we will develop a comprehensive understanding of the key factors at play.

## Background and Context

To fully appreciate the complexity of ${topic}, it is essential to first understand its historical development and the various factors that have contributed to its current state. Recent studies have shown that this issue affects millions of people worldwide, with implications that extend far beyond what might initially be apparent.

The emergence of ${topic} as a critical area of study can be traced back to several key developments in recent decades. Researchers have identified multiple contributing factors, including technological advancement, social change, and evolving cultural norms...

[Content continues with detailed analysis, evidence, and arguments...]
    `.trim());

    setShowEmailCapture(true);
    
    // Call the actual generation function if provided
    if (onGenerate) {
      const options: EssayOptions = {
        ...selectedOptions,
        promptId: selectedPrompt?.id
      };
      onGenerate(topic, options);
    }
  };

  // Handle email submission
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // In production, save email and show full essay
    setIsPreviewBlurred(false);
    
    // Redirect to app after a moment
    setTimeout(() => {
      window.open(`https://app.esy.com?topic=${encodeURIComponent(topic)}`, '_blank');
    }, 2000);
  };

  const styles = {
    container: {
      position: 'relative' as const,
      width: '100%',
      // Fluid max width
      maxWidth: `min(100%, ${isMobile ? '100%' : '860px'})`,
      margin: '0 auto',
      ...style
    },
    mainWrapper: {
      position: 'relative' as const,
      background: isFocused
        ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)'
        : 'linear-gradient(135deg, rgba(22, 22, 31, 0.6) 0%, rgba(22, 22, 31, 0.4) 100%)',
      border: `2px solid ${isFocused ? 'rgba(139, 92, 246, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
      // Fluid border radius
      borderRadius: `clamp(16px, 2.5vw, 24px)`,
      // Fluid padding system
      padding: `clamp(1.25rem, 3vw, 2rem)`,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(20px)',
      boxShadow: isFocused
        ? `0 0 0 4px rgba(139, 92, 246, 0.1),
           0 20px 40px rgba(139, 92, 246, 0.15),
           inset 0 1px 0 rgba(255, 255, 255, 0.1)`
        : `0 10px 30px rgba(0, 0, 0, 0.2),
           inset 0 1px 0 rgba(255, 255, 255, 0.05)`
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '0.75rem' : '1rem',
      marginBottom: isMobile ? '1rem' : '1.25rem'
    },
    iconWrapper: {
      width: isMobile ? '36px' : '44px',
      height: isMobile ? '36px' : '44px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
    },
    title: {
      fontSize: isMobile ? '1.125rem' : '1.375rem',
      fontWeight: '600',
      color: '#ffffff',
      margin: '0 0 0.5rem 0',
      letterSpacing: '-0.02em',
      textAlign: 'left' as const,
      fontFamily: 'var(--font-literata)'
    },
    subtitle: {
      fontSize: isMobile ? '0.8125rem' : '0.875rem',
      color: 'rgba(255, 255, 255, 0.6)',
      margin: 0,
      textAlign: 'left' as const
    },
    textarea: {
      width: '100%',
      minHeight: isMobile ? '60px' : '72px',
      maxHeight: '200px',
      padding: isMobile ? '0.875rem' : '1rem',
      marginBottom: '1rem',
      background: isFocused 
        ? 'rgba(10, 10, 15, 0.6)'
        : 'rgba(10, 10, 15, 0.4)',
      border: `1px solid ${isFocused ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
      borderRadius: '12px',
      color: '#ffffff',
      fontSize: isMobile ? '0.9375rem' : '1.0625rem',
      fontFamily: 'var(--font-inter)',
      fontWeight: '400',
      lineHeight: 1.6,
      outline: 'none',
      resize: 'none' as const,
      transition: 'all 0.3s ease',
      caretColor: '#8b5cf6'
    },
    optionsSection: {
      marginBottom: '1.25rem'
    },
    optionGroup: {
      marginBottom: '1rem'
    },
    optionLabel: {
      fontSize: isMobile ? '0.75rem' : '0.8125rem',
      color: 'rgba(255, 255, 255, 0.5)',
      fontWeight: '600',
      marginBottom: '0.5rem',
      display: 'block'
    },
    optionChips: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap' as const
    },
    optionChip: {
      padding: isMobile ? '0.5rem 0.875rem' : '0.625rem 1rem',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: isMobile ? '0.8125rem' : '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      userSelect: 'none' as const
    },
    optionChipSelected: {
      background: 'rgba(139, 92, 246, 0.15)',
      border: '1px solid rgba(139, 92, 246, 0.4)',
      color: '#8b5cf6'
    },
    promptSection: {
      marginTop: isMobile ? '1.25rem' : '1.5rem',
      paddingTop: isMobile ? '1.25rem' : '1.5rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    },
    promptHeader: {
      display: 'flex',
      flexDirection: (isMobile ? 'column' : 'row') as React.CSSProperties['flexDirection'],
      alignItems: isMobile ? 'stretch' : 'center',
      justifyContent: 'space-between',
      marginBottom: isMobile ? '1.25rem' : '1rem',
      gap: isMobile ? '0.875rem' : '0'
    },
    promptTitle: {
      fontSize: isMobile ? '0.9375rem' : '0.9375rem',
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '500',
      display: 'flex',
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: '0.375rem',
      flexWrap: 'nowrap' as React.CSSProperties['flexWrap'],
      lineHeight: isMobile ? 1.5 : 1.2
    },
    viewAllButton: {
      display: isMobile ? 'inline-flex' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.375rem',
      color: '#ffffff',
      fontSize: isMobile ? '0.8125rem' : '0.8125rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      background: isMobile ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)' : 'none',
      border: isMobile ? '1px solid rgba(139, 92, 246, 0.3)' : 'none',
      padding: isMobile ? '0.625rem 1rem' : '0.25rem 0.5rem',
      whiteSpace: 'nowrap',
      width: isMobile ? '100%' : 'auto',
      borderRadius: '10px',
      backdropFilter: isMobile ? 'blur(10px)' : 'none'
    },
    promptGrid: {
      display: 'grid',
      gridTemplateColumns: isSmallMobile ? '1fr' : isMobile ? 'repeat(auto-fit, minmax(250px, 1fr))' : 'repeat(2, 1fr)',
      gap: isMobile ? '0.75rem' : '1rem'
    },
    promptCard: {
      padding: isMobile ? '1rem' : '1rem',
      background: isMobile ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
      border: isMobile ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: isMobile ? '10px' : '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minHeight: isMobile ? '100px' : 'auto',
      position: 'relative' as const,
      boxShadow: isMobile ? '0 2px 8px rgba(139, 92, 246, 0.05)' : 'none'
    },
    promptCardSelected: {
      background: 'rgba(139, 92, 246, 0.08)',
      border: '1px solid rgba(139, 92, 246, 0.3)'
    },
    promptCardSuggested: {
      border: '1px solid rgba(34, 197, 94, 0.3)',
      background: 'rgba(34, 197, 94, 0.05)'
    },
    suggestedBadge: {
      position: 'absolute' as const,
      top: '-8px',
      right: '12px',
      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      color: '#ffffff',
      fontSize: '0.625rem',
      fontWeight: '700',
      padding: '0.25rem 0.5rem',
      borderRadius: '6px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em'
    },
    promptCardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '0.5rem'
    },
    promptIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      background: 'rgba(139, 92, 246, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    promptCardTitle: {
      fontSize: isMobile ? '0.875rem' : '0.9375rem',
      color: '#ffffff',
      fontWeight: '600',
      margin: 0
    },
    promptCardDescription: {
      fontSize: isMobile ? '0.75rem' : '0.8125rem',
      color: 'rgba(255, 255, 255, 0.5)',
      margin: '0.25rem 0 0.5rem 0',
      lineHeight: 1.4
    },
    promptCardMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '0.6875rem',
      color: 'rgba(255, 255, 255, 0.4)'
    },
    promptRating: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    previewModal: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    },
    previewContainer: {
      width: '100%',
      maxWidth: '720px',
      maxHeight: '80vh',
      background: '#16161f',
      borderRadius: '20px',
      overflow: 'hidden',
      position: 'relative' as const
    },
    previewHeader: {
      padding: '1.5rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    previewContent: {
      padding: '1.5rem',
      maxHeight: 'calc(80vh - 200px)',
      overflowY: 'auto' as const,
      position: 'relative' as const
    },
    previewText: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.9375rem',
      lineHeight: 1.7,
      fontFamily: 'var(--font-inter)',
      filter: isPreviewBlurred ? 'blur(4px)' : 'none',
      transition: 'filter 0.3s ease',
      userSelect: isPreviewBlurred ? 'none' as const : 'auto' as const
    },
    emailOverlay: {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'linear-gradient(135deg, #16161f 0%, #1a1a24 100%)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      borderRadius: '16px',
      padding: '2rem',
      width: '90%',
      maxWidth: '400px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
      display: isPreviewBlurred ? 'block' : 'none'
    },
    emailForm: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    },
    emailInput: {
      padding: '0.875rem',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
      color: '#ffffff',
      fontSize: '0.9375rem',
      outline: 'none',
      transition: 'all 0.2s ease'
    },
    emailSubmitButton: {
      padding: '0.875rem',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      border: 'none',
      borderRadius: '10px',
      color: '#ffffff',
      fontSize: '0.9375rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    }
  };

  return (
    <>
      <style jsx>{`
        textarea::placeholder {
          color: rgba(255, 255, 255, 0.3);
          font-weight: 300;
        }
        textarea::-webkit-scrollbar {
          width: 6px;
        }
        textarea::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        textarea::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 3px;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>
      
      <div style={styles.container}>
        <div style={styles.mainWrapper}>
          {/* Header */}
          <div style={{
            marginBottom: isMobile ? '1.25rem' : '1.5rem'
          }}>
            <h3 style={styles.title}>Start Your First Draft</h3>
            <p style={styles.subtitle}>Tell us what you&apos;re writing about • We&apos;ll help you build it</p>
          </div>

          {/* Topic Input with Generate Button - Professional Aligned Design */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '0.75rem' : '1rem',
            alignItems: 'stretch',
            marginBottom: '1.25rem'
          }}>
            {/* Input Container */}
            <div style={{ 
              flex: 1, 
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <textarea
                ref={inputRef}
                value={topic}
                onChange={handleInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder={placeholders[currentPlaceholder]}
                style={{
                  ...styles.textarea,
                  marginBottom: 0,
                  width: '100%',
                  height: isMobile ? '80px' : '72px',
                  minHeight: isMobile ? '80px' : '72px',
                  maxHeight: '200px'
                }}
                disabled={isGenerating}
                onKeyDown={(e) => {
                  // Allow Cmd/Ctrl + Enter to submit
                  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && topic.trim() && !isGenerating) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />
              
              {/* Character count indicator */}
              {topic.length > 0 && (
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  fontSize: '0.6875rem',
                  color: topic.length > 500 ? '#ef4444' : 'rgba(255, 255, 255, 0.3)',
                  fontWeight: '500',
                  pointerEvents: 'none',
                  background: 'rgba(10, 10, 15, 0.8)',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {topic.length}/500
                </div>
              )}
            </div>
            
            {/* Generate Button - Perfectly Aligned */}
            <button
              style={{
                padding: isMobile ? '1rem 2rem' : '0 2rem',
                height: isMobile ? 'auto' : '72px',
                minHeight: isMobile ? '48px' : '72px',
                background: topic.trim() && !isGenerating
                  ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                  : 'rgba(255, 255, 255, 0.03)',
                border: topic.trim() && !isGenerating
                  ? 'none'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                color: topic.trim() && !isGenerating ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
                fontSize: isMobile ? '0.9375rem' : '1rem',
                fontWeight: '600',
                cursor: topic.trim() && !isGenerating ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: topic.trim() && !isGenerating
                  ? '0 2px 8px rgba(0, 0, 0, 0.08)'
                  : 'none',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                minWidth: isMobile ? '100%' : '140px'
              }}
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              onMouseEnter={(e) => {
                if (topic.trim() && !isGenerating) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (topic.trim() && !isGenerating) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                }
              }}
            >
              {isGenerating ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid #ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <span>Generating</span>
                </>
              ) : (
                <>
                  <span>Generate</span>
                  <ArrowRight size={18} strokeWidth={2} />
                </>
              )}
            </button>
          </div>

          {/* Core Options */}
          <div style={styles.optionsSection}>
            {/* Essay Type */}
            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Essay Type</label>
              <div style={styles.optionChips}>
                {(['argumentative', 'analytical', 'research', 'general'] as const).map(type => (
                  <div
                    key={type}
                    style={{
                      ...styles.optionChip,
                      ...(selectedOptions.type === type ? styles.optionChipSelected : {})
                    }}
                    onClick={() => setSelectedOptions(prev => ({ ...prev, type }))}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Level */}
            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Academic Level</label>
              <div style={styles.optionChips}>
                {(['high-school', 'college', 'graduate'] as const).map(level => (
                  <div
                    key={level}
                    style={{
                      ...styles.optionChip,
                      ...(selectedOptions.level === level ? styles.optionChipSelected : {})
                    }}
                    onClick={() => setSelectedOptions(prev => ({ ...prev, level }))}
                  >
                    {level.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </div>
                ))}
              </div>
            </div>

            {/* Length */}
            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Length</label>
              <div style={styles.optionChips}>
                <div
                  style={{
                    ...styles.optionChip,
                    ...(selectedOptions.length === 'short' ? styles.optionChipSelected : {})
                  }}
                  onClick={() => setSelectedOptions(prev => ({ ...prev, length: 'short' }))}
                >
                  Short (500-1000 words)
                </div>
                <div
                  style={{
                    ...styles.optionChip,
                    ...(selectedOptions.length === 'medium' ? styles.optionChipSelected : {})
                  }}
                  onClick={() => setSelectedOptions(prev => ({ ...prev, length: 'medium' }))}
                >
                  Medium (1000-2000 words)
                </div>
                <div
                  style={{
                    ...styles.optionChip,
                    ...(selectedOptions.length === 'long' ? styles.optionChipSelected : {})
                  }}
                  onClick={() => setSelectedOptions(prev => ({ ...prev, length: 'long' }))}
                >
                  Long (2000+ words)
                </div>
              </div>
            </div>
          </div>

          {/* Prompt Library Section */}
          <div style={styles.promptSection}>
            <div style={styles.promptHeader}>
              <div style={styles.promptTitle}>
                {!isMobile && <Sparkles size={16} color="#8b5cf6" />}
                {isMobile ? "Need inspiration? Tap a prompt below:" : "Don't know what to write? Try these popular essay topics"}
              </div>
              <button
                style={styles.viewAllButton}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
                onClick={() => window.open('/workflows', '_blank')}
              >
                Browse Workflows
                <ChevronRight size={isMobile ? 16 : 14} />
              </button>
            </div>

            <div style={styles.promptGrid}>
              {prompts.slice(0, 4).map(prompt => {
                const IconComponent = prompt.icon || Brain;
                const isSuggested = suggestedPrompt?.id === prompt.id;
                const isSelected = selectedPrompt?.id === prompt.id;
                
                return (
                  <div
                    key={prompt.id}
                    style={{
                      ...styles.promptCard,
                      ...(isSelected ? styles.promptCardSelected : {}),
                      ...(isSuggested && !isSelected ? styles.promptCardSuggested : {})
                    }}
                    onClick={() => {
                      // Populate the topic field with the selected prompt
                      setTopic(prompt.title);
                      setSelectedPrompt(prompt);
                      
                      // Auto-scroll to top and focus the textarea
                      if (inputRef.current) {
                        inputRef.current.focus();
                        inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                      
                      // Auto-select appropriate essay type based on prompt tags
                      if (prompt.tags.includes('argumentative')) {
                        setSelectedOptions(prev => ({ ...prev, type: 'argumentative' }));
                      } else if (prompt.tags.includes('analytical')) {
                        setSelectedOptions(prev => ({ ...prev, type: 'analytical' }));
                      } else if (prompt.tags.includes('research')) {
                        setSelectedOptions(prev => ({ ...prev, type: 'research' }));
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = isSelected 
                        ? 'rgba(139, 92, 246, 0.3)' 
                        : (isSuggested ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 255, 255, 0.08)');
                    }}
                  >
                    {isSuggested && (
                      <div style={styles.suggestedBadge}>
                        🔥 Best Match
                      </div>
                    )}
                    
                    {/* Mobile tap indicator */}
                    {isMobile && (
                      <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        fontSize: '0.625rem',
                        color: isSelected ? '#10b981' : 'rgba(139, 92, 246, 0.6)',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        background: isSelected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        border: `1px solid ${isSelected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(139, 92, 246, 0.2)'}`
                      }}>
                        {isSelected ? '✓ Using' : 'Tap to use'}
                      </div>
                    )}
                    
                    <div style={styles.promptCardHeader}>
                      <div style={styles.promptIcon}>
                        <IconComponent size={16} color="#8b5cf6" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          ...styles.promptCardTitle,
                          fontSize: isMobile ? '0.8125rem' : '0.875rem',
                          lineHeight: 1.3
                        }}>
                          {prompt.title}
                          {prompt.isPro && (
                            <Lock 
                              size={12} 
                              color="#fbbf24" 
                              style={{ marginLeft: '0.5rem', display: 'inline' }}
                            />
                          )}
                        </h4>
                      </div>
                    </div>
                    
                    <p style={styles.promptCardDescription}>
                      {prompt.description}
                    </p>
                    
                    <div style={styles.promptCardMeta}>
                      <div style={styles.promptRating}>
                        <Star size={12} color="#fbbf24" fill="#fbbf24" />
                        <span>{prompt.rating}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Users size={12} />
                        <span>{prompt.uses.toLocaleString()} uses</span>
                      </div>
                    </div>
                    
                    {/* Use Topic Indicator */}
                    {isSelected && (
                      <div style={{
                        marginTop: '0.75rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid rgba(139, 92, 246, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        color: '#8b5cf6',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        <CheckCircle size={14} />
                        <span>Using this topic</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Preview Modal with Email Capture */}
        {showEmailCapture && (
          <div style={styles.previewModal} onClick={() => setShowEmailCapture(false)}>
            <div style={styles.previewContainer} onClick={(e) => e.stopPropagation()}>
              <div style={styles.previewHeader}>
                <h3 style={{ margin: 0, color: '#ffffff' }}>Essay Preview</h3>
                <button
                  onClick={() => setShowEmailCapture(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    padding: '0.5rem'
                  }}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div style={styles.previewContent}>
                <div style={styles.previewText}>
                  <div dangerouslySetInnerHTML={{ 
                    __html: previewText.split('\n').map(line => 
                      line.startsWith('#') ? `<h2 style="margin: 1rem 0; color: #ffffff;">${line.replace(/^#+\s/, '')}</h2>` :
                      line.trim() ? `<p style="margin: 0.75rem 0;">${line}</p>` : '<br/>'
                    ).join('')
                  }} />
                </div>
                
                {/* Email Capture Overlay */}
                <div style={styles.emailOverlay}>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem'
                    }}>
                      <Mail size={24} color="#ffffff" />
                    </div>
                    <h3 style={{ color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                      Get Your Full Essay
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem', margin: 0 }}>
                      Enter your email to unlock the complete essay and save your work
                    </p>
                  </div>
                  
                  <form onSubmit={handleEmailSubmit} style={styles.emailForm}>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={styles.emailInput}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      }}
                      required
                      autoFocus
                    />
                    
                    <button
                      type="submit"
                      style={styles.emailSubmitButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {isPreviewBlurred ? (
                        <>
                          <EyeOff size={16} />
                          <span>Unlock Full Essay</span>
                        </>
                      ) : (
                        <>
                          <Eye size={16} />
                          <span>View Full Essay</span>
                        </>
                      )}
                    </button>
                  </form>
                  
                  <div style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', margin: 0 }}>
                      No spam, unsubscribe anytime
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EssayGeneratorPro;
