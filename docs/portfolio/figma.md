# Figma

## File

- **Name:** Portfolio
- **URL:** https://www.figma.com/design/2qIoGOLmiSESnYiqVLyHco/Portfolio
- **File key:** `2qIoGOLmiSESnYiqVLyHco`

## Frame mapping

| Figma frame | Node ID | Framer target | Scope |
|-------------|---------|---------------|-------|
| Portfolio (app shell) | `359:1096` | Home (`QjWmlHjIE`) | Nav + empty center + footer — **implemented** |
| Preview (project card) | `359:1624` | **Project Card** (`oYJmnmux7`) | Recapped — in progress |
| Preview (project card) | `359:1179` | **Project Card** (`oYJmnmux7`) | Footprints Maps App — in progress |

## App shell frame (`359:1096`) — structure

```text
Portfolio (1710 × 928)
├── 1-Galaxy 1          — full-bleed background image
└── Frame 52            — 16px outer padding
    └── Frame 51        — bordered shell column
        ├── Frame 48    — NAV (top radius)
        ├── Frame 49    — CENTER (scrollable, empty for Plan 2)
        └── Frame 50    — FOOTER (bottom radius, live clock)
```

### Nav (`359:1100`)

- Left: `Juliet Gobran` — Jura Regular, 32px
- Right: `LinkedIn`, `Medium` — Jura Regular, 20px, 16px gap

### Center (`359:1103`)

- Empty on home for now; Figma shows two `Preview` components for future project sections
- Padding: 64px vertical, 16px horizontal
- Figma shows white side borders; **Next.js implementation omits center borders** — open gap between bordered nav and footer blocks

### Footer (`359:1107`)

- Left: `Senior Product Designer` — 20px
- Right: live timestamp — 16px
- Example format: `1:16:59pm Tue 23 Jun 2026 | Wollongong, Australia`

## Next.js implementation notes

Implemented in [`src/components/app-shell.tsx`](../../src/components/app-shell.tsx). Intentional differences from frame `359:1096`:

| Figma | Code |
|-------|------|
| Continuous shell outline (nav + center sides + footer) | Nav and footer each have their own `border border-border-shell`; center has no border |
| Galaxy background (`1-Galaxy 1`) | Animated crossfade through six PNGs in `public/galaxy/` (continuous 5s fades, no hold; pauses on motion off, reduced-motion, or hidden tab visibility) |
| Fixed desktop font sizes | Responsive: smaller type below `md`, token sizes at `md+` (see [design-tokens.md](design-tokens.md#breakpoints)) |

## Design principles (from Figma)

- Dark background with soft orange radial glow (animated galaxy cycle behind shell)
- Thin white 1px borders on nav and footer blocks; rounded corners on nav (top) and footer (bottom) only
- Typography: Jura for chrome, Albert Sans for project content (later)

## Using Figma in this workflow

1. Design or update frames in Figma.
2. Share a frame URL with `node-id` when asking for implementation.
3. Tokens and spacing are captured in [design-tokens.md](design-tokens.md).
4. Implementation happens in Framer — Figma is the visual reference, not auto-synced.
