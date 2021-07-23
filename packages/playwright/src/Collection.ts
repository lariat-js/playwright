import type { LariatElement } from '@lariat/core'
import { ElementHandle, Page } from 'playwright-core'

export class Collection {
  constructor(private page: Page) {}

  protected el(selector: string): LariatElement<ElementHandle> {
    const element = () => this.page.waitForSelector(selector)
    element.$ = selector
    return element
  }
}
