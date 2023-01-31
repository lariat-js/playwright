# lariat

## 2.0.1

### Patch Changes

- 70ae342: Fix missing `dist` directory in published package

## 2.0.0

### Major Changes

- 5d56e2d: Update package to use `exports` to conditionally export ESM and
  CommonJS bundles. ESM is preferred and the CommonJS bundles will be deprecated
  eventually.

## 1.5.0

### Minor Changes

- ead94a5: Update to use `@playwright/test` as a peer dependency. This should
  resolve the problem when updating Playwright versions of also having to update
  `playwright-core`.

## 1.4.1

### Patch Changes

- 295ad31: Fix option types for `getByTestId`

## 1.4.0

### Minor Changes

- fe4006f: Add support for testing library methods such as `getByText`.

## 1.3.0

### Minor Changes

- d44a0fd: Add `has` option to `Collection.el()` to filter by text using the
  `has` locator option introduced in Playwright 1.19.

## 1.2.0

### Minor Changes

- e7a7733: Add `hasText` option to `Collection.el()` to filter by text using the
  `hasText` locator option introduced in Playwright 1.18.

### Patch Changes

- 7233236: Remove deprecated named `Collection` export.
- 862133d: Update dependencies to Playwright 1.18.

## 1.1.0

### Minor Changes

- e5ca566: Add support for
  [frame locators](https://playwright.dev/docs/api/class-framelocator)! Refer to
  the readme for more details about how to use frame locators in your
  collections.

## 1.0.0

### Major Changes

- 7b71d4a: Release v1 of Lariat!

### Minor Changes

- 7b71d4a: Change `Collection` to a default export. A deprecated named export
  still exists to make migration easier.

## 0.4.1

### Patch Changes

- 5efc2e3: Ensure that `this.frame` always returns a `Frame` rather than a
  `Page | Frame` like it used to.

## 0.4.0

### Minor Changes

- 1be805b: Add `nth`, `first`, and `last` properties for nested collections
  similar to the same methods that are available for locators.

  ```ts
  class TodoPage extends Collection<Page> {
    item = this.nest(TodoItem, '.todo-item')
  }

  const todoPage = new TodoPage(page)
  const firstItem = todoPage.item.first()
  ```

### Patch Changes

- 1be805b: Remove unncessary re-export of the `Locator` type.

## 0.3.1

### Patch Changes

- 2dbbda4: Make `Collection.page` public and add docs.

## 0.3.0

### Minor Changes

- 30b884a: Allow accessing the page a collection is associated with.

## 0.2.0

### Minor Changes

- b638933: Rename `Collection.origin` to `Collection.frame` and ensure that a
  frame is always returned. This is used internally by the `portal` option but
  can continue to be used for nesting collections where the nested collection
  should not be part of the parent collections locator chain.
- b638933: Make `Collection` generic to allow specifying an exact type for the
  `root` property. By default the type of `root` will be `Locator`.

### Patch Changes

- b638933: Remove documentation showing how to manually set the `root` property
  as an member variable. This may still work but is discouraged.
- b638933: Improve type safety of `Collection.nest`. Previously you could pass a
  `string` or `Locator` as the nested collection root even if the nested
  collection accepts a `Page` or `Frame` as the root.

## 0.1.1

### Patch Changes

- 288767a: Fix `Locator` type being imported from `@playwright/test` instead of
  `playwright-core` like it should have been.

## 0.1.0

### Minor Changes

- 68879ea: Update Playwright dependency to version 1.14 which support locators.

## 0.0.7

### Patch Changes

- 9b43893: Add better documentation for `Collection.el()` and
  `Collection.nest()`

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
