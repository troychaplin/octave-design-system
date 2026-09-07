# LinkProvider — Diff (Legacy RDS → RDS2)

## Summary

`type` prop renamed to `component` with a precise, generic-free type (`LinkComponent`) replacing
`any`; the default context value changed from a bare HTML tag string (`'a'`) to an actual component
function rendering `<a>`; and the module now re-exports `useLinkContext`, `LinkContext`, and the
`LinkComponent` type directly from `LinkProvider`'s entry point instead of requiring separate imports.

## Props Changes

| Prop                 | Legacy                      | RDS2                                  | Change                            |
| -------------------- | --------------------------- | ------------------------------------- | --------------------------------- |
| `type` → `component` | `type: any` (required)      | `component: LinkComponent` (required) | Renamed, retyped                  |
| `children`           | `children: React.ReactNode` | `children: ReactNode`                 | Unchanged (type import path only) |

## Deprecations

None.

## Behavioral / Styling Changes

- Type safety: legacy typed `type` as `any` (with an `eslint-disable @typescript-eslint/no-explicit-any`
  escape hatch) and `useLinkContext()`'s return type was also `any`. RDS2 introduces a precise
  `LinkComponent = ComponentType<ComponentProps<'a'>>` type used consistently for the prop, the
  context, and `useLinkContext()`'s return value — no `any` or lint suppressions remain.
- Default context value: legacy's `LinkContext` defaulted to the string `'a'`
  (`createContext(DefaultLinkComponent)` where `DefaultLinkComponent = 'a'`), meaning consumers of
  `useLinkContext()` without a provider got back a plain tag name to use as `React.createElement`'s
  first argument. RDS2's default is an actual component
  (`const DefaultLink: LinkComponent = (props) => <a {...props} />`), so consumers can render it
  directly as `<LinkComponent {...props}>` without special-casing a string vs. component value.
- Naming: the exported wrapper component itself is renamed from `Link` (aliased via
  `LinkProvider = Object.assign(Link)`) to `LinkProvider` being the primary export directly — no
  `Object.assign` indirection remains.
- Module surface: legacy required consumers to import `useLinkContext` and `LinkContext` from their
  own files (`./useLinkContext`, `./LinkContext`) separately from `LinkProvider`. RDS2's
  `index.tsx` re-exports `useLinkContext`, `LinkContext`, and the `LinkComponent` type directly
  alongside `LinkProvider`, consolidating the public API into a single entry point.
- Interface naming: legacy's props interface was `ILinkProvider` (Hungarian-notation `I` prefix);
  RDS2 uses `LinkProviderProps`, matching the codebase's standard `{Component}Props` convention.
