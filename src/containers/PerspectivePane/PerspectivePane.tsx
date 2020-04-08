// src/containers/PerspectivePane/PerspectivePane.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import {DialogMode, StoreState} from "../../redux/state";
import * as actions from "../../redux/modules/components/actions";
import {PerspectiveData} from "../../interface";
import PerspectiveEditDialog from "./PerspectiveEditDialog";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import {ComponentState} from "react";

const styles = createStyles({
    root: {
        backgroundColor: 'white'
    },
    headerContainer: {
        paddingTop: 2,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
    },
    table: {
        width: '100%',
    },
    headerText: {
        color: 'grey',
        fontWeight: 'bold',
    },
    listContainer: {
        overflow: 'auto'
    },
    list: {
        overflow: 'auto'
    },
    listItem: {
        paddingTop: 0,
        paddingBottom: 0,
    }
});

export interface Props extends WithStyles<typeof styles>, ComponentState {
    perspectives: PerspectiveData[],
    initialState: string,
    perspectivesOnUpdate: (perspectives: PerspectiveData[]) => void,
    perspectiveSelected: (perspectiveData: PerspectiveData) => void,
    perspectiveEditDialogOpen: (mode: DialogMode, perspectiveData?: PerspectiveData, index?: number) => void,
    selectPerspective: (perspectiveData: PerspectiveData) => void,
}

interface State {
    perspectiveEditDialogOpen: boolean,
}

enum DefaultPerspective {
    AllComponents = "All Components",
    InitialState = "Initial State",
}

class PerspectivePane extends React.Component<Props, object> {
    state: State = {
        perspectiveEditDialogOpen: false,
    };

    componentDidMount(): void {

    }

    handlePerspectiveOnCreate = (perspectiveData: PerspectiveData) => {
        const {perspectives} = this.props;
        this.props.perspectivesOnUpdate([...perspectives, perspectiveData]);
    };

    handlePerspectiveOnUpdate = (perspectiveData: PerspectiveData, index: number) => {
        let {perspectives} = this.props;
        perspectives[index] = perspectiveData;
        this.props.perspectivesOnUpdate([...perspectives]);
    };

    handlePerspectiveOnDelete = (index: number) => {
        let {perspectives} = this.props;
        perspectives.splice(index, 1);
        this.props.perspectivesOnUpdate([...perspectives]);
    };

    handleEditItemClick = (perspectiveData: PerspectiveData, index: number) => (event: React.MouseEvent) => {
        event.stopPropagation();
        this.props.perspectiveEditDialogOpen("edit", perspectiveData, index);
    };

    handleOpenCreateDialog = () => {
        this.props.perspectiveEditDialogOpen("create");
    };

    handleItemClick = (perspectiveData: PerspectiveData) => () => {
        this.props.selectPerspective(perspectiveData);
        this.props.perspectiveSelected(perspectiveData);
    };

    handleAllComponentsClick = () => {
        const perspectiveData: PerspectiveData = {name: DefaultPerspective.AllComponents, code: "{}"};
        this.handleItemClick(perspectiveData)();
    };

    handleInitialStateClick = () => {
        const perspectiveData: PerspectiveData = {
            name: DefaultPerspective.InitialState,
            code: this.props.initialState,
        };
        this.handleItemClick(perspectiveData)();
    };

    render() {
        const {classes, perspectives, perspectiveDataSelected} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.headerContainer}>
                    <table className={classes.table}>
                        <tbody>
                        <tr>
                            <td>
                                <Typography variant={"subtitle2"} className={classes.headerText}>PERSPECTIVES</Typography>
                            </td>
                            <td align={"right"}>
                                <IconButton size={"small"} onClick={this.handleOpenCreateDialog}>
                                    <AddIcon fontSize={"small"}/>
                                </IconButton>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className={classes.listContainer}>
                    <List dense={true} className={classes.list}>
                        <ListItem
                            className={classes.listItem}
                            button={true}
                            selected={perspectiveDataSelected?.name === DefaultPerspective.AllComponents}
                            onClick={this.handleAllComponentsClick}
                        >
                            <ListItemText primary={DefaultPerspective.AllComponents}/>
                        </ListItem>
                        <ListItem
                            className={classes.listItem}
                            button={true}
                            selected={perspectiveDataSelected?.name === DefaultPerspective.InitialState}
                            onClick={this.handleInitialStateClick}
                        >
                            <ListItemText primary={DefaultPerspective.InitialState}/>
                        </ListItem>
                        {!!perspectives && perspectives.map((item, i) => {
                            return (
                                <ListItem
                                    className={classes.listItem}
                                    key={i}
                                    button={true}
                                    selected={item === perspectiveDataSelected}
                                    onClick={this.handleItemClick(item)}
                                >
                                    <ListItemText primary={item.name}/>
                                    <IconButton size={"small"}>
                                        <EditIcon fontSize={"inherit"} onClick={this.handleEditItemClick(item, i)}/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
                <PerspectiveEditDialog
                    onCreate={this.handlePerspectiveOnCreate}
                    onUpdate={this.handlePerspectiveOnUpdate}
                    onDelete={this.handlePerspectiveOnDelete}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.components;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ComponentsAction>) => {
    return {
        perspectiveEditDialogOpen: (mode: DialogMode, perspectiveData?: PerspectiveData, index?: number) => dispatch(actions.perspectiveEditDialogOpen(mode, perspectiveData, index)),
        selectPerspective: (perspectiveData: PerspectiveData) => dispatch(actions.selectPerspective(perspectiveData)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PerspectivePane));
