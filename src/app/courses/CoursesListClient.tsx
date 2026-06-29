"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { courses } from '@/lib/learn/mockData';
import { useNewsletterSubscribe } from '@/hooks/useNewsletterSubscribe';
import LibraryHero from '@/components/LibraryHero/LibraryHero';

/* ─────────────────────────────────────────────
   Courses Index — light surface, shared library stage
   Matches /artifacts: a dark .esy-stage hero band sitting
   below the light nav, then a light course grid below.
   ───────────────────────────────────────────── */

const COURSE_ICONS: Record<string, string> = {
  'how-to-use-claude-code': '⚡',
  'chatgpt-for-research-workflows': '🔬',
  'create-educational-infographics-with-nano-banana': '🍌',
};

// Per-card hero gradient — staggered navy tones so adjacent cards read distinct.
function cardGradient(idx: number): string {
  const a = idx === 0 ? '#0A2540' : idx === 1 ? '#0F3460' : '#061527';
  const b = idx === 0 ? '#0F3460' : idx === 1 ? '#0A2540' : '#0D2B4A';
  return `linear-gradient(135deg, ${a} 0%, ${b} 100%)`;
}

export default function CoursesListClient() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [nlEmail, setNlEmail] = useState('');
  const { subscribe, status: nlStatus, errorMessage: nlError, reset: nlReset } = useNewsletterSubscribe();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ─── Light theme tokens (single surface, matches the artifact pages) ───
  const accent = '#00A896';
  const accentLight = '#00D4AA';
  const text = '#1A1A2E';
  const muted = '#6C757D';
  const subtle = '#ADB5BD';
  const bg = '#FFFFFF';
  const cardBorder = '#E2E8F0';
  const hoverBorder = 'rgba(0,168,150,0.35)';
  const tagBg = 'rgba(0,168,150,0.06)';

  // ─── Stats + featured spotlight ─────────────────
  const totalLessons = courses.reduce((a, c) => a + c.totalLessons, 0);
  const totalCourses = courses.length;
  const featured = courses[0];
  const featuredEmoji = COURSE_ICONS[featured?.slug] || '📚';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: bg,
      color: text,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      {/* ═══ Library stage hero (shared with the artifact catalog pages) ═══ */}
      <LibraryHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Courses' }]}
        title="Courses"
        subhead="Practical courses for the AI solopreneur — learn to build agents, design agentic workflows, and use AI Coding Tools to run and grow your business."
        meta={
          <>
            <span><strong>{totalCourses}</strong> {totalCourses === 1 ? 'course' : 'courses'}</span>
            <span className="esy-stage__meta-dot">·</span>
            <span><strong>{totalLessons}</strong> {totalLessons === 1 ? 'lesson' : 'lessons'}</span>
            <span className="esy-stage__meta-dot">·</span>
            <span>self-paced, free</span>
          </>
        }
        feature={
          // Featured-course spotlight — courses have no cover art, so we render the
          // signature gradient + emoji card to fill the stage's feature column.
          <Link
            href={`/courses/${featured.slug}`}
            aria-label={`Featured course: ${featured.title}`}
            style={{
              position: 'relative',
              display: 'block',
              width: '100%',
              aspectRatio: '4 / 3',
              borderRadius: 16,
              overflow: 'hidden',
              textDecoration: 'none',
              background: cardGradient(0),
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 60px -18px rgba(0,0,0,0.7)',
            }}
          >
            {/* Faint grid + accent glow, echoing the course-card hero treatment. */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
            <div style={{
              position: 'absolute', bottom: '-25%', right: '-10%',
              width: '60%', height: '60%',
              background: 'radial-gradient(circle, rgba(0,212,170,0.18) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }} />

            {/* Centered emoji + play affordance. */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
            }}>
              <span style={{ fontSize: '3rem' }}>{featuredEmoji}</span>
              <span style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 48, height: 48, borderRadius: '50%',
                backgroundColor: accent,
                boxShadow: '0 8px 24px rgba(0,212,170,0.35)',
              }}>
                <Play size={20} color="#fff" fill="#fff" style={{ marginLeft: 2 }} />
              </span>
            </div>

            {/* Caption — mirrors the carousel slide caption used on /artifacts. */}
            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 0,
              padding: '1.75rem 1rem 0.95rem',
              display: 'flex', flexDirection: 'column', gap: '0.25rem',
              background: 'linear-gradient(to top, rgba(10,37,64,0.92), rgba(10,37,64,0))',
              color: '#fff',
            }}>
              <span style={{
                fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#5eead4',
              }}>
                Featured course
              </span>
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, lineHeight: 1.3 }}>
                {featured.title}
              </span>
            </div>
          </Link>
        }
      />

      {/* ═══ COURSES GRID ═══ */}
      <section style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: isMobile ? '0 1.5rem 4rem' : '0 2.5rem 6rem',
      }}>
        {/* Section divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          marginBottom: '2.5rem',
        }}>
          <span style={{
            fontSize: '0.75rem', fontWeight: 600, color: accent,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}>
            All Courses
          </span>
          <div style={{ flex: 1, height: '1px', background: cardBorder }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '1.75rem',
        }}>
          {courses.map((course, idx) => {
            const isHovered = hoveredCard === course.slug;
            const emoji = COURSE_ICONS[course.slug] || '📚';
            return (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  border: `1px solid ${isHovered ? hoverBorder : cardBorder}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? '0 20px 60px rgba(10,37,64,0.12), 0 0 0 1px rgba(0,168,150,0.08)'
                    : '0 1px 4px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={() => setHoveredCard(course.slug)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* ─── Card Hero Area ─── */}
                <div style={{
                  position: 'relative',
                  height: '200px',
                  background: cardGradient(idx),
                  overflow: 'hidden',
                }}>
                  {/* Grid overlay on card */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.5,
                  }} />
                  {/* Accent glow */}
                  <div style={{
                    position: 'absolute', bottom: '-30%', right: '-10%',
                    width: '200px', height: '200px',
                    background: 'radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    transition: 'opacity 0.3s',
                    opacity: isHovered ? 1 : 0.5,
                  }} />

                  {/* Center content */}
                  <div style={{
                    position: 'relative', zIndex: 1,
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: '0.75rem',
                  }}>
                    {/* Icon */}
                    <div style={{
                      fontSize: '2.5rem',
                      filter: isHovered ? 'none' : 'grayscale(0.2)',
                      transition: 'all 0.3s',
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    }}>
                      {emoji}
                    </div>
                    {/* Play button */}
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '44px', height: '44px', borderRadius: '50%',
                      backgroundColor: isHovered ? accent : 'rgba(255,255,255,0.1)',
                      border: `2px solid ${isHovered ? accent : 'rgba(255,255,255,0.2)'}`,
                      transition: 'all 0.3s',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    }}>
                      <Play size={18} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '2px' }} />
                    </div>
                    {/* Metadata */}
                    <span style={{
                      fontSize: '0.688rem', color: 'rgba(255,255,255,0.5)',
                      textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500,
                    }}>
                      {course.totalLessons} lessons · {course.totalDurationLabel}
                    </span>
                  </div>
                </div>

                {/* ─── Card Body ─── */}
                <div style={{
                  padding: '1.5rem',
                  flex: 1,
                  display: 'flex', flexDirection: 'column',
                }}>
                  <h3 style={{
                    fontSize: '1.25rem', fontWeight: 700, color: text,
                    margin: '0 0 0.625rem', lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                  }}>
                    {course.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem', color: muted,
                    lineHeight: 1.7, margin: '0 0 1.25rem',
                    flex: 1,
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {course.description}
                  </p>

                  {/* Tags */}
                  <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '0.375rem',
                    marginBottom: '1.25rem',
                  }}>
                    {course.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.688rem', color: accent, fontWeight: 500,
                        backgroundColor: tagBg,
                        padding: '3px 10px', borderRadius: '100px',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: `1px solid ${cardBorder}`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      {course.author.avatar ? (
                        <img
                          src={course.author.avatar}
                          alt={course.author.name}
                          style={{
                            width: '30px', height: '30px', borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '30px', height: '30px', borderRadius: '50%',
                          background: `linear-gradient(135deg, ${accent}, ${accentLight})`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.688rem', fontWeight: 700, color: '#0A2540',
                        }}>
                          {course.author.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div>
                        <span style={{ fontSize: '0.813rem', color: text, fontWeight: 500, display: 'block', lineHeight: 1.2 }}>
                          {course.author.name}
                        </span>
                        <span style={{ fontSize: '0.688rem', color: subtle }}>
                          {course.author.role}
                        </span>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.375rem',
                      fontSize: '0.813rem', fontWeight: 600, color: accent,
                      transition: 'gap 0.2s',
                    }}>
                      View Course
                      <ArrowRight size={14} style={{
                        transition: 'transform 0.2s',
                        transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                      }} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══ BOTTOM CTA — Newsletter (intentional dark band, like /research) ═══ */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '3rem 1.5rem' : '5rem 2.5rem',
        backgroundColor: '#0A2540',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,212,170,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 60% 80% at 50% 50%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 50% 50%, black 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '520px', margin: '0 auto', textAlign: 'center',
        }}>
          {nlStatus === 'success' ? (
            <>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                backgroundColor: 'rgba(0, 212, 170, 0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}>
                <CheckCircle2 size={24} color="#00D4AA" strokeWidth={1.5} />
              </div>
              <h2 style={{
                fontFamily: 'var(--font-literata)',
                fontSize: isMobile ? '1.75rem' : '2.25rem',
                fontWeight: 300, color: '#FFFFFF',
                margin: '0 0 0.75rem',
                letterSpacing: '-0.01em',
              }}>
                You&apos;re in
              </h2>
              <p style={{
                fontSize: '0.938rem', color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7, margin: '0',
              }}>
                We&apos;ll notify you when new courses and tutorials are released.
                Check your inbox for a welcome email — if you don&apos;t see it, check your spam or promotions folder.
              </p>
            </>
          ) : (
            <>
              <h2 style={{
                fontFamily: 'var(--font-literata)',
                fontSize: isMobile ? '1.75rem' : '2.25rem',
                fontWeight: 300, color: '#FFFFFF',
                margin: '0 0 0.75rem',
                letterSpacing: '-0.01em',
              }}>
                Never miss a new course
              </h2>
              <p style={{
                fontSize: '0.938rem', color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7, marginBottom: '2rem',
              }}>
                Get notified about new courses, tutorials, and AI research workflows
                delivered to your inbox.
              </p>
              <form
                onSubmit={(e) => { e.preventDefault(); subscribe(nlEmail); }}
                style={{
                  display: 'flex', gap: '0.5rem',
                  maxWidth: '440px', margin: '0 auto',
                  flexDirection: isMobile ? 'column' : 'row',
                }}
              >
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={nlEmail}
                  onChange={(e) => { setNlEmail(e.target.value); if (nlStatus === 'error') nlReset(); }}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: nlStatus === 'error'
                      ? '1.5px solid #ef4444'
                      : '1.5px solid rgba(255,255,255,0.12)',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    color: '#FFFFFF',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxShadow: nlStatus === 'error' ? '0 0 0 3px rgba(239,68,68,0.15)' : 'none',
                  }}
                  onFocus={(e) => {
                    if (nlStatus !== 'error') {
                      e.currentTarget.style.borderColor = 'rgba(0,212,170,0.5)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,170,0.1)';
                    }
                  }}
                  onBlur={(e) => {
                    if (nlStatus !== 'error') {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={nlStatus === 'loading'}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#00A896',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    cursor: nlStatus === 'loading' ? 'default' : 'pointer',
                    opacity: nlStatus === 'loading' ? 0.7 : 1,
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 16px rgba(0,212,170,0.25)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {nlStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {nlStatus === 'error' && nlError && (
                <p style={{
                  marginTop: '0.75rem',
                  fontSize: '0.8125rem',
                  color: '#ef4444',
                  lineHeight: 1.4,
                }}>
                  {nlError}
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
