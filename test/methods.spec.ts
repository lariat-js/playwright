import { expect, Page, test } from '@playwright/test'
import Collection from '../src/index.js'

class RootPage extends Collection<Page> {
  alt = this.getByAltText('my alt')
  label = this.getByLabel('my label')
  placeholder = this.getByPlaceholder('my placeholder')
  role = this.getByRole('button', { name: 'my role' })
  testId = this.getByTestId('my-test-id')
  text = this.getByText('My text')
  title = this.getByTitle('My title')
}

test.describe('Testing library methods', () => {
  test('getByAltText', async ({ page }) => {
    await page.setContent(`
      <img alt="foo" id="no" />
      <img alt="my alt" id="yes" />
    `)

    const rootPage = new RootPage(page)
    await expect(rootPage.alt).toHaveAttribute('id', 'yes')
  })

  test('getByLabel', async ({ page }) => {
    await page.setContent(`
      <label for="yes">my label</label>
      <input id="yes" />
      <label for="no">other</label>
      <input id="no" />
    `)

    const rootPage = new RootPage(page)
    await expect(rootPage.label).toHaveAttribute('id', 'yes')
  })

  test('getByPlaceholder', async ({ page }) => {
    await page.setContent(`
      <input id="no" placeholder="bar" />
      <input id="yes" placeholder="my placeholder" />
    `)

    const rootPage = new RootPage(page)
    await expect(rootPage.placeholder).toHaveAttribute('id', 'yes')
  })

  test('getByRole', async ({ page }) => {
    await page.setContent(`
      <button id="yes">my role</button>
      <input id="foo">my role</input>
      <p id="bar">my role</p>
    `)

    const rootPage = new RootPage(page)
    await expect(rootPage.role).toHaveAttribute('id', 'yes')
  })

  test('getByTestId', async ({ page }) => {
    await page.setContent(`
      <p data-testid="my-test-id">yes</p>
      <p data-testid="foo">no</p>
    `)

    const rootPage = new RootPage(page)
    await expect(rootPage.testId).toHaveText('yes')
  })

  test('getByText', async ({ page }) => {
    await page.setContent(`
      <p id="yes">my text</p>
      <p id="no">other</p>
    `)

    const rootPage = new RootPage(page)
    await expect(rootPage.text).toHaveAttribute('id', 'yes')
  })

  test('getByTitle', async ({ page }) => {
    await page.setContent(`
      <p title="foo">no</p>
      <p title="my title">yes</p>
    `)

    const rootPage = new RootPage(page)
    await expect(rootPage.title).toHaveText('yes')
  })
})
