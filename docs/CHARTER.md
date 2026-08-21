# Charter

Why this site exists, who it is for, and what belongs on it. Near-static — update when the
site's purpose changes, not when the code does.

## Vision

`jongudnason.com` is a professional academic and research homepage. It presents ongoing
scientific contributions, departmental teaching responsibilities, and scholarly activities to
the global academic community.

## Objectives

- **Research showcase** — active research themes, lab affiliations, projects, industry
  collaborations, and publications.
- **Teaching hub** — departmental courses, graduate supervision, student project suggestions,
  and educational resources.
- **Scholarly engagement** — fieldwork, research facility visits, conference presentations,
  dispatches, and announcements.
- **Central academic node** — connecting the external scholarly profiles (Google Scholar,
  ORCID, IRIS, GitHub) that carry the complete record.

## Scope and content boundaries

These are the rules that keep the site on topic.

- **Professional focus.** Research, teaching, and academic engagements only.
- **Non-academic exclusions.** Personal, family, and non-professional updates are excluded.
- **Political neutrality.** General political discourse is omitted. Scientific policy tied
  directly to domain expertise is in scope; general commentary is not.
- **Tone.** Professional, objective, grounded, and clear. The house style is in
  [EDITORIAL.md](EDITORIAL.md).

## What belongs where

The intent of each section, which the navigation alone does not convey:

- **Home** — who I am, what I work on, and the most recent activity. A visitor should be able to
  place me in a field within seconds.
- **Research** — themes and the reasoning behind them, lab affiliations, active grants,
  industry collaboration, key collaborators. Reviewed annually.
- **Teaching** — current and past courses, graduate students, and project suggestions concrete
  enough for a prospective student to act on. Reviewed each semester.
- **Activities** — dated posts. *Dispatches* are field notes: research visits, conference
  reports, fieldwork. *Announcements* are events: grants won, upcoming talks, new publications.
  The distinction is observation versus news.
- **Publications** — selected papers with DOI links, plus the downloadable CV. The complete
  record lives on the external profiles; this page is curated, not exhaustive.
- **Contact** — institutional address, email, and verified scholarly identifiers.

## Media and storage policy

- **Text and code** are version-controlled in this repository. Activity posts, research
  write-ups, and page content are Markdown or MDX.
- **Large assets stay out.** HD video, large datasets, and heavy media are hosted externally
  (Cloudflare, YouTube) and embedded via the `VideoPlayer` component, keeping the repository
  light and the build fast. A committed PDF such as the CV is the exception, not the pattern.

## Design principles

These are the reasons the interface looks as it does. The values that implement them live in
`src/styles/global.css`; do not restate them here.

The layout prioritises clarity, minimal UI clutter, and high contrast, accommodating
neurodivergent needs including ADHD, dyslexia, and visual or sensory processing differences.

- **Low visual noise.** No autoplay animation, no popups, no decorative filler. Every element
  earns its place or is removed.
- **High contrast, and both colour schemes.** Dark mode is fully supported for light
  sensitivity, and neither scheme is an afterthought.
- **Dyslexia-aware typography.** Generous line height, clear paragraph spacing, and a reading
  width held to roughly 60–75 characters so the eye tracks between lines reliably.
- **Predictable navigation.** The same header everywhere, headings in a strict hierarchy, no
  surprises. This supports executive function as much as it supports findability.
- **Visible focus states.** Keyboard navigation is never invisible.
- **Motion is opt-in.** `prefers-reduced-motion` is respected throughout.
