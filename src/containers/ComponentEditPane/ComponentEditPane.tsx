// src/containers/ComponentEditPane/ComponentEditPane.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {ComponentsState, StoreState} from "../../redux/state";
import * as actions from "../../redux/modules/components/actions";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Param} from "../../components/ParamFormGenerator/interface";
import ParamFormGenerator from "../../components/ParamFormGenerator/ParamFormGenerator";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import {ActionData, ComponentData} from "../../interface";
import {TreeDataHelper} from "../../controllers/treeDataHelper";
import EventsPane from "./EventsPane/EventsPane";
import {Event, EventAction, RepeatInfo} from "./interface";
import DisplayPane from "./DisplayPane";
import {DisplayInfo} from "./DisplayPane/interface";
import RepeatPane from "./RepeatPane/RepeatPane";
import {HotKeys} from "react-hotkeys";

const styles = createStyles({
    root: {
        height: '100%',
        overflow: 'auto',
    },
    paper: {
        height: '100%',
        borderRadius: 0,
        display: 'flex',
        flexFlow: 'column',
    },
    headerContainer: {
        borderBottom: '1px solid lightgrey',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    headerText: {
        color: 'grey',
        fontWeight: 'bold',
    },
    formsContainer: {
        marginLeft: 10,
        marginRight: 10,
        flexGrow: 1,
        overflow: 'scroll',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    headerTable: {
        width: "100%"
    },
});

export interface Props extends WithStyles<typeof styles>, ComponentsState {
    components: ComponentData[],
    componentsOnUpdate: (components: ComponentData[]) => void,
    actions: ActionData[],
    handler: {
        getWidgetConfig: (name: string) => any;
    }
}

interface State {
    params: Param[],
    values: any,
    events: Event[],
    eventActions: EventAction[],
    editing: boolean,
    display: DisplayInfo,
    repeat?: RepeatInfo,
}

class ComponentEditPane extends React.Component<Props, object> {
    state: State = {
        params: [],
        values: {},
        events: [],
        eventActions: [],
        editing: false,
        display: {type: 'always'},
    };
    treeDataHelper = new TreeDataHelper();

    componentDidMount(): void {

    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<object>, snapshot?: any): void {
        if (prevProps.componentSelected !== this.props.componentSelected) {
            const {componentSelected} = this.props;
            if (!componentSelected) return;
            const name = componentSelected.name;
            const values = componentSelected.params;
            let display = componentSelected.display;
            const repeat = componentSelected.repeat;
            const eventActions = componentSelected.events;
            const configJson = this.props.handler.getWidgetConfig(name);
            let {params, events} = configJson;
            events = !!events ? events : [];
            display = !!display ? display : {type: 'always'};
            this.setState({params, values, events, eventActions, display, repeat});
        }
    }

    handleValuesChange = (values: any, init?: boolean) => {
        this.setState({values});
        if (!init && !this.state.editing) this.setState({editing: true});
    };

    handleEventActionChange = (eventActions: EventAction[]) => {
        this.setState({eventActions});
        if (!this.state.editing) this.setState({editing: true});
    };

    handleDisplayChange = (display: DisplayInfo) => {
        this.setState({display});
        if (!this.state.editing) this.setState({editing: true});
    };

    handleRepeatChange = (repeat?: RepeatInfo) => {
        this.setState({repeat});
        if (!this.state.editing) this.setState({editing: true});
    };

    handleSaveClick = () => {
        const {values, eventActions, display, repeat} = this.state;
        const {components, componentSelected} = this.props;
        if (!componentSelected || !componentSelected.path) return;
        const newComponents = this.treeDataHelper.updateComponentData(values, eventActions, display, repeat, componentSelected.path, components);
        this.props.componentsOnUpdate([...newComponents]);
        this.setState({editing: false});
    };

    render() {
        const {classes, componentSelected} = this.props;
        const {params, values, events, eventActions, display, repeat, editing} = this.state;
        if (!componentSelected) return <div/>;
        return (
            <div className={classes.root}>
                <HotKeys
                    keyMap={{SAVE: "command+s"}}
                    handlers={{
                        SAVE: this.handleSaveClick
                    }}
                    style={{height: '100%'}}
                >
                    <Paper className={classes.paper}>
                        <div className={classes.headerContainer}>
                            <table className={classes.headerTable}>
                                <tbody>
                                <tr>
                                    <td>
                                        <Typography
                                            variant={"overline"}
                                            className={classes.headerText}
                                        >
                                            {componentSelected.name}
                                        </Typography>
                                    </td>
                                    <td align={"right"}>
                                        <Button
                                            variant={"contained"}
                                            size={"small"}
                                            color={"primary"}
                                            onClick={this.handleSaveClick}
                                            disabled={!editing}
                                        >
                                            <SaveIcon fontSize={"small"}/>&nbsp; Save
                                        </Button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={classes.formsContainer}>
                            <DisplayPane
                                displayInfo={display}
                                onChange={this.handleDisplayChange}
                            />
                            <ParamFormGenerator
                                params={params}
                                values={values}
                                onChange={this.handleValuesChange}
                            />
                            <EventsPane
                                actions={this.props.actions}
                                events={events}
                                eventActions={eventActions}
                                onChange={this.handleEventActionChange}
                            />
                            <RepeatPane
                                repeatInfo={repeat}
                                onChange={this.handleRepeatChange}
                            />
                        </div>
                    </Paper>
                </HotKeys>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ComponentEditPane));
