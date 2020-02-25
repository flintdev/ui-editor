// src/redux/state.ts

import {ComponentTreeNode} from "../interface";

export interface StoreState {
    toolbar: {
        stateDialog: {
            open: boolean
        }
    },
    components: {
        treeData: ComponentTreeNode[],
        treeNodeSelected: ComponentTreeNode | null,
    },
}

export const initState: StoreState = {
    toolbar: {
        stateDialog: {
            open: false,
        }
    },
    components: {
        treeData: [],
        treeNodeSelected: null,
    }
};