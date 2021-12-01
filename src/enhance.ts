import type { FrameLocator, Locator } from 'playwright-core'

export type NestedCollection<T> = T & {
  nth(index: number): T
  first(): T
  last(): T
}

export function enhance<T>(
  collection: new (root: Locator | FrameLocator) => T,
  root: Locator | FrameLocator,
  instance: T
): NestedCollection<T> {
  const inst = instance as NestedCollection<T>

  inst.nth = (index: number) => new collection(root.nth(index))
  inst.first = () => inst.nth(0)
  inst.last = () => inst.nth(-1)

  return inst
}
