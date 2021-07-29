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
  const input = await todoPage.input()
  await input.fill('Finish the website')
})
```

## Elements

Elements are defined in collections using the `Collection.el()` method.

```ts
class TodoPage extends Collection {
  saveButton = this.el('#save-button')
}
```

Elements can be used in three ways. First, you can call the element as a function which will wait for the element to be visible and return it. This is what you would typically find in a page object model.

```ts
const todoPage = new TodoPage(page)
const saveButton = await todoPage.saveButton()
await saveButton.click()
```

This however generates a lot of extra boilerplate code by first waiting for the element and then calling the associated method on the element. Thankfully, Lariat makes this easier!

```ts
const todoPage = new TodoPage(page)
await todoPage.saveButton.click()
```

Not only that, but with Lariat you can access the underlying element selector using the `$` property on the element. For example, you could use this to wait for the element to become hidden.

```ts
const todoPage = new TodoPage(page)
await todoPage.saveButton.click()
await page.waitForSelector(todoPage.saveButton.$, { state: 'hidden' })
```

### Dynamic selectors

Because collections in Lariat are plain JavaScript classes, you can easily create elements with dynamic selectors. Consider a todo list where we find an item based on it's name. Our collection might look something like this:

```ts
class TodoPage extends Collection {
  item = (name: string) => this.el(`#todo-item[data-name="${name}"]`)
}

const todoPage = new TodoPage(page)
const item = await todoPage.item('Finish the website')()
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

## Specifying a collection root

When defining element collections, you may find yourself prefixing each element's selector with a common ancestor. This can be required when you are targeting elements from a component library where there may not be an attribute that uniquely identifies each element.

For example, consider a `TextField` collection which contains an `input` and `error` element.

```ts
class TextField extends Collection {
  input = this.el('#my-text-field .text-field-input')
  error = this.el('#my-text-field .text-field-error')
}
```

As you can see, we are forced to prefix both elements with `#my-text-field` to fully qualify the selectors. However, Lariat provides a better way!

```ts
class TextField extends Collection {
  root = this.el('#my-text-field')
  input = this.el('.text-field-input')
  error = this.el('.text-field-error')
}
```

By adding the `root` property, Lariat will automatically chain the selectors for all elements in the collection. Not only that, but you can still use the `root` property like any other element!

```ts
const textField = new TextField(page)
console.log(textField.root.$) // #my-text-field
console.log(textField.input.$) // #my-text-field >> .text-field-input
```

While this works well in many cases, your may want your collection to be generic where the `root` can be specified during instantiation. Good news, just pass a second argument with the value for `root` when instantiating your collection and you are good to go!

```ts
class TextField extends Collection {
  input = this.el('.text-field-input')
  error = this.el('.text-field-error')
}

new TextField(page, '#my-text-field')
```

## Nested collections

So far, we've shown examples of simple collections, but the true power of Lariat is in the ability to nest collections inside each other. With this approach, you can create a page object structure that resembles your page layout with multi-level selector chaining.

To nest a collection, use the `Collection.nest()` method and pass the nested collection class as the argument.

```ts
class TodoPage extends Collection {
  field = this.nest(TextField)
}

const todoPage = new TodoPage(page)
const input = await todoPage.field.input()
```

The `Collection.nest()` method will instantiate the nested collection for you, so if you need to pass a `root` property to the nested collection, simply add it as the second argument to `Collection.nest()`.

```ts
class TodoPage extends Collection {
  field = this.nest(TextField, '#todo-field')
}
```

### Nested selector chaining

By default, `Collection.nest()` will look for a `root` property on the parent collection and if it exists, it will chain that selector with the elements in the child collection. For example,

```ts
class TodoPage extends Collection {
  root = this.el('#todo-page')
  field = this.nest(TextField, '#todo-field')
}

const todoPage = new TodoPage(page)
console.log(todoPage.field.input.$) // #todo-page >> #todo-field >> .text-field-input
```

You can opt-out of selector chaining by passing an options argument to `Collection.nest()`.

```ts
class TodoPage extends Collection {
  root = this.el('#todo-page')
  field = this.nest(TextField, '#todo-field', { chain: false })
}

const todoPage = new TodoPage(page)
console.log(todoPage.field.input.$) // #todo-field >> .text-field-input
```
