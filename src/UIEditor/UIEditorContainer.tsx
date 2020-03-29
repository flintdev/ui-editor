// src/UIEditor/UIEditorContainer.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import {StoreState, ToolbarState} from "../redux/state";
import * as actions from "../redux/modules/components/actions";
import {ActionData, ComponentData, StateUpdaterData} from "../interface";
import Toolbar from "../containers/Toolbar/Toolbar";
import ComponentTreeView from "../containers/ComponentTreeView/ComponentTreeView";
import ComponentEditPane from "../containers/ComponentEditPane/ComponentEditPane";
import ActionsDialog from "../containers/Toolbar/ActionsDialog/ActionsDialog";
import StateDialog from "../containers/Toolbar/StateDialog/StateDialog";
import UIEditorCanvas from '@flintdev/ui-editor-canvas';
import {ComponentState} from "react";

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
        flex: 1
    },
    tdRight: {
        width: 240,
        height: '100%',
        borderLeft: '1px solid #ddd'
    }
});

export interface Props extends WithStyles<typeof styles>, ToolbarState, ComponentState {
    selectComponent: (value: ComponentData) => void,
    operations: any,
    actions: ActionData[],
    actionOnUpdate: (type: string, data: ActionData) => void,
    initialState: string,
    stateUpdaters: StateUpdaterData[],
    initialStateOnChange: (value: string) => void,
    stateUpdaterOnUpdate: (type: string, data: StateUpdaterData) => void,
    components: ComponentData[],
    componentsOnUpdate: (components: ComponentData[]) => void,
    componentOnSelect: (componentData: ComponentData) => void,
    addComponentOnClick: () => void,
    saveOnClick: () => void,
    handler: {
        getWidgetConfig: (name: string) => any;
        getWidget: (name: string, props: any) => any
    },
}

class UIEditorContainer extends React.Component<Props, object> {
    state = {

    };
    treeOperations: any = {};
    componentDidMount(): void {

    }

    handleTreeComponentsOnUpdate = (components: ComponentData[]) => {
        this.props.operations.updateComponents(components);
        this.props.componentsOnUpdate(components);
    };

    handleEditPaneComponentsOnUpdate = (components: ComponentData[]) => {
        this.props.operations.updateComponents(components);
        this.props.componentsOnUpdate(components);
    };

    handleCanvasComponentsOnUpdate = (components: ComponentData[]) => {
        this.props.componentsOnUpdate(components);
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

    render() {
        const {classes, mode} = this.props;
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
                                    <ComponentTreeView
                                        operations={this.treeOperations}
                                        components={this.props.components}
                                        componentsOnUpdate={this.handleTreeComponentsOnUpdate}
                                        componentOnSelect={this.handleTreeViewComponentOnSelect}
                                    />
                                </td>
                                <td valign={"top"} className={classes.tdMiddle}>
                                    <div style={{overflow: "auto", height: '100%'}}>
                                        <div style={{overflow: "scroll", height: '100%'}}>
                                            <UIEditorCanvas
                                                operations={this.props.operations}
                                                components={this.props.components}
                                                editorLib={{getWidget: this.props.handler.getWidget}}
                                                componentsUpdated={this.handleCanvasComponentsOnUpdate}
                                                componentOnSelect={this.handleCanvasComponentOnSelect}
                                                componentOnDelete={this.handleComponentOnDelete}
                                                isDnd={mode === "editor"}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td valign={"top"} className={classes.tdRight}>
                                    <ComponentEditPane
                                        components={this.props.components}
                                        componentsOnUpdate={this.handleEditPaneComponentsOnUpdate}
                                        actions={this.props.actions}
                                        handler={this.props.handler}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <ActionsDialog
                        actions={this.props.actions}
                        actionOnUpdate={this.props.actionOnUpdate}
                    />

                    <StateDialog
                        initialState={this.props.initialState}
                        stateUpdaters={this.props.stateUpdaters}
                        initialStateOnChange={this.props.initialStateOnChange}
                        stateUpdaterOnUpdate={this.props.stateUpdaterOnUpdate}
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UIEditorContainer));
