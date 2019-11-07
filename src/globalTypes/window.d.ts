/**
 * These are types for the global Shopify variable that's present on
 * the window in Checkout. These are incomplete typings and only type the variables
 * that this library needs.
 */

interface IShopify {
    Checkout: {
        step?: 'contact_information' | 'shipping_method' | 'payment_method' | 'processing' | 'review';
        page?: 'show' | 'stock_problems' | 'processing' | 'forward' | 'thank_you';
        OrderStatus?: object;
    };
}

interface Window {
    Shopify: IShopify;
}
