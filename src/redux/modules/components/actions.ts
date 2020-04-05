// src/redux/modules/components/actions.ts

import * as types from './types';
import {ComponentData, PerspectiveData} from "../../../interface";

// functions

export function selectComponent(value: ComponentData): SelectComponent {
    return { type: types.SELECT_COMPONENT, value }
}

export function perspectiveEditDialogOpen(mode: 'create'|'edit', perspectiveData: PerspectiveData, index: number): PerspectiveEditDialogOpen {
    return { type: types.PERSPECTIVE_EDIT_DIALOG_OPEN, mode, perspectiveData, index }
}

export function perspectiveEditDialogClose(): PerspectiveEditDialogClose {
    return { type: types.PERSPECTIVE_EDIT_DIALOG_CLOSE }
}

// interfaces

export interface SelectComponent {
    type: typeof types.SELECT_COMPONENT,
    value: ComponentData
}

export interface PerspectiveEditDialogOpen {
    type: typeof types.PERSPECTIVE_EDIT_DIALOG_OPEN,
    mode: 'create' | 'edit',
    perspectiveData: PerspectiveData|null,
    index: number
}


export interface PerspectiveEditDialogClose {
    type: typeof types.PERSPECTIVE_EDIT_DIALOG_CLOSE,
}

export type ComponentsAction =
    PerspectiveEditDialogOpen |
    PerspectiveEditDialogClose |
    SelectComponent;