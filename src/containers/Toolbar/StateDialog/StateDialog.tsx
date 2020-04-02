// src/containers/Toolbar/StateDialog/StateDialog.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import {StoreState, ToolbarState} from "../../../redux/state";
import * as actions from "../../../redux/modules/toolbar/actions";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import StateUpdatersView from "./StateUpdatersView";
import {StateUpdaterData} from "../../../interface";
import InitialStateView from "./InitialStateView";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";


const styles = createStyles({
    root: {
        
    },
    paperTabs: {
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 0,
    },
    content: {
        margin: 10,
        height: '80vh',
    },
    table: {
        width: '100%'
    }
});

export interface Props extends WithStyles<typeof styles>, ToolbarState {
    initialState: string,
    stateUpdaters: StateUpdaterData[],
    initialStateOnChange: (value: string) => void,
    stateUpdaterOnUpdate: (type: string, data: StateUpdaterData) => void,
    stateDialogClose: () => void,
}

interface State {
    tabIndex: number,
}

class StateDialog extends React.Component<Props, object> {
    state: State = {
        tabIndex: 0
    };

    componentDidMount(): void {

    }

    onEnter = () => {

    };

    handleTabChange = (event: React.ChangeEvent<{}>, value: number) => {
        this.setState({tabIndex: value});
    };

    render() {
        const {classes, stateDialog} = this.props;
        const {open} = stateDialog;
        const {tabIndex} = this.state;
        return (
            <div className={classes.root}>
                <Dialog
                    open={open}
                    onClose={this.props.stateDialogClose}
                    onEnter={this.onEnter}
                    maxWidth={"lg"}
                    fullWidth={true}
                    disableEnforceFocus={true}
                >
                    <Paper className={classes.paperTabs}>
                        <table className={classes.table}>
                            <tbody>
                            <tr>
                                <td>
                                    <Tabs
                                        value={tabIndex}
                                        onChange={this.handleTabChange}
                                        indicatorColor={"primary"}
                                        textColor={"primary"}
                                    >
                                        <Tab label={'State Updaters'}/>
                                        <Tab label={'Initial State'}/>
                                    </Tabs>
                                </td>
                                <td align={"right"}>
                                    <IconButton size={"small"} onClick={this.props.stateDialogClose}>
                                        <CloseIcon/>
                                    </IconButton>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Paper>
                    <div className={classes.content}>
                        {tabIndex === 0 &&
                        <StateUpdatersView
                            stateUpdaters={this.props.stateUpdaters}
                            stateUpdaterOnUpdate={this.props.stateUpdaterOnUpdate}
                        />
                        }
                        {tabIndex === 1 &&
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
        stateDialogClose: () => dispatch(actions.stateDialogClose()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StateDialog));
