---
id: Options
title: Options
---

`options` is an object with the following key/values:

```ts
/**
 * Used to log info during runtime which can be helpful during
 * development or debugging. But should be turned off in production.
 */
debug?: boolean;
jQuery?: JQueryStatic;
```

You have the ability to specify your own options to CheckoutStepManager if you need to.
If you don't pass options, then the [default options](./defaultOptions.md) are used instead.

Do note, that when passing in custom options they are combined with the default options.
Which means you don't need to worry about specifying every field!
