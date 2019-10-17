import { CheckoutStepManager } from '../src';

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
        const hashKey = `page:load::handleSpecificStep`;

        expect(map[hashKey]).toBeTruthy();
    });

    it('should add 1 event listener for specific page', () => {
        csm.forProcessingPage().execute(foo);
        const hashKey = `page:load::handleSpecificPage`;

        expect(map[hashKey]).toBeTruthy();
    });

    it('should add 1 event listener for any page', () => {
        csm.onAnyPage().execute(foo);
        const hashKey = `page:load::handleAnyPageChange`;

        expect(map[hashKey]).toBeTruthy();
    });

    it('should add 1 event listener for any page', () => {
        csm.onAnySectionRepaint().execute(foo);
        const hashKey = `page:change::handleAnyRepaint`;

        expect(map[hashKey]).toBeTruthy();
    });

    it('should add 1 event listener for any page', () => {
        csm.onAnyStep().execute(foo);
        const hashKey = `page:load::handleAnyStepChange`;

        expect(map[hashKey]).toBeTruthy();
    });

    it('should add and remove 1 event listener for specific step', () => {
        const removeListener = csm.forContactInformationStep().execute(foo);
        const hashKey = `page:load::handleSpecificStep`;

        expect(map[hashKey]).toBeTruthy();
        removeListener();
        expect(Object.keys(map).length).toBe;
    });

    it('should add and remove 1 event listener for specific page', () => {
        const removeListener = csm.forProcessingPage().execute(foo);
        const hashKey = `page:load::handleSpecificPage`;

        expect(map[hashKey]).toBeTruthy();
        removeListener();
        expect(Object.keys(map).length).toBe;
    });

    it('should add and remove 1 event listener for any page', () => {
        const removeListener = csm.onAnyPage().execute(foo);
        const hashKey = `page:load::handleAnyPageChange`;

        expect(map[hashKey]).toBeTruthy();
        removeListener();
        expect(Object.keys(map).length).toBe;
    });

    it('should add and remove 1 event listener for any page', () => {
        const removeListener = csm.onAnySectionRepaint().execute(foo);
        const hashKey = `page:change::handleAnyRepaint`;

        expect(map[hashKey]).toBeTruthy();
        removeListener();
        expect(Object.keys(map).length).toBe;
    });

    it('should add and remove 1 event listener for any page', () => {
        const removeListener = csm.onAnyStep().execute(foo);
        const hashKey = `page:load::handleAnyStepChange`;

        expect(map[hashKey]).toBeTruthy();
        removeListener();
        expect(Object.keys(map).length).toBe;
    });
});
