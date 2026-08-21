# Conceive Phase Specification: jongudnason.com

## 1. Vision & Mission
jongudnason.com is a professional academic and research homepage built to showcase ongoing scientific contributions, departmental teaching responsibilities, and scholarly activities to the global academic community.

## 2. Core Objectives
* **Research Showcase:** Communicate active research themes, lab affiliations, projects, industry collaborations, and scientific publications.
* **Teaching Hub:** Provide structured information on departmental courses, graduate student supervision, student project ideas, and educational resources.
* **Scholarly Engagement:** Document professional fieldwork, research facility visits, conference presentations, dispatches, and announcements.
* **Central Academic Node:** Connect external scholarly profiles (e.g., Google Scholar, ORCID, institutional directories, IRIS, GitHub).

## 3. Scope & Content Boundaries
* **Professional Focus:** Dedicated exclusively to research, teaching, and academic engagements.
* **Non-Academic Exclusions:** Personal, family, and non-professional life updates are strictly excluded.
* **Political Neutrality:** General political discourse is omitted, remaining focused strictly on academic and technical domain expertise.
* **Tone:** Professional, objective, grounded, and clear.

## 4. Key Content Modules
1. **Hero / Bio:** Academic title, current institutional affiliation, research focus summary, and direct contact details.
2. **Research:** Detailed research areas, active grants, projects, lab affiliations, industry collaborations, and key collaborators.
3. **Teaching:** Directory of current and past departmental courses, graduate students, student project suggestions, and resources.
4. **Activities (Dispatches & Announcements):** Chronological posts covering research facility visits, conference reports, keynotes, grant announcements, and field updates.
5. **Publications & CV:** Curated and complete publication listings with DOI links and a downloadable academic CV.

## 5. Primary Audience
* Academic peers, co-authors, and research collaborators.
* Current and prospective undergraduate and graduate students.
* Granting bodies, institutional reviewers, and university leadership.
* Industry partners and conference organizers seeking domain expertise.

## 6. Technical Architecture & Stack
* **Build Framework:** Astro (Static Site Generator utilizing MDX for extensible UI components).
* **Source Control & Content:** Plain Markdown (`.md`) and MDX (`.mdx`) stored directly in the GitHub repository.
* **Styling:** Tailwind CSS v4, with design tokens defined in `src/styles/global.css`.
* **Deployment Pipeline:** Cloudflare Pages builds and deploys automatically on `git push` to `main`. No `.github/workflows` files are used.
* **Hosting & Domain:** Cloudflare Pages serving custom domain `jongudnason.com` (and `www`) with automatic SSL/TLS.

> **Decision (2026-08-20): Cloudflare Pages, not GitHub Pages.**
> The site is now built from source rather than served as hand-written HTML, so a
> build step is required regardless of host. Cloudflare was chosen for one-click
> rollbacks (`OPERATE.md` §3), per-branch preview URLs that allow a build to be
> verified before any DNS change, and for keeping course video hosting (§7) in the
> same account as the site. This supersedes the original GitHub Pages plan and
> brings §6 into line with `IMPLEMENT.md` §2 and `OPERATE.md` §3, which already
> assumed Cloudflare.

## 7. Media & Storage Strategy
* **Text & Code:** All activity posts, research write-ups, and page content version-controlled inside GitHub.
* **Large Assets / Video:** HD videos, large datasets, and heavy media files hosted externally (e.g., Cloudflare, YouTube, AWS) and embedded into site pages via MDX player components to keep the repository lightweight.