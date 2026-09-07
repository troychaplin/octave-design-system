# Building the component styles

`src/components/ComponentName/styles.scss` — imported directly by the component's TSX.

## Design tokens

Every visual value — colours, spacing, font sizes, weights, line heights, shadows, radii,
gradients — comes from an `--octave--*` CSS custom property. Never hardcode a hex colour, a pixel
value, or a font stack.

```scss
// Correct
color: var(--octave--color-primary);
gap: var(--octave--spacing-large);
font-size: var(--octave--font-size-large);
border-radius: var(--octave--radius-md);

// Wrong
color: #e91c24;
gap: 1.5rem;
```

If a value you need has no token, add it to `c2b.config.json` and regenerate — don't inline it.

## Class naming

- BEM with the `octave-` prefix: `.octave-component`, `.octave-component--modifier`, `.octave-component__element`
- Utility classes use the `octave-utils--` prefix

## Responsive breakpoints

CSS custom properties **cannot** be used inside `@media` queries — that's a spec limitation, not a
build one. Breakpoints come in as SCSS variables from the generated variables partial:

```scss
@use '../../styles/c2b/octave-variables' as *;

.octave-column--two {
    grid-template-columns: 1fr;

    @media (min-width: $octave-media-query-md) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
```

Available breakpoints:

| Variable                 | Value  |
| ------------------------ | ------ |
| `$octave-media-query-sm` | 600px  |
| `$octave-media-query-md` | 784px  |
| `$octave-media-query-lg` | 960px  |
| `$octave-media-query-xl` | 1280px |

**Mobile-first.** Default styles target mobile; `min-width` queries enhance upward. For the rare
max-width query, subtract a hair to avoid an overlap at the boundary:
`@media (max-width: $octave-media-query-md - 0.02px)`.

## Generated files — never hand-edit

`@troychaplin/component2block` generates the token and variable files from `c2b.config.json`.
Run `pnpm c2b` to regenerate; edits made by hand are overwritten.

The `scssVars` list in `c2b.config.json` controls which token categories are also emitted as SCSS
variables — currently `mediaQuery` and `spacing`. Add a category there when you need it as a SCSS
variable rather than a CSS custom property: inside a `@media` query, inside a `calc()` that can't
resolve CSS vars, or for conditional SCSS logic.

## File locations

| Path                                       | What lives there                                             |
| ------------------------------------------ | ------------------------------------------------------------ |
| `src/components/ComponentName/styles.scss` | Component styles                                             |
| `src/styles/c2b/`                          | Global and base styles — **also where generated files land** |
| `src/styles/main.scss`                     | Aggregates everything into the `dist/style.css` bundle       |
| `src/styles/wordpress/`                    | WordPress block-theme and hybrid-theme entry points          |

WordPress layout classes a component may need to cooperate with: `.alignfull`, `.alignwide`,
`.has-global-padding`, `.is-layout-constrained`.
