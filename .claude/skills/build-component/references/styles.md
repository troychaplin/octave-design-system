# Building the component styles

`src/components/ComponentName/styles.scss` — imported directly by the component's TSX.

## Design tokens

Every visual value — colours, spacing, font sizes, weights, line heights, shadows, radii,
gradients — comes from an `--parlour--*` CSS custom property. Never hardcode a hex colour, a pixel
value, or a font stack.

```scss
// Correct
color: var(--parlour--color-accent-primary);
gap: var(--parlour--spacing-large);
font-size: var(--parlour--font-size-large);
border-radius: var(--parlour--radius-md);

// Wrong
color: #e91c24;
gap: 1.5rem;
```

If a value you need has no token, add it to `c2b.config.json` and regenerate — don't inline it.

## Class naming

- BEM with the `parlour-` prefix: `.parlour-component`, `.parlour-component--modifier`, `.parlour-component__element`
- Utility classes use the `parlour-utils--` prefix

## Responsive breakpoints

CSS custom properties **cannot** be used inside `@media` queries — that's a spec limitation, not a
build one. Breakpoints come in as mixins from the generated variables partial:

```scss
@use '../../styles/c2b/parlour-variables' as *;

.parlour-column--three {
    grid-template-columns: 1fr;

    @include above-tablet {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
```

Available mixins:

| Mixin          | Matches          |
| -------------- | ---------------- |
| `below-mobile` | `width <= 600px` |
| `above-mobile` | `width > 600px`  |
| `below-tablet` | `width <= 768px` |
| `above-tablet` | `width > 768px`  |

The values come from `$parlour-viewport-mobile` and `$parlour-viewport-tablet`, the WordPress
viewport breakpoints in the `viewport` section of `c2b.config.json`. Each `below-` / `above-` pair
is an exact complement, so no width matches both and there's no boundary overlap to work around.
Use the variables directly only when a mixin doesn't fit, such as inside `calc()`.

**Mobile-first.** Default styles target mobile; `above-*` mixins enhance upward. Reach for
`below-*` only for the rare style that applies to small screens alone.

## Generated files — never hand-edit

`@troychaplin/component2block` generates the token and variable files from `c2b.config.json`.
Run `pnpm c2b` to regenerate; edits made by hand are overwritten.

The `scssVars` list in `c2b.config.json` controls which token categories are also emitted as SCSS
variables — currently `viewport`, `spacing` and `radius`. The `viewport` category also emits the
breakpoint mixins above. Add a category there when you need it as a SCSS
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
