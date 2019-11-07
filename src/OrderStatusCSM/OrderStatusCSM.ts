import warning from 'tiny-warning';
import { EventManager } from '../EventManager';
import { IOrderStatusModifiers } from '../EventTarget/types';
import { IBaseCSM } from '~/shared/types';

export interface IOrderStatusCSM extends IBaseCSM {
    onCheckoutOnly: () => this;
    onOrderOnly: () => this;
}

export class OrderStatusCSM implements IOrderStatusCSM {
    private _eventManager: EventManager;
    private _onCheckoutOnly: boolean = false;
    private _onOrderOnly: boolean = false;

    public constructor(eventManager: EventManager) {
        this._eventManager = eventManager;
    }

    /**
     * Execute callback(s) on the very first time you
     * land on the Order Status page.
     */
    public onCheckoutOnly = () => {
        this._onCheckoutOnly = true;
        return this;
    };

    /**
     * Execute callback(s) on visits that
     * ARE NOT the very first time you
     * land on the Order Status page.
     */
    public onOrderOnly = () => {
        this._onOrderOnly = true;
        return this;
    };

    public execute = (...callbacks: Function[]) => {
        warning(
            !(this._onOrderOnly && this._onCheckoutOnly),
            `You wanted to execute callback(s) on the Order Status page but only on Checkout
            AND only on Order version. This results in the callbacks always being executed
            for each version of the Order Status page and not respecting your specific setting.
            Is this what you want? 

            If so, consider making these changes (psuedocode):
                
                Before:
                    checkoutStepManager
                        .forOrderStatus()
                    -   .onCheckoutOnly()
                    -   .onOrderOnly()
                        .execute();
                
                After:
                    checkoutStepManager
                        .forOrderStatus()
                        .execute()`
        );

        const modifiers: IOrderStatusModifiers = {
            onCheckoutOnly: this._onCheckoutOnly,
            onOrderOnly: this._onOrderOnly,
        };

        return this._eventManager.addOrderStatusEventListener(callbacks, modifiers);
    };
}
