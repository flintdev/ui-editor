// src/containers/ComponentEditPane/ComponentEditPane.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { StoreState } from "src/redux/state";
import * as actions from "src/redux/modules/components/actions";
import {ComponentState} from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = createStyles({
    root: {
        height: '100%'
    },
    paper: {
        height: '100%',
        borderRadius: 0,
        display: 'flex',
        flexFlow: 'column',
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
});

export interface Props extends WithStyles<typeof styles>, ComponentState {
    handler: {
        getComponentConfig: (name: string) => any;
    }
}

class ComponentEditPane extends React.Component<Props, object> {
    state = {

    };

    componentDidMount(): void {

    }

    render() {
        const {classes, componentSelected} = this.props;
        if (!componentSelected) return <div/>;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <div className={classes.headerContainer}>
                        <Typography variant={"subtitle2"} className={classes.headerText}>{componentSelected.name}</Typography>
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

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ComponentEditPane));
