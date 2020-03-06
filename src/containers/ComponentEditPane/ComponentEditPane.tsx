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
import {Param} from "../../components/ParamFormGenerator/interface";
import ParamFormGenerator from "../../components/ParamFormGenerator/ParamFormGenerator";

const styles = createStyles({
    root: {
        height: '100%',
        overflow: 'scroll',
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
    formsContainer: {
        marginLeft: 10,
        marginRight: 10,
        flexGrow: 1,
        overflow: 'scroll',
    },
});

export interface Props extends WithStyles<typeof styles>, ComponentState {
    handler: {
        getComponentConfig: (name: string) => any;
    }
}

interface State {
    params: Param[],
    values: any,
}

class ComponentEditPane extends React.Component<Props, object> {
    state: State = {
        params: [],
        values: {},
    };

    componentDidMount(): void {

    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<object>, snapshot?: any): void {
        if (prevProps.componentSelected !== this.props.componentSelected) {
            const {componentSelected} = this.props;
            if (!componentSelected) return;
            const name = componentSelected.name;
            const values = componentSelected.params;
            const configJson = this.props.handler.getComponentConfig(name);
            const {params, events} = configJson;
            this.setState({params, values});
        }
    }

    handleValuesChange = (values: any) => {
        this.setState({values});
    };

    render() {
        const {classes, componentSelected} = this.props;
        const {params, values} = this.state;
        if (!componentSelected) return <div/>;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <div className={classes.headerContainer}>
                        <Typography variant={"subtitle2"} className={classes.headerText}>{componentSelected.name}</Typography>
                    </div>
                    <div className={classes.formsContainer}>
                        <ParamFormGenerator
                            params={params}
                            values={values}
                            onChange={this.handleValuesChange}
                        />
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
