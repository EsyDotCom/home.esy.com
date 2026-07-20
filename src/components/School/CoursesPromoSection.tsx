"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { courses } from "@/lib/learn/mockData";
import { navyCalmLightTheme as theme } from "@/lib/theme";

const COURSE_ICONS: Record<string, string> = {
  "how-to-use-claude-code": "\u26A1",
  "chatgpt-for-research-workflows": "\uD83D\uDD2C",
  "educational-infographics-nano-banana": "\uD83C\uDF4C",
  "create-educational-infographics-with-nano-banana": "\uD83C\uDF4C",
};

// Shared AI Courses shelf for /learn and /research — promotes longform courses
// below the primary video grids without duplicating card markup per page.
export function CoursesPromoSection({
  isMobile,
  isTablet,
}: {
  isMobile: boolean;
  isTablet: boolean;
}) {
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: isMobile ? "0 1rem 3rem" : isTablet ? "0 1.5rem 3.5rem" : "0 2rem 4rem",
      }}
    >
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
          AI Courses
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
  );
}
