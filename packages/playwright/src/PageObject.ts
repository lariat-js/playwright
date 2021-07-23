import type { Selector } from '@lariat/core'
import { ElementHandle, Page } from 'playwright-core'

export class PageObject {
  constructor(private page: Page) {}

  protected el(selector: string): Selector<ElementHandle> {
    const element = () => this.page.waitForSelector(selector)
    element.$ = selector
    return element
  }
}
