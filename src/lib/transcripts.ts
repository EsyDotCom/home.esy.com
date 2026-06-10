// Transcript parsing and shaping for video pages.
//
// Source of truth is an SRT file per video (src/data/transcripts/{slug}.srt).
// Raw SRT cues are mid-sentence fragments (~4s each), which read terribly as
// prose — so we group them into paragraph-level segments, each anchored to the
// start time of its first cue. Segments render server-side for SEO and power
// click-to-seek in the player.
//
// This module is pure (no fs) so client components can share the types and
// formatting helpers. File loading lives in transcript-loader.ts (server-only).

export interface TranscriptSegment {
  /** Start time in seconds (fractional). */
  start: number;
  text: string;
}

// Cue timestamps like "00:01:52,346.6666666666715" appear in machine-generated
// SRTs — the ms field can be fractional and unpadded, so parse it as a float.
const TIME_RE = /(\d{2}):(\d{2}):(\d{2})[,.]([\d.]+)/;

function parseTime(raw: string): number | null {
  const m = raw.match(TIME_RE);
  if (!m) return null;
  const [, h, min, s, ms] = m;
  return (
    Number(h) * 3600 + Number(min) * 60 + Number(s) + parseFloat(ms) / 1000
  );
}

/** Parse an SRT document into cue-level segments (index lines ignored). */
export function parseSrt(srt: string): TranscriptSegment[] {
  const cues: TranscriptSegment[] = [];
  // Cues are blank-line separated blocks: index, time range, then text lines.
  for (const block of srt.replace(/\r/g, "").split(/\n\s*\n/)) {
    const lines = block.split("\n").filter((l) => l.trim().length > 0);
    const timeLineIdx = lines.findIndex((l) => l.includes("-->"));
    if (timeLineIdx === -1) continue;
    const start = parseTime(lines[timeLineIdx].split("-->")[0]);
    const text = lines
      .slice(timeLineIdx + 1)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (start === null || !text) continue;
    cues.push({ start, text });
  }
  return cues;
}

// Paragraph shaping: close a segment once it spans ~25s AND ends on sentence
// punctuation, or hard-cap at 60s so a long run-on can't swallow the page.
const SOFT_BREAK_SECONDS = 25;
const HARD_BREAK_SECONDS = 60;

/** Merge cue fragments into readable, timestamped paragraphs. */
export function groupCuesIntoSegments(
  cues: TranscriptSegment[],
): TranscriptSegment[] {
  const segments: TranscriptSegment[] = [];
  let current: TranscriptSegment | null = null;

  for (const cue of cues) {
    if (!current) {
      current = { start: cue.start, text: cue.text };
      continue;
    }
    current.text = `${current.text} ${cue.text}`.replace(/\s+/g, " ").trim();

    const elapsed = cue.start - current.start;
    const sentenceEnd = /[.?!]["')\]]?$/.test(current.text);
    if (
      (elapsed >= SOFT_BREAK_SECONDS && sentenceEnd) ||
      elapsed >= HARD_BREAK_SECONDS
    ) {
      segments.push(current);
      current = null;
    }
  }
  if (current) segments.push(current);
  return segments;
}

/** Full transcript as plain prose — used for the VideoObject JSON-LD. */
export function transcriptToPlainText(segments: TranscriptSegment[]): string {
  return segments.map((s) => s.text).join("\n\n");
}

/** "m:ss" under an hour, "h:mm:ss" above — matches player display. */
export function formatTimestamp(seconds: number): string {
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h > 0
    ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    : `${m}:${s.toString().padStart(2, "0")}`;
}

/** ISO 8601 duration (e.g. PT15M11S) for schema.org VideoObject. */
export function toIsoDuration(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `PT${h > 0 ? `${h}H` : ""}${m > 0 ? `${m}M` : ""}${s}S`;
}
