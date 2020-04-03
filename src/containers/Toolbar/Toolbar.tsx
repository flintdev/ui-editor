// src/containers/Toolbar/Toolbar.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import {Mode, StoreState, ToolbarState} from "../../redux/state";
import * as actions from "../../redux/modules/toolbar/actions";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import AlbumOutlinedIcon from '@material-ui/icons/AlbumOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import SaveIcon from '@material-ui/icons/Save';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

const styles = createStyles({
    root: {
        
    },
    paper: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        paddingLeft: 5,
        margin: 0,
        borderRadius: 0,
    },
    table: {
        width: '100%'
    },
    actionButton: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
    },
    actionButtonBordered: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        border: '1px grey solid',
    },
    saveButton: {
        marginLeft: 10,
        marginRight: 10,
    },
    modePaper: {
        marginLeft: 10,
        marginRight: 10,
        display: 'inline-block',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 2,
        marginBottom: 2,
    }
});

export interface Props extends WithStyles<typeof styles>, ToolbarState {
    addComponentOnClick: () => void;
    saveOnClick: () => void;
    stateDialogOpen: () => void,
    actionsDialogOpen: () => void,
    settingsDialogOpen: () => void,
    setMode: (mode: Mode) => void,
}

class Toolbar extends React.Component<Props, object> {
    state = {

    };

    componentDidMount(): void {

    }

    handleInsertButtonClick = () => {
        this.props.addComponentOnClick();
    };

    handleSaveButtonClick = () => {
        this.props.saveOnClick();
    };

    handleModeSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) this.props.setMode("preview");
        else this.props.setMode("editor");
    };

    render() {
        const {classes, mode} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <table className={classes.table}>
                        <tbody>
                        <tr>
                            <td>
                                <Button
                                    variant={"contained"}
                                    className={classes.actionButton}
                                    onClick={this.handleInsertButtonClick}
                                >
                                    <AddIcon/>&nbsp;Insert
                                </Button>
                                <Button
                                    variant={"contained"}
                                    className={classes.actionButton}
                                >
                                    <ZoomInIcon/>&nbsp;&nbsp;100%&nbsp;&nbsp;<ZoomOutIcon/>
                                </Button>
                                <Paper className={classes.modePaper}>
                                    <FormControlLabel
                                        value="mode"
                                        control={
                                            <Switch
                                                color="primary"
                                                checked={mode === 'preview'}
                                                onChange={this.handleModeSwitchChange}
                                            />
                                        }
                                        label="Preview"
                                        labelPlacement="start"
                                    />
                                </Paper>
                            </td>
                            <td align={"right"}>
                                <Button
                                    variant={"contained"}
                                    className={classes.actionButtonBordered}
                                    onClick={this.props.stateDialogOpen}
                                >
                                    <AlbumOutlinedIcon/>&nbsp;&nbsp;State
                                </Button>
                                <Button
                                    variant={"contained"}
                                    className={classes.actionButtonBordered}
                                    onClick={this.props.actionsDialogOpen}
                                >
                                    <BuildOutlinedIcon/>&nbsp;&nbsp;Actions
                                </Button>
                                <Button
                                    variant={"contained"}
                                    className={classes.actionButtonBordered}
                                    onClick={this.props.settingsDialogOpen}
                                >
                                    <SettingsOutlinedIcon/>&nbsp;&nbsp;Settings
                                </Button>
                                <Button
                                    variant={"contained"}
                                    className={classes.saveButton}
                                    color={"primary"}
                                    onClick={this.handleSaveButtonClick}
                                >
                                    <SaveIcon/>&nbsp;&nbsp;Save
                                </Button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.toolbar;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ToolbarAction>) => {
    return {
        stateDialogOpen: () => dispatch(actions.stateDialogOpen()),
        actionsDialogOpen: () => dispatch(actions.actionsDialogOpen()),
        settingsDialogOpen: () => dispatch(actions.settingsDialogOpen()),
        setMode: (mode: Mode) => dispatch(actions.setMode(mode)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Toolbar));
