import { expect, Page, test } from '@playwright/test'
import Collection from '../src'

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
      modal = this.el('#modal', { portal: true })
    }

    await page.setContent('<div id="content"></div><p id="modal">Hi</p>')
    const modalPage = new ModalPage(page.locator('#content'))
    await expect(modalPage.modal).toHaveText('Hi')
  })

  test('locates elements with specific text', async ({ page }) => {
    class TodoPage extends Collection<Page> {
      button = this.el('button', { hasText: 'Ho' })
    }

    await page.setContent('<button>Hi</button><button>Ho</button>')
    const todoPage = new TodoPage(page)
    await expect(todoPage.button).toHaveText('Ho')
  })

  test('locates elements that contain a locator', async ({ page }) => {
    class TodoPage extends Collection<Page> {
      button = this.el('button', { has: this.el('span') })
    }

    await page.setContent('<button><span>Hi</span></button><button>Ho</button>')
    const todoPage = new TodoPage(page)
    await expect(todoPage.button).toHaveText('Hi')
  })
})
