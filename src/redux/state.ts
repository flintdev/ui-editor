// src/redux/state.ts

import {ComponentData, PerspectiveData} from "../interface";

export type Mode = 'editor' | 'preview';
export type DialogMode = 'create' | 'edit';
export type FieldSelectorOnSelectFunc = (pathStr: string) => void;

export interface ToolbarState {
    settingsDialog: {
        open: boolean
    },
    stateActionsDialog: {
        open: boolean
    },
    blockEditDialog: {
        open: boolean,
        blockData?: any,
    },
    mode: Mode,
    canvasWidth: number,
    widgetPickerAnchorEl?: Element
}

export interface CommonState {
    fieldSelectorDialog: {
        open: boolean,
        localVar: boolean,
        onSelect?: FieldSelectorOnSelectFunc
    }
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
    _mark: number,
}

export interface StoreState {
    toolbar: ToolbarState,
    components: ComponentsState,
    common: CommonState,
}

export const initState: StoreState = {
    toolbar: {
        mode: 'editor',
        canvasWidth: 1280,
        settingsDialog: {
            open: false,
        },
        stateActionsDialog: {
            open: false
        },
        blockEditDialog: {
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
        _mark: 1,
    },
    common: {
        fieldSelectorDialog: {
            open: false,
            localVar: false
        }
    }
};