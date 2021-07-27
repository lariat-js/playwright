import { TestCollection } from './TestCollection'

class TodoPage extends TestCollection {
  item = (name: string) => this.el(`#todo-item[data-name="${name}"]`)
}

describe('Dynamic selectors', () => {
  it('should create an element from a dynamic selector', async () => {
    const todoPage = new TodoPage()
    const item = todoPage.item('Finish the website')

    expect(item.$).toBe('#todo-item[data-name="Finish the website"]')
    expect(await (await item()).isDisabled()).toBe(true)
    expect(await item.isDisabled()).toBe(true)
  })

  it.todo('should correctly chain the root selector for dynamic selectors')

  it.todo(
    'should correctly chain the parent root selector for dynamic selectors'
  )
})
