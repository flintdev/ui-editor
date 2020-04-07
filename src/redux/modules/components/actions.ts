// src/redux/modules/components/actions.ts

import * as types from './types';
import {ComponentData, PerspectiveData} from "../../../interface";

// functions

export function selectComponent(value: ComponentData): SelectComponent {
    return { type: types.SELECT_COMPONENT, value }
}

export function selectPerspective(perspectiveData?: PerspectiveData): SelectPerspective {
    return { type: types.SELECT_PERSPECTIVE, perspectiveData }
}

export function perspectiveEditDialogOpen(mode: 'create'|'edit', perspectiveData?: PerspectiveData, index?: number): PerspectiveEditDialogOpen {
    return { type: types.PERSPECTIVE_EDIT_DIALOG_OPEN, mode, perspectiveData, index }
}

export function perspectiveEditDialogClose(): PerspectiveEditDialogClose {
    return { type: types.PERSPECTIVE_EDIT_DIALOG_CLOSE }
}

export function increaseMark(): IncreaseMark {
    return { type: types.INCREASE_MARK }
}


// interfaces

export interface SelectComponent {
    type: typeof types.SELECT_COMPONENT,
    value: ComponentData
}

export interface SelectPerspective {
    type: typeof types.SELECT_PERSPECTIVE,
    perspectiveData?: PerspectiveData
}

export interface PerspectiveEditDialogOpen {
    type: typeof types.PERSPECTIVE_EDIT_DIALOG_OPEN,
    mode: 'create' | 'edit',
    perspectiveData?: PerspectiveData,
    index?: number
}

export interface PerspectiveEditDialogClose {
    type: typeof types.PERSPECTIVE_EDIT_DIALOG_CLOSE,
}

export interface IncreaseMark {
    type: typeof types.INCREASE_MARK,
}

export type ComponentsAction =
    IncreaseMark |
    SelectPerspective |
    PerspectiveEditDialogOpen |
    PerspectiveEditDialogClose |
    SelectComponent;