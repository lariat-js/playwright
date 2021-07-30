import { expect, test } from '@playwright/test'
import { Collection } from '../../src'

class Child extends Collection {
  input = this.el('input')
}

test.describe('Nested collections', () => {
  test('locate child elements relative to the child root', async ({ page }) => {
    class Parent extends Collection {
      child = this.nest(Child, '#child')
    }

    await page.setContent(
      '<input id="outer"><div id="child"><input id="inner"></div>'
    )

    const parent = new Parent(page)
    await expect(parent.child.input).toHaveId('inner')
    await expect(parent.child.input).toHaveCount(1)
  })

  test('can use the parent root in the child', async ({ page }) => {
    class Parent extends Collection {
      child = this.nest(Child, this.root)
    }

    await page.setContent(
      '<input id="outer"><div id="child"><input id="inner"></div>'
    )

    const parent = new Parent(page)
    await expect(parent.child.input).toHaveCount(2)
  })

  test('can escape nesting using the page root', async ({ page }) => {
    class Parent extends Collection {
      child = this.nest(Child, this.origin)
    }

    await page.setContent('<div id="content"></div><input id="hi">')
    const modalPage = new Parent(page)
    await expect(modalPage.child.input).toHaveId('hi')
  })
})
