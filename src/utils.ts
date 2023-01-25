import type { Frame, FrameLocator, Locator, Page } from '@playwright/test'

export type Handle = Page | Frame | FrameLocator | Locator

export const isLocator = (handle: Handle): handle is Locator | FrameLocator =>
  '_frame' in handle
