// src/redux/state.ts

import {ComponentData, PerspectiveData} from "../interface";

export type Mode = 'editor' | 'preview';
export type DialogMode = 'create' | 'edit';

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
    perspectiveData?: PerspectiveData,
    index?: number,
    mode: DialogMode
}
export interface ComponentsState {
    componentSelected: ComponentData | null,
    perspectiveDataSelected?: PerspectiveData,
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
        perspectiveDataSelected: undefined,
        perspectiveEditDialog: {
            open: false,
            perspectiveData: undefined,
            mode: 'create',
            index: -1
        },
    }
};