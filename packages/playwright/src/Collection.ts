import { Page } from 'playwright-core'
import { LariatElement } from './types'

export class Collection {
  constructor(private page: Page) {}

  protected el(selector: string): LariatElement {
    const element = () => this.page.waitForSelector(selector)
    element.$ = selector
    return element
  }
}
