// src/UIEditor/UIEditor.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import {store} from "../redux/store";
import Toolbar from "../containers/Toolbar";
import ComponentTreeView from "../containers/ComponentTreeView";
import {ActionData, ComponentData, StateUpdaterData} from "../interface";
import ActionsDialog from "../containers/Toolbar/ActionsDialog";
import StateDialog from "../containers/Toolbar/StateDialog";
import ComponentEditPane from "../containers/ComponentEditPane/ComponentEditPane";

const styles = createStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: "column",
    },
    header: {
        zIndex: 1001,
    },
    content: {
        flexGrow: 1
    },
    table: {
        width: '100%',
        height: '100%',
        border: 0,
        cellSpacing: 0,
        cellPadding: 0,
        borderSpacing: 0,
        borderCollapse: 'collapse',
    },
    tdLeft: {
        width: 240,
        height: '100%'
    },
    tdMiddle: {
        height: '100%',
        flex: 1
    },
    tdRight: {
        width: 240,
        height: '100%',
    }
});

export interface Props extends WithStyles<typeof styles> {
    actions: ActionData[],
    actionOnUpdate: (type: string, data: ActionData) => void,
    initialState: string,
    stateUpdaters: StateUpdaterData[],
    initialStateOnChange: (value: string) => void,
    stateUpdaterOnUpdate: (type: string, data: StateUpdaterData) => void,
    components: ComponentData[],
    componentsOnUpdate: (components: ComponentData[]) => void,
    componentOnSelect: (componentData: ComponentData) => void,
    handler: {
        getComponentConfig: (name: string) => any;
    }
}


class UIEditor extends React.Component<Props, object> {
    state = {

    };

    componentDidMount(): void {

    }

    render() {
        const {classes} = this.props;
        return (
            <Provider store={store}>
                <div className={classes.root}>
                    <div className={classes.header}>
                        <Toolbar/>
                    </div>
                    <div className={classes.content}>
                        <table className={classes.table}>
                            <tbody>
                            <tr>
                                <td valign={"top"} className={classes.tdLeft}>
                                    <ComponentTreeView
                                        components={this.props.components}
                                        componentsOnUpdate={this.props.componentsOnUpdate}
                                        componentOnSelect={this.props.componentOnSelect}
                                    />
                                </td>
                                <td valign={"top"} className={classes.tdMiddle}>

                                </td>
                                <td valign={"top"} className={classes.tdRight}>
                                    <ComponentEditPane
                                        components={this.props.components}
                                        componentsOnUpdate={this.props.componentsOnUpdate}
                                        handler={this.props.handler}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <ActionsDialog
                        actions={this.props.actions}
                        actionOnUpdate={this.props.actionOnUpdate}
                    />

                    <StateDialog
                        initialState={this.props.initialState}
                        stateUpdaters={this.props.stateUpdaters}
                        initialStateOnChange={this.props.initialStateOnChange}
                        stateUpdaterOnUpdate={this.props.stateUpdaterOnUpdate}
                    />

                </div>
            </Provider>
        )
    }
}

export default withStyles(styles)(UIEditor);
