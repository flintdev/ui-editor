// src/containers/Toolbar/ActionsDialog/ActionsDialog.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {StoreState, ToolbarState} from "src/redux/state";
import * as actions from "src/redux/modules/toolbar/actions";
import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import {ActionData} from "../../../interface";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import SaveIcon from '@material-ui/icons/Save';
import {edit} from "ace-builds";

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
        overflow: 'scroll'
    },
    paperContent: {
        weight: '100%',
        height: '100%',
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
    },
    codeEditorContainer: {
        marginLeft: 20,
        height: '100%',
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
}

class ActionsDialog extends React.Component<Props, object> {
    state: State = {
        actionSelected: undefined,
        codeValue: '',
        editing: false,
    };

    componentDidMount(): void {

    }

    onEnter = () => {

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
                                        <List>
                                            {this.props.actions.map((action, i) => {
                                                return (
                                                    <ListItem
                                                        button key={i}
                                                        selected={!!actionSelected && action.name === actionSelected.name}
                                                        onClick={this.actionOnSelect(action)}
                                                    >
                                                        <ListItemText primary={action.name}/>
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
                                                theme="tomorrow_night"
                                                fontSize={14}
                                                value={codeValue}
                                                onChange={this.handleCodeChange}
                                                showPrintMargin={true}
                                                showGutter={true}
                                                highlightActiveLine={true}
                                                style={{width: '100%', height: '100%'}}
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
                    <DialogActions>
                        <Button onClick={this.props.actionsDialogClose}>Close</Button>
                    </DialogActions>
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
        actionsDialogClose: () => dispatch(actions.actionsDialogClose()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ActionsDialog));
