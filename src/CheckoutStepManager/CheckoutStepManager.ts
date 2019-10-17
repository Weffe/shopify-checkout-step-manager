import { CheckoutStep, CheckoutPage, PageEvent } from './enums';
import { info } from './infoLogger'
import { IOptions, defaultOptions } from './options'


/**
 * 
 * @example
 * checkoutStepManager.onAnySectionRepaint().forContactInformationStep().execute(callback);
 * checkoutStepManager.forShippingMethodStep().execute(callback)
 */
export class CheckoutStepManager {
    public useLogging: boolean;
    private step: CheckoutStep | undefined;
    private page: CheckoutPage | undefined;
    private withAnySectionRepaint: boolean = false;
    private withAnyStep: boolean = false;
    private withAnyPage: boolean = false;

    /**
     * When creating an instance of CheckoutStepManager you
     * can specify options. Currently, you can only specify if you
     * want the CheckoutStepManager to log information about when
     * callbacks were executed during runtime.
     * 
     * @param options {Object}
     */
    public constructor(options: IOptions = defaultOptions) {
        this.useLogging = options.useLogging;
    }

    private _trigger = (callbacks: Function[], eventName: string) => {
        if (this.useLogging) {
            console.group(`[CheckoutStepManager] - Event: ${eventName}`)
        }

        for (const cb of callbacks) {
            try {
                if (this.useLogging) {
                    if (cb.name) {
                        info(`Executing callback ${cb.name}().`)
                    }
                    else {
                        info(`Executing anonymous callback.`)
                    }
                }
                cb();
            }
            catch (e) {
                console.error(e);
            }
        }

        if(this.useLogging) {
            console.groupEnd();
        }
    }

    private _observeAnyRepaint = (callbacks: Function[]): Function => {
        const eventName = 'Any Repaint';
        const handleAnyRepaint = () => {
            this._trigger(callbacks, eventName);
        }

        window.addEventListener(PageEvent.PAGE_CHANGE, handleAnyRepaint);

        return () => {
            window.removeEventListener(PageEvent.PAGE_CHANGE, handleAnyRepaint);
        }
    }

    private _observeAnyPageChange = (callbacks: Function[]): Function => {
        const eventName = 'Any Page Change';

        /**
         * Only trigger callbacks on supported checkout page values
         */
        const handleAnyPageChange = () => {
            const { page } = window.Shopify.Checkout;

            switch (page) {
                case 'forward':
                    this._trigger(callbacks, eventName);
                    break;
                case 'processing':
                    this._trigger(callbacks, eventName);
                    break;
                case 'show':
                    this._trigger(callbacks, eventName);
                    break;
                case 'stock_problems':
                    this._trigger(callbacks, eventName);
                    break;
                case 'thank_you':
                    this._trigger(callbacks, eventName);
                    break;
                default:
                    return;
            }
        }

        window.addEventListener(PageEvent.PAGE_LOAD, handleAnyPageChange);

        return () => {
            window.removeEventListener(PageEvent.PAGE_LOAD, handleAnyPageChange);
        }
    }

    private _observeAnyStepChange = (callbacks: Function[]): Function => {
        const eventName = 'Any Step Change';

        /**
         * Only trigger callbacks on supported checkout step values
         */
        const handleAnyStepChange = () => {
            const { step } = window.Shopify.Checkout;
            
            switch (step) {
                case 'contact_information':
                    this._trigger(callbacks, eventName);
                    break;
                case 'payment_method':
                    this._trigger(callbacks, eventName);
                    break;
                case 'processing':
                    this._trigger(callbacks, eventName);
                    break;
                case 'review':
                    this._trigger(callbacks, eventName);
                    break;
                case 'shipping_method':
                    this._trigger(callbacks, eventName);
                    break;
                default:
                    return;
            }
        }

        window.addEventListener(PageEvent.PAGE_LOAD, handleAnyStepChange);

        return () => {
            window.removeEventListener(PageEvent.PAGE_LOAD, handleAnyStepChange);
        }
    }

    private _observeSpecificStep = (forStep: CheckoutStep, callbacks: Function[]): Function => {
        const eventName = `Only for ${forStep} step`;
        const { step } = window.Shopify.Checkout;

        const handleSpecificStep = () => {
            if (step?.toLowerCase() === forStep.toLowerCase()) {
                this._trigger(callbacks, eventName);
            }
        }

        window.addEventListener(PageEvent.PAGE_LOAD, handleSpecificStep);

        return () => {
            window.removeEventListener(PageEvent.PAGE_LOAD, handleSpecificStep);
        }
    }

    private _observeSpecificPage = (forPage: CheckoutPage, callbacks: Function[]): Function => {
        const eventName = `Only for ${forPage} page`;
        
        const { page } =window.Shopify.Checkout;

        const handleSpecificPage = () => {
            if (page?.toLowerCase() === forPage.toLowerCase()) {
                this._trigger(callbacks, eventName);
            }
        }  

        window.addEventListener(PageEvent.PAGE_LOAD, handleSpecificPage);

        return () => {
            window.removeEventListener(PageEvent.PAGE_LOAD, handleSpecificPage);
        }
    }

    /**
     * This method takes in any number of functions as parameters and executes
     * them based on the previous executed fluent methods.
     * 
     * @returns Returns a function that will remove any event listeners that were added
     * 
     * @example
     * checkoutStepManager.onAnySectionRepaint().forContactInformationStep().execute(callback1, callback2); 
     */
    public execute = (...callbacks: Function[]): Function => {
        let removeSpecificStepListener: Function | undefined;
        let removeSpecificPageListener: Function | undefined;
        let removeAnyRepaintListener: Function | undefined;
        let removeAnyStepChangeListener: Function | undefined;
        let removeAnyPageChangeListener: Function | undefined;

        if (this.step) {
            removeSpecificStepListener = this._observeSpecificStep(this.step, callbacks);
        }

        if (this.page) {
            removeSpecificPageListener = this._observeSpecificPage(this.page, callbacks);
        }

        if (this.withAnySectionRepaint) {
            removeAnyRepaintListener = this._observeAnyRepaint(callbacks);
        }

        if (this.withAnyStep) {
            removeAnyStepChangeListener = this._observeAnyStepChange(callbacks);
        }   

        if (this.withAnyPage) {
            removeAnyPageChangeListener = this._observeAnyPageChange(callbacks);
        }
        
        // finally reset settings for the next usage of this instance
        this.reset();

        const removeListeners = () => {
            removeSpecificStepListener?.();
            removeSpecificPageListener?.();
            removeAnyRepaintListener?.();
            removeAnyStepChangeListener?.();
            removeAnyPageChangeListener?.();
        }

        return removeListeners;
    }

    /**
     * If you need to manually reset the CheckoutStepManager's options
     * that you've started to configure by calling some of the fluent
     * methods, then call the `checkoutStepManager.reset()` method.
     */
    public reset = () => {
        this.step = undefined;
        this.page = undefined;
        this.withAnySectionRepaint = false;
        this.withAnyStep = false;
        this.withAnyPage = false;
    }

    //#region Fluent Methods
    /**
     * This covers the case when you need to react to section updates (repaints)
     * that does not include full page reloads.
     */
    public onAnySectionRepaint = () => {
        this.withAnySectionRepaint = true;
        return this;
    }

    /**
     * Perform work on any Checkout step
     * 
     * For reference as to what the Shopify Checkout steps are
     * @see https://help.shopify.com/en/themes/development/layouts/checkout#shopify-checkout-step
     */
    public onAnyStep = () => {
        this.withAnyStep = true;
        return this;
    }

    /**
     * Perform work on any Checkout "page"
     *
     * For reference as to what the Shopify Checkout pages are
     * @see https://help.shopify.com/en/themes/development/layouts/checkout#shopify-checkout-page
     */
    public onAnyPage = () => {
        this.withAnyPage = true;
        return this;
    }
        
    public forContactInformationStep = () => {
        this.step = CheckoutStep.CONTACT_INFORMATION;
        return this;
    }

    public forShippingMethodStep = () => {
        this.step = CheckoutStep.SHIPPING_METHOD;
        return this;
    }

    public forPaymentMethodstep = () => {
        this.step = CheckoutStep.PAYMENT_METHOD;
        return this;
    }

    public forProcessingStep = () => {
        this.step = CheckoutStep.PROCESSING;
        return this;
    }

    public forReviewStep = () => {
        this.step = CheckoutStep.REVIEW;
        return this;
    }    

    public forShowPage = () => {
        this.page = CheckoutPage.SHOW;
        return this;
    }

    public forStockProblemsPage = () => {
        this.page = CheckoutPage.STOCK_PROBLEMS;
        return this;
    }

    public forProcessingPage = () => {
        this.page = CheckoutPage.PROCESSING;
        return this;
    }

    public forForwardPage = () => {
        this.page = CheckoutPage.FORWARD;
        return this;
    }

    public forThankYouPage = () => {
        this.page = CheckoutPage.THANK_YOU;
        return this;
    }
    //#endregion Fluent Methods
}