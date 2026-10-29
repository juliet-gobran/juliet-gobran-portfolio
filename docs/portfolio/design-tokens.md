# Design tokens

Extracted from Figma frame `593:4869` (Portfolio — light redesign). Update when Figma changes.

**Next.js implementation:** CSS variables in [`src/styles/tokens.css`](../../src/styles/tokens.css), Tailwind theme in [`src/app/globals.css`](../../src/app/globals.css). Style mapping: [styles.md](styles.md).

## Colors

| Token | Hex / value | Figma style | Usage |
|-------|-------------|--------------|-------|
| `background` | `#f9f6ef` | Home/Surface/Cream | Page background |
| `surface-sunken` | `#ebe5d8` | Home/Surface/Darker Cream | Nav bar fill, case study image frames, gallery tiles, About photo card, Contact card |
| `border-subtle` | `#d7d1c4` | Home / Border / Subtle | 1px borders — nav, image frames, gallery tiles, cards, spec row dividers, mobile menu panel |
| `text-primary` | `#000000` | Home / Text / Black | Default body/heading text everywhere |

No background image/animation — the galaxy crossfade has been removed entirely.

### Accents (CTA buttons)

Three accents, each with a light (fill) and dark (border) variant. Defined in [`src/styles/tokens.css`](../../src/styles/tokens.css), swapped at runtime via `[data-accent]` on `<html>` — see [`src/components/accent-provider.tsx`](../../src/components/accent-provider.tsx).

| Token | Hex | Usage |
|-------|-----|-------|
| `accents-pink` | `#ff9ed8` | Pink accent fill |
| `accents-pink-dark` | `#ec6cb9` | Pink accent border |
| `accents-blue` | `#87c2ff` | Blue accent fill |
| `accents-blue-dark` | `#439efd` | Blue accent border |
| `accents-orange` | `#ffa78a` | Orange accent fill (default) |
| `accents-orange-dark` | `#ef774f` | Orange accent border (default) |
| `cta-accent` / `cta-accent-dark` | — | The *active* accent's fill/border — resolves to one of the three pairs above depending on `[data-accent]`. Used by `Contact` (`nav-bar.tsx`) and `View case study` (`case-study-cta.tsx`) |

Default accent is orange. The active accent persists to `localStorage` (`accent` key) and is applied before paint via an inline script in `layout.tsx`, so there's no flash of the default color on reload. `useAccent()` (from `accent-provider.tsx`) exposes `{ accent, setAccent }` for any future trigger (e.g. the planned home page Easter egg) to read/change it — no UI trigger exists yet.

## Typography

| Role | Font | Weight | Size | Figma style |
|------|------|--------|------|-------------|
| Nav name | Jura | Bold | 32px | Home / Heading / Brand |
| Nav links | Jura | Regular | 20px | Home / Label / Navigation |
| Nav/CTA buttons | Jura | Bold | 20px | Home / Label / Button |
| Intro heading | Jura | Bold | 40px (30px below `md`) | Home / Heading / Intro |
| Timestamp | Jura | Regular | 16px | Home / Caption / Timestamp |
| Case study title | Jura | Bold | 32px, line-height 1.15 | Home / Heading / Project |
| Case study body | Albert Sans | Light | 20px | Home / Body / Large |
| Case study url link | Albert Sans | Light | 16px, underline | Home / Link / Small |
| Case study spec label | Jura | Bold | 16px | Home / Label / Metadata |
| Case study spec value | Albert Sans | Light | 16px | Home / Body / Small |
| Case study page title (H1) | Jura | Bold | 48px (`text-4xl` below `lg`) | — |
| Case study page subtitle | Albert Sans | Light | 24px (`text-case-study-body` below `lg`) | — |
| Case study section heading | Jura | Bold | 24px | — |

All project pages now use these tokens — the old project-detail tokens (`project-title`, `project-body`, `project-meta`, `project-detail-body`) have been removed along with the legacy layout they styled.

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `shell-inset` | 16px | Nav inset: top only on the shell wrapper (`pt-shell-inset`), left/right on the nav itself (`mx-shell-inset`). No bottom inset, so the scroll area runs to the screen edge |
| `nav-padding-x` | 16px | Nav horizontal padding |
| `nav-padding-y` | 8px | Nav vertical padding |
| `center-padding-y` | 64px | Main content vertical padding (`md+`) |
| `center-padding-y-mobile` | 32px | Main content vertical padding below `md` |
| `center-padding-x` | 16px | Main content horizontal padding |
| `nav-link-gap` | 16px | Gap between nav items |
| `case-study-section-y` | 64px | Vertical padding around each case study preview on home (no dividers) |

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `drop-shadow-surface` | `0 0 8px rgba(0, 0, 0, 0.25)` | Figma "Drop shadow" effect (X 0, Y 0, Blur 8, Spread 0, Black 25%) applied as a `drop-shadow` filter — conforms to the icon shape rather than boxing it. Used on the accent Easter egg icons and the About star |

## Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-control` | 8px | Nav bar, nav CTA, view-case-study button, mobile menu dropdown |
| `radius-card` | 16px | Case study image frames, gallery tiles, About photo, Contact card |
| `radius-pill` | 32px | Hover tags (Easter egg "Click me", toolkit names) |

## Layout

Implemented in [`src/components/app-shell.tsx`](../../src/components/app-shell.tsx).

| Property | Value |
|----------|-------|
| Nav inset | 16px (`shell-inset`) above and either side of the nav; page content is not inset by it |
| Shell layout | Vertical stack, viewport-locked (`h-dvh`) so nav stays in frame; `<main>` is the scroll region (16px side padding; 32px top/bottom on mobile, 64px from `md`) |
| Nav | Bordered, rounded (`radius-control`) bar — `surface-sunken` fill; left: name (links to `/`), right: Work / Gallery / About (anchor links to `/#work`, `/#gallery`, `/#about`) + Contact button (`/#contact`) |
| No footer | The clock lives inline under the home page intro; the Contact card closes the page |
| Home max width | 1200px (`max-w-home`) — intro, Work, About. Gallery and Contact run full width |
| Content max width | 800px (`max-w-content`) — intro heading |

## Home sections

| Section | Component | Notes |
|---------|-----------|-------|
| Intro | `page.tsx` + [`accent-easter-egg.tsx`](../../src/components/accent-easter-egg.tsx) | Headline + icons share a row (the icons sit in a reserved frame so they never overlap the text); stacks under 800px with the icons as a 40px row |
| Work | [`case-study-preview/`](../../src/components/case-study-preview/) | See below |
| Gallery | [`gallery-grid.tsx`](../../src/components/gallery/gallery-grid.tsx) | 1 → 2 (`md`) → 3 (`lg`) columns, 5:4 tiles, `object-cover` |
| About | [`about-section.tsx`](../../src/components/about/about-section.tsx) | 400px 4:5 photo in a `surface-sunken` card with the star (102px) breaking out of its top-right corner; bio, Qualifications, Typical Toolkit (48px icons, 16px gap, `HoverTag` names). Container query stacks it once the text column would drop under ~400px |
| Contact | [`contact-section.tsx`](../../src/components/contact/contact-section.tsx) | Full-width `surface-sunken` card: LinkedIn / Medium / Github, Email (mailto), Resume (downloads `public/files/juliet-gobran-cv.pdf`) |

## Case study preview (home page)

Implemented in [`src/components/case-study-preview/`](../../src/components/case-study-preview/):

- `case-study-preview.tsx` — top-level component. `flex-col-reverse` below `md` (image first, meta second on mobile/tablet), `md:flex-row` (meta left, image right) at `md+`
- `case-study-meta.tsx` — large meta component composing:
  - `case-study-header.tsx` — title, subtitle, url
  - `case-study-specs.tsx` — Role / Client / Scope / Industry / Completed rows (only rendered when the project JSON provides a value — `client`, `scope`, `industry`, `completed` are optional fields on top of the existing `role`)
  - `case-study-cta.tsx` — "View case study" button, links to `/projects/[slug]`
- `case-study-image-frame.tsx` — bordered, rounded, `surface-sunken` frame, no inner padding (image sits flush to the frame edges); `object-contain` so background-removed PNG exports sit inside without cropping

No dividers between home page case study previews — spacing is purely from `py-case-study-section-y` on each item's wrapper.

## Case study detail page

Route: [`src/app/projects/[slug]/page.tsx`](../../src/app/projects/[slug]/page.tsx). Components in [`src/components/case-study-detail/`](../../src/components/case-study-detail/). Every project now uses this `blocks`-driven template — there's no fallback layout.

| Component | Role |
|-----------|------|
| `case-study-detail-sidebar.tsx` | Sticky (`lg:sticky lg:top-0 lg:w-[400px]`) left column — header + reused `CaseStudySpecs` |
| `case-study-detail-header.tsx` | H1 title (48px, `text-4xl` below `lg`), subtitle, url |
| `case-study-content.tsx` | Maps `project.blocks` to `CaseStudySectionBlock` / `CaseStudyImageBlock`, in order |
| `case-study-section-block.tsx` | Heading (24px Jura Bold) + body paragraphs (`case-study-body` token, split on blank lines) |
| `case-study-image-block.tsx` | Bordered `radius-control` frame (no fixed aspect ratio — each image renders at its own proportions via real `width`/`height`), optional centered caption below |

Layout: single column below `lg`; at `lg+`, `lg:flex-row lg:justify-center` on the `<article>` puts the sticky sidebar beside the scrolling content, inside a `max-w-[1232px]` wrapper (400px sidebar + 32px gap + 800px content).

## Footer clock format

```
{h}:{mm}:{ss}{am/pm} {Day} {D} {Mon} {YYYY} | Wollongong, Australia
```

Example: `1:16:59pm Tue 23 Jun 2026 | Wollongong, Australia`

- Timezone: `Australia/Sydney` (covers Wollongong)
- Updates every second
- Implemented in [`src/components/wollongong-clock.tsx`](../../src/components/wollongong-clock.tsx) (`useSyncExternalStore`, hydration-safe)
- Now rendered inline under the home page intro heading, not in a footer

## Breakpoints

| Element | Mobile | Desktop (`md+`) |
|---------|--------|-----------------|
| Nav name | 24px (`text-2xl`) | 32px (`text-nav-name`) |
| Nav links, buttons | 16px (`text-base`) | 20px (`text-nav-link` / `text-case-study-button`) |
| Intro heading | 30px (`text-3xl`) | 40px (`text-intro-heading`) |
| Case study meta/image | Stacked, image first (`flex-col-reverse`) | Side by side (`flex-row`, meta left, fixed 400px) |

## Removed

- `GalaxyBackground` component, `useGalaxyCrossfade` hook, and `public/galaxy/*` assets — fully deleted, no background animation in the new design
- `MotionPreferenceProvider` / Motion toggle — nothing left to pause now that the background animation is gone
- Old `ProjectCard` component — replaced by `CaseStudyPreview`
- `fpm-app` and `tribe` projects (content JSON + images) — unmigrated, pre-redesign case studies
- Legacy project-detail layout: `src/components/project/*` (page header, content panel, image gallery, extra content, markdown renderer), the `react-markdown`/`remark-gfm` dependencies, the `content`/`images`/`extraContent` schema fields, the `project-title`/`project-body`/`project-meta`/`project-detail-body` tokens, `max-w-project`, and `.prose-project` — every project now uses the `blocks` template exclusively
