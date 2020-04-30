import { CheckoutStepManager } from '../src';
import { OrderStatusCSM } from '../src/OrderStatusCSM';

const mockJquery = {} as JQueryStatic;

describe('Order Status Fluent Methods', () => {
    let csm: CheckoutStepManager;

    beforeEach(() => {
        csm = new CheckoutStepManager({ jQuery: mockJquery });
    });

    it(`should create OrderStatus instance`, () => {
        const orderStatusCSM = csm.forOrderStatus();

        expect(orderStatusCSM).toBeInstanceOf(OrderStatusCSM);
    });

    it(`should set Order Status callbacks to execute on "Checkout" version`, () => {
        const orderStatusCSM = csm.forOrderStatus().onCheckoutOnly();

        expect(orderStatusCSM['_onCheckoutOnly']).toBe(true);
    });

    it(`should set Order Status callbacks to execute on "Order" version`, () => {
        const orderStatusCSM = csm.forOrderStatus().onOrderOnly();

        expect(orderStatusCSM['_onOrderOnly']).toBe(true);
    });
});
