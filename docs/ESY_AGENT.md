# esy-agent (GitHub App) — Quick Reference

> **Canonical reference:** [`app.esy.com/docs/DEPLOYMENT_WORKFLOW.md`](https://github.com/EsyDotCom/app/blob/main/docs/DEPLOYMENT_WORKFLOW.md#github-app-identity-for-agents), section *GitHub App Identity For Agents*.
> Locally (sibling repo): `../app.esy.com/docs/DEPLOYMENT_WORKFLOW.md`.

That file is the source of truth. This file exists so agents working in `esy.com` can find the rule without leaving the repo. **Any conflict between the two — the canonical reference wins.**

---

## What it is

`esy-agent` is a GitHub App owned by the `EsyDotCom` org, used as a non-human identity for agent-authored commits, pushes, PR comments, and PR management. It is **installed on this repo** (`EsyDotCom/home.esy.com`).

- Installation ID (org-level): `131305027`
- App slug: `esy-agent`
- Local helper scripts:
  - `/Users/lem/.local/bin/esy-git-push`
  - `/Users/lem/.local/bin/esy-gh`

## When to use it

| Who is doing the work | Push | gh / PR ops |
|---|---|---|
| **Operator** (you) | `git push` | `gh ...` |
| **Agent** (Cursor, Codex, Claude, etc.) | `esy-git-push origin HEAD` | `esy-gh pr create ...`, `esy-gh pr comment ...` |

The git commit *author* still comes from local git metadata; the wrapper only changes the authentication used to push the branch or open/edit the PR. So in PR history, agent-authored pushes appear as commits by you with branch/PR actions performed by `esy-agent[bot]`.

## If it stops working

If `esy-git-push` or `esy-gh` against this repo fails with `Permission ... denied to esy-agent[bot]` or HTTP 403, the most likely cause is that the app was uninstalled from this repo. Re-add it at:

[https://github.com/organizations/EsyDotCom/settings/installations/131305027](https://github.com/organizations/EsyDotCom/settings/installations/131305027)

→ **Repository access** → **Select repositories** → check `home.esy.com` → **Save**.

If the private key leaked or was copied somewhere unsafe, **rotate it immediately** per the rotation procedure in the canonical doc.

## Why this doc exists in two places

This file is intentionally redundant with `app.esy.com/docs/DEPLOYMENT_WORKFLOW.md`. The redundancy is fine because:

- An agent invoked inside `esy.com` may not have the sibling `app.esy.com` repo cloned or readable, so a self-contained pointer keeps the rule discoverable.
- The agent identity setup is operational infrastructure — not a moving target — so the cost of two copies is low.
- The canonical doc owns the *full* policy (rotation rules, future hardening plans, multi-repo install strategy, GitHub App vs PAT trade-offs). This doc is a **pointer + the repo-specific bits** (installation ID, this repo's URL).

When updating the policy, update the canonical doc first. Update this file only when (a) the install scope changes (e.g., this repo gets removed), or (b) the local helper paths change.
