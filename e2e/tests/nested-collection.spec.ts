import { expect, test } from '@playwright/test'
import { Collection } from '../../src'

class Child extends Collection {
  input = this.el('input')
}

test.describe('Nested collection', () => {
  test('locate child elements relative to the child root', async ({ page }) => {
    class Parent extends Collection {
      child = this.nest(Child, '#child')
    }

    await page.setContent(
      '<input id="outer"><div id="child"><input id="inner"></div>'
    )
    const parent = new Parent(page)
    expect(parent.child.input).toHaveId('inner')
  })
})
