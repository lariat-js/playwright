---
'lariat': minor
---

Add `nth`, `first`, and `last` properties for nested collections similar to the same methods that are available for locators.

```ts
class TodoPage extends Collection<Page> {
  item = this.nest(TodoItem, '.todo-item')
}

const todoPage = new TodoPage(page)
const firstItem = todoPage.item.first()
```
