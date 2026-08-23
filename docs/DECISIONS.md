# Decisions

Append-only, newest first. Each entry records a choice and the reasoning behind it — the part
that neither the code nor a diff can show. Add an entry when a decision is made; do not edit
old ones, supersede them instead.

---

## 2026-08-22 — Corpus papers are publications; dataset deposits are not

The publications list includes peer-reviewed papers about speech corpora — Almannarómur,
Samrómur and its children and million variants, Talrómur, the Faroese parliamentary corpus. It
excludes the CLARIN-IS dataset and software deposits that accompany them (*Samrómur 21.05*,
*Talrómur RAW (24.01)*, *Speech Corpora Toolkit (22.06)*, and roughly thirty more visible in a
Google Scholar export).

The line is peer review and a venue, not subject matter. A corpus paper went through LREC or
NoDaLiDa and describes a contribution; a deposit is a versioned artefact release that happens to
carry a citable record. Listing deposits would roughly triple the page with entries that are
mostly version bumps of one another, burying the papers among them.

This supersedes the assumption in [`proposals/cv-pipeline.md`](proposals/cv-pipeline.md) §6.3,
which proposed tagging corpora into a separate rendered section. That needs a `tags` field the
publications schema does not have, and it solves a problem — corpora crowding out papers — that
excluding deposits already solves. Worth revisiting only for the CV, which has more room than a
curated web page.

---

## 2026-08-22 — Publication entry conventions

`journal` holds a journal's full official title **as of publication** — not dblp's abbreviation,
and not a name the journal acquired later. dblp renders the entire IEEE transactions lineage as
`IEEE Trans. Speech Audio Process.`, including for papers published years after the rename, so
taken verbatim it would have given three entries a title their journal did not have at the time.
Conferences use the short canonical name with no year — `Interspeech`, `ICASSP`, `LREC`,
`NoDaLiDa` — because `PublicationCard` already renders `{journal}, {year}`.

`authors` writes the site owner as "Jón Guðnason" in full Icelandic form in every entry. This is
load-bearing rather than cosmetic: the card bolds the owner by substring-matching
`site.name.split(" ").at(-1)`, so the ASCII form "Jon Gudnason" — how dblp records several of
these papers — silently fails to bold. No error, no warning, just a name that does not stand out.

Entries whose venue never registered DOIs (LREC and NoDaLiDa proceedings before roughly 2024)
ship with no `doi` and therefore no link, rather than linking a publisher landing page —
`EDITORIAL.md` requires that a DOI link be a DOI. Linking those six to the ACL Anthology instead
would take a schema field and a card change, and was deliberately kept out of the seed.

---

## 2026-08-22 — dblp for metadata, Scholar for coverage

The seed was built from both a dblp export (70 entries) and a Google Scholar BibTeX export (125),
because neither alone is sufficient.

dblp has clean venue strings, correct author forms and real DOIs, but indexes computer science
only. It does not contain the 2023 *Science Advances* paper on voice pitch genetics — arguably the
highest-profile item on the list — nor the 2018 *Biological Psychology* paper. Scholar has the
coverage and no DOIs at all, plus roughly thirty dataset deposits and five duplicate programme
documents to filter out.

So: **dblp is the metadata source of record, Scholar is the completeness check.** Earlier guidance
to simply prefer dblp is right about field quality and wrong if read as a claim about coverage.
Refresh by taking new exports rather than editing old ones.

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
