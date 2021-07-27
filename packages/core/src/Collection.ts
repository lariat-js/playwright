import { LariatElement } from './LariatElement'

export abstract class Collection<T> {
  public root: LariatElement<T> | undefined
  protected _context: string | undefined
  protected abstract _resolve(selector: string): Promise<T>

  constructor(root?: string) {
    this.root = root ? this.el(root) : undefined
  }

  protected _chain(selectors: string[]) {
    return selectors.join(' ')
  }

  protected el(selector: string): LariatElement<T> {
    const element = () => this._resolve(selector)
    element.$ = selector
    return element as LariatElement<T>
  }
}
