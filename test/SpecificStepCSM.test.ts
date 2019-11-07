import { CheckoutStepManager } from '../src';
import { CheckoutStep, CheckoutPage } from '~/shared/enums';
import { SpecificStepCSM } from '../src/SpecificStepCSM';

describe('Fluent Step Methods', () => {
    let csm: CheckoutStepManager;

    beforeEach(() => {
        csm = new CheckoutStepManager();
    });

    it(`should set the step to ${CheckoutStep.CONTACT_INFORMATION}`, () => {
        const specificCSM = csm.forContactInformationStep();

        expect(specificCSM['_step']).toBe(CheckoutStep.CONTACT_INFORMATION);
    });

    it(`should set the step to ${CheckoutStep.PAYMENT_METHOD}`, () => {
        const specificCSM = csm.forPaymentMethodstep();

        expect(specificCSM['_step']).toBe(CheckoutStep.PAYMENT_METHOD);
    });

    it(`should set the step to ${CheckoutStep.PROCESSING}`, () => {
        const specificCSM = csm.forProcessingStep();

        expect(specificCSM['_step']).toBe(CheckoutStep.PROCESSING);
    });

    it(`should set the step to ${CheckoutStep.REVIEW}`, () => {
        const specificCSM = csm.forReviewStep();

        expect(specificCSM['_step']).toBe(CheckoutStep.REVIEW);
    });

    it(`should set the step to ${CheckoutStep.SHIPPING_METHOD}`, () => {
        const specificCSM = csm.forShippingMethodStep();

        expect(specificCSM['_step']).toBe(CheckoutStep.SHIPPING_METHOD);
    });

    describe('Testing specific step modifiers', () => {
        let specificCSM: SpecificStepCSM;

        beforeEach(() => {
            specificCSM = csm.forContactInformationStep();
        });

        it(`should set callbacks to be executed on any page updates`, () => {
            specificCSM.onAnyPage();

            expect(specificCSM['_withAnyPage']).toBe(true);
        });

        it(`should set callbacks to be executed on ONLY page "${CheckoutPage.SHOW}" updates`, () => {
            specificCSM.onSpecificPage(CheckoutPage.SHOW);

            expect(specificCSM['_withSpecificPage']).toBe(CheckoutPage.SHOW);
        });

        it(`should set callbacks to be executed on any repaints`, () => {
            specificCSM.onAnyRepaint();

            expect(specificCSM['_withAnyRepaint']).toBe(true);
        });
    });
});
