/**
 * For reference as to what the Shopify Checkout steps are
 * @see https://help.shopify.com/en/themes/development/layouts/checkout#shopify-checkout-step
 */
export const enum CheckoutStep {
    CONTACT_INFORMATION = 'contact_information',
    SHIPPING_METHOD = 'shipping_method',
    PAYMENT_METHOD = 'payment_method',
    PROCESSING = 'processing',
    REVIEW = 'review',
}

/**
 * For reference as to what the Shopify Checkout pages are
 * @see https://help.shopify.com/en/themes/development/layouts/checkout#shopify-checkout-page
 */
export const enum CheckoutPage {
    SHOW = 'show',
    STOCK_PROBLEMS = 'stock_problems',
    PROCESSING = 'processing',
    FORWARD = 'forward',
    THANK_YOU = 'thank_you',
}

/**
 * For reference as to what the Shopify Checkout page events are
 * @see https://help.shopify.com/en/themes/development/layouts/checkout#page-events
 */
export const enum PageEvent {
    /** This event is triggered when the content of each step is loaded, showing a new "page". This should be the default event you use when adding content into the page on load. */
    PAGE_LOAD = 'page:load',
    /** This is triggered when the page is still the same, but sections have been “re-painted” (ie. the discount form is submitted). */
    PAGE_CHANGE = 'page:change',
}
