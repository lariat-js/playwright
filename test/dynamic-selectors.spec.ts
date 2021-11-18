import { expect, Page, test } from '@playwright/test'
import Collection from '../src'

class TodoPage extends Collection<Page> {
  item = (name: string) => this.el(`[data-name="${name}"]`)
}

test.describe('Dynamic selectors', () => {
  test('creates an element from a dynamic selector', async ({ page }) => {
    await page.setContent(
      '<li data-name="Hi">One</li><li data-name="Ho">Two</li>'
    )
    const todoPage = new TodoPage(page)
    await expect(todoPage.item('Ho')).toHaveText('Two')
  })
})
