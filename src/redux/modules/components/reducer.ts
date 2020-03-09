// src/redux/modules/components/reducer.ts

import * as types from './types';
import update from 'immutability-helper';
import {ComponentsAction} from "./actions";
import {ComponentsState} from "../../state";

export function reducer(state: ComponentsState, action: ComponentsAction) {
    switch (action.type) {
        case types.SELECT_COMPONENT:
            return update(state, {
                componentSelected: {$set: action.value}
            });
        default:
            return state;
    }
}

export {ComponentsAction};