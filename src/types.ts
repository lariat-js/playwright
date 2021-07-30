import { Frame, Locator, Page } from 'playwright-core'

export type Handle = Page | Frame | Locator
export type NewableCollection<T> = new (root: Handle) => T
