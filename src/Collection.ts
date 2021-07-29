import { LariatElement } from './LariatElement'

export interface NestOptions {
  chain?: boolean
}

type NewableCollection<T, U> = new (
  root?: string,
  context?: LariatElement<T>
) => U

export class Collection<T> {
  public root: LariatElement<T> | undefined

  private context: string | undefined
  private async resolve(selector: string) {
    return ''
  }

  constructor(root?: string) {
    this.root = root ? this.el(root) : undefined
  }

  protected chain(selectors: string[]) {
    return selectors.join(' >> ')
  }

  protected el(selector: string): LariatElement<T> {
    const element = () => this.resolve(selector)
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
