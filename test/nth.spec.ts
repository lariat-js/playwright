import { expect, Page, test } from '@playwright/test'
import { Collection } from '../src'

const content = `
  <span>One</span>
  <span>Two</span>
  <span>Three</span>
`

class Parent extends Collection<Page> {
  span = this.nest(Collection, 'span')
}

test.describe('nth', () => {
  test('can select the first, nth, and last of a collection', async ({
    page,
  }) => {
    await page.setContent(content)
    const parent = new Parent(page)

    await expect(parent.span.first().root).toHaveText('One')
    await expect(parent.span.nth(1).root).toHaveText('Two')
    await expect(parent.span.last().root).toHaveText('Three')
  })
})
