import { LariatElement } from './LariatElement'

export interface NestOptions {
  chain?: boolean
}

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

  protected nest(
    collection: typeof Collection,
    options?: NestOptions
  ): typeof Collection
  protected nest(
    collection: Collection<T>,
    root: LariatElement<T>,
    options: NestOptions
  ): Collection<T>
  protected nest(
    collection: Collection<T>,
    rootOrOptions?: LariatElement<T> | NestOptions,
    options?: NestOptions
  ): Collection<T> {
    return new collection(root)
  }
}
