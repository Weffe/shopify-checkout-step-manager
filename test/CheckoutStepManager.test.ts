import { CheckoutStepManager } from '../src';
import { defaultOptions } from '../src/shared/defaultOptions';
import { IOptions } from '../src/shared/types';

const mockJquery = {} as JQueryStatic;

describe('Instance Creation', () => {
    it('should create an instance properly', () => {
        const csm = new CheckoutStepManager({ jQuery: mockJquery });

        expect(csm).toBeInstanceOf(CheckoutStepManager);
    });

    it('should create an instance with default options', () => {
        const csm = new CheckoutStepManager({ jQuery: mockJquery });

        expect(csm['_eventManager']['_debug']).toBe(defaultOptions.debug);
        expect(csm['_eventManager']['_jquery']).toBe(mockJquery);
    });

    it('should create an instance with custom options', () => {
        const options: IOptions = {
            debug: true,
            jQuery: mockJquery,
        };
        const csm = new CheckoutStepManager(options);

        expect(csm['_eventManager']['_debug']).toBe(true);
        expect(csm['_eventManager']['_jquery']).toBe(mockJquery);
    });
});
