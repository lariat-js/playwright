import { Collection } from '@lariat/playwright'

describe('Basic usage', () => {
  it('should ', () => {
    class TodoPage extends Collection {
      input = this.el('#todo-input')
    }

    const todoPage = new TodoPage()
  })
})
