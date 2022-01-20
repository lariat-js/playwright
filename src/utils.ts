import type { Frame, FrameLocator, Locator, Page } from 'playwright-core'

export type Handle = Page | Frame | FrameLocator | Locator

export const isLocator = (handle: Handle): handle is Locator | FrameLocator =>
  '_frame' in handle
