# Implement Phase Specification: jongudnason.com

## 1. Environment & Local VS Code Setup

### Local Prerequisites
* **Node.js:** v22.12 or newer — required by Astro 7 (see `engines` in `package.json`). The exact version used locally and by Cloudflare is pinned in `.node-version` (currently 24.13.0). After changing anything in `package.json`, re-run `npm install` so `package-lock.json` stays in sync, or the Cloudflare build will fail at `npm ci`.
* **Git:** Initialized in the project root directory and linked to your remote GitHub repository.
* **Editor:** VS Code with the **Astro** extension and **Continue** AI extension installed.

### Framework & Integration Initialization
Run these commands inside your VS Code integrated terminal:

```bash
# Initialize Astro in the current directory if not already created
npm create astro@latest . -- --template minimal

# Add MDX integration for extensible Markdown components
npx astro add mdx

# Add Tailwind CSS v4 (installs @tailwindcss/vite and src/styles/global.css)
npx astro add tailwind

# Create documentation directory for CDIO specs
mkdir -p docs
```

### AI Integration with Continue Extension
To leverage Gemini via the **Continue** extension in VS Code:
* Ensure `docs/CONCEIVE.md`, `docs/DESIGN.md`, and `docs/IMPLEMENT.md` are saved in the project root.
* Use `@docs` or configure `.continuerc.json` to reference the `docs/` directory so Gemini operates with complete awareness of your design rules, content schemas, and constraints.

---

## 2. GitHub & Cloudflare Pages Deployment Pipeline

Because Cloudflare handles domain routing and hosting for `jongudnason.com`, deployment runs natively through Cloudflare Pages' GitHub integration.

### A. Cloudflare Pages Setup (One-Time)
1. Log into the **Cloudflare Dashboard** and navigate to **Workers & Pages**.
2. Select **Create application** > **Pages** > **Connect to Git**.
3. Select your GitHub repository (`jgudnason/jgudnason.github.io`). The `.github.io` name is a leftover from the GitHub Pages era and is cosmetic under Cloudflare; renaming it is optional.
4. Set the Build Settings:
   * **Framework preset:** `Astro`
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
   * **Node.js Version:** Add an environment variable `NODE_VERSION` = `24.13.0`. Node 20 will fail the build — Astro 7 requires 22.12+. Keep this matched to `.node-version` in the repository: the build image's npm must be the same major version as the npm that generated `package-lock.json`, or `npm ci` rejects the lockfile as out of sync.
5. **Verify before cutover.** Let the first build finish and open the temporary
   `*.pages.dev` URL Cloudflare assigns. Check every route, both colour schemes, and
   the CV link. The live site is untouched at this point — nothing has moved yet.
6. **Move DNS.** Add `jongudnason.com` as a zone in Cloudflare and repoint the
   nameservers at the registrar. An apex domain requires Cloudflare-managed DNS.
   Propagation can take up to 24 hours.
7. Under **Custom Domains**, attach `jongudnason.com` and `www.jongudnason.com`.
   Cloudflare handles SSL/TLS certificates and DNS record binding automatically.
8. **Decommission GitHub Pages.** In the repository's Settings → Pages, remove the
   custom domain and set the source to `None`, so the two hosts cannot compete for
   the domain. Afterwards `public/CNAME` is inert and can be deleted.

### B. Automated Deployment Workflow
No manual `.github/workflows` files are required. The deployment lifecycle operates automatically:

```text
[ Edit locally in VS Code ] 
            │
            ▼
[ git commit & push to GitHub `main` ]
            │
            ▼
[ Cloudflare Pages detects push ]
            │
            ▼
[ Astro builds site (`npm run build`) ]
            │
            ▼
[ Published live to https://jongudnason.com ]
```

---

## 3. Configuration & Content Schemas

### Astro Configuration (`astro.config.mjs`)
```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jongudnason.com',
  integrations: [mdx()],
  vite: { plugins: [tailwindcss()] },
});
```

### Content Schema Setup (`src/content.config.ts`)
Creates compile-time validation for all activities and publications. Astro 7 uses
the Content Layer API: the config lives at `src/content.config.ts` (not
`src/content/config.ts`) and each collection declares a loader instead of a `type`.

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const activitiesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/activities' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    category: z.enum(['Dispatch', 'Announcement']),
    tags: z.array(z.string()).default([]),
    featuredImage: z.string().optional(),
  }),
});

const publicationsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    journal: z.string(),
    year: z.number(),
    doi: z.string().optional(),
    pdfUrl: z.string().optional(),
  }),
});

export const collections = {
  'activities': activitiesCollection,
  'publications': publicationsCollection,
};
```

---

## 4. Operational Publishing Routine

To publish a new dispatch, announcement, or paper post-launch:

1. Open the project in VS Code.
2. Add a new `.md` or `.mdx` file in `src/content/activities/` or `src/content/publications/`.
3. Fill out the YAML frontmatter matching `src/content/config.ts`.
4. Run `npm run dev` to preview changes locally at `http://localhost:4321`.
5. Stage, commit, and push to GitHub:
   ```bash
   git add .
   git commit -m "content: add dispatch on conference visit"
   git push origin main
   ```
6. Cloudflare Pages automatically builds and updates `jongudnason.com` within 30–60 seconds.