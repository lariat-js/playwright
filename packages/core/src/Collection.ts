import { LariatElement } from './LariatElement'

export abstract class Collection<T> {
  protected abstract _resolveSelector(selector: string): Promise<T>

  protected el(selector: string): LariatElement<T> {
    const element = () => this._resolveSelector(selector)
    element.$ = selector
    return element
  }
}
