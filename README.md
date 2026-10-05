<p align="center">
  <img src="./public/graphics/parlour-icon.svg" alt="Parlour logo: two scoops of ice cream melting over a bowl" width="140" />
</p>

<h1 align="center">Parlour</h1>

<p align="center">
  <strong>Scoop. Serve. Repeat.</strong>
</p>

<p align="center">
  A token-first UI kit for React and WordPress.<br />
  One set of tokens, every flavour.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@troychaplin/parlour-ui"><img src="https://img.shields.io/npm/v/@troychaplin/parlour-ui?color=c2185b&label=npm" alt="npm version" /></a>
  <a href="https://troychaplin.github.io/parlour-ui/"><img src="https://img.shields.io/badge/Storybook-live-8fb56a" alt="Live Storybook" /></a>
</p>

<p align="center">
  <a href="https://troychaplin.github.io/parlour-ui/"><strong>Browse the Storybook</strong></a> ·
  <a href="#get-a-scoop">Get started</a> ·
  <a href="#serve-it-in-wordpress">WordPress</a> ·
  <a href="CHANGELOG.mdx">Changelog</a>
</p>

---

## A palette cleanser for React and WordPress

You've built the same design twice before. Once in React, once in WordPress, and then spent months keeping two stylesheets from drifting apart.

Parlour ends that. You define your design once, as tokens, and Parlour serves it everywhere: a React component library, a Next.js app, a WordPress block theme, a hybrid theme, and the styles inside your custom blocks. Same colours, same type, same spacing. Not "close enough." The same.

## Scoop. Serve. Repeat.

**Scoop.** Take exactly what you need. Use the whole stylesheet, or scoop out a single component's CSS for a WordPress block that only ships the styles it actually uses.

**Serve.** One token file becomes CSS custom properties, SCSS variables, base element styles, and a WordPress `theme.json`, all generated together. React apps and the WordPress Site Editor read from the same source, so they always match.

**Repeat.** Change a token and every output updates on the next build. No parallel stylesheets, no copy-pasting hex codes, no "why is the button a different blue in WordPress?"

## What's on the menu

**One recipe, two kitchens.** Your design tokens live in a single file, `c2b.config.json`. [`@troychaplin/component2block`](https://www.npmjs.com/package/@troychaplin/component2block) compiles it into everything React and WordPress need, so both ecosystems render the same design language without anyone keeping them in sync by hand.

**Fluid from the first spoonful.** All 16 type steps are `clamp()` values that scale smoothly with the viewport, and the spacing scale goes fluid from `small` upward. Responsive typography without a stack of breakpoints.

**No runtime. No lock-in.** Plain SCSS and CSS custom properties. No Tailwind, no CSS-in-JS, no provider wrapping your whole app. Every component's CSS is published on its own, so you only serve what's on the plate.

**Accessibility isn't a topping, it's the base.** Every Storybook story is tested with [axe](https://github.com/dequelabs/axe-core) at the `error` threshold, on every pull request and before every push. An accessibility violation blocks the merge. It's never a warning someone gets to later.

**A light dessert.** Budgeted at 25 kB for the JavaScript and 7 kB for the stylesheet, brotli-compressed, and checked on every build with `pnpm size`.

**Server Components welcome.** Most components render on the server in the Next.js App Router. Only the few that need React context are client components.

**Fresh ingredients.** Built with React 18 and 19, TypeScript 6, Vite 8, Storybook 10, and SCSS.

> **Fresh out of the churn.** Parlour is early-stage and moving quickly. The token pipeline, build, and accessibility tooling are solid; the component catalogue is small and growing every release. See the [changelog](CHANGELOG.mdx) for what's landed.

## Coming soon to the counter

**Flavours.** Full colour patterns you can switch between, not just light and dark. Pick a flavour and the whole site, in React and WordPress, follows.

**Your own recipe.** Enter your own brand variables and let Parlour generate everything else: tokens, base styles, and WordPress theme files.

**Saved templates.** Keep your recipes and reuse them across projects, from React apps to WordPress themes and beyond.

---

## Get a scoop

```bash
npm install @troychaplin/parlour-ui
```

React and React DOM 18 or 19 are peer dependencies.

### Serve it in React

Import the stylesheet once, where your app starts:

```tsx
import '@troychaplin/parlour-ui/styles.css';
```

Then build with the components:

```tsx
import { Button, Container, Main } from '@troychaplin/parlour-ui';

export function Page() {
    return (
        <Main>
            <Container>
                <h1>Hello, Parlour</h1>
                <Button text="Get started" href="/start" />
            </Container>
        </Main>
    );
}
```

`styles.css` is the full sundae: design tokens, base element styles, layout classes, every component's CSS, and the `@font-face` rules for Inter Tight, Source Serif 4, and JetBrains Mono. The font files ship with the package and your bundler picks them up automatically. Components don't import their own CSS, so this one import is required.

#### Router links

`Button` with an `href`, and `SiteHeader`, render plain `<a>` links unless you wrap your app in `LinkProvider` with your router's link component. That component receives standard anchor props, including `href`:

```tsx
import { LinkProvider } from '@troychaplin/parlour-ui';

<LinkProvider component={Link}>
    <App />
</LinkProvider>;
```

Next.js's `Link` takes `href` as-is. React Router's `Link` expects `to`, so pass a small wrapper instead: `({ href = '', ...props }) => <Link to={href} {...props} />`.

### Serve it in Next.js

Parlour works in Server Components. `Button`, `SiteHeader`, and `LinkProvider` use React context, so they're marked `'use client'`; everything else renders on the server. Since a Server Component can't pass a function like Next.js's `Link` to a Client Component, set up `LinkProvider` in a client providers file:

```tsx
// app/providers.tsx
'use client';

import Link from 'next/link';
import { LinkProvider } from '@troychaplin/parlour-ui';

export function Providers({ children }: { children: React.ReactNode }) {
    return <LinkProvider component={Link}>{children}</LinkProvider>;
}
```

```tsx
// app/layout.tsx
import '@troychaplin/parlour-ui/styles.css';
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

Using the Pages Router? Import the stylesheet and add `LinkProvider` in `pages/_app.tsx`.

### Serve it in WordPress

`dist/wordpress/` has everything a theme needs:

- **`theme-parlour.json`** turns the tokens into `theme.json` presets: the colour palette and gradient, 16 fluid font sizes, the three font families with their font files, the spacing scale, shadows, and content and wide widths. It also sets default styles for text, headings, links, buttons, and captions.
- **`integrate.php`** loads `theme-parlour.json` as WordPress's default `theme.json` layer, so your theme's own `theme.json` only needs to hold overrides.
- **`block-theme.css`** is for block themes: the tokens, the `.sr-only` utility, and heading spacing.
- **`hybrid-theme.css`** is for hybrid themes with PHP templates, adding Parlour's element defaults, layout classes, and global styles.

To set up a theme:

1. Copy `integrate.php`, `theme-parlour.json`, and the stylesheet you need into one folder in your theme, such as `assets/parlour/`. `integrate.php` looks for `theme-parlour.json` next to itself.
2. Copy `dist/fonts/` to `assets/fonts/` in your theme, which is the path `theme-parlour.json` uses for the font files.
3. Load everything from `functions.php`:

```php
require_once get_theme_file_path( 'assets/parlour/integrate.php' );

add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style( 'parlour', get_theme_file_uri( 'assets/parlour/block-theme.css' ) );
} );

add_action( 'after_setup_theme', function () {
    add_editor_style( 'assets/parlour/block-theme.css' );
} );
```

For a hybrid theme, use `hybrid-theme.css` in both places.

Parlour is built locked, so `integrate.php` also stops the theme from changing layout widths and breakpoints, and turns off custom colours, gradients, and duotone in the Site Editor. Your design stays on-brand, no matter who's editing.

### Serve it in custom blocks

Every component's CSS is published on its own, so a block can bundle just the styles for the markup it renders. Component CSS reads the `--parlour--*` custom properties, so the page needs the tokens too: a theme set up as above already loads them; otherwise, bundle `tokens.css` with the block.

With `@wordpress/scripts`, import them at the top of the block's `style.scss`, which loads in both the editor and on the front end:

```scss
// src/my-block/style.scss
@import '@troychaplin/parlour-ui/tokens.css';
@import '@troychaplin/parlour-ui/Button.css';
```

## What comes in the box

Every path below starts with `@troychaplin/parlour-ui`.

| Path                                    | Contents                                                                                 |
| --------------------------------------- | ---------------------------------------------------------------------------------------- |
| _(package root)_                        | Every React component, as ES modules and CommonJS, with TypeScript types                 |
| `/styles.css`                           | The full stylesheet: tokens, base styles, layout classes, every component, and the fonts |
| `/tokens.css`                           | The design tokens as `--parlour--*` custom properties                                    |
| `/base-styles.css`                      | Element defaults for the body, headings, links, and buttons                              |
| `/layout.css`                           | Layout classes that match WordPress's, such as `is-layout-constrained`                   |
| `/typography.css`                       | Spacing after headings                                                                   |
| `/fonts.css`                            | `@font-face` rules for the bundled fonts                                                 |
| `/tokens`                               | The token names as a JavaScript object, `parlourTokens`                                  |
| `/<Component>`                          | One component's JavaScript, such as `/Button`                                            |
| `/<Component>.css`                      | One component's CSS, such as `/Button.css`                                               |
| `/block-theme.css`, `/hybrid-theme.css` | Stylesheets for WordPress themes                                                         |

The WordPress theme files (`integrate.php` and `theme-parlour.json`) are in `dist/wordpress/`, and the font files are in `dist/fonts/`. Copy those by path.

## The ingredients

Every CSS variable uses the `--parlour--` prefix (double dash).

| Category       | What's in it                                                                                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Colours**    | `accent-primary` and `accent-secondary`, an 11-step neutral ramp (`neutral-50` → `neutral-950`), semantic states (`info`, `success`, `warning`, `error`), and brand colours for seven social platforms |
| **Typography** | Three families (Inter Tight, Source Serif 4, JetBrains Mono), 16 fluid size steps, nine weights, three line heights                                                                                    |
| **Spacing**    | A 12-step scale from `3-x-small` to `5-x-large`, fluid from `small` upward                                                                                                                             |
| **Effects**    | Five shadow presets (natural, deep, sharp, outlined, crisp), five border radii, and a gradient                                                                                                         |
| **Layout**     | Content width (768px), wide width (1152px), small (600px), and full-bleed                                                                                                                              |

Taste them all live in the Storybook under **Stylebook**.

## The menu (documentation)

The [live Storybook](https://troychaplin.github.io/parlour-ui/) is the full menu. **Getting Started** covers installation and framework setup, **Stylebook** has live token demos, and every component has its own docs page with props, CSS classes, tokens, and accessibility notes.

---

## Behind the counter

Want to help make Parlour? Contributor conventions (how to build a component's TSX, styles, stories, and docs) are in [`AGENTS.md`](AGENTS.md) and the [`build-component` skill](.claude/skills/build-component/SKILL.md).

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
| `pnpm run dev`               | Run `c2b generate` then start the Storybook dev server                                              |
| `pnpm run build`             | Library build: ESM and CommonJS bundles, per-component files, types, tokens and the WordPress files |
| `pnpm run build-storybook`   | Build static Storybook for deployment                                                               |
| `pnpm run c2b`               | Regenerate tokens, base styles, and WordPress theme files                                           |
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

### Keeping the kitchen clean

Formatting is enforced automatically, so nobody's diffs are about personal editor preferences:

- **EditorConfig** (`.editorconfig`) sets base whitespace rules: 4-space indent, LF line endings, and trimmed trailing whitespace.
- **Prettier** (`.prettierrc`) formats TS, TSX, and SCSS in `src/`, plus JSON, Markdown, and MDX files when they're committed. `.prettierignore` excludes build output and generated files (`dist/`, `storybook-static/`, `src/styles/c2b/`, and so on).
- **ESLint** (`eslint.config.mjs`) lints `src/` for code quality (React, hooks, jsx-a11y, and Storybook rules), with `eslint-config-prettier` turning off any formatting rules that could conflict with Prettier.
- **VS Code workspace settings** (`.vscode/settings.json`) set Prettier as the default formatter with format-on-save and ESLint auto-fix-on-save. `.vscode/extensions.json` recommends the Prettier, ESLint, and EditorConfig extensions to new contributors.
- **`.gitattributes`** normalizes line endings to LF across operating systems.
- **Husky and lint-staged** run on every commit: `lint-staged` formats and auto-fixes only the staged files, then the full `pnpm lint` and `pnpm typecheck` run as a final check. `.husky/pre-push` runs `pnpm test:storybook`.

Run `pnpm format` to format everything in `src/`, or `pnpm format:check` to check formatting without writing changes.

### Project structure

```
c2b.config.json                # Design token definitions (source of truth)
src/
  index.ts                     # Package entry — component exports + global stylesheet
  components/                  # React components (co-located SCSS, stories, docs, types)
    tokens/                    # Runtime token export (parlourTokens)
  docs/                        # Storybook documentation pages
    getting-started/           # Install and framework integration guides
    stylebook/                 # Live token demos (colours, typography, spacing, effects)
  styles/
    main.scss                  # Consumer-facing stylesheet entry
    base/                      # Hand-authored globals (focus, selection, utilities)
    c2b/                       # Generated by c2b — never edit by hand
      parlour-tokens.css       # CSS custom properties
      parlour-base-styles.css  # Element defaults (body, h1–h6, links, buttons)
      parlour-layout.css       # Layout and flow-spacing utilities
      parlour-typography.css   # Heading flow spacing
      _parlour-variables.scss  # SCSS variables + breakpoint mixins
    wordpress/                 # Block-theme and hybrid-theme SCSS entry points
dist/
  wordpress/                   # integrate.php, theme-parlour.json, block- and hybrid-theme CSS
  fonts/                       # Font files used by styles.css and theme-parlour.json
```

---

<p align="center">
  <a href="https://troychaplin.github.io/parlour-ui/">Storybook</a> ·
  <a href="https://www.npmjs.com/package/@troychaplin/parlour-ui">npm</a> ·
  <a href="https://github.com/troychaplin/parlour-ui">Source</a> ·
  <a href="CHANGELOG.mdx">Changelog</a>
</p>

<p align="center">
  <strong>Scoop. Serve. Repeat.</strong> 🍨
</p>
