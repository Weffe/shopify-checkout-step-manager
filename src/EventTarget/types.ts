import { CheckoutPage, CheckoutStep } from '../shared/enums';

export interface IEventPageTarget {
    type: 'page';
    page: CheckoutPage;
    modifiers: IPageTargetModifiers;
}

export interface IEventStepTarget {
    type: 'step';
    step: CheckoutStep;
    modifiers: IStepTargetModifiers;
}

export interface IBaseEventTargetModifiers {
    withAnyRepaint?: boolean;
}

export interface IPageTargetModifiers extends IBaseEventTargetModifiers {
    withAnyStep?: boolean;
    withSpecificStep?: CheckoutStep;
}

export interface IStepTargetModifiers extends IBaseEventTargetModifiers {
    withAnyPage?: boolean;
    withSpecificPage?: CheckoutPage;
}

export interface IOrderStatusModifiers {
    onCheckoutOnly: boolean;
    onOrderOnly: boolean;
}
