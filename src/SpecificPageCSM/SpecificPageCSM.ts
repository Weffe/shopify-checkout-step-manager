import warning from 'tiny-warning';
import { EventManager } from '../EventManager';
import { EventTarget } from '../EventTarget';
import { IPageTargetModifiers } from '../EventTarget/types';
import { CheckoutPage, CheckoutStep } from '~/shared/enums';
import { IBaseSpecificCSM } from '~/shared/types';

export interface ISpecificPageCSM extends IBaseSpecificCSM {
    onAnyStep: () => this;
}

export class SpecificPageCSM implements ISpecificPageCSM {
    private _page: CheckoutPage;
    private _eventManager: EventManager;
    private _withAnyStep: boolean = false;
    private _withAnyRepaint: boolean = false;
    private _withSpecificStep: CheckoutStep | undefined;

    public constructor(page: CheckoutPage, eventManager: EventManager) {
        this._page = page;
        this._eventManager = eventManager;
    }

    public onAnyRepaint = () => {
        this._withAnyRepaint = true;
        return this;
    };

    public onAnyStep = () => {
        this._withAnyStep = true;
        return this;
    };

    public onSpecificStep = (onSpecificStep: CheckoutStep) => {
        this._withSpecificStep = onSpecificStep;
        return this;
    };

    public execute = (...callbacks: Function[]): Function => {
        warning(
            !(this._withAnyStep && this._withSpecificStep),
            `You wanted to execute callback(s) only for "${this._page}" page with Any Step
            changes and on a Specific Step. This results in the callbacks always being executed
            and not respecting your Specific Step setting. Is this what you want? 

            If not, consider making these changes (psuedocode):
                
                Before:
                    checkoutStepManager
                        .forShowPage()
                        .onSpecificStep()
                    -   .onAnyStep();
                
                After:
                    checkoutStepManager
                        .forShowPage()
                        .onSpecificStep();`
        );

        const modifiers: IPageTargetModifiers = {
            withAnyRepaint: this._withAnyRepaint,
            withAnyStep: this._withAnyStep,
            withSpecificStep: this._withSpecificStep,
        };

        return this._eventManager.addSpecificEventListener(EventTarget.forPage(this._page, modifiers), callbacks);
    };
}
