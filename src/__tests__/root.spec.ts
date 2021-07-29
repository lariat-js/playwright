import { TestCollection } from './TestCollection'

class TextField extends TestCollection {
  input = this.el('.text-field-input')
}

class RootTextField extends TestCollection {
  root = this.el('#my-root')
  input = this.el('.text-field-input')
}

describe('Root element', () => {
  it('should prefix selectors when the root property is set', async () => {
    const textField = new RootTextField()
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
    // TODO: undefined
    expect(textField.root?.$).toBe('#root')
    expect(textField.input.$).toBe('#root .my-text-field')
  })
})
