import { CheckoutStepManager } from '../src';
import { AnyizeType } from '../src/AnyizeCSM';

const mockJquery = {} as JQueryStatic;

describe('forAny Fluent Methods', () => {
    let csm: CheckoutStepManager;

    beforeEach(() => {
        csm = new CheckoutStepManager({ jQuery: mockJquery });
    });

    it(`should set anyize type to "${AnyizeType.ANY_PAGE}"`, () => {
        const anyizeCSM = csm.forAnyPage();

        expect(anyizeCSM['_anyizeType']).toBe(AnyizeType.ANY_PAGE);
    });

    it(`should set anyize type to "${AnyizeType.ANY_REPAINT}"`, () => {
        const anyizeCSM = csm.forAnyRepaint();

        expect(anyizeCSM['_anyizeType']).toBe(AnyizeType.ANY_REPAINT);
    });

    it(`should set anyize type to "${AnyizeType.ANY_STEP}"`, () => {
        const anyizeCSM = csm.forAnyStep();

        expect(anyizeCSM['_anyizeType']).toBe(AnyizeType.ANY_STEP);
    });
});
