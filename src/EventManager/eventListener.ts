import { PageEvent } from '../shared/enums';

export function eventListenerFactory(jQuery: JQueryStatic) {
    function addEventListener(type: PageEvent, listener: Function) {
        /**
         * unfortunalety, need to cast to string and any as
         * we cant use Parameters<F> type to pull out the params
         * for the overloaded .on() function because of this
         * @see https://stackoverflow.com/questions/58773217/how-to-use-parameters-type-on-overloaded-functions
         */
        jQuery(document).on(type as string, listener as any);
    }

    function removeEventListener(type: PageEvent, listener: Function) {
        /**
         * unfortunalety, need to cast to string and any as
         * we cant use Parameters<F> type to pull out the params
         * for the overloaded .on() function because of this
         * @see https://stackoverflow.com/questions/58773217/how-to-use-parameters-type-on-overloaded-functions
         */
        jQuery(document).off(type as string, listener as any);
    }

    return {
        addEventListener,
        removeEventListener,
    };
}
