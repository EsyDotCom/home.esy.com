# Vercel SSR/ISR Migration Checklist

esy.com now builds as a normal Next.js app on Vercel. Static registry content
still prerenders and caches at the CDN, while Compose-published research/school
articles can render and revalidate without a full rebuild.

## Vercel Environment Variables

Set these in the Vercel project before cutting traffic over:

- `ESY_API_URL=https://api.esy.com` — server-side source for Compose-published research/school articles and workflow catalog sync.
- `NEXT_PUBLIC_ESY_API_URL=https://api.esy.com` — browser-side API base used by client features.
- `ESY_REVALIDATE_SECRET=<shared random secret>` — required by `/api/revalidate`; must match `api.esy.com`.
- `BEEHIIV_API_KEY=<production key>` and `BEEHIIV_PUBLICATION_ID=<production id>` — main newsletter API route.
- `BEEHIIV_RESEARCH_API_KEY=<production key>` and `BEEHIIV_RESEARCH_PUBLICATION_ID=<production id>` — research newsletter API route.
- `NEXT_PUBLIC_IMAGE_CDN_PROVIDER=cloudflare` if the production image CDN mapping should stay enabled.
- `NEXT_PUBLIC_IS_QA=true` only on QA/preview deployments that should noindex and block crawlers.

Do not set R2 upload or Anthropic generation secrets in Vercel unless a reviewed
server route actually needs them; current production page rendering does not.

## api.esy.com Environment Variables

Set these on the API service after the Vercel deployment URL is known:

- `ESY_COM_REVALIDATE_URL=https://esy.com/api/revalidate`
- `ESY_COM_REVALIDATE_SECRET=<same value as ESY_REVALIDATE_SECRET>`

Preview testing can point `ESY_COM_REVALIDATE_URL` at a Vercel preview URL. Keep
production pointed at the canonical domain after DNS cutover.

## Redirect And Runtime Checks

- `next build` passes without `output: "export"` and emits server/ISR routes.
- `/guide/*` proxies through to `https://esy-guide.netlify.app/*` without changing the browser URL.
- Legacy redirects from `public/_redirects` return permanent redirects on Vercel.
- Netlify-only redirects from `netlify.toml` are preserved, including `/cities/*` and the guide proxy.
- `/research/`, `/school/`, `/research/<slug>/`, and `/school/<slug>/` render registry content from prerendered HTML.
- A Compose-published research/school slug renders without a site rebuild.
- `POST /api/revalidate` returns `401` without the shared secret and refreshes `/research`, `/school`, the affected detail path, and `/sitemap.xml` with the secret.
- `https://esy.com/sitemap.xml` includes registry-backed and Compose-published research/school slugs after revalidation.
- `https://esy.com/robots.txt` allows production crawlers and blocks QA when `NEXT_PUBLIC_IS_QA=true`.
- Newsletter subscribe API routes work on Vercel serverless runtime.

## DNS Cutover Checklist

- Confirm the Vercel production deployment has passed `npm run lint` and `npm run build`.
- Add `esy.com` and `www.esy.com` to the Vercel project and verify ownership.
- Lower DNS TTL before cutover if the current provider allows it.
- Change apex and `www` records only after approval:
  - Apex `A` record to Vercel's assigned apex target.
  - `www` `CNAME` to Vercel's assigned CNAME target.
- Keep the old Netlify site available during propagation for rollback.
- After propagation, verify:
  - `https://esy.com/`
  - `https://www.esy.com/`
  - `/guide/*`
  - `/sitemap.xml`
  - `/robots.txt`
  - one registry research slug
  - one Compose-published research or school slug
- Do not delete Netlify configuration or DNS records until the Vercel deployment has served production traffic successfully through a crawl and publish/unpublish test.
