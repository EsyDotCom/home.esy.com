"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Play, Clock, BookOpen, ChevronRight, ChevronDown, ChevronUp,
  Users, Award, Share2, ArrowRight, Check, Sun, Moon,
  GraduationCap, Zap, Download, ExternalLink, FileText, Github,
  PlayCircle, CheckCircle2, Mail,
} from 'lucide-react';
import { Course, Lesson, Chapter } from '@/lib/learn/types';
import { getAllLessonsFlat } from '@/lib/learn/mockData';
import { navyCalmDarkTheme } from '@/lib/theme';
import { lightTheme } from '@/lib/lightTheme';
import { useNewsletterSubscribe } from '@/hooks/useNewsletterSubscribe';

/* ─────────────────────────────────────────────
   Course Detail — Premium Landing Page
   Hero + description + TOC + video preview
   Inspired by egghead.io & AIHero.dev
   ───────────────────────────────────────────── */

interface CourseDetailClientProps {
  course: Course;
}

const COURSE_ICONS: Record<string, string> = {
  'how-to-use-claude-code': '⚡',
  'chatgpt-for-research-workflows': '🔬',
  'create-educational-infographics-with-nano-banana': '🍌',
};

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set([0]));
  const [shared, setShared] = useState(false);
  const [nlEmail, setNlEmail] = useState('');
  const { subscribe, status: nlStatus, errorMessage: nlError, reset: nlReset } = useNewsletterSubscribe();

  const firstLesson = getAllLessonsFlat(course)[0];
  const allLessons = getAllLessonsFlat(course);
  const emoji = COURSE_ICONS[course.slug] || '📚';

  useEffect(() => {
    const stored = localStorage.getItem('theme-school');
    if (stored === 'light') setIsDark(false);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDark) {
      document.body.style.backgroundColor = navyCalmDarkTheme.bg;
      document.body.className = document.body.className.replace(/\blight\b/g, '').trim();
      if (!document.body.className.includes('dark')) document.body.className += ' dark';
      localStorage.setItem('theme-school', 'dark');
    } else {
      document.body.style.backgroundColor = lightTheme.bg;
      document.body.className = document.body.className.replace(/\bdark\b/g, '').trim();
      if (!document.body.className.includes('light')) document.body.className += ' light';
      localStorage.setItem('theme-school', 'light');
    }
    window.dispatchEvent(new Event('themechange'));
  }, [isDark, mounted]);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const toggleChapter = (idx: number) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: course.title, url });
    } else {
      navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  // ─── Theme tokens ──────────────────────────────
  const accent = isDark ? '#00D4AA' : '#00A896';
  const accentLight = isDark ? '#5EEAD4' : '#00D4AA';
  const text = isDark ? '#FFFFFF' : '#1A1A2E';
  const textSecondary = isDark ? 'rgba(255,255,255,0.85)' : '#4A4A5A';
  const muted = isDark ? 'rgba(255,255,255,0.6)' : '#6C757D';
  const subtle = isDark ? 'rgba(255,255,255,0.35)' : '#ADB5BD';
  const bg = isDark ? '#0A2540' : '#FFFFFF';
  const bgAlt = isDark ? '#061527' : '#F8FAFB';
  const surface = isDark ? 'rgba(15, 52, 96, 0.35)' : '#FFFFFF';
  const surfaceBorder = isDark ? 'rgba(255,255,255,0.06)' : '#E2E8F0';
  const gridLineColor = isDark ? 'rgba(255,255,255,0.025)' : 'rgba(10,37,64,0.035)';
  const tagBg = isDark ? 'rgba(0,212,170,0.1)' : 'rgba(0,168,150,0.06)';
  const lessonHover = isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFB';

  // ─── What You'll Learn (derived from course data) ───
  const learningPoints = course.chapters.flatMap(ch =>
    ch.lessons.map(l => l.description)
  );

  // ─── First lesson resources for display ───
  const resources = firstLesson?.commentary?.resources || [];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: bg,
      color: text,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      transition: 'background-color 0.3s, color 0.3s',
    }}>
      {/* ═══ Theme Toggle ═══ */}
      <button
        onClick={() => setIsDark(d => !d)}
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem',
          width: '42px', height: '42px', borderRadius: '50%',
          backgroundColor: isDark ? 'rgba(15, 52, 96, 0.95)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 50,
          boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.08)',
        }}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={16} color={accent} /> : <Moon size={16} color="#4A4A5A" />}
      </button>

      {/* ═══ HERO SECTION ═══ */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: isMobile ? '100px' : '120px',
        paddingBottom: isMobile ? '2.5rem' : '4rem',
      }}>
        {/* Signature grid bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${gridLineColor} 1px, transparent 1px), linear-gradient(90deg, ${gridLineColor} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 0%, transparent 70%)',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '-10%', right: '20%',
          width: '600px', height: '500px',
          background: isDark
            ? 'radial-gradient(ellipse, rgba(0,212,170,0.08) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(0,168,150,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />

        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '1200px', margin: '0 auto',
          padding: isMobile ? '0 1.5rem' : '0 2.5rem',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 420px',
          gap: isMobile ? '2rem' : '4rem',
          alignItems: 'start',
        }}>
          {/* ─── Left: Course Info ─── */}
          <div>
            {/* Breadcrumb */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              marginBottom: '1.5rem', fontSize: '0.813rem', color: muted,
            }}>
              <Link href="/courses" style={{ color: muted, textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = accent)}
                onMouseLeave={e => (e.currentTarget.style.color = muted)}
              >
                AI Courses
              </Link>
              <ChevronRight size={12} style={{ opacity: 0.5 }} />
              <span style={{ color: textSecondary }}>{course.title}</span>
            </div>

            {/* Tags */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.375rem',
              marginBottom: '1rem',
            }}>
              {course.tags.slice(0, 4).map(tag => (
                <span key={tag} style={{
                  fontSize: '0.688rem', color: accent, fontWeight: 500,
                  backgroundColor: tagBg,
                  padding: '3px 10px', borderRadius: '100px',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: isMobile ? '2.25rem' : isTablet ? '2.75rem' : '3.25rem',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '0 0 1.25rem',
              color: text,
            }}>
              {course.title}
            </h1>

            {/* Description */}
            <p style={{
              fontSize: isMobile ? '0.938rem' : '1.063rem',
              color: textSecondary,
              lineHeight: 1.75,
              margin: '0 0 1.75rem',
              maxWidth: '580px',
            }}>
              {course.description}
            </p>

            {/* Author */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              marginBottom: '1.5rem',
            }}>
              {course.author.avatar ? (
                <img
                  src={course.author.avatar}
                  alt={course.author.name}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${accent}, ${accentLight})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.813rem', fontWeight: 700, color: '#0A2540',
                }}>
                  {course.author.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div>
                <span style={{ fontSize: '0.938rem', fontWeight: 600, color: text, display: 'block', lineHeight: 1.2 }}>
                  {course.author.name}
                </span>
                <span style={{ fontSize: '0.75rem', color: muted }}>
                  {course.author.role}
                </span>
              </div>
            </div>

            {/* Meta */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1.5rem',
              marginBottom: '2rem', flexWrap: 'wrap',
            }}>
              {[
                { icon: <PlayCircle size={15} />, label: `${course.totalLessons} lessons` },
                { icon: <Clock size={15} />, label: course.totalDurationLabel },
                { icon: <BookOpen size={15} />, label: `${course.chapters.length} chapters` },
                { icon: <Award size={15} />, label: 'Free' },
              ].map((m, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                  color: muted, fontSize: '0.813rem',
                }}>
                  <span style={{ color: accent, display: 'flex' }}>{m.icon}</span>
                  {m.label}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              flexWrap: 'wrap',
            }}>
              <Link
                href={`/courses/${course.slug}/${firstLesson.slug}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.875rem 2rem',
                  backgroundColor: accent, color: '#FFFFFF',
                  borderRadius: '8px', textDecoration: 'none',
                  fontWeight: 700, fontSize: '0.938rem',
                  transition: 'all 0.2s',
                  boxShadow: `0 4px 16px ${isDark ? 'rgba(0,212,170,0.3)' : 'rgba(0,168,150,0.2)'}`,
                }}
              >
                <Play size={16} fill="#FFFFFF" /> Start Learning
              </Link>
              <button
                onClick={handleShare}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.875rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: textSecondary,
                  border: `1px solid ${surfaceBorder}`,
                  borderRadius: '8px', cursor: 'pointer',
                  fontWeight: 500, fontSize: '0.875rem',
                  transition: 'all 0.2s',
                }}
              >
                <Share2 size={14} /> {shared ? 'Copied!' : 'Share'}
              </button>
            </div>
          </div>

          {/* ─── Right: Video Preview ─── */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${surfaceBorder}`,
            boxShadow: isDark
              ? '0 20px 60px rgba(0,0,0,0.4)'
              : '0 20px 60px rgba(10,37,64,0.1)',
          }}>
            {/* Video thumbnail area */}
            <Link
              href={`/courses/${course.slug}/${firstLesson.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div style={{
                position: 'relative',
                aspectRatio: '16/10',
                background: isDark
                  ? `linear-gradient(135deg, #0F3460 0%, #0A2540 100%)`
                  : `linear-gradient(135deg, #0A2540 0%, #0F3460 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}>
                {/* Grid on thumbnail */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }} />
                {/* Glow */}
                <div style={{
                  position: 'absolute', bottom: '-20%', right: '-10%',
                  width: '200px', height: '200px',
                  background: 'radial-gradient(circle, rgba(0,212,170,0.2) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }} />

                {/* Icon + Play */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '1rem',
                }}>
                  <span style={{ fontSize: '3rem' }}>{emoji}</span>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '50%',
                    backgroundColor: 'rgba(0,212,170,0.9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0,212,170,0.4)',
                    transition: 'transform 0.2s',
                  }}>
                    <Play size={26} color="#0A2540" fill="#0A2540" style={{ marginLeft: '3px' }} />
                  </div>
                  <span style={{
                    fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)',
                    fontWeight: 500,
                  }}>
                    Watch first lesson
                  </span>
                </div>
              </div>
            </Link>

            {/* Quick lesson list under video */}
            <div style={{
              backgroundColor: isDark ? 'rgba(6, 21, 39, 0.8)' : '#F8FAFB',
              borderTop: `1px solid ${surfaceBorder}`,
            }}>
              {allLessons.slice(0, 3).map((lesson, i) => (
                <Link
                  key={lesson.slug}
                  href={`/courses/${course.slug}/${lesson.slug}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    textDecoration: 'none',
                    borderBottom: i < 2 ? `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : '#E2E8F0'}` : 'none',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = lessonHover)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    backgroundColor: `${accent}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: '0.625rem', fontWeight: 700, color: accent }}>{i + 1}</span>
                  </div>
                  <span style={{
                    fontSize: '0.813rem', color: textSecondary, flex: 1,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {lesson.title}
                  </span>
                  <span style={{ fontSize: '0.688rem', color: subtle }}>
                    {lesson.durationLabel}
                  </span>
                </Link>
              ))}
              {allLessons.length > 3 && (
                <div style={{
                  padding: '0.625rem 1rem',
                  fontSize: '0.75rem', color: accent, fontWeight: 500,
                  textAlign: 'center',
                }}>
                  +{allLessons.length - 3} more lessons
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: isMobile ? '0 1.5rem 4rem' : '0 2.5rem 6rem',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 380px',
        gap: isMobile ? '2.5rem' : '4rem',
        alignItems: 'start',
      }}>
        {/* ─── Left Column ─── */}
        <div>
          {/* What You'll Learn */}
          <div style={{
            backgroundColor: surface,
            border: `1px solid ${surfaceBorder}`,
            borderRadius: '16px',
            padding: isMobile ? '1.5rem' : '2rem',
            marginBottom: '2.5rem',
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.5rem', fontWeight: 700, color: text,
              margin: '0 0 1.25rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Zap size={20} color={accent} /> What You&apos;ll Learn
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '0.75rem',
            }}>
              {learningPoints.map((point, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '0.625rem', alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    backgroundColor: `${accent}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '2px',
                  }}>
                    <Check size={11} color={accent} strokeWidth={3} />
                  </div>
                  <span style={{
                    fontSize: '0.875rem', color: textSecondary, lineHeight: 1.6,
                  }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Description */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.5rem', fontWeight: 700, color: text,
              margin: '0 0 1rem',
            }}>
              About This Course
            </h2>
            <div style={{
              fontSize: '0.938rem', color: textSecondary, lineHeight: 1.8,
            }}>
              <p style={{ margin: '0 0 1rem' }}>{course.description}</p>
              <p style={{ margin: 0 }}>
                Each lesson includes interactive transcripts that sync with the video,
                instructor commentary with additional context and resources, and a personal
                notes system where you can capture timestamped insights. All notes are saved
                locally and can be exported to Markdown for your research workflow.
              </p>
            </div>
          </div>

          {/* Resources */}
          {resources.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.5rem', fontWeight: 700, color: text,
                margin: '0 0 1rem',
              }}>
                Resources
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {resources.map((res, i) => {
                  const Icon = res.type === 'github' ? Github
                    : res.type === 'download' ? Download
                    : res.type === 'paper' ? FileText
                    : ExternalLink;
                  return (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.875rem 1rem',
                        backgroundColor: surface,
                        border: `1px solid ${surfaceBorder}`,
                        borderRadius: '10px',
                        textDecoration: 'none',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(0,212,170,0.2)' : 'rgba(0,168,150,0.2)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = surfaceBorder;
                      }}
                    >
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        backgroundColor: `${accent}10`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Icon size={14} color={accent} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: text, display: 'block' }}>
                          {res.title}
                        </span>
                        {res.description && (
                          <span style={{ fontSize: '0.75rem', color: muted }}>
                            {res.description}
                          </span>
                        )}
                      </div>
                      <ExternalLink size={12} color={subtle} />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── Newsletter Capture ─── */}
          <div style={{
            backgroundColor: surface,
            border: `1px solid ${surfaceBorder}`,
            borderRadius: '16px',
            padding: isMobile ? '1.5rem' : '2rem',
          }}>
            {nlStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  backgroundColor: `${accent}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}>
                  <CheckCircle2 size={20} color={accent} strokeWidth={1.5} />
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.25rem', fontWeight: 700, color: text,
                  margin: '0 0 0.5rem',
                }}>
                  You&apos;re subscribed
                </h3>
                <p style={{
                  fontSize: '0.813rem', color: muted, lineHeight: 1.6,
                  margin: 0,
                }}>
                  We&apos;ll send you new courses, tutorials, and workflow guides. Check spam or promotions if you don&apos;t see the welcome email.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.25rem', fontWeight: 700, color: text,
                  margin: '0 0 0.5rem',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  <Mail size={18} color={accent} /> Stay updated
                </h3>
                <p style={{
                  fontSize: '0.813rem', color: muted, lineHeight: 1.6,
                  margin: '0 0 1rem',
                }}>
                  New courses, tutorials, and AI research workflow guides — delivered to your inbox.
                </p>
                <form
                  onSubmit={(e) => { e.preventDefault(); subscribe(nlEmail); }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                >
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={nlEmail}
                    onChange={(e) => { setNlEmail(e.target.value); if (nlStatus === 'error') nlReset(); }}
                    style={{
                      width: '100%',
                      padding: '0.625rem 0.875rem',
                      borderRadius: '8px',
                      border: nlStatus === 'error'
                        ? `1.5px solid #ef4444`
                        : `1.5px solid ${surfaceBorder}`,
                      backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFB',
                      color: text,
                      fontSize: '0.813rem',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      boxSizing: 'border-box' as const,
                      boxShadow: nlStatus === 'error' ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none',
                    }}
                    onFocus={(e) => {
                      if (nlStatus !== 'error') {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(0,212,170,0.4)' : 'rgba(0,168,150,0.4)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,170,0.08)';
                      }
                    }}
                    onBlur={(e) => {
                      if (nlStatus !== 'error') {
                        e.currentTarget.style.borderColor = surfaceBorder;
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  />
                  <button
                    type="submit"
                    disabled={nlStatus === 'loading'}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      backgroundColor: accent,
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 600,
                      fontSize: '0.813rem',
                      cursor: nlStatus === 'loading' ? 'default' : 'pointer',
                      opacity: nlStatus === 'loading' ? 0.7 : 1,
                      transition: 'all 0.2s',
                    }}
                  >
                    {nlStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
                {nlStatus === 'error' && nlError && (
                  <p style={{
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    color: '#ef4444',
                    lineHeight: 1.4,
                    margin: '0.5rem 0 0',
                  }}>
                    {nlError}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* ─── Right Column: Course Content ─── */}
        <div style={{
          position: isMobile ? 'static' : 'sticky',
          top: '100px',
        }}>
          <div style={{
            backgroundColor: surface,
            border: `1px solid ${surfaceBorder}`,
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: `1px solid ${surfaceBorder}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <h3 style={{
                fontSize: '1rem', fontWeight: 700, color: text, margin: 0,
              }}>
                Course Content
              </h3>
              <span style={{ fontSize: '0.75rem', color: muted }}>
                {course.totalLessons} lessons · {course.totalDurationLabel}
              </span>
            </div>

            {/* Chapters */}
            {course.chapters.map((chapter, chIdx) => {
              const isExpanded = expandedChapters.has(chIdx);
              return (
                <div key={chIdx}>
                  {/* Chapter header */}
                  <button
                    onClick={() => toggleChapter(chIdx)}
                    style={{
                      width: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.875rem 1.5rem',
                      backgroundColor: 'transparent',
                      border: 'none', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : '#F0F0F0'}`,
                      cursor: 'pointer',
                      color: text,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = lessonHover)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {isExpanded ? <ChevronUp size={14} color={muted} /> : <ChevronDown size={14} color={muted} />}
                      <span style={{
                        fontSize: '0.75rem', fontWeight: 700, color: textSecondary,
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                      }}>
                        {chapter.title}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.688rem', color: subtle }}>
                      {chapter.lessons.length} lesson{chapter.lessons.length !== 1 ? 's' : ''}
                    </span>
                  </button>

                  {/* Lessons */}
                  {isExpanded && chapter.lessons.map((lesson, lIdx) => {
                    // Calculate global lesson number
                    let globalIdx = 0;
                    for (let c = 0; c < chIdx; c++) {
                      globalIdx += course.chapters[c].lessons.length;
                    }
                    globalIdx += lIdx + 1;

                    return (
                      <Link
                        key={lesson.slug}
                        href={`/courses/${course.slug}/${lesson.slug}`}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.75rem 1.5rem 0.75rem 2.25rem',
                          textDecoration: 'none',
                          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.03)' : '#F0F0F0'}`,
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = lessonHover)}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{
                          width: '26px', height: '26px', borderRadius: '50%',
                          border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#CED4DA'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <span style={{
                            fontSize: '0.625rem', fontWeight: 700,
                            color: muted,
                          }}>
                            {globalIdx}
                          </span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{
                            fontSize: '0.875rem', color: text, fontWeight: 500,
                            display: 'block',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>
                            {lesson.title}
                          </span>
                        </div>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: '0.375rem',
                          flexShrink: 0,
                        }}>
                          <PlayCircle size={12} color={subtle} />
                          <span style={{ fontSize: '0.688rem', color: subtle }}>
                            {lesson.durationLabel}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              );
            })}

            {/* Start Learning CTA */}
            <div style={{ padding: '1.25rem 1.5rem' }}>
              <Link
                href={`/courses/${course.slug}/${firstLesson.slug}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '0.75rem',
                  backgroundColor: accent, color: '#FFFFFF',
                  borderRadius: '8px', textDecoration: 'none',
                  fontWeight: 700, fontSize: '0.875rem',
                  transition: 'opacity 0.2s',
                }}
              >
                <Play size={14} fill="#FFFFFF" /> Start Learning
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
