# Figma

## File

- **Name:** Portfolio
- **URL:** https://www.figma.com/design/2qIoGOLmiSESnYiqVLyHco/Portfolio
- **File key:** `2qIoGOLmiSESnYiqVLyHco`

## Frame mapping

| Figma frame | Node ID | Scope |
|-------------|---------|-------|
| Portfolio (light redesign) | `593:4869` | Nav + intro + case study previews, Gallery, About, Contact — **implemented** |
| Nav | `593:4871` | Logo, Work/Gallery/About + Contact CTA (anchor links to home sections) — **implemented** |
| Intro | `593:4971` | Heading + inline timestamp — **implemented** |
| Case study preview (Recapped) | `593:4883` | `CaseStudyPreview` reference — **implemented** (generic, data-driven) |
| Case study detail (Recapped) | `604:5156` | `CaseStudyDetailSidebar` + `CaseStudyContent` — **implemented** (generic, data-driven `blocks` template) |
| Case study detail (Footprints Maps advertising model) | `616:5605` | Second case study on the `blocks` template — **implemented**; read from a PDF export, not this MCP, since the Figma Starter-plan MCP rate limit was hit mid-task |

Older dark-theme frames (`359:1096`, `359:1624`, `359:1179`) are superseded by this redesign and no longer tracked here.

> Note: the `/the-search` app has **not** been redesigned — it picked up the light color tokens since it's token-driven, but its layout/typography is unchanged. The home page (all sections) and both case study templates (preview + detail) are fully implemented.

## Using Figma in this workflow

1. Design or update frames in Figma.
2. Share a frame URL with `node-id` when asking for implementation.
3. Tokens and spacing are captured in [design-tokens.md](design-tokens.md).
4. Implementation happens directly in this Next.js codebase — Figma is the visual reference, not auto-synced.
