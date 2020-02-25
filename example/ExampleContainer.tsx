// example/ExampleContainer.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import UIEditor from "../src/UIEditor";

const styles = createStyles({
    root: {

    },
});

export interface Props extends WithStyles<typeof styles>{

}

class ExampleContainer extends React.Component<Props, object> {
    state = {

    };

    componentDidMount(): void {

    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <UIEditor/>
            </div>
        )
    }
}

export default withStyles(styles)(ExampleContainer);
