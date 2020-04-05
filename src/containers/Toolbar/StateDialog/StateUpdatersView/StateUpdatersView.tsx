// src/containers/Toolbar/StateDialog/StateUpdatersView/StateUpdatersView.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {StoreState, ToolbarState} from "../../../../redux/state";
import * as actions from "../../../../redux/modules/toolbar/actions";
import {StateUpdaterData, UpdaterOperationData, UpdaterOperatorOptions} from "../../../../interface";
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {HotKeys} from "react-hotkeys";

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
    },
    addOperationButton: {
        backgroundColor: 'white'
    },
    form: {
        backgroundColor: 'white',
        marginTop: 3,
        marginBottom: 3,
    },
    tdIcon: {
        width: 50,
        textAlign: 'right'
    },
    tdOperator: {
        width: 120,
        paddingLeft: 5,
        paddingRight: 5,
    },
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

type OperationParamType = 'field' | 'operator' | 'parameter';

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
        const updater: StateUpdaterData = {name, operations: []};
        this.props.stateUpdaterOnUpdate(StateUpdaterOperationType.Add, updater);
        this.stateUpdaterOnSelect(updater)();
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
        const {editingParams} = this.state;
        if (!editingParams) return;
        this.props.stateUpdaterOnUpdate(StateUpdaterOperationType.Update, editingParams);
        this.setState({editing: false});
    };

    handleUpdaterNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let {editingParams} = this.state;
        editingParams.name = event.target.value;
        this.setState({editingParams});
        this.setAsEditing();
    };

    handleAddOperationClick = () => {
        let {editingParams} = this.state;
        if (!editingParams.operations) editingParams['operations'] = [];
        editingParams.operations.push({
            field: '', operator: 'SET', parameter: '',
        });
        this.setState({editingParams});
    };

    handleOperationParamChange = (type: OperationParamType, index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let {editingParams} = this.state;
        editingParams.operations[index][type] = event.target.value;
        this.setState({editingParams});
        this.setAsEditing();
    };

    handleRemoveOperationClick = (index: number) => () => {
        let {editingParams} = this.state;
        editingParams.operations.splice(index, 1);
        this.setState({editingParams});
        this.setAsEditing();
    };

    render() {
        const {classes} = this.props;
        const {stateUpdaterSelected, addUpdaterDialogOpen, editing, editingParams} = this.state;
        return (
            <div className={classes.root}>
                <HotKeys
                    keyMap={{SAVE: "command+s"}}
                    handlers={{SAVE: this.handleSaveButtonClick}}
                    style={{height: '100%'}}
                >
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
                                                    <Typography
                                                        variant={"subtitle1"}>{stateUpdaterSelected.name}</Typography>
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
                                                                className={classes.addOperationButton}
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
                                                {!!editingParams.operations && editingParams.operations.length > 0 &&
                                                <Table padding={"none"}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Field Path</TableCell>
                                                            <TableCell>Operator</TableCell>
                                                            <TableCell>Parameter</TableCell>
                                                            <TableCell/>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {editingParams.operations.map((operation, i) => {
                                                            return (
                                                                <TableRow key={i}>
                                                                    <TableCell>
                                                                        <TextField
                                                                            className={classes.form}
                                                                            value={operation.field}
                                                                            onChange={this.handleOperationParamChange('field', i)}
                                                                            variant={"outlined"}
                                                                            size={"small"}
                                                                            fullWidth={true}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell className={classes.tdOperator}>
                                                                        <FormControl
                                                                            className={classes.form}
                                                                            size={"small"}
                                                                            variant={"outlined"}
                                                                            fullWidth={true}
                                                                        >
                                                                            <Select
                                                                                value={operation.operator}
                                                                                onChange={this.handleOperationParamChange('operator', i)}
                                                                            >
                                                                                {UpdaterOperatorOptions.map((operator, i) => {
                                                                                    return (
                                                                                        <MenuItem key={i}
                                                                                                  value={operator}>{operator}</MenuItem>
                                                                                    )
                                                                                })}
                                                                            </Select>
                                                                        </FormControl>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField
                                                                            className={classes.form}
                                                                            value={operation.parameter}
                                                                            onChange={this.handleOperationParamChange('parameter', i)}
                                                                            variant={"outlined"}
                                                                            size={"small"}
                                                                            fullWidth={true}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell className={classes.tdIcon}>
                                                                        <IconButton
                                                                            size={"small"}
                                                                            onClick={this.handleRemoveOperationClick(i)}
                                                                        >
                                                                            <DeleteOutlineIcon/>
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })}
                                                    </TableBody>
                                                </Table>
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
                </HotKeys>
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
