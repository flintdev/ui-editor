//

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { StoreState } from "src/redux/state";
import * as actions from "src/redux/modules/components/actions";
import {ComponentTreeNode} from "../../interface";

const styles = createStyles({
    root: {

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
