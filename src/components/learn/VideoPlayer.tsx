"use client";

import React, { useRef, useEffect, useCallback, useState, forwardRef, useImperativeHandle } from 'react';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  SkipBack, SkipForward, Subtitles, Link2, MonitorUp,
  RotateCcw
} from 'lucide-react';
import { EsyLoader } from '@/components/EsyLoader';

interface VideoPlayerProps {
  src: string;
  title: string;
  author: string;
  durationLabel: string;
  publishedAt: string;
  onTimeUpdate?: (currentMs: number) => void;
  initialTimeMs?: number;
  isDark: boolean;
}

export interface VideoPlayerHandle {
  seekTo: (ms: number) => void;
  getCurrentTimeMs: () => number;
  play: () => void;
  pause: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(({
  src, title, author, durationLabel, publishedAt,
  onTimeUpdate, initialTimeMs, isDark
}, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showResume, setShowResume] = useState(false);
  const [resumeTime, setResumeTime] = useState(0);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Expose imperative handle
  useImperativeHandle(ref, () => ({
    seekTo: (ms: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = ms / 1000;
      }
    },
    getCurrentTimeMs: () => (videoRef.current ? videoRef.current.currentTime * 1000 : 0),
    play: () => videoRef.current?.play(),
    pause: () => videoRef.current?.pause(),
  }));

  // Initial seek
  useEffect(() => {
    if (initialTimeMs && initialTimeMs > 0 && videoRef.current) {
      setResumeTime(initialTimeMs);
      setShowResume(true);
    }
  }, [initialTimeMs]);

  const handleResume = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = resumeTime / 1000;
      videoRef.current.play();
      setShowResume(false);
    }
  }, [resumeTime]);

  // Time update handler
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleTimeUpdate = () => {
      setCurrentTime(v.currentTime);
      onTimeUpdate?.(v.currentTime * 1000);
      if (v.buffered.length > 0) {
        setBuffered(v.buffered.end(v.buffered.length - 1));
      }
    };
    const handleLoadedMetadata = () => {
      setDuration(v.duration);
      setLoading(false);
    };
    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleWaiting = () => setLoading(true);
    const handleCanPlay = () => setLoading(false);

    v.addEventListener('timeupdate', handleTimeUpdate);
    v.addEventListener('loadedmetadata', handleLoadedMetadata);
    v.addEventListener('play', handlePlay);
    v.addEventListener('pause', handlePause);
    v.addEventListener('waiting', handleWaiting);
    v.addEventListener('canplay', handleCanPlay);

    return () => {
      v.removeEventListener('timeupdate', handleTimeUpdate);
      v.removeEventListener('loadedmetadata', handleLoadedMetadata);
      v.removeEventListener('play', handlePlay);
      v.removeEventListener('pause', handlePause);
      v.removeEventListener('waiting', handleWaiting);
      v.removeEventListener('canplay', handleCanPlay);
    };
  }, [onTimeUpdate]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setShowResume(false); }
    else v.pause();
  }, []);

  const skip = useCallback((sec: number) => {
    if (videoRef.current) videoRef.current.currentTime += sec;
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pct * duration;
  }, [duration]);

  const handleProgressHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverTime(pct * duration);
    setHoverX(e.clientX - rect.left);
  }, [duration]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  }, []);

  const togglePiP = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else await videoRef.current.requestPictureInPicture();
    } catch { /* PiP not supported */ }
  }, []);

  const copyTimestampLink = useCallback(() => {
    const t = Math.floor(currentTime);
    const url = new URL(window.location.href);
    url.searchParams.set('t', t.toString());
    navigator.clipboard.writeText(url.toString());
  }, [currentTime]);

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0;

  const accentColor = isDark ? '#00D4AA' : '#00A896';
  const bgColor = isDark ? '#0A2540' : '#000000';
  const controlBg = isDark ? 'rgba(10, 37, 64, 0.9)' : 'rgba(0, 0, 0, 0.85)';
  const textColor = '#FFFFFF';
  const mutedColor = 'rgba(255,255,255,0.6)';

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case ' ': case 'k': e.preventDefault(); togglePlay(); break;
        case 'ArrowLeft': e.preventDefault(); skip(-10); break;
        case 'ArrowRight': e.preventDefault(); skip(10); break;
        case 'f': e.preventDefault(); toggleFullscreen(); break;
        case 'm': e.preventDefault(); setMuted(m => !m); break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [togglePlay, skip, toggleFullscreen]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        backgroundColor: bgColor,
        borderRadius: fullscreen ? 0 : '12px',
        overflow: 'hidden',
      }}
      role="region"
      aria-label={`Video player: ${title}`}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        onClick={togglePlay}
        playsInline
        preload="metadata"
        muted={muted}
      />

      {/* Loading spinner */}
      {loading && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
          <span style={{ color: accentColor, display: 'inline-flex' }}>
            <EsyLoader size={40} label="Loading video" />
          </span>
        </div>
      )}

      {/* Resume overlay */}
      {showResume && !playing && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 5,
        }}>
          <button
            onClick={handleResume}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.5rem', background: accentColor,
              border: 'none', borderRadius: '8px', color: '#0A2540',
              fontSize: '0.938rem', fontWeight: 600, cursor: 'pointer',
            }}
            aria-label={`Resume at ${formatTime(resumeTime / 1000)}`}
          >
            <RotateCcw size={16} />
            Resume at {formatTime(resumeTime / 1000)}
          </button>
          <button
            onClick={() => { setShowResume(false); togglePlay(); }}
            style={{
              marginTop: '0.75rem', padding: '0.5rem 1rem',
              background: 'transparent', border: `1px solid rgba(255,255,255,0.3)`,
              borderRadius: '6px', color: textColor, fontSize: '0.813rem',
              cursor: 'pointer',
            }}
          >
            Start from beginning
          </button>
        </div>
      )}

      {/* Play button overlay when paused */}
      {!playing && !showResume && !loading && (
        <div
          onClick={togglePlay}
          style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)', cursor: 'pointer',
          }}
        >
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: accentColor, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Play size={28} color="#0A2540" fill="#0A2540" style={{ marginLeft: '3px' }} />
          </div>
        </div>
      )}

      {/* Controls bar */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: `linear-gradient(transparent, ${controlBg})`,
          padding: '2rem 0.75rem 0.5rem',
          transition: 'opacity 0.2s',
        }}
      >
        {/* Progress bar */}
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          onMouseMove={handleProgressHover}
          onMouseLeave={() => setHoverTime(null)}
          style={{
            width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '2px', cursor: 'pointer', position: 'relative',
            marginBottom: '0.5rem',
          }}
          role="slider"
          aria-label="Video progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          {/* Buffered */}
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: `${bufferedPct}%`, backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '2px',
          }} />
          {/* Progress */}
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: `${progress}%`, backgroundColor: accentColor,
            borderRadius: '2px', transition: 'width 0.1s linear',
          }} />
          {/* Thumb */}
          <div style={{
            position: 'absolute', top: '50%', left: `${progress}%`,
            width: '12px', height: '12px', borderRadius: '50%',
            backgroundColor: accentColor, transform: 'translate(-50%, -50%)',
          }} />
          {/* Hover tooltip */}
          {hoverTime !== null && (
            <div style={{
              position: 'absolute', bottom: '16px', left: `${hoverX}px`,
              transform: 'translateX(-50%)', padding: '2px 6px',
              background: 'rgba(0,0,0,0.8)', borderRadius: '4px',
              fontSize: '0.75rem', color: textColor, whiteSpace: 'nowrap',
            }}>
              {formatTime(hoverTime)}
            </div>
          )}
        </div>

        {/* Controls row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '0.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <ControlBtn onClick={() => skip(-10)} label="Skip back 10 seconds" isDark={isDark}>
              <SkipBack size={16} />
            </ControlBtn>
            <ControlBtn onClick={togglePlay} label={playing ? 'Pause' : 'Play'} isDark={isDark}>
              {playing ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
            </ControlBtn>
            <ControlBtn onClick={() => skip(10)} label="Skip forward 10 seconds" isDark={isDark}>
              <SkipForward size={16} />
            </ControlBtn>

            {/* Volume */}
            <ControlBtn onClick={() => setMuted(m => !m)} label={muted ? 'Unmute' : 'Mute'} isDark={isDark}>
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </ControlBtn>

            {/* Time */}
            <span style={{ fontSize: '0.75rem', color: mutedColor, marginLeft: '0.5rem', fontVariantNumeric: 'tabular-nums' }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', position: 'relative' }}>
            {/* Speed */}
            <div style={{ position: 'relative' }}>
              <ControlBtn onClick={() => setShowSpeedMenu(s => !s)} label="Playback speed" isDark={isDark}>
                <span style={{ fontSize: '0.688rem', fontWeight: 600 }}>{playbackRate}x</span>
              </ControlBtn>
              {showSpeedMenu && (
                <div style={{
                  position: 'absolute', bottom: '100%', right: 0,
                  background: controlBg, backdropFilter: 'blur(10px)',
                  borderRadius: '8px', padding: '0.25rem', marginBottom: '4px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  {speeds.map(s => (
                    <button
                      key={s}
                      onClick={() => {
                        setPlaybackRate(s);
                        if (videoRef.current) videoRef.current.playbackRate = s;
                        setShowSpeedMenu(false);
                      }}
                      style={{
                        display: 'block', width: '100%', padding: '0.375rem 1rem',
                        background: s === playbackRate ? `${accentColor}22` : 'transparent',
                        border: 'none', borderRadius: '4px', color: s === playbackRate ? accentColor : textColor,
                        fontSize: '0.813rem', cursor: 'pointer', textAlign: 'left', whiteSpace: 'nowrap',
                      }}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ControlBtn onClick={copyTimestampLink} label="Copy link at current time" isDark={isDark}>
              <Link2 size={14} />
            </ControlBtn>
            <ControlBtn onClick={togglePiP} label="Picture in Picture" isDark={isDark}>
              <MonitorUp size={14} />
            </ControlBtn>
            <ControlBtn onClick={toggleFullscreen} label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'} isDark={isDark}>
              {fullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </ControlBtn>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;

// ─── Small control button ──────────────────────────────────
function ControlBtn({ onClick, label, children, isDark }: {
  onClick: () => void; label: string; children: React.ReactNode; isDark: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '32px', height: '32px', borderRadius: '6px',
        background: 'transparent', border: 'none',
        color: '#FFFFFF', cursor: 'pointer',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      {children}
    </button>
  );
}
