// src/containers/Toolbar/StateDialog/StateUpdatersView/StateUpdatersView.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {StoreState, ToolbarState} from "src/redux/state";
import * as actions from "src/redux/modules/toolbar/actions";
import {StateUpdaterData, UpdaterOperationData} from "../../../../interface";
import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
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
import SaveIcon from "@material-ui/icons/Save";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

const styles = createStyles({
    root: {
        width: '100%',
        height: '100%'
    },
    tableHeader: {
        width: '100%'
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
    },
    paperContent: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        marginLeft: 20,
    },
    updaterContent: {
        margin: 20,
        padding: 10,
        overflow: 'scroll'
    },
    paperOperations: {
        marginTop: 20,
        backgroundColor: '#f5f5f5'
    },
    paperOperationsHeader: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 0,
        backgroundColor: '#f5f5f5',
    },
    operationsContainer: {
        padding: 20,
    }
});

export interface Props extends WithStyles<typeof styles>, ToolbarState {
    stateUpdaters: StateUpdaterData[],
    stateUpdaterOnUpdate: (type: string, data: StateUpdaterData) => void,
}

interface State {
    stateUpdaterSelected: StateUpdaterData | undefined,
    addUpdaterDialogOpen: boolean,
    editing: boolean,
    editingParams: {
        name: string,
        operations: UpdaterOperationData[]
    },
}

class StateUpdatersView extends React.Component<Props, object> {
    state: State = {
        stateUpdaterSelected: undefined,
        addUpdaterDialogOpen: false,
        editing: false,
        editingParams: {
            name: '',
            operations: []
        }
    };

    componentDidMount(): void {

    }

    setAsEditing = () => {
        if (!this.state.editing) this.setState({editing: true});
    };

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
        this.setState({
            stateUpdaterSelected: updater,
            editingParams: {...updater},
        });
    };

    handleSaveButtonClick = () => {

    };

    handleUpdaterNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let {editingParams} = this.state;
        editingParams.name = event.target.value;
        this.setState({editingParams});
        this.setAsEditing();
    };

    handleAddOperationClick = () => {

    };

    render() {
        const {classes} = this.props;
        const {stateUpdaterSelected, addUpdaterDialogOpen, editing, editingParams} = this.state;
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
                            {!!stateUpdaterSelected &&
                            <Paper className={classes.paperContent}>
                                <Paper className={classes.paperHeader}>
                                    <table className={classes.tableHeader}>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <Typography variant={"subtitle1"}>{stateUpdaterSelected.name}</Typography>
                                            </td>
                                            <td align={"right"}>
                                                <Button
                                                    size={"small"}
                                                    variant={"contained"}
                                                    color={"primary"}
                                                    onClick={this.handleSaveButtonClick}
                                                    disabled={!editing}
                                                >
                                                    <SaveIcon/>&nbsp;Save
                                                </Button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </Paper>
                                <div className={classes.updaterContent}>
                                    <TextField
                                        value={editingParams.name}
                                        onChange={this.handleUpdaterNameChange}
                                        label={"Updater Name"}
                                        variant={"outlined"}
                                        fullWidth={true}
                                        size={"small"}
                                    />
                                    <Paper className={classes.paperOperations}>
                                        <Paper className={classes.paperOperationsHeader}>
                                            <table className={classes.tableHeader}>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <Typography variant={"subtitle2"}>OPERATIONS</Typography>
                                                    </td>
                                                    <td align={"right"}>
                                                        <Button
                                                            variant={"outlined"}
                                                            size={"small"}
                                                            onClick={this.handleAddOperationClick}
                                                        >
                                                            <AddIcon/>&nbsp;Add Operation
                                                        </Button>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </Paper>
                                        <div className={classes.operationsContainer}>
                                            {(!editingParams.operations || editingParams.operations.length === 0) &&
                                            <div>
                                                <Alert severity={"warning"}>No operation in this updater.</Alert>
                                            </div>
                                            }
                                        </div>

                                    </Paper>
                                </div>
                            </Paper>
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>

                <DialogForm
                    open={addUpdaterDialogOpen}
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
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StateUpdatersView));
