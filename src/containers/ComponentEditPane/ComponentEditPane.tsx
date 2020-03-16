// src/containers/ComponentEditPane/ComponentEditPane.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
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
import {Event, EventAction} from "./interface";
import DisplayPane from "./DisplayPane";
import {DisplayInfo} from "./DisplayPane/interface";

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
    display: DisplayInfo
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
            const eventActions = componentSelected.events;
            const configJson = this.props.handler.getWidgetConfig(name);
            let {params, events} = configJson;
            events = !!events ? events : [];
            display = !!display ? display : {type: 'always'};
            console.log('display', display);
            this.setState({params, values, events, eventActions, display});
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

    handleSaveClick = () => {
        const {values, eventActions, display} = this.state;
        const {components, componentSelected} = this.props;
        if (!componentSelected || !componentSelected.path) return;
        const newComponents = this.treeDataHelper.updateComponentData(values, eventActions, display, componentSelected.path, components);
        this.props.componentsOnUpdate([...newComponents]);
        this.setState({editing: false});
    };

    render() {
        const {classes, componentSelected} = this.props;
        const {params, values, events, eventActions, display, editing} = this.state;
        if (!componentSelected) return <div/>;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <div className={classes.headerContainer}>
                        <table className={classes.headerTable}>
                            <tbody>
                            <tr>
                                <td>
                                    <Typography variant={"overline"} className={classes.headerText}>{componentSelected.name}</Typography>
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
                    </div>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.components;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ComponentsAction>) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ComponentEditPane));
