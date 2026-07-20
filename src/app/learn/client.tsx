"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VideoCard } from "@/components/School/VideoCard";
import SchoolNewsletter from "@/components/School/SchoolNewsletter";
import { LearnHeroSignup } from "@/components/School/LearnHeroSignup";
import { CoursesPromoSection } from "@/components/School/CoursesPromoSection";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import { navyCalmLightTheme as theme } from "@/lib/theme";
import { type SchoolVideo } from "@/data/school-videos";
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
        // Newsletter capture in the hero (Learn publication), mirroring /research.
        action={<LearnHeroSignup />}
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
            Short walkthroughs on selecting, running, and reviewing Esy&apos;s agentic workflow templates — the quick-start companion to AI Courses.
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

      <CoursesPromoSection isMobile={isMobile} isTablet={isTablet} />

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
