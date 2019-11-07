import { CheckoutStepManager } from '../src';
import { CheckoutStep, CheckoutPage } from '~/shared/enums';
import { SpecificPageCSM } from '../src/SpecificPageCSM';

describe('Fluent Page Methods', () => {
    let csm: CheckoutStepManager;

    beforeEach(() => {
        csm = new CheckoutStepManager();
    });

    it(`should set the page to ${CheckoutPage.FORWARD}`, () => {
        const specificCSM = csm.forForwardPage();

        expect(specificCSM['_page']).toBe(CheckoutPage.FORWARD);
    });

    it(`should set the page to ${CheckoutPage.PROCESSING}`, () => {
        const specificCSM = csm.forProcessingPage();

        expect(specificCSM['_page']).toBe(CheckoutPage.PROCESSING);
    });

    it(`should set the page to ${CheckoutPage.SHOW}`, () => {
        const specificCSM = csm.forShowPage();

        expect(specificCSM['_page']).toBe(CheckoutPage.SHOW);
    });

    it(`should set the page to ${CheckoutPage.STOCK_PROBLEMS}`, () => {
        const specificCSM = csm.forStockProblemsPage();

        expect(specificCSM['_page']).toBe(CheckoutPage.STOCK_PROBLEMS);
    });

    it(`should set the page to ${CheckoutPage.THANK_YOU}`, () => {
        const specificCSM = csm.forThankYouPage();

        expect(specificCSM['_page']).toBe(CheckoutPage.THANK_YOU);
    });

    describe('Testing specific step modifiers', () => {
        let specificCSM: SpecificPageCSM;

        beforeEach(() => {
            specificCSM = csm.forForwardPage();
        });

        it(`should set callbacks to be executed on any step updates`, () => {
            specificCSM.onAnyStep();

            expect(specificCSM['_withAnyStep']).toBe(true);
        });

        it(`should set callbacks to be executed on ONLY step "${CheckoutStep.CONTACT_INFORMATION}" updates`, () => {
            specificCSM.onSpecificStep(CheckoutStep.CONTACT_INFORMATION);

            expect(specificCSM['_withSpecificStep']).toBe(CheckoutStep.CONTACT_INFORMATION);
        });

        it(`should set callbacks to be executed on any repaints`, () => {
            specificCSM.onAnyRepaint();

            expect(specificCSM['_withAnyRepaint']).toBe(true);
        });
    });
});
