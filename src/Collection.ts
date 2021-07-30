import type { Handle, NewableCollection } from './types'

interface ElementOptions {
  portal?: boolean
}

export class Collection {
  protected pageRoot: Handle

  constructor(public root: Handle) {
    this.pageRoot = root
  }

  protected el(selector: string, options?: ElementOptions) {
    return options?.portal
      ? this.pageRoot.locator(selector)
      : this.root.locator(selector)
  }

  protected nest<T extends Collection>(
    collection: NewableCollection<T>,
    root: string | Handle,
    options?: ElementOptions
  ) {
    const rootElement = typeof root === 'string' ? this.el(root) : root
    const instance = new collection(rootElement)
    instance.pageRoot = this.pageRoot

    if (options?.portal) {
      instance.root = this.pageRoot
    }

    return instance
  }
}
