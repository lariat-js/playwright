# lariat

## 0.3.0

### Minor Changes

- 30b884a: Allow accessing the page a collection is associated with.

## 0.2.0

### Minor Changes

- b638933: Rename `Collection.origin` to `Collection.frame` and ensure that a frame is always returned. This is used internally by the `portal` option but can continue to be used for nesting collections where the nested collection should not be part of the parent collections locator chain.
- b638933: Make `Collection` generic to allow specifying an exact type for the `root` property. By default the type of `root` will be `Locator`.

### Patch Changes

- b638933: Remove documentation showing how to manually set the `root` property as an member variable. This may still work but is discouraged.
- b638933: Improve type safety of `Collection.nest`. Previously you could pass a `string` or `Locator` as the nested collection root even if the nested collection accepts a `Page` or `Frame` as the root.

## 0.1.1

### Patch Changes

- 288767a: Fix `Locator` type being imported from `@playwright/test` instead of `playwright-core` like it should have been.

## 0.1.0

### Minor Changes

- 68879ea: Update Playwright dependency to version 1.14 which support locators.

## 0.0.7

### Patch Changes

- 9b43893: Add better documentation for `Collection.el()` and `Collection.nest()`

## 0.0.6

### Patch Changes

- 97d9917: Use `main` field until better ecosystem support for `exports`.

## 0.0.5

### Patch Changes

- 0053132: Export `Locator` type from Playwright to fix inferred type errors.

## 0.0.4

### Patch Changes

- e68c5a7: Export more types from the package to fix portability error.
- e68c5a7: Add `portal` option for nested selectors. Subject to change.

## 0.0.3

### Patch Changes

- 3b7e7b58: Allow passing a handle as the root to nested collections.

## 0.0.2

### Patch Changes

- 75cb3c7: Use simplified collection thanks to locators.
