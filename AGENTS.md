# AGENTS.md — Octave Design System AI Agent Guide

Detailed, per-part build conventions live in the **`build-component` skill** at
[`.claude/skills/build-component/`](.claude/skills/build-component/). When this file and the skill
disagree, the skill wins.

| Scope                            | Reference                                              |
| -------------------------------- | ------------------------------------------------------ |
| Building any part of a component | `.claude/skills/build-component/SKILL.md`              |
| `src/components/**/*.tsx`        | `.claude/skills/build-component/references/tsx.md`     |
| `**/*.scss`                      | `.claude/skills/build-component/references/styles.md`  |
| `**/*.stories.tsx`               | `.claude/skills/build-component/references/stories.md` |
| `**/Docs.mdx`                    | `.claude/skills/build-component/references/docs.md`    |

---

## Project overview

**@troychaplin/octave-design-system** — a token-driven React component library.

- **Build:** Vite library mode (ESM + CJS), TypeScript 7, pnpm
- **Runtime:** React 18+, SCSS + CSS custom properties (no Tailwind)
- **Testing:** Storybook 10 + Vitest + Playwright; axe a11y at `"error"` threshold
- **Tokens:** `@troychaplin/component2block` generates `src/styles/c2b/octave-tokens.*` and `_octave-variables.scss` from `c2b.config.json` — **never edit these files by hand**

---

## Common commands

```sh
pnpm start              # start Storybook dev server
pnpm typecheck          # tsc --noEmit
pnpm lint               # ESLint over src/
pnpm lint:fix           # ESLint with --fix
pnpm test               # Vitest unit tests
pnpm test:storybook     # all stories + axe a11y (requires Node 24+)
pnpm build              # Vite library build
pnpm c2b                # regenerate tokens + variables
```

**Before committing:** `pnpm typecheck && pnpm lint && pnpm test:storybook` must all pass.

---

## Adding a new component

Follow the `build-component` skill. In short:

1. Create `src/components/Foo/` with `Foo.tsx`, `styles.scss`, `index.ts`, `Foo.stories.tsx`, `Docs.mdx`
2. Add `export { Foo } from './components/Foo';` to `src/index.ts`
3. Add a `## [Unreleased]` entry to `CHANGELOG.mdx` with the `_Added_` prefix

`vite.config.components.ts` auto-discovers component directories that have an `index.ts` — no
config update needed, but a missing barrel file silently drops the component from the build.

---

## Code conventions

- **No React import** unless using its APIs directly (automatic JSX transform)
- **No empty fragments** — avoid `<></>` when a single root element works
- **`undefined` not `''`** for conditional `className` — prevents `class=""` in the DOM
- **Early returns** over ternaries for branching render logic
- **No dead code** — remove commented-out code; never leave `// TODO` stubs
- **BEM class prefix:** `octave-` (e.g. `octave-badge`, `octave-badge--success`, `octave-badge__icon`)
- **CSS tokens:** `var(--octave--*)` — never hardcode colors, sizes, or font stacks

---

## SCSS

- All visual values from `--octave--*` tokens — see `src/styles/c2b/octave-tokens.css`
- Breakpoints via SCSS variables (CSS custom properties don't work in `@media`):

```scss
@use '../../styles/c2b/octave-variables' as *;

@media (min-width: $octave-media-query-md) { ... }
```

Available: `$octave-media-query-sm` (600px), `$octave-media-query-md` (784px),
`$octave-media-query-lg` (960px), `$octave-media-query-xl` (1280px).

Mobile-first: default styles target mobile; `min-width` queries enhance upward.

---

## Storybook stories

Full conventions in `references/stories.md`. The rules that break things when ignored:

- **`tags: ['!autodocs']`** on every component with a `Docs.mdx` — `autodocs` is on globally in `.storybook/preview.ts`, so this opt-out is required
- **Render functions must be expression-bodied** — the `unwrapRender` source transform in `.storybook/preview.ts` regex-matches `render: (args) => <expr>`; a block body breaks the docs code panel
- **Inline `args`** inside the story object, never `Primary.args = {...}`
- **`argTypes` for every union prop**, options matching the TypeScript union exactly
- Shared content from `src/data/SampleContent.tsx` — `SingleParagraph`, `MultiParagraph`, `UnorderedList`, `OrderedList`

---

## LinkProvider

Components that render links should use `useLinkContext()` so consumers can swap in Next.js `Link`,
React Router `Link`, or a plain `<a>`. `react-hooks/static-components` can't tell the component from
context is stable, so disable it on the line above the JSX tag (not the hook call). See
`references/tsx.md` for the nested-JSX comment form:

```tsx
import { useLinkContext } from '../LinkProvider/useLinkContext';

const LinkComponent = useLinkContext();

if (href) {
    // eslint-disable-next-line react-hooks/static-components -- injected via context, stable across renders
    return <LinkComponent href={href}>...</LinkComponent>;
}

return <span>...</span>;
```

---

## Accessibility (components)

- Spread ARIA / HTML attrs via `...rest` so consumers can override
- Interactive components must extend the appropriate element's HTMLAttributes (e.g., `React.ComponentPropsWithoutRef<'button'>`) so DOM events pass through
- A11y violations fail `pnpm test:storybook`; never disable `color-contrast` without fixing the underlying token

---

## Changelog

Format: [Keep a Changelog](https://keepachangelog.com/). Add entries under `## [Unreleased]` in `CHANGELOG.mdx`:

```
_Added_ Brief description of what was added.
_Changed_ Brief description of what changed.
_Fixed_ Brief description of what was fixed.
```

Prefixes: `_Added_`, `_Changed_`, `_Fixed_`, `_Removed_`, `_Deprecated_`, `_Breaking_`, `_Security_`. Use `_Breaking_` alongside a major version bump.

---

## Pull requests

PR descriptions follow `.github/pull_request_template.md`. `gh pr create --body` skips GitHub's
template, so read the file and fill in its sections yourself. Only tick checklist items that are
actually done.

---

## Key gotchas

- **Node 24** (see `.nvmrc`) — `engineStrict: true` in `pnpm-workspace.yaml` fails the install on any Node a dependency's `engines` excludes (e.g. `lint-staged` needs ≥22.22.1)
- **`typescript` is TS 6 on purpose** — TS 7.0 has no JS API, so `typescript` is aliased to `@typescript/typescript6` for typescript-eslint, Storybook docgen and the dts plugins; `tsc` comes from `@typescript/native` (TS 7). Don't set `typescript` to `^7` until those tools support the TS 7.1 API
- **Storybook source transform** — expression-bodied render functions only; block bodies break the docs code panel
- **CSS vars in media queries** — won't work; use SCSS variables from `_octave-variables.scss`
- **TS 6 side-effect imports** — `declare module '*.scss';` (no body) in `src/scss.d.ts`
- **Never run `--no-verify`** — husky hooks exist because bypassing them masked real bugs in the past
