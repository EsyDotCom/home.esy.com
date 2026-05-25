"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, BookOpen, Users, FileText, 
  CheckCircle, ArrowRight, Sparkles, Calendar,
  Target, Brain, PenTool, Clock, AlertCircle,
  Star, ChevronDown, ExternalLink
} from 'lucide-react';

const ESYLandingPage = () => {
  const [activeSection, setActiveSection] = useState('what-is-esy');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const esyRequirements = [
    {
      title: 'Regression Analysis',
      description: 'Student shows significant skill loss during breaks from school',
      icon: Target
    },
    {
      title: 'Recoupment Period',
      description: 'Takes excessive time to regain lost skills after breaks',
      icon: Clock
    },
    {
      title: 'IEP Team Decision',
      description: 'Collaborative team determines need based on data and observations',
      icon: Users
    },
    {
      title: 'Individual Needs',
      description: 'Services tailored to prevent regression in specific skill areas',
      icon: Brain
    }
  ];

  const documentationChallenges = [
    'Writing clear, measurable IEP goals for summer programming',
    'Creating progress reports that track skill maintenance',
    'Documenting regression data and recoupment analysis',
    'Communicating with parents about summer programming needs',
    'Developing lesson plans aligned with IEP objectives',
    'Tracking and reporting student progress throughout ESY'
  ];

  const faqs = [
    {
      question: "What exactly is Extended School Year (ESY)?",
      answer: "Extended School Year (ESY) refers to special education services provided beyond the traditional 180-day school year. ESY is not summer school or enrichment - it's individualized special education programming designed to prevent significant regression of critical skills during extended breaks from school."
    },
    {
      question: "Who qualifies for ESY services?",
      answer: "Students with disabilities who demonstrate both significant regression during breaks AND require an excessive amount of time to recoup lost skills may qualify for ESY. The IEP team makes this determination based on documented data, not just the student's disability category or severity."
    },
    {
      question: "What's the difference between ESY and summer school?",
      answer: "ESY is individualized special education services based on a student's IEP, while summer school is typically general education programming. ESY focuses on maintaining critical skills to prevent regression, whereas summer school often focuses on credit recovery or enrichment."
    },
    {
      question: "How does the IEP team determine ESY eligibility?",
      answer: "The team considers factors like documented regression patterns, time needed to recoup skills, critical life skills impact, and whether breaks in programming would significantly jeopardize educational progress. This decision must be based on individual student data, not blanket policies."
    },
    {
      question: "What documentation is required for ESY?",
      answer: "Teams need regression data, recoupment analysis, IEP goals and objectives, progress monitoring data, and detailed justification for why continuous programming is necessary. This documentation must clearly support the need for services beyond the regular school year."
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: '#ffffff',
      fontFamily: 'var(--font-inter)',
      paddingTop: isMobile ? '6rem' : '8rem' // Compensate for global header
    }}>
      {/* Hero Section */}
      <section style={{
        padding: isMobile ? '3rem 1.5rem' : '6rem 2rem',
        textAlign: 'center',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '100px',
          marginBottom: '2rem'
        }}>
          <GraduationCap size={16} style={{ color: '#8b5cf6' }} />
          <span style={{
            fontSize: '1rem',
            color: '#8b5cf6',
            fontWeight: 500,
            letterSpacing: '0.05em'
          }}>
            EXTENDED SCHOOL YEAR GUIDE
          </span>
        </div>

        <h1 style={{
          fontSize: isMobile ? '3rem' : '4rem',
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: '1.5rem'
        }}>
          Extended School Year
          <br />
          <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Complete Guide</span>
        </h1>
        
        <p style={{
          fontSize: isMobile ? '1.25rem' : '1.5rem',
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: 1.6,
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          Everything you need to know about ESY services, requirements, and documentation. 
          Plus AI-powered tools to streamline your special education writing.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '4rem'
        }}>
          <a href="#what-is-esy" style={{
            padding: isMobile ? '1rem 2rem' : '1rem 2.5rem',
            backgroundColor: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 500,
            width: isMobile ? '100%' : 'auto',
            textAlign: 'center'
          }}>
            Learn About ESY
          </a>
          
          <a href="#documentation" style={{
            padding: isMobile ? '1rem 2rem' : '1rem 2.5rem',
            backgroundColor: '#8b5cf6',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: isMobile ? '100%' : 'auto',
            justifyContent: 'center'
          }}>
            ESY Documentation Tools
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Quick Overview Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '1.5rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {[
            { stat: 'IDEA', label: 'Required by Federal Law' },
            { stat: 'IEP', label: 'Team Decision' },
            { stat: '∼6-8', label: 'Weeks Typical Duration' },
            { stat: '1:1', label: 'Individualized Services' }
          ].map((item, index) => (
            <div key={index} style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 300,
                color: '#8b5cf6',
                marginBottom: '0.25rem'
              }}>
                {item.stat}
              </div>
              <div style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.5)',
                lineHeight: 1.4
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What is ESY Section */}
      <section id="what-is-esy" style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        backgroundColor: '#16161f',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '3rem',
            fontWeight: 300,
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            What is Extended School Year?
          </h2>

          <div style={{
            fontSize: '1.25rem',
            lineHeight: 1.8,
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '3rem',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto 3rem'
          }}>
            Extended School Year (ESY) services are special education and related services 
            provided to students with disabilities beyond the normal school year. ESY is 
            not summer school—it&apos;s individualized programming designed to prevent 
            significant educational regression.
          </div>

          {/* Key Principles */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            <div style={{
              padding: '2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 400,
                marginBottom: '1rem',
                color: '#8b5cf6'
              }}>
                Legal Foundation
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                ESY services are required under the Individuals with Disabilities Education Act (IDEA). 
                Schools must provide ESY when necessary to ensure a student receives a free appropriate 
                public education (FAPE) and to prevent substantial regression of critical skills.
              </p>
            </div>

            <div style={{
              padding: '2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 400,
                marginBottom: '1rem',
                color: '#8b5cf6'
              }}>
                Individual Decision
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                ESY eligibility is determined individually by each student&apos;s IEP team. 
                There are no blanket policies based on disability category, severity, 
                or specific programs. Each decision must be based on the unique needs of the student.
              </p>
            </div>
          </div>

          {/* ESY Requirements */}
          <h3 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: 300,
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            ESY Eligibility Factors
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
            gap: '1.5rem'
          }}>
            {esyRequirements.map((requirement, index) => {
              const Icon = requirement.icon;
              return (
                <div
                  key={index}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <Icon size={24} style={{ color: '#8b5cf6' }} />
                    <h4 style={{
                      fontSize: '1.125rem',
                      fontWeight: 500,
                      margin: 0
                    }}>
                      {requirement.title}
                    </h4>
                  </div>
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {requirement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Documentation Challenges Section */}
      <section id="documentation" style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '3rem',
            fontWeight: 300,
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            ESY Documentation Challenges
          </h2>

          <p style={{
            fontSize: '1.25rem',
            lineHeight: 1.8,
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            marginBottom: '3rem',
            maxWidth: '700px',
            margin: '0 auto 3rem'
          }}>
            ESY programs require extensive documentation. From IEP goals to progress reports, 
            special education professionals spend countless hours writing.
          </p>

          {/* Documentation List */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '2rem',
            marginBottom: '3rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 400,
              marginBottom: '1.5rem',
              color: '#8b5cf6'
            }}>
              Common ESY Documentation Requirements
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '1rem'
            }}>
              {documentationChallenges.map((challenge, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.5rem 0'
                  }}
                >
                  <CheckCircle size={16} style={{ 
                    color: '#8b5cf6', 
                    flexShrink: 0,
                    marginTop: '0.25rem'
                  }} />
                  <span style={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.6
                  }}>
                    {challenge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution - Esy Platform */}
          <div style={{
            backgroundColor: 'rgba(139, 92, 246, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(139, 92, 246, 0.1)',
            padding: '3rem',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '50%'
              }}>
                <Sparkles size={32} style={{ color: '#8b5cf6' }} />
              </div>
            </div>

            <h3 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: 300,
              marginBottom: '1rem'
            }}>
              Streamline Your ESY Documentation
            </h3>
            
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.7,
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              While we don&apos;t provide ESY services, Esy&apos;s AI-powered writing platform 
              helps special education professionals create better documentation faster. 
              Save hours on IEP goals, progress reports, and parent communications.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <a href="/ai-essay-writer/" style={{
                padding: '1rem 2rem',
                backgroundColor: '#8b5cf6',
                borderRadius: '8px',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Try Esy AI Free
                <ArrowRight size={18} />
              </a>
              
              <Link href="/workflows/special-education" style={{
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '8px',
                color: '#8b5cf6',
                textDecoration: 'none',
                fontSize: '1rem'
              }}>
                View ESY Templates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
            fontSize: isMobile ? '2.5rem' : '3rem',
            fontWeight: 300,
            marginBottom: '3rem',
            textAlign: 'center'
          }}>
            ESY Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left'
                  }}
                >
                  {faq.question}
                  <ChevronDown 
                    size={20} 
                    style={{
                      transform: expandedFaq === index ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}
                  />
                </button>
                
                {expandedFaq === index && (
                  <div style={{
                    padding: '0 1.5rem 1.5rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '1rem',
                    lineHeight: 1.7
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: isMobile ? '2.5rem' : '3rem',
          fontWeight: 300,
          marginBottom: '1rem'
        }}>
          Ready to improve your ESY documentation?
        </h2>
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          Join special education professionals using Esy&apos;s AI to write better 
          IEP goals, progress reports, and parent communications in half the time.
        </p>
        
        <a
          href="/school/"
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#8b5cf6',
            borderRadius: '8px',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          Write Better Documentation
          <ArrowRight size={18} />
        </a>
      </section>
    </div>
  );
};

export default ESYLandingPage; 