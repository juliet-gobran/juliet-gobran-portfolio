# Content schema

Each project is a single JSON file in `content/projects/`.

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | `string` | yes | URL segment — lowercase kebab-case. Route: `/projects/{slug}` |
| `title` | `string` | yes | Project name |
| `status` | `"draft" \| "published"` | yes | Only `published` projects appear on home |
| `role` | `string` | yes | Case study "Role:" spec row, e.g. `Senior Product Designer at Go To Apps` |
| `client` | `string` | no | Case study "Client:" spec row — omitted when not set |
| `scope` | `string` | no | Case study "Scope:" spec row — omitted when not set |
| `industry` | `string` | no | Case study "Industry:" spec row — omitted when not set |
| `completed` | `string` | no | Case study "Completed:" spec row, e.g. `April 2026` — omitted when not set |
| `cardImage` | `string` | yes | Path under `public/`, e.g. `/images/projects/recapped/card.png`. Export with a transparent background — the home page case study frame uses `object-contain` |
| `order` | `number` | no | Manual home-card order. Smaller number appears earlier; unordered projects appear after ordered ones |
| `subtitle` | `string` | yes | Short description, shown on both the home card and the case study page |
| `year` | `number` | yes | Project year (integer) — not currently rendered, kept for future use |
| `url` | `string \| null` | yes | External project URL, or `null` |
| `blocks` | `ContentBlock[]` | yes, min 1 | The case study detail page content — see below |

## Content blocks

`blocks` is an ordered array that drives the dynamic case study page (`/projects/[slug]`) — any mix of the two block types, in whatever order and count the case study needs:

```json
{ "type": "section", "heading": "Overview", "body": "First paragraph.\n\nSecond paragraph." }
{ "type": "image", "src": "/images/projects/recapped/hero.png", "width": 1598, "height": 1172, "alt": "...", "caption": "Optional caption, centered under the image" }
```

- **`section`** — `heading` (Jura bold) + `body`. Split `body` into multiple paragraphs with a blank line (`\n\n`).
- **`image`** — `src` is a path under `public/`; `width`/`height` must be the image file's **real pixel dimensions** (used by `next/image` for correct, non-distorted sizing — don't guess them, read them off the actual file, e.g. `sips -g pixelWidth -g pixelHeight <file>` on macOS). `alt` is optional (defaults to `""`); `caption` is optional and, when present, renders centered below the image.

Image blocks render inside a bordered, rounded (`radius-control`) frame — see [design-tokens.md](design-tokens.md). There's no fixed aspect ratio; each image displays at its own proportions.

## File layout

```text
content/
  projects/
    recapped.json
    fpm-for-business.json
    ...

public/
  images/
    projects/
      recapped/
        card.png
        hero.png
        ...
```

## Example

```json
{
  "slug": "recapped",
  "title": "Recapped design 0-1",
  "status": "published",
  "role": "Senior Product Designer at Go To Apps",
  "client": "Go To Apps (in-house product)",
  "scope": "Product structure, branding, design system, web app design, landing page and QA",
  "industry": "Consumer web app",
  "completed": "April 2026",
  "cardImage": "/images/projects/recapped/product-launch-hero-v2.png",
  "order": 3,
  "subtitle": "A simple place to store the things you don't want to forget, designed in three weeks.",
  "year": 2025,
  "url": "https://recapped.com.au/",
  "blocks": [
    { "type": "section", "heading": "In Short", "body": "..." },
    {
      "type": "image",
      "src": "/images/projects/recapped/product-launch-hero-v2.png",
      "width": 1598,
      "height": 1172,
      "alt": "...",
      "caption": "Recapped - Launched Product"
    }
  ]
}
```

## Adding a project

1. Create `content/projects/{slug}.json` using the schema above.
2. Create `public/images/projects/{slug}/` and add images, named descriptively (not the raw Figma export names — rename on the way in).
3. Measure each image's real pixel dimensions and set `width`/`height` accordingly.
4. Run `npm run build` — Zod validates all project files at build time.
5. Set `status` to `"published"` when ready for the home page.

## Validation

- Schema and `Project`/`ContentBlock` types: [`src/lib/projects.schema.ts`](../../src/lib/projects.schema.ts)
- Helpers: [`src/lib/projects.ts`](../../src/lib/projects.ts)
- Ordering: `getPublishedProjects()` sorts by `order` ascending when provided; ties and unset values fallback to `slug` order

Invalid JSON or schema violations will fail the build with a Zod error message.
