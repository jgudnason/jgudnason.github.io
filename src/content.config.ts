import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Content Layer collections. Frontmatter is validated at build time, so
 * `npm run build` fails loudly on a malformed dispatch or publication entry.
 */

const activities = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/activities" }),
  /*
    The `image()` helper resolves the path relative to the entry file and hands
    Astro real image metadata, so the build knows the intrinsic dimensions and
    can emit webp and a srcset. A plain string would ship the file untouched.
  */
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        pubDate: z.coerce.date(),
        description: z.string(),
        category: z.enum(["Dispatch", "Announcement"]),
        tags: z.array(z.string()).max(3).default([]),
        featuredImage: image().optional(),
        featuredImageAlt: z.string().optional(),
        featuredImageCaption: z.string().optional(),
      })
      /*
        EDITORIAL.md requires descriptive alt text on every image. Enforcing it
        here means a missing description fails the build, rather than relying on
        whoever writes the post to remember.
      */
      .refine((data) => !data.featuredImage || Boolean(data.featuredImageAlt), {
        message:
          "featuredImageAlt is required whenever featuredImage is set. Describe what is in the frame.",
        path: ["featuredImageAlt"],
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
