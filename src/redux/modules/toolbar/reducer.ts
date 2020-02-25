// src/redux/modules/toolbar/reducer.ts

import * as types from './types';
import update from 'immutability-helper';
import {ToolbarAction} from "./actions";

export function reducer(state: object, action: ToolbarAction) {
    switch (action.type) {
        case types.STATE_DIALOG_OPEN:
            return update(state, {
                stateDialog: {
                    open: {$set: true}
                }
            });
        case types.STATE_DIALOG_CLOSE:
            return update(state, {
                stateDialog: {
                    open: {$set: false}
                }
            });

        default:
            return state;
    }
}

export {ToolbarAction};