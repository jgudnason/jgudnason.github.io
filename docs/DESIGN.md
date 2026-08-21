# Design Phase Specification: jongudnason.com

## 1. Information Architecture & Navigation

The site uses a flat navigation structure to keep content accessible within 1 to 2 clicks from any page.

```text
jongudnason.com/
├── / (Home)
│   ├── Hero & Bio Summary
│   ├── Featured Research Projects
│   └── Latest Activities
├── /research
│   ├── Research Themes & Labs
│   ├── Active Grants & Collaborations
│   └── Industry Collaboration
├── /teaching
│   ├── Courses
│   ├── Graduate Students
│   └── Student Projects (Suggestions)
├── /activities
│   ├── Dispatches (Field notes, conference reports, visits)
│   └── Announcements (Grants won, upcoming talks, publications)
├── /publications
│   ├── Grouped Publication List (DOIs)
│   └── Link to Downloadable CV (PDF)
└── /contact
    └── Institutional Email & Academic Profiles (ORCID, Google Scholar, GitHub, IRIS)
```

---

## 2. Visual Identity & Neurodivergent-Friendly Design

To maintain an authoritative, readable, and professional academic appearance, the layout prioritizes clarity, minimal UI clutter, and high contrast while accommodating neurodivergent needs (such as ADHD, dyslexia, and visual/sensory processing differences).

* **Neurodivergent & Accessibility Principles:**
  * **Low Visual Noise:** Autoplay animations, intrusive popups, and non-essential visual fluff are eliminated to minimize distraction and sensory overload.
  * **High Contrast & Light/Dark Modes:** High contrast colors reduce eye strain and visual fatigue. Dark mode is fully supported for light sensitivity.
  * **Dyslexia-Aware Typography:** Generous line height ($1.6$), clear paragraph spacing, and constrained reading width ($60\text{--}75$ characters per line) ensure smooth tracking.
  * **Predictable Navigation:** Consistent navigation headers and clear, structured headings reduce cognitive load and support executive function.
  * **Focus States:** Distinct visual indicators for active buttons and keyboard navigation.

* **Color Palette:**
  * **Background:** Clean neutral background (`#ffffff` light / `#0f172a` Slate-900 dark)
  * **Text Primaries:** High-contrast dark gray / Slate (`#1e293b` light / `#f8fafc` dark)
  * **Accent Color:** Academic Blue (`#1d4ed8` light / `#60a5fa` dark) for links, interactive elements, and metadata tags
  * **Borders/Dividers:** Subtle slate tint (`#e2e8f0` light / `#334155` dark)

* **Typography:**
  * **Headings:** Modern, clean sans-serif (e.g., `Inter`, system font stack) for visual structure.
  * **Body Text:** Highly legible sans-serif or hybrid serif (`Source Serif Pro` / `Merriweather`) for long-form research notes and dispatches.
  * **Technical Data:** Monospace (`JetBrains Mono` / `Fira Code`) for formulas, code snippets, and publication DOIs.

---

## 3. Component Architecture (Astro UI Modules)

```text
src/
├── components/
│   ├── Header.astro            # Global navigation header and branding
│   ├── Footer.astro            # Copyright, IRIS link, and social/academic icons
│   ├── PublicationCard.astro   # Standardized list item for papers with DOI links
│   ├── ProjectCard.astro       # Visual card for research themes & industry work
│   ├── ActivityCard.astro      # Preview card for dispatches and announcements
│   ├── ThemeToggle.astro       # Light/dark switch, choice persisted in localStorage
│   └── VideoPlayer.astro       # Responsive iframe wrapper for Cloudflare/YouTube video embeds
│                               # (.astro, not .mdx — MDX cannot take typed props;
│                               #  it is imported and used inside .mdx dispatches)
└── layouts/
    ├── BaseLayout.astro        # HTML head, SEO metadata, global CSS, layout wrapper
    └── PostLayout.astro        # Structured template for long-form dispatches & activities
```

---

## 4. Content Schema Definitions (Astro Collections)

Every Markdown and MDX content file uses Astro Content Collections to ensure strict type safety during site builds.

### A. Activities Schema (`src/content/activities/*.mdx`)
```yaml
title: "Title of Dispatch or Announcement"
pubDate: 2026-08-09
description: "Brief summary of the dispatch, visit, or announcement."
category: "Dispatch" # Allowed values: 'Dispatch' | 'Announcement'
tags: ["Conference", "Speech Tech", "Industry"]
featuredImage: "/images/activities/conference-2026.jpg" # Optional
```

### B. Publications Schema (`src/content/publications/*.md`)
```yaml
title: "Paper Title"
authors: ["Jón Guðnason", "Co-author Name"]
journal: "IEEE Transactions on Audio, Speech, and Language Processing"
year: 2026
doi: "10.1109/TASLP.2026.xxxxxx"
pdfUrl: "/pdf/paper-title-2026.pdf" # Optional direct PDF upload
```

---

## 5. External Profiles & Integrations (`/contact`)

The `/contact` view and global footer provide direct access to verified scholarly identifiers:
* **IRIS Profile:** [https://iris.landsbokasafn.is/](https://iris.landsbokasafn.is/)
* **Google Scholar Profile**
* **ORCID iD**
* **GitHub Repository & Code Showcase**
* **Institutional Email Address**