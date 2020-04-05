// src/redux/state.ts

import {ComponentData, PerspectiveData} from "../interface";

export type Mode = 'editor' | 'preview';

export interface ToolbarState {
    stateDialog: {
        open: boolean
    },
    actionsDialog: {
        open: boolean
    },
    settingsDialog: {
        open: boolean
    },
    mode: Mode
}

export interface PerspectiveEditDialogState {
    open: boolean,
    perspectiveData: PerspectiveData | null,
    index: number,
    mode: 'create' | 'edit'
}
export interface ComponentsState {
    componentSelected: ComponentData | null,
    perspectiveEditDialog: PerspectiveEditDialogState
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
            open: false,
        },
        settingsDialog: {
            open: false,
        }
    },
    components: {
        componentSelected: null,
        perspectiveEditDialog: {
            open: false,
            perspectiveData: null,
            mode: 'create',
            index: -1
        },
    }
};