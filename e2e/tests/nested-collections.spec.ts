import { expect, Frame, Locator, Page, test } from '@playwright/test'
import { Collection } from '../../src'

class Child extends Collection<Page | Frame | Locator> {
  input = this.el('input')
}

test.describe('Nested collections', () => {
  test('locate child elements relative to the child root', async ({ page }) => {
    class Parent extends Collection<Page> {
      childLocator = this.nest(Child, this.el('#child'))
      childString = this.nest(Child, '#child')
    }

    await page.setContent(
      '<input id="outer"><div id="child"><input id="inner"></div>'
    )

    const parent = new Parent(page)
    await expect(parent.childLocator.input).toHaveId('inner')
    await expect(parent.childLocator.input).toHaveCount(1)
    await expect(parent.childString.input).toHaveId('inner')
    await expect(parent.childString.input).toHaveCount(1)
  })

  test('can use the parent root in the child', async ({ page }) => {
    class Parent extends Collection<Page> {
      child = this.nest(Child, this.root)
    }

    await page.setContent(
      '<input id="outer"><div id="child"><input id="inner"></div>'
    )

    const parent = new Parent(page)
    await expect(parent.child.input).toHaveCount(2)
  })

  test('can escape nesting using the frame property', async ({ page }) => {
    class Parent extends Collection {
      child = this.nest(Child, this.frame)
    }

    await page.setContent('<div id="content"></div><input id="hi">')
    const modalPage = new Parent(page.locator('#content'))
    await expect(modalPage.child.input).toHaveId('hi')
  })
})
