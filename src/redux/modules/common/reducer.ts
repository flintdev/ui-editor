// src/redux/modules/common/reducer.ts

import * as types from './types';
import update from 'immutability-helper';
import {CommonAction} from "./actions";
import {CommonState} from "../../state";

export function reducer(state: CommonState, action: CommonAction) {
    switch (action.type) {
        case types.OPEN_FIELD_SELECTOR_DIALOG:
            return update(state, {
                fieldSelectorDialog: {
                    open: {$set: true},
                    localVar: {$set: action.options.localVar},
                    onSelect: {$set: action.options.onSelect}
                }
            });
        case types.CLOSE_FIELD_SELECTOR_DIALOG:
            return update(state, {
                fieldSelectorDialog: {
                    open: {$set: false}
                }
            });

        default:
            return state;
        
    }
}

export {CommonAction}