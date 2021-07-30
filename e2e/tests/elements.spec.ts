import { expect, test } from '@playwright/test'
import { Collection } from '../../src'

class RootPage extends Collection {
  inner = this.el('p')
}

test.describe('Elements', () => {
  test('provides access to the root element', async ({ page }) => {
    await page.setContent('<p>One</p><span>Two</span>')
    const rootPage = new RootPage(page.locator('p'))
    await expect(rootPage.root).toHaveText('One')
  })

  test('scopes elements inside the root element', async ({ page }) => {
    await page.setContent('<p>Outer</p><div><p>Inner</p></div>')
    const rootPage = new RootPage(page.locator('div'))
    await expect(rootPage.inner).toHaveText('Inner')
  })

  test('can escape nesting using the portal option', async ({ page }) => {
    class ModalPage extends Collection {
      root = this.el('#content')
      modal = this.el('#modal', { portal: true })
    }

    await page.setContent('<div id="content"></div><p id="modal">Hi</p>')
    const modalPage = new ModalPage(page)
    await expect(modalPage.modal).toHaveText('Hi')
  })

  test('class field does not matter', async ({ page }) => {
    // Basically, we want to ensure that the `root` property doesn't magically
    // work just because it is often defined first in the class.
    class OrderPage extends Collection {
      button = this.el('button')
      root = this.el('#content')
    }

    await page.setContent(
      '<button>Outside</button><div id="content"><button>Inner</button></div>'
    )
    const orderPage = new OrderPage(page)
    await expect(orderPage.button).toHaveText('Inner')
  })
})
