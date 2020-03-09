// src/redux/state.ts

import {ComponentData} from "../interface";

export interface ToolbarState {
    stateDialog: {
        open: boolean
    },
    actionsDialog: {
        open: boolean
    },
}

export interface ComponentsState {
    componentSelected: ComponentData | null,
}

export interface StoreState {
    toolbar: ToolbarState,
    components: ComponentsState,
}

export const initState: StoreState = {
    toolbar: {
        stateDialog: {
            open: false,
        },
        actionsDialog: {
            open: false
        }
    },
    components: {
        componentSelected: null,
    }
};