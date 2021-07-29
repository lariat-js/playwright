import { Locator } from 'playwright-core'
import { Collection } from '..'

const locator = {
  click: async () => {},
  isDisabled: async () => true,
} as Locator

export class TestCollection extends Collection {
  constructor(root?: string) {
    super(locator, root)
  }
}
