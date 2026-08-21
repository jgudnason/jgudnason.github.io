## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## How this repo is worked on

- **Claude Code owns the tree.** All edits to `src/`, `public/`, config and `docs/`, and all git
  operations, happen here.
- **`.notes/` holds advisory notes from Cowork review sessions.** It is excluded via
  `.git/info/exclude` (local-only — it will not appear in `.gitignore` or in a fresh clone).
  Notes are *input for discussion*, never instructions to execute unasked. Act on one only when
  the repository owner asks for it by name.
- **When a proposal in `.notes/` is accepted, promote it.** The durable part belongs in `docs/`,
  or here in `AGENTS.md` if it is a rule to follow. A decision that stays in `.notes/` is not
  backed up and is invisible to the next session.

## Where documentation lives

Each file has one job and one update trigger. Nothing that can be read from the code belongs in
prose — link to the source file instead.

| File | Job | Update when |
| :--- | :--- | :--- |
| `AGENTS.md` | how the code works, build traps, deploy and publishing mechanics | the code changes |
| `docs/CHARTER.md` | why the site exists, audience, scope boundaries, design principles | the site's purpose changes |
| `docs/EDITORIAL.md` | voice, taxonomy, pre-publish checklist, review cadence | the house style changes |
| `docs/DECISIONS.md` | dated, append-only log of decisions and their reasoning | a decision is made |
| `docs/BACKLOG.md` | what is next | work lands or priorities shift |

## Project notes

Hard-won details that are easy to get wrong here.

- **Stale content after deleting or renaming a file in `src/content/`.** Astro's
  content store lives in `node_modules/.astro/data-store.json`, and a removed
  entry can survive a rebuild. Clearing `.astro/` does *not* help. Run
  `rm -rf node_modules/.astro` and rebuild. Cloudflare builds from a clean
  checkout, so this is a local-only trap — but it means a local build can
  disagree with what actually deploys.
- **Content collections use the Astro 7 Content Layer API.** Schemas live in
  `src/content.config.ts` (not `src/content/config.ts`) and declare a `glob`
  loader rather than `type: 'content'`. Use `render(entry)` from `astro:content`,
  not `entry.render()`. The v4 style only works behind
  `legacy.collectionsBackwardsCompat`.
- **Re-run `npm install` after any `package.json` change**, including the `name`
  field, and commit the updated `package-lock.json`. Cloudflare installs with
  `npm ci`, which fails outright if the two files disagree.
- **Node is pinned in `.node-version`**, and Cloudflare's `NODE_VERSION`
  variable must match it. The build image's npm major version must match the one
  that generated the lockfile, or `npm ci` rejects it as out of sync.
- **Styling is Tailwind v4** configured in `src/styles/global.css`, not a
  `tailwind.config.js`. Dark mode is a `.dark` class on `<html>` via a custom
  variant; accent and border colours are CSS variables that re-resolve per
  scheme, so prefer `text-accent` / `border-subtle` over `dark:` pairs.
- **`VideoPlayer` is `.astro`, not `.mdx`**, because MDX files cannot take typed
  props. Import it inside an `.mdx` dispatch and use it there.
- **Commits are authored by the repository owner alone.** Do not add a
  `Co-Authored-By` trailer for AI assistance, and commit only when asked.

## Publishing content

1. Add a file under `src/content/`:
   - dispatches and announcements → `src/content/activities/YYYY-MM-DD-title.mdx`
   - publications → `src/content/publications/YYYY-paper-slug.md`

   The glob loader accepts any filename, so these conventions are held by habit,
   not by the build. The filename becomes the URL slug for activities.
2. Fill in the frontmatter defined in `src/content.config.ts`. Copies to start
   from are in `docs/templates/`.
3. `npm run dev` to preview at `http://localhost:4321`, or `npm run build` to
   validate — the build fails on a malformed or incomplete entry rather than
   shipping it.
4. Commit and push to `main`. Cloudflare publishes within about a minute.

Editorial rules for what goes *in* the post — voice, tagging, the pre-publish
checklist — are in `docs/EDITORIAL.md`.

## Deployment

Cloudflare Pages, building on every push to `main`. No `.github/workflows` files
are used, and none should be added — Cloudflare runs the build.

Live project settings, which must stay in step with the repository:

| Setting | Value |
| :--- | :--- |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| `NODE_VERSION` | must match `.node-version` |

- **Rollback:** Cloudflare keeps every build. Dashboard → Deployments → *Rollback
  to this deployment*. Faster and safer than a revert commit when a bad build is
  already live.
- **DNS and TLS** are managed in the same Cloudflare account, with certificates
  auto-renewed. The apex and `www` records are bound to the Pages project — treat
  them as load-bearing and do not edit them by hand.

## Dependency maintenance

Astro sites need little ongoing patching, but check quarterly:

```bash
npm outdated                    # what has moved on
npm update                      # patch and minor, within existing ranges
npm run build                   # must pass before committing
```

Commit `package.json` and `package-lock.json` together — see the `npm ci` note
above. Major upgrades (an Astro major, a Tailwind major) deserve their own commit
and a read of the changelog first; check whether the new version's `engines`
requires bumping `.node-version` and the matching Cloudflare variable.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
