import { Frame, Locator, Page } from 'playwright-core'

export type Handle = Page | Frame | Locator
export type NewableCollection<Root, T> = new (root: Root) => T
