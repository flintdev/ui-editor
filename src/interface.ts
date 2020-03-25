// src/interface.ts

export interface ComponentData {
    id: string,
    name: string,
    params: object,
    events?: any[],
    display?: object,
    repeat?: object,
    children?: ComponentData[],
    path?: Array<string|number>,
    tag?: string
}

export interface ActionData {
    name: string,
    code: string,
}

export interface StateUpdaterData {
    name: string,
    operations: UpdaterOperationData[],
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



