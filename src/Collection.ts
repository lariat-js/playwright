import type { Handle, NewableCollection } from './types'

export class Collection {
  constructor(public root: Handle) {}

  protected el(selector: string) {
    return this.root.locator(selector)
  }

  protected nest<T extends Collection>(
    collection: NewableCollection<T>,
    root: string
  ) {
    return new collection(this.el(root))
  }
}
