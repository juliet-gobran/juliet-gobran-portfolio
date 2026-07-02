# Next.js

## Stack

| Tool | Version / choice |
|------|------------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Fonts | Jura + Albert Sans via `next/font/google` |
| Content validation | Zod |
| Hosting | Vercel |

## Folder structure

```text
src/
  app/
    layout.tsx          # Root layout, fonts, global styles
    page.tsx            # Home (/)
    about/page.tsx      # About (/about)
    projects/[slug]/    # Project detail (/projects/:slug)
    globals.css         # Tailwind + token theme
  components/
    app-shell.tsx       # Nav + scrollable center + footer layout
    galaxy-background.tsx # Animated galaxy crossfade (client component)
    motion-preference-provider.tsx # Motion on/off context + galaxy wrapper
    nav-bar.tsx         # Responsive nav, dropdown, motion toggle
    wollongong-clock.tsx # Live Wollongong clock (client component)
  lib/
    nav-links.ts        # Nav link constants
    projects.ts         # Read and filter project JSON
    projects.schema.ts  # Zod schema
  styles/
    tokens.css          # Design token CSS variables
  types/
    project.ts          # Project TypeScript types

content/
  projects/             # One JSON file per project

public/
  galaxy/               # Galaxy background frames (1–6)
  images/projects/      # Project images by slug

docs/portfolio/         # Design specs and workflow docs
```

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at http://localhost:3000
npm run build        # Production build (validates content)
npm run start        # Run production build locally
npm run lint         # ESLint
npm run typecheck    # TypeScript without emit
```

## Content workflow

1. Edit or add JSON in `content/projects/`.
2. Add images to `public/images/projects/{slug}/`.
3. Run `npm run dev` and visit `/projects/{slug}` to verify data loads.
4. Set `"status": "published"` when the project should appear on home.

See [content-schema.md](content-schema.md) for the full field reference.

## Design tokens

Tokens are defined in [`src/styles/tokens.css`](../../src/styles/tokens.css) and exposed to Tailwind via `@theme inline` in [`src/app/globals.css`](../../src/app/globals.css).

Source of truth for values: [design-tokens.md](design-tokens.md).

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. No environment variables required yet.
5. Deploy — preview URLs are created per branch.
6. Point `juliet-gobran.com.au` DNS to Vercel when ready to cut over from Framer.

Do not deploy to production without explicit approval.

## Phase 2

**Done:**

- App shell layout (nav, scrollable center, footer) — [`src/components/app-shell.tsx`](../../src/components/app-shell.tsx)
  - Nav and footer: separate `border-border-shell` blocks with `rounded-t-shell-top` / `rounded-b-shell-bottom`
  - Center: borderless, `overflow-y-auto`, `max-w-content` inner wrapper
  - Responsive typography at `md` breakpoint (see [styles.md](styles.md))
- Galaxy background animation — [`src/components/galaxy-background.tsx`](../../src/components/galaxy-background.tsx)
  - Crossfade loop through `public/galaxy/1-Galaxy.png` … `6-Galaxy.png` (continuous 5s fades, no hold)
  - Paused when **Motion** toggle is off (default on), OS `prefers-reduced-motion`, or tab visibility is hidden; freezes mid-blend and resumes from same point
- Responsive nav — [`src/components/nav-bar.tsx`](../../src/components/nav-bar.tsx)
  - Mobile: bordered dropdown + hamburger/cross animation
  - Desktop: inline links + Motion toggle
  - Link hover: `text-accent-orange` with `ease-in-out` transition
- Wollongong clock client component — [`src/components/wollongong-clock.tsx`](../../src/components/wollongong-clock.tsx)
  - `useSyncExternalStore` + `Intl.DateTimeFormat` (`Australia/Sydney`)
  - Hydration-safe (empty server snapshot)

**Not yet built:**

- Project Card component on home
- Project detail page design + Markdown rendering
