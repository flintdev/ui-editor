// src/redux/reducer.ts

import {StoreState} from "./state";
import {reducer as toolbarReducer, ToolbarAction} from "./modules/toolbar/reducer";
import {reducer as componentsReducer, ComponentsAction} from "./modules/components/reducer";
import {reducer as commonReducer, CommonAction} from "./modules/common/reducer";

export type Action = ToolbarAction & ComponentsAction & CommonAction;

export function reducer(state: StoreState, action: Action) {
    return {
        toolbar: toolbarReducer(state.toolbar, action),
        components: componentsReducer(state.components, action),
        common: commonReducer(state.common, action)
    }
}
