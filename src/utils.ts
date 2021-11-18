import type { Page, Frame, Locator, FrameLocator } from 'playwright-core'

export type Handle = Page | Frame | FrameLocator | Locator

export const isLocator = (handle: Handle): handle is Locator =>
  '_frame' in handle && '_selector' in handle

export const isFrameLocator = (handle: Handle): handle is FrameLocator =>
  '_frame' in handle && '_frameSelector' in handle
