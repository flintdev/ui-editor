// example/ExampleContainer.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import UIEditor from "../src/UIEditor";
import {actionsExample} from "./data/actions";
import { ActionData } from '../src/interface';
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
            this.setState({
                actions: [...actions, data]
            })
        } else if (type === ActionOperationType.Delete) {
            const index = actions.findIndex(action => action.name === data.name);
            if (index > -1) {
                actions.splice(index, 1);
                this.setState({actions});
            }
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <UIEditor
                    actions={actionsExample}
                    actionOnUpdate={this.handleActionUpdate}
                />
            </div>
        )
    }
}

export default withStyles(styles)(ExampleContainer);
