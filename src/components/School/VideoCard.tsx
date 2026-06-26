import Link from "next/link";
import { Play, Clock } from "lucide-react";
import { formatDuration } from "@/data/school-videos";
import { navyCalmLightTheme as theme } from "@/lib/theme";

export interface VideoCardProps {
  title: string;
  slug: string;
  thumbnailUrl?: string;
  muxPlaybackId: string;
  durationSeconds: number;
  category: string;
  categoryLabel: string;
  tags: string[];
  publishedAt?: string;
}

export function VideoCard({
  title,
  slug,
  thumbnailUrl,
  muxPlaybackId,
  durationSeconds,
  categoryLabel,
  tags,
  publishedAt,
}: VideoCardProps) {
  const thumbnailSrc =
    thumbnailUrl ||
    (muxPlaybackId
      ? `https://image.mux.com/${muxPlaybackId}/thumbnail.jpg?time=0`
      : null);

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <Link href={`/learn/${slug}`} style={{ textDecoration: "none", color: "inherit", minWidth: 0 }}>
      <div
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          border: `1px solid ${theme.border}`,
          backgroundColor: theme.surface,
          transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = theme.accentBorder;
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = theme.shadows.hover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = theme.border;
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Thumbnail */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            backgroundColor: theme.primary,
          }}
        >
          {thumbnailSrc ? (
            <img
              src={thumbnailSrc}
              alt={title}
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
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Play size={24} color="rgba(255,255,255,0.8)" fill="rgba(255,255,255,0.8)" style={{ marginLeft: 2 }} />
              </div>
            </div>
          )}

          {/* Duration badge */}
          <div
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              display: "flex",
              alignItems: "center",
              gap: 4,
              borderRadius: 6,
              padding: "3px 8px",
              backgroundColor: "rgba(0,0,0,0.75)",
              color: "#fff",
              fontSize: "0.75rem",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            <Clock size={12} />
            {formatDuration(durationSeconds)}
          </div>

          {/* Category badge */}
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              borderRadius: 20,
              padding: "3px 10px",
              backgroundColor: "rgba(255,255,255,0.92)",
              color: theme.primary,
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            {categoryLabel}
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "1.25rem",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.surface,
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
            {title}
          </h3>

          {formattedDate && (
            <p style={{ fontSize: "0.8125rem", color: theme.muted, marginBottom: "0.75rem" }}>
              {formattedDate}
            </p>
          )}

          {tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
              {tags.map((tag) => (
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
      </div>
    </Link>
  );
}
