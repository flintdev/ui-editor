//

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';

const styles = createStyles({
    root: {

    },
});

export interface Props extends WithStyles<typeof styles>{

}

class UIEditor extends React.Component<Props, object> {
    state = {

    };

    componentDidMount(): void {

    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

            </div>
        )
    }
}

export default withStyles(styles)(UIEditor);
