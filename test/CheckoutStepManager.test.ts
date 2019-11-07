import { CheckoutStepManager } from '../src';
import { defaultOptions } from '../src/shared/defaultOptions';
import { IOptions } from '../src/shared/types';
import { CheckoutStep, CheckoutPage } from '../src/shared/enums';

describe('Testing Instance Creation', () => {
    it('should create an instance properly', () => {
        const csm = new CheckoutStepManager();

        expect(csm).toBeInstanceOf(CheckoutStepManager);
    });

    it('should create an instance with default options', () => {
        const csm = new CheckoutStepManager();
        const defaultKeys = Object.keys(defaultOptions);

        defaultKeys.forEach((key) => {
            const instanceOptionValue: any = (csm as any)[key];
            const expectedOptionValue: any = (defaultOptions as any)[key];

            expect(expectedOptionValue).toBe(instanceOptionValue);
        });
    });

    it('should create an instance with custom options', () => {
        const options: IOptions = {
            debug: true,
        };
        const csm = new CheckoutStepManager(options);

        expect((csm as any)._options.debug).toBe(true);
    });
});

describe('Fluent Step Methods', () => {
    let csm: CheckoutStepManager;

    beforeEach(() => {
        csm = new CheckoutStepManager();
    });

    it(`should set the step to ${CheckoutStep.CONTACT_INFORMATION}`, () => {
        csm.forContactInformationStep();

        expect(csm['step']).toBe(CheckoutStep.CONTACT_INFORMATION);
    });

    it(`should set the step to ${CheckoutStep.PAYMENT_METHOD}`, () => {
        csm.forPaymentMethodstep();

        expect(csm['step']).toBe(CheckoutStep.PAYMENT_METHOD);
    });

    it(`should set the step to ${CheckoutStep.PROCESSING}`, () => {
        csm.forProcessingStep();

        expect(csm['step']).toBe(CheckoutStep.PROCESSING);
    });

    it(`should set the step to ${CheckoutStep.REVIEW}`, () => {
        csm.forReviewStep();

        expect(csm['step']).toBe(CheckoutStep.REVIEW);
    });

    it(`should set the step to ${CheckoutStep.SHIPPING_METHOD}`, () => {
        csm.forShippingMethodStep();

        expect(csm['step']).toBe(CheckoutStep.SHIPPING_METHOD);
    });
});

describe('Fluent Page Methods', () => {
    let csm: CheckoutStepManager;

    beforeEach(() => {
        csm = new CheckoutStepManager();
    });

    it(`should set the page to ${CheckoutPage.FORWARD}`, () => {
        csm.forForwardPage();

        expect(csm['page']).toBe(CheckoutPage.FORWARD);
    });

    it(`should set the page to ${CheckoutPage.PROCESSING}`, () => {
        csm.forProcessingPage();

        expect(csm['page']).toBe(CheckoutPage.PROCESSING);
    });

    it(`should set the page to ${CheckoutPage.SHOW}`, () => {
        csm.forShowPage();

        expect(csm['page']).toBe(CheckoutPage.SHOW);
    });

    it(`should set the page to ${CheckoutPage.STOCK_PROBLEMS}`, () => {
        csm.forStockProblemsPage();

        expect(csm['page']).toBe(CheckoutPage.STOCK_PROBLEMS);
    });

    it(`should set the page to ${CheckoutPage.THANK_YOU}`, () => {
        csm.forThankYouPage();

        expect(csm['page']).toBe(CheckoutPage.THANK_YOU);
    });
});

describe('onAny Fluent Methods', () => {
    let csm: CheckoutStepManager;

    beforeEach(() => {
        csm = new CheckoutStepManager();
    });

    it('should set withAnyPage to true', () => {
        csm.onAnyPage();

        expect(csm['withAnyPage']).toBe(true);
    });

    it('should set withAnySectionRepaint to true', () => {
        csm.onAnySectionRepaint();

        expect(csm['withAnySectionRepaint']).toBe(true);
    });

    it('should set withAnyStep to true', () => {
        csm.onAnyStep();

        expect(csm['withAnyStep']).toBe(true);
    });
});

describe('Reseting private variables', () => {
    it('should reset internal private variables to their default state', () => {
        const csm = new CheckoutStepManager();

        // set true for all the internal private variables
        csm.onAnyPage()
            .onAnySectionRepaint()
            .onAnyStep()
            .forContactInformationStep()
            .forForwardPage();

        // then reset
        csm.reset();

        expect(csm['withAnyPage']).toBe(false);
        expect(csm['withAnySectionRepaint']).toBe(false);
        expect(csm['withAnyStep']).toBe(false);
        expect(csm['step']).toBe(undefined);
        expect(csm['page']).toBe(undefined);
    });
});
