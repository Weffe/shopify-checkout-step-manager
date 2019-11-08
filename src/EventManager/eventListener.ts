import { PageEvent } from '../shared/enums';

/**
 * Mimics jQuery's addEventListener by attaching multiple event
 * listeners if they are specificed by spaces. Also, normalizes
 * the event names by removing any colons in the event name.
 */

type listener = Parameters<Window['addEventListener']>[1];

export function addEventListener(type: PageEvent, listener: listener) {
    const eventNames = type.split(' ').map((name) => name.replace(':', ''));

    for (const eventName of eventNames) {
        window.addEventListener(eventName, listener);
    }
}

export function removeEventListener(type: PageEvent, listener: listener) {
    const eventNames = type.split(' ').map((name) => name.replace(':', ''));

    for (const eventName of eventNames) {
        window.removeEventListener(eventName, listener);
    }
}
