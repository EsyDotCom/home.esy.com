"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { VideoCard } from "@/components/School/VideoCard";
import SchoolNewsletter from "@/components/School/SchoolNewsletter";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import { navyCalmLightTheme as theme } from "@/lib/theme";
import { type SchoolVideo } from "@/data/school-videos";
import { courses } from "@/lib/learn/mockData";
import LibraryHero from "@/components/LibraryHero/LibraryHero";
import HeroCarousel, { type HeroCarouselItem } from "@/components/LibraryHero/HeroCarousel";

type Breakpoint = "mobile" | "tablet" | "desktop";

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return bp;
}

const COURSE_ICONS: Record<string, string> = {
  "how-to-use-claude-code": "\u26A1",
  "chatgpt-for-research-workflows": "\uD83D\uDD2C",
  "educational-infographics-nano-banana": "\uD83C\uDF4C",
  "create-educational-infographics-with-nano-banana": "\uD83C\uDF4C",
};

// Videos arrive from the server component: static registry merged with
// articles published live from Compose (api.esy.com).
export default function SchoolVideosClient({ videos: allVideos }: { videos: SchoolVideo[] }) {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const {
    subscribe,
    status: newsletterStatus,
    errorMessage: newsletterError,
    reset: resetNewsletter,
  } = useNewsletterSubscribe();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribe(emailInputRef.current?.value || "");
  };

  const videos = allVideos;
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  // Spotlight recent tutorials in the stage carousel (mux thumbnail as fallback).
  const featuredCarousel: HeroCarouselItem[] = videos.slice(0, 6).map((v) => ({
    id: v.slug,
    href: `/learn/${v.slug}`,
    imageSrc:
      v.thumbnailUrl ||
      (v.muxPlaybackId
        ? `https://image.mux.com/${v.muxPlaybackId}/thumbnail.jpg?time=0`
        : ""),
    label: v.categoryLabel,
    title: v.title,
  }));

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily: "var(--font-inter)",
        paddingTop: 0,
        overflowX: "hidden",
        width: "100%",
      }}
    >
      {/* ═══ Library stage hero (shared with /courses and /research) ═══ */}
      <LibraryHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Learn" }]}
        title="Learn"
        subhead="Practical tutorials for the AI solopreneur — run Esy's agentic workflow templates for research, marketing, and deliverables."
        meta={
          <>
            <span>
              <strong>{videos.length}</strong>{" "}
              {videos.length === 1 ? "tutorial" : "tutorials"}
            </span>
            <span className="esy-stage__meta-dot">·</span>
            <span>video walkthroughs</span>
            <span className="esy-stage__meta-dot">·</span>
            <span>free</span>
          </>
        }
        feature={
          featuredCarousel.length > 0 ? (
            <HeroCarousel
              items={featuredCarousel}
              ariaLabel="Featured learn tutorials"
            />
          ) : (
            // Empty shelf — keep the stage layout when no tutorials are published yet.
            <div
              style={{
                width: "100%",
                aspectRatio: "4 / 3",
                borderRadius: 16,
                border: "1px dashed rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.875rem",
              }}
            >
              Tutorials coming soon
            </div>
          )
        }
      />

      {/* ═══ Workflow Tutorials Grid ═══ */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 1rem 3rem" : isTablet ? "0 1.5rem 3.5rem" : "0 2rem 4rem" }}>
        <div
          style={{
            paddingBottom: "1.5rem",
            marginBottom: isMobile ? "1.25rem" : "2rem",
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-literata)",
              fontSize: "1.125rem",
              fontWeight: 500,
              color: theme.text,
            }}
          >
            All Tutorials
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: theme.textSecondary,
              lineHeight: 1.6,
              marginTop: "0.5rem",
            }}
          >
            Short walkthroughs on selecting, running, and reviewing Esy&apos;s agentic workflow templates — the quick-start companion to Courses.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: isMobile ? "1.25rem" : "1.5rem",
          }}
        >
          {videos.map((video: SchoolVideo) => (
            <VideoCard
              key={video.slug}
              title={video.title}
              slug={video.slug}
              thumbnailUrl={video.thumbnailUrl}
              muxPlaybackId={video.muxPlaybackId}
              durationSeconds={video.durationSeconds}
              category={video.category}
              categoryLabel={video.categoryLabel}
              tags={video.tags}
              publishedAt={video.publishedAt}
            />
          ))}
        </div>
      </section>

      {/* ═══ Courses Section ═══ */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 1rem 3rem" : isTablet ? "0 1.5rem 3.5rem" : "0 2rem 4rem" }}>
        <div
          style={{
            paddingBottom: "1.5rem",
            marginBottom: isMobile ? "1.25rem" : "2rem",
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-literata)",
              fontSize: "1.125rem",
              fontWeight: 500,
              color: theme.text,
            }}
          >
            Courses
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: theme.textSecondary,
              lineHeight: 1.6,
              marginTop: "0.5rem",
            }}
          >
            Longform courses on Esy&apos;s agentic workflow templates — structured lessons with interactive transcripts, commentary, and timestamped notes.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: isMobile ? "1.25rem" : "1.5rem",
          }}
        >
          {courses.map((course, idx) => {
            const isHovered = hoveredCourse === course.slug;
            const emoji = COURSE_ICONS[course.slug] || "\uD83D\uDCDA";
            return (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
                onMouseEnter={() => setHoveredCourse(course.slug)}
                onMouseLeave={() => setHoveredCourse(null)}
              >
                <div
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    border: `1px solid ${isHovered ? theme.accentBorder : theme.border}`,
                    backgroundColor: theme.surface,
                    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: isHovered ? theme.shadows.lg : "none",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                >
                  {/* Card hero area */}
                  <div
                    style={{
                      position: "relative",
                      height: 180,
                      background: `linear-gradient(135deg, #0F3460 0%, ${idx === 0 ? "#0A2540" : idx === 1 ? "#0D2B4A" : "#081E35"} 100%)`,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                        opacity: 0.5,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-30%",
                        right: "-10%",
                        width: 200,
                        height: 200,
                        background: "radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)",
                        filter: "blur(40px)",
                        transition: "opacity 0.3s",
                        opacity: isHovered ? 1 : 0.5,
                      }}
                    />
                    <div
                      style={{
                        position: "relative",
                        zIndex: 1,
                        fontSize: "2.5rem",
                        transition: "transform 0.3s",
                        transform: isHovered ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      {emoji}
                    </div>
                    <div
                      style={{
                        position: "relative",
                        zIndex: 1,
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        backgroundColor: isHovered ? theme.accent : "rgba(255,255,255,0.1)",
                        border: `2px solid ${isHovered ? theme.accent : "rgba(255,255,255,0.2)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s",
                      }}
                    >
                      <Play size={18} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: 2 }} />
                    </div>
                    <span
                      style={{
                        position: "relative",
                        zIndex: 1,
                        fontSize: "0.6875rem",
                        color: "rgba(255,255,255,0.5)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        fontWeight: 500,
                      }}
                    >
                      {course.totalLessons} lessons &middot; {course.totalDurationLabel}
                    </span>
                  </div>

                  {/* Card body */}
                  <div
                    style={{
                      padding: "1.25rem",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        lineHeight: 1.35,
                        marginBottom: "0.5rem",
                        color: theme.text,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {course.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: theme.textSecondary,
                        lineHeight: 1.6,
                        marginBottom: "0.75rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        flex: 1,
                      }}
                    >
                      {course.description}
                    </p>

                    {course.tags.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "0.75rem" }}>
                        {course.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            style={{
                              borderRadius: 20,
                              padding: "2px 10px",
                              fontSize: "0.6875rem",
                              fontWeight: 500,
                              backgroundColor: theme.accentTint,
                              color: theme.accent,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "0.75rem",
                        borderTop: `1px solid ${theme.border}`,
                        marginTop: "auto",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.625rem",
                            fontWeight: 700,
                            color: "#0A2540",
                          }}
                        >
                          {course.author.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span style={{ fontSize: "0.8125rem", color: theme.muted }}>
                          {course.author.name}
                        </span>
                      </div>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          color: theme.accent,
                        }}
                      >
                        View Course
                        <ArrowRight
                          size={14}
                          style={{
                            transition: "transform 0.2s",
                            transform: isHovered ? "translateX(3px)" : "translateX(0)",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══ CTA Banner ═══ */}
      <section
        style={{
          backgroundColor: theme.sections.howItWorks,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          padding: isMobile ? "3rem 1rem" : isTablet ? "3.5rem 1.5rem" : "4rem 2rem",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-literata)",
              fontSize: isMobile ? "1.375rem" : "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              marginBottom: "1.25rem",
              letterSpacing: "-0.01em",
              color: "#fff",
            }}
          >
            Stop prompting. Start creating.
          </h2>

          <p
            style={{
              fontSize: isMobile ? "0.9375rem" : "1.0625rem",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto 2rem",
            }}
          >
            Esy replaces prompt engineering with structured workflows. Select a
            template, complete an intake, and receive publishable artifacts.
          </p>

          <Link
            href="/workflows"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: isMobile ? "0.75rem 1.5rem" : "0.875rem 1.75rem",
              backgroundColor: theme.accentHover,
              color: "#fff",
              borderRadius: 10,
              fontSize: "0.9375rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            Browse Workflow Templates
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ═══ Newsletter ═══ */}
      <SchoolNewsletter
        emailInputRef={emailInputRef}
        handleNewsletterSubmit={handleNewsletterSubmit}
        onInputChange={resetNewsletter}
        isMobile={isMobile}
        isTablet={isTablet}
        theme={{}}
        isDarkMode={false}
        subscribeStatus={newsletterStatus}
        errorMessage={newsletterError}
      />
    </div>
  );
}
