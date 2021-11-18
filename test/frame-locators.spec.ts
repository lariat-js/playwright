import { expect, FrameLocator, test } from '@playwright/test'
import Collection from '../src'

class ExamplePage extends Collection<FrameLocator> {
  header = this.el('h1')
}

test.describe('Frame locators', () => {
  test('accepts a frame locator as the root', async ({ page }) => {
    await page.setContent('<iframe src="http://example.com" id="my-frame">')
    const examplePage = new ExamplePage(page.frameLocator('#my-frame'))
    await expect(examplePage.header).toHaveText('Example Domain')
  })
})
