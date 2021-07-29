import { Collection, LariatElement, LariatElement } from '.'

export interface NestOptions {
  chain?: boolean
}

type NewableCollection<T, U> = new (
  root?: string,
  context?: LariatElement<T>
) => U

export interface BaseCollection<T> {
  protected _context: string | undefined
  protected abstract _resolve(selector: string): Promise<T>

  constructor(root?: string) {
    this.root = root ? this.el(root) : undefined
  }

  protected _chain(selectors: string[]) {
    return selectors.join(' ')
  }

  protected el(): LariatElement<T> {
    const element = () => this._resolve(selector)
    element.$ = selector
    return element as LariatElement<T>
  }

  protected nest<U extends Collection<T>>(
    collection: NewableCollection<T, U>,
    options?: NestOptions
  ): U
  protected nest<U extends Collection<T>>(
    collection: NewableCollection<T, U>,
    root: string,
    options?: NestOptions
  ): U
  protected nest<U extends Collection<T>>(
    collection: NewableCollection<T, U>,
    rootOrOptions?: string | NestOptions,
    options?: NestOptions
  ): U {
    const [root, opts] =
      typeof rootOrOptions === 'string'
        ? [rootOrOptions, options]
        : [undefined, rootOrOptions]

    return opts?.chain !== false
      ? new collection(root, this.root)
      : new collection(root)
  }
}

export interface RootCollection {

}
