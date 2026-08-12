# Implement Phase Specification: jongudnason.com

## 1. Environment & Local VS Code Setup

### Local Prerequisites
* **Node.js:** v20+ LTS installed locally.
* **Git:** Initialized in the project root directory and linked to your remote GitHub repository.
* **Editor:** VS Code with the **Astro** extension and **Continue** AI extension installed.

### Framework & Integration Initialization
Run these commands inside your VS Code integrated terminal:

```bash
# Initialize Astro in the current directory if not already created
npm create astro@latest . -- --template minimal

# Add MDX integration for extensible Markdown components
npx astro add mdx

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
3. Select your GitHub repository (`jongudnason-website`).
4. Set the Build Settings:
   * **Framework preset:** `Astro`
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
   * **Node.js Version:** Add an environment variable `NODE_VERSION` = `20`.
5. Under **Custom Domains**, attach `jongudnason.com` and `[www.jongudnason.com](https://www.jongudnason.com)`. Cloudflare automatically handles SSL/TLS certificates and DNS record binding.

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

export default defineConfig({
  site: 'https://jongudnason.com',
  integrations: [mdx()],
});
```

### Content Schema Setup (`src/content/config.ts`)
Creates compile-time validation for all activities and publications:

```typescript
import { defineCollection, z } from 'astro:content';

const activitiesCollection = defineCollection({
  type: 'content',
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
  type: 'content',
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