# Octave Design System

**One set of design tokens. A React library and a WordPress theme that never drift apart.**

Octave is a token-first component library for React and Next.js — and, from that same
source of truth, a complete WordPress block theme, hybrid theme, and block-plugin
styling layer. Define a color, a type step, or a spacing value once in
`c2b.config.json`, and every surface picks it up.

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
  stylesheet, enforced on every build by `size-limit`.

> **Status:** Octave is early-stage and actively being rebuilt. The token pipeline,
> build, and accessibility tooling are solid; the component catalogue is small and
> growing. See the [changelog](CHANGELOG.mdx) for what has landed.

Built with React 18 & 19, TypeScript 6, Vite 8, Storybook 10, and SCSS.

## Quick start

```bash
# Requires Node 22+ (see .nvmrc)
nvm use

pnpm install

# First time only: download Playwright browser binaries (used by pnpm test:storybook)
pnpm exec playwright install chromium

pnpm run dev           # Storybook at http://localhost:6006
```

## Scripts

| Command                    | Description                                                       |
| -------------------------- | ----------------------------------------------------------------- |
| `pnpm run dev`             | Run `c2b generate` then start Storybook dev server                |
| `pnpm run build`           | Vite library build + `c2b generate`                               |
| `pnpm run build-storybook` | Build static Storybook for deployment                             |
| `pnpm run c2b`             | Regenerate tokens, base styles, and WP theme files                |
| `pnpm run typecheck`       | TypeScript type checking (no emit)                                |
| `pnpm run lint`            | ESLint across `src/`                                              |
| `pnpm run lint:fix`        | ESLint with auto-fix                                              |
| `pnpm run format`          | Prettier write                                                    |
| `pnpm run format:check`    | Prettier check (no write)                                         |
| `pnpm run test`            | Vitest unit tests                                                 |
| `pnpm run test:watch`      | Vitest in watch mode                                              |
| `pnpm run test:storybook`  | Vitest + axe a11y checks across all stories (requires Playwright) |
| `pnpm run test:coverage`   | Vitest with coverage report                                       |
| `pnpm run size`            | Bundle size check against limits                                  |

## Formatting & code style

Formatting is enforced automatically so contributors don't create diffs based on
personal editor preferences:

- **EditorConfig** (`.editorconfig`) sets base whitespace rules (2-space indent, LF
  line endings, trimmed trailing whitespace) recognized by most editors.
- **Prettier** (`.prettierrc`) formats TS/TSX/SCSS/JSON/Markdown. `.prettierignore`
  excludes build output and generated files (`dist/`, `storybook-static/`,
  `src/styles/c2b/`, etc.).
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
  that commit (Prettier for TS/TSX/SCSS/JSON/MD, ESLint `--fix` for TS/TSX).
  It then runs the full `pnpm lint` and `pnpm typecheck` as a final check
  across the whole project. `.husky/pre-push` runs `pnpm test:storybook`.

Run `pnpm format` any time to format the whole project, or `pnpm format:check`
to verify formatting without writing changes.

## Project structure

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
  wordpress/                   # WordPress theme.json + stylesheets (generated)
```

## Package usage

### Next.js / modern frameworks

```tsx
// Import the full stylesheet once (tokens + globals + components)
import '@troychaplin/octave-design-system/styles.css';

// Import components
import { Button } from '@troychaplin/octave-design-system';
```

### WordPress block themes

Enqueue `dist/wordpress/block-theme.css` (or `hybrid-theme.css`) from the theme.
Token integration for the block editor is handled via the `theme.json` generated
into `dist/wordpress/` by `@troychaplin/component2block`.

### WordPress custom block plugins

Import per-component CSS in a block's stylesheets:

```scss
// block-name/src/editor.scss
@import '@troychaplin/octave-design-system/Button.css';
```

## Design tokens

Every CSS variable uses the `--octave--` prefix (double dash).

| Category       | What's in it                                                                                                                                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Colors**     | `accent-primary` and `accent-secondary`, an 11-step neutral ramp (`neutral-50` → `neutral-950`), semantic states (`info`, `success`, `warning`, `error`), and brand colors for seven social platforms |
| **Typography** | Three families (Inter Tight, Source Serif 4, JetBrains Mono), 16 fluid size steps, nine weights, three line heights                                                                                   |
| **Spacing**    | A 12-step scale from `3-x-small` to `5-x-large`, fluid from `small` upward                                                                                                                            |
| **Effects**    | Five shadow presets (natural, deep, sharp, outlined, crisp), five border radii, gradients                                                                                                             |
| **Layout**     | Content width (768px), wide width (1152px), small (600px), and full-bleed                                                                                                                             |

Browse them live in Storybook under **Stylebook**.

## Accessibility

Every Storybook story is tested against axe with `test: 'error'` — stories
that fail accessibility checks will not pass CI.

## Documentation

Storybook is the reference: **Getting Started** covers installation and framework
integration, **Stylebook** has live token demos, and every component ships its own
docs page with props, CSS classes, tokens, and accessibility notes.

For contributors, [`CONTRIBUTING.md`](CONTRIBUTING.md) is the entry point, and
[`AGENTS.md`](AGENTS.md) documents the conventions for AI-assisted work.

## Links

- [Source](https://github.com/troychaplin/octave-design-system)
- [Changelog](CHANGELOG.mdx)
