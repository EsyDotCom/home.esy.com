"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { FileText, ChevronDown, Search, ArrowDown, X } from "lucide-react";
import type { MuxPlayerElement } from "@mux/mux-player-react";
import { type TranscriptSegment, formatTimestamp } from "@/lib/transcripts";
import { navyCalmLightTheme as theme } from "@/lib/theme";

type VideoTranscriptProps = {
  segments: TranscriptSegment[];
  /** Handle to the page's Mux player for click-to-seek and playback sync. */
  playerRef: RefObject<MuxPlayerElement | null>;
};

// Reading column inside the wide (1200px) container — transcripts read like
// prose, so cap the measure instead of running lines edge to edge.
const READING_MAX_WIDTH = 760;

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

// Highlight search matches inside a segment without breaking SSR text content.
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "ig"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            style={{
              backgroundColor: theme.accentTint,
              color: theme.accent,
              fontWeight: 600,
              borderRadius: 3,
              padding: "0 2px",
            }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/**
 * Interactive video transcript docked beneath the player.
 *
 * Follows the Apple Podcasts / Mux interactive-transcript pattern: paragraphs
 * are tap-to-seek, the spoken segment is highlighted while others stay dimmed,
 * the panel auto-follows playback (pausing politely when the user scrolls),
 * and the text is searchable.
 *
 * SEO contract: every segment is always in the DOM — the panel is hidden with
 * CSS when collapsed, never conditionally rendered — so the full transcript
 * ships in the statically exported HTML.
 */
export function VideoTranscript({ segments, playerRef }: VideoTranscriptProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFollowing, setIsFollowing] = useState(true);
  const [query, setQuery] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const segmentEls = useRef<(HTMLDivElement | null)[]>([]);

  const matchCount = useMemo(() => {
    if (!query) return 0;
    const q = query.toLowerCase();
    return segments.filter((s) => s.text.toLowerCase().includes(q)).length;
  }, [query, segments]);

  // Track playback → active segment. Only wired while open so a closed
  // transcript costs nothing.
  useEffect(() => {
    if (!isOpen) return;
    const player = playerRef.current;
    if (!player) return;

    const onTimeUpdate = () => {
      const t = player.currentTime;
      let idx = -1;
      for (let i = 0; i < segments.length; i++) {
        if (segments[i].start <= t) idx = i;
        else break;
      }
      setActiveIndex(idx);
    };
    onTimeUpdate();
    player.addEventListener("timeupdate", onTimeUpdate);
    return () => player.removeEventListener("timeupdate", onTimeUpdate);
  }, [isOpen, segments, playerRef]);

  // Auto-follow: keep the active paragraph centered in the panel. Searching
  // suspends following so results don't scroll away under the reader.
  useEffect(() => {
    if (!isOpen || !isFollowing || query || activeIndex < 0) return;
    const panel = scrollRef.current;
    const el = segmentEls.current[activeIndex];
    if (!panel || !el) return;
    panel.scrollTo({
      top: el.offsetTop - panel.clientHeight / 2 + el.clientHeight / 2,
      behavior: "smooth",
    });
  }, [activeIndex, isFollowing, isOpen, query]);

  // User scroll intent (wheel/touch, not our programmatic scrolls) pauses
  // auto-follow; a "Back to current" pill restores it.
  useEffect(() => {
    if (!isOpen) return;
    const panel = scrollRef.current;
    if (!panel) return;
    const pause = () => setIsFollowing(false);
    panel.addEventListener("wheel", pause, { passive: true });
    panel.addEventListener("touchmove", pause, { passive: true });
    return () => {
      panel.removeEventListener("wheel", pause);
      panel.removeEventListener("touchmove", pause);
    };
  }, [isOpen]);

  if (segments.length === 0) return null;

  const seekTo = (seconds: number) => {
    const player = playerRef.current;
    if (!player) return;
    player.currentTime = seconds;
    void player.play();
    setIsFollowing(true);
    player.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const totalLabel = formatTimestamp(segments[segments.length - 1].start);

  return (
    <section
      aria-label="Video transcript"
      style={{
        borderLeft: `1px solid ${theme.border}`,
        borderRight: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`,
        borderRadius: "0 0 14px 14px",
        overflow: "hidden",
        backgroundColor: theme.surfaceElevated,
      }}
    >
      {/* ── Collapsed: inviting teaser with the opening words ───────────── */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: isOpen ? "none" : "block",
          padding: isMobile ? "0.875rem 1rem" : "1rem 1.25rem",
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          fontFamily: "inherit",
          textAlign: "left",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: theme.accent,
            }}
          >
            <FileText size={15} />
            Transcript
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: "0.75rem",
              color: theme.muted,
              flexShrink: 0,
            }}
          >
            {!isMobile && <span>{totalLabel} · tap to read &amp; jump</span>}
            <ChevronDown size={16} />
          </span>
        </span>
        <span
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginTop: 8,
            fontSize: "0.875rem",
            lineHeight: 1.6,
            color: theme.textSecondary,
            fontStyle: "italic",
          }}
        >
          &ldquo;{segments[0].text}&rdquo;
        </span>
      </button>

      {/* ── Expanded: header + reading panel ─────────────────────────────── */}
      <div style={{ display: isOpen ? "block" : "none" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
            padding: isMobile ? "0.75rem 1rem" : "0.75rem 1.25rem",
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: theme.accent,
            }}
          >
            <FileText size={15} />
            Transcript
            <span
              style={{
                fontWeight: 400,
                textTransform: "none",
                letterSpacing: 0,
                color: theme.muted,
              }}
            >
              {totalLabel}
            </span>
          </span>

          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Search within the transcript (Apple Podcasts pattern) */}
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderRadius: 8,
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.bg,
                padding: "0.3125rem 0.625rem",
              }}
            >
              <Search size={13} style={{ color: theme.muted, flexShrink: 0 }} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search transcript"
                aria-label="Search transcript"
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  fontSize: "0.8125rem",
                  color: theme.text,
                  fontFamily: "inherit",
                  width: isMobile ? 120 : 160,
                }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    padding: 0,
                    cursor: "pointer",
                    color: theme.muted,
                    display: "flex",
                  }}
                >
                  <X size={13} />
                </button>
              )}
            </span>
            {query && (
              <span
                style={{
                  fontSize: "0.75rem",
                  color: matchCount > 0 ? theme.accent : theme.muted,
                  whiteSpace: "nowrap",
                }}
              >
                {matchCount} match{matchCount === 1 ? "" : "es"}
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Hide transcript"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                border: "none",
                backgroundColor: "transparent",
                padding: "0.25rem",
                cursor: "pointer",
                color: theme.textSecondary,
                fontSize: "0.75rem",
                fontFamily: "inherit",
              }}
            >
              <ChevronDown size={16} style={{ transform: "rotate(180deg)" }} />
            </button>
          </span>
        </div>

        <div style={{ position: "relative" }}>
          <div
            ref={scrollRef}
            style={{
              position: "relative",
              maxHeight: isMobile ? "55vh" : "min(62vh, 580px)",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: `${theme.border} transparent`,
              padding: isMobile ? "0.75rem 1rem 1.5rem" : "1rem 1.25rem 2rem",
            }}
          >
            <div style={{ maxWidth: READING_MAX_WIDTH, margin: "0 auto" }}>
              {segments.map((segment, i) => {
                const isActive = i === activeIndex;
                const hasMatch =
                  !!query &&
                  segment.text.toLowerCase().includes(query.toLowerCase());
                return (
                  <div
                    key={segment.start}
                    ref={(el) => {
                      segmentEls.current[i] = el;
                    }}
                    onClick={() => seekTo(segment.start)}
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? 4 : 18,
                      alignItems: "baseline",
                      padding: isMobile
                        ? "0.625rem 0.75rem"
                        : "0.75rem 0.875rem",
                      margin: "2px 0",
                      borderRadius: 10,
                      cursor: "pointer",
                      backgroundColor: isActive
                        ? theme.accentTint
                        : "transparent",
                      opacity: query && !hasMatch ? 0.35 : 1,
                      transition:
                        "background-color 0.25s ease, opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        e.currentTarget.style.backgroundColor =
                          "rgba(0, 0, 0, 0.03)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        seekTo(segment.start);
                      }}
                      aria-label={`Jump to ${formatTimestamp(segment.start)}`}
                      style={{
                        flexShrink: 0,
                        width: isMobile ? "auto" : 44,
                        textAlign: isMobile ? "left" : "right",
                        border: "none",
                        backgroundColor: "transparent",
                        padding: 0,
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        color: isActive ? theme.accent : theme.muted,
                        cursor: "pointer",
                        fontVariantNumeric: "tabular-nums",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {formatTimestamp(segment.start)}
                    </button>
                    <p
                      style={{
                        margin: 0,
                        fontSize: isMobile ? "0.875rem" : "0.9375rem",
                        lineHeight: 1.75,
                        color: isActive ? theme.text : theme.textSecondary,
                        transition: "color 0.25s ease",
                      }}
                    >
                      <HighlightedText text={segment.text} query={query} />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Soft edge fades so the scroll area reads as continuous prose */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 20,
              background: `linear-gradient(${theme.surfaceElevated}, transparent)`,
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 28,
              background: `linear-gradient(transparent, ${theme.surfaceElevated})`,
              pointerEvents: "none",
            }}
          />

          {/* Re-engage auto-follow after the reader scrolled away */}
          {!isFollowing && activeIndex >= 0 && !query && (
            <button
              type="button"
              onClick={() => setIsFollowing(true)}
              style={{
                position: "absolute",
                bottom: 14,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderRadius: 999,
                border: "none",
                backgroundColor: theme.accent,
                color: "#fff",
                padding: "0.4375rem 0.875rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.18)",
              }}
            >
              <ArrowDown size={13} />
              Back to current
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
