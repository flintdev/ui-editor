// src/redux/modules/toolbar/actions.ts

import * as types from './types';
import {Mode} from "../../state";

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

export function settingsDialogOpen(): SettingsDialogOpen {
    return { type: types.SETTINGS_DIALOG_OPEN }
}

export function settingsDialogClose(): SettingsDialogClose {
    return { type: types.SETTINGS_DIALOG_CLOSE }
}

export function setMode(mode: Mode): SetMode {
    return { type: types.SET_MODE, mode }
}

export function setCanvasWidth(value: number): SetCanvasWidth {
    return { type: types.SET_CANVAS_WIDTH, value }
}

export function openWidgetPicker(anchorEl: Element): OpenWidgetPicker {
    return { type: types.OPEN_WIDGET_PICKER, anchorEl }
}

export function closeWidgetPicker(): CloseWidgetPicker {
    return { type: types.CLOSE_WIDGET_PICKER }
}

export function stateActionsDialogOpen(): StateActionsDialogOpen {
    return { type: types.STATE_ACTIONS_DIALOG_OPEN }
}

export function stateActionsDialogClose(): StateActionDialogClose {
    return { type: types.STATE_ACTIONS_DIALOG_CLOSE }
}

// interfaces

export interface StateActionDialogClose {
    type: typeof types.STATE_ACTIONS_DIALOG_CLOSE,
}

export interface StateActionsDialogOpen {
    type: typeof types.STATE_ACTIONS_DIALOG_OPEN,
}

export interface OpenWidgetPicker {
    type: typeof types.OPEN_WIDGET_PICKER,
    anchorEl: Element
}

export interface CloseWidgetPicker {
    type: typeof types.CLOSE_WIDGET_PICKER,
}

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

export interface SettingsDialogOpen {
    type: typeof types.SETTINGS_DIALOG_OPEN,
}

export interface SettingsDialogClose {
    type: typeof types.SETTINGS_DIALOG_CLOSE,
}

export interface SetMode {
    type: typeof types.SET_MODE,
    mode: Mode,
}

export interface SetCanvasWidth {
    type: typeof types.SET_CANVAS_WIDTH,
    value: number
}

export type ToolbarAction =
    StateActionsDialogOpen |
    StateActionDialogClose |
    OpenWidgetPicker |
    CloseWidgetPicker |
    SetCanvasWidth |
    SetMode |
    SettingsDialogOpen |
    SettingsDialogClose |
    ActionsDialogOpen |
    ActionsDialogClose |
    StateDialogClose |
    StateDialogOpen;

