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

export enum UpdaterOperator {
    SET = 'SET',
    PUSH = 'PUSH',
    SPLICE = 'SPLICE',
    UNSET = 'UNSET',
    MERGE = 'MERGE',
    ADD = 'ADD',
    REMOVE = 'REMOVE',
}

export const UpdaterOperatorOptions = [
    UpdaterOperator.SET,
    UpdaterOperator.PUSH,
    UpdaterOperator.SPLICE,
    UpdaterOperator.UNSET,
    UpdaterOperator.MERGE,
    UpdaterOperator.ADD,
    UpdaterOperator.REMOVE,
];



