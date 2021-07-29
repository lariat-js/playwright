import { Frame, Locator, Page } from 'playwright-core'

export type LariatElement = Locator & {
  $: string
}

export type Handle = Page | Frame | Locator

export type NewableCollection<T> = new (
  root?: string,
  context?: LariatElement
) => T

export interface NestOptions {
  /**
   * When true, prefixes selectors for the nested collection with the root
   * selector of the parent collection.
   * @default true
   */
  chain?: boolean
}
