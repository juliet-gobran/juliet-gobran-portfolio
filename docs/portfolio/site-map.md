# Site map

## Pages

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Home | `/` | **Active** | Single page: intro, Work, Gallery, About, Contact sections |
| Project detail | `/projects/[slug]` | **Active** — dynamic `blocks` template | One page per project JSON, see [content-schema.md](content-schema.md) |

> **Note:** The site is migrating from Framer to Next.js. Framer page IDs and `/home-v2` are no longer active targets.

## Home structure

Nav is a single bordered, rounded block (16px inset from the viewport edges); there is no footer.

```text
┌──────────────────────────────────────────────┐  ← nav (border, rounded)
│ Juliet Gobran        Work Gallery About [Contact] │
└──────────────────────────────────────────────┘

  I'm Juliet, a Product Designer...   ★ 👍 ♥   ← accent Easter egg
  {live clock} | Wollongong, Australia

  #work     Case study previews (meta + image)        ← max 1200px
  #gallery  "Gallery of my work" 3/2/1-col grid       ← full width
  #about    "Hi, I'm Juliet" photo + bio/toolkit      ← max 1200px
  #contact  "Find me here" card                        ← full width
```

Nav links are anchors: `Work` → `/#work`, `Gallery` → `/#gallery`, `About` → `/#about`, `Contact` → `/#contact`. The `Juliet Gobran` logo links to `/`. Anchor jumps scroll smoothly (`motion-safe:scroll-smooth` on `<main>`).

## Projects

Content lives in `content/projects/*.json`. See [content-schema.md](content-schema.md).

| Project | Slug | Status | Order |
|---------|------|--------|-------|
| Recapped design 0-1 | `recapped` | published | 1 |
| Footprints Maps advertising model | `fpm-for-business` | published | 2 |
| Feature testing Metiora | `metiora` | published | 3 |

All projects use the `blocks` content model. Draft projects are excluded from the home page but accessible at `/projects/[slug]` during development.

## Gallery

Content lives in `content/gallery/*.json` — see the Gallery section of [content-schema.md](content-schema.md).
