// example/ExampleContainer.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import UIEditor from "../src/UIEditor";
import {actionsExample} from "./data/actions";
import {ActionData, StateUpdaterData} from '../src/interface';
import {ActionOperationType} from "../src/constants";

const styles = createStyles({
    root: {
        height: '100%'
    },
});

export interface Props extends WithStyles<typeof styles>{

}

interface State {
    actions: ActionData[],
}

class ExampleContainer extends React.Component<Props, object> {
    state: State = {
        actions: actionsExample
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

    handleInitialStateChange = (value: object) => {

    };

    handleStateUpdatersOnUpdate = (type: string, data: StateUpdaterData) => {

    };

    render() {
        const {classes} = this.props;
        console.log('rendered');
        return (
            <div className={classes.root}>
                <UIEditor
                    initialState={{}}
                    stateUpdaters={[]}
                    initialStateOnChange={this.handleInitialStateChange}
                    stateUpdaterOnUpdate={this.handleStateUpdatersOnUpdate}
                    actions={actionsExample}
                    actionOnUpdate={this.handleActionUpdate}
                />
            </div>
        )
    }
}

export default withStyles(styles)(ExampleContainer);
