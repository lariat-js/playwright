# Lariat

[![Build](https://github.com/Widen/lariat/actions/workflows/build.yml/badge.svg)](https://github.com/Widen/lariat/actions/workflows/build.yml)
[![npm](https://img.shields.io/npm/v/lariat)](https://www.npmjs.com/package/lariat)
[![changesets](https://img.shields.io/badge/maintained%20with-changesets-blue)](https://github.com/atlassian/changesets)

Page object framework for end-to-end testing in Playwright.

## Installation

```sh
npm install lariat
```

## Basic Usage

At the core of Lariat is the `Collection` class. This class is used to represent a collection of elements in a page or section of a page and can include associated utility methods for interacting with those elements.

To create your own collections, simply create a class which extends the `Collection` class. You can then define elements using the `Collection.el()` method which we will explore more in a moment.

```ts
import { Collection } from 'lariat'

class TodoPage extends Collection {
  input = this.el('#todo-input')
}
```

With your collection defined, you can instantiate it in your test to access the elements.

```ts
test('create a todo', async () => {
  const todoPage = new TodoPage(page)
  await todoPage.input.fill('Finish the website')
})
```

## Elements

Elements are defined in collections using the `Collection.el()` method.

```ts
class TodoPage extends Collection {
  saveButton = this.el('#save-button')
}
```

Elements are represented using Playwright [locators](https://playwright.dev/docs/next/api/class-locator) .

```ts
const todoPage = new TodoPage(page)
await todoPage.saveButton.click()
```

### Dynamic selectors

Because collections in Lariat are plain JavaScript classes, you can easily create elements with dynamic selectors. Consider a todo list where we find an item based on it's name. Our collection might look something like this:

```ts
class TodoPage extends Collection {
  item = (name: string) => this.el(`#todo-item[data-name="${name}"]`)
}

const todoPage = new TodoPage(page)
const item = todoPage.item('Finish the website')
await item.click()
```

## Utility methods

Because collections are plain JavaScript classes, you can easily add utility methods to your collections.

```ts
class TodoPage extends Collection {
  input = this.el('#todo-input')
  saveButton = this.el('#save-button')

  async create(name: string) {
    await this.input.fill(name)
    await this.input.click()
  }
}

const todoPage = new TodoPage(page)
await todoPage.create('Finish the website')
```

## Nested collections

So far, we've shown examples of simple collections, but the true power of Lariat is in the ability to nest collections inside each other. With this approach, you can create a page object structure that resembles your page layout.

To nest a collection, use the `Collection.nest()` method and pass the nested collection class and the root of the nested collection.

```ts
class TodoPage extends Collection {
  field = this.nest(TextField, '#todo-field')
}

const todoPage = new TodoPage(page)
await todoPage.field.input.fill('Finish the website')
```

If your nested collection is used merely to group a set of related elements together, you can use the parent's `root` property as the root of the child collection.

```ts
class TodoPage extends Collection {
  field = this.nest(TextField, this.root)
}
```
