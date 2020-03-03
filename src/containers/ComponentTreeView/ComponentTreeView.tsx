// src/containers/ComponentTreeView/ComponentTreeView.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { StoreState } from "src/redux/state";
import * as actions from "src/redux/modules/components/actions";
import {ComponentData} from "../../interface";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import {ComponentState} from "react";

const styles = createStyles({
    root: {
        height: '100%'
    },
    paper: {
        height: '100%',
        borderRadius: 0,
    },
    headerContainer: {
        borderBottom: '1px solid lightgrey',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    headerText: {
        color: 'grey',
        fontWeight: 'bold',
    },
    treeContainer: {
        padding: 5
    }
});

export interface Props extends WithStyles<typeof styles>, ComponentState {
    components: ComponentData[],
    componentsOnUpdate: (components: ComponentData[]) => void,
    componentOnSelect: (componentData: ComponentData) => void,
    setTreeData: (treeData: ComponentData[]) => void,
    selectComponent: (value: ComponentData) => void,
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
                    <div className={classes.headerContainer}>
                        <Typography variant={"subtitle2"} className={classes.headerText}>COMPONENTS</Typography>
                    </div>
                    <div className={classes.treeContainer}>

                    </div>
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
        setTreeData: (treeData: ComponentData[]) => dispatch(actions.setTreeData(treeData)),
        selectComponent: (value: ComponentData) => dispatch(actions.selectComponent(value)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ComponentTreeView));
