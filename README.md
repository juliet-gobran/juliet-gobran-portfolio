# juliet-gobran.com.au

Portfolio site for Juliet Gobran — built with Next.js and deployed on Vercel. This repo is the production codebase.

## Links

| Resource | URL |
|----------|-----|
| Live site | https://www.juliet-gobran.com.au |
| Figma (Portfolio) | https://www.figma.com/design/2qIoGOLmiSESnYiqVLyHco/Portfolio |
| LinkedIn | https://www.linkedin.com/in/juliet-gobran/ |
| Medium | https://medium.com/@juliet.gobran |
| Previous portfolio | https://juliet-gobran.vercel.app |

## Workflow

```text
Figma (design)  →  docs/ (specs & copy)  →  Next.js (build & deploy)
```

1. **Design** in Figma — layout, typography, visual direction.
2. **Document** in `docs/portfolio/` — tokens, site map, content schema.
3. **Build** in this repo — components, pages, project content.
4. **Deploy** to Vercel — do not deploy to production without explicit approval.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
npm run build      # production build (validates project JSON via Zod)
npm run typecheck  # TypeScript check
npm run lint       # ESLint
```

## Docs index

- [site-map.md](docs/portfolio/site-map.md) — pages and routes
- [nextjs.md](docs/portfolio/nextjs.md) — project structure and deployment
- [content-schema.md](docs/portfolio/content-schema.md) — project JSON format
- [figma.md](docs/portfolio/figma.md) — Figma file and frame mapping
- [design-tokens.md](docs/portfolio/design-tokens.md) — colors, fonts, spacing
- [styles.md](docs/portfolio/styles.md) — typography and color class mapping
- [framer.md](docs/portfolio/framer.md) — archived Framer reference (deprecated)

## Active build

- **Target:** Home (`/`) with app shell layout (Phase 2)
- **Design reference:** Figma frame `359:1096`
- **Content:** JSON files in `content/projects/`
