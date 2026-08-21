# jongudnason.com

Academic homepage of Jón Guðnason, Professor of Engineering at Reykjavik University. Static site
built with [Astro](https://astro.build) and Tailwind CSS, content authored as Markdown/MDX in this
repository.

Documentation lives in [docs/](docs/): [CHARTER.md](docs/CHARTER.md) (why the site exists, scope,
design principles), [EDITORIAL.md](docs/EDITORIAL.md) (voice, tagging, pre-publish checklist),
[DECISIONS.md](docs/DECISIONS.md) (dated decision log), and [BACKLOG.md](docs/BACKLOG.md) (what is
next). Build mechanics, publishing steps and deployment settings are in
[AGENTS.md](AGENTS.md).

## Commands

| Command           | Action                                          |
| :---------------- | :---------------------------------------------- |
| `npm install`     | Install dependencies                            |
| `npm run dev`     | Dev server at `http://localhost:4321`           |
| `npm run build`   | Build to `dist/` and validate content schemas   |
| `npm run preview` | Preview the production build locally            |

## Structure

```text
src/
├── components/     # Header, Footer, cards, VideoPlayer, ThemeToggle
├── content/
│   ├── activities/    # Dispatches and announcements (.mdx)
│   └── publications/  # One file per paper (.md)
├── content.config.ts  # Collection schemas — build fails on invalid frontmatter
├── data/           # Profile links, research themes (edited by hand)
├── layouts/        # BaseLayout, PostLayout
├── pages/          # One file per route
└── styles/         # global.css: Tailwind, design tokens, base typography
public/pdf/cv.pdf   # CV download (linked from /publications when present)
```

## Publishing

1. Add a file to `src/content/activities/YYYY-MM-DD-title.mdx` or
   `src/content/publications/YYYY-paper-slug.md`.
2. Fill in the frontmatter defined in `src/content.config.ts`.
3. Run `npm run build` to validate, then commit and push to `main`.

Editorial rules — tone, tagging (1–3 tags per post), DOI citation, accessibility checks — are in
[docs/EDITORIAL.md](docs/EDITORIAL.md).

## Deployment

Cloudflare Pages builds `main` on push: build command `npm run build`, output directory `dist`,
`NODE_VERSION` ≥ 20. Custom domains `jongudnason.com` and `www.jongudnason.com`.
