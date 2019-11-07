import { CheckoutStepManager } from '../src';
import { defaultOptions } from '../src/shared/defaultOptions';
import { IOptions } from '../src/shared/types';

describe('Instance Creation', () => {
    it('should create an instance properly', () => {
        const csm = new CheckoutStepManager();

        expect(csm).toBeInstanceOf(CheckoutStepManager);
    });

    it('should create an instance with default options', () => {
        const csm = new CheckoutStepManager();

        expect(csm['_eventManager']['_debug']).toBe(defaultOptions.debug);
    });

    it('should create an instance with custom options', () => {
        const options: IOptions = {
            debug: true,
        };
        const csm = new CheckoutStepManager(options);

        expect(csm['_eventManager']['_debug']).toBe(true);
    });
});
