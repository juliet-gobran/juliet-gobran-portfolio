# Framer

> **Deprecated (2026-06-30):** The site is migrating to Next.js. This file is kept as historical reference only. See [nextjs.md](nextjs.md) for the current stack.

## Project

| Field | Value |
|-------|-------|
| Name | Portfolio |
| Project ID | `58fViSvT2FgdaEUjEdeg` |
| Editor URL | https://framer.com/projects/Portfolio--58fViSvT2FgdaEUjEdeg-7mjSK |
| Live site | https://www.juliet-gobran.com.au |

## Agent setup

```bash
# One-time setup (requires Node.js 24+)
npx @framer/agent@latest setup

# Connect to project (authorize in browser on first run)
npx @framer/agent@latest session new "https://framer.com/projects/Portfolio--58fViSvT2FgdaEUjEdeg-7mjSK"
```

Skills are installed to `~/.agents/skills/` (global, not this repo).

## Pages

| Page | Path | Node ID | Layout template |
|------|------|---------|-----------------|
| Home | `/` | `QjWmlHjIE` | **App Shell** (`zsJEewXXF`) |
| About | `/about` | `LioLZvEKQ` | None yet |
| Home v2 | `/home-v2` | `XCkCfs8hl` | None — legacy draft |

## Components

| Name | Type | ID / file | Purpose |
|------|------|-----------|---------|
| App Shell | Layout Template | `zsJEewXXF` | Shared nav, placeholder, footer |
| WollongongClock | Code component | `WollongongClock.tsx` (`PqsYCGd`) | Live Wollongong date/time in footer |
| Galaxy Background | Component | `Jx5dQABjh` | Full-bleed background in app shell |
| Project Card | Component | `oYJmnmux7` | CMS project preview cards in Home center content |

#### Project Card (`oYJmnmux7`)

- **Controls:** Title, Year, Role, Subtitle (string variables)
- **Variants:** Project card (primary/desktop), Tablet (`K8Ww5XvaV`), Phone (`JsIJODJef`), Hover (`Srj2BlUNy`), Pressed (`OLwssIYH7`)
- **Layout:** horizontal text + square mockup on desktop/tablet; vertical stack (text first) on Phone variant
- **Interaction:** hover/pressed scales mockup image 1.2× (top-aligned) and adds Burnn drop shadow `−2px 2px` on mockup frame
- **Usage:** CMS collection list in Center Content (`UPg17WqHi`, max-width 800px)

### Legacy components (from previous Home)

| Component | ID | Used for |
|-----------|-----|----------|
| Project Tile | `HHl77_fqx` | Work grid project cards (removed from Home) |
| Button | `RAZYh0JFi` | CTAs, overlay back button |

Project Tile is legacy; center content now uses **Project Card**.

## Publishing

- Changes are editor-only until published.
- Preview: `framer.agent.publish({ action: "preview" })`
- Do not publish without explicit approval.

## Framer ↔ Figma workflow

1. Read Figma frame spec from [figma.md](figma.md) and [design-tokens.md](design-tokens.md).
2. **Apply Framer styles** from [framer-styles.md](framer-styles.md) — prefer presets and color tokens over inline values.
3. Implement in Framer via agent (`apply-changes`, code components).
4. Screenshot and compare against Figma before publishing.
5. Update [framer-styles.md](framer-styles.md) when new styles are created.

## Styles (text + color)

Full inventory and mapping: **[framer-styles.md](framer-styles.md)**

**Rule:** Always use existing Framer text styles and color tokens when building. Create new styles only for gaps (four shell/project styles were added 2026-06-23: Nav Link, Caption, Project Title, Project Body).

### Color styles

| Name | Token ID | Maps to |
|------|----------|---------|
| Whitee | `cbc29f5e-a25f-485a-bee7-62b6effd63a0` | `text-primary`, borders |
| Blackk | `353199a0-504b-43b5-9a41-e9e2c4c25771` | `background-dark` |
| Burnn | `4ee76153-732b-4195-b8f2-64cd8274b97a` | `accent-orange` |
