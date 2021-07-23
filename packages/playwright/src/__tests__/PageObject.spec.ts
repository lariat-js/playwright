import { Collection } from '..'

class TodoPage extends Collection {
  item = this.el('data-testid=list-item')
}

it('should return the selector when using the $ syntax', () => {
  const page = null!
  const todoPage = new TodoPage(page)
  expect(todoPage.item.$).toBe('data-testid=list-item')
})
