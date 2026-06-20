"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { MuxPlayerElement } from "@mux/mux-player-react";
import { VideoPlayer } from "@/components/School/VideoPlayer";
import { TranscriptToggle } from "@/components/School/TranscriptToggle";
import { VideoTranscript } from "@/components/Research/VideoTranscript";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnhancedMarkdownRenderer from "@/components/SchoolArticle/EnhancedMarkdownRenderer";
import { navyCalmLightTheme as theme } from "@/lib/theme";
import type { TranscriptSegment } from "@/lib/transcripts";
import type { ArticleDetailData, ArticleDetailStage, ArticleSection } from "./types";

// Shared detail template for research + school articles. The layout, video
// player, transcript, byline, meta, workflow pipeline, body, and template CTA
// are identical across sections; the section identity (breadcrumb), the
// full-width newsletter bar, and the sidebar (related + newsletter) are passed
// in so each section keeps its own copy/components without duplicating the page.

interface ArticleDetailProps {
  article: ArticleDetailData;
  section: ArticleSection;
  /** Build-time parsed SRT segments → click-to-seek transcript (research). */
  transcriptSegments?: TranscriptSegment[] | null;
  /** Full-width bar rendered under the transcript. */
  newsletterBar?: React.ReactNode;
  /** Aside content (related list + sidebar newsletter). */
  sidebar?: React.ReactNode;
}

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

function WorkflowPipeline({ stages, isMobile }: { stages: ArticleDetailStage[]; isMobile: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 0,
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        padding: isMobile ? "0 0 8px" : 0,
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(0, 168, 150, 0.25) transparent",
      }}
    >
      {stages.map((stage, i) => (
        <div
          key={stage.label}
          style={{ display: "flex", alignItems: "center", flex: 1, minWidth: isMobile ? 100 : 0 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              flex: 1,
              position: "relative",
            }}
          >
            <div
              style={{
                width: isMobile ? 28 : 32,
                height: isMobile ? 28 : 32,
                borderRadius: "50%",
                backgroundColor: i === stages.length - 1 ? theme.accent : "rgba(0, 168, 150, 0.12)",
                color: i === stages.length - 1 ? "#fff" : theme.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "0.6875rem" : "0.75rem",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <span
              style={{
                marginTop: 6,
                fontSize: isMobile ? "0.625rem" : "0.6875rem",
                fontWeight: 600,
                color: theme.text,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
              }}
            >
              {stage.label}
            </span>
            <span
              style={{
                fontSize: isMobile ? "0.5625rem" : "0.625rem",
                color: theme.muted,
                lineHeight: 1.3,
                marginTop: 2,
                whiteSpace: "nowrap",
              }}
            >
              {stage.sublabel}
            </span>
          </div>
          {i < stages.length - 1 && (
            <div
              style={{
                flex: "0 0 auto",
                height: 1,
                width: isMobile ? 16 : 24,
                backgroundColor: "rgba(0, 168, 150, 0.2)",
                position: "relative",
                top: isMobile ? -12 : -10,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function ArticleDetail({
  article,
  section,
  transcriptSegments,
  newsletterBar,
  sidebar,
}: ArticleDetailProps) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isCompact = isMobile || isTablet;

  // Shared handle to the Mux player so the transcript can seek and follow it.
  const playerRef = useRef<MuxPlayerElement | null>(null);

  const pagePadding = isMobile ? "0 1rem" : isTablet ? "0 1.5rem" : "0 2rem";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.bg,
        fontFamily: "var(--font-inter)",
        paddingTop: isMobile ? 72 : 96,
        width: "100%",
      }}
    >
      {/* Breadcrumbs */}
      <div
        style={{
          borderBottom: `1px solid ${theme.border}`,
          backgroundColor: theme.navBg,
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0.875rem 1rem" : "1rem 2rem" }}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: section.label, href: section.basePath },
              {
                label:
                  isMobile && article.title.length > 30
                    ? article.title.slice(0, 30) + "\u2026"
                    : article.title,
                isCurrent: true,
              },
            ]}
          />
        </div>
      </div>

      {/* Video player — dark theater frame */}
      <div style={{ width: "100%", backgroundColor: "#000" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <VideoPlayer
            playbackId={article.muxPlaybackId}
            title={article.title}
            thumbnailUrl={article.thumbnailUrl}
            durationSeconds={article.durationSeconds}
            playerRef={playerRef}
          />
        </div>
      </div>

      {/* Transcript — timestamped + click-to-seek when an SRT exists, legacy
          plain-text toggle otherwise. */}
      {transcriptSegments && transcriptSegments.length > 0 ? (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: pagePadding }}>
          <VideoTranscript segments={transcriptSegments} playerRef={playerRef} />
        </div>
      ) : (
        article.transcript && (
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: pagePadding }}>
            <TranscriptToggle transcript={article.transcript} />
          </div>
        )
      )}

      {/* Section newsletter bar */}
      {newsletterBar}

      {/* Content area */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "1.5rem 1rem" : isTablet ? "2rem 1.5rem" : "2.5rem 2rem",
          boxSizing: "border-box" as const,
        }}
      >
        <div
          style={{
            display: isCompact ? "flex" : "grid",
            flexDirection: isCompact ? "column" : undefined,
            gridTemplateColumns: isCompact ? undefined : "1fr 360px",
            gap: isMobile ? "2rem" : isTablet ? "2rem" : "3rem",
          }}
        >
          {/* Main content */}
          <div
            style={{
              minWidth: 0,
              alignSelf: isCompact ? "stretch" : "start",
              overflowWrap: "break-word" as const,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-literata)",
                fontSize: isMobile ? "1.375rem" : "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: theme.text,
              }}
            >
              {article.title}
            </h2>

            {/* Byline */}
            <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: 12 }}>
              <div
                className="zev-byline-avatar"
                style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}
              >
                <Image
                  src="/images/zev-uhuru.png"
                  alt="Zev Uhuru"
                  width={40}
                  height={40}
                  style={{ width: 40, height: 40, objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: theme.text, lineHeight: 1.3 }}>
                  Zev Uhuru
                </span>
                <span style={{ fontSize: "0.75rem", color: theme.muted, lineHeight: 1.3 }}>
                  Agentic Engineer
                </span>
              </div>
            </div>

            {/* Meta row */}
            <div
              style={{
                marginTop: "0.75rem",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: isMobile ? 10 : 16,
                fontSize: isMobile ? "0.8125rem" : "0.875rem",
                color: theme.textSecondary,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Calendar size={14} />
                {/* Date-only string — format in UTC to avoid off-by-one in
                    timezones behind UTC. */}
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={14} />
                {formatDuration(article.durationSeconds)}
              </span>
              {article.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {article.tags.map((tag) => (
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
            </div>

            {/* Description — accent panel */}
            {article.description && (
              <div
                style={{
                  position: "relative",
                  marginTop: isMobile ? "1.25rem" : "1.75rem",
                  padding: isMobile ? "1rem 1.125rem" : "1.125rem 1.375rem",
                  borderRadius: 14,
                  background: `linear-gradient(135deg, ${theme.accentTint} 0%, rgba(0, 168, 150, 0.02) 100%)`,
                  border: `1px solid ${theme.accentBorder}`,
                  overflow: "hidden",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: -22,
                    right: -22,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${theme.accentGlow} 0%, rgba(0, 168, 150, 0) 70%)`,
                    pointerEvents: "none",
                  }}
                />
                <p
                  style={{
                    position: "relative",
                    fontSize: isMobile ? "0.9375rem" : "1rem",
                    lineHeight: 1.6,
                    color: theme.text,
                    margin: 0,
                    fontWeight: 400,
                    wordBreak: "break-word" as const,
                  }}
                >
                  {article.description}
                </p>
              </div>
            )}

            {/* Workflow pipeline */}
            {article.stages && article.stages.length > 0 && (
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: isMobile ? "1rem 0.75rem" : "1.5rem 1.5rem",
                  borderRadius: 12,
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.surfaceElevated,
                  maxWidth: "100%",
                  overflow: "hidden",
                  boxSizing: "border-box" as const,
                }}
              >
                <div
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.06em",
                    color: theme.accent,
                    marginBottom: isMobile ? 12 : 16,
                  }}
                >
                  Workflow Pipeline
                </div>
                <WorkflowPipeline stages={article.stages} isMobile={isMobile} />
              </div>
            )}

            {/* Body */}
            {article.content && (
              <div style={{ marginTop: "2.5rem" }}>
                <EnhancedMarkdownRenderer content={article.content} light />
              </div>
            )}

            {/* Template CTA */}
            {article.templateSlug && (
              <div style={{ marginTop: "2.5rem", borderTop: `1px solid ${theme.border}`, paddingTop: "2rem" }}>
                <div
                  style={{
                    borderRadius: 12,
                    border: `1px solid ${theme.border}`,
                    backgroundColor: theme.surfaceElevated,
                    padding: isMobile ? "1.5rem" : "2rem",
                    textAlign: "center",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-literata)",
                      fontSize: isMobile ? "1.125rem" : "1.25rem",
                      fontWeight: 500,
                      color: theme.text,
                      marginBottom: 8,
                    }}
                  >
                    Try this workflow
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: theme.textSecondary,
                      maxWidth: 400,
                      margin: "0 auto 1.5rem",
                    }}
                  >
                    Open the template and create your first artifact in minutes.
                  </p>
                  <Link
                    href={`/workflows/${article.templateSlug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "0.75rem 1.5rem",
                      backgroundColor: theme.accent,
                      color: "#fff",
                      borderRadius: 8,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Open Template
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ width: isCompact ? "100%" : undefined }}>
            <div
              style={{
                position: isCompact ? "static" : "sticky",
                top: isCompact ? undefined : 112,
                maxHeight: isCompact ? undefined : "calc(100vh - 128px)",
                overflowY: isCompact ? undefined : "auto",
              }}
            >
              {sidebar}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
