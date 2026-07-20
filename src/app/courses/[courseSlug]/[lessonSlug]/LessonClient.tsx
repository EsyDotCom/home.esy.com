/**
 * LessonClient — Main client component for the Esy Video Lesson experience.
 * 
 * Architecture: Two-surface layout
 *   A) NAVIGATION (left): Course outline, progress, search
 *   B) PRIMARY LEARNING (center, scrollable):
 *      - Video player
 *      - Title & meta
 *      - Commentary (instructor notes, inline below video)
 *      - Transcript (collapsible, toggled via button)
 * 
 * State Management:
 *   - Video time synced via ref callbacks (no heavy state)
 *   - Progress persisted in localStorage
 *   - Theme read from body class (set by parent or nav system)
 * 
 * To swap in real APIs later:
 *   - Replace mockData imports with fetch calls in page.tsx
 *   - Pass course/lesson as props (already structured this way)
 *   - Replace localStorage progress with API calls
 */

"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  PanelLeftClose, PanelLeftOpen,
  Maximize2, Minimize2, ChevronLeft, ChevronRight, ChevronDown, Menu,
  User, Calendar, Clock, FileText,
  Sun, Moon, CheckCircle2, Mail,
} from 'lucide-react';

import VideoPlayer, { type VideoPlayerHandle } from '@/components/learn/VideoPlayer';
import CourseToc from '@/components/learn/CourseToc';
import TranscriptPanel from '@/components/learn/TranscriptPanel';
import CommentaryPanel from '@/components/learn/CommentaryPanel';

import type { Course, Lesson, LessonProgress } from '@/lib/learn/types';
import { getAdjacentLessons } from '@/lib/learn/mockData';
import { navyCalmDarkTheme } from '@/lib/theme';
import { lightTheme } from '@/lib/lightTheme';
import Link from 'next/link';
import { useNewsletterSubscribe } from '@/hooks/useNewsletterSubscribe';

import './lesson.css';

interface LessonClientProps {
  course: Course;
  lesson: Lesson;
  chapterTitle: string;
}

// ─── localStorage helpers ──────────────────────────────────
const PROGRESS_KEY = 'esy-course-progress';

function loadProgress(): Record<string, LessonProgress> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  } catch { return {}; }
}

function saveProgress(progress: Record<string, LessonProgress>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export default function LessonClient({ course, lesson, chapterTitle }: LessonClientProps) {
  const searchParams = useSearchParams();
  const videoRef = useRef<VideoPlayerHandle>(null);

  // ─── Theme ───────────────────────────────────
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

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

  // ─── Layout state ────────────────────────────
  const [leftOpen, setLeftOpen] = useState(true);
  const [theater, setTheater] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  // ─── Video state ─────────────────────────────
  const [currentTimeMs, setCurrentTimeMs] = useState(0);

  // ─── Progress ────────────────────────────────
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});

  // Responsive
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Newsletter
  const [nlEmail, setNlEmail] = useState('');
  const { subscribe, status: nlStatus, errorMessage: nlError, reset: nlReset } = useNewsletterSubscribe();

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1200);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close left on tablet by default
  useEffect(() => {
    if (isTablet) setLeftOpen(false);
  }, [isTablet]);

  // Load progress
  useEffect(() => {
    setProgress(loadProgress());
  }, [course.slug, lesson.slug]);

  // URL timestamp ?t=
  useEffect(() => {
    const t = searchParams.get('t');
    if (t) {
      const sec = parseInt(t, 10);
      if (!isNaN(sec) && videoRef.current) {
        videoRef.current.seekTo(sec * 1000);
      }
    }
  }, [searchParams]);

  // Save progress on time update (throttled)
  const lastSaveRef = useRef(0);
  const handleTimeUpdate = useCallback((ms: number) => {
    setCurrentTimeMs(ms);
    const now = Date.now();
    if (now - lastSaveRef.current < 5000) return;
    lastSaveRef.current = now;

    const key = `${course.slug}/${lesson.slug}`;
    const durationMs = lesson.durationMs || 1;
    const completed = ms / durationMs >= 0.9;

    setProgress(prev => {
      const updated = {
        ...prev,
        [key]: {
          courseSlug: course.slug,
          lessonSlug: lesson.slug,
          lastWatchedMs: ms,
          completed,
          updatedAt: new Date().toISOString(),
        },
      };
      saveProgress(updated);
      return updated;
    });
  }, [course.slug, lesson.slug, lesson.durationMs]);

  // Seek handler
  const handleSeek = useCallback((ms: number) => {
    videoRef.current?.seekTo(ms);
  }, []);

  // Adjacent lessons
  const { prev, next } = useMemo(() => getAdjacentLessons(course, lesson.slug), [course, lesson.slug]);

  // Initial resume time
  const initialTimeMs = useMemo(() => {
    const p = progress[`${course.slug}/${lesson.slug}`];
    return p?.lastWatchedMs || 0;
  }, [progress, course.slug, lesson.slug]);

  // Colors
  const accent = isDark ? '#00D4AA' : '#00A896';
  const bgMain = isDark ? navyCalmDarkTheme.bg : '#FFFFFF';
  const bgSidebar = isDark ? '#05101F' : '#F5F6F8';
  const textColor = isDark ? '#FFFFFF' : '#1A1A2E';
  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : '#8E9AAF';
  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';

  // Grid class
  let layoutClass = 'lesson-layout';
  if (theater) layoutClass += ' lesson-layout--theater';
  else if (!leftOpen) layoutClass += ' lesson-layout--no-left';

  return (
    <>
      {/* Theme toggle */}
      <button
        onClick={() => setIsDark(d => !d)}
        style={{
          position: 'fixed', bottom: '4.5rem',
          right: '1.25rem',
          width: '36px', height: '36px', borderRadius: '50%',
          backgroundColor: isDark ? 'rgba(15, 52, 96, 0.95)' : 'rgba(255,255,255,0.95)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 50,
          boxShadow: isDark ? '0 2px 16px rgba(0,0,0,0.4)' : '0 2px 16px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.2s ease',
        }}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={14} color="#00D4AA" /> : <Moon size={14} color="#00A896" />}
      </button>

      {/* Mobile drawer */}
      {isMobile && drawerOpen && (
        <>
          <div className="lesson-drawer-overlay" onClick={() => setDrawerOpen(false)} />
          <div className="lesson-drawer" style={{ backgroundColor: isDark ? '#05101F' : '#F5F6F8' }}>
            <CourseToc
              course={course}
              currentLessonSlug={lesson.slug}
              progress={progress}
              isDark={isDark}
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        </>
      )}

      <div className={layoutClass} style={{ backgroundColor: bgMain }}>
        {/* ═══ A) NAVIGATION (left sidebar) — hidden on mobile via CSS ═══ */}
        <div className={`lesson-toc ${!leftOpen || theater ? 'lesson-toc--collapsed' : ''}`}
          style={{
            borderRight: `1px solid ${borderColor}`,
            backgroundColor: bgSidebar,
          }}
        >
          <CourseToc
            course={course}
            currentLessonSlug={lesson.slug}
            progress={progress}
            isDark={isDark}
          />
        </div>

        {/* ═══ B) PRIMARY LEARNING (center, scrollable) ═══ */}
        <div className="lesson-center" style={{ backgroundColor: bgMain }}>
          {/* Breadcrumbs */}
          <div style={{
            maxWidth: '960px', width: '100%', margin: '0 auto',
            padding: '0.75rem 1rem 0', boxSizing: 'border-box',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontSize: '0.813rem', color: mutedColor,
          }}>
            <Link href="/" style={{ color: mutedColor, textDecoration: 'none', transition: 'color 0.15s' }}>Home</Link>
            <span style={{ opacity: 0.5 }}>›</span>
            <Link href="/courses" style={{ color: mutedColor, textDecoration: 'none', transition: 'color 0.15s' }}>AI Courses</Link>
            <span style={{ opacity: 0.5 }}>›</span>
            <Link href={`/courses/${course.slug}`} style={{ color: mutedColor, textDecoration: 'none', transition: 'color 0.15s' }}>{course.title}</Link>
            <span style={{ opacity: 0.5 }}>›</span>
            <span style={{ color: accent }}>{lesson.title}</span>
          </div>

          {/* Video */}
          <div className="lesson-video-wrapper">
            <VideoPlayer
              ref={videoRef}
              src={lesson.videoUrl}
              title={lesson.title}
              author={lesson.author.name}
              durationLabel={lesson.durationLabel}
              publishedAt={lesson.publishedAt}
              onTimeUpdate={handleTimeUpdate}
              initialTimeMs={initialTimeMs}
              isDark={isDark}
            />

            {/* ─── Transcript toggle bar (flush under video) ─── */}
            <button
              onClick={() => setTranscriptOpen(o => !o)}
              aria-expanded={transcriptOpen}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.625rem 0.875rem',
                marginTop: '0',
                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)',
                border: 'none',
                borderRadius: '0 0 12px 12px',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.045)'}
              onMouseLeave={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)'}
            >
              <span style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.75rem', fontWeight: 500,
                color: transcriptOpen ? accent : mutedColor,
                letterSpacing: '0.02em',
                transition: 'color 0.2s ease',
              }}>
                <FileText size={13} />
                {transcriptOpen ? 'Hide Transcript' : 'Show Transcript'}
              </span>
              <ChevronDown
                size={13}
                color={transcriptOpen ? accent : mutedColor}
                style={{
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease',
                  transform: transcriptOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            {/* Collapsible transcript */}
            <div style={{
              overflow: 'hidden',
              transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
              maxHeight: transcriptOpen ? '600px' : '0',
              opacity: transcriptOpen ? 1 : 0,
              borderRadius: '0 0 12px 12px',
            }}>
              <div style={{
                maxHeight: '560px',
                overflowY: 'auto',
                borderTop: `1px solid ${borderColor}`,
              }}>
                <TranscriptPanel
                  segments={lesson.transcript}
                  currentTimeMs={currentTimeMs}
                  onSeek={handleSeek}
                  isDark={isDark}
                />
              </div>
            </div>
          </div>

          {/* Control bar + meta */}
          <div className="lesson-meta" style={{ borderBottom: `1px solid ${borderColor}` }}>
            {/* Toggle buttons row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '0.375rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {/* Mobile: open drawer */}
                <button
                  className="lesson-toggle-btn lesson-toggle-mobile"
                  onClick={() => setDrawerOpen(true)}
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0', color: mutedColor, display: 'none' }}
                  aria-label="Open course outline"
                >
                  <Menu size={16} />
                </button>

                {/* Desktop: toggle left sidebar */}
                <button
                  className="lesson-toggle-btn lesson-toggle-desktop"
                  onClick={() => setLeftOpen(o => !o)}
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0', color: mutedColor }}
                  aria-label={leftOpen ? 'Close sidebar' : 'Open sidebar'}
                >
                  {leftOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
                </button>

                {/* Desktop: theater mode */}
                <button
                  className="lesson-toggle-btn lesson-toggle-desktop"
                  onClick={() => setTheater(t => !t)}
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0', color: mutedColor }}
                  aria-label={theater ? 'Exit theater mode' : 'Theater mode'}
                >
                  {theater ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {/* Prev/Next */}
                {prev && (
                  <Link
                    href={`/courses/${course.slug}/${prev.slug}`}
                    className="lesson-toggle-btn"
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0',
                      color: mutedColor, textDecoration: 'none',
                    }}
                    aria-label={`Previous lesson: ${prev.title}`}
                  >
                    <ChevronLeft size={16} />
                  </Link>
                )}
                {next && (
                  <Link
                    href={`/courses/${course.slug}/${next.slug}`}
                    className="lesson-toggle-btn"
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0',
                      color: mutedColor, textDecoration: 'none',
                    }}
                    aria-label={`Next lesson: ${next.title}`}
                  >
                    <ChevronRight size={16} />
                  </Link>
                )}
              </div>
            </div>

            {/* Title */}
            <h1 className="lesson-title" style={{ color: textColor }}>
              {lesson.title}
            </h1>

            {/* Meta row */}
            <div className="lesson-meta-row">
              <div className="lesson-meta-item" style={{ color: mutedColor }}>
                <User size={12} />
                <span>{lesson.author.name}</span>
              </div>
              <div className="lesson-meta-item" style={{ color: mutedColor }}>
                <Calendar size={12} />
                <span>{new Date(lesson.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="lesson-meta-item" style={{ color: mutedColor }}>
                <Clock size={12} />
                <span>{lesson.durationLabel}</span>
              </div>
              <div className="lesson-meta-item" style={{
                color: accent, fontSize: '0.688rem',
                backgroundColor: `${accent}15`, padding: '1px 8px',
                borderRadius: '4px',
              }}>
                {chapterTitle}
              </div>
            </div>
          </div>

          {/* ─── Commentary (inline below video) ─── */}
          <div className="lesson-commentary-section">
                <CommentaryPanel commentary={lesson.commentary} onSeek={handleSeek} isDark={isDark} />
          </div>

          {/* ─── Newsletter Capture ─── */}
          <div style={{
            maxWidth: '960px', width: '100%', margin: '0 auto',
            padding: '0 1rem 3rem',
            boxSizing: 'border-box' as const,
          }}>
            <div style={{
              borderTop: `1px solid ${borderColor}`,
              paddingTop: '2rem',
            }}>
              {nlStatus === 'success' ? (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  backgroundColor: isDark ? 'rgba(0,212,170,0.06)' : 'rgba(0,168,150,0.04)',
                  border: `1px solid ${isDark ? 'rgba(0,212,170,0.12)' : 'rgba(0,168,150,0.1)'}`,
                }}>
                  <CheckCircle2 size={18} color={accent} strokeWidth={1.5} />
                  <div>
                    <span style={{
                      fontSize: '0.875rem', fontWeight: 600, color: textColor,
                      display: 'block', lineHeight: 1.3,
                    }}>
                      Subscribed
                    </span>
                    <span style={{
                      fontSize: '0.75rem', color: mutedColor, lineHeight: 1.4,
                    }}>
                      We&apos;ll send you new courses and guides. Check spam if you don&apos;t see the welcome email.
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'stretch' : 'center',
                  gap: isMobile ? '1rem' : '2rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '12px',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)',
                  border: `1px solid ${borderColor}`,
                }}>
                  <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      marginBottom: '0.25rem',
                    }}>
                      <Mail size={14} color={accent} />
                      <span style={{
                        fontSize: '0.875rem', fontWeight: 600, color: textColor,
                      }}>
                        Enjoying this course?
                      </span>
                    </div>
                    <p style={{
                      fontSize: '0.75rem', color: mutedColor, lineHeight: 1.5,
                      margin: 0,
                    }}>
                      Get notified about new courses and weekly workflow guides.
                    </p>
                  </div>
                  <form
                    onSubmit={(e) => { e.preventDefault(); subscribe(nlEmail); }}
                    style={{
                      display: 'flex', gap: '0.375rem',
                      flexShrink: 0,
                      width: isMobile ? '100%' : 'auto',
                    }}
                  >
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={nlEmail}
                      onChange={(e) => { setNlEmail(e.target.value); if (nlStatus === 'error') nlReset(); }}
                      style={{
                        width: isMobile ? '100%' : '200px',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        border: nlStatus === 'error'
                          ? '1.5px solid #ef4444'
                          : `1.5px solid ${borderColor}`,
                        backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                        color: textColor,
                        fontSize: '0.75rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxShadow: nlStatus === 'error' ? '0 0 0 2px rgba(239,68,68,0.1)' : 'none',
                      }}
                      onFocus={(e) => {
                        if (nlStatus !== 'error') {
                          e.currentTarget.style.borderColor = isDark ? 'rgba(0,212,170,0.4)' : 'rgba(0,168,150,0.4)';
                        }
                      }}
                      onBlur={(e) => {
                        if (nlStatus !== 'error') {
                          e.currentTarget.style.borderColor = borderColor;
                        }
                      }}
                    />
                    <button
                      type="submit"
                      disabled={nlStatus === 'loading'}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: accent,
                        color: '#FFFFFF',
                        borderRadius: '6px',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        cursor: nlStatus === 'loading' ? 'default' : 'pointer',
                        opacity: nlStatus === 'loading' ? 0.7 : 1,
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap' as const,
                      }}
                    >
                      {nlStatus === 'loading' ? '...' : 'Subscribe'}
                    </button>
                  </form>
                  {nlStatus === 'error' && nlError && (
                    <p style={{
                      fontSize: '0.688rem',
                      color: '#ef4444',
                      lineHeight: 1.3,
                      margin: isMobile ? '0' : '0',
                      position: isMobile ? 'static' : 'absolute',
                    }}>
                      {nlError}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
