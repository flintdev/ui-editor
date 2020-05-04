// src/containers/Toolbar/WidgetPicker/WidgetPicker.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import {StoreState, ToolbarState} from "../../../redux/state";
import * as actions from "../../../redux/modules/toolbar/actions";
import Draggable from 'react-draggable';
import Paper from "@material-ui/core/Paper";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {WidgetManager} from "../../../controllers/widgetManager";
import {WidgetDndWrapper} from "@flintdev/ui-editor-canvas/dist";
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';

const styles = createStyles({
    root: {

    },
    draggableContainer: {
        position: 'absolute',
        display: 'inline-block',
        width: 340,
    },
    panel: {
        border: '2px solid grey',
    },
    panelSummary: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        cursor: 'move',
    },
    panelDetails: {
        overflow: "auto",
        maxHeight: window.innerHeight * 0.5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10
    },
    list: {
        overflow: "auto",
        width: '100%',
    },
    listItem: {
        paddingTop: 2,
        paddingBottom: 2,
    },
    selectForm: {
        width: 220,
    },
    table: {
        width: '100%',
        border: 0,
        cellSpacing: 0,
        cellPadding: 0,
        borderSpacing: 0,
        borderCollapse: 'collapse',
    },
    tdIconButton: {
        width: 20,
    },
    tdSelect: {
        paddingRight: 10,
    }
});

export interface Props extends WithStyles<typeof styles>, ToolbarState {
    operations: any,
    plugins: any[],
    handler: {
        getWidgetConfig: (name: string) => any,
        getWidget: (name: string, props: any) => any,
        getWidgetInfo: (pluginId: string) => any,
    },
    closeWidgetPicker: () => void,
}

interface State {
    widgetList: any[],
    expanded: boolean,
    pluginIdSelected: string,
}

class WidgetPicker extends React.Component<Props, object> {
    state: State = {
        widgetList: [],
        expanded: true,
        pluginIdSelected: ''
    };
    widgetManager = new WidgetManager(
        this.props.handler.getWidgetConfig,
        this.props.handler.getWidget,
        this.props.handler.getWidgetInfo,
    )
    componentDidMount(): void {
        this.preselectPlugin();
    }

    preselectPlugin = () => {
        if (!this.props.plugins || this.props.plugins.length === 0) return;
        const pluginIdSelected = this.props.plugins[0].id;
        const widgetList = this.getWidgetList(pluginIdSelected);
        this.setState({pluginIdSelected, widgetList});
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<object>, snapshot?: any) {
        if (prevProps.plugins !== this.props.plugins) {
            this.preselectPlugin();
        }
    }

    toggleExpansionClick = () => {
        const expanded = !this.state.expanded;
        this.setState({expanded});
    };

    getWidgetList = (pluginId: string) => {
        return this.widgetManager.getWidgetList(pluginId);
    };

    getPosition = () => {
        const {widgetPickerAnchorEl} = this.props;
        if (!widgetPickerAnchorEl) return {x: 0, y: 0};
        const {x, y, height} = widgetPickerAnchorEl.getBoundingClientRect();
        return {x, y: y + height + 10};
    };

    handlePluginSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pluginIdSelected = event.target.value;
        const widgetList = this.getWidgetList(pluginIdSelected);
        this.setState({pluginIdSelected, widgetList});
    };

    render() {
        const {classes, widgetPickerAnchorEl} = this.props;
        const {widgetList, expanded, pluginIdSelected} = this.state;
        const {x, y} = this.getPosition();
        return (
            <div className={classes.root}>
                {!!widgetPickerAnchorEl &&
                <Draggable
                    handle={`.${classes.panelSummary}`}
                >
                    <div
                        className={classes.draggableContainer}
                        style={{
                            left: x,
                            top: y,
                        }}
                    >
                        <Paper
                            className={classes.panel}
                            elevation={4}
                        >
                            <div
                                className={classes.panelSummary}
                            >
                                <table className={classes.table}>
                                    <tbody>
                                    <tr>
                                        <td className={classes.tdSelect}>
                                            <TextField
                                                className={classes.selectForm}
                                                select
                                                size={"small"}
                                                value={pluginIdSelected}
                                                onChange={this.handlePluginSelectChange}
                                                label={"Component Library"}
                                                variant={"filled"}
                                            >
                                                {this.props.plugins.map((plugin, i) => {
                                                    return (
                                                        <MenuItem
                                                            key={i}
                                                            value={plugin.id}
                                                        >
                                                            {plugin.name}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </TextField>
                                        </td>
                                        <td align={"right"} className={classes.tdIconButton}>
                                            <IconButton size={"small"} onClick={this.toggleExpansionClick}>
                                                {expanded ? <ExpandMoreIcon/> : <ChevronRightIcon/>}
                                            </IconButton>
                                        </td>
                                        <td align={"right"} className={classes.tdIconButton}>
                                            <IconButton size={"small"} onClick={this.props.closeWidgetPicker}>
                                                <CloseIcon/>
                                            </IconButton>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            {expanded &&
                            <div className={classes.panelDetails}>
                                <List className={classes.list}>
                                    {widgetList.map((item: any, i) => {
                                        return (
                                            <WidgetDndWrapper
                                                key={i}
                                                operations={this.props.operations}
                                                getWidget={this.props.handler.getWidget}
                                                component={
                                                    <ListItem button className={classes.listItem}>
                                                        <ListItemText
                                                            primary={item.name.split('::')[1]}/>
                                                    </ListItem>
                                                }
                                                widgetData={item.data}
                                            />
                                        )
                                    })}
                                </List>
                            </div>
                            }
                        </Paper>
                    </div>
                </Draggable>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.toolbar;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ToolbarAction>) => {
    return {
        closeWidgetPicker: () => dispatch(actions.closeWidgetPicker()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WidgetPicker));
