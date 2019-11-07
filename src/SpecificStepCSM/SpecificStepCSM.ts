import warning from 'tiny-warning';
import { EventManager } from '../EventManager';
import { EventTarget } from '../EventTarget';
import { IStepTargetModifiers } from '../EventTarget/types';
import { IBaseSpecificCSM } from '../shared/types';
import { CheckoutStep, CheckoutPage } from '../shared/enums';

export interface ISpecificStepCSM extends IBaseSpecificCSM {
    onAnyPage: () => this;
}

export class SpecificStepCSM implements ISpecificStepCSM {
    private _step: CheckoutStep;
    private _eventManager: EventManager;
    private _withAnyRepaint: boolean = false;
    private _withAnyPage: boolean = false;
    private _withSpecificPage: CheckoutPage | undefined;

    public constructor(step: CheckoutStep, eventManager: EventManager) {
        this._step = step;
        this._eventManager = eventManager;
    }

    public onAnyRepaint = () => {
        this._withAnyRepaint = true;
        return this;
    };

    public onAnyPage = () => {
        this._withAnyPage = true;
        return this;
    };

    public onSpecificPage = (onSpecificPage: CheckoutPage) => {
        this._withSpecificPage = onSpecificPage;
        return this;
    };

    public execute = (...callbacks: Function[]): Function => {
        warning(
            !(this._withAnyPage && this._withSpecificPage),
            `You wanted to execute callback(s) only for "${this._step}" step with Any Page
            changes and on a Specific Page. This results in the callbacks always being executed
            and not respecting your Specific Page setting. Is this what you want? 

            If not, consider making these changes (psuedocode):
                
                Before:
                    checkoutStepManager
                        .forReviewStep()
                        .onSpecificPage()
                    -   .onAnyPage();
                
                After:
                    checkoutStepManager
                        .forReviewStep()
                        .onSpecificPage();`
        );

        const modifiers: IStepTargetModifiers = {
            withAnyRepaint: this._withAnyRepaint,
            withAnyPage: this._withAnyPage,
            withSpecificPage: this._withSpecificPage,
        };

        return this._eventManager.addSpecificEventListener(EventTarget.forStep(this._step, modifiers), callbacks);
    };
}
