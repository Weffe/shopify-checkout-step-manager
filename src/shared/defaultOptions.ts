import { IOptions } from '../shared/types';
import $ from 'jquery';

export const defaultOptions: Required<IOptions> = {
    debug: false,
    jQuery: $,
};
