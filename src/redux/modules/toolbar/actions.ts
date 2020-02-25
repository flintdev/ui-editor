// src/redux/modules/toolbar/actions.ts

import * as types from './types';

// functions

export function stateDialogOpen(): StateDialogOpen {
    return { type: types.STATE_DIALOG_OPEN }
}

export function stateDialogClose(): StateDialogClose {
    return { type: types.STATE_DIALOG_CLOSE }
}


// interfaces

export interface StateDialogOpen {
    type: typeof types.STATE_DIALOG_OPEN,
}

export interface StateDialogClose {
    type: typeof types.STATE_DIALOG_CLOSE,
}

export type ToolbarAction =
    StateDialogClose |
    StateDialogOpen;

