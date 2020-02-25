// src/redux/modules/components/actions.ts

import * as types from './types';
import {ComponentTreeNode} from "../../../interface";

// functions

export function setTreeData(treeData: ComponentTreeNode[]): SetTreeData {
    return { type: types.SET_TREE_DATA, treeData }
}

export function selectComponent(value: ComponentTreeNode): SelectComponent {
    return { type: types.SELECT_COMPONENT, value }
}

// interfaces

export interface SetTreeData {
    type: typeof types.SET_TREE_DATA,
    treeData: ComponentTreeNode[];
}

export interface SelectComponent {
    type: typeof types.SELECT_COMPONENT,
    value: ComponentTreeNode
}

export type ComponentsAction =
    SelectComponent |
    SetTreeData;