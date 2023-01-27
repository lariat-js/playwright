import { expect, Page, test } from '@playwright/test'
import Collection from '../src/index.js'

class TodoPage extends Collection<Page> {
  button = this.el('"Click me"')

  async create() {
    await this.button.click()
    return this.button.isDisabled()
  }
}

test.describe('Utility methods', () => {
  test('can use elements inside utility methods', async ({ page }) => {
    await page.setContent('<button>Click me</button>')
    const todoPage = new TodoPage(page)
    expect(await todoPage.create()).toBe(false)
  })
})
