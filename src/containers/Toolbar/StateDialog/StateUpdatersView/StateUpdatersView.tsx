// src/containers/Toolbar/StateDialog/StateUpdatersView/StateUpdatersView.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import {StoreState, ToolbarState} from "src/redux/state";
import * as actions from "src/redux/modules/toolbar/actions";
import {StateUpdaterData} from "../../../../interface";
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@material-ui/icons/IndeterminateCheckBoxOutlined";
import {StateUpdaterOperationType} from "../../../../constants";
import {Params, Callback} from "../../../../components/DialogForm";
import DialogForm from "../../../../components/DialogForm/DialogForm";
import {AddStateUpdaterDef} from "./definition";

const styles = createStyles({
    root: {

    },
    tableContent: {
        width: '100%',
        height: '100%'
    },
    tdList: {
        width: 240,
    },
    paperHeader: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 0,
    },
    paperList: {
        weight: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
    },
    updaterList: {
        flexGrow: 1,
        overflow: 'scroll'
    },
    itemText: {
        fontSize: 16
    }
});

export interface Props extends WithStyles<typeof styles>, ToolbarState {
    stateUpdaters: StateUpdaterData[],
    stateUpdaterOnUpdate: (type: string, data: StateUpdaterData) => void,
}

interface State {
    stateUpdaterSelected: StateUpdaterData | undefined,
    addUpdaterDialogOpen: boolean,
}

class StateUpdatersView extends React.Component<Props, object> {
    state: State = {
        stateUpdaterSelected: undefined,
        addUpdaterDialogOpen: false,
    };

    componentDidMount(): void {

    }

    handleAddUpdaterClick = () => {
        this.setState({addUpdaterDialogOpen: true});
    };

    handleAddUpdaterDialogClose = () => {
        this.setState({addUpdaterDialogOpen: false});
    };

    handleAddUpdaterSubmit = (params: Params, callback: Callback) => {
        const name = params.name as string;
        const updater: StateUpdaterData = {name};
        this.props.stateUpdaterOnUpdate(StateUpdaterOperationType.Add, updater);
        this.setState({stateUpdaterSelected: updater});
        this.forceUpdate();
        callback.close();
    };

    handleDeleteUpdaterClick = () => {
        const {stateUpdaterSelected} = this.state;
        if (!stateUpdaterSelected) return;
        this.props.stateUpdaterOnUpdate(StateUpdaterOperationType.Delete, stateUpdaterSelected);
        this.forceUpdate();
    };

    stateUpdaterOnSelect = (updater: StateUpdaterData) => () => {
        this.setState({stateUpdaterSelected: updater});
    };

    render() {
        const {classes} = this.props;
        const {stateUpdaterSelected, addUpdaterDialogOpen} = this.state;
        return (
            <div className={classes.root}>
                <table className={classes.tableContent}>
                    <tbody>
                    <tr>
                        <td valign={"top"} className={classes.tdList}>
                            <Paper className={classes.paperList}>
                                <Paper className={classes.paperHeader}>
                                    <Button
                                        size={"small"}
                                        variant={"outlined"}
                                        onClick={this.handleAddUpdaterClick}
                                    >
                                        <AddBoxOutlinedIcon fontSize={"small"}/>&nbsp;Add
                                    </Button>&nbsp;&nbsp;
                                    <Button
                                        size={"small"}
                                        variant={"outlined"}
                                        onClick={this.handleDeleteUpdaterClick}
                                    >
                                        <IndeterminateCheckBoxOutlinedIcon fontSize={"small"}/>&nbsp;Delete
                                    </Button>
                                </Paper>
                                <List className={classes.updaterList}>
                                    {this.props.stateUpdaters.map((updater, i) => {
                                        return (
                                            <ListItem
                                                dense={true}
                                                button={true}
                                                key={i}
                                                selected={!!stateUpdaterSelected && stateUpdaterSelected.name === updater.name}
                                                onClick={this.stateUpdaterOnSelect(updater)}
                                            >
                                                <ListItemText className={classes.itemText} primary={updater.name}/>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Paper>
                        </td>
                        <td valign={"top"}>

                        </td>
                    </tr>
                    </tbody>
                </table>

                <DialogForm
                    open={this.state.addUpdaterDialogOpen}
                    onClose={this.handleAddUpdaterDialogClose}
                    title={"New State Updater"}
                    submitButtonTitle={"Add"}
                    forms={AddStateUpdaterDef}
                    onSubmit={this.handleAddUpdaterSubmit}
                />

            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.toolbar;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ToolbarAction>) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StateUpdatersView));
