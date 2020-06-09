// src/containers/Toolbar/StateActionsDialog/StateActionsDialog.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import {StoreState, ToolbarState} from "../../../redux/state";
import * as actions from "../../../redux/modules/toolbar/actions";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import CropFreeIcon from '@material-ui/icons/CropFree';
import ActionsPane from "./ActionsPane";
import StateUpdatersView from "./StateUpdatersView";
import {ActionData, StateUpdaterData} from "../../../interface";
import InitialStateView from "./InitialStateView";
import {OpenVSCodeCallback} from "./ActionsPane/ActionsPane";
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import StateStructureEditor from "./StateStructureEditor";

const styles = createStyles({
    root: {

    },
    paper: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    tabButton: {
        marginRight: 20,
    }
});

export interface Props extends WithStyles<typeof styles>, ToolbarState {
    actions: ActionData[],
    actionOnUpdate: (type: string, data: ActionData) => void,
    openVSCode: (code: string, callback: OpenVSCodeCallback) => void,
    initialState: string,
    stateUpdaters: StateUpdaterData[],
    initialStateOnChange: (value: string) => void,
    stateUpdaterOnUpdate: (type: string, data: StateUpdaterData) => void,
    schemaEditorData: any,
    schemaEditorDataOnUpdate: (editorData: any) => void,
    //
    stateActionsDialogClose: () => void,
}

enum View {
    Actions = "Actions",
    StateUpdaters = "StateUpdaters",
    InitialState = "InitialState",
    StateStructure = "StateStructure",
}

interface State {
    currentView: View
}

class StateActionsDialog extends React.Component<Props, object> {
    state: State = {
        currentView: View.Actions
    };

    componentDidMount(): void {

    }

    onEnter = () => {

    };

    setCurrentView = (currentView: View) => () => {
        this.setState({currentView});
    };

    render() {
        const {classes, stateActionsDialog} = this.props;
        const {currentView} = this.state;
        return (
            <div className={classes.root}>
                <Dialog
                    open={stateActionsDialog.open}
                    onClose={this.props.stateActionsDialogClose}
                    onEnter={this.onEnter}
                    transitionDuration={0}
                    disableEnforceFocus={true}
                    maxWidth={"lg"}
                    fullWidth={true}
                >
                    <Paper
                        square
                        className={classes.paper}
                    >
                        <Button
                            className={classes.tabButton}
                            variant={currentView === View.Actions ? "contained" : "text"}
                            color={currentView === View.Actions ? "primary" : "default"}
                            onClick={this.setCurrentView(View.Actions)}
                        >
                            <BuildOutlinedIcon/>&nbsp;Actions
                        </Button>
                        <Button
                            className={classes.tabButton}
                            variant={currentView === View.StateUpdaters ? "contained" : "text"}
                            color={currentView === View.StateUpdaters ? "primary" : "default"}
                            onClick={this.setCurrentView(View.StateUpdaters)}
                        >
                            <DynamicFeedIcon/>&nbsp;State Updaters
                        </Button>
                        <Button
                            className={classes.tabButton}
                            variant={currentView === View.StateStructure ? "contained": "text"}
                            color={currentView === View.StateStructure ? "primary" : "default"}
                            onClick={this.setCurrentView(View.StateStructure)}
                        >
                            <AccountTreeOutlinedIcon/>&nbsp;State Structure
                        </Button>
                        <Button
                            className={classes.tabButton}
                            variant={currentView === View.InitialState ? "contained" : "text"}
                            color={currentView === View.InitialState ? "primary" : "default"}
                            onClick={this.setCurrentView(View.InitialState)}
                        >
                            <CropFreeIcon/>&nbsp;Initial State
                        </Button>
                    </Paper>
                    <div>
                        {currentView === View.Actions &&
                        <ActionsPane
                            actions={this.props.actions}
                            actionOnUpdate={this.props.actionOnUpdate}
                            openVSCode={this.props.openVSCode}
                        />
                        }
                        {currentView === View.StateUpdaters &&
                        <StateUpdatersView
                            stateUpdaters={this.props.stateUpdaters}
                            stateUpdaterOnUpdate={this.props.stateUpdaterOnUpdate}
                        />
                        }
                        {currentView === View.StateStructure &&
                        <StateStructureEditor
                            schemaEditorData={this.props.schemaEditorData}
                            schemaEditorDataOnUpdate={this.props.schemaEditorDataOnUpdate}
                        />
                        }
                        {currentView === View.InitialState &&
                        <InitialStateView
                            initialState={this.props.initialState}
                            initialStateOnChange={this.props.initialStateOnChange}
                        />
                        }
                    </div>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.toolbar;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ToolbarAction>) => {
    return {
        stateActionsDialogClose: () => dispatch(actions.stateActionsDialogClose()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StateActionsDialog));
