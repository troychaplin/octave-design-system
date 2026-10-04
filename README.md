# Octave Design System

**One set of design tokens. A React library and a WordPress theme that never drift apart.**

Octave is a token-first component library for React and Next.js — and, from that same
source of truth, a complete WordPress block theme, hybrid theme, and block-plugin
styling layer. Define a color, a type step, or a spacing value once in
`c2b.config.json`, and every surface picks it up.

Browse the components and tokens in the [live Storybook](https://troychaplin.github.io/octave-design-system/).

## Why Octave

- **One source of truth, two ecosystems.**
  [`@troychaplin/component2block`](https://www.npmjs.com/package/@troychaplin/component2block)
  compiles `c2b.config.json` into CSS custom properties (`--octave--*`), SCSS
  variables, base element styles, and a WordPress `theme.json` with matching editor
  styles. A React app and the WordPress Site Editor render the same design language
  because they read the same tokens — no parallel stylesheet to keep in sync by hand.
- **Fluid by default.** All 16 type steps are `clamp()` values that scale with the
  viewport, and the spacing scale goes fluid from `small` upward. Responsive
  typography without a stack of breakpoints.
- **No runtime, no lock-in.** Plain SCSS and CSS custom properties — no Tailwind, no
  CSS-in-JS, no provider to wrap your tree in. Per-component CSS is exported
  individually, so a WordPress block can ship only the styles it actually uses.
- **Accessibility is a build failure.** Every Storybook story runs through
  [axe](https://github.com/dequelabs/axe-core) at the `error` threshold, on every pull
  request and on pre-push. A violation blocks the merge — it isn't a warning someone
  triages later.
- **Deliberately small.** Budgeted at 25 kB for the JS bundle and 7 kB for the
  stylesheet, brotli-compressed. `pnpm size` checks both.

> **Status:** Octave is early-stage and actively being rebuilt. The token pipeline,
> build, and accessibility tooling are solid; the component catalogue is small and
> growing. See the [changelog](CHANGELOG.mdx) for what has landed.

Built with React 18 & 19, TypeScript 6, Vite 8, Storybook 10, and SCSS.

## Installation

```bash
npm install @troychaplin/octave-design-system
```

React and React DOM 18 or 19 are peer dependencies.

### React apps

Import the stylesheet once, where your app starts:

```tsx
import '@troychaplin/octave-design-system/styles.css';
```

Then use the components:

```tsx
import { Button, Container, Main } from '@troychaplin/octave-design-system';

export function Page() {
    return (
        <Main>
            <Container>
                <h1>Hello, Octave</h1>
                <Button text="Get started" href="/start" />
            </Container>
        </Main>
    );
}
```

`styles.css` has everything: the design tokens, base element styles, layout classes, every
component's CSS, and the `@font-face` rules for Inter Tight, Source Serif 4 and JetBrains Mono.
The font files ship with the package, and your bundler picks them up from the stylesheet. The
components don't import any CSS themselves, so this import is required.

#### Router links

`Button` with an `href`, and `SiteHeader`, render plain `<a>` links unless you wrap the app in
`LinkProvider` with your router's link component. That component receives standard anchor props,
including `href`:

```tsx
import { LinkProvider } from '@troychaplin/octave-design-system';

<LinkProvider component={Link}>
    <App />
</LinkProvider>;
```

Next.js's `Link` takes `href` as it is. React Router's `Link` expects `to`, so pass a wrapper
instead: `({ href = '', ...props }) => <Link to={href} {...props} />`.

#### Next.js App Router

Octave's components work in Server Components. `Button`, `SiteHeader` and `LinkProvider` use
React context, so they're marked `'use client'` and render as Client Components; every other
component renders on the server. A Server Component can't pass a function such as Next.js's `Link`
to a Client Component, so set up `LinkProvider` in a client providers file:

```tsx
// app/providers.tsx
'use client';

import Link from 'next/link';
import { LinkProvider } from '@troychaplin/octave-design-system';

export function Providers({ children }: { children: React.ReactNode }) {
    return <LinkProvider component={Link}>{children}</LinkProvider>;
}
```

```tsx
// app/layout.tsx
import '@troychaplin/octave-design-system/styles.css';
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
```

With the Pages Router, import the stylesheet and add `LinkProvider` in `pages/_app.tsx`.

### What the package ships

Every path below starts with `@troychaplin/octave-design-system`.

| Path                                    | Contents                                                                                 |
| --------------------------------------- | ---------------------------------------------------------------------------------------- |
| _(package root)_                        | Every React component, as ES modules and CommonJS, with TypeScript types                 |
| `/styles.css`                           | The full stylesheet: tokens, base styles, layout classes, every component, and the fonts |
| `/tokens.css`                           | The design tokens as `--octave--*` custom properties                                     |
| `/base-styles.css`                      | Element defaults for the body, headings, links and buttons                               |
| `/layout.css`                           | Layout classes that match WordPress's, such as `is-layout-constrained`                   |
| `/typography.css`                       | Spacing after headings                                                                   |
| `/fonts.css`                            | `@font-face` rules for the bundled fonts                                                 |
| `/tokens`                               | The token names as a JavaScript object, `octaveTokens`                                   |
| `/<Component>`                          | One component's JavaScript, such as `/Button`                                            |
| `/<Component>.css`                      | One component's CSS, such as `/Button.css`                                               |
| `/block-theme.css`, `/hybrid-theme.css` | Stylesheets for WordPress themes                                                         |

The WordPress theme files, `integrate.php` and `theme-octave.json`, are in `dist/wordpress/`, and
the font files are in `dist/fonts/`. Copy those by path.

### WordPress themes

`dist/wordpress/` has what a theme needs:

- `theme-octave.json` — the tokens as `theme.json` presets: the color palette and gradient, 16
  fluid font sizes, the three font families with their font files, the spacing scale, shadows,
  and the content and wide widths. It also sets default styles for text, headings, links, buttons
  and captions.
- `integrate.php` — loads `theme-octave.json` as WordPress's default `theme.json` layer, so your
  theme's own `theme.json` only needs to hold overrides.
- `block-theme.css` — for block themes: the tokens, the `.sr-only` utility and heading spacing.
- `hybrid-theme.css` — for hybrid themes with PHP templates: adds Octave's element defaults,
  layout classes and global styles.

To set up a theme:

1. Copy `integrate.php`, `theme-octave.json` and the stylesheet you need into one folder in your
   theme, such as `assets/octave/`. `integrate.php` looks for `theme-octave.json` next to itself.
2. Copy `dist/fonts/` to `assets/fonts/` in your theme, the path `theme-octave.json` gives for the
   font files.
3. Load everything from `functions.php`:

```php
require_once get_theme_file_path( 'assets/octave/integrate.php' );

add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style( 'octave', get_theme_file_uri( 'assets/octave/block-theme.css' ) );
} );

add_action( 'after_setup_theme', function () {
    add_editor_style( 'assets/octave/block-theme.css' );
} );
```

For a hybrid theme, use `hybrid-theme.css` in both places.

Octave is built locked, so `integrate.php` also stops the theme from changing the layout widths
and breakpoints, and turns off custom colors, gradients and duotone in the Site Editor.

### WordPress blocks

Each component's CSS is also published on its own, so a block can bundle just the styles for the
markup it renders. Component CSS reads the `--octave--*` custom properties, so the page needs the
tokens too: a theme set up as above already loads them, and otherwise the block should bundle
`tokens.css`.

With `@wordpress/scripts`, import them at the top of the block's `style.scss`, which loads in the
editor and on the front end:

```scss
// src/my-block/style.scss
@import '@troychaplin/octave-design-system/tokens.css';
@import '@troychaplin/octave-design-system/Button.css';
```

## Design tokens

Every CSS variable uses the `--octave--` prefix (double dash).

| Category       | What's in it                                                                                                                                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Colors**     | `accent-primary` and `accent-secondary`, an 11-step neutral ramp (`neutral-50` → `neutral-950`), semantic states (`info`, `success`, `warning`, `error`), and brand colors for seven social platforms |
| **Typography** | Three families (Inter Tight, Source Serif 4, JetBrains Mono), 16 fluid size steps, nine weights, three line heights                                                                                   |
| **Spacing**    | A 12-step scale from `3-x-small` to `5-x-large`, fluid from `small` upward                                                                                                                            |
| **Effects**    | Five shadow presets (natural, deep, sharp, outlined, crisp), five border radii, and a gradient                                                                                                        |
| **Layout**     | Content width (768px), wide width (1152px), small (600px), and full-bleed                                                                                                                             |

Browse them live in Storybook under **Stylebook**.

## Accessibility

Every Storybook story is tested against axe with `test: 'error'` — stories
that fail accessibility checks will not pass CI.

## Documentation

The [live Storybook](https://troychaplin.github.io/octave-design-system/) is the reference:
**Getting Started** covers installation and framework integration, **Stylebook** has live token
demos, and every component ships its own docs page with props, CSS classes, tokens, and
accessibility notes.

Contributor conventions — how to build a component's TSX, styles, stories and docs — are in
[`AGENTS.md`](AGENTS.md) and the [`build-component` skill](.claude/skills/build-component/SKILL.md).

## Developing Octave

```bash
# Requires Node 24+ (see .nvmrc)
nvm use

pnpm install

# First time only: download Playwright browser binaries (used by pnpm test:storybook)
pnpm exec playwright install chromium

pnpm run dev           # Storybook at http://localhost:6006
```

### Scripts

| Command                      | Description                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| `pnpm run dev`               | Run `c2b generate` then start Storybook dev server                                                  |
| `pnpm run build`             | Library build: ESM and CommonJS bundles, per-component files, types, tokens and the WordPress files |
| `pnpm run build-storybook`   | Build static Storybook for deployment                                                               |
| `pnpm run c2b`               | Regenerate tokens, base styles, and WP theme files                                                  |
| `pnpm run typecheck`         | TypeScript type checking (no emit)                                                                  |
| `pnpm run lint`              | ESLint across `src/`                                                                                |
| `pnpm run lint:fix`          | ESLint with auto-fix                                                                                |
| `pnpm run format`            | Prettier write across `src/` (TS, TSX, SCSS)                                                        |
| `pnpm run format:check`      | Prettier check across `src/` (no write)                                                             |
| `pnpm run test`              | Vitest: unit tests plus every story with axe checks (requires Playwright)                           |
| `pnpm run test:watch`        | Vitest in watch mode                                                                                |
| `pnpm run test:storybook`    | Every story with axe checks only (requires Playwright)                                              |
| `pnpm run test:coverage`     | Vitest with coverage report                                                                         |
| `pnpm run size`              | Check the JS bundle and stylesheet against their size budgets                                       |
| `pnpm run release <version>` | Changelog, version bump, commit and tag on main. Push the tag to publish to npm                     |

### Formatting & code style

Formatting is enforced automatically so contributors don't create diffs based on
personal editor preferences:

- **EditorConfig** (`.editorconfig`) sets base whitespace rules (4-space indent, LF
  line endings, trimmed trailing whitespace) recognized by most editors.
- **Prettier** (`.prettierrc`) formats TS/TSX/SCSS in `src/`, and JSON, Markdown and MDX
  files when they're committed. `.prettierignore` excludes build output and generated files
  (`dist/`, `storybook-static/`, `src/styles/c2b/`, etc.).
- **ESLint** (`eslint.config.mjs`) lints `src/` for code quality (React, hooks,
  jsx-a11y, Storybook rules), with `eslint-config-prettier` disabling any
  formatting rules that could conflict with Prettier.
- **VSCode workspace settings** (`.vscode/settings.json`, committed to the repo)
  set Prettier as the default formatter with format-on-save and ESLint
  auto-fix-on-save enabled. `.vscode/extensions.json` recommends the Prettier,
  ESLint, and EditorConfig extensions so VSCode prompts new contributors to
  install them.
- **`.gitattributes`** normalizes line endings to LF across operating systems.
- **Husky + lint-staged**: on every commit, `.husky/pre-commit` runs
  `lint-staged` first, which formats and auto-fixes only the files staged in
  that commit (Prettier for TS/TSX/SCSS/JSON/MD/MDX, ESLint `--fix` for TS/TSX).
  It then runs the full `pnpm lint` and `pnpm typecheck` as a final check
  across the whole project. `.husky/pre-push` runs `pnpm test:storybook`.

Run `pnpm format` to format everything in `src/`, or `pnpm format:check` to verify formatting
without writing changes.

### Project structure

```
c2b.config.json                # Design token definitions (source of truth)
src/
  index.ts                     # Package entry — component exports + global stylesheet
  components/                  # React components (co-located SCSS, stories, docs, types)
    tokens/                    # Runtime token export (octaveTokens)
  docs/                        # Storybook documentation pages
    getting-started/           # Install and framework integration guides
    stylebook/                 # Live token demos (colors, typography, spacing, effects)
  styles/
    main.scss                  # Consumer-facing stylesheet entry
    base/                      # Hand-authored globals (focus, selection, utilities)
    c2b/                       # Generated by c2b — never edit by hand
      octave-tokens.css        # CSS custom properties
      octave-base-styles.css   # Element defaults (body, h1–h6, links, buttons)
      octave-layout.css        # Layout and flow-spacing utilities
      octave-typography.css    # Heading flow spacing
      _octave-variables.scss   # SCSS variables + breakpoint mixins
    wordpress/                 # Block-theme and hybrid-theme SCSS entry points
dist/
  wordpress/                   # integrate.php, theme-octave.json, block- and hybrid-theme CSS
  fonts/                       # Font files used by styles.css and theme-octave.json
```

## Links

- [Storybook](https://troychaplin.github.io/octave-design-system/)
- [npm](https://www.npmjs.com/package/@troychaplin/octave-design-system)
- [Source](https://github.com/troychaplin/octave-design-system)
- [Changelog](CHANGELOG.mdx)
