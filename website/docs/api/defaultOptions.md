---
id: defaultOptions
title: defaultOptions
---

These are the default options that are used if none are supplied to the [CheckoutStepManager constructor](./CheckoutStepManager.md#constructor):

```js
import $ from 'jquery'; // try to import and use jquery since it could be installed as a peer dependency

export const defaultOptions = {
    debug: false,
    jQuery: $,
};
```
