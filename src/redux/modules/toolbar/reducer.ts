// src/redux/modules/toolbar/reducer.ts

import * as types from './types';
import update from 'immutability-helper';
import {ToolbarAction} from "./actions";
import {ToolbarState} from "../../state";

export function reducer(state: ToolbarState, action: ToolbarAction) {
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
        case types.ACTIONS_DIALOG_OPEN:
            return update(state, {
                actionsDialog: {
                    open: {$set: true}
                }
            });
        case types.ACTIONS_DIALOG_CLOSE:
            return update(state, {
                actionsDialog: {
                    open: {$set: false}
                }
            });
        case types.SET_MODE:
            return update(state, {
                mode: {$set: action.mode}
            });

        default:
            return state;
    }
}

export {ToolbarAction};