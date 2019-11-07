import { IEventPageTarget, IEventStepTarget, IPageTargetModifiers, IStepTargetModifiers } from './types';
import { CheckoutPage, CheckoutStep } from '~/shared/enums';

export class EventTarget {
    public static forPage = (page: CheckoutPage, modifiers: IPageTargetModifiers): IEventPageTarget => ({
        type: 'page',
        page,
        modifiers,
    });

    public static forStep = (step: CheckoutStep, modifiers: IStepTargetModifiers): IEventStepTarget => ({
        type: 'step',
        step,
        modifiers,
    });
}
