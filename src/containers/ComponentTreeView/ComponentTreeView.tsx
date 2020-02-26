// src/containers/ComponentTreeView/ComponentTreeView.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { StoreState } from "src/redux/state";
import * as actions from "src/redux/modules/components/actions";
import {ComponentTreeNode} from "../../interface";
import Paper from "@material-ui/core/Paper";

const styles = createStyles({
    root: {
        height: '100%'
    },
    paper: {
        height: '100%',
        borderRadius: 0,
    },
});

export interface Props extends WithStyles<typeof styles>{
    setTreeData: (treeData: ComponentTreeNode[]) => void,
    selectComponent: (value: ComponentTreeNode) => void,
}

class ComponentTreeView extends React.Component<Props, object> {
    state = {

    };

    componentDidMount(): void {

    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>

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
        setTreeData: (treeData: ComponentTreeNode[]) => dispatch(actions.setTreeData(treeData)),
        selectComponent: (value: ComponentTreeNode) => dispatch(actions.selectComponent(value)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ComponentTreeView));
