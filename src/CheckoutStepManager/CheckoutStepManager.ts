import { AnyizeCSM, AnyizeType } from '../AnyizeCSM';
import { SpecificStepCSM } from '../SpecificStepCSM';
import { SpecificPageCSM } from '../SpecificPageCSM';
import { OrderStatusCSM } from '../OrderStatusCSM';
import { EventManager } from '../EventManager';
import { CheckoutStep, CheckoutPage } from '~/shared/enums';
import { defaultOptions } from '~/shared/defaultOptions';
import { IOptions } from '~/shared/types';

/**
 *
 * @example
 * checkoutStepManager.onAnySectionRepaint().forContactInformationStep().execute(callback);
 * checkoutStepManager.forShippingMethodStep().execute(callback)
 */
export class CheckoutStepManager {
    private _eventManager: EventManager;

    /**
     * When creating an instance of CheckoutStepManager you
     * can specify options. Currently, you can only specify if you
     * want the CheckoutStepManager to log information about when
     * callbacks were executed during runtime.
     *
     * @param options {Object}
     */
    public constructor(options: IOptions = defaultOptions) {
        this._eventManager = new EventManager(options);
    }

    //#region Fluent Methods
    /**
     * This covers the case when you need to react to section updates (repaints)
     * that does not include full page reloads.
     */
    public forAnyRepaint = () => {
        return new AnyizeCSM(AnyizeType.ANY_REPAINT, this._eventManager);
    };

    /**
     * Perform work on any Checkout step
     *
     * For reference as to what the Shopify Checkout steps are
     * @see https://help.shopify.com/en/themes/development/layouts/checkout#shopify-checkout-step
     */
    public forAnyStep = () => {
        return new AnyizeCSM(AnyizeType.ANY_STEP, this._eventManager);
    };

    /**
     * Perform work on any Checkout "page"
     *
     * For reference as to what the Shopify Checkout pages are
     * @see https://help.shopify.com/en/themes/development/layouts/checkout#shopify-checkout-page
     */
    public forAnyPage = () => {
        return new AnyizeCSM(AnyizeType.ANY_PAGE, this._eventManager);
    };

    public forContactInformationStep = () => {
        return new SpecificStepCSM(CheckoutStep.CONTACT_INFORMATION, this._eventManager);
    };

    public forShippingMethodStep = () => {
        return new SpecificStepCSM(CheckoutStep.SHIPPING_METHOD, this._eventManager);
    };

    public forPaymentMethodstep = () => {
        return new SpecificStepCSM(CheckoutStep.PAYMENT_METHOD, this._eventManager);
    };

    public forProcessingStep = () => {
        return new SpecificStepCSM(CheckoutStep.PROCESSING, this._eventManager);
    };

    public forReviewStep = () => {
        return new SpecificStepCSM(CheckoutStep.REVIEW, this._eventManager);
    };

    public forShowPage = () => {
        return new SpecificPageCSM(CheckoutPage.SHOW, this._eventManager);
    };

    public forStockProblemsPage = () => {
        return new SpecificPageCSM(CheckoutPage.STOCK_PROBLEMS, this._eventManager);
    };

    public forProcessingPage = () => {
        return new SpecificPageCSM(CheckoutPage.PROCESSING, this._eventManager);
    };

    public forForwardPage = () => {
        return new SpecificPageCSM(CheckoutPage.FORWARD, this._eventManager);
    };

    public forThankYouPage = () => {
        return new SpecificPageCSM(CheckoutPage.THANK_YOU, this._eventManager);
    };

    /**
     * Order Status is a special page that exists during checkout and
     * after a customer has purchased their products.
     *
     * For more info @see https://help.shopify.com/en/themes/development/layouts/checkout#shopify-checkout-orderstatus
     */
    public forOrderStatus = () => {
        return new OrderStatusCSM(this._eventManager);
    };
    //#endregion Fluent Methods
}
