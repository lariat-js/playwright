import { TestCollection } from './TestCollection'

class Child extends TestCollection {
  input = this.el('.input')
}

describe('Nested collection', () => {
  describe('when the parent does not have a root', () => {
    it('should not chain selectors', () => {
      class Parent extends TestCollection {
        child = this.nest(Child)
      }

      const parent = new Parent()
      expect(parent.child.input.$).toBe('.input')
    })

    it('should chain selectors with the root when passed', () => {
      class Parent extends TestCollection {
        child = this.nest(Child, '#root')
      }

      const parent = new Parent()
      // TODO: undefined
      expect(parent.child.root?.$).toBe('#root')
      expect(parent.child.input.$).toBe('#root >> .input')
    })
  })

  describe('when the parent has a root', () => {
    it.only('should chain selectors with the root', () => {
      class Parent extends TestCollection {
        root = this.el('#parent')
        child1 = this.nest(Child)
        child2 = this.nest(Child, '#child')
      }
      const parent = new Parent()

      expect(parent.child1.root).toBeUndefined()
      expect(parent.child1.input.$).toBe('#parent >> .input')

      // TODO: undefined
      expect(parent.child2.root?.$).toBe('#parent >> #child')
      expect(parent.child2.input.$).toBe('#parent >> #child >> .input')
    })

    it('can opt-out of chaining', () => {
      class Parent extends TestCollection {
        root = this.el('#parent')
        child1 = this.nest(Child, { chain: false })
        child2 = this.nest(Child, '#child', { chain: false })
      }
      const parent = new Parent()

      expect(parent.child1.root).toBeUndefined()
      expect(parent.child1.input.$).toBe('.input')

      // TODO: undefined
      expect(parent.child2.root?.$).toBe('#child')
      expect(parent.child2.input.$).toBe('#child >> .input')
    })
  })
})
