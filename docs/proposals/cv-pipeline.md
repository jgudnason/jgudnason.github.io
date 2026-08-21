# CV pipeline — proposal

> **Status: deferred.** Not a live instruction. Promoted here from a `.notes/` review note so
> the analysis is tracked and backed up rather than living on one machine. The reasoning for
> deferring it is in [`../DECISIONS.md`](../DECISIONS.md) — in short, the payoff is at
> maintenance time and the publications list it would feed does not exist yet. Revisit once
> `src/content/publications/` is populated.

Date: 2026-08-21 · Author: Cowork review session · Agreed in principle, deferred on priority

---

## 1. Recommendation in one line

Move the CV LaTeX source into the repo under `cv/`, compile it with **XeLaTeX**, and let
**Zotero/Better BibTeX auto-export `cv/refs.bib`** so the CV and the site's publications list are
fed from one file. Keep the public URL at the existing stable path `/pdf/cv.pdf`.

## 2. Why this shape

The site already has the slot designed for it. `src/pages/publications.astro` does an `existsSync`
check on `public/pdf/cv.pdf` and only renders the download link when the file is there, and
`AGENTS.md` documents replacing that file in place. So the *output* contract is settled — the
only open question is how the PDF gets produced.

Jon currently maintains the CV in Overleaf and has decided to retire it. Overleaf is a good editor
but a poor system of record here: no diffs against the site's history, no way to script the
publications list, and the Git bridge is a paid feature. Since the CV is now a website asset, the
source belongs beside the thing that publishes it.

## 3. Proposed layout

```text
cv/
├── cv.tex            # main document
├── refs.bib          # auto-exported from Zotero (Better BibTeX) — do not hand-edit
├── preamble.tex      # or a .cls, if the styling is substantial
├── assets/           # photo, logos if used
└── build.sh          # latexmk -xelatex -outdir=… cv.tex  →  public/pdf/cv.pdf
public/pdf/cv.pdf     # committed build output; stable public URL, unchanged
```

`cv/.gitignore` should exclude the LaTeX litter: `*.aux *.bbl *.bcf *.blg *.fdb_latexmk *.fls
*.log *.out *.run.xml *.synctex.gz`.

## 4. Toolchain: XeLaTeX, not pdfLaTeX

Verified by test compile in the Cowork container rather than assumed:

| Engine | Icelandic characters (ð þ æ ö Á Í) | Verdict |
| :--- | :--- | :--- |
| pdfLaTeX (default OT1) | **fails** — `! LaTeX Error: Command \dh unavailable in encoding OT1` | avoid |
| pdfLaTeX + `[T1]{fontenc}` + `lmodern` | works | acceptable fallback |
| XeLaTeX + `fontspec` | works with any system OpenType font | **recommended** |

A full `moderncv` + `fontspec` + `biblatex`/`biber` document compiled cleanly under XeLaTeX and
produced correct output for "Jón Guðnason … Reykjavík". Given how much of an Icelandic academic CV
is names and institutions, XeLaTeX removes a whole category of encoding bugs permanently. Use
`biblatex` with the `biber` backend rather than legacy BibTeX — it handles Unicode author names
properly.

Whatever class the current Overleaf CV uses will very likely work as-is; this is about the engine,
not the design.

## 5. Who compiles it

**Now: compile on request, commit the PDF.** The `.tex` lives in the repo; the PDF is built and
committed alongside it. A Cowork session has a full TeX Live install — `pdflatex`, `xelatex`,
`lualatex`, `latexmk`, `biber`, plus `moderncv`, `fontspec`, `biblatex`, `fontawesome5`, all
verified working. So the loop is: edit `cv/cv.tex` → Cowork compiles and hands back the PDF for
review → commit. No local TeX install, no Overleaf.

**Later, optionally: CI.** Deployment is **Cloudflare Pages** (confirmed by Jon, 2026-08-21; CCC is
setting it up). Installing TeX Live inside a Cloudflare Pages build is not practical, so the PDF
must remain a committed artifact — it cannot be produced at deploy time. If a CI build is wanted
later, the shape is a separate GitHub Actions job on changes to `cv/**` that compiles the PDF and
commits it back, with Cloudflare then rebuilding as it would for any push. Note the ordering
constraint if that is ever put in the same pipeline as the site build: the CV compile **must run
before `astro build`**, or the `existsSync` check in `publications.astro` silently drops the CV
link.

**Not recommended:** installing MacTeX/BasicTeX locally, unless live preview while writing turns
out to matter. Reasonable (~100 MB for BasicTeX) but it is the thing Jon moved away from.

## 6. One publications list

Jon already runs Zotero with Better BibTeX, group libraries by research area, and `authorYear`
citation keys. That is the single source of truth — it just needs to point somewhere new. Today he
works from his Google Scholar page by hand and omits things like speech corpora.

Principle: **automate discovery, keep curation manual.** Deciding what belongs on the CV is
judgement worth keeping; noticing that a new paper exists and retyping its metadata is not.

```
Google Scholar (seed)  ─┐
dblp .bib (seed + diff)─┼──▶  Zotero collection "Website & CV"  ──BBT auto-export──▶  cv/refs.bib
new-article alerts     ─┘         (curation happens here)                              │
                                                              ┌────────────────────────┴──────────┐
                                                          cv.tex                Astro loader → /publications
```

### 6.1 Seeding, once

1. Google Scholar profile → "Show more" until all entries load → select-all → Export → BibTeX.
2. Also pull dblp: profile at `https://dblp.org/pid/14/970.html` (**verify this PID is the right
   person**), complete bibliography at `https://dblp.org/pid/14/970.bib` — a documented, stable
   dblp API endpoint. dblp's metadata for ICASSP/Interspeech is markedly cleaner than Scholar's:
   correct proceedings titles, consistent author name forms, real DOIs. Scholar's BibTeX varies
   venue strings between entries for the same conference and frequently omits DOIs — which matters,
   because `PublicationCard.astro` renders a DOI link.
3. Import both into Zotero, run Zotero's Duplicate Items view, prefer the dblp version on conflict.

### 6.2 Staying current

- Google Scholar profile → "Follow" → new articles by this author → email alert. When one arrives,
  one click of the Zotero Connector on the publisher page adds it with proper metadata.
- A diff script in `cv/`: re-fetch the dblp `.bib` and report entries not yet in `cv/refs.bib`.
  This is the genuinely automatable part — it reports what is missing without deciding anything.
  dblp typically picks up Interspeech/ICASSP within weeks of proceedings appearing.
- Better BibTeX auto-export: right-click the collection → Export Collection → Better BibTeX → tick
  **Keep updated**, target `cv/refs.bib`. Set the schedule to **on idle**, not on change, so the
  file is not churned mid-edit.

### 6.3 Corpora — tag, don't drop

Speech corpora are among the more citable outputs of a speech lab and read as output on an academic
CV, not clutter. Rather than omitting them, tag them in Zotero (e.g. `corpus`) and let both
consumers split on the tag:

- CV: `\printbibliography[keyword=corpus, title={Corpora and resources}]` as its own section.
- Site: the Astro loader filters the same way for a separate block on `/publications`.

One file, two sections, no second list. If they should stay off the website, that becomes a
one-line filter rather than a permanent omission from the source.

### 6.4 Astro side

Astro 7's content layer supports custom loaders, so `src/content.config.ts` can define a loader that
parses `cv/refs.bib` and emits entries matching the existing publications schema (`title`,
`authors`, `journal`, `year`, `doi`, `pdfUrl`). No generated `.md` files to keep in sync, and the
schema still validates at build time, so a malformed entry fails the build rather than shipping.

Non-bibliographic extras (links to code, data, demos, a plain-language blurb) do not fit in BibTeX
fields. Cleanest option: a small companion `src/data/publication-extras.yaml` keyed by citation key
that the loader merges in.

### 6.5 Two things to get right early

- **Pin citation keys** in Better BibTeX (right-click → pin). The Astro loader will use them as
  entry IDs and page slugs; a key that silently changes breaks a URL.
- **Backfill DOIs** that Scholar dropped — e.g. the DOI Manager plugin for Zotero — before the first
  export.

### 6.6 Migration order

Get the CV compiling from `cv/refs.bib` first and confirm it matches the Overleaf output. Only then
rewire the site's publications collection. Right now the site has one template publication, so
there is almost nothing to lose in the switch.

## 7. Unrelated small finding

`src/pages/publications.astro` links to `https://iris.landsbokasafn.is/` in the no-CV fallback.
That is the IRIS portal front door; Jon's actual person page is
`https://iris.rais.is/en/persons/j%C3%B3n-gu%C3%B0nason`. Worth pointing at the profile instead.

## 8. What's needed to start

The current CV from Overleaf — ideally the **source** (Download → Source gives a zip with the .tex,
.bib, any .cls and images), or just the PDF if the source is inconvenient. Then:

1. Compile it as-is to confirm the toolchain reproduces the Overleaf output.
2. Switch the engine to XeLaTeX and fix any encoding fallout.
3. Repoint the bibliography at a BBT-exported `cv/refs.bib`.
4. Commit the `cv/` tree and `public/pdf/cv.pdf`, with a matching update to `AGENTS.md` so the
   documented routine reflects source-in-repo rather than "replace the PDF".
