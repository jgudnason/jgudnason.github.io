import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Content Layer collections. Frontmatter is validated at build time, so
 * `npm run build` fails loudly on a malformed dispatch or publication entry.
 */

const activities = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/activities" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    category: z.enum(["Dispatch", "Announcement"]),
    tags: z.array(z.string()).max(3).default([]),
    featuredImage: z.string().optional(),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    journal: z.string(),
    year: z.number(),
    doi: z.string().optional(),
    pdfUrl: z.string().optional(),
  }),
});

export const collections = { activities, publications };
