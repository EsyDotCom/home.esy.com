'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import './HowItWorksSection.css';

/**
 * HowItWorksSection - Redesigned Process Pipeline
 * 
 * A clear, student-friendly explanation of how Esy works:
 * 1. Pick a Template
 * 2. Add Your Sources
 * 3. Esy Verifies Your Work (with 4 quality checks integrated)
 * 4. Get Your Artifact
 * 
 * Animation: A glowing dot propagates through the steps,
 * triggering the quality check cards when it reaches Step 3.
 */

// Process steps with student-friendly language
const processSteps = [
  {
    number: '01',
    title: 'Pick a Template',
    description: 'Choose the type of artifact you want — essay, research brief, visual, or infographic.',
  },
  {
    number: '02',
    title: 'Add Your Sources',
    description: 'Upload PDFs, paste citations, or add notes. The more context you provide, the stronger the output.',
  },
  {
    number: '03',
    title: 'Esy Verifies Your Work',
    description: 'Every claim is checked against your sources. Structure, evidence, citations, and consistency are all verified before anything is produced.',
    isVerificationStep: true,
  },
  {
    number: '04',
    title: 'Get Your Artifact',
    description: 'A publish-ready, fully sourced artifact — built from your research, verified by Esy.',
  },
];

// Quality checks (integrated into Step 3)
const qualityChecks = [
  {
    title: 'Evidence',
    description: 'Every claim links back to a source. Nothing is asserted without support.',
  },
  {
    title: 'Structure',
    description: 'The argument follows a logical flow that matches your chosen template.',
  },
  {
    title: 'Citations',
    description: 'All references are formatted, complete, and traceable to your original sources.',
  },
  {
    title: 'Consistency',
    description: 'Tone, terminology, and voice stay coherent throughout the entire artifact.',
  },
];

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Animation timing
  const ANIMATION_DURATION = 4000; // 4 seconds for full animation
  const STEP_DURATION = 0.2; // Each step takes 20% of the animation

  // Intersection observer to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Animation loop (plays once)
  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
    
    setAnimationPhase(progress);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setHasAnimated(true);
    }
  }, []);

  // Start animation when visible
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      startTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, hasAnimated, animate]);

  // Calculate which step is active based on animation phase
  const getStepState = (stepIndex: number) => {
    const stepStart = stepIndex * STEP_DURATION;
    const stepEnd = stepStart + STEP_DURATION;
    
    if (animationPhase >= stepEnd || hasAnimated) {
      return 'completed';
    } else if (animationPhase >= stepStart) {
      return 'active';
    }
    return 'pending';
  };

  // Calculate if quality checks should be visible
  const showQualityChecks = animationPhase >= 0.45 || hasAnimated;
  const qualityCheckProgress = Math.max(0, Math.min(1, (animationPhase - 0.45) / 0.25));

  return (
    <section ref={sectionRef} className="hiw-section" aria-labelledby="hiw-title">
      <div className="hiw-container">
        {/* Section Header */}
        <div className="hiw-header">
          <span className="hiw-eyebrow">How It Works</span>
          <h2 id="hiw-title" className="hiw-title">
            How Esy works
          </h2>
        </div>

        {/* Process Timeline */}
        <div className="hiw-timeline">
          {/* Animated connector line */}
          <div className="hiw-timeline-track">
            <div 
              className="hiw-timeline-progress"
              style={{ 
                transform: `scaleX(${hasAnimated ? 1 : animationPhase})`,
              }}
            />
            {/* Animated pulse dot */}
            {isVisible && !hasAnimated && (
              <div 
                className="hiw-pulse-dot"
                style={{ 
                  left: `${animationPhase * 100}%`,
                  opacity: animationPhase < 0.98 ? 1 : 0,
                }}
              />
            )}
          </div>

          {/* Steps */}
          <div className="hiw-steps">
            {processSteps.map((step, index) => {
              const state = getStepState(index);
              const isVerificationStep = step.isVerificationStep;
              
              return (
                <div 
                  key={step.number}
                  className={`hiw-step hiw-step--${state} ${isVerificationStep ? 'hiw-step--verification' : ''}`}
                >
                  {/* Step node */}
                  <div className="hiw-step-node">
                    <span className="hiw-step-number">{step.number}</span>
                  </div>
                  
                  {/* Step content */}
                  <div className="hiw-step-content">
                    <h3 className="hiw-step-title">{step.title}</h3>
                    <p className="hiw-step-description">{step.description}</p>
                  </div>

                  {/* Quality Checks Panel (only for Step 3) */}
                  {isVerificationStep && (
                    <div 
                      className={`hiw-checks-panel ${showQualityChecks ? 'hiw-checks-panel--visible' : ''}`}
                    >
                      <div className="hiw-checks-grid">
                        {qualityChecks.map((check, checkIndex) => {
                          const checkDelay = checkIndex * 0.15;
                          const checkVisible = qualityCheckProgress > checkDelay || hasAnimated;
                          
                          return (
                            <div 
                              key={check.title}
                              className={`hiw-check-card ${checkVisible ? 'hiw-check-card--visible' : ''}`}
                              style={{ 
                                transitionDelay: hasAnimated ? '0ms' : `${checkIndex * 100}ms`,
                              }}
                            >
                              <h4 className="hiw-check-title">{check.title}</h4>
                              <p className="hiw-check-description">{check.description}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
