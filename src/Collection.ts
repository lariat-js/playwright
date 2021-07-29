import { Handle, LariatElement, NestOptions, NewableCollection } from './types'

export class Collection {
  public root: LariatElement | undefined
  private context: string | undefined

  constructor(private handle: Handle, root?: string) {
    this.root = root ? this.el(root) : undefined
  }

  protected el(selector: string): LariatElement {
    const element = this.handle.locator(selector) as LariatElement
    element.$ = selector
    return element
  }

  protected nest<T extends Collection>(
    collection: NewableCollection<T>,
    options?: NestOptions
  ): T
  protected nest<T extends Collection>(
    collection: NewableCollection<T>,
    root: string,
    options?: NestOptions
  ): T
  protected nest<T extends Collection>(
    collection: NewableCollection<T>,
    rootOrOptions?: string | NestOptions,
    options?: NestOptions
  ): T {
    const [root, opts] =
      typeof rootOrOptions === 'string'
        ? [rootOrOptions, options]
        : [undefined, rootOrOptions]

    return opts?.chain !== false
      ? new collection(root, this.root)
      : new collection(root)
  }

  private chain(selectors: string[]) {
    return selectors.join(' >> ')
  }
}
