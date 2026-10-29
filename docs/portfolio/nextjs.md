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
    layout.tsx            # Root layout, fonts, AccentProvider, before-paint accent script
    page.tsx              # Home (/) — intro, Work, Gallery, About, Contact sections
    projects/[slug]/      # Case study detail (/projects/:slug)
    globals.css           # Tailwind + token theme, [data-accent] overrides
  components/
    app-shell.tsx         # Nav + scrollable <main>
    nav-bar.tsx           # Responsive nav (anchor links), mobile dropdown
    accent-provider.tsx   # Active accent context + localStorage persistence
    accent-easter-egg.tsx # Star/thumbs-up/heart accent switcher by the intro
    reveal-on-scroll.tsx  # Fade/rise-in on scroll (IntersectionObserver)
    section-heading.tsx   # Shared h2 for home sections
    hover-tag.tsx         # "Click me"-style hover tooltip
    wollongong-clock.tsx  # Live Wollongong clock
    icons/                # Accent icons (star, thumbs-up, heart)
    case-study-preview/   # Home case study cards
    case-study-detail/    # Case study page (sidebar + blocks)
    gallery/              # Gallery grid
    about/                # About section + toolkit icons
    contact/              # Contact card
  lib/
    content.ts            # Shared JSON-dir loader + order sort
    projects.ts / projects.schema.ts
    gallery.ts / gallery.schema.ts
    accents.ts            # Accent list, storage key, before-paint script
    format-display-url.ts
  styles/
    tokens.css            # Design token CSS variables

content/
  projects/               # One JSON file per project
  gallery/                # One JSON file per gallery image

public/
  images/projects/        # Case study images by slug
  images/gallery/         # Gallery images
  images/about/           # Portrait + toolkit SVG sources
  images/accents/         # Accent icon SVG sources
  files/                  # Downloadable CV

docs/portfolio/           # Design specs and workflow docs
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

## Current state

The light redesign is fully built: home (intro + accent Easter egg, Work, Gallery, About, Contact) and the `blocks`-driven case study page. See [site-map.md](site-map.md) for structure and [design-tokens.md](design-tokens.md) for component/token details.

The CV at `public/files/juliet-gobran-cv.pdf` is served with `Content-Disposition: attachment` (configured in [`next.config.ts`](../../next.config.ts)) so it always downloads rather than opening in a tab.
