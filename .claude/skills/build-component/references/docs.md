# Building the component docs page

`src/components/ComponentName/Docs.mdx` — the authored documentation page. Every component
requires one, and its presence is why the stories file sets `tags: ['!autodocs']`.

## Header

The file must open with the blocks import, the story namespace import, and the `<Meta>` tag:

```mdx
import { Meta, Canvas, Controls } from '@storybook/addon-docs/blocks';
import * as ComponentStories from './Component.stories';

<Meta of={ComponentStories} />
```

## Required sections, in order

### 1. `# ComponentName`

One sentence: what the component is and what it renders. Name the element it produces and any
conditional swap.

> A small inline label used to categorize content, indicate status, or tag items with metadata.
> Renders as a `<span>` by default, or as a link when an `href` is provided.

### 2. `## When to use`

2–4 bullets on appropriate use cases. Include at least one boundary — what this component is
_not_ for — so the reader can tell it apart from its neighbours.

### 3. `## Import`

The package import, in a `tsx` block:

```tsx
import { ComponentName } from '@troychaplin/octave-design-system';
```

### 4. `## Basic usage`

Representative snippets as plain code blocks — no `<Canvas>` here. Cover the common shapes with a
short comment above each:

```tsx
// Static label
<Badge text="Research" />

// Link badge
<Badge text="Events" href="/events" />
```

### 5. `## Examples`

One `<Canvas>` plus `<Controls>` for the primary story, then a `<Canvas>` for each additional
story under its own `###` heading with a sentence of prose introducing it.

```mdx
### Default

<Canvas of={ComponentStories.Default} />
<Controls of={ComponentStories.Default} />

### With link

When `href` is provided the badge renders as a link using the `LinkProvider` context.

<Canvas of={ComponentStories.WithLink} />
```

`<Controls>` appears once, on the primary story only.

### 6. `## CSS classes`

A table of every BEM class the component applies and the condition that triggers it. Cover the
base class as "Always", and note any selector-level behaviour that isn't a class the component
adds (e.g. what `a.octave-badge` does differently from `span.octave-badge`) in a sentence below the table.

| Class                     | When applied                                              |
| ------------------------- | --------------------------------------------------------- |
| `octave-badge`            | Always — base class                                       |
| `octave-badge--{color}`   | The active `color` prop value, e.g. `octave-badge--green` |
| `octave-badge--radius-md` | `rounded="md"` (default)                                  |

### 7. `## Design tokens`

A table of every `--octave--*` token used in the component's `styles.scss`, and what each controls.
Read the SCSS and enumerate — don't guess. If the component uses a raw value rather than a token
anywhere, say so explicitly below the table; that is a known gap worth surfacing, not something
to paper over.

### 8. `## Accessibility`

Bullets covering:

- The semantic element chosen, and why
- Keyboard and screen-reader behaviour, including what changes between variants
- Any colour-only-meaning caveat — semantic colour variants reinforce meaning visually, but the
  text must still carry it
- Any contrast the design system can't guarantee (semi-transparent variants over arbitrary
  backgrounds, for instance)

## Worked example

`src/components/Badge/Docs.mdx` follows all eight sections faithfully and is the closest thing
to a canonical reference — including the cross-link syntax for pointing at another component's
story (`?path=/story/components-elements-badge-group--on-card`).
