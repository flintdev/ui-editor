// src/redux/modules/toolbar/reducer.ts

import * as types from './types';
import update from 'immutability-helper';
import {ToolbarAction} from "./actions";
import {ToolbarState} from "../../state";

export function reducer(state: ToolbarState, action: ToolbarAction) {
    switch (action.type) {
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
        case types.OPEN_WIDGET_PICKER:
            return update(state, {
                widgetPickerAnchorEl: {$set: action.anchorEl}
            });
        case types.CLOSE_WIDGET_PICKER:
            return update(state, {
                widgetPickerAnchorEl: {$set: undefined}
            });
        case types.STATE_ACTIONS_DIALOG_OPEN:
            return update(state, {
                stateActionsDialog: {
                    open: {$set: true}
                }
            });
        case types.STATE_ACTIONS_DIALOG_CLOSE:
            return update(state, {
                stateActionsDialog: {
                    open: {$set: false}
                }
            });
        case types.BLOCK_EDIT_DIALOG_OPEN:
            return update(state, {
                blockEditDialog: {
                    open: {$set: true},
                    blockData: {$set: action.blockData},
                }
            });
        case types.BLOCK_EDIT_DIALOG_CLOSE:
            return update(state, {
                blockEditDialog: {
                    open: {$set: false},
                }
            });

        default:
            return state;
    }
}

export {ToolbarAction};