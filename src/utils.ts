import type { Page, Frame, Locator, FrameLocator } from 'playwright-core'

export type Handle = Page | Frame | FrameLocator | Locator

export const isLocator = (handle: Handle): handle is Locator | FrameLocator =>
  '_frame' in handle
