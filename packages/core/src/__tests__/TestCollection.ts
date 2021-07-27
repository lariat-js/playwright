import { Collection } from '..'

const element = {
  click: async () => {},
  isDisabled: async () => true,
}

type ElementType = typeof element

export class TestCollection extends Collection<ElementType> {
  constructor(_root?: string) {
    super(_root)
  }

  protected _resolve() {
    return Promise.resolve(element)
  }
}
