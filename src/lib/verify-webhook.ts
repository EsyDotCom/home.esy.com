import crypto from "node:crypto";

/**
 * Standard Webhooks-aligned HMAC verification for incoming Esy revalidation
 * webhooks. Esy signs `{id}.{timestamp}.{rawBody}` with the publication's secret
 * and sends three headers; we recompute and constant-time compare.
 *
 * Plain-language background:
 *   compose.esy.com/docs/concepts/webhook-auth-bearer-vs-hmac.md
 */

/** Reject anything signed more than this many seconds from now (replay guard). */
const TOLERANCE_SECONDS = 5 * 60;

export type WebhookHeaders = {
  id: string | null;
  timestamp: string | null;
  signature: string | null;
};

/** Pull the three Standard Webhooks headers off a request. */
export function readWebhookHeaders(get: (name: string) => string | null): WebhookHeaders {
  return {
    id: get("webhook-id"),
    timestamp: get("webhook-timestamp"),
    signature: get("webhook-signature"),
  };
}

/** True when the request carries a signature header (→ verify via HMAC, not Bearer). */
export function hasSignature(headers: WebhookHeaders): boolean {
  return Boolean(headers.id && headers.timestamp && headers.signature);
}

export type VerifyResult = { ok: boolean; reason?: string };

/**
 * Verify an HMAC-signed webhook against one or more candidate secrets (multiple
 * secrets allow rotation overlap). Body MUST be the exact raw bytes Esy signed,
 * so callers read `await request.text()` BEFORE JSON.parse.
 */
export function verifyHmac(
  rawBody: string,
  headers: WebhookHeaders,
  secrets: string[],
): VerifyResult {
  if (!headers.id || !headers.timestamp || !headers.signature) {
    return { ok: false, reason: "Missing webhook signature headers." };
  }
  if (secrets.length === 0) {
    return { ok: false, reason: "No secret configured for this publication." };
  }

  // Replay guard: timestamp must be a number within tolerance of now.
  const ts = Number(headers.timestamp);
  if (!Number.isFinite(ts)) {
    return { ok: false, reason: "Invalid webhook-timestamp." };
  }
  const skew = Math.abs(Date.now() / 1000 - ts);
  if (skew > TOLERANCE_SECONDS) {
    return { ok: false, reason: "Timestamp outside tolerance (possible replay)." };
  }

  const signedContent = `${headers.id}.${headers.timestamp}.${rawBody}`;

  // The header is a space-separated list of `v1,<base64>` entries; accept if any
  // entry matches any configured secret.
  const presented = headers.signature
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => (part.startsWith("v1,") ? part.slice(3) : part));

  for (const secret of secrets) {
    const expected = crypto
      .createHmac("sha256", Buffer.from(secret, "utf8"))
      .update(signedContent, "utf8")
      .digest("base64");
    for (const candidate of presented) {
      if (timingSafeEqualStr(expected, candidate)) {
        return { ok: true };
      }
    }
  }
  return { ok: false, reason: "Signature mismatch." };
}

/** Constant-time string compare that never throws on length mismatch. */
function timingSafeEqualStr(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Resolve the candidate secrets for a publication. Prefers the per-publication
 * env var (`ESY_REVALIDATE_SECRET_<SLUG>`), and always includes the legacy
 * single `ESY_REVALIDATE_SECRET` (comma-separated list supported) as a fallback
 * so nothing breaks mid-rollout.
 */
export function secretsForPublication(publicationSlug: string | null | undefined): string[] {
  const secrets: string[] = [];

  if (publicationSlug) {
    // esy-research → ESY_REVALIDATE_SECRET_ESY_RESEARCH
    const envKey = `ESY_REVALIDATE_SECRET_${publicationSlug.trim().toUpperCase().replace(/-/g, "_")}`;
    const perPub = process.env[envKey];
    if (perPub) secrets.push(...splitSecrets(perPub));
  }

  const legacy = process.env.ESY_REVALIDATE_SECRET;
  if (legacy) secrets.push(...splitSecrets(legacy));

  // De-dupe while preserving order.
  return [...new Set(secrets)];
}

function splitSecrets(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
