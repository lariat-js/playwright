import { LariatElement } from './LariatElement'

export abstract class Collection<T> {
  constructor(private getElement: (selector: string) => Promise<T>) {}

  protected el(selector: string): LariatElement<T> {
    const element = () => this.getElement(selector)
    element.$ = selector
    return element as LariatElement<T>
  }
}
