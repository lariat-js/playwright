import type { Frame, Locator } from 'playwright-core'
import type { Handle, NewableCollection } from './types'

export interface ElementOptions {
  portal?: boolean
}

export class Collection<T extends Handle = Locator> {
  constructor(public root: T) {}

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
      ? this.frame.locator(selector)
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
  protected nest<Root extends Handle, Nested extends Collection<Root>>(
    collection: NewableCollection<Root, Nested>,
    root: string | Root
  ): T {
    return new collection(typeof root === 'string' ? this.el(root) : root)
  }

  /**
   * Retrieves the frame that the collection is based off of. Used when
   * creating an element in a portal.
   */
  private get frame() {
    return '_frame' in this.root
      ? (this.root as unknown as { _frame: Frame })._frame
      : this.root
  }
}
