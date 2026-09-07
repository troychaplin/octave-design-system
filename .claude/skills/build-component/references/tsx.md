# Building the component TSX

`src/components/ComponentName/ComponentName.tsx` — the implementation.

## Exports

Export both the props interface and the component as named exports:

```tsx
export interface ComponentNameProps { ... }

export const ComponentName = ({ ... }: ComponentNameProps) => { ... };
```

No default exports. The barrel `index.ts` re-exports both:

```ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

## Props

- Use `children: React.ReactNode` for wrapper components
- For polymorphic shapes, prefer a discriminated union over a pile of optional props that are
  only valid in certain combinations
- Use typed keys from `src/utils/propClasses.tsx` for shared prop options rather than redeclaring
  a union that already exists there

`propClasses.tsx` currently exports `maxWidthClasses`, `gridColumnClasses`, `borderRadiusClasses`,
and `justifyClasses`. Derive the prop type from the map so the two can't drift:

```tsx
import { borderRadiusClasses } from '../../utils/propClasses';

type borderRadiusKeys = keyof typeof borderRadiusClasses;

export interface BadgeProps {
    rounded?: borderRadiusKeys;
}
```

## Class names

BEM with the `octave-` prefix:

- Block: `octave-component`
- Modifier: `octave-component--modifier`
- Element: `octave-component__element`

Build the string from the props, and use `undefined` rather than `''` for anything conditional so
no empty `class=""` reaches the DOM:

```tsx
const classes = `octave-badge octave-badge--${color} octave-badge--radius-${rounded}`;

// conditional modifier
className={reverse ? 'is-first' : undefined}
```

## Styles

Import the component's SCSS directly in the TSX — the build picks it up from there:

```tsx
import './styles.scss';
```

All visual values come from `--octave--*` design tokens. See `references/styles.md`.

## Subcomponents

Attach with `Object.assign` and set an explicit `displayName` on the wrapper:

```tsx
export const Column = Object.assign(ColumnWrapper, {
    Content: ColumnContent,
});
ColumnWrapper.displayName = 'Column';
```

## Accessibility

- **Spread `...rest`** so consumers can pass or override ARIA and HTML attributes
- **Interactive components must extend the underlying element's props** so DOM events pass
  through — e.g. `React.ComponentPropsWithoutRef<'button'>`, `React.AnchorHTMLAttributes<HTMLAnchorElement>`
- Never rely on colour alone to carry meaning; the text content must convey it too

## LinkProvider

Components that can render a link use `useLinkContext()` so the consumer's router component
(Next.js `Link`, React Router `Link`) is used, falling back to a plain `<a>`. The two
`eslint-disable` comments are part of the pattern — the rule can't see that the component from
context is stable:

```tsx
import { useLinkContext } from '../LinkProvider/useLinkContext';

export const MyComponent = ({ href, ...rest }: MyComponentProps) => {
    // eslint-disable-next-line react-hooks/static-components -- stable component from context
    const LinkComponent = useLinkContext();

    if (href) {
        return (
            // eslint-disable-next-line react-hooks/static-components -- injected via context
            <LinkComponent href={href} {...rest}>
                ...
            </LinkComponent>
        );
    }

    return <span {...rest}>...</span>;
};
```

Note the early return rather than a ternary — that is the house style for branching renders.

## Worked example

`src/components/Badge/Badge.tsx` exercises most of this in one short file: a props interface
extending `AnchorHTMLAttributes`, a `propClasses`-derived key type, BEM string construction,
the LinkProvider early-return branch, and `...rest` spreading on both branches.
