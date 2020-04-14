// src/UIEditor/UIEditorContainer.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {StoreState, ToolbarState} from "../redux/state";
import * as actions from "../redux/modules/components/actions";
import {ActionData, ComponentData, PerspectiveData, SettingsData, StateUpdaterData} from "../interface";
import Toolbar from "../containers/Toolbar/Toolbar";
import ComponentTreeView from "../containers/ComponentTreeView/ComponentTreeView";
import ComponentEditPane from "../containers/ComponentEditPane/ComponentEditPane";
import ActionsDialog, {OpenVSCodeCallback} from "../containers/Toolbar/ActionsDialog/ActionsDialog";
import StateDialog from "../containers/Toolbar/StateDialog/StateDialog";
import UIEditorCanvas from '@flintdev/ui-editor-canvas';
import {ComponentState} from "react";
import SettingsDialog from "../containers/Toolbar/SettingsDialog";
import Paper from "@material-ui/core/Paper";
import PerspectivePane from "../containers/PerspectivePane";
import Splitter from 'm-react-splitters';
import 'm-react-splitters/lib/splitters.css';
import {TreeDataHelper} from "../controllers/treeDataHelper";

const styles = createStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: "column",
    },
    header: {
        zIndex: 1001,
    },
    content: {
        flexGrow: 1
    },
    table: {
        width: '100%',
        height: '100%',
        border: 0,
        cellSpacing: 0,
        cellPadding: 0,
        borderSpacing: 0,
        borderCollapse: 'collapse',
    },
    tdLeft: {
        width: 240,
        height: '100%',
        borderRight: '1px solid #ddd'
    },
    tdMiddle: {
        height: '100%',
        flex: 1,
        display: 'flex',
        flexFlow: 'column'
    },
    tdRight: {
        width: 240,
        height: '100%',
        borderLeft: '1px solid #ddd'
    },
    paperCanvas: {
        margin: 20,
        flexGrow: 1
    },
    splitView: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: "column",
        height: '100%',

    },
    primaryPane: {
        overflow: 'auto'
    }
});

export interface Props extends WithStyles<typeof styles>, ToolbarState, ComponentState {
    selectComponent: (value: ComponentData) => void,
    increaseMark: () => void,
    operations: any,
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
        getWidget: (name: string, props: any) => any
        openVSCode: (code: string, callback: OpenVSCodeCallback) => void,
    },
}

class UIEditorContainer extends React.Component<Props, object> {
    state = {};
    treeOperations: any = {};
    treeDataHelper: TreeDataHelper = new TreeDataHelper();
    componentDidMount(): void {

    }

    handleTreeComponentsOnUpdate = (components: ComponentData[]) => {
        this.props.componentsOnUpdate(components);
    };

    handleEditPaneComponentsOnUpdate = (components: ComponentData[]) => {
        this.props.componentsOnUpdate(components);
        this.props.increaseMark();
    };

    handleCanvasComponentsOnUpdate = (components: ComponentData[]) => {
        this.props.componentsOnUpdate(components);
        this.props.increaseMark();
    };

    handleComponentOnDelete = (componentData: ComponentData) => {

    };

    handleCanvasComponentOnSelect = (componentData: ComponentData) => {
        if (!!this.treeOperations.selectTreeItem) this.treeOperations.selectTreeItem(componentData.id);
    };

    handleTreeViewComponentOnSelect = (componentData: ComponentData) => {
        if (!!this.props.operations.selectComponentById) this.props.operations.selectComponentById(componentData.id);
        this.props.componentOnSelect(componentData);
    };

    handlePerspectiveSelected = (perspectiveData: PerspectiveData) => {

    };

    hideComponents = () => {
        const {perspectiveDataSelected, components} = this.props;
        if (!perspectiveDataSelected) return components;
        const stateJson = JSON.parse(perspectiveDataSelected.code);
        return this.treeDataHelper.hideComponentsByState(components, stateJson);
    };

    render() {
        const {classes, mode} = this.props;
        const components = this.hideComponents();
        return (
            <div className={classes.root}>
                <div className={classes.root}>
                    <div className={classes.header}>
                        <Toolbar
                            addComponentOnClick={this.props.addComponentOnClick}
                            saveOnClick={this.props.saveOnClick}
                        />
                    </div>
                    <div className={classes.content}>
                        <table className={classes.table}>
                            <tbody>
                            <tr>
                                <td valign={"top"} className={classes.tdLeft}>
                                    <Paper className={classes.splitView}>
                                        <Splitter
                                            position="horizontal"
                                            primaryPaneMaxHeight={"50%"}
                                            primaryPaneMinHeight={"50px"}
                                            primaryPaneHeight="200px"
                                            postPoned={false}
                                            dispatchResize={true}
                                            primaryPaneClassName={classes.primaryPane}
                                        >
                                            <div>
                                                <PerspectivePane
                                                    perspectives={this.props.perspectives}
                                                    initialState={this.props.initialState}
                                                    perspectivesOnUpdate={this.props.perspectivesOnUpdate}
                                                    perspectiveSelected={this.handlePerspectiveSelected}
                                                />
                                            </div>
                                            <div>
                                                <ComponentTreeView
                                                    operations={this.treeOperations}
                                                    components={components}
                                                    componentsOnUpdate={this.handleTreeComponentsOnUpdate}
                                                    componentOnSelect={this.handleTreeViewComponentOnSelect}
                                                />
                                            </div>
                                        </Splitter>
                                    </Paper>

                                </td>
                                <td valign={"top"} className={classes.tdMiddle}>
                                    <Paper className={classes.paperCanvas}>
                                        <div style={{overflow: "auto", height: '100%'}}>
                                            <div style={{overflow: "auto", height: '100%'}}>
                                                <UIEditorCanvas
                                                    operations={this.props.operations}
                                                    components={components}
                                                    editorLib={{getWidget: this.props.handler.getWidget}}
                                                    componentsUpdated={this.handleCanvasComponentsOnUpdate}
                                                    componentOnSelect={this.handleCanvasComponentOnSelect}
                                                    componentOnDelete={this.handleComponentOnDelete}
                                                    isDnd={mode === "editor"}
                                                />
                                            </div>
                                        </div>
                                    </Paper>
                                </td>
                                <td valign={"top"} className={classes.tdRight}>
                                    <ComponentEditPane
                                        components={this.props.components}
                                        componentsOnUpdate={this.handleEditPaneComponentsOnUpdate}
                                        actions={this.props.actions}
                                        handler={{getWidgetConfig: this.props.handler.getWidgetConfig}}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <ActionsDialog
                        actions={this.props.actions}
                        actionOnUpdate={this.props.actionOnUpdate}
                        openVSCode={this.props.handler.openVSCode}
                    />

                    <StateDialog
                        initialState={this.props.initialState}
                        stateUpdaters={this.props.stateUpdaters}
                        initialStateOnChange={this.props.initialStateOnChange}
                        stateUpdaterOnUpdate={this.props.stateUpdaterOnUpdate}
                    />

                    <SettingsDialog
                        settings={this.props.settings}
                        settingsOnUpdate={this.props.settingsOnUpdate}
                    />

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return {...state.components, ...state.toolbar};
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ComponentsAction>) => {
    return {
        selectComponent: (value: ComponentData) => dispatch(actions.selectComponent(value)),
        increaseMark: () => dispatch(actions.increaseMark()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UIEditorContainer));
