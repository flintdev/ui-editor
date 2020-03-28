// src/redux/state.ts

import {ComponentData} from "../interface";

export type Mode = 'editor' | 'preview';

export interface ToolbarState {
    stateDialog: {
        open: boolean
    },
    actionsDialog: {
        open: boolean
    },
    mode: Mode
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
        mode: 'editor',
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