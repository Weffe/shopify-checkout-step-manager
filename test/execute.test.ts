import { CheckoutStepManager } from '../src';
import { PageEvent } from '~/shared/enums';

const mockShopify: Window['Shopify'] = {
    Checkout: {
        step: 'contact_information',
        page: 'show',
    },
};

describe('Execute method on various fluent methods', () => {
    let map: { [x: string]: any } = {};
    let csm: CheckoutStepManager;

    function foo() {
        return;
    }

    beforeAll(() => {
        csm = new CheckoutStepManager();

        window.Shopify = mockShopify;

        // mocks for add/remove event listeners
        window.addEventListener = jest.fn((event, callback) => {
            const hashKey = `${event}::${(callback as Function).name}`;
            map[hashKey] = callback;
        });
        window.removeEventListener = jest.fn((event, callback) => {
            const hashKey = `${event}::${(callback as Function).name}`;
            delete map[hashKey];
        });
    });

    afterEach(() => {
        map = {};
    });

    it('should add 1 event listener for specific step', () => {
        csm.forContactInformationStep().execute(foo);
        const hashKey = `${PageEvent.PAGE_LOAD_AND_CHANGE}::handleSpecificStep`;

        expect(map[hashKey]).toBeTruthy();
    });

    it('should add 1 event listener for specific page', () => {
        csm.forProcessingPage().execute(foo);
        const hashKey = `${PageEvent.PAGE_LOAD_AND_CHANGE}::handleSpecificPage`;

        expect(map[hashKey]).toBeTruthy();
    });

    it('should add 1 event listener for any page', () => {
        csm.forAnyPage().execute(foo);
        const hashKey = `${PageEvent.PAGE_LOAD_AND_CHANGE}::handleAnyPageChange`;

        expect(map[hashKey]).toBeTruthy();
    });

    it('should add 1 event listener for any repaint', () => {
        csm.forAnyRepaint().execute(foo);
        const hashKey = `${PageEvent.PAGE_CHANGE}::handleAnyRepaint`;

        expect(map[hashKey]).toBeTruthy();
    });

    it('should add 1 event listener for any step', () => {
        csm.forAnyStep().execute(foo);
        const hashKey = `${PageEvent.PAGE_LOAD_AND_CHANGE}::handleAnyStepChange`;

        expect(map[hashKey]).toBeTruthy();
    });

    it('should add 1 event listener for Order Status', () => {
        csm.forOrderStatus().execute(foo);
        const hashKey = `${PageEvent.PAGE_LOAD}::handleOrderStatus`;

        expect(map[hashKey]).toBeTruthy();
    });

    it('should add and remove 1 event listener for specific step', () => {
        const removeListener = csm.forContactInformationStep().execute(foo);
        const hashKey = `${PageEvent.PAGE_LOAD_AND_CHANGE}::handleSpecificStep`;

        expect(map[hashKey]).toBeTruthy();
        removeListener();
        expect(Object.keys(map).length).toBe(0);
    });

    it('should add and remove 1 event listener for specific page', () => {
        const removeListener = csm.forProcessingPage().execute(foo);
        const hashKey = `${PageEvent.PAGE_LOAD_AND_CHANGE}::handleSpecificPage`;

        expect(map[hashKey]).toBeTruthy();
        removeListener();
        expect(Object.keys(map).length).toBe(0);
    });

    it('should add and remove 1 event listener for any page', () => {
        const removeListener = csm.forAnyPage().execute(foo);
        const hashKey = `${PageEvent.PAGE_LOAD_AND_CHANGE}::handleAnyPageChange`;

        expect(map[hashKey]).toBeTruthy();
        removeListener();
        expect(Object.keys(map).length).toBe(0);
    });

    it('should add and remove 1 event listener for any repaint', () => {
        const removeListener = csm.forAnyRepaint().execute(foo);
        const hashKey = `${PageEvent.PAGE_CHANGE}::handleAnyRepaint`;

        expect(map[hashKey]).toBeTruthy();
        removeListener();
        expect(Object.keys(map).length).toBe(0);
    });

    it('should add and remove 1 event listener for any step', () => {
        const removeListener = csm.forAnyStep().execute(foo);
        const hashKey = `${PageEvent.PAGE_LOAD_AND_CHANGE}::handleAnyStepChange`;

        expect(map[hashKey]).toBeTruthy();
        removeListener();
        expect(Object.keys(map).length).toBe(0);
    });

    it('should add and remove 1 event listener for Order Status', () => {
        const removeListener = csm.forOrderStatus().execute(foo);
        const hashKey = `${PageEvent.PAGE_LOAD}::handleOrderStatus`;

        expect(map[hashKey]).toBeTruthy();
        removeListener();
        expect(Object.keys(map).length).toBe(0);
    });
});
