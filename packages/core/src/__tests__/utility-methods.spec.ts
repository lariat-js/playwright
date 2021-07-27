import { TestCollection } from './TestCollection'

class TodoPage extends TestCollection {
  input = this.el('#todo-input')

  async create() {
    await this.input.click()
    return this.input.isDisabled()
  }
}

describe('Utility methods', () => {
  it('should be able to use elements inside utility methods', async () => {
    const todoPage = new TodoPage()
    expect(await todoPage.create()).toBe(true)
  })
})
