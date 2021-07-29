import { TestCollection } from './TestCollection'

class TodoPage extends TestCollection {
  input = this.el('#todo-input')
}

describe('Elements', () => {
  it('should allow calling methods on the locator', async () => {
    const todoPage = new TodoPage()
    expect(await todoPage.input.isDisabled()).toBe(true)
  })

  it('should return the selector when accessing the $ property', () => {
    const todoPage = new TodoPage()
    expect(todoPage.input.$).toBe('#todo-input')
  })
})
