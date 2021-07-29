import { Locator, Page } from 'playwright-core'
import { Collection } from '..'

const locator = {
  click: async () => {},
  isDisabled: async () => true,
} as Locator

const page = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  locator: (selector: string) => ({ ...locator }),
} as Page

export class TestCollection extends Collection {
  constructor(root?: string) {
    super(page, root)
  }
}
