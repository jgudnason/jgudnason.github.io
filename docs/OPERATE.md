# Operate Phase Specification: jongudnason.com

## 1. Routine Content Publishing & Maintenance

### A. Publishing New Content
All website updates follow a Git-based workflow managed locally in VS Code:

1. **Creating Dispatches & Announcements (`/activities`):**
   * Add a file in `src/content/activities/YYYY-MM-DD-title.mdx`.
   * Fill out the required frontmatter (`title`, `pubDate`, `description`, `category`, `tags`).
   * Write content in Markdown or MDX (embedding `<VideoPlayer/>` for external media as needed).

2. **Updating Publications (`/publications`):**
   * Add a file in `src/content/publications/YYYY-paper-slug.md`.
   * Provide publication details (`title`, `authors`, `journal`, `year`, `doi`, `pdfUrl`).

3. **Updating Course & Teaching Information (`/teaching`):**
   * Edit course descriptions, student project suggestions, or graduate student lists directly in `src/pages/teaching.astro` or dedicated content files.

4. **Updating CV & Static Documents:**
   * Replace `public/pdf/cv.pdf` with an updated PDF to keep the CV download link current without changing URL paths.

### B. Quality Assurance Workflow
Before pushing content to production, run a local build test in VS Code to ensure schema compliance:

```bash
# Preview locally
npm run dev

# Test static production build and schema validation
npm run build
```

If a deleted or renamed post still appears after a rebuild, Astro's content store
is stale. Clear it and rebuild:

```bash
rm -rf node_modules/.astro
npm run build
```

Cloudflare builds from a clean checkout and is never affected by this — but it
does mean a stale local build can disagree with what deploys.

---

## 2. Editorial Guidelines & Content Governance

### A. Tone, Voice, and Scope Rules
* **Voice:** Grounded, concise, objective, and authoritative. Avoid florid prose, promotional language, or subjective hype (e.g., replace "an incredibly exciting breakthrough" with "a significant performance improvement in...").
* **Perspective:** First-person singular ("I") or plural ("We", when referring to research lab/co-authors) is acceptable for dispatches and research updates.
* **Scope Limits:** 
  * Exclusively academic, scientific, and educational.
  * No personal or family updates.
  * No general political commentary unless strictly tied to academic expertise or scientific policy.

### B. Formatting & Style Standards
* **Headings:** Use logical hierarchy (`##` for main sections, `###` for sub-sections). Never skip heading levels.
* **Citations & DOIs:** Always provide direct DOI links for papers (`[https://doi.org/](https://doi.org/)...`) rather than linking to general journal homepages.
* **Code & Equations:** Use inline code formatting (`like this`) for parameters/variables and standard LaTeX for formal mathematical formulations.
* **Media & Video Embeds:** Always include descriptive alt text for images and captions for video embeds to maintain accessibility standards.

### C. Taxonomy & Tagging Rules
To prevent tag bloat and keep page filtering clean:
* Limit tags to **1–3 per post**.
* Use a standardized set of primary tags (e.g., `Speech Processing`, `Neural Networks`, `Teaching`, `Conference`, `Fieldwork`, `Grant`).
* Avoid creating single-use or overly specific tags.

### D. Pre-Publish Editorial Checklist
Before staging and committing a new post:
- [ ] **Frontmatter Complete:** All required fields in `src/content/config.ts` are populated.
- [ ] **Tone Check:** Text is clear, concise, and free of filler adjectives or off-topic opinions.
- [ ] **Neurodivergent Readability:** Sentences and paragraphs are kept reasonably short; key points use visual lists or bolding for easy scanning.
- [ ] **Link Verification:** All external links (DOIs, project pages, IRIS profile) open correctly and use HTTPS.
- [ ] **Build Validation:** Running `npm run build` locally passes without schema errors.

### E. Periodic Content Review Lifecycle
* **Teaching Page (`/teaching`):** Audit before the start of each academic semester to update current courses, move finished courses to past archives, and update prospective student project ideas.
* **Research Page (`/research`):** Review annually to ensure active grants, industry collaborations, and lab affiliations accurately reflect current funding and active work.

---

## 3. Infrastructure, Security & Backups

* **Version Control & Backups:**
  * GitHub serves as the single source of truth for all source code, layout files, and Markdown content.
  * Local Git clones provide full offline redundancy.

* **Deployment Rollbacks:**
  * Cloudflare Pages maintains a permanent history of every build.
  * If a bad build occurs, roll back instantly via the Cloudflare Pages Dashboard under **Deployments** > **Rollback to this deployment**.

* **SSL/TLS & Domain Health:**
  * Managed automatically via Cloudflare (Universal SSL with auto-renewal).
  * Ensure DNS Apex and CNAME records remain locked against accidental modification.

---

## 4. Software Dependencies & Security Maintenance

Static sites built with Astro require minimal ongoing patching, but node packages should be periodically updated:

* **Quarterly Dependency Updates:**
  Run updates locally to patch framework dependencies and Astro core: