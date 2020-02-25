// src/UIEditor/UIEditor.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import {store} from "../redux/store";
import Toolbar from "../containers/Toolbar";

const styles = createStyles({
    root: {
        height: '100%'
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
            <Provider store={store}>
                <div className={classes.root}>
                    <Toolbar/>
                </div>
            </Provider>
        )
    }
}

export default withStyles(styles)(UIEditor);
