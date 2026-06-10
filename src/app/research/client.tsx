"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ResearchVideoCard } from "@/components/Research/ResearchVideoCard";
import ResearchNewsletter from "@/components/Research/ResearchNewsletter";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import { navyCalmLightTheme as theme } from "@/lib/theme";
import LibraryHero from "@/components/LibraryHero/LibraryHero";
import HeroCarousel, { type HeroCarouselItem } from "@/components/LibraryHero/HeroCarousel";
import {
  getPublishedResearchVideos,
  getResearchVideosByCategory,
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

// Shared shelf layout (header + responsive card grid) so the index sections
// don't quadruplicate the same markup.
function VideoGridSection({
  title,
  description,
  videos,
  isMobile,
  isTablet,
}: {
  title: string;
  description: string;
  videos: ResearchVideo[];
  isMobile: boolean;
  isTablet: boolean;
}) {
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
        {videos.map((video: ResearchVideo) => (
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
  );
}

export default function ResearchClient() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

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
  // Latest leads the page (one desktop row); category shelves follow and may
  // repeat those videos — the shelf is the browse surface, Latest is the pulse.
  const latestVideos = allVideos.slice(0, 3);
  const modelVideos = getResearchVideosByCategory("models");
  const aiToolsVideos = getResearchVideosByCategory("ai-tools");
  const workflowVideos = getResearchVideosByCategory("workflows");

  // Spotlight recent videos in the stage carousel (mux thumbnail as fallback).
  const featuredCarousel: HeroCarouselItem[] = allVideos.slice(0, 6).map((v) => ({
    id: v.slug,
    href: `/research/${v.slug}`,
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
      {/* ═══ Library stage hero (shared with the artifact catalog pages) ═══ */}
      <LibraryHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Research" }]}
        title="Research"
        subhead="Engineering deep dives on frontier models, AI coding tools, and the workflows behind Esy, with video breakdowns and full transcripts."
        meta={
          <>
            <span>
              <strong>{allVideos.length}</strong> deep dives
            </span>
            <span className="esy-stage__meta-dot">·</span>
            <span>video + full transcript</span>
          </>
        }
        feature={
          <HeroCarousel
            items={featuredCarousel}
            ariaLabel="Featured research videos"
          />
        }
      />

      {/* Section order: Latest leads with the newest drops across all
          categories, Workflow Research is the flagship shelf, then the
          remaining category shelves. */}

      {/* ═══ Latest ═══ */}
      <VideoGridSection
        title="Latest"
        description="The newest research drops — frontier model releases, tool breakdowns, and workflow engineering."
        videos={latestVideos}
        isMobile={isMobile}
        isTablet={isTablet}
      />

      {/* ═══ Workflow Research ═══ */}
      <VideoGridSection
        title="Workflow Research"
        description="Architecture decisions, pipeline design, and the engineering behind Esy's agentic workflow engine."
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
            Browse Workflow Templates
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
