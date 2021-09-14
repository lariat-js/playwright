---
'lariat': minor
---

Rename `Collection.origin` to `Collection.frame` and ensure that a frame is always returned. This is used internally by the `portal` option but can continue to be used for nesting collections where the nested collection should not be part of the parent collections locator chain.
