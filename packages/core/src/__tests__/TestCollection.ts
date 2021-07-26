import { Collection } from '..'

const element = {
  isDisabled: async () => true,
}

export class TestCollection extends Collection<typeof element> {
  constructor() {
    super(() => Promise.resolve(element))
  }
}
