# Content schema

Project content mirrors the former Framer CMS **Projects** collection. Each project is a single JSON file in `content/projects/`.

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | `string` | yes | URL segment — lowercase kebab-case. Route: `/projects/{slug}` |
| `title` | `string` | yes | Project name |
| `status` | `"draft" \| "published"` | yes | Only `published` projects appear on home |
| `role` | `string` | yes | Your role, e.g. `Senior Product Designer` |
| `cardImage` | `string` | yes | Path under `public/`, e.g. `/images/projects/recapped/card.webp` |
| `subtitle` | `string` | yes | Short description for project cards |
| `year` | `number` | yes | Project year (integer) |
| `url` | `string \| null` | yes | External project URL, or `null` |
| `content` | `string` | yes | Main body — **Markdown** |
| `images` | `string[]` | yes | Gallery images (max 5), paths under `public/` |
| `extraContent` | `string \| null` | yes | Additional body — **Markdown**, or `null` |

## File layout

```text
content/
  projects/
    recapped.json
    go-to-apps.json
    ...

public/
  images/
    projects/
      recapped/
        card.webp
        image-1.webp
        ...
```

## Example

```json
{
  "slug": "recapped",
  "title": "Recapped",
  "status": "draft",
  "role": "Senior Product Designer",
  "cardImage": "/images/projects/recapped/card.webp",
  "subtitle": "A simple place to store the things you don't want to forget.",
  "year": 2026,
  "url": "https://recapped.com.au/",
  "content": "Main project write-up in **Markdown**.\n\n## Section\n\n- Bullet one\n- Bullet two",
  "images": [
    "/images/projects/recapped/image-1.webp",
    "/images/projects/recapped/image-2.webp"
  ],
  "extraContent": null
}
```

## Adding a project

1. Create `content/projects/{slug}.json` using the schema above.
2. Create `public/images/projects/{slug}/` and add images.
3. Run `npm run build` — Zod validates all project files at build time.
4. Set `status` to `"published"` when ready for the home page.

## Validation

- Schema: [`src/lib/projects.schema.ts`](../../src/lib/projects.schema.ts)
- Type: [`src/types/project.ts`](../../src/types/project.ts)
- Helpers: [`src/lib/projects.ts`](../../src/lib/projects.ts)

Invalid JSON or schema violations will fail the build with a Zod error message.

## Markdown in JSON

Write Markdown inside JSON strings. Use `\n` for line breaks and `\n\n` for paragraphs. Lists, headings, bold, and links are supported — rendering will be added in Phase 2.
