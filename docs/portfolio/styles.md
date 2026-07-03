# Styles

Maps former Framer text and color styles to Next.js CSS variables and Tailwind utilities. Source: [framer-styles.md](framer-styles.md) and [design-tokens.md](design-tokens.md).

Last updated: 2026-06-30 (project detail page)

---

## Color tokens

| Design token | Framer name | CSS variable | Tailwind utility |
|--------------|-------------|--------------|------------------|
| `text-primary` | Whitee | `--color-text-primary` | `text-text-primary` |
| `border-shell` | Whitee | `--color-border-shell` | `border-border-shell` |
| `background-dark` | Blackk | `--color-background-dark` | `bg-background-dark` |
| `accent-orange` | Burnn | `--color-accent-orange` | `bg-accent-orange`, `text-accent-orange` |
| `text-on-accent` | — | `--color-text-on-accent` | `text-text-on-accent` |

**Rule:** Use CSS variables or Tailwind theme utilities. Do not hardcode hex values in components.

---

## Typography

Fonts are loaded in [`src/app/layout.tsx`](../../src/app/layout.tsx):

- **Jura** — `--font-jura` — nav, headings, footer chrome
- **Albert Sans** — `--font-albert-sans` — project body, meta pills

### App shell (nav + footer)

Component: [`src/components/app-shell.tsx`](../../src/components/app-shell.tsx). Nav: [`src/components/nav-bar.tsx`](../../src/components/nav-bar.tsx). Clock: [`src/components/wollongong-clock.tsx`](../../src/components/wollongong-clock.tsx).

| UI element | Framer style | Tailwind (implemented) |
|------------|--------------|------------------------|
| Nav name | Heading 3 | `font-jura text-2xl text-text-primary md:text-nav-name` |
| Nav links | Nav Link | `font-jura text-base md:text-nav-link` + `transition-colors duration-300 ease-in-out hover:text-accent-orange` |
| Footer title | Nav Link | `font-jura text-base text-text-primary md:text-nav-link` |
| Footer clock | Caption | `font-jura text-sm text-text-primary md:text-footer-clock` |

External links: `target="_blank"` + `rel="noopener noreferrer"`.

**Desktop (`md+`):** LinkedIn and Medium inline; **Motion** toggle to the right.

**Mobile (`< md`):** Hamburger opens a bordered dropdown (`border-border-shell`, `bg-background-dark`, `rounded-shell-top`) with links + toggle. Menu animates with `opacity` + `translate-y` (`duration-300 ease-in-out`). Hamburger icon animates to a cross when open.

### Project content

Component: [`src/components/project-card.tsx`](../../src/components/project-card.tsx). Home list: [`src/app/page.tsx`](../../src/app/page.tsx).

| UI element | Framer style | Tailwind (implemented) |
|------------|--------------|------------------------|
| Project title | Project Title | `font-jura font-bold leading-[1.15] text-project-title md:text-project-title-md lg:text-project-title-lg text-text-primary` |
| Project meta pill | CTA + Burnn fill | `inline-flex w-fit rounded-pill bg-accent-orange px-4 py-1 font-albert-sans text-project-meta font-medium text-text-on-accent` |
| Project body | Project Body | `font-albert-sans text-lg font-light md:text-project-body text-text-primary` |

**Layout:** `< md` — single column (content then image). `md+` — `grid grid-cols-[2fr_1fr] gap-6`. Card list uses `gap-project-stack-gap` (80px).

**Interaction:** Entire card is a `Link` to `/projects/[slug]`. Hover/focus styles live in [`globals.css`](../../src/app/globals.css) (`.project-card-title`, `.project-card-image`). Tune duration, easing, lift, shadow, and image scale via tokens in [`tokens.css`](../../src/styles/tokens.css) (`--project-card-hover-*`).

### Project detail page

Route: [`src/app/projects/[slug]/page.tsx`](../../src/app/projects/[slug]/page.tsx). Components in [`src/components/project/`](../../src/components/project/).

| UI element | Framer style | Tailwind (implemented) |
|------------|--------------|------------------------|
| Meta pill | CTA + Burnn fill | Same as project card — `{year} · {role}` separator |
| Page title | Heading 1 | `font-jura font-bold leading-[1.15] text-project-title md:text-project-title-md text-text-primary` |
| Subtitle | Project Body | `font-albert-sans text-project-body font-light text-text-primary` |
| External URL | Paragraph 1 | `font-albert-sans text-base font-light underline text-text-primary` |
| Content / extra panels | Blackk surface | `rounded-card bg-background-dark p-8` |
| Detail body copy | Paragraph 3 | `.prose-project` — Albert Sans 20px light via `text-project-detail-body` token |

**Max width:** Home uses `max-w-content` (800px) on the page wrapper. Project detail uses `max-w-project` (1920px). App shell `<main>` no longer constrains width — each page sets its own.

**Layout:**

| Breakpoint | Behaviour |
|------------|-----------|
| `< lg` | Single column: header → image gallery → content panel → optional extra content |
| `lg+` | Header scrolls away in `<main>`, then `grid-cols-[1fr_2fr] gap-8` shows the full image gallery in a sticky right column beside the scrolling content panel |

At `lg+`, gallery and content stay side by side with the gallery column pinned via `sticky top-0`; optional `extraContent` remains full-width below.

**Image gallery** ([`project-image-gallery.tsx`](../../src/components/project/project-image-gallery.tsx)): patterned layout for up to 5 images — hero square, pair row (`md:grid-cols-2`), landscape frame (`aspect-[1200/590]`), final square. Frames use `rounded-card bg-background-dark p-8`; images `object-contain`.

**Markdown:** `content` and `extraContent` fields render via [`markdown-content.tsx`](../../src/components/project/markdown-content.tsx) (`react-markdown` + `remark-gfm`). Prose styles in [`globals.css`](../../src/app/globals.css) `.prose-project`.

### General hierarchy

| Framer style | Font | Size | Use when |
|--------------|------|------|----------|
| Heading 1 | Jura | 64px | Large page headings |
| Heading 2 | Jura | 48px | Section headings |
| Heading 3 | Jura | 32px | Nav name, sub-headings |
| Heading 4 | Jura | 24px | Smaller headings |
| Paragraph 1 | Albert Sans | 16px | Body text |
| Paragraph 2 | Albert Sans | 14px | Small body / fine print |
| Paragraph 3 | Albert Sans | 20px | Medium body |
| CTA | Albert Sans | 16px | Pills, labels on accent backgrounds |

---

## Spacing and layout

| Token | CSS variable | Tailwind utility | Value |
|-------|--------------|------------------|-------|
| `shell-inset` | `--spacing-shell-inset` | `p-shell-inset` | 16px |
| `nav-padding-x` | `--spacing-nav-padding-x` | `px-nav-padding-x` | 16px |
| `nav-padding-y` | `--spacing-nav-padding-y` | `py-nav-padding-y` | 8px |
| `center-padding-y` | `--spacing-center-padding-y` | `py-center-padding-y` | 64px |
| `center-padding-x` | `--spacing-center-padding-x` | `px-center-padding-x` | 16px |
| `footer-padding-x` | `--spacing-footer-padding-x` | `px-footer-padding-x` | 16px |
| `footer-padding-y` | `--spacing-footer-padding-y` | `py-footer-padding-y` | 8px |
| `nav-link-gap` | `--spacing-nav-link-gap` | `gap-nav-link-gap` | 16px |
| `project-stack-gap` | `--spacing-project-stack-gap` | `gap-project-stack-gap` | 80px |
| Content max width | `--layout-content-max-width` | `max-w-content` | 800px |
| Project max width | `--layout-project-max-width` | `max-w-project` | 1920px |

### App shell borders and structure

Nav and footer are **separate bordered blocks** (not one continuous shell outline):

| Section | Border | Radius |
|---------|--------|--------|
| Nav (`<header>`) | `border border-border-shell` | `rounded-t-shell-top` |
| Center (`<main>`) | none | — |
| Footer (`<footer>`) | `border border-border-shell` | `rounded-b-shell-bottom` |

Shell is viewport-locked (`h-dvh`) so nav stays pinned to the top and footer to the bottom. Center is the only scroll region (`flex-1 min-h-0 overflow-y-auto`). Footer row uses `flex-wrap` for narrow viewports.

### Motion toggle

In [`src/components/nav-bar.tsx`](../../src/components/nav-bar.tsx). State via [`src/components/motion-preference-provider.tsx`](../../src/components/motion-preference-provider.tsx). Default: on (galaxy animating). Off pauses the crossfade exactly where it is; on resumes from that point. The background also pauses while document visibility is hidden.

### Galaxy background

Component: [`src/components/galaxy-background.tsx`](../../src/components/galaxy-background.tsx). Wired in `AppShell` behind the shell inset.

| Property | Tailwind / CSS |
|----------|----------------|
| Positioning | `fixed inset-0 -z-10` |
| Interaction | `pointer-events-none` |
| Overflow | `overflow-hidden` |
| Fallback fill | `bg-background-dark` |
| Images | `object-cover` via `next/image` `fill` |

---

## Radius

| Token | CSS variable | Value |
|-------|--------------|-------|
| `shell-top` | `--radius-shell-top` | 8px |
| `shell-bottom` | `--radius-shell-bottom` | 8px |
| `card-radius` | `--radius-card` | 16px | `rounded-card` on mockup frame |
| `pill-radius` | `--radius-pill` | 32px | `rounded-pill` on meta pill |

---

## Implementation rules

1. Read [design-tokens.md](design-tokens.md) and this file before styling components.
2. Use token-backed Tailwind utilities from [`src/app/globals.css`](../../src/app/globals.css) `@theme` — do not scatter magic numbers.
3. Create new patterns only for genuinely new UI; document them here.
4. Code components (e.g. Wollongong clock) should inherit Caption-style typography by default.
