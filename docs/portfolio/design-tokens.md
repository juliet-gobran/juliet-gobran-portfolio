# Design tokens

Extracted from Figma frame `593:4869` (Portfolio — light redesign). Update when Figma changes.

**Next.js implementation:** CSS variables in [`src/styles/tokens.css`](../../src/styles/tokens.css), Tailwind theme in [`src/app/globals.css`](../../src/app/globals.css). Style mapping: [styles.md](styles.md).

## Colors

| Token | Hex / value | Figma style | Usage |
|-------|-------------|--------------|-------|
| `background` | `#f9f6ef` | Home/Surface/Cream | Page background |
| `surface-sunken` | `#f5f1e9` | Home/Surface/Darker Cream | Nav bar fill, case study image frames; legacy "deep surface" panels (project detail content panel, image gallery) pending their own redesign |
| `surface-raised` | `#ffffff` | Home / Surface / White | Buttons (Contact, View case study) |
| `border-subtle` | `#e5e2db` | Home / Border / Subtle | 1px borders — nav, buttons, image frames, spec row dividers |
| `text-primary` | `#000000` | Home / Text / Black | Default body/heading text everywhere |
| `text-on-accent` | `#000000` | — | Text on orange pills (legacy project-detail meta pill) |
| `accent-orange` | `#d44e2e` | — (legacy, not in new design) | Project-detail meta pill, hover accents — pending redesign, not used by the new home page |

No background image/animation — the galaxy crossfade has been removed entirely.

## Typography

| Role | Font | Weight | Size | Figma style |
|------|------|--------|------|-------------|
| Nav name | Jura | SemiBold | 32px | Home / Heading / Brand |
| Nav links | Jura | Regular | 20px | Home / Label / Navigation |
| Nav/CTA buttons | Jura | SemiBold | 20px | Home / Label / Button |
| Intro heading | Jura | SemiBold | 40px (30px below `md`) | Home / Heading / Intro |
| Timestamp | Jura | Regular | 16px | Home / Caption / Timestamp |
| Case study title | Jura | SemiBold | 32px, line-height 1.15 | Home / Heading / Project |
| Case study body | Albert Sans | Light | 20px | Home / Body / Large |
| Case study url link | Albert Sans | Light | 16px, underline | Home / Link / Small |
| Case study spec label | Jura | SemiBold | 16px | Home / Label / Metadata |
| Case study spec value | Albert Sans | Light | 16px | Home / Body / Small |

Legacy project-detail typography (`project-title`, `project-body`, `project-meta`, `project-detail-body` tokens) is unchanged pending its own redesign — it now simply renders in the new light colors.

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `shell-inset` | 16px | Outer padding around the nav |
| `nav-padding-x` | 16px | Nav horizontal padding |
| `nav-padding-y` | 8px | Nav vertical padding |
| `center-padding-y` | 32px | Main content vertical padding |
| `center-padding-x` | 16px | Main content horizontal padding |
| `nav-link-gap` | 16px | Gap between nav items |
| `case-study-section-y` | 64px | Vertical padding around each case study preview (divider-separated) |

## Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-control` | 8px | Nav bar, nav CTA, view-case-study button, mobile menu dropdown |
| `radius-card` | 16px | Case study image frame; legacy mockup/content frames |
| `radius-pill` | 32px | Legacy orange meta pill |

## Layout

Implemented in [`src/components/app-shell.tsx`](../../src/components/app-shell.tsx).

| Property | Value |
|----------|-------|
| Outer inset | 16px (`shell-inset`) around the nav |
| Shell layout | Vertical stack, viewport-locked (`h-dvh`) so nav stays in frame; `<main>` is the scroll region |
| Nav | Bordered, rounded (`radius-control`) bar — `surface-sunken` fill; left: name, right: Work / Gallery / About (inert placeholders, no routing yet) + Contact button |
| No footer | The previous footer (clock + role) has been removed — the clock now lives inline under the home page intro |
| Home max width | 1200px (`max-w-home`) |
| Content max width | 800px (`max-w-content`) — intro heading |
| Project max width | 1920px (`max-w-project`) — unchanged, project detail page |

## Case study preview

Implemented in [`src/components/case-study-preview/`](../../src/components/case-study-preview/):

- `case-study-preview.tsx` — top-level component, lays out meta + image side by side (stacks on mobile)
- `case-study-meta.tsx` — large meta component composing:
  - `case-study-header.tsx` — title, subtitle, url
  - `case-study-specs.tsx` — Role / Client / Scope / Industry / Completed rows (only rendered when the project JSON provides a value — `client`, `scope`, `industry`, `completed` are optional fields on top of the existing `role`)
  - `case-study-cta.tsx` — "View case study" button, links to `/projects/[slug]`
- `case-study-image-frame.tsx` — bordered, rounded, `surface-sunken` frame; image rendered `object-contain` so background-removed PNG exports sit inside without cropping

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
| Case study meta/image | Stacked (`flex-col`) | Side by side (`flex-row`, meta fixed 400px) |

## Removed

- `GalaxyBackground` component, `useGalaxyCrossfade` hook, and `public/galaxy/*` assets — fully deleted, no background animation in the new design
- `MotionPreferenceProvider` / Motion toggle — nothing left to pause now that the background animation is gone
- Old `ProjectCard` component — replaced by `CaseStudyPreview`
