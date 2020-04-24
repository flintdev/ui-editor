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
import * as _ from 'lodash';

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
    components: ComponentData[],
    settings: SettingsData,
    perspectives: PerspectiveData[],
}

class ExampleContainer extends React.Component<Props, object> {
    state: State = {
        actions: actionsExample,
        stateUpdaters: stateUpdatersExample,
        initialState: '',
        components: componentsExample,
        settings: {},
        perspectives: perspectivesSample,
    };
    operations: any = {};

    componentDidMount(): void {

    }

    handleAddComponentClick = () => {
        const id = _.uniqueId('w');
        const data = {
            id,
            name: 'material-widgets::Button',
            params: {label: 'Button'},
            children: [],
            canvas: {
                display: 'inline-block'
            }
        };
        this.operations.addComponent(data);
    };

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

    render() {
        const {classes} = this.props;
        const {actions, stateUpdaters, initialState, components, settings, perspectives} = this.state;
        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={createMuiTheme()}>
                    <MuiThemeProvider theme={createMuiTheme()}>
                        <UIEditor
                            operations={this.operations}
                            initialState={initialState}
                            stateUpdaters={stateUpdaters}
                            initialStateOnChange={this.handleInitialStateChange}
                            stateUpdaterOnUpdate={this.handleStateUpdatersOnUpdate}
                            actions={actions}
                            actionOnUpdate={this.handleActionUpdate}
                            settings={settings}
                            settingsOnUpdate={this.handleSettingsOnUpdate}
                            perspectives={perspectives}
                            perspectivesOnUpdate={this.handlePerspectivesOnUpdate}
                            components={components}
                            componentsOnUpdate={this.handleComponentsOnUpdate}
                            componentOnSelect={this.handleComponentOnSelect}
                            addComponentOnClick={this.handleAddComponentClick}
                            saveOnClick={() => {
                            }}
                            handler={{
                                getWidgetConfig: getWidgetConfiguration,
                                getWidget: getWidget,
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
