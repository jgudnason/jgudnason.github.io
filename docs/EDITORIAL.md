# Editorial guide

Voice, formatting, tagging, and the checks to run before publishing. Update when the house
style changes. Scope rules — what the site is and is not about — are in
[CHARTER.md](CHARTER.md).

## Tone, voice, and scope

- **Voice.** Grounded, concise, objective, authoritative. Avoid florid prose, promotional
  language, and subjective hype: "a significant performance improvement in…" rather than "an
  incredibly exciting breakthrough".
- **Perspective.** First-person singular ("I") is fine, as is "we" when referring to the lab or
  co-authors.
- **Scope limits.** Academic, scientific, and educational only. No personal or family updates.
  No general political commentary unless tied directly to academic expertise or science policy.

## Formatting and style

- **Headings.** Logical hierarchy — `##` for main sections, `###` for sub-sections. Never skip
  a level. The page title comes from frontmatter, so a post body starts at `##`.
- **Citations and DOIs.** Always link the DOI directly (`https://doi.org/10.…`) rather than a
  journal homepage. `PublicationCard` renders a DOI link when the field is present, so a
  missing DOI is a visible gap.
- **Code and equations.** Inline code formatting for parameters and variables (`f0`), standard
  LaTeX for formal mathematics.
- **Media.** Descriptive alt text on every image; a caption on every video embed. `VideoPlayer`
  requires a `title` for exactly this reason.

## Taxonomy and tagging

To prevent tag bloat and keep filtering meaningful:

- **One to three tags per post.** The schema enforces the upper bound — a fourth tag fails the
  build rather than shipping.
- **Draw from the standard set:** `Speech Processing`, `Neural Networks`, `Teaching`,
  `Conference`, `Fieldwork`, `Grant`.
- **Avoid single-use tags.** A tag applying to exactly one post is a title, not a category.

## Pre-publish checklist

- [ ] **Frontmatter complete.** The schema fails the build if a required field is missing, so
      run `npm run build` and let it tell you.
- [ ] **Tone check.** Clear and concise, free of filler adjectives and off-topic opinion.
- [ ] **Readability.** Short sentences and paragraphs; key points in lists or bold so the page
      can be scanned rather than read.
- [ ] **Links verified.** DOIs, project pages, and profile links all resolve, over HTTPS.
- [ ] **Build passes.** `npm run build` completes without schema errors.

## Starting from a template

Copies of both entry types live in [`templates/`](templates/):

- [`templates/dispatch.mdx`](templates/dispatch.mdx) — a dispatch or announcement, including
  how to embed video.
- [`templates/publication.md`](templates/publication.md) — a publication entry.

Copy one into the matching directory under `src/content/`, replace the frontmatter and body,
and build. The mechanics — filenames, directories, the publishing loop — are in `AGENTS.md`.

## Periodic review

- **Teaching** (`src/pages/teaching.astro`) — audit before each semester: update current
  courses, retire finished ones, refresh project suggestions.
- **Research** (`src/pages/research.astro`, `src/data/research.ts`) — review annually so
  grants, industry collaborations, and lab affiliations reflect current work.
- **Activities** — a site whose most recent post is a year old reads as abandoned. Two or three
  posts a year is enough to read as active.
