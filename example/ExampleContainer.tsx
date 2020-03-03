// example/ExampleContainer.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import UIEditor from "../src/UIEditor";
import {actionsExample} from "./data/actions";
import {ActionData, ComponentData, StateUpdaterData} from '../src/interface';
import {ActionOperationType, StateUpdaterOperationType} from "../src/constants";
import {stateUpdatersExample} from "./data/stateUpdaters";
import {componentsExample} from "./data/components";

const styles = createStyles({
    root: {
        height: '100%'
    },
});

export interface Props extends WithStyles<typeof styles>{

}

interface State {
    actions: ActionData[],
    stateUpdaters: StateUpdaterData[],
    initialState: string,
    components: ComponentData[],
}

class ExampleContainer extends React.Component<Props, object> {
    state: State = {
        actions: actionsExample,
        stateUpdaters: stateUpdatersExample,
        initialState: '',
        components: componentsExample,
    };

    componentDidMount(): void {

    }

    handleActionUpdate = (type: string, data: ActionData) => {
        let {actions} = this.state;
        if (type === ActionOperationType.Update) {
            const index = actions.findIndex(action => action.name === data.name);
            if (index > -1) {
                actions[index] = data;
                this.setState({actions});
            }
        } else if (type === ActionOperationType.Add) {
            actions.push(data);
            this.setState({actions});
        } else if (type === ActionOperationType.Delete) {
            const index = actions.findIndex(action => action.name === data.name);
            if (index > -1) {
                actions.splice(index, 1);
                this.setState({actions});
            }
        }
    };

    handleStateUpdatersOnUpdate = (type: string, data: StateUpdaterData) => {
        let {stateUpdaters} = this.state;
        if (type === StateUpdaterOperationType.Update) {
            const index = stateUpdaters.findIndex(updater => updater.name === data.name);
            if (index > -1) {
                stateUpdaters[index] = data;
                this.setState({stateUpdaters});
            }
        } else if (type === StateUpdaterOperationType.Add) {
            stateUpdaters.push(data);
            this.setState({stateUpdaters});
        } else if (type === StateUpdaterOperationType.Delete) {
            const index = stateUpdaters.findIndex(updater => updater.name === data.name);
            if (index > -1) {
                stateUpdaters.splice(index, 1);
                this.setState({stateUpdaters});
            }
        }
    };

    handleInitialStateChange = (value: string) => {
        this.setState({initialState: value});
    };

    handleComponentsOnUpdate = (components: ComponentData[]) => {

    };

    handleComponentOnSelect = (componentData: ComponentData) => {

    };

    render() {
        const {classes} = this.props;
        const {actions, stateUpdaters, initialState, components} = this.state;
        return (
            <div className={classes.root}>
                <UIEditor
                    initialState={initialState}
                    stateUpdaters={stateUpdaters}
                    initialStateOnChange={this.handleInitialStateChange}
                    stateUpdaterOnUpdate={this.handleStateUpdatersOnUpdate}
                    actions={actions}
                    actionOnUpdate={this.handleActionUpdate}
                    components={components}
                    componentsOnUpdate={this.handleComponentsOnUpdate}
                    componentOnSelect={this.handleComponentOnSelect}
                />
            </div>
        )
    }
}

export default withStyles(styles)(ExampleContainer);
