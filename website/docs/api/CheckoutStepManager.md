---
id: CheckoutStepManager
title: CheckoutStepManager
---

This is the main class you will be use.

## Constructor

### `new (options: IOptions = defaultOptions): CheckoutStepManager`

If you don't pass in options to the constructor, then there are default options that
will be used. You can see the default options [here](./defaultOptions.md).

## Methods

### `forAnyRepaint(): AnyizeCSM`

### `forAnyStep(): AnyizeCSM`

### `forAnyPage(): AnyizeCSM`

### `forContactInformationStep(): SpecificStepCSM`

### `forShippingMethodStep(): SpecificStepCSM`

### `forPaymentMethodStep(): SpecificStepCSM`

### `forProcessingStep(): SpecificStepCSM`

### `forReviewStep(): SpecificStepCSM`

### `forShowPage(): SpecificPageCSM`

### `forStockProblemsPage(): SpecificPageCSM`

### `forProcessingPage(): SpecificPageCSM`

### `forForwardPage(): SpecificPageCSM`

### `forThankYouPage(): SpecificPageCSM`

### `forOrderStatus(): OrderStatusCSM`
