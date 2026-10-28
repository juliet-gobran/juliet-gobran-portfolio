# Site map

## Pages

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Home | `/` | **Active** — app shell live; project cards pending | Empty center; lists published project cards when built |
| Project detail | `/projects/[slug]` | **Active** — data wired; design in Phase 2 | One page per project JSON |
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

| Project | Slug | Status | Year |
|---------|------|--------|------|
| Go To Apps | `go-to-apps` | published | 2025 |
| Footprints Maps | `footprints-maps` | published | 2025 |
| K A T O A | `katoa` | published | 2025 |
| Recapped | `recapped` | draft | 2026 |

Draft projects are excluded from the home page but accessible at `/projects/[slug]` during development.

`projectSchema` now also accepts optional `client`, `scope`, `industry`, `completed` fields (see [content-schema.md](content-schema.md)) that feed the case study "Specs" rows on the home page. None of the current JSON files set them yet, so those spec rows just don't render until filled in — the `CaseStudySpecs` component only shows a row when its value is present. The Figma redesign's three example case studies (Recapped, Footprints Maps advertising model, Metiora.ai) don't map 1:1 onto the current four published projects — fill in real data per project rather than assuming the Figma copy is final.

## Navigation links

| Label | URL |
|-------|-----|
| LinkedIn | https://www.linkedin.com/in/juliet-gobran/ |
| Medium | https://medium.com/@juliet.gobran |
