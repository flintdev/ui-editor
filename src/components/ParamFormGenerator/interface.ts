// src/components/ParamFormGenerator/interface.ts

export enum ItemType {
    integer = 'integer',
    string = 'string',
    array = 'array',
    object = 'object',
}

export enum ItemUI {
    input = 'input',
    select = 'select',
    listEditor = 'list-editor'
}

export interface Element {
    type: ItemType,
    element?: Element,
    items?: ParamItem[],
}

export interface ParamItem {
    key: string,
    name: string,
    type: ItemType,
    defaultValue: any,
    ui: ItemUI,
    options?: any[],
    element?: Element,
}

export interface Param {
    group: string,
    items: ParamItem[]
}

