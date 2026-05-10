"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Mail, Loader2 } from "lucide-react";
import {
  type ResearchVideo,
  type WorkflowStage,
  formatDuration,
} from "@/data/research-videos";
import { VideoPlayer } from "@/components/School/VideoPlayer";
import { TranscriptToggle } from "@/components/School/TranscriptToggle";
import { ResearchNewsletterBar } from "@/components/Research/ResearchNewsletterBar";
import { ResearchRelatedVideos } from "@/components/Research/ResearchRelatedVideos";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnhancedMarkdownRenderer from "@/components/SchoolArticle/EnhancedMarkdownRenderer";
import { navyCalmLightTheme as theme } from "@/lib/theme";

interface ResearchVideoPageClientProps {
  video: ResearchVideo;
  related: ResearchVideo[];
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

function SidebarNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "invalid"
  >("idle");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!emailRegex.test(trimmed)) {
      setStatus("invalid");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/research/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      style={{
        borderRadius: 12,
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.surfaceElevated,
        padding: "1.25rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <Mail size={16} style={{ color: theme.accent }} />
        <h4
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: theme.text,
            margin: 0,
          }}
        >
          Esy Research
        </h4>
      </div>
      <p
        style={{
          fontSize: "0.75rem",
          color: theme.muted,
          margin: "0 0 12px",
        }}
      >
        Engineering deep dives and AI tool breakdowns weekly.
      </p>

      {status === "success" ? (
        <p
          style={{ fontSize: "0.8125rem", color: theme.success, margin: 0 }}
        >
          You&apos;re in! Check your inbox.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "invalid" || status === "error")
                setStatus("idle");
            }}
            placeholder="you@example.com"
            disabled={status === "loading"}
            style={{
              width: "100%",
              borderRadius: 8,
              border: `1px solid ${status === "invalid" ? (theme.error || "#ef4444") : theme.border}`,
              backgroundColor: theme.bg,
              padding: "0.5rem 0.75rem",
              fontSize: "0.8125rem",
              color: theme.text,
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              width: "100%",
              borderRadius: 8,
              border: "none",
              backgroundColor: theme.accent,
              color: "#fff",
              padding: "0.5rem 0",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: status === "loading" ? "default" : "pointer",
              opacity: status === "loading" ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontFamily: "inherit",
              transition: "opacity 0.2s ease",
            }}
          >
            {status === "loading" ? (
              <Loader2
                size={14}
                style={{ animation: "spin 1s linear infinite" }}
              />
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
      )}

      {status === "invalid" && (
        <p
          style={{
            fontSize: "0.6875rem",
            color: theme.error || "#ef4444",
            margin: "6px 0 0",
          }}
        >
          Enter a valid email address.
        </p>
      )}
      {status === "error" && (
        <p
          style={{
            fontSize: "0.6875rem",
            color: theme.error || "#ef4444",
            margin: "6px 0 0",
          }}
        >
          Something went wrong. Try again.
        </p>
      )}
    </div>
  );
}

function WorkflowPipeline({
  stages,
  isMobile,
}: {
  stages: WorkflowStage[];
  isMobile: boolean;
}) {
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
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            minWidth: isMobile ? 100 : 0,
          }}
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
                backgroundColor:
                  i === stages.length - 1
                    ? theme.accent
                    : "rgba(0, 168, 150, 0.12)",
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

export default function ResearchVideoPageClient({
  video,
  related,
}: ResearchVideoPageClientProps) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isCompact = isMobile || isTablet;

  const pagePadding = isMobile
    ? "0 1rem"
    : isTablet
      ? "0 1.5rem"
      : "0 2rem";

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
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: isMobile ? "0.875rem 1rem" : "1rem 2rem",
          }}
        >
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              {
                label:
                  isMobile && video.title.length > 30
                    ? video.title.slice(0, 30) + "\u2026"
                    : video.title,
                isCurrent: true,
              },
            ]}
          />
        </div>
      </div>

      {/* Video player */}
      <div style={{ width: "100%", backgroundColor: "#000" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <VideoPlayer
            playbackId={video.muxPlaybackId}
            title={video.title}
            thumbnailUrl={video.thumbnailUrl}
            durationSeconds={video.durationSeconds}
          />
        </div>
      </div>

      {/* Transcript toggle */}
      {video.transcript && (
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: pagePadding,
          }}
        >
          <TranscriptToggle transcript={video.transcript} />
        </div>
      )}

      {/* Newsletter bar */}
      <ResearchNewsletterBar />

      {/* Content area */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile
            ? "1.5rem 1rem"
            : isTablet
              ? "2rem 1.5rem"
              : "2.5rem 2rem",
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
                fontSize: isMobile
                  ? "1.375rem"
                  : "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: theme.text,
              }}
            >
              {video.title}
            </h2>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                className="zev-byline-avatar"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/images/zev-uhuru.png"
                  alt="Zev Uhuru"
                  width={40}
                  height={40}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: theme.text,
                    lineHeight: 1.3,
                  }}
                >
                  Zev Uhuru
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: theme.muted,
                    lineHeight: 1.3,
                  }}
                >
                  Agentic Engineer
                </span>
              </div>
            </div>

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
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Calendar size={14} />
                {new Date(video.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Clock size={14} />
                {formatDuration(video.durationSeconds)}
              </span>
              {video.tags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                  }}
                >
                  {video.tags.map((tag) => (
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

            {video.description && (
              <div
                style={{
                  position: "relative",
                  marginTop: isMobile ? "1.25rem" : "1.75rem",
                  padding: isMobile
                    ? "1rem 1.125rem"
                    : "1.125rem 1.375rem",
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
                  {video.description}
                </p>
              </div>
            )}

            {video.stages && video.stages.length > 0 && (
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: isMobile
                    ? "1rem 0.75rem"
                    : "1.5rem 1.5rem",
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
                <WorkflowPipeline
                  stages={video.stages}
                  isMobile={isMobile}
                />
              </div>
            )}

            {video.content && (
              <div style={{ marginTop: "2.5rem" }}>
                <EnhancedMarkdownRenderer content={video.content} light />
              </div>
            )}

            {/* Template CTA */}
            {video.templateSlug && (
              <div
                style={{
                  marginTop: "2.5rem",
                  borderTop: `1px solid ${theme.border}`,
                  paddingTop: "2rem",
                }}
              >
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
                    Open the template and create your first artifact in
                    minutes.
                  </p>
                  <Link
                    href={`/templates/${video.templateSlug}`}
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
                maxHeight: isCompact
                  ? undefined
                  : "calc(100vh - 128px)",
                overflowY: isCompact ? undefined : "auto",
              }}
            >
              {related.length > 0 && (
                <ResearchRelatedVideos videos={related} />
              )}

              <div
                style={{
                  marginTop: related.length > 0 ? "1.5rem" : 0,
                }}
              >
                <SidebarNewsletter />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
