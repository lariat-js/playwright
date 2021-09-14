---
'lariat': patch
---

Improve type safety of `Collection.nest`. Previously you could pass a `string` or `Locator` as the nested collection root even if the nested collection accepts a `Page` or `Frame` as the root.
