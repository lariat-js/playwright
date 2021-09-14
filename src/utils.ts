import { Page, Frame, Locator } from 'playwright-core'

export type Handle = Page | Frame | Locator

export const isLocator = (handle: Handle): handle is Locator =>
  '_frame' in handle
