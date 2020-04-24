
export enum ActionOperationType {
    Add = 'Add',
    Update = 'Update',
    Delete = 'Delete'
}

export enum StateUpdaterOperationType {
    Add = 'Add',
    Update = 'Update',
    Delete = 'Delete'
}

export enum LOADING_STATUS {
    NOT_STARTED,
    LOADING,
    COMPLETE,
    FAILED
}

export enum SettingItem {
    Dependencies = "Page Dependencies",
    Libraries = "Additional Libraries",
    LocalStorage = "Local Storage",
}

export const SETTING_ITEMS = [
    {
        name: SettingItem.Dependencies
    },
    {
        name: SettingItem.Libraries
    },
    {
        name: SettingItem.LocalStorage
    },
];

export const CanvasWidthOptions = [1280, 1600, 1920, 2560];

export const CanvasWidth = {
    1280: {
        name: 'Small'
    },
    1600: {
        name: 'Medium'
    },
    1920: {
        name: 'Large'
    },
    2560: {
        name: 'Extra Large'
    }
}