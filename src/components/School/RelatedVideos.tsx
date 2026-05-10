import Link from "next/link";
import { Clock, ArrowRight, Play } from "lucide-react";
import { type SchoolVideo, formatDuration } from "@/data/school-videos";
import { navyCalmLightTheme as theme } from "@/lib/theme";

export interface RelatedVideosProps {
  videos: SchoolVideo[];
}

export function RelatedVideos({ videos }: RelatedVideosProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: theme.muted,
          }}
        >
          More videos
        </span>
        <Link
          href="/school"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: "0.75rem",
            color: theme.muted,
            textDecoration: "none",
          }}
        >
          Browse all
          <ArrowRight size={12} />
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {videos.map((video) => {
          const thumb = video.muxPlaybackId
            ? `https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg?time=0&width=256`
            : null;

          return (
            <Link
              key={video.slug}
              href={`/school/${video.slug}`}
              style={{
                display: "flex",
                gap: 12,
                borderRadius: 10,
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.bg,
                padding: 10,
                textDecoration: "none",
                color: "inherit",
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.accentBorder;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.border;
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  position: "relative",
                  width: 128,
                  flexShrink: 0,
                  aspectRatio: "16 / 9",
                  borderRadius: 6,
                  overflow: "hidden",
                  backgroundColor: theme.surfaceElevated,
                }}
              >
                {thumb ? (
                  <img
                    src={thumb}
                    alt={video.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                    <Play size={16} color="rgba(255,255,255,0.6)" />
                  </div>
                )}
                <span
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    borderRadius: 4,
                    padding: "1px 4px",
                    backgroundColor: "rgba(0,0,0,0.75)",
                    color: "#fff",
                    fontSize: "0.625rem",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  {formatDuration(video.durationSeconds)}
                </span>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                <h4
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    lineHeight: 1.35,
                    color: theme.text,
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {video.title}
                </h4>
                <p style={{ fontSize: "0.6875rem", color: theme.muted, margin: "4px 0 0" }}>
                  {new Date(video.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
