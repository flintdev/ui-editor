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

const styles = createStyles({
    root: {

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
        overflow: 'scroll'
    }
});

export interface Props extends WithStyles<typeof styles>{
    perspectives: PerspectiveData[],
    perspectivesOnUpdate: (perspectives: PerspectiveData[]) => void,
    perspectiveEditDialogOpen: (mode: DialogMode, perspectiveData?: PerspectiveData, index?: number) => void,
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

    render() {
        const {classes, perspectives} = this.props;
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
                    <List dense={true}>
                        {!!perspectives && perspectives.map((item, i) => {
                            return (
                                <ListItem key={i} button={true}>
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PerspectivePane));
