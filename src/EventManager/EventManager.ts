import invariant from 'tiny-invariant';
import { AnyizeType } from '../AnyizeCSM';
import { eventListenerFactory } from './eventListener'
import { IEventPageTarget, IEventStepTarget, IStepTargetModifiers, IPageTargetModifiers, IOrderStatusModifiers } from '../EventTarget/types';
import { debug } from '../shared/logger';
import { 
    CheckoutPage, 
    CheckoutStep, 
    PageEvent,
} from '../shared/enums';
import { IOptions } from '../shared/types';

let prevPage: typeof window.Shopify.Checkout["page"];
let prevStep: typeof window.Shopify.Checkout["step"];

/**
 * Manages wiring up event listeners
 */
export class EventManager {
    private _debug: boolean;
    private _addEventListener: ReturnType<typeof eventListenerFactory>["addEventListener"];
    private _removeEventListener: ReturnType<typeof eventListenerFactory>["removeEventListener"];

    public constructor(options: Required<IOptions>) {
        this._debug = options.debug;
        const {
            addEventListener,
            removeEventListener
        } = eventListenerFactory(options.jQuery)

        this._addEventListener = addEventListener;
        this._removeEventListener = removeEventListener;
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
        const eventName = `(${PageEvent.PAGE_CHANGE}) Any Repaint`;
        const handleAnyRepaint = () => {
            this._trigger(callbacks, eventName);
        }

        this._addEventListener(PageEvent.PAGE_CHANGE, handleAnyRepaint);

        return () => {
            this._removeEventListener(PageEvent.PAGE_CHANGE, handleAnyRepaint);
        }
    }

    private _observeAnyPageChange = (callbacks: Function[]): Function => {
        const eventName = 'Any Page Change';

        /**
         * Only trigger callbacks on supported checkout page values
         */
        const handleAnyPageFactory = (eventType: PageEvent) => () => {
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
                this._trigger(callbacks, `(${eventType}) ${eventName} for "${page}"`);
            }
        }

        const handleAnyPageLoad = handleAnyPageFactory(PageEvent.PAGE_LOAD);
        const handleAnyPageChange = handleAnyPageFactory(PageEvent.PAGE_CHANGE);

        this._addEventListener(PageEvent.PAGE_LOAD, handleAnyPageLoad);
        this._addEventListener(PageEvent.PAGE_CHANGE, handleAnyPageChange);

        return () => {
            this._removeEventListener(PageEvent.PAGE_LOAD, handleAnyPageLoad);
            this._removeEventListener(PageEvent.PAGE_CHANGE, handleAnyPageChange);
        }
    }

    private _observeAnyStepChange = (callbacks: Function[]): Function => {
        const eventName = 'Any Step Change';

        const handleAnyStepFactory = (eventType: PageEvent) => () => {
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
                this._trigger(callbacks, `(${eventType}) ${eventName} for "${step}"`);
            }
        }

        const handleAnyStepLoad = handleAnyStepFactory(PageEvent.PAGE_LOAD);
        const handleAnyStepChange = handleAnyStepFactory(PageEvent.PAGE_CHANGE);

        this._addEventListener(PageEvent.PAGE_LOAD, handleAnyStepLoad);
        this._addEventListener(PageEvent.PAGE_CHANGE, handleAnyStepChange);

        return () => {
            this._removeEventListener(PageEvent.PAGE_LOAD, handleAnyStepLoad);
            this._removeEventListener(PageEvent.PAGE_CHANGE, handleAnyStepChange);
        }
    }

    private _observeSpecificStep = (forStep: CheckoutStep, callbacks: Function[], modifiers?: IStepTargetModifiers): Function => {
        const eventName = `Only for "${forStep}" step`;
        let removeWithAnyPageListener: Function | undefined;
        let removeWithAnyRepaintListener: Function | undefined;
        let removeWithSpecificPageListener: Function | undefined;
        
        const handleSpecificStepFactory = (eventType: PageEvent) => () => {
            const step = window.Shopify.Checkout.step?.toLowerCase();

            if (step === forStep) {
                /** 
                 * Only add additional listeners and trigger callbacks on page:load.
                 * We use the page:change only for removing additional listeners
                 * that were created from modifiers when the step changes.
                 */
                if (eventType === PageEvent.PAGE_LOAD) {
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
                    this._trigger(callbacks, `(${eventType}) ${eventName}`);
                }
            }
            else {
                removeWithAnyPageListener?.();
                removeWithAnyRepaintListener?.();
                removeWithSpecificPageListener?.();
            }
        }

        const handleSpecificStepLoad = handleSpecificStepFactory(PageEvent.PAGE_LOAD);
        const handleSpecificStepChange = handleSpecificStepFactory(PageEvent.PAGE_CHANGE);

        this._addEventListener(PageEvent.PAGE_LOAD, handleSpecificStepLoad);
        this._addEventListener(PageEvent.PAGE_CHANGE, handleSpecificStepChange);

        return () => {
            this._removeEventListener(PageEvent.PAGE_LOAD, handleSpecificStepLoad);
            this._removeEventListener(PageEvent.PAGE_CHANGE, handleSpecificStepChange);
        }
    }

    private _observeSpecificPage = (forPage: CheckoutPage, callbacks: Function[], modifiers?: IPageTargetModifiers): Function => {
        const eventName = `Only for "${forPage}" page`;
        let removeWithAnyStepListener: Function | undefined;
        let removeWithAnyRepaintListener: Function | undefined;
        let removeWithSpecificStepListener: Function | undefined;

        const handleSpecificPageFactory = (eventType: PageEvent) => () => {
            const page = window.Shopify.Checkout.page?.toLowerCase();

            if (page === forPage) {
                /** 
                 * Only add additional listeners and trigger callbacks on page:load.
                 * We use the page:change only for removing additional listeners
                 * that were created from modifiers when the step changes.
                 */
                if (eventType === PageEvent.PAGE_LOAD) {
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
                    this._trigger(callbacks, `(${eventType}) ${eventName}`);
                }
            }
            else {
                removeWithAnyStepListener?.();
                removeWithAnyRepaintListener?.();
                removeWithSpecificStepListener?.();
            }
        }  

        const handleSpecificPageChange = handleSpecificPageFactory(PageEvent.PAGE_CHANGE);
        const handleSpecificPageLoad = handleSpecificPageFactory(PageEvent.PAGE_LOAD);
        
        this._addEventListener(PageEvent.PAGE_LOAD, handleSpecificPageLoad);
        this._addEventListener(PageEvent.PAGE_CHANGE, handleSpecificPageChange);
        
        return () => {
            this._removeEventListener(PageEvent.PAGE_LOAD, handleSpecificPageLoad);
            this._removeEventListener(PageEvent.PAGE_CHANGE, handleSpecificPageChange);
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
                    this._trigger(callbacks, `(${PageEvent.PAGE_LOAD}) ${eventName}`);
                }
            }
        }  

        this._addEventListener(PageEvent.PAGE_LOAD, handleOrderStatus);

        return () => {
            this._removeEventListener(PageEvent.PAGE_LOAD, handleOrderStatus);
        }
    }
};