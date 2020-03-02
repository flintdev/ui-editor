// src/interface.ts

export interface ComponentTreeNode {

}

export interface ActionData {
    name: string,
    code: string,
}

export interface StateUpdaterData {
    name: string,
}

export interface UpdaterOperationData {
    field: string,
    operator: string,
    parameter: string,
}