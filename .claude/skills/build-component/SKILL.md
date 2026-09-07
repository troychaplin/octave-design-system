---
name: build-component
description: Build a component for the Octave design system — the TSX, SCSS, Storybook stories, and Docs.mdx, plus wiring it into the package exports. Use when adding a new component under src/components/, rebuilding an existing one, or editing any of a component's four parts.
---

# Building an Octave component

Every component is four parts plus wiring. Build them in this order — each part depends on
decisions made in the one before it.

## Build order

### 1. Scaffold

```
src/components/ComponentName/
├── ComponentName.tsx          # implementation
├── ComponentName.stories.tsx  # Storybook stories
├── Docs.mdx                   # authored documentation page
├── index.ts                   # barrel export
└── styles.scss                # component styles (omit if the component has none)
```

### 2–5. Build each part

Read the reference for the part you are working on. Do not work from memory — the references
carry exact templates, required section orders, and the constraints that break the build when
violated.

| Part                        | Reference               | Covers                                                                              |
| --------------------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| `ComponentName.tsx`         | `references/tsx.md`     | Props interface, BEM class construction, subcomponents, accessibility, LinkProvider |
| `styles.scss`               | `references/styles.md`  | Design tokens, BEM naming, breakpoints, generated files                             |
| `ComponentName.stories.tsx` | `references/stories.md` | Meta shape, title taxonomy, args, argTypes, render functions, a11y                  |
| `Docs.mdx`                  | `references/docs.md`    | MDX header and the eight required sections                                          |

When editing an existing component rather than building a new one, read only the reference for
the part you are touching.

### 6. Wire it up

Two places, both required for the component to ship:

1. `src/components/ComponentName/index.ts` — barrel export of the component and its props type
2. `src/index.ts` — named export under the matching category comment

The per-component build output needs no config change: `vite.config.components.ts` auto-discovers
every `src/components/<Name>/` directory that has an `index.ts` or `index.tsx`. A missing barrel
file is what silently drops a component from the build.

### 7. Changelog

Add an entry under `## [Unreleased]` in `CHANGELOG.mdx`, [Keep a Changelog](https://keepachangelog.com/)
format. Prefix with a keyword: `_Added_`, `_Changed_`, `_Fixed_`, `_Removed_`, `_Deprecated_`,
`_Breaking_`, `_Security_`. Use `_Breaking_` alongside a major version bump.

### 8. Verify

```sh
pnpm typecheck        # tsc --noEmit
pnpm lint             # ESLint over src/
pnpm test:storybook   # every story + axe a11y; requires Node 22+
```

All three must be clean before committing. Never run with `--no-verify` — the husky hooks exist
because bypassing them masked real bugs.

## Code style

These apply to every part; the references do not repeat them.

- **Automatic JSX transform** — do not import React unless you use its APIs directly
- **No gratuitous fragments** — skip `<></>` when a single root element works
- **`undefined`, not `''`** for a conditional `className`, so no empty `class=""` reaches the DOM
- **Early returns** over ternaries for branching render logic
- **No dead code** — remove commented-out code rather than leaving it; no `// TODO` stubs
- **Don't annotate what you didn't change** — no new docstrings, comments, or type annotations on
  untouched code

## Naming

Octave uses the `octave-` prefix throughout: `octave-` BEM classes, `--octave--` CSS custom
properties, `$octave-*` SCSS variables, and `octave-*` generated filenames. All of it derives from
`"prefix": "octave"` in `c2b.config.json` — change that one field and `pnpm c2b` renames the
generated token layer with it.

The package is `@troychaplin/octave-design-system`.
