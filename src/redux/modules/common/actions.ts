// src/redux/modules/common/actions.ts

import * as types from './types';
import {FieldSelectorOnSelectFunc} from "../../state";

export interface FieldSelectorOptions {
    onSelect: FieldSelectorOnSelectFunc,
    localVar: boolean,
}

// functions

export function openFieldSelectorDialog(options: FieldSelectorOptions): OpenFieldSelectorDialog {
    return { type: types.OPEN_FIELD_SELECTOR_DIALOG, options }
}

export function closeFieldSelectorDialog(): CloseFieldSelectorDialog {
    return { type: types.CLOSE_FIELD_SELECTOR_DIALOG }
}

// interfaces

export interface OpenFieldSelectorDialog {
    type: typeof types.OPEN_FIELD_SELECTOR_DIALOG,
    options: FieldSelectorOptions
}

export interface CloseFieldSelectorDialog {
    type: typeof types.CLOSE_FIELD_SELECTOR_DIALOG,
}

export type CommonAction =
    CloseFieldSelectorDialog |
    OpenFieldSelectorDialog;
