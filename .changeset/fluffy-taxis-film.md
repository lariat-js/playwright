---
'lariat': minor
---

Add support for [frame locators](https://playwright.dev/docs/next/api/class-framelocator)! Collections can now be used with a frame locator as the root.

```ts
class TodoPage extends Collection<FrameLocator> {
  item = this.el('.todo-item')
}

new TodoPage(page.frameLocator('#my-frame'))
```
