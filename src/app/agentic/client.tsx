"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AgenticVideoCard } from "@/components/Agentic/AgenticVideoCard";
import AgenticNewsletter from "@/components/Agentic/AgenticNewsletter";
import { AgenticHero } from "@/components/Agentic/AgenticHero";
import { CoursesPromoSection } from "@/components/School/CoursesPromoSection";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import { navyCalmLightTheme as theme } from "@/lib/theme";
import { type AgenticVideo } from "@/data/agentic-videos";

// The three research categories that get their own shelf. Anything else
// (tutorials published from esy-learn with free-form categories) collects into
// the "Tutorials & Guides" shelf so no merged article is orphaned.
const SHELF_CATEGORIES = new Set(["workflows", "models", "ai-tools"]);

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

// Shared shelf layout (header + responsive card grid) so the index sections
// don't duplicate the same markup. Renders nothing when the shelf is empty.
function VideoGridSection({
  title,
  description,
  videos,
  isMobile,
  isTablet,
}: {
  title: string;
  description: string;
  videos: AgenticVideo[];
  isMobile: boolean;
  isTablet: boolean;
}) {
  if (videos.length === 0) return null;

  return (
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
          {title}
        </h2>
        <p
          style={{
            fontSize: "0.9375rem",
            color: theme.textSecondary,
            lineHeight: 1.6,
            marginTop: "0.5rem",
          }}
        >
          {description}
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
        {videos.map((video: AgenticVideo) => (
          <AgenticVideoCard
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
  );
}

// Videos arrive from the server component: static registry merged with articles
// published live from Compose (api.esy.com) across both the esy-research and
// esy-learn publications.
export default function AgenticClient({ videos }: { videos: AgenticVideo[] }) {
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

  const allVideos = videos;
  // Latest leads the page (one desktop row); category shelves follow and may
  // repeat those videos — the shelf is the browse surface, Latest is the pulse.
  const latestVideos = allVideos.slice(0, 3);
  const modelVideos = allVideos.filter((v) => v.category === "models");
  const aiToolsVideos = allVideos.filter((v) => v.category === "ai-tools");
  const workflowVideos = allVideos.filter((v) => v.category === "workflows");
  // Catch-all so merged tutorial content (arbitrary categories) always shows.
  const tutorialVideos = allVideos.filter((v) => !SHELF_CATEGORIES.has(v.category));

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
      {/* ═══ Studio stage hero — featured screening + capture ═══ */}
      <AgenticHero videos={allVideos} isMobile={isMobile} isTablet={isTablet} />

      {/* Section order: Latest leads with the newest drops across all
          categories, Workflow Research is the flagship shelf, then the
          remaining category shelves, then merged tutorials. */}

      {/* ═══ Latest ═══ */}
      <VideoGridSection
        title="Latest"
        description="The newest issues — agentic workflows, frontier model releases, tool breakdowns, and the business behind them."
        videos={latestVideos}
        isMobile={isMobile}
        isTablet={isTablet}
      />

      {/* ═══ Workflow Research ═══ */}
      <VideoGridSection
        title="Workflow Research"
        description="Architecture decisions, pipeline design, and the engineering behind Esy's agentic workflow engine — plus how each workflow earns its keep."
        videos={workflowVideos}
        isMobile={isMobile}
        isTablet={isTablet}
      />

      {/* ═══ Model Research ═══ */}
      <VideoGridSection
        title="Model Research"
        description="Frontier model releases — launch-day first impressions and deep-dive evaluations of how each model performs in real workflows."
        videos={modelVideos}
        isMobile={isMobile}
        isTablet={isTablet}
      />

      {/* ═══ AI Coding Tools ═══ */}
      <VideoGridSection
        title="AI Coding Tools"
        description="Hands-on breakdowns of Claude Code, Cursor, and the AI tools used to build Esy."
        videos={aiToolsVideos}
        isMobile={isMobile}
        isTablet={isTablet}
      />

      {/* ═══ Tutorials & Guides (merged from esy-learn) ═══ */}
      <VideoGridSection
        title="Tutorials & Guides"
        description="Step-by-step walkthroughs — selecting, running, and reviewing Esy's agentic workflow templates."
        videos={tutorialVideos}
        isMobile={isMobile}
        isTablet={isTablet}
      />

      <CoursesPromoSection isMobile={isMobile} isTablet={isTablet} />

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
            Build the workflow. Ship the product.
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
            Select a template, complete an intake, and receive your output.
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
            Browse Workflow Templates
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ═══ Newsletter ═══ */}
      <AgenticNewsletter
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
