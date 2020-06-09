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
import SaveIcon from '@material-ui/icons/Save';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import {GlobalHotKeys, HotKeys} from 'react-hotkeys';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {CanvasWidthOptions, CanvasWidth} from "../../constants";
import WidgetPicker from "./WidgetPicker";

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
    operations: any,
    saveOnClick: () => void;
    stateActionsDialogOpen: () => void,
    settingsDialogOpen: () => void,
    setMode: (mode: Mode) => void,
    setCanvasWidth: (value: number) => void,
    openWidgetPicker: (anchorEl: Element) => void,
    plugins: any[],
    handler: {
        getWidgetConfig: (name: string) => any,
        getWidget: (name: string, props: any) => any,
        getWidgetInfo: (pluginId: string) => any,
    }
}

class Toolbar extends React.Component<Props, object> {
    state: any = {
        canvasWidthMenuAnchorEl: undefined,
    };

    componentDidMount(): void {

    }

    handleSaveButtonClick = () => {
        this.props.saveOnClick();
    };

    handleModeSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) this.props.setMode("preview");
        else this.props.setMode("editor");
    };

    handleSelectCanvasWidthClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({canvasWidthMenuAnchorEl: event.currentTarget});
    };

    handleCanvasWidthMenuClose = () => {
        this.setState({canvasWidthMenuAnchorEl: undefined});
    };

    handleCanvasWidthMenuItemClick = (value: number) => () => {
        this.props.setCanvasWidth(value);
        this.handleCanvasWidthMenuClose();
    };

    handleAddComponentClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.openWidgetPicker(event.currentTarget);
    };

    render() {
        const {classes, mode, canvasWidth} = this.props;
        const {canvasWidthMenuAnchorEl} = this.state;
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
                                    onClick={this.handleAddComponentClick}
                                >
                                    <AddIcon/>&nbsp;Insert
                                </Button>
                                <Button
                                    variant={"contained"}
                                    className={classes.actionButton}
                                >
                                    <ZoomInIcon/>&nbsp;&nbsp;100%&nbsp;&nbsp;<ZoomOutIcon/>
                                </Button>
                                <Button
                                    variant={"contained"}
                                    className={classes.actionButton}
                                    onClick={this.handleSelectCanvasWidthClick}
                                >
                                    <AspectRatioIcon/>&nbsp;&nbsp;{`${CanvasWidth[canvasWidth].name} (${canvasWidth}px)`}
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
                                    onClick={this.props.stateActionsDialogOpen}
                                >
                                    <AlbumOutlinedIcon/>&nbsp;&nbsp;State & Actions
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

                <GlobalHotKeys
                    keyMap={{
                        SAVE: "command+s",
                    }}
                    handlers={{
                        SAVE: this.handleSaveButtonClick,
                    }}
                />

                <Menu
                    id="simple-menu"
                    anchorEl={canvasWidthMenuAnchorEl}
                    keepMounted
                    open={Boolean(canvasWidthMenuAnchorEl)}
                    onClose={this.handleCanvasWidthMenuClose}
                >
                    {CanvasWidthOptions.map((width, i) => {
                        return (
                            <MenuItem onClick={this.handleCanvasWidthMenuItemClick(width)} key={i}>{`${CanvasWidth[width].name} (${width}px)`}</MenuItem>
                        )
                    })}
                </Menu>

                <WidgetPicker
                    operations={this.props.operations}
                    plugins={this.props.plugins}
                    handler={this.props.handler}
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
        stateActionsDialogOpen: () => dispatch(actions.stateActionsDialogOpen()),
        settingsDialogOpen: () => dispatch(actions.settingsDialogOpen()),
        setMode: (mode: Mode) => dispatch(actions.setMode(mode)),
        setCanvasWidth: (value: number) => dispatch((actions.setCanvasWidth(value))),
        openWidgetPicker: (anchorEl: Element) => dispatch(actions.openWidgetPicker(anchorEl)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Toolbar));
