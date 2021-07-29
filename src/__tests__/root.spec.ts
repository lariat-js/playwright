import { TestCollection } from './TestCollection'

class TextField extends TestCollection {
  input = this.el('.my-text-field')
}

class RootTextField extends TestCollection {
  root = this.el('#my-root')
  input = this.el('.my-text-field')
}

describe('Root element', () => {
  it('should prefix selectors when the root property is set', async () => {
    const textField = new RootTextField()
    expect(textField.root.$).toBe('#my-root')
    expect(textField.input.$).toBe('#my-root >> .my-text-field')
  })

  it('should use the root from the constructor when the root property is not set', () => {
    const textField = new TextField('#root')
    // TODO: undefined
    expect(textField.root?.$).toBe('#root')
    expect(textField.input.$).toBe('#root >> .my-text-field')
  })
})
