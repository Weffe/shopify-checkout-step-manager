import { IBaseCSM } from 'shared/types';
import { EventManager } from '../EventManager';
import { AnyizeType } from './enums';
import invariant from 'tiny-invariant';

export interface IAnyizeCSM extends IBaseCSM {}

export class AnyizeCSM implements IAnyizeCSM {
    private _anyizeType: AnyizeType;
    private _eventManager: EventManager;

    public constructor(anyizeType: AnyizeType, eventManager: EventManager) {
        this._anyizeType = anyizeType;
        this._eventManager = eventManager;
    }

    public execute = (...callbacks: Function[]): Function => {
        if (
            this._anyizeType === AnyizeType.ANY_PAGE ||
            this._anyizeType === AnyizeType.ANY_STEP ||
            this._anyizeType === AnyizeType.ANY_REPAINT
        ) {
            return this._eventManager.addAnyizeEventListener(this._anyizeType, callbacks);
        }

        invariant(false, `Internal Error. Did not receive the correct anyize type in execute() of AnyizeCSM.`);
    };
}
