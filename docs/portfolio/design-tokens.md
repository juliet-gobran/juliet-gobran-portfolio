# Design tokens

Extracted from Figma frame `359:1096` (Portfolio app shell). Update when Figma changes.

**Next.js implementation:** CSS variables in [`src/styles/tokens.css`](../../src/styles/tokens.css), Tailwind theme in [`src/app/globals.css`](../../src/app/globals.css). Style mapping: [styles.md](styles.md).

**Framer reference (archived):** mapped text and color styles in [framer-styles.md](framer-styles.md).

## Colors

| Token | Hex / value | Framer color | Usage |
|-------|-------------|--------------|-------|
| `background-dark` | `#0f0e0f` | **Blackk** | Mockup frames, deep surfaces |
| `accent-orange` | `#ca492a` | **Burnn** | Project pill tags (future content) |
| `text-primary` | `#ffffff` | **Whitee** | Nav, footer, headings |
| `text-on-accent` | `#000000` | — (use **CTA** text style) | Text on orange pills |
| `border-shell` | `#ffffff` | **Whitee** | 1px border on nav and footer blocks (center is borderless) |

Background: animated galaxy cycle — six seamless PNGs in `public/galaxy/` (`1-Galaxy.png` … `6-Galaxy.png`), crossfaded in [`src/components/galaxy-background.tsx`](../../src/components/galaxy-background.tsx). Figma reference frame uses `1-Galaxy 1` as a single still.

## Typography

| Role | Font | Weight | Size | Framer text style |
|------|------|--------|------|-------------------|
| Nav name | Jura | Regular | 32px | **Heading 3** |
| Nav links | Jura | Regular | 20px | **Nav Link** |
| Footer title | Jura | Regular | 20px | **Nav Link** |
| Footer clock | Jura | Regular | 16px | **Caption** |
| Project title | Jura | Bold | 80px | **Project Title** |
| Project meta | Albert Sans | Medium | 16px | **CTA** (on **Burnn** fill) |
| Project body | Albert Sans | Light | 24px | **Project Body** |

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `shell-inset` | 16px | Outer padding around bordered shell |
| `nav-padding-x` | 16px | Nav horizontal padding |
| `nav-padding-y` | 8px | Nav vertical padding |
| `center-padding-y` | 64px | Center content vertical padding |
| `center-padding-x` | 16px | Center content horizontal padding |
| `footer-padding-x` | 16px | Footer horizontal padding |
| `footer-padding-y` | 8px | Footer vertical padding |
| `nav-link-gap` | 16px | Gap between LinkedIn and Medium |
| `project-stack-gap` | 80px | Gap between project previews (future) |

## Radius

| Token | Value | Usage |
|-------|-------|-------|
| `shell-top` | 8px | Nav top-left, top-right |
| `shell-bottom` | 8px | Footer bottom-left, bottom-right |
| `card-radius` | 16px | Project mockup frames (future) |
| `pill-radius` | 32px | Orange meta pills (future) |

## Layout

Implemented in [`src/components/app-shell.tsx`](../../src/components/app-shell.tsx).

| Property | Value |
|----------|-------|
| Outer inset | 16px (`shell-inset`) around the shell column |
| Shell layout | Vertical stack, full viewport height (`min-h-dvh`) |
| Nav | Horizontal, space-between; own 1px border + top corner radius (`shell-top`) |
| Center | Flex-grow, scrollable (`overflow-y: auto`); **no border** — open gap between nav and footer |
| Footer | Horizontal, space-between, `flex-wrap`; own 1px border + bottom corner radius (`shell-bottom`) |
| Content max width | 800px (centered inner wrapper) |
| Background | Animated galaxy crossfade (`GalaxyBackground`) over `background-dark` fallback |

## Footer clock format

```
{h}:{mm}:{ss}{am/pm} {Day} {D} {Mon} {YYYY} | Wollongong, Australia
```

Example: `1:16:59pm Tue 23 Jun 2026 | Wollongong, Australia`

- Timezone: `Australia/Sydney` (covers Wollongong)
- Updates every second
- Implemented in [`src/components/wollongong-clock.tsx`](../../src/components/wollongong-clock.tsx) (`useSyncExternalStore`, hydration-safe)

## Breakpoints

Framer project uses Desktop / Tablet / Phone variants. Responsive shell typography (Tailwind `md:` breakpoint):

| Element | Mobile | Desktop (`md+`) |
|---------|--------|-----------------|
| Nav name | 24px (`text-2xl`) | 32px (`text-nav-name`) |
| Nav links, footer title | 16px (`text-base`) | 20px (`text-nav-link`) |
| Footer clock | 14px (`text-sm`) | 16px (`text-footer-clock`) |

Footer uses `flex-wrap` so the clock can wrap on narrow screens.

## Galaxy background animation

Implemented in [`src/components/galaxy-background.tsx`](../../src/components/galaxy-background.tsx).

| Setting | Value |
|---------|-------|
| Assets | `public/galaxy/1-Galaxy.png` … `6-Galaxy.png` |
| Loop | 1 → 2 → 3 → 4 → 5 → 6 → 1 (endless) |
| Hold per frame | None — next crossfade begins as soon as the previous one finishes |
| Crossfade | 6s (`linear` opacity) — full loop ~36s |
| Motion toggle | Paused when **Motion** is off (default on), or OS `prefers-reduced-motion` — freezes the blend in place (including mid-crossfade) |
