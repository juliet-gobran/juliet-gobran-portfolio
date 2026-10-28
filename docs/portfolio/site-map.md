# Site map

## Pages

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Home | `/` | **Active** — intro + case study previews | Lists published projects via `CaseStudyPreview` |
| Project detail | `/projects/[slug]` | **Active** — dynamic `blocks` template | One page per project JSON, see [content-schema.md](content-schema.md) |
| About | `/about` | Placeholder | Reuse `AppShell` when ready |

> **Note:** The site is migrating from Framer to Next.js. Framer page IDs and `/home-v2` are no longer active targets.

## Planned structure (Home — light redesign)

Nav is a single bordered, rounded block; there is no footer. The clock lives inline under the intro heading.

```text
┌─────────────────────────────────────┐  ← nav (border, rounded)
│ Juliet Gobran   Work Gallery About [Contact] │
└─────────────────────────────────────┘

  I'm Juliet, a Product Designer...
  {live clock} | Wollongong, Australia

  Case study preview (meta + image)
  ─────────────────────────────────
  Case study preview (meta + image)
  ─────────────────────────────────
  Case study preview (meta + image)
```

`Work`, `Gallery`, `About`, `Contact` are currently inert placeholders — routing/anchors for these are intentionally **not** wired up yet (nav may end up pointing at page sections rather than separate pages).

## Projects

Content lives in `content/projects/*.json`. See [content-schema.md](content-schema.md).

| Project | Slug | Status | Order |
|---------|------|--------|-------|
| Footprints Maps advertising model | `fpm-for-business` | published | 2 |
| Recapped design 0-1 | `recapped` | published | 3 |

Both are fully migrated to the `blocks` content model (see [content-schema.md](content-schema.md)) — `content`/`images`/`extraContent` and the legacy `src/components/project/*` layout have been removed, since every project now uses `blocks`. `Footprints Maps App` (`fpm-app`) and `TRIBE` (`tribe`) were removed entirely (content, images, and the old card) as unmigrated, pre-redesign case studies.

Draft projects are excluded from the home page but accessible at `/projects/[slug]` during development.
