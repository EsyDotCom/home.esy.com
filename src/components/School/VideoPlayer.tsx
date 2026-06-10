"use client";

import MuxPlayerElement, {
  type MuxPlayerElement as MuxPlayerRef,
} from "@mux/mux-player-react";
import type { Ref } from "react";
import { Play, SkipBack, SkipForward, Maximize } from "lucide-react";

export interface VideoPlayerProps {
  playbackId: string;
  title: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  /** Optional handle to the underlying <mux-player> element so siblings
      (e.g. the transcript) can seek and observe playback. */
  playerRef?: Ref<MuxPlayerRef>;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PlayerPlaceholder({
  title,
  durationSeconds = 0,
}: {
  title: string;
  durationSeconds?: number;
}) {
  return (
    <div
      className="relative aspect-video w-full overflow-hidden bg-black"
      role="img"
      aria-label={`Video placeholder: ${title}`}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        aria-hidden
      />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Play button */}
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#00A896]"
          aria-hidden
        >
          <Play
            size={28}
            color="#FFFFFF"
            fill="#FFFFFF"
            className="ml-0.5"
            strokeWidth={2}
          />
        </div>
        <p className="mt-4 max-w-[80%] truncate text-center text-sm font-medium text-white">
          {title}
        </p>
      </div>

      {/* Fake control bar */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8"
        aria-hidden
      >
        {/* Progress bar */}
        <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full w-[30%] rounded-full bg-[#00A896]"
            style={{ minWidth: "30%" }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-md text-white/60"
              aria-hidden
            >
              <SkipBack size={16} />
            </button>
            <button
              type="button"
              disabled
              className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-md text-white/60"
              aria-hidden
            >
              <Play size={18} className="ml-0.5" />
            </button>
            <button
              type="button"
              disabled
              className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-md text-white/60"
              aria-hidden
            >
              <SkipForward size={16} />
            </button>
            <span className="ml-2 font-mono text-xs tabular-nums text-white/60">
              {formatDuration(0)} / {formatDuration(durationSeconds)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="rounded px-2 py-1 text-xs font-semibold text-white/60">
              1x
            </span>
            <button
              type="button"
              disabled
              className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-md text-white/60"
              aria-hidden
            >
              <Maximize size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoPlayer({
  playbackId,
  title,
  thumbnailUrl,
  durationSeconds,
  playerRef,
}: VideoPlayerProps) {
  if (!playbackId) {
    return (
      <PlayerPlaceholder title={title} durationSeconds={durationSeconds} />
    );
  }

  const poster =
    thumbnailUrl ?? `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0`;

  return (
    <div className="video-player-wrapper" style={{ background: "#000" }}>
      <MuxPlayerElement
        ref={playerRef}
        playbackId={playbackId}
        metadata={{ video_title: title }}
        poster={poster}
        accentColor="#00A896"
        primaryColor="#000000"
        secondaryColor="rgba(255,255,255,0.85)"
        className="aspect-video w-full"
        streamType="on-demand"
        defaultHiddenCaptions
        playbackRates={[0.5, 0.75, 1, 1.25, 1.5, 2]}
        forwardSeekOffset={10}
        backwardSeekOffset={10}
      />
    </div>
  );
}
