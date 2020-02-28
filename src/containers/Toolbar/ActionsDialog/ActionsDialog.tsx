// src/containers/Toolbar/ActionsDialog/ActionsDialog.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import {StoreState, ToolbarState} from "src/redux/state";
import * as actions from "src/redux/modules/toolbar/actions";
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
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

const styles = createStyles({
    root: {

    },
    dialogContent: {
        padding: -24,
    },
    paperHeader: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    tableHeader: {
        width: '100%'
    },
    content: {
        margin: 10,
        height: window.innerHeight - 300,
    },
    tableContent: {
        width: '100%',
        height: '100%'
    },
    tdList: {
        width: 240
    },
    paperContent: {
        weight: '100%',
        height: '100%',
        padding: 10
    },
});

export interface Props extends WithStyles<typeof styles>, ToolbarState {
    actions: ActionData[],
    actionOnUpdate: (type: string, data: ActionData) => void,
    actionsDialogClose: () => void,
}

interface State {
    actionSelected: ActionData | undefined,
}

class ActionsDialog extends React.Component<Props, object> {
    state: State = {
        actionSelected: undefined,
    };

    componentDidMount(): void {

    }

    onEnter = () => {

    };

    actionOnSelect = (action: ActionData) => () => {
        this.setState({
            actionSelected: action
        })
    };

    render() {
        const {classes, actionsDialog} = this.props;
        const {open} = actionsDialog;
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
                    <DialogContent className={classes.dialogContent}>
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
                                        <List>
                                            {this.props.actions.map((action, i) => {
                                                return (
                                                    <ListItem
                                                        button key={i}
                                                        selected={!!this.state.actionSelected && action.name === this.state.actionSelected.name}
                                                        onClick={this.actionOnSelect(action)}
                                                    >
                                                        <ListItemText primary={action.name}/>
                                                    </ListItem>
                                                )
                                            })}
                                        </List>
                                    </td>
                                    <td valign={"top"}>
                                        <Paper className={classes.paperContent}>

                                        </Paper>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </DialogContent>
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
