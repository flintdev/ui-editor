// src/containers/Toolbar/SettingsDialog/SettingsDialog.tsx

import * as React from 'react';
import {createStyles, WithStyles, withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {StoreState, ToolbarState} from "../../../redux/state";
import * as actions from "../../../redux/modules/toolbar/actions";
import Dialog from "@material-ui/core/Dialog";
import {AdditionalLibrary, PageDependency, SettingsData} from "../../../interface";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {SETTING_ITEMS, SettingItem} from "../../../constants";
import {ListItemText} from "@material-ui/core";
import DependencyPane from "./DependencyPane";
import LibraryPane from "./LibraryPane/LibraryPane";

const styles = createStyles({
    root: {},
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
    dialogContent: {
        backgroundColor: '#f5f5f5',
    },
    content: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    closeButton: {
        marginLeft: 20,
    },
    tdMenu: {
        width: 240
    },
    menuPaper: {
        minHeight: 500,
        padding: 10,
    },
});

export interface Props extends WithStyles<typeof styles>, ToolbarState {
    settings: SettingsData,
    settingsOnUpdate: (settings: SettingsData) => void,
    settingsDialogClose: () => void,
}

interface State {
    settingItemSelected: SettingItem,
}

class SettingsDialog extends React.Component<Props, object> {
    state: State = {
        settingItemSelected: SettingItem.Dependencies,
    };

    componentDidMount(): void {

    }

    onEnter = () => {

    };

    handleMenuItemSelect = (name: SettingItem) => () => {
        this.setState({settingItemSelected: name});
    };

    handleDependenciesChange = (dependencies: PageDependency[]) => {
        const {settings} = this.props;
        this.props.settingsOnUpdate({...settings, dependencies});
    };

    handleLibrariesChange = (libraries: AdditionalLibrary[]) => {
        const {settings} = this.props;
        this.props.settingsOnUpdate({...settings, libraries});
    };

    render() {
        const {classes, settingsDialog, settings} = this.props;
        const {settingItemSelected} = this.state;
        const {open} = settingsDialog;
        return (
            <div className={classes.root}>
                <Dialog
                    open={open}
                    onClose={this.props.settingsDialogClose}
                    onEnter={this.onEnter}
                    maxWidth={"lg"}
                    fullWidth={true}
                    disableEnforceFocus={true}
                >
                    <div className={classes.dialogContent}>

                        <Paper className={classes.paperHeader}>
                            <table className={classes.tableHeader}>
                                <tbody>
                                <tr>
                                    <td>
                                        <Typography variant={"subtitle1"}>SETTINGS</Typography>
                                    </td>
                                    <td align={"right"}>
                                        <IconButton size={"small"} className={classes.closeButton}
                                                    onClick={this.props.settingsDialogClose}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </Paper>
                        <div className={classes.content}>
                            <table className={classes.tableHeader}>
                                <tbody>
                                <tr>
                                    <td className={classes.tdMenu} valign={"top"}>
                                        <Paper className={classes.menuPaper}>
                                            <List>
                                                {SETTING_ITEMS.map((item, i) => {
                                                    return (
                                                        <ListItem
                                                            button={true}
                                                            key={i}
                                                            selected={settingItemSelected === item.name}
                                                            onClick={this.handleMenuItemSelect(item.name)}
                                                        >
                                                            <ListItemText primary={item.name}/>
                                                        </ListItem>
                                                    )
                                                })}
                                            </List>
                                        </Paper>
                                    </td>
                                    <td valign={"top"}>
                                        <div className={classes.content}>
                                            {settingItemSelected === SettingItem.Dependencies &&
                                            <DependencyPane
                                                dependencies={!!settings.dependencies ? settings.dependencies : []}
                                                onChange={this.handleDependenciesChange}
                                            />
                                            }
                                            {settingItemSelected === SettingItem.Libraries &&
                                            <LibraryPane
                                                libraries={!!settings.libraries ? settings.libraries : []}
                                                onChange={this.handleLibrariesChange}
                                            />
                                            }
                                            {settingItemSelected === SettingItem.LocalStorage && <div/>}
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
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
        settingsDialogClose: () => dispatch(actions.settingsDialogClose()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SettingsDialog));
