// src/redux/reducer.ts

import {StoreState} from "./state";
import {reducer as toolbarReducer, ToolbarAction} from "./modules/toolbar/reducer";

export type Action = ToolbarAction;

export function reducer(state: StoreState, action: Action) {
    return {
        toolbar: toolbarReducer(state.toolbar, action),
    }
}