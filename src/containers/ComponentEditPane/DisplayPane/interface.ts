// src/containers/ComponentEditPane/DisplayPane/interface.ts

export type DisplayType = 'always' | 'conditional';

export interface DisplayInfo {
    type: DisplayType,
    state? : string,
    value? : string,
}
