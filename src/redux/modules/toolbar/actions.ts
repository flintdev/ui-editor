// src/redux/modules/toolbar/actions.ts

import * as types from './types';

// functions

export function stateDialogOpen(): StateDialogOpen {
    return { type: types.STATE_DIALOG_OPEN }
}

export function stateDialogClose(): StateDialogClose {
    return { type: types.STATE_DIALOG_CLOSE }
}

export function actionsDialogOpen(): ActionsDialogOpen {
    return { type: types.ACTIONS_DIALOG_OPEN }
}

export function actionsDialogClose(): ActionsDialogClose {
    return { type: types.ACTIONS_DIALOG_CLOSE }
}

// interfaces

export interface StateDialogOpen {
    type: typeof types.STATE_DIALOG_OPEN,
}

export interface StateDialogClose {
    type: typeof types.STATE_DIALOG_CLOSE,
}

export interface ActionsDialogOpen {
    type: typeof types.ACTIONS_DIALOG_OPEN,
}

export interface ActionsDialogClose {
    type: typeof types.ACTIONS_DIALOG_CLOSE,
}

export type ToolbarAction =
    ActionsDialogOpen |
    ActionsDialogClose |
    StateDialogClose |
    StateDialogOpen;

