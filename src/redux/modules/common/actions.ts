// src/redux/modules/common/actions.ts

import * as types from './types';
import {FieldSelectorOnSelectFunc} from "../../state";

// functions

export function openFieldSelectorDialog(onSelect: FieldSelectorOnSelectFunc): OpenFieldSelectorDialog {
    return { type: types.OPEN_FIELD_SELECTOR_DIALOG, onSelect }
}

export function closeFieldSelectorDialog(): CloseFieldSelectorDialog {
    return { type: types.CLOSE_FIELD_SELECTOR_DIALOG }
}

// interfaces

export interface OpenFieldSelectorDialog {
    type: typeof types.OPEN_FIELD_SELECTOR_DIALOG,
    onSelect: FieldSelectorOnSelectFunc
}

export interface CloseFieldSelectorDialog {
    type: typeof types.CLOSE_FIELD_SELECTOR_DIALOG,
}

export type CommonAction =
    CloseFieldSelectorDialog |
    OpenFieldSelectorDialog;
