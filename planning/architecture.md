# Octave layout architecture — SiteHeader, SiteFooter, and the landmark hierarchy

## Context

`src/templates/PageLayout.stories.tsx` is a stub with an empty `<header></header>` — the user
started composing a full-page template, found nothing in the library to put in the header, and
left the tag open. `.storybook/preview.ts` was then pruned from nine Storybook categories to six,
but `Navigation` was deliberately kept despite having zero components. Both are the same signal:
the site chrome is the next thing to build.

Octave today has the _inside_ of the page (`Body`, `Main`, `Section`, `Column`, `Article`, `Aside`)
and none of the chrome around it. This plan defines the component hierarchy for that chrome and
the rules governing how every piece nests, so the pieces built next fit a deliberate structure
rather than accreting one.

No implementation here — this is the architecture, agreed before code.

## Decisions taken

| Decision    | Choice                              | Why                                                                                                                                                               |
| ----------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Naming      | `SiteHeader` / `SiteFooter`         | Symmetric, and protects `PageHeader` — in Primer, Ant Design and Atlassian that name means the in-content title block, which is a separate component in this plan |
| Category    | `Components/Template Parts/`        | WordPress's canonical template parts _are_ header/footer/sidebar, and it keeps every document landmark in one family                                              |
| Composition | Compound sub-components             | Matches the existing `Column` / `Column.Content` precedent                                                                                                        |
| Scope       | Chrome + nav widgets + `PageHeader` | The broader API audit was descoped; only the one blocking gap is carried below                                                                                    |

## The organizing principle

**Template Parts are document landmarks. Navigation components are wayfinding widgets that live
inside them.** Every future component sorts cleanly under one rule or the other.

| Component    | Element               | ARIA landmark              | Category       |
| ------------ | --------------------- | -------------------------- | -------------- |
| `Body`       | `<body>`              | — (document root)          | Template Parts |
| `SiteHeader` | `<header>`            | **banner**                 | Template Parts |
| `Main`       | `<main>`              | **main**                   | Template Parts |
| `Article`    | `<article>`           | — (sectioning)             | Template Parts |
| `Aside`      | `<aside>`             | **complementary**          | Template Parts |
| `SiteFooter` | `<footer>`            | **contentinfo**            | Template Parts |
| `Nav`        | `<nav>`               | **navigation**             | Navigation     |
| `SkipLink`   | `<a>`                 | —                          | Navigation     |
| `Section`    | `<section>` / `<div>` | —                          | Layout         |
| `Column`     | `<div>`               | —                          | Layout         |
| `PageHeader` | `<header>`            | — (**generic**, see below) | Content        |

The load-bearing detail is the last row. `<header>` and `<footer>` map to the banner and
contentinfo landmarks **only when they are not descendants of** `<article>`, `<aside>`, `<main>`,
`<nav>` or `<section>`. Nested, they are generic. That is exactly why one page can carry both a
`SiteHeader` (top level → banner) and a `PageHeader` (inside `Main` → generic) without ever
producing two banners. The same rule makes `<article><footer>` safe for post meta.

## The hierarchy

```
Body                                    <body>
├── SkipLink                            <a href="#main">              ← first focusable element
├── SiteHeader                          <header>  role=banner         ← exactly one, top level
│   ├── SiteHeader.Brand                <div> (or <h1>) + link
│   ├── SiteHeader.Nav                  <div> layout zone
│   │   └── Nav                         <nav aria-label="Main"> + <ul>
│   └── SiteHeader.Actions              <div>
│       └── Button / ButtonGroup / search / theme toggle
│
├── Main  id="main"                     <main>   role=main            ← exactly one
│   ├── PageHeader                      <header> generic — NOT banner ← optional
│   │   ├── PageHeader.Breadcrumbs      <nav aria-label="Breadcrumb">
│   │   ├── PageHeader.Title            <h1>
│   │   ├── PageHeader.Lede             <p>
│   │   └── PageHeader.Actions          <div>
│   │
│   └── Section …                       <section>  width band + background
│       ├── Article                     <article>
│       └── Column                      <div> grid
│           ├── Column.Content          <div>
│           │   └── Article             <article>
│           └── Aside                   <aside> role=complementary
│
└── SiteFooter                          <footer> role=contentinfo     ← exactly one, top level
    ├── SiteFooter.Nav                  <div> layout zone
    │   └── Nav                         <nav aria-label="Footer"> + <ul>
    ├── SiteFooter.Social               <div>  (SocialLinks widget is future work)
    └── SiteFooter.Meta                 <div>  copyright, legal
```

`SiteHeader` and `SiteFooter` are **siblings of `Main`, never children** — nesting either inside
`Main` silently downgrades it from a landmark to a generic element.

## Why the nav zones are plain `<div>`s

`SiteHeader.Nav` is a _layout zone_, not a `<nav>`. The `Nav` widget renders its own
`<nav aria-label="…">` wrapper, so it is correct wherever it is dropped — header, footer, sidebar —
without a consumer needing to know it must be wrapped. The alternative (zone owns the `<nav>`,
widget renders a bare `<ul>`) produces marginally tighter DOM but leaves `Nav` broken when used
standalone. For a design system whose consumers include WordPress theme authors who will not read
the docs, the safe default wins; the extra wrapper `<div>` costs nothing.

## Component APIs

Follow the house conventions found in the existing code: array-`filter`-`join` class construction,
capitalized-local polymorphism (`const Wrapper = as;`), `Object.assign` for compound components
with explicit `displayName` on every part, prop unions derived from `src/utils/propClasses.tsx` via
`keyof typeof`, and `undefined` rather than `''` for absent classes.

### `SiteHeader` — `src/components/SiteHeader/`

```tsx
interface SiteHeaderProps {
    children: React.ReactNode;
    as?: 'header' | 'div'; // default 'header'
    isSticky?: boolean; // default false
    hasBorder?: boolean; // default true
    bgType?: 'white' | 'neutral' | 'transparent';
    maxWidth?: 'aligncontent' | 'alignwide' | 'alignfull'; // outer band, default 'alignfull'
    contentWidth?: 'aligncontent' | 'alignwide' | 'alignfull'; // inner, default 'alignwide'
}
```

Mirror `Section`'s **two-layer width model exactly** (`src/components/Section/Section.tsx`): the
root takes the band width and the background, an always-rendered inner `<div>` takes
`has-global-padding` + `contentWidth`. This is the established mechanism for a full-bleed band with
constrained content, and reusing it means `SiteHeader` inherits the gutter and break-out behaviour
in `src/styles/c2b/octave-layout.css` for free.

Sub-components: `.Brand`, `.Nav`, `.Actions` — three-zone flex, brand at start, actions at end.

### `SiteHeader.Brand`

```tsx
interface SiteHeaderBrandProps {
    children: React.ReactNode; // logo mark, wordmark, or both
    href?: string; // default '/'
    as?: 'div' | 'h1'; // default 'div'
}
```

**Must consume `useLinkContext`** from `src/components/LinkProvider/` so the brand link routes
through Next.js `<Link>` when a consumer has wrapped the app in `LinkProvider`. `Badge`
(`src/components/Badge/Badge.tsx:25`) is the existing precedent and the only current consumer —
this doubles that count and is exactly what the provider was built for.

`as` defaults to `div`, not `h1`: when a page carries a `PageHeader.Title`, that title is the `h1`.
Reserve `as="h1"` for a homepage with no other title.

### `Nav` — `src/components/Nav/`

```tsx
interface NavItem {
    label: string;
    href: string;
    isCurrent?: boolean;
    children?: NavItem[]; // one level of submenu
}

interface NavProps {
    items: NavItem[];
    ariaLabel: string; // required — see below
    orientation?: 'horizontal' | 'vertical'; // default 'horizontal'
}
```

`ariaLabel` is **required, not optional**. A page will carry at least three navigation landmarks
(header, footer, breadcrumbs); unlabelled duplicates are an axe `landmark-unique` failure. Making
it required makes the failure impossible rather than merely documented.

Renders `aria-current="page"` on the current item per ARIA APG. Consumes `useLinkContext`.

### `SkipLink` — `src/components/SkipLink/`

```tsx
interface SkipLinkProps {
    href?: string; // default '#main'
    children?: React.ReactNode; // default 'Skip to main content'
}
```

WCAG 2.4.1 Bypass Blocks. Visually hidden until focused — position off-screen and reveal on
`:focus-visible`; never `display: none`, which removes it from the tab order entirely.

### `SiteFooter` — `src/components/SiteFooter/`

Same prop shape as `SiteHeader` minus `isSticky`. Sub-components `.Nav`, `.Social`, `.Meta`.

`.Social` is a layout zone only for now — the `SocialLinks` widget that fills it is future work,
but the tokens are already in place: `c2b.config.json` defines brand colors for `linkedin`,
`facebook`, `bluesky`, `twitter`, `instagram`, `youtube` and `tiktok`.

### `PageHeader` — `src/components/PageHeader/`

Compound, consistent with the chrome components: `.Breadcrumbs`, `.Title`, `.Lede`, `.Actions`.
Renders `<header>` — generic, because it is inside `<main>`. Lives under `Components/Content/`
rather than Template Parts, since it is not a landmark. That placement is a judgment call worth
revisiting if it starts accumulating structural props.

## Nesting rules to encode in the docs

These are the constraints a consumer can violate silently, so each belongs in the relevant
`Docs.mdx` **Accessibility** section:

1. **One banner, one main, one contentinfo per page.** One `SiteHeader`, one `Main`, one `SiteFooter`.
2. **`SiteHeader` and `SiteFooter` are siblings of `Main`.** Nesting either inside `Main` downgrades it to a generic element.
3. **`PageHeader` goes inside `Main`** — that nesting is what keeps it from becoming a second banner.
4. **Every `<nav>` needs a distinguishing label.** Enforced by making `Nav`'s `ariaLabel` required.
5. **`SkipLink` is the first focusable element in the document** and targets `Main`.
6. **Heading order:** `SiteHeader.Brand` should not be an `h1` when `PageHeader.Title` is present.
7. **`Aside` inside `Column` trips axe's `landmark-complementary-is-top-level`.** This is a real, pre-existing tension — `src/components/Aside/Aside.stories.tsx` already disables the rule. Keep the disable, and document _why_ rather than letting each new story rediscover it.

## One blocking prerequisite

`SkipLink href="#main"` requires `<Main id="main">`. `Main` currently accepts only `children`,
`as`, `hasPadding` and `className` — **no `id`, and no `...rest`** (`src/components/Main/Main.tsx`).
No layout component in the library spreads `...rest`.

Two ways forward, and this needs deciding before `SkipLink` is built:

- **Add `...rest` to `Main`** — the general fix, consistent with the house convention in
  `.claude/skills/build-component/references/tsx.md` ("spread `...rest` so consumers can pass or
  override ARIA and HTML attributes"), and it unblocks `aria-label` on `Section` and `Aside` too,
  which those components' own docs already (incorrectly) claim works.
- **Hardcode `id="main"` on `Main`** — smaller, but bakes in a magic string and leaves the broader
  gap in place.

Recommend the first. The wider `...rest` audit across `Section`, `Column`, `Article` and `Aside`
was descoped from this plan; only `Main` blocks the work here.

## File organization

Each component follows the canonical folder shape from
`.claude/skills/build-component/SKILL.md`, with sub-components as sibling files — the pattern
`Column` already uses (`ColumnContent.tsx` beside `Column.tsx`):

```
src/components/SiteHeader/
├── SiteHeader.tsx           # root + Object.assign(SiteHeader, { Brand, Nav, Actions })
├── SiteHeaderBrand.tsx
├── SiteHeaderNav.tsx
├── SiteHeaderActions.tsx
├── SiteHeader.stories.tsx
├── Docs.mdx
├── index.ts
└── styles.scss
```

Same shape for `SiteFooter/` and `PageHeader/`; `Nav/` and `SkipLink/` are single-component folders.

**Exports** — `src/index.ts`, extending the existing comment-heading groups, alphabetical within
each. Note the existing file exports prop types for `Badge` and `Figure` only; export the new
`*Props` types too, since consumers composing layouts will need them.

```ts
// Template Parts
export { Article } from './components/Article/Article';
export { Aside } from './components/Aside/Aside';
export { Body } from './components/Body/Body';
export { Main } from './components/Main/Main';
export { SiteFooter, type SiteFooterProps } from './components/SiteFooter/SiteFooter';
export { SiteHeader, type SiteHeaderProps } from './components/SiteHeader/SiteHeader';

// Navigation
export { Nav, type NavItem, type NavProps } from './components/Nav/Nav';
export { SkipLink } from './components/SkipLink/SkipLink';
```

**Story titles** (multi-word names are spaced, per the taxonomy):

| Component    | Title                                   |
| ------------ | --------------------------------------- |
| `SiteHeader` | `Components/Template Parts/Site Header` |
| `SiteFooter` | `Components/Template Parts/Site Footer` |
| `Nav`        | `Components/Navigation/Nav`             |
| `SkipLink`   | `Components/Navigation/Skip Link`       |
| `PageHeader` | `Components/Content/Page Header`        |

## Tokens to add

- **`--octave--layout-header-height`** — needed by the sticky header, by `scroll-margin-top` on
  anchor targets, and by `Aside`'s sticky offset. `Aside.topSpace` is a raw `number` of pixels
  today (`src/components/Aside/Aside.tsx`), which cannot track a header whose height changes
  responsively. A token lets both read the same value.
- **A z-index token for the sticky header.** `c2b.config.json` has generic `zIndex` values
  (`100`, `200`, `500`).

Note: `c2b.config.scss` at the repo root drafts `--octave--z-header: 100` and a commented-out
`--header-height: 4rem`, but it is **dead scratch** — referenced by nothing, and using an older
`--octave--color--white` double-dash convention that does not match the generated tokens. Treat it
as intent, not as a source. All real tokens come from `c2b.config.json` via `npm run c2b`.

## Build order

1. **`SkipLink`** — smallest, and forces the `Main` `...rest` decision before anything depends on it.
2. **`Nav`** — needed by both header and footer; build once, use twice.
3. **`SiteHeader`** + `.Brand` / `.Nav` / `.Actions`.
4. **`SiteFooter`** + `.Nav` / `.Social` / `.Meta`.
5. **`PageHeader`** + its four regions.
6. **Fill in `src/templates/PageLayout.stories.tsx`** — replace the empty `<header></header>` with
   the real composition. This story becomes the integration test for the whole hierarchy.

## Verification

Run Storybook and check the composed template, not just the isolated components:

```bash
pnpm run dev
```

- **`Overview/Templates/PageLayout`** renders the full tree: SkipLink → SiteHeader → Main → SiteFooter.
- **Keyboard:** Tab from a cold load reveals the skip link first; activating it moves focus into `Main`. Tab order through header brand → nav → actions is visually sequential.
- **Landmarks:** run the a11y panel on the template story and confirm `landmark-one-main`,
  `landmark-banner-is-top-level`, `landmark-contentinfo-is-top-level`, `landmark-unique` and
  `region` all pass, with no rule disables on the template story beyond the documented
  `landmark-complementary-is-top-level`.
- **Sticky:** with `isSticky`, the header pins and a `Section` scrolling beneath it is not occluded
  at anchor targets.
- **Responsive:** check at both real breakpoints — `src/styles/c2b/_octave-variables.scss` defines
  only `600px` (mobile) and `768px` (tablet) as mixins. The `sm/md/lg/xl` scale in
  `Column/Docs.mdx` and `references/styles.md` is stale; do not follow it.

Full CI gate:

```bash
pnpm run typecheck && pnpm run lint && pnpm run test:storybook
```

## Two unrelated fixes worth folding in while here

- **`Overview/Templates` is missing from `storySort`.** `.storybook/preview.ts` lists only
  `About Octave`, `Changelog`, `Getting Started`, `Stylebook` under `Overview`, so `Templates`
  falls through to the `'*'` bucket and sorts unpredictably.
- **`src/styles/wordpress/*.scss` has broken imports.** Both `block-theme.scss` and
  `hybrid-theme.scss` `@use '../c2b/base-*'` — five partials that exist only in `dist/styles/`, not
  in `src/styles/c2b/`. The real sources are at `src/styles/base/`, which is what `main.scss`
  correctly uses. `pnpm build` should be failing at `scripts/build-wordpress-scss.mjs`, or the
  `dist/wordpress/*.css` on disk are stale artifacts.
