"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Clock } from "lucide-react";
import { AgenticHeroSignup } from "./AgenticHeroSignup";
import { type AgenticVideo, formatDuration } from "@/data/agentic-videos";

// Bespoke above-the-fold stage for /agentic. Instead of the shared LibraryHero
// + card carousel, this renders a "screening room": decluttered editorial copy
// and capture on the left, one cinematic featured poster (the latest issue)
// with a quiet Up Next strip on the right.

function thumbOf(v: AgenticVideo, width = 1280): string {
  return (
    v.thumbnailUrl ||
    (v.muxPlaybackId
      ? `https://image.mux.com/${v.muxPlaybackId}/thumbnail.jpg?time=0&width=${width}`
      : "")
  );
}

// The featured poster — mux still, gradient scrim, play affordance, and the
// issue's identity (category + title + duration) burned into the frame.
function FeaturedPoster({ video }: { video: AgenticVideo }) {
  const [hovered, setHovered] = useState(false);
  const thumb = thumbOf(video);

  return (
    <Link
      href={`/agentic/${video.slug}`}
      aria-label={`Watch: ${video.title}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          borderRadius: 20,
          overflow: "hidden",
          border: `1px solid ${hovered ? "rgba(0, 212, 170, 0.35)" : "rgba(255, 255, 255, 0.09)"}`,
          boxShadow: hovered
            ? "0 48px 90px -24px rgba(0, 0, 0, 0.7), 0 0 80px rgba(0, 212, 170, 0.14)"
            : "0 40px 80px -24px rgba(0, 0, 0, 0.65), 0 0 60px rgba(0, 212, 170, 0.08)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          backgroundColor: "#06121F",
        }}
      >
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={video.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.03)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        ) : null}

        {/* Cinematic scrim so the burned-in title always reads */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(5, 15, 30, 0.25) 0%, rgba(5, 15, 30, 0) 35%, rgba(5, 15, 30, 0.88) 100%)",
          }}
        />

        {/* Latest-issue chip */}
        <span
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            padding: "4px 10px",
            borderRadius: 20,
            fontSize: "0.625rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#2dd4bf",
            background: "rgba(6, 18, 31, 0.65)",
            border: "1px solid rgba(0, 212, 170, 0.35)",
            backdropFilter: "blur(8px)",
          }}
        >
          Latest issue
        </span>

        {/* Play affordance */}
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${hovered ? 1.08 : 1})`,
            width: 68,
            height: 68,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: hovered ? "rgba(0, 168, 150, 0.92)" : "rgba(6, 18, 31, 0.55)",
            border: "1px solid rgba(255, 255, 255, 0.28)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
          }}
        >
          <Play size={26} color="#fff" fill="#fff" style={{ marginLeft: 3 }} />
        </span>

        {/* Burned-in identity */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "1.25rem 1.375rem",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                margin: "0 0 6px",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#2dd4bf",
              }}
            >
              {video.categoryLabel}
            </p>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-literata)",
                fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)",
                fontWeight: 500,
                lineHeight: 1.3,
                color: "#fff",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {video.title}
            </h2>
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              flexShrink: 0,
              padding: "4px 10px",
              borderRadius: 8,
              fontSize: "0.75rem",
              fontFamily: "var(--font-geist-mono)",
              color: "rgba(255,255,255,0.85)",
              background: "rgba(6, 18, 31, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Clock size={12} />
            {formatDuration(video.durationSeconds)}
          </span>
        </div>
      </div>
    </Link>
  );
}

// Quiet three-up strip under the poster — thumbnails only, no card chrome, so
// the featured frame stays the single focal point.
function UpNextStrip({ videos }: { videos: AgenticVideo[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  if (videos.length === 0) return null;

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <p
        style={{
          margin: "0 0 0.75rem",
          fontSize: "0.625rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        Up next
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${videos.length}, 1fr)`,
          gap: "0.875rem",
        }}
      >
        {videos.map((v) => {
          const hovered = hoveredSlug === v.slug;
          return (
            <Link
              key={v.slug}
              href={`/agentic/${v.slug}`}
              style={{ textDecoration: "none", color: "inherit", minWidth: 0 }}
              onMouseEnter={() => setHoveredSlug(v.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16 / 9",
                  borderRadius: 10,
                  overflow: "hidden",
                  border: `1px solid ${hovered ? "rgba(0, 212, 170, 0.4)" : "rgba(255,255,255,0.08)"}`,
                  opacity: hovered ? 1 : 0.82,
                  transition: "all 0.25s ease",
                  backgroundColor: "#06121F",
                }}
              >
                {thumbOf(v, 480) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumbOf(v, 480)}
                    alt={v.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : null}
              </div>
              <p
                style={{
                  margin: "0.5rem 0 0",
                  fontSize: "0.75rem",
                  lineHeight: 1.4,
                  color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  transition: "color 0.25s ease",
                }}
              >
                {v.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function AgenticHero({
  videos,
  isMobile,
  isTablet,
}: {
  videos: AgenticVideo[];
  isMobile: boolean;
  isTablet: boolean;
}) {
  const isCompact = isMobile || isTablet;
  // Videos arrive sorted by publish date; the newest is the marquee.
  const [featured, ...rest] = videos;
  const upNext = rest.slice(0, 3);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        // Layered stage lighting: teal key light behind the poster, cool fill
        // bottom-left, deep navy base — plus a faint grid for texture.
        background: [
          "radial-gradient(1100px 560px at 78% 18%, rgba(0, 212, 170, 0.13), transparent 62%)",
          "radial-gradient(900px 520px at 8% 92%, rgba(0, 120, 170, 0.12), transparent 60%)",
          "linear-gradient(168deg, #08203A 0%, #0A2540 48%, #051221 100%)",
        ].join(", "),
        borderBottom: "1px solid rgba(0, 212, 170, 0.12)",
      }}
    >
      {/* Faint blueprint grid overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 30%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 30%, black 30%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile
            ? "7rem 1rem 3.5rem"
            : isTablet
              ? "8rem 1.5rem 4rem"
              : "9rem 2rem 5.5rem",
          display: "grid",
          gridTemplateColumns: isCompact ? "1fr" : "minmax(0, 10fr) minmax(0, 11fr)",
          gap: isCompact ? "3rem" : "4.5rem",
          alignItems: "center",
        }}
      >
        {/* ── Copy + capture ─────────────────────────────────────────── */}
        <div>
          <p
            style={{
              margin: "0 0 1.25rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#2dd4bf",
            }}
          >
            Esy Presents
          </p>

          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-literata)",
              fontSize: isMobile ? "2.5rem" : "clamp(2.75rem, 4.6vw, 3.75rem)",
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              color: "#fff",
            }}
          >
            The Agentic
            <br />
            Engineer
          </h1>

          {/* One sentence — the demo-first promise, nothing else */}
          <p
            style={{
              margin: "1.5rem 0 0",
              fontSize: isMobile ? "1rem" : "1.0625rem",
              lineHeight: 1.7,
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: 440,
            }}
          >
            Agentic workflows that ship real products — the demo first, then
            the system design and the business behind it.
          </p>

          {/* Capture — its helper line carries the cadence, so nothing else
              competes below it */}
          <AgenticHeroSignup />
        </div>

        {/* ── Screening room ─────────────────────────────────────────── */}
        {featured && (
          <div style={{ position: "relative", minWidth: 0 }}>
            {/* Key-light glow behind the frame */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "-12% -8%",
                background:
                  "radial-gradient(60% 60% at 55% 42%, rgba(0, 212, 170, 0.16), transparent 70%)",
                filter: "blur(30px)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative" }}>
              <FeaturedPoster video={featured} />
              {/* Mobile keeps a single focal point; Up Next appears from tablet up */}
              {!isMobile && <UpNextStrip videos={upNext} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
