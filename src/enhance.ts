import type { Locator } from 'playwright-core'

export type NestedCollection<T> = T & {
  nth(index: number): T
  first(): T
  last(): T
}

export function enhance<T>(
  collection: new (root: unknown) => T,
  root: Locator,
  instance: T
): NestedCollection<T> {
  const inst = instance as NestedCollection<T>

  inst.nth = (index: number) => new collection(root.nth(index))
  inst.first = () => new collection(root.first())
  inst.last = () => new collection(root.last())

  return inst
}
