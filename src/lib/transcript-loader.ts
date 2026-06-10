// Server-only transcript loading (fs). With `output: "export"` this runs at
// build time, so transcript text ships in the static HTML — crawlable with
// zero runtime cost. Keep this import out of client components.

import fs from "node:fs";
import path from "node:path";
import {
  parseSrt,
  groupCuesIntoSegments,
  type TranscriptSegment,
} from "./transcripts";

const TRANSCRIPTS_DIR = path.join(process.cwd(), "src", "data", "transcripts");

/**
 * Load and shape the transcript for a video slug.
 * Returns null when no SRT exists — pages render without a transcript section.
 */
export function loadTranscriptSegments(
  slug: string,
): TranscriptSegment[] | null {
  const file = path.join(TRANSCRIPTS_DIR, `${slug}.srt`);
  if (!fs.existsSync(file)) return null;
  const segments = groupCuesIntoSegments(parseSrt(fs.readFileSync(file, "utf8")));
  return segments.length > 0 ? segments : null;
}
