export { Collection, ElementOptions } from './Collection'

// We need to export the Locator type otherwise TypeScript will complain about
// that inferred types cannot be named with a reference to playwright-core.
export type { Locator } from 'playwright-core'
