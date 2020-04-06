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
        case types.SELECT_PERSPECTIVE:
            return update(state, {
                perspectiveDataSelected: {$set: action.perspectiveData},
            });
        case types.PERSPECTIVE_EDIT_DIALOG_OPEN:
            return update(state, {
                perspectiveEditDialog: {
                    open: {$set: true},
                    perspectiveData: {$set: action.perspectiveData},
                    mode: {$set: action.mode},
                    index: {$set: action.index}
                }
            });
        case types.PERSPECTIVE_EDIT_DIALOG_CLOSE:
            return update(state, {
                perspectiveEditDialog: {
                    open: {$set: false}
                }
            });

        default:
            return state;
    }
}

export {ComponentsAction};