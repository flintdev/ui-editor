// src/containers/Toolbar/ActionsDialog/ActionsDialog.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {StoreState, ToolbarState} from "../../../redux/state";
import * as actions from "../../../redux/modules/toolbar/actions";
import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from "@material-ui/core/Dialog";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import {ActionData} from "../../../interface";
import AceEditor from "react-ace";
import 'ace-builds/webpack-resolver';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import SaveIcon from '@material-ui/icons/Save';
import {ActionOperationType} from "../../../constants";
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import DialogForm, {Params, Callback} from "../../../components/DialogForm";
import {AddActionDef} from "./definition";
import ActionTemplate from './actionTemplate.txt';

const styles = createStyles({
    root: {},
    dialog: {
        backgroundColor: '#f5f5f5',
    },
    paperHeader: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 0,
    },
    tableHeader: {
        width: '100%'
    },
    content: {
        margin: 10,
        height: '80vh'
    },
    tableContent: {
        width: '100%',
        height: '100%'
    },
    tdList: {
        width: 240,
    },
    paperContent: {
        weight: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column'
    },
    paperCodeEditorHeader: {
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
    actionList: {
        flexGrow: 1,
        overflow: 'scroll'
    },
    codeEditorContainer: {
        marginLeft: 20,
        height: '100%',
    },
    itemText: {
        fontSize: 16
    }
});

export interface Props extends WithStyles<typeof styles>, ToolbarState {
    actions: ActionData[],
    actionOnUpdate: (type: string, data: ActionData) => void,
    actionsDialogClose: () => void,
}

interface State {
    actionSelected: ActionData | undefined,
    codeValue: string,
    editing: boolean,
    addActionDialogOpen: boolean,
}

class ActionsDialog extends React.Component<Props, object> {
    state: State = {
        actionSelected: undefined,
        codeValue: '',
        editing: false,
        addActionDialogOpen: false,
    };

    componentDidMount(): void {

    }

    onEnter = () => {

    };

    handleAddActionDialogClose = () => {
        this.setState({
            addActionDialogOpen: false,
        });
    };

    actionOnSelect = (action: ActionData) => () => {
        this.setState({
            actionSelected: action,
            codeValue: action.code,
            editing: false,
        })
    };

    handleCodeChange = (value: string) => {
        this.setState({codeValue: value});
        if (!this.state.editing) this.setState({editing: true});
    };

    handleCodeSaveButtonClick = () => {
        const {codeValue, actionSelected} = this.state;
        if (!actionSelected) return;
        const action: ActionData = {name: actionSelected.name, code: codeValue};
        this.props.actionOnUpdate(ActionOperationType.Update, action);
        this.setState({editing: false});
    };

    handleAddActionClick = () => {
        this.setState({addActionDialogOpen: true});
    };

    handleAddActionSubmit = (params: Params, callback: Callback) => {
        const name = params.name as string;
        const action: ActionData = {name: name, code: ActionTemplate};
        this.props.actionOnUpdate(ActionOperationType.Add, action);
        this.setState({actionSelected: action, codeValue: ActionTemplate});
        this.forceUpdate();
        callback.close();
    };

    handleDeleteActionClick = () => {
        const {actionSelected} = this.state;
        if (!actionSelected) return;
        this.props.actionOnUpdate(ActionOperationType.Delete, actionSelected);
        this.forceUpdate();
    };

    render() {
        const {classes, actionsDialog} = this.props;
        const {open} = actionsDialog;
        const {codeValue, actionSelected, editing} = this.state;
        return (
            <div className={classes.root}>
                <Dialog
                    open={open}
                    onClose={this.props.actionsDialogClose}
                    onEnter={this.onEnter}
                    maxWidth={"lg"}
                    fullWidth={true}
                    disableEnforceFocus={true}
                >
                    <Paper className={classes.paperHeader}>
                        <table className={classes.tableHeader}>
                            <tbody>
                            <tr>
                                <td>
                                    <Typography variant={"subtitle1"}>ACTIONS</Typography>
                                </td>
                                <td align={"right"}>
                                    <Button
                                        variant={"outlined"}
                                        size={"small"}
                                    >
                                        <AddBoxOutlinedIcon fontSize={"small"}/>&nbsp;Add State Updater
                                    </Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Paper>
                    <div className={classes.content}>
                        <table className={classes.tableContent}>
                            <tbody>
                            <tr>
                                <td valign={"top"} className={classes.tdList}>
                                    <Paper className={classes.paperList}>
                                        <Paper className={classes.paperHeader}>
                                            <Button
                                                size={"small"}
                                                variant={"outlined"}
                                                onClick={this.handleAddActionClick}
                                            >
                                                <AddBoxOutlinedIcon fontSize={"small"}/>&nbsp;Add
                                            </Button>&nbsp;&nbsp;
                                            <Button
                                                size={"small"}
                                                variant={"outlined"}
                                                onClick={this.handleDeleteActionClick}
                                            >
                                                <IndeterminateCheckBoxOutlinedIcon fontSize={"small"}/>&nbsp;Delete
                                            </Button>
                                        </Paper>
                                        <List className={classes.actionList}>
                                            {this.props.actions.map((action, i) => {
                                                return (
                                                    <ListItem
                                                        dense={true}
                                                        button key={i}
                                                        selected={!!actionSelected && action.name === actionSelected.name}
                                                        onClick={this.actionOnSelect(action)}
                                                    >
                                                        <ListItemText className={classes.itemText} primary={action.name}/>
                                                    </ListItem>
                                                )
                                            })}
                                        </List>
                                    </Paper>
                                </td>
                                <td valign={"top"}>
                                    <div className={classes.codeEditorContainer}>
                                        {!!this.state.actionSelected &&
                                        <Paper className={classes.paperContent}>
                                            <Paper className={classes.paperCodeEditorHeader}>
                                                <table className={classes.tableHeader}>
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <Typography variant={"subtitle1"}>Code Block</Typography>
                                                        </td>
                                                        <td align={"right"}>
                                                            <Button
                                                                size={"small"}
                                                                variant={"contained"}
                                                                color={"primary"}
                                                                onClick={this.handleCodeSaveButtonClick}
                                                                disabled={!editing}
                                                            >
                                                                <SaveIcon/>&nbsp;Save
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </Paper>
                                            <AceEditor
                                                mode="javascript"
                                                theme="tomorrow"
                                                fontSize={14}
                                                value={codeValue}
                                                onChange={this.handleCodeChange}
                                                showPrintMargin={true}
                                                showGutter={true}
                                                highlightActiveLine={true}
                                                style={{width: '100%', flexGrow: 1}}
                                                setOptions={{
                                                    showLineNumbers: true,
                                                    tabSize: 4,
                                                }}
                                            />
                                        </Paper>
                                        }
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </Dialog>

                <DialogForm
                    open={this.state.addActionDialogOpen}
                    onClose={this.handleAddActionDialogClose}
                    title={"New Action"}
                    submitButtonTitle={"Add"}
                    forms={AddActionDef}
                    onSubmit={this.handleAddActionSubmit}
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
        actionsDialogClose: () => dispatch(actions.actionsDialogClose()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ActionsDialog));
