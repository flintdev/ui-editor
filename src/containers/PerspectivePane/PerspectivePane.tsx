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

const styles = createStyles({
    root: {

    },
    headerContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex'
    },
    headerText: {
        color: 'grey',
        fontWeight: 'bold',
        flex: 1
    },
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

    };

    handleOpenCreateDialog = () => {
        this.props.perspectiveEditDialogOpen("create");
    };

    handleOpenUpdateDialog = (perspectiveData: PerspectiveData, index: number) => {
        this.props.perspectiveEditDialogOpen("edit", perspectiveData, index);
    };

    render() {
        const {classes, perspectives} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.headerContainer}>
                    <Typography variant={"subtitle2"} className={classes.headerText}>PERSPECTIVES</Typography>
                    <IconButton size={"small"} onClick={this.handleOpenCreateDialog}>
                        <AddIcon fontSize={"small"}/>
                    </IconButton>
                </div>
                <div>
                    <List dense={true}>
                        {!!perspectives && perspectives.map((item, i) => {
                            return (
                                <ListItem key={i}>
                                    <ListItemText primary={item.name}/>
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
                <PerspectiveEditDialog
                    onCreate={this.handlePerspectiveOnCreate}
                    onUpdate={this.handlePerspectiveOnUpdate}
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
