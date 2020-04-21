// src/interface.ts

export interface ComponentData {
    id: string,
    name: string,
    params: any,
    events?: any[],
    display?: any,
    repeat?: any,
    children?: ComponentData[],
    path?: Array<string|number>,
    overlay?: boolean,
    alias?: string,
    tag?: string,
    hidden?: boolean,
    canvas?: {
        display?: string
    }
}

export interface PerspectiveData {
    name: string,
    code: string
}

export interface PageDependency {
    type: 'script',
    subtype: 'text/javascript',
    src: string
}

export interface AdditionalLibrary {
    name: string,
    version: string,
}

export interface LocalStorageItem {
    key: string,
    value: any,
}

export interface SettingsData {
    dependencies?: PageDependency[],
    libraries?: AdditionalLibrary[],
    localStorage?: LocalStorageItem[],
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



