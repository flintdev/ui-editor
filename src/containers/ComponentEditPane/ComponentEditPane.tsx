// src/containers/ComponentEditPane/ComponentEditPane.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import {ComponentsState, StoreState} from "src/redux/state";
import * as actions from "src/redux/modules/components/actions";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Param} from "../../components/ParamFormGenerator/interface";
import ParamFormGenerator from "../../components/ParamFormGenerator/ParamFormGenerator";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import {ComponentData} from "../../interface";
import {TreeDataHelper} from "../../controllers/treeDataHelper";

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
    headerTable: {
        width: "100%"
    },
});

export interface Props extends WithStyles<typeof styles>, ComponentsState {
    components: ComponentData[],
    componentsOnUpdate: (components: ComponentData[]) => void,
    handler: {
        getWidgetConfig: (name: string) => any;
    }
}

interface State {
    params: Param[],
    values: any,
    editing: boolean,
}

class ComponentEditPane extends React.Component<Props, object> {
    state: State = {
        params: [],
        values: {},
        editing: false,
    };
    treeDataHelper = new TreeDataHelper();
    componentDidMount(): void {

    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<object>, snapshot?: any): void {
        if (prevProps.componentSelected !== this.props.componentSelected) {
            const {componentSelected} = this.props;
            if (!componentSelected) return;
            const name = componentSelected.name;
            const values = componentSelected.params;
            const configJson = this.props.handler.getWidgetConfig(name);
            const {params, events} = configJson;
            this.setState({params, values});
        }
    }

    handleValuesChange = (values: any, init?: boolean) => {
        this.setState({values});
        if (!init && !this.state.editing) this.setState({editing: true});
    };

    handleSaveClick = () => {
        const {values} = this.state;
        const {components, componentSelected} = this.props;
        if (!componentSelected || !componentSelected.path) return;
        const newComponents = this.treeDataHelper.updateComponentParams(values, componentSelected.path, components);
        this.props.componentsOnUpdate(newComponents);
        this.setState({editing: false});
    };

    render() {
        const {classes, componentSelected} = this.props;
        const {params, values, editing} = this.state;
        if (!componentSelected) return <div/>;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <div className={classes.headerContainer}>
                        <table className={classes.headerTable}>
                            <tbody>
                            <tr>
                                <td>
                                    <Typography variant={"subtitle2"} className={classes.headerText}>{componentSelected.name}</Typography>
                                </td>
                                <td align={"right"}>
                                    <Button
                                        variant={"contained"}
                                        size={"small"}
                                        color={"primary"}
                                        onClick={this.handleSaveClick}
                                        disabled={!editing}
                                    >
                                        <SaveIcon fontSize={"small"}/>&nbsp; Save
                                    </Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
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
