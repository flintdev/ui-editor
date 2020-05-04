// src/UIEditor/UIEditor.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import {store} from "../redux/store";
import {ActionData, ComponentData, PerspectiveData, SettingsData, StateUpdaterData} from "../interface";
import UIEditorContainer from "./UIEditorContainer";
import {OpenVSCodeCallback} from "../containers/Toolbar/ActionsDialog/ActionsDialog";

const styles = createStyles({

});

export interface Props extends WithStyles<typeof styles> {
    operations: any,
    plugins: any[],
    actions: ActionData[],
    actionOnUpdate: (type: string, data: ActionData) => void,
    initialState: string,
    stateUpdaters: StateUpdaterData[],
    initialStateOnChange: (value: string) => void,
    stateUpdaterOnUpdate: (type: string, data: StateUpdaterData) => void,
    settings: SettingsData,
    settingsOnUpdate: (settings: SettingsData) => void,
    perspectives: PerspectiveData[],
    perspectivesOnUpdate: (perspectives: PerspectiveData[]) => void,
    components: ComponentData[],
    componentsOnUpdate: (components: ComponentData[]) => void,
    componentOnSelect: (componentData: ComponentData) => void,
    addComponentOnClick: () => void,
    saveOnClick: () => void,
    handler: {
        getWidgetConfig: (name: string) => any;
        getWidget: (name: string, props: any) => void,
        getWidgetInfo: (pluginId: string) => void,
        openVSCode: (code: string, callback: OpenVSCodeCallback) => void,
    },
}

class UIEditor extends React.Component<Props, object> {
    state = {

    };

    componentDidMount(): void {

    }

    render() {
        return (
            <Provider store={store}>
                <UIEditorContainer {...this.props}/>
            </Provider>
        )
    }
}

export default withStyles(styles)(UIEditor);
