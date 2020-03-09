// src/redux/modules/components/actions.ts

import * as types from './types';
import {ComponentData} from "../../../interface";

// functions

export function selectComponent(value: ComponentData): SelectComponent {
    return { type: types.SELECT_COMPONENT, value }
}

// interfaces

export interface SelectComponent {
    type: typeof types.SELECT_COMPONENT,
    value: ComponentData
}

export type ComponentsAction =
    SelectComponent;