# Shopify Checkout Step Manager

Easily execute code during Shopify Checkout.

## Getting Started

Let's get you all set up!

## Install

First install the package.

### Using npm

`npm i shopify-checkout-step-manager`

### Using yarn

`yarn add shopify-checkout-step-manager`

## Use in your project

Once installed, you can then import and start using it in your project:

```js
import { CheckoutStepManager } from 'shopify-checkout-step-manager';

const csm = new CheckoutStepManager();

function runOnRepaint() {
    console.log('There was a repaint!');
}

const removeListener = csm.onAnyRepaint().execute(runOnRepaint);

// remove the repaint listener after 3 seconds
setTimeout(removeListener, 3000);
```

## Documentation

[Visit the online docs here](https://weffe.github.io/shopify-checkout-step-manager)
