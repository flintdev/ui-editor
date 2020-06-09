// example/ExampleContainer.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import UIEditor from "../src/UIEditor";
import {actionsExample} from "./data/actions";
import {ActionData, ComponentData, PerspectiveData, SettingsData, StateUpdaterData} from '../src/interface';
import {ActionOperationType, StateUpdaterOperationType} from "../src/constants";
import {stateUpdatersExample} from "./data/stateUpdaters";
import {componentsExample} from "./data/components";
import {perspectivesSample} from "./data/perspectives";

export function getWidget(name: string, props: any) {
    const tempList: any = name.split('::');
    const widgetName = tempList[1];
    const pluginId = tempList[0];
    const library: any = window[pluginId]
    const getWidgetFunc = library['getWidget'];
    return getWidgetFunc(widgetName, props);
}

export function getWidgetConfiguration(name: string) {
    const tempList: any = name.split('::');
    const widgetName = tempList[1];
    const pluginId = tempList[0];
    const library: any = window[pluginId]
    const getWidgetConfigurationFunc = library['getWidgetConfiguration'];
    return getWidgetConfigurationFunc(widgetName);
}

export function getWidgetInfo(pluginId: string) {
    const libraryName: any = pluginId;
    const library: any = window[libraryName]
    return library['widgetInfo'];
}


const styles = createStyles({
    root: {
        height: '100%'
    },
});

export interface Props extends WithStyles<typeof styles> {

}

interface State {
    actions: ActionData[],
    stateUpdaters: StateUpdaterData[],
    initialState: string,
    schemaEditorData: any,
    components: ComponentData[],
    settings: SettingsData,
    perspectives: PerspectiveData[],
    plugins: any[],
}

class ExampleContainer extends React.Component<Props, object> {
    state: State = {
        actions: actionsExample,
        stateUpdaters: stateUpdatersExample,
        initialState: '',
        components: componentsExample,
        settings: {},
        perspectives: perspectivesSample,
        plugins: [],
        schemaEditorData: undefined
    };
    operations: any = {};

    componentDidMount(): void {
        this.setState({plugins: [{id: 'material-widgets', name: 'Material Design'}]})
    }

    handleActionUpdate = (type: string, data: ActionData) => {
        let {actions} = this.state;
        if (type === ActionOperationType.Update) {
            const index = actions.findIndex(action => action.name === data.name);
            if (index > -1) {
                actions[index] = data;
                this.setState({actions});
            }
        } else if (type === ActionOperationType.Add) {
            actions.push(data);
            this.setState({actions});
        } else if (type === ActionOperationType.Delete) {
            const index = actions.findIndex(action => action.name === data.name);
            if (index > -1) {
                actions.splice(index, 1);
                this.setState({actions});
            }
        }
    };

    handleStateUpdatersOnUpdate = (type: string, data: StateUpdaterData) => {
        let {stateUpdaters} = this.state;
        if (type === StateUpdaterOperationType.Update) {
            const index = stateUpdaters.findIndex(updater => updater.name === data.name);
            if (index > -1) {
                stateUpdaters[index] = data;
                this.setState({stateUpdaters});
            }
        } else if (type === StateUpdaterOperationType.Add) {
            stateUpdaters.push(data);
            this.setState({stateUpdaters});
        } else if (type === StateUpdaterOperationType.Delete) {
            const index = stateUpdaters.findIndex(updater => updater.name === data.name);
            if (index > -1) {
                stateUpdaters.splice(index, 1);
                this.setState({stateUpdaters});
            }
        }
    };

    handleInitialStateChange = (value: string) => {
        this.setState({initialState: value});
    };

    handleSettingsOnUpdate = (settings: SettingsData) => {
        this.setState({settings});
    };

    handlePerspectivesOnUpdate = (perspectives: PerspectiveData[]) => {
        this.setState({perspectives});
    };

    handleComponentsOnUpdate = (components: ComponentData[]) => {
        this.setState({components});
    };

    handleComponentOnSelect = (componentData: ComponentData) => {

    };

    handleSchemaEditorDataOnUpdate = (editorData: any) => {
        this.setState({schemaEditorData: editorData});
    };

    render() {
        const {classes} = this.props;
        const {actions, stateUpdaters, initialState, components, settings, perspectives, plugins, schemaEditorData} = this.state;
        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={createMuiTheme()}>
                    <MuiThemeProvider theme={createMuiTheme()}>
                        <UIEditor
                            operations={this.operations}
                            plugins={plugins}
                            initialState={initialState}
                            stateUpdaters={stateUpdaters}
                            initialStateOnChange={this.handleInitialStateChange}
                            stateUpdaterOnUpdate={this.handleStateUpdatersOnUpdate}
                            actions={actions}
                            actionOnUpdate={this.handleActionUpdate}
                            schemaEditorData={schemaEditorData}
                            schemaEditorDataOnUpdate={this.handleSchemaEditorDataOnUpdate}
                            settings={settings}
                            settingsOnUpdate={this.handleSettingsOnUpdate}
                            perspectives={perspectives}
                            perspectivesOnUpdate={this.handlePerspectivesOnUpdate}
                            components={components}
                            componentsOnUpdate={this.handleComponentsOnUpdate}
                            componentOnSelect={this.handleComponentOnSelect}
                            saveOnClick={() => {
                            }}
                            handler={{
                                getWidgetConfig: getWidgetConfiguration,
                                getWidget: getWidget,
                                getWidgetInfo: getWidgetInfo,
                                openVSCode: ((code, callback) => {
                                })
                            }}
                        />
                    </MuiThemeProvider>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default withStyles(styles)(ExampleContainer);
