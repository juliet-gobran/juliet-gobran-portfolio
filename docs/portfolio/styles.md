# Styles

How the design tokens are applied in code. Token values and per-component breakdowns live in [design-tokens.md](design-tokens.md) — this file covers the conventions.

---

## Where styles live

- **Values:** CSS variables in [`src/styles/tokens.css`](../../src/styles/tokens.css).
- **Tailwind utilities:** the `@theme inline` block in [`src/app/globals.css`](../../src/app/globals.css) maps each token to a utility (e.g. `--color-surface-sunken` → `bg-surface-sunken`, `--spacing-shell-inset` → `mx-shell-inset`, `--font-size-case-study-title` → `text-case-study-title`).
- **Runtime accent:** `globals.css` also holds the `:root[data-accent="…"]` overrides that swap `cta-accent` / `cta-accent-dark` (see [design-tokens.md](design-tokens.md#accents-cta-buttons)).

**Rule:** use token-backed utilities. Don't hardcode hex values or magic numbers in components; add a token if something new is genuinely needed, and document it in [design-tokens.md](design-tokens.md).

---

## Typography

Fonts are loaded in [`src/app/layout.tsx`](../../src/app/layout.tsx) (Jura 400/700, Albert Sans 300/500):

- **Jura** — nav, headings, labels, buttons (`font-jura`, Bold for headings)
- **Albert Sans** — body copy, spec values, captions (`font-albert-sans`, Light)

Section headings on the home page use the shared [`SectionHeading`](../../src/components/section-heading.tsx) component rather than repeating the class string.

---

## Shared patterns

| Pattern | Where | Notes |
|---------|-------|-------|
| Surface card | Nav, case study image frames, gallery tiles, About photo, Contact card | `rounded-card` (or `rounded-control` for nav) `border border-border-subtle bg-surface-sunken` |
| Accent CTA | Contact button, "View case study" | `bg-cta-accent border-cta-accent-dark rounded-control` |
| Hover tag | Easter egg "Click me", toolkit icon names | [`HoverTag`](../../src/components/hover-tag.tsx) inside a `group` parent |
| Icon shadow | Accent icons, About star | `drop-shadow-surface` |
| Reveal on scroll | Home sections, case study blocks | [`RevealOnScroll`](../../src/components/reveal-on-scroll.tsx); respects `prefers-reduced-motion` and has a `<noscript>` fallback |
| Link hover | Nav links, Contact links, logo | `transition-opacity duration-300 ease-in-out hover:opacity-70` |

External links: `target="_blank"` + `rel="noopener noreferrer"`.

---

## Layout

- The app shell ([`app-shell.tsx`](../../src/components/app-shell.tsx)) is viewport-locked (`h-dvh`); `<main>` is the only scroll region, with `px-center-padding-x py-center-padding-y` and `motion-safe:scroll-smooth`.
- The nav sits `mx-shell-inset` (16px) in from each edge; page content runs to `<main>`'s 16px padding.
- Home sections either sit in the 1200px column (`mx-auto max-w-home`) — intro, Work, About — or run full width — Gallery, Contact.
- Breakpoints: Tailwind defaults (`md` 768, `lg` 1024) plus a custom `min-[800px]` for the intro/Easter-egg layout. The About row uses a container query (`@container` + `@[832px]:flex-row`) so it reacts to its own width, not the viewport's.
