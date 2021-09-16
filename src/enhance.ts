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
  Object.defineProperties(instance, {
    nth: {
      value(this: NestedCollection<T>, index: number) {
        return new collection(root.nth(index))
      },
    },
    first: {
      value(this: NestedCollection<T>) {
        return this.nth(0)
      },
    },
    last: {
      value(this: NestedCollection<T>) {
        return this.nth(-1)
      },
    },
  })

  return instance as NestedCollection<T>
}
