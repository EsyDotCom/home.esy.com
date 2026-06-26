# esy.com revalidation runbook (operator-only)

Internal operator notes for wiring esy.com's own publications to the Esy
revalidation webhook. **Not for the public docs site** (`/docs`) — this is
deployment detail specific to our infrastructure and contains admin-only
mechanics. The consumer-facing version lives at `/docs/guides/connect-a-consumer-site`.

---

## What's admin/operator-only (and why it's here, not in /docs)

| Item | Why it's operator-only |
|--|--|
| `REVALIDATE_SECRET_KEY` (Railway, api.esy.com) | Fernet key that encrypts every publication's secret **at rest**. Platform secret — never documented publicly. |
| Creating a **public** publication (`isPublic`) | Admin-gated (`role: "admin"`). Today only we mint public publications; public docs describe public reads as a capability, not the gate. |
| Legacy `ESY_REVALIDATE_SECRET` transition shim | esy.com's own seeded `esy-research` / `esy-school` publications fall back to this single global secret until each carries its own. |
| Seeded slug → path mapping | `esy-research → /research`, `esy-school → /learn` lives in `src/app/api/revalidate/route.ts`; deployment detail. |
| HMAC Phase A/B/C rollout + dual-send | Internal engineering sequencing. |

---

## Environment variables

### api.esy.com (Railway) — the sender

| Var | Purpose |
|--|--|
| `REVALIDATE_SECRET_KEY` | Fernet key encrypting per-publication revalidate secrets at rest. **Required** to mint/rotate a publication secret. |
| `ESY_COM_REVALIDATE_SECRET` | Legacy global secret for the seeded `esy-research` / `esy-school` publications that don't yet carry their own. Transition shim only. |
| `ESY_COM_REVALIDATE_URL` | Legacy global esy.com webhook URL (pre-headless). |

### esy.com (Vercel) — the consumer

One secret **per publication**, matching what the API generated (copy from
Compose → publication → Connect):

```
ESY_REVALIDATE_SECRET_ESY_RESEARCH=<secret from Connect>
ESY_REVALIDATE_SECRET_ESY_SCHOOL=<secret from Connect>
```

Legacy single var still honored as a fallback during rollout:

```
ESY_REVALIDATE_SECRET=<legacy global secret>   # comma-separated list supported
```

---

## HMAC rollout status

The webhook is moving from Bearer token to HMAC signatures. See
`compose.esy.com/docs/plans/headless-webhook-hmac.md` and the concept doc
`compose.esy.com/docs/concepts/webhook-auth-bearer-vs-hmac.md`.

- **Phase A — esy.com accepts HMAC or Bearer.** ✅ merged (home.esy.com#52).
  `src/lib/verify-webhook.ts` + `src/app/api/revalidate/route.ts`.
- **Phase B — api.esy.com sends HMAC + Bearer (dual-send).** api.esy.com#71.
- **Phase C — drop Bearer.** After delivery health confirms every consumer
  verifies via HMAC in production.

---

## Bringing a publication online (operator steps)

1. **Confirm `REVALIDATE_SECRET_KEY` is set on Railway** (api.esy.com). Without it,
   create/rotate returns "Secret encryption key not configured".
2. In **Compose → Publications**, create (or open) the publication. Set
   `revalidateUrl` to `https://esy.com/api/revalidate`. As admin, mark it public.
3. In the **Connect** tab, generate/reveal the secret (shown once).
4. On **Vercel (esy.com)**, set `ESY_REVALIDATE_SECRET_<SLUG>` to that secret
   (e.g. `ESY_REVALIDATE_SECRET_ESY_RESEARCH`). Redeploy so the env var is live.
5. Click **Verify connection** in Connect. Expect HTTP 200 and green delivery
   health. A 401 means the secret on Vercel doesn't match; a 404 means the
   `revalidateUrl` is wrong (check for typos like `re-validate`).

---

## Notes for the /school → /learn transition

The public URL prefix for the `school` kind is `/learn` (the section moved). The
publication **slug** still drives the per-publication env var name and the
`PUBLICATION_TO_KIND` / `KIND_PATH_PREFIX` maps in
`src/app/api/revalidate/route.ts`. If the publication slug is renamed, update:

- the Vercel env var name (`ESY_REVALIDATE_SECRET_<NEW_SLUG>`),
- the `PUBLICATION_TO_KIND` map, and
- the legacy `_LEGACY_ESY_SLUGS` set in
  `api.esy.com/app/services/publication_revalidation.py` if the shim must keep working.
