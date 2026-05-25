"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Play, Clock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ResearchVideoCard } from "@/components/Research/ResearchVideoCard";
import ResearchNewsletter from "@/components/Research/ResearchNewsletter";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import { navyCalmLightTheme as theme } from "@/lib/theme";
import {
  getPublishedResearchVideos,
  getResearchVideosByCategory,
  formatDuration,
  type ResearchVideo,
} from "@/data/research-videos";

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

export default function ResearchClient() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isCompact = isMobile || isTablet;

  const {
    subscribe,
    status: newsletterStatus,
    errorMessage: newsletterError,
    reset: resetNewsletter,
  } = useNewsletterSubscribe({ endpoint: '/api/newsletter/research/subscribe' });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribe(emailInputRef.current?.value || "");
  };

  const allVideos = getPublishedResearchVideos();
  const featured = allVideos[0];
  const aiToolsVideos = getResearchVideosByCategory("ai-tools");
  const workflowVideos = getResearchVideosByCategory("workflows");

  const featuredThumb =
    featured?.thumbnailUrl ||
    (featured?.muxPlaybackId
      ? `https://image.mux.com/${featured.muxPlaybackId}/thumbnail.jpg?time=0`
      : null);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily: "var(--font-inter)",
        paddingTop: isMobile ? 72 : 96,
        overflowX: "hidden",
        width: "100%",
      }}
    >
      {/* ═══ Hero ═══ */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile
            ? "2rem 1rem 2rem"
            : isTablet
              ? "3rem 1.5rem 2.5rem"
              : "4rem 2rem 3rem",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(10, 37, 64, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(10, 37, 64, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: isMobile ? "1.25rem" : "2rem" }}>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Research", isCurrent: true },
              ]}
            />
          </div>

          <h1
            style={{
              fontFamily: "var(--font-literata)",
              fontSize: isMobile ? "2rem" : "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: theme.accent }}>Research</span>
          </h1>

          <p
            style={{
              fontSize: isMobile
                ? "0.9375rem"
                : "clamp(1rem, 2vw, 1.25rem)",
              lineHeight: 1.6,
              color: theme.textSecondary,
              maxWidth: 600,
            }}
          >
            Engineering deep dives on AI coding tools, multi-agent architecture,
            and the workflows behind Esy — with video breakdowns and full
            transcripts.
          </p>
        </div>
      </section>

      {/* ═══ Featured ═══ */}
      {featured && (
        <section
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: isMobile
              ? "0 1rem 2rem"
              : isTablet
                ? "0 1.5rem 2.5rem"
                : "0 2rem 3rem",
          }}
        >
          <Link
            href={`/research/${featured.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                display: isCompact ? "flex" : "grid",
                flexDirection: isCompact ? "column" : undefined,
                gridTemplateColumns: isCompact ? undefined : "1.4fr 1fr",
                borderRadius: isMobile ? 16 : 20,
                overflow: "hidden",
                border: `1px solid ${theme.border}`,
                transition:
                  "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.accentBorder;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = theme.shadows.lg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  position: "relative",
                  minHeight: isMobile ? 180 : isTablet ? 260 : 340,
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                {featuredThumb ? (
                  <img
                    src={featuredThumb}
                    alt={featured.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
                    }}
                  >
                    <div
                      style={{
                        width: isMobile ? 56 : 80,
                        height: isMobile ? 56 : 80,
                        borderRadius: "50%",
                        backgroundColor: `${theme.accent}dd`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: theme.shadows.cta,
                      }}
                    >
                      <Play
                        size={isMobile ? 24 : 32}
                        color="#fff"
                        fill="#fff"
                        style={{ marginLeft: 3 }}
                      />
                    </div>
                  </div>
                )}

                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    borderRadius: 8,
                    padding: "4px 10px",
                    backgroundColor: "rgba(0,0,0,0.75)",
                    color: "#fff",
                    fontSize: "0.8125rem",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  {formatDuration(featured.durationSeconds)}
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    borderRadius: 20,
                    padding: "4px 14px",
                    backgroundColor: "rgba(255,255,255,0.92)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: theme.accent,
                  }}
                >
                  Latest
                </div>
              </div>

              <div
                style={{
                  backgroundColor: theme.surface,
                  padding: isMobile
                    ? "1.5rem"
                    : isTablet
                      ? "2rem"
                      : "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: theme.accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {featured.categoryLabel}
                </span>

                <h2
                  style={{
                    fontFamily: "var(--font-literata)",
                    fontSize: isMobile
                      ? "1.25rem"
                      : "clamp(1.375rem, 2.5vw, 1.75rem)",
                    fontWeight: 400,
                    lineHeight: 1.25,
                    marginBottom: "1rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {featured.title}
                </h2>

                {!isMobile && (
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      color: theme.textSecondary,
                      lineHeight: 1.7,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {featured.description}
                  </p>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{ fontSize: "0.875rem", color: theme.muted }}
                  >
                    {formatDuration(featured.durationSeconds)}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      color: theme.accent,
                    }}
                  >
                    Watch now
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ═══ AI Coding Tools ═══ */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile
            ? "0 1rem 3rem"
            : isTablet
              ? "0 1.5rem 3.5rem"
              : "0 2rem 4rem",
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
            AI Coding Tools
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: theme.textSecondary,
              lineHeight: 1.6,
              marginTop: "0.5rem",
            }}
          >
            Hands-on breakdowns of Claude Code, Cursor, and the AI tools used
            to build Esy.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
                ? "repeat(2, 1fr)"
                : "repeat(3, 1fr)",
            gap: isMobile ? "1.25rem" : "1.5rem",
          }}
        >
          {aiToolsVideos.map((video: ResearchVideo) => (
            <ResearchVideoCard
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

      {/* ═══ Workflow Research ═══ */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile
            ? "0 1rem 3rem"
            : isTablet
              ? "0 1.5rem 3.5rem"
              : "0 2rem 4rem",
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
            Workflow Research
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: theme.textSecondary,
              lineHeight: 1.6,
              marginTop: "0.5rem",
            }}
          >
            Architecture decisions, pipeline design, and the engineering behind
            Esy&apos;s agentic workflow engine.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
                ? "repeat(2, 1fr)"
                : "repeat(3, 1fr)",
            gap: isMobile ? "1.25rem" : "1.5rem",
          }}
        >
          {workflowVideos.map((video: ResearchVideo) => (
            <ResearchVideoCard
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

      {/* ═══ CTA Banner ═══ */}
      <section
        style={{
          backgroundColor: theme.sections.howItWorks,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          padding: isMobile
            ? "3rem 1rem"
            : isTablet
              ? "3.5rem 1.5rem"
              : "4rem 2rem",
        }}
      >
        <div
          style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-literata)",
              fontSize: isMobile
                ? "1.375rem"
                : "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              marginBottom: "1.25rem",
              letterSpacing: "-0.01em",
              color: "#fff",
            }}
          >
            Research anything. No prompt engineering required.
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
            Esy turns structured workflows into cited, publishable artifacts.
            Select a template, complete an intake, and receive your research
            output.
          </p>

          <Link
            href="/workflows"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: isMobile
                ? "0.75rem 1.5rem"
                : "0.875rem 1.75rem",
              backgroundColor: theme.accentHover,
              color: "#fff",
              borderRadius: 10,
              fontSize: "0.9375rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            Browse Templates
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ═══ Newsletter ═══ */}
      <ResearchNewsletter
        emailInputRef={emailInputRef}
        handleNewsletterSubmit={handleNewsletterSubmit}
        onInputChange={resetNewsletter}
        isMobile={isMobile}
        isTablet={isTablet}
        subscribeStatus={newsletterStatus}
        errorMessage={newsletterError}
      />
    </div>
  );
}
