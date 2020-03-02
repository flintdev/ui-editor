// src/containers/Toolbar/StateDialog/StateUpdatersView/StateUpdatersView.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import {StoreState, ToolbarState} from "src/redux/state";
import * as actions from "src/redux/modules/toolbar/actions";
import {StateUpdaterData} from "../../../../interface";

const styles = createStyles({
    root: {

    },
});

export interface Props extends WithStyles<typeof styles>, ToolbarState {
    stateUpdaters: StateUpdaterData[],
    stateUpdaterOnUpdate: (type: string, data: StateUpdaterData) => void,
}

class StateUpdatersView extends React.Component<Props, object> {
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

const mapStateToProps = (state: StoreState) => {
    return state.toolbar;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ToolbarAction>) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StateUpdatersView));
