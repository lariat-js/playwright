import { expect, FrameLocator, Page, test } from '@playwright/test'
import Collection from '../src'

test.describe.parallel('Frame locators', () => {
  test('accepts a frame locator as the root', async ({ page }) => {
    class ExamplePage extends Collection<FrameLocator> {
      header = this.el('h1')
    }

    await page.setContent('<iframe src="https://example.com" id="my-frame">')
    const examplePage = new ExamplePage(page.frameLocator('#my-frame'))
    await expect(examplePage.header).toHaveText('Example Domain')
  })

  test('can access single elements in a frame', async ({ page }) => {
    class ExamplePage extends Collection<Page> {
      header = this.el('h1', { frame: '#my-frame' })
      moreInfo = this.getByRole('link', { frame: '#my-frame' })
    }

    await page.setContent('<iframe src="https://example.com" id="my-frame">')
    const examplePage = new ExamplePage(page)
    await expect(examplePage.header).toHaveText('Example Domain')
    await expect(examplePage.moreInfo).toHaveText('More information...')
  })

  test.describe('nested', () => {
    class FramePage extends Collection<FrameLocator> {
      header = this.el('h1')
    }

    class ExamplePage extends Collection<Page> {
      inner = this.nest(FramePage, this.page.frameLocator('.my-frame'))
    }

    test('with a single frame', async ({ page }) => {
      await page.setContent(
        '<iframe src="https://example.com" class="my-frame">'
      )
      const examplePage = new ExamplePage(page)
      await expect(examplePage.inner.header).toHaveText('Example Domain')
    })

    test('with multiple frames', async ({ page }) => {
      await page.setContent(`
        <iframe src="https://example.com" class="my-frame"></iframe>
        <iframe src="https://playwright.dev" class="my-frame"></iframe>
        <iframe src="https://overreacted.io" class="my-frame"></iframe>
      `)
      const examplePage = new ExamplePage(page)
      const frame = examplePage.inner

      await expect(frame.first().header).toHaveText('Example Domain')
      await expect(frame.nth(1).header).toContainText('Playwright')
      await expect(frame.last().header).toHaveText('Overreacted')
    })
  })
})
