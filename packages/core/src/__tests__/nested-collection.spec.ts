import { TestCollection } from './TestCollection'

class Child extends TestCollection {
  input = this.el('.text-field-input')
}

class RootedChild extends Child {
  root = this.el('#child-root')
}

class Parent extends TestCollection {
  child = this.nest(Child)
  rootedChild = this.nest(RootedChild)
  parent = this.el('.parent')
}

class RootedParent extends Parent {
  root = this.el('#parent-root')
}

describe('Nested collection', () => {
  it('should prefix selectors when the root property is set', async () => {
    const textField = new CHild()
    expect(textField.root.$).toBe('#my-root')
    expect(textField.input.$).toBe('#my-root .my-text-field')
  })

  it('should override the root property when passing a root in the constructor', () => {
    const textField = new RootTextField('#new-root')
    expect(textField.root.$).toBe('#new-root')
    expect(textField.input.$).toBe('#new-root .my-text-field')
  })

  it('should use the root from the constructor when the root property is not set', () => {
    const textField = new TextField('#root')
    expect(textField.root.$).toBe('#root')
    expect(textField.input.$).toBe('#root .my-text-field')
  })
})
