# Backlog

Ordered. Anything under Deferred is a deliberate choice, not an oversight.

## Now — the site is live and these gaps are visible

- [ ] Replace the grants placeholder in `src/pages/research.astro`
- [ ] Find a working destination for the Language and Voice Lab link in
      `src/data/research.ts` — `lvl.ru.is` stopped resolving (the WordPress.com site
      behind it is private), so the entry currently ships a broken link
- [ ] Verify three author names flagged during the publications seed —
      `2021-talromur-tts-corpus.md` (two) and
      `2022-cognitive-workload-cardiovascular-voice.md` (one)

## Next

- [ ] List current graduate students in `src/pages/teaching.astro`
- [ ] Two or three more activity posts
- [ ] Render the entry body in `PublicationCard`, or drop the body line from
      `docs/templates/publication.md` — the card reads frontmatter only, so the body the
      template invites is currently invisible
- [ ] Decide how publications without DOIs link out, if at all — six entries are affected and
      all are in the ACL Anthology
- [ ] Truncate long author lists at render time — one entry has 33 authors, which reads against
      the low-visual-noise principle in `CHARTER.md`

## Deferred

- [ ] CV LaTeX source in `cv/`, XeLaTeX toolchain — see
      [`proposals/cv-pipeline.md`](proposals/cv-pipeline.md)
- [ ] Zotero → `cv/refs.bib` → CV and site publications from one source
