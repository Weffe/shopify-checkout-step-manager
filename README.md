# Shopify Checkout Step Manager

Easily manage when to execute code during Shopify Checkout steps.

## Get Started

```
import { CheckoutStepManager } from 'shopify-checkout-step-manager';

const csm = new CheckoutStepManager();

csm.forAnyRepaint().execute(() => {
    console.log('Something just got repainted!');
});

csm.forContactInformationStep().execute(callbackA, callbackB, callbackC);

/**
 * In plain words,
 * execute callbackA only for the 'show' page on any repaint AND on any step.
 */
csm.forShowPage()
   .onAnyRepaint()
   .onAnyStep()
   .execute(callbackA)
```

## Quick Docs

### Jquery Peer Dependency

It's required to use jQuery as a peer dependency in order for this library to hook into the special "page" events that the Shopify's checkout script emits.

You can choose to `npm i jquery` and then import it in your app.

Or, you can manually set the jquery instance this library uses through the options:

`const csm = new CheckoutStepManager({ jQuery: window.$ });`

### Browser Script usage

This library emits a `umd` bundle that can be used if you want to include this library via a script tag.

This library is then exposed as `window.CheckoutStepManager`.
