// src/containers/ComponentEditPane/interface.ts

export interface EventArg {
    name: string,
    type: string,
    required?: boolean
}

export interface Event {
    key: string,
    name: string,
    args: EventArg[]
}

export interface EventAction {
    event: string,
    action: string
}


export interface RepeatInfo {
    fieldPath: string
}