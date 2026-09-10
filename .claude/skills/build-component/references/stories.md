# Building the component stories

`src/components/ComponentName/ComponentName.stories.tsx` — the Storybook entry, and the source
for every `<Canvas>` in `Docs.mdx`.

## Meta shape

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
    title: 'Components/Category/Component',
    component: Component,
    tags: ['!autodocs'],
    argTypes: {
        // one entry per union-typed prop
    },
    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Component>;
```

**`tags: ['!autodocs']` when the component has a `Docs.mdx`** — which is every component. The tag
suppresses Storybook's auto-generated docs page so the authored one is the only docs entry.
`autodocs` is on globally in `.storybook/preview.ts`, so this opt-out is required, not optional.

## Title taxonomy

| Prefix                        | Usage                                                         |
| ----------------------------- | ------------------------------------------------------------- |
| `Components/Elements/*`       | Atomic UI (Badge, Button, BadgeGroup, ButtonGroup)            |
| `Components/Content/*`        | Content display (Card, Quote, Table, Figure)                  |
| `Components/Media/*`          | Image/video-heavy (FullBanner, ImageGrid)                     |
| `Components/Navigation/*`     | Wayfinding (Nav, PageHeader, Footer)                          |
| `Components/Forms/*`          | Data entry (Input, Select)                                    |
| `Components/Feedback/*`       | Overlays, loading, errors (Alert, Modal, Toast)               |
| `Components/Layout/*`         | Structural wrappers (Section, Column)                         |
| `Components/Template Parts/*` | WordPress template part wrappers (Article, Aside, Body, Main) |
| `Components/Utilities/*`      | Behavioural / non-visual (LinkProvider)                       |
| `Overview/Templates/*`        | Full-page compositions                                        |

Multi-word component names are spaced in the title: `Components/Elements/Badge Group`.

## Args

Inline `args` inside the story object. Never the external-assignment pattern:

```tsx
// Correct
export const Default: Story = {
    args: {
        text: 'Badge',
        color: 'green',
    },
};

// Wrong
export const Default: Story = {};
Default.args = { text: 'Badge' };
```

Omit `args: {}` entirely when a story doesn't need args. Omit args that just restate a default,
unless showing the default is the point of that story.

## Controls (argTypes)

Define `argTypes` for every union-typed prop, or Storybook renders a free-text input instead of a
dropdown.

- `'inline-radio'` for small option sets (2–4)
- `'select'` for larger sets
- Options must match the TypeScript union exactly

```tsx
argTypes: {
    color: {
        control: 'select',
        options: ['grey', 'green', 'red', 'yellow', 'blue'],
    },
    rounded: {
        control: 'inline-radio',
        options: ['sm', 'md', 'lg', 'full'],
    },
},
```

When a story maps over the same option set, hoist it to a `const ... as const` above `meta` and
use it for both the `argTypes` options and the map — one source of truth.

## Render functions — expression body only

`.storybook/preview.ts` runs an `unwrapRender` source transform that regex-matches
`{ render: (args) => <expr> }` to strip the wrapper from the docs code panel. **A block body
breaks the transform** and the panel shows the raw story object.

```tsx
// Correct — expression body
render: (args) => (
    <Section>
        <Component {...args} />
    </Section>
);

// Wrong — block body
render: (args) => {
    const computed = args.foo ?? 'default';
    return <Component {...args} computed={computed} />;
};
```

Need a derived value? Compute it inline in the JSX with a ternary, or hoist it above the story.

Only add `render` when you need custom wrapping or conditional composition. If the story is just
`<Component {...args} />` with args, omit `render` — Storybook generates it.

## Decorators

Use meta-level `decorators` when a component needs a layout wrapper to render correctly but that
wrapper shouldn't appear in the docs code examples:

```tsx
const meta: Meta<typeof Component> = {
    decorators: [
        (Story) => (
            <Main>
                <Story />
            </Main>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
        controls: { sort: 'requiredFirst' },
    },
};
```

- **Pair with `layout: 'fullscreen'`** — components needing `Main` are typically full-width, and
  Storybook's default padding fights `is-layout-constrained` sizing
- **Decorator, not `render`** — `render` output appears in the code panel; decorator output does not
- **Keep `render` for story-specific composition** — when individual stories need different
  surrounding elements (sibling paragraphs for a float demo, say), use `render` for those and let
  the decorator handle the shared outer wrapper

## Shared story content

Use the helpers in `src/data/SampleContent.tsx` instead of inlining lorem ipsum. Exports:
`SingleParagraph`, `MultiParagraph`, `UnorderedList`, `OrderedList`.

```tsx
import { MultiParagraph } from '../../data/SampleContent';

render: () => (
    <Section>
        <MultiParagraph count={2} />
    </Section>
);
```

Fixture data for richer stories lives alongside it: `ArticleData.ts`, `ImageData.ts`, `NewsData.ts`.

## Accessibility

A11y is configured as `test: 'error'` globally in `.storybook/preview.ts` — violations fail
`pnpm test:storybook`, they don't just warn.

- **Never disable a rule globally**
- **Never disable `color-contrast`** — fix the underlying token instead
- Disable a specific rule per-story only when the violation is an artefact of story structure
  rather than the component:

```tsx
parameters: {
    a11y: {
        config: {
            rules: [{ id: 'landmark-complementary-is-top-level', enabled: false }],
        },
    },
},
```

When a story can't pass axe for architectural reasons — `<Body>` renders a `<body>` inside
Storybook's wrapping `<div>`, for instance — opt out entirely:

```tsx
tags: ['!autodocs', '!test'],
parameters: {
    a11y: { test: 'off' },
},
```

`!test` skips the story in `pnpm test:storybook` while keeping it visible in Storybook dev.

## Worked example

`src/components/Badge/Badge.stories.tsx` shows the hoisted-options pattern, `!autodocs`,
both control types, inline args, and two expression-bodied `render` stories that map over the
option sets.
