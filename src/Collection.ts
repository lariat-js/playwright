import { Locator } from '@playwright/test'
import type { Handle, NewableCollection } from './types'

export interface ElementOptions {
  portal?: boolean
}

export class Collection {
  /**
   * The origin is the page, frame, or locator at the highest point in the
   * collection tree. The origin is used in conjunction with the `portal` option
   * when nesting collections to allow an element or nested collection to escape
   * the page object structure to fit the DOM structure.
   */
  protected origin: Handle

  constructor(public root: Handle) {
    // When instantiating a collection, the origin and root should be the same.
    // Nested collections will set the `origin` after instantiation to ensure
    // that origin always points to the origin of the full collection tree.
    this.origin = root
  }

  /**
   * Retrieve a locator to a given element on the page identified by the
   * selector. The locator is lazily initialized when retrieved to ensure that
   * the most current `root` element is used.
   *
   * If `options.portal` is set to true, the locator will be based off the
   * `origin`, rather than the `root` thus escaping from any collection nesting.
   * This is useful to represent a page structure whose visual appearance
   * differs from it's DOM structure.
   *
   * @param selector - The selector that identifies the element.
   * @param options - Options for how to build the locator.
   */
  protected el(selector: string, options?: ElementOptions): Locator {
    return options?.portal
      ? this.origin.locator(selector)
      : this.root.locator(selector)
  }

  /**
   * Nest another collection inside of the current collection. Locators in the
   * nested collection will be based on the `root` argument which can be
   * customized to be a selector, locator, page, etc.
   *
   * @param collection - Uninstantiated collection class to nest.
   * @param root - The root of the nested collection. This could be a static
   * string, an element from the parent collection, or the parent collection's
   * `origin`.
   *
   * @example this.nest(TextField, '#my-text-field')
   * @example this.nest(TextField, this.form)
   * @example this.nest(TextField, this.origin)
   */
  protected nest<T extends Collection>(
    collection: NewableCollection<T>,
    root: string | Handle
  ): T {
    const rootElement = typeof root === 'string' ? this.el(root) : root
    const instance = new collection(rootElement)
    instance.origin = this.origin

    return instance
  }
}
