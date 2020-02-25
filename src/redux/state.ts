// src/redux/state.ts

import {ComponentTreeNode} from "../interface";

export interface ToolbarState {
    stateDialog: {
        open: boolean
    }
}

export interface ComponentsState {
    treeData: ComponentTreeNode[],
    componentSelected: ComponentTreeNode | null,
}

export interface StoreState {
    toolbar: ToolbarState,
    components: ComponentsState,
}

export const initState: StoreState = {
    toolbar: {
        stateDialog: {
            open: false,
        }
    },
    components: {
        treeData: [],
        componentSelected: null,
    }
};