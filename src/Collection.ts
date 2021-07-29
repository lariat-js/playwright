import type { Handle, LariatElement, Options, NewableCollection } from './types'

export class Collection {
  public root: LariatElement | undefined
  private context: LariatElement | undefined

  constructor(private handle: Handle, root?: string, context?: LariatElement) {
    this.root = root ? this.el(root, { chain: false }) : undefined
    this.context = context
  }

  protected el(selector: string, options?: Options): LariatElement {
    return new Proxy({} as LariatElement, {
      get: (_, prop) => {
        const sel = this.chain(selector, options)

        if (prop === '$') {
          return sel
        }

        const element = this.handle.locator(sel)
        return Reflect.get(element, prop)
      },
    })
  }

  protected nest<T extends Collection>(
    collection: NewableCollection<T>,
    options?: Options
  ): T
  protected nest<T extends Collection>(
    collection: NewableCollection<T>,
    root: string,
    options?: Options
  ): T
  protected nest<T extends Collection>(
    collection: NewableCollection<T>,
    rootOrOptions?: string | Options,
    options?: Options
  ): T {
    const [root, opts] =
      typeof rootOrOptions === 'string'
        ? [rootOrOptions, options]
        : [undefined, rootOrOptions]

    // If chaining the collection, we specify the current parent's root as the
    // context for the nested collection. This will not create a `root` property
    // on the nested collection, but it will allow nested collection to chain
    // it's selectors with the parent collection's root.
    return opts?.chain !== false
      ? new collection(this.handle, root, this.root)
      : new collection(this.handle, root)
  }

  private chain(selector: string, options?: Options) {
    return [this.context?.$, options?.chain !== false && this.root?.$, selector]
      .filter(Boolean)
      .join(' >> ')
  }
}
