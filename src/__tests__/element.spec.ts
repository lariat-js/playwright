import { TestCollection } from './TestCollection'

class TodoPage extends TestCollection {
  input = this.el('#todo-input')
}

describe('Elements', () => {
  it('should return the selector when accessing the $ property', () => {
    const todoPage = new TodoPage()
    expect(todoPage.input.$).toBe('#todo-input')
  })

  it('should return the element when calling the element as a function', async () => {
    const todoPage = new TodoPage()
    const input = await todoPage.input()
    expect(await input.isDisabled()).toBe(true)
  })

  it.skip('should allow calling methods from the element directly', async () => {
    const todoPage = new TodoPage()
    expect(await todoPage.input.isDisabled()).toBe(true)
  })
})
