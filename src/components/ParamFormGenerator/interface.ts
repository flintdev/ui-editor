// src/components/ParamFormGenerator/interface.ts

export enum ItemType {
    integer = 'integer',
    string = 'string',
}

export enum ItemUI {
    input = 'input',
    select = 'select'
}

export interface ParamItem {
    key: string,
    name: string,
    type: ItemType,
    defaultValue: any,
    ui: ItemUI,
    options?: any[]
}

export interface Param {
    group: string,
    items: ParamItem[]
}

