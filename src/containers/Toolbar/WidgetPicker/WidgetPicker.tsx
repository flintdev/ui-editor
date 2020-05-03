// src/containers/Toolbar/WidgetPicker/WidgetPicker.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import {StoreState, ToolbarState} from "src/redux/state";
import * as actions from "src/redux/modules/toolbar/actions";
import Draggable from 'react-draggable';
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {WidgetManager} from "../../../controllers/widgetManager";
import {WidgetDndWrapper} from "@flintdev/ui-editor-canvas/dist";
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = createStyles({
    root: {

    },
    draggableContainer: {
        position: 'absolute',
        display: 'inline-block',
        width: 300,
    },
    panel: {
        border: '1px solid grey',
    },
    panelSummary: {
        cursor: 'pointer',
    },
    listItem: {
        paddingTop: 2,
        paddingBottom: 2,
    }
});

export interface Props extends WithStyles<typeof styles>, ToolbarState {
    operations: any,
    handler: {
        getWidgetConfig: (name: string) => any,
        getWidget: (name: string, props: any) => any,
        getWidgetInfo: (pluginId: string) => any,
    },
    closeWidgetPicker: () => void,
}

class WidgetPicker extends React.Component<Props, object> {
    state = {
        widgetList: [],

    };
    widgetManager = new WidgetManager(
        this.props.handler.getWidgetConfig,
        this.props.handler.getWidget,
        this.props.handler.getWidgetInfo,
    )
    componentDidMount(): void {
        this.setState({
            widgetList: this.getWidgetList('material-widgets'),
        });
    }

    getWidgetList = (pluginId: string) => {
        return this.widgetManager.getWidgetList(pluginId);
    };

    getPosition = () => {
        const {widgetPickerAnchorEl} = this.props;
        if (!widgetPickerAnchorEl) return {x: 0, y: 0};
        const {x, y, height} = widgetPickerAnchorEl.getBoundingClientRect();
        return {x, y: y + height + 10};
    };

    render() {
        const {classes, widgetPickerAnchorEl} = this.props;
        const {widgetList} = this.state;
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
                        <ExpansionPanel
                            className={classes.panel}
                            defaultExpanded={true}
                        >
                            <ExpansionPanelSummary
                                className={classes.panelSummary}
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <TextField
                                    select
                                    size={"small"}
                                    value={"material-widgets"}
                                    variant={"outlined"}
                                    label={"Component Library"}
                                >
                                    <MenuItem value={"material-widgets"}>{"Material Design Widgets"}</MenuItem>
                                </TextField>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <List>
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
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
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
