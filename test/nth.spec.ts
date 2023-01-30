import { expect, Page, test } from '@playwright/test'
import Collection from '../src/index.js'

const content = `
  <div>Child <span>One</span></div>
  <div>Child <span>Two</span></div>
  <div>Child <span>Three</span></div>
`

class Child extends Collection {
  span = this.el('span')
}

class Parent extends Collection<Page> {
  child = this.nest(Child, 'div')
}

test.describe('nth', () => {
  test('can select the first, nth, and last of a collection', async ({
    page,
  }) => {
    await page.setContent(content)
    const parent = new Parent(page)

    await expect(parent.child.first().root).toHaveText('Child One')
    await expect(parent.child.first().span).toHaveText('One')
    await expect(parent.child.nth(1).root).toHaveText('Child Two')
    await expect(parent.child.nth(1).span).toHaveText('Two')
    await expect(parent.child.last().root).toHaveText('Child Three')
    await expect(parent.child.last().span).toHaveText('Three')
  })
})
