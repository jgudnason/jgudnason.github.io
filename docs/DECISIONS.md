# Decisions

Append-only, newest first. Each entry records a choice and the reasoning behind it — the part
that neither the code nor a diff can show. Add an entry when a decision is made; do not edit
old ones, supersede them instead.

---

## 2026-08-21 — Documentation re-cut from CDIO phases to lifecycle

`docs/` began as four CDIO phase specifications: `CONCEIVE.md`, `DESIGN.md`, `IMPLEMENT.md`,
`OPERATE.md`. Phases are temporal, and the build phase is over. The axis that matters now is
**rate of change**, so every one of the four straddled the seam, mixing permanently-true
content with content that expired at launch. The resulting drift was structural rather than
accidental, and would have recurred:

- The content schema existed three times — `DESIGN.md` §4 as YAML, `IMPLEMENT.md` §3 as
  TypeScript, and `src/content.config.ts` as the truth. Both prose copies had already drifted:
  `z.date()` where the code has `z.coerce.date()`, and no `.max(3)` on `tags` even though
  `OPERATE.md` §2.C stated that same 1–3 rule in prose.
- The publishing routine existed twice, and both copies pointed at the pre-Astro-5 config
  location inside `src/content/` — the path `AGENTS.md` explicitly warns against.
- Deployment appeared in four places.
- `DESIGN.md` §1 and §3 restated `navItems` and a directory listing; `IMPLEMENT.md` §3
  reproduced `astro.config.mjs` verbatim.
- `IMPLEMENT.md` §1 documented scaffolding that had already run and an editor integration not
  in use. `OPERATE.md` §4 ended mid-sentence.

Replaced by files split on how often they change: `CHARTER.md` (why the site exists),
`EDITORIAL.md` (how to write for it), `DECISIONS.md` (this file), `BACKLOG.md` (what is next),
and `AGENTS.md` for anything operational. The governing rule: **nothing that can be read from
the code belongs in prose** — link to the source file instead.

The originals remain in git history, and their reasoning is preserved here.

---

## 2026-08-21 — CV pipeline deferred below site content

A LaTeX-in-repo CV pipeline was proposed — `cv/cv.tex` compiled with XeLaTeX, with Zotero
auto-exporting `cv/refs.bib` so the CV and the site's publications list are fed from one
source. The analysis is sound and the toolchain was verified by test compile. It is deferred
anyway, and the proposal is kept at [`proposals/cv-pipeline.md`](proposals/cv-pipeline.md).

The payoff of that pipeline is at maintenance time, and there is nothing to maintain yet: the
publications list it would feed does not exist. Automating the upkeep of a list before the list
exists is backwards.

What unblocks the site instead is separable and much smaller: export the current CV as a PDF to
`public/pdf/cv.pdf`, and seed `src/content/publications/` by hand from a dblp export. Conflating
"the CV needs a pipeline" with "the site needs a CV" is what made the pipeline feel urgent.

A manual seed can be replaced by the pipeline later at no cost, because both produce entries in
the same shape — the schema in `src/content.config.ts` does not care which wrote them.

---

## 2026-08-20 — Cloudflare Pages, not GitHub Pages

The site is now built from source rather than served as hand-written HTML, so a build step is
required regardless of host. Cloudflare was chosen for one-click rollbacks, per-branch preview
URLs that allow a build to be verified before any DNS change, and for keeping course video
hosting in the same account as the site. This superseded the original GitHub Pages plan.

The migration is complete and its one-time steps will not run again. In outline: the project was
connected to the GitHub repository and built on a temporary branch, so `main` continued to serve
the old site throughout; the build was verified on the assigned `*.pages.dev` URL; the custom
domain was attached in an already-Cloudflare-managed zone, replacing the GitHub Pages records;
GitHub Pages was then unpublished and `public/CNAME` deleted as inert.

Two lessons from that migration are recorded in `AGENTS.md` because they still bite: the build
image's npm major version must match the one that generated `package-lock.json`, and the
`NODE_VERSION` variable must track `.node-version`.
