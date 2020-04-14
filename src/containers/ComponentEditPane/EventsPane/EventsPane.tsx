// src/containers/ComponentEditPane/EventsPane/EventsPane.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {StoreState} from "../../../redux/state";
import * as actions from "../../../redux/modules/components/actions";
import {ActionData} from "../../../interface";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import {Event, EventAction} from "../interface";
import Alert from "@material-ui/lab/Alert";

const styles = createStyles({
    root: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: '1px solid #ddd',
    },
    eventText: {
        color: 'grey'
    },
    actionText: {
        color: '#444',
        textDecoration: 'underline'
    },
    itemContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    tableHeader: {
        width: '100%'
    },
    paperItem: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 2,
        marginRight: 2,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        border: "1px solid lightgrey"
    },
    itemButton: {
        marginLeft: 5
    },
    popoverContainer: {
        padding: 10,
        width: 300,
    },
    form: {
        marginBottom: 10,
    },
    alert: {
        marginTop: 10,
        marginBottom: 10,
    }
});

export interface Props extends WithStyles<typeof styles> {
    actions: ActionData[],
    events: Event[],
    eventActions: EventAction[],
    onChange: (eventActions: EventAction[]) => void,
}

interface State {
    anchorEl: HTMLButtonElement | undefined,
    eventSelected: string,
    actionSelected: string,
}

class EventsPane extends React.Component<Props, object> {
    state: State = {
        anchorEl: undefined,
        eventSelected: '',
        actionSelected: '',
    };

    componentDidMount(): void {

    }

    handleEventSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            eventSelected: event.target.value
        });
    };

    handleActionSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            actionSelected: event.target.value
        });
    };
    
    handleAddEventClick = () => {
        const {eventSelected, actionSelected} = this.state;
        const eventAction = {event: eventSelected, action: actionSelected};
        const eventActions = !!this.props.eventActions ? this.props.eventActions : [];
        this.props.onChange([...eventActions, eventAction]);
        this.handlePopoverClose();
    };

    handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handlePopoverClose = () => {
        this.setState({anchorEl: undefined});
    };

    handleEditEventClick = (index: number) => () => {

    };

    handleDeleteEventClick = (index: number) => () => {
        let eventActions = !!this.props.eventActions ? this.props.eventActions : [];
        eventActions.splice(index, 1);
        this.props.onChange([...eventActions]);
    };

    getSelectedEventData = () => {
        const {events} = this.props;
        const {eventSelected} = this.state;
        if (!eventSelected || eventSelected === "") return;
        let eventData;
        for (const event of events) {
            if (event.key === eventSelected) {
                eventData = event;
                break;
            }
        }
        return eventData;
    };

    render() {
        const {classes, actions, events, eventActions} = this.props;
        const {anchorEl, eventSelected, actionSelected} = this.state;
        if (!events || events.length === 0) return <div/>;
        const eventDataSelected = this.getSelectedEventData();
        return (
            <div className={classes.root}>
                <table className={classes.tableHeader}>
                    <tbody>
                    <tr>
                        <td>
                            <Typography variant={"overline"}>EVENTS</Typography>
                        </td>
                        <td align={"right"}>
                            <Button
                                size={"small"}
                                variant={"text"}
                                onClick={this.handlePopoverOpen}
                            >
                                <AddIcon/>
                            </Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className={classes.itemContainer}>
                    {!!eventActions && eventActions.map((item, i) => {
                        return (
                            <Paper className={classes.paperItem} key={i}>
                                <table className={classes.tableHeader}>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <Typography variant={"subtitle1"} className={classes.eventText}>{item.event}</Typography>
                                        </td>
                                        <td align={"right"}>
                                            <IconButton
                                                className={classes.itemButton}
                                                size={"small"}
                                                onClick={this.handleEditEventClick(i)}
                                            >
                                                <EditOutlinedIcon fontSize={"inherit"}/>
                                            </IconButton>
                                            <IconButton
                                                className={classes.itemButton}
                                                size={"small"}
                                                onClick={this.handleDeleteEventClick(i)}
                                            >
                                                <DeleteOutlineIcon fontSize={"inherit"}/>
                                            </IconButton>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <Typography variant={"body2"} className={classes.actionText}>{item.action}</Typography>
                            </Paper>
                        )
                    })}
                </div>

                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={this.handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <div className={classes.popoverContainer}>
                        <TextField
                            className={classes.form}
                            label={'Event'}
                            value={eventSelected}
                            onChange={this.handleEventSelect}
                            fullWidth
                            variant={"outlined"}
                            size={"small"}
                            select={true}
                        >
                            {events.map((event, i) => {
                                return (
                                    <MenuItem key={i} value={event.key}>{event.name}</MenuItem>
                                )
                            })}
                        </TextField>
                        <TextField
                            className={classes.form}
                            label={'Action'}
                            value={actionSelected}
                            onChange={this.handleActionSelect}
                            fullWidth
                            variant={"outlined"}
                            size={"small"}
                            select={true}
                        >
                            {actions.map((action, i) => {
                                return (
                                    <MenuItem key={i} value={action.name}>{action.name}</MenuItem>
                                )
                            })}
                        </TextField>
                        {!!eventDataSelected && !!eventDataSelected.args &&
                        <Alert severity={"info"} className={classes.alert} variant={"outlined"}>
                            <table>
                                <tbody>
                                {eventDataSelected.args.map((arg, i) => {
                                    const requiredStr = !!arg.required ? "required" : "optional";
                                    return (
                                        <tr key={i}>
                                            <td><b>{arg.name}</b>, </td>
                                            <td>{arg.type}, </td>
                                            <td>{requiredStr}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>

                        </Alert>
                        }
                        <Button
                            size={"small"}
                            variant={"contained"}
                            color={"primary"}
                            onClick={this.handleAddEventClick}
                        >
                            <AddIcon/>&nbsp;Add Event
                        </Button>
                    </div>
                </Popover>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.components;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ComponentsAction>) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventsPane));
