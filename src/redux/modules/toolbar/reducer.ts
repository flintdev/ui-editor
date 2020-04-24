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
        case types.SETTINGS_DIALOG_OPEN:
            return update(state, {
                settingsDialog: {
                    open: {$set: true}
                }
            });
        case types.SETTINGS_DIALOG_CLOSE:
            return update(state, {
                settingsDialog: {
                    open: {$set: false}
                }
            });
        case types.SET_MODE:
            return update(state, {
                mode: {$set: action.mode}
            });
        case types.SET_CANVAS_WIDTH:
            return update(state, {
                canvasWidth: {$set: action.value}
            });

        default:
            return state;
    }
}

export {ToolbarAction};