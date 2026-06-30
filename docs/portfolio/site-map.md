# Site map

## Pages

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Home | `/` | **Active** — app shell live; project cards pending | Empty center; lists published project cards when built |
| Project detail | `/projects/[slug]` | **Active** — data wired; design in Phase 2 | One page per project JSON |
| About | `/about` | Placeholder | Reuse `AppShell` when ready |

> **Note:** The site is migrating from Framer to Next.js. Framer page IDs and `/home-v2` are no longer active targets.

## Planned structure (Home — app shell)

Nav and footer are separate bordered blocks; the center scroll area has no border between them.

```text
┌─────────────────────────────────────┐  ← nav (border, top radius)
│ Juliet Gobran | LinkedIn  Medium    │
└─────────────────────────────────────┘

         Center Content (scrollable)
         (project cards from JSON)

┌─────────────────────────────────────┐  ← footer (border, bottom radius)
│ Senior Product Designer | live clock│
└─────────────────────────────────────┘
```

## Projects

Content lives in `content/projects/*.json`. See [content-schema.md](content-schema.md).

| Project | Slug | Status | Year |
|---------|------|--------|------|
| Go To Apps | `go-to-apps` | published | 2025 |
| Footprints Maps | `footprints-maps` | published | 2025 |
| K A T O A | `katoa` | published | 2025 |
| Recapped | `recapped` | draft | 2026 |

Draft projects are excluded from the home page but accessible at `/projects/[slug]` during development.

## Navigation links

| Label | URL |
|-------|-----|
| LinkedIn | https://www.linkedin.com/in/juliet-gobran/ |
| Medium | https://medium.com/@juliet.gobran |
