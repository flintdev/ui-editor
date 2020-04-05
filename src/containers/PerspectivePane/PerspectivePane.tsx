// src/containers/PerspectivePane/PerspectivePane.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { StoreState } from "../../redux/state";
import * as actions from "../../redux/modules/components/actions";
import {PerspectiveData} from "../../interface";

const styles = createStyles({
    root: {

    },
});

export interface Props extends WithStyles<typeof styles>{
    perspectives: PerspectiveData[],
    perspectivesOnUpdate: (perspectives: PerspectiveData[]) => void,
}

interface State {
    perspectiveEditDialogOpen: boolean,
}

class PerspectivePane extends React.Component<Props, object> {
    state: State = {
        perspectiveEditDialogOpen: false,
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
    return state.components;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ComponentsAction>) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PerspectivePane));
