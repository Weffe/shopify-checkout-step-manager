import invariant from 'tiny-invariant';
import { AnyizeType } from '../AnyizeCSM';
import { IEventPageTarget, IEventStepTarget, IStepTargetModifiers, IPageTargetModifiers, IOrderStatusModifiers } from '../EventTarget/types';
import { debug } from '~/shared/logger';
import { 
    CheckoutPage, 
    CheckoutStep, 
    PageEvent,
} from '~/shared/enums';
import { IOptions } from '~/shared/types';

let prevPage: typeof window.Shopify.Checkout["page"];
let prevStep: typeof window.Shopify.Checkout["step"];

/**
 * Manages wiring up event listeners
 */
export class EventManager {
    private _debug: boolean;

    public constructor(options: IOptions) {
        this._debug = options.debug;
    }

    private _trigger = (callbacks: Function[], eventName: string) => {
        if (this._debug) {
            console.group(`[CheckoutStepManager] - Event: ${eventName}`)
        }

        for (const cb of callbacks) {
            try {
                if (this._debug) {
                    if (cb.name) {
                        debug(`Executing callback ${cb.name}().`)
                    }
                    else {
                        debug(`Executing anonymous callback.`)
                    }
                }
                cb();
            }
            catch (e) {
                console.error(e);
            }
        }

        if(this._debug) {
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
            const page = window.Shopify.Checkout.page?.toLowerCase();

            /**
             * We need to check if the prevPage and page has changed
             * because a customer can be on the same step but the page
             * could change.
             */
            if (
                prevPage !== page && (
                    page === 'forward'
                    || page === 'processing'
                    || page === 'show'
                    || page === 'stock_problems'
                    || page === 'thank_you'
                )
            ) {
                prevPage = page;
                this._trigger(callbacks, `${eventName} for "${page}"`);
            }
        }

        window.addEventListener(PageEvent.PAGE_LOAD_AND_CHANGE, handleAnyPageChange);

        return () => {
            window.removeEventListener(PageEvent.PAGE_LOAD_AND_CHANGE, handleAnyPageChange);
        }
    }

    private _observeAnyStepChange = (callbacks: Function[]): Function => {
        const eventName = 'Any Step Change';

        /**
         * Only trigger callbacks on supported checkout step values
         */
        const handleAnyStepChange = () => {
            const step = window.Shopify.Checkout.step?.toLowerCase();

            /**
             * We need to check if the prevStep and step has changed
             * because a the Checkout essentially is a Single Page App
             * that just renders new content for each step.
             */
            if (
                prevStep !== step && (
                    step === 'contact_information'
                    || step === 'payment_method'
                    || step === 'processing'
                    || step === 'review'
                    || step === 'shipping_method'
                )
            ) {
                prevStep = step;
                this._trigger(callbacks, `${eventName} for "${step}"`);
            }
        }

        window.addEventListener(PageEvent.PAGE_LOAD_AND_CHANGE, handleAnyStepChange);

        return () => {
            window.removeEventListener(PageEvent.PAGE_LOAD_AND_CHANGE, handleAnyStepChange);
        }
    }

    private _observeSpecificStep = (forStep: CheckoutStep, callbacks: Function[], modifiers?: IStepTargetModifiers): Function => {
        const eventName = `Only for ${forStep} step`;
        let removeWithAnyPageListener: Function | undefined;
        let removeWithAnyRepaintListener: Function | undefined;
        let removeWithSpecificPageListener: Function | undefined;
        
        const handleSpecificStep = () => {
            const step = window.Shopify.Checkout.step?.toLowerCase();

            if (step === forStep) {
                if (modifiers?.withAnyRepaint) {
                    removeWithAnyRepaintListener = this._observeAnyRepaint(callbacks);
                }

                /**
                 * Always prioritize with Any Page because there's
                 * no need to have a Specific Page listener when
                 * the callbacks are going to be triggered every
                 * on page change.
                 */
                if (modifiers?.withAnyPage) {
                    removeWithAnyPageListener = this._observeAnyPageChange(callbacks);
                }
                else if (modifiers?.withSpecificPage) {
                    removeWithSpecificPageListener = this._observeSpecificPage(modifiers.withSpecificPage, callbacks)
                }

                // always trigger the callbacks for the first time
                this._trigger(callbacks, eventName);
            }
            else {
                removeWithAnyPageListener?.();
                removeWithAnyRepaintListener?.();
                removeWithSpecificPageListener?.();
            }
        }

        window.addEventListener(PageEvent.PAGE_LOAD_AND_CHANGE, handleSpecificStep);

        return () => {
            window.removeEventListener(PageEvent.PAGE_LOAD_AND_CHANGE, handleSpecificStep);
        }
    }

    private _observeSpecificPage = (forPage: CheckoutPage, callbacks: Function[], modifiers?: IPageTargetModifiers): Function => {
        const eventName = `Only for ${forPage} page`;
        let removeWithAnyStepListener: Function | undefined;
        let removeWithAnyRepaintListener: Function | undefined;
        let removeWithSpecificStepListener: Function | undefined;

        const handleSpecificPage = () => {
            const page = window.Shopify.Checkout.page?.toLowerCase();

            if (page === forPage) {
                if (modifiers?.withAnyRepaint) {
                    removeWithAnyRepaintListener = this._observeAnyRepaint(callbacks);
                }

                /**
                 * Always prioritize with Any Step because there's
                 * no need to have a Specific Step listener when
                 * the callbacks are going to be triggered every
                 * on step change.
                 */
                if (modifiers?.withAnyStep) {
                    removeWithAnyStepListener = this._observeAnyStepChange(callbacks);
                }
                else if (modifiers?.withSpecificStep) {
                    removeWithSpecificStepListener = this._observeSpecificStep(modifiers.withSpecificStep, callbacks)
                }
                    
                // always trigger the callbacks for the first time
                this._trigger(callbacks, eventName);
            }
            else {
                removeWithAnyStepListener?.();
                removeWithAnyRepaintListener?.();
                removeWithSpecificStepListener?.();
            }
        }  

        window.addEventListener(PageEvent.PAGE_LOAD_AND_CHANGE, handleSpecificPage);

        return () => {
            window.removeEventListener(PageEvent.PAGE_LOAD_AND_CHANGE, handleSpecificPage);
        }
    }

    public addAnyizeEventListener = (anyizeType: AnyizeType, callbacks: Function[]): Function => {
        switch (anyizeType) {
            case AnyizeType.ANY_PAGE:
                return this._observeAnyPageChange(callbacks);
            case AnyizeType.ANY_STEP:
                return this._observeAnyStepChange(callbacks);
            case AnyizeType.ANY_REPAINT:
                return this._observeAnyRepaint(callbacks);
            default:
                invariant(false, `Internal Error. Did not receive the correct anyize type in addAnyizeEventListener() of EventManager.`);
        }
    }

    public addSpecificEventListener = (eventTarget: IEventPageTarget | IEventStepTarget, callbacks: Function[]): Function => {
        switch (eventTarget.type) {
            case "page":
                eventTarget
                return this._observeSpecificPage(eventTarget.page, callbacks, eventTarget.modifiers);
            case "step":
                return this._observeSpecificStep(eventTarget.step, callbacks, eventTarget.modifiers);
            default:
                invariant(false, `Internal Error. Did not receive the correct EventTarget type in addSpecificEventListener() of EventManager.`)
        }
    }

    public addOrderStatusEventListener = (callbacks: Function[], modifiers: IOrderStatusModifiers): Function => {
        const eventName = `Order Status`;

        const handleOrderStatus = () => {
            const { step, page, OrderStatus } = window.Shopify.Checkout;

            if (OrderStatus) {
                const isCheckoutOnly = Boolean(step) && Boolean(page);

                if (isCheckoutOnly && modifiers.onCheckoutOnly && !modifiers.onOrderOnly) {
                    this._trigger(callbacks, eventName);
                }
                else if (!isCheckoutOnly && modifiers.onOrderOnly && !modifiers.onCheckoutOnly) {
                    this._trigger(callbacks, eventName);
                }
                else if (
                    (modifiers.onCheckoutOnly && modifiers.onOrderOnly) 
                    || (!modifiers.onCheckoutOnly && !modifiers.onOrderOnly)
                ) {
                    // trigger on both versions of the Order Status page
                    // as a way without causing any unexpected effects
                    this._trigger(callbacks, eventName);
                }
            }
        }  

        window.addEventListener(PageEvent.PAGE_LOAD, handleOrderStatus);

        return () => {
            window.removeEventListener(PageEvent.PAGE_LOAD, handleOrderStatus);
        }
    }
}