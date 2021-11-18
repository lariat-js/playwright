import { expect, FrameLocator, Page, test } from '@playwright/test'
import Collection from '../src'

test.describe('Frame locators', () => {
  test('accepts a frame locator as the root', async ({ page }) => {
    class ExamplePage extends Collection<FrameLocator> {
      header = this.el('h1')
    }

    await page.setContent('<iframe src="http://example.com" id="my-frame">')
    const examplePage = new ExamplePage(page.frameLocator('#my-frame'))
    await expect(examplePage.header).toHaveText('Example Domain')
  })

  test('can access single elements in a frame', async ({ page }) => {
    class ExamplePage extends Collection<Page> {
      header = this.el('h1', { frame: '#my-frame' })
    }

    await page.setContent('<iframe src="http://example.com" id="my-frame">')
    const examplePage = new ExamplePage(page)
    await expect(examplePage.header).toHaveText('Example Domain')
  })

  test('can nest collections inside frame locators', async ({ page }) => {
    class FramePage extends Collection<FrameLocator> {
      header = this.el('h1')
    }

    class ExamplePage extends Collection<Page> {
      inner = this.nest(FramePage, this.page.frameLocator('#my-frame'))
    }

    await page.setContent('<iframe src="http://example.com" id="my-frame">')
    const examplePage = new ExamplePage(page)
    await expect(examplePage.inner.header).toHaveText('Example Domain')
  })
})
