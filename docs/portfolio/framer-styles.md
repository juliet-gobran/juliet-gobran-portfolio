# Framer styles

Prefer **existing Framer text and color styles** over inline typography or hardcoded colors. Only create new styles when no suitable match exists.

Styles live in the Framer Assets panel. When building via the agent, apply with `textStylePreset="<name>"` on `RichTextNode` nodes, and reference color tokens via `fill="var(--token-<id>)"` or color style names.

Last audited: 2026-06-26

---

## Color styles

| Design token | Framer name | Token ID | Value |
|--------------|-------------|----------|-------|
| `text-primary` | **Whitee** | `cbc29f5e-a25f-485a-bee7-62b6effd63a0` | `rgb(255, 255, 255)` |
| `border-shell` | **Whitee** | (same) | Use for 1px borders |
| `background-dark` | **Blackk** | `353199a0-504b-43b5-9a41-e9e2c4c25771` | `rgb(15, 14, 15)` ≈ `#0f0e0f` |
| `accent-orange` | **Burnn** | `4ee76153-732b-4195-b8f2-64cd8274b97a` | `rgb(192, 73, 42)` ≈ `#c0492a` |
| `text-on-accent` | — | — | Use `#000000` on Burnn fills (see **CTA** text style) |

**CSS variable form:** `var(--token-cbc29f5e-a25f-485a-bee7-62b6effd63a0)` for Whitee.

---

## Text styles

### App shell (nav + footer)

| UI element | Framer text style | ID | Notes |
|------------|-------------------|-----|-------|
| Nav name ("Juliet Gobran") | **Heading 3** | `I0Cgxaa_e` | Jura 32px, Whitee — matches Figma |
| Nav links (LinkedIn, Medium) | **Nav Link** | `hDUS33Oan` | Jura 20px, Whitee — created for shell |
| Footer title | **Nav Link** | `hDUS33Oan` | Same 20px chrome style |
| Footer clock | **Caption** | `ejLIn3Hi9` | Jura 16px, Whitee — WollongongClock default font |

### Project content (center area)

| UI element | Framer text style | ID | Notes |
|------------|-------------------|-----|-------|
| Project title | **Project Title** | `fbcHGYrnk` | Jura Bold — responsive: 80px (default) / 64px (medium) / 48px (small) |
| Project meta pill | **CTA** | `OkSEdqp2I` | Albert Sans 16px, black on Burnn fill |
| Project description | **Project Body** | `Vf4HKfzlF` | Albert Sans Light 24px — created for Figma previews |

### General hierarchy (reuse where appropriate)

| Framer style | ID | Tag | Font | Size | Use when |
|--------------|-----|-----|------|------|----------|
| Heading 1 | `cDq7ohKcO` | h1 | Jura | 64px | Large page headings (responsive breakpoints set) |
| Heading 2 | `H1iOXIp_m` | h2 | Jura | 48px | Section headings |
| Heading 3 | `I0Cgxaa_e` | h3 | Jura | 32px | Nav name, sub-headings |
| Heading 4 | `ukVa5X2db` | h4 | Jura | 24px | Smaller headings |
| Paragraph 1 | `G07QMNu50` | p | Albert Sans | 16px | Body text |
| Paragraph 2 | `Y_awC6qt2` | p | Albert Sans | 14px | Small body / fine print |
| Paragraph 3 | `q7c4IWHdW` | p | Albert Sans | 20px | Medium body (responsive) |
| CTA | `OkSEdqp2I` | h5 | Albert Sans | 16px | Pills, labels on accent backgrounds |

All heading and paragraph styles above (except CTA) use the **Whitee** color token.

---

## Implementation rules

1. **Read this file** before applying text or colors in Framer.
2. **Apply presets** with `SET <nodeId> textStylePreset="Nav Link"` (name or ID).
3. **Do not inline** `fontSize`, `fontName`, or `textColor` when a preset exists.
4. **Color fills** on frames: `fill="Blackk"`, `fill="Burnn"`, or `var(--token-…)` for Whitee borders.
5. **Create new styles** only for genuinely new patterns; add them here after creation.
6. **Code components** (e.g. Wollongong clock): expose a `ControlType.Font` control defaulting to **Caption** traits.

---

## Token → style quick reference

See [design-tokens.md](design-tokens.md) for Figma source values. This table is the Framer-side mapping:

| `design-tokens.md` role | Use this Framer style / color |
|-------------------------|-------------------------------|
| Nav name | Heading 3 |
| Nav links | Nav Link |
| Footer title | Nav Link |
| Footer clock | Caption |
| Project title | Project Title |
| Project meta | CTA + Burnn fill |
| Project body | Project Body |
| `text-primary` | Whitee |
| `background-dark` | Blackk |
| `accent-orange` | Burnn |
| `border-shell` | Whitee (1px border) |
