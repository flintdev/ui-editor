// src/containers/Toolbar/Toolbar.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { StoreState } from "src/redux/state";
import * as actions from "src/redux/modules/toolbar/actions";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import AlbumOutlinedIcon from '@material-ui/icons/AlbumOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import SaveIcon from '@material-ui/icons/Save';

const styles = createStyles({
    root: {
        
    },
    paper: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        paddingLeft: 5,
        margin: 0,
        borderRadius: 0,
    },
    table: {
        width: '100%'
    },
    actionButton: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
    },
    actionButtonBordered: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        border: '1px grey solid',
    },
    saveButton: {
        marginLeft: 10,
        marginRight: 10,
    },
});

export interface Props extends WithStyles<typeof styles>{
    addComponentOnClick: () => void;
    stateDialogOpen: () => void,
    actionsDialogOpen: () => void,
}

class Toolbar extends React.Component<Props, object> {
    state = {

    };

    componentDidMount(): void {

    }

    handleInsertButtonClick = () => {
        this.props.addComponentOnClick();
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <table className={classes.table}>
                        <tbody>
                        <tr>
                            <td>
                                <Button
                                    variant={"contained"}
                                    className={classes.actionButton}
                                    onClick={this.handleInsertButtonClick}
                                >
                                    <AddIcon/>&nbsp;Insert
                                </Button>
                                <Button
                                    variant={"contained"}
                                    className={classes.actionButton}
                                >
                                    <ZoomInIcon/>&nbsp;&nbsp;100%&nbsp;&nbsp;<ZoomOutIcon/>
                                </Button>
                            </td>
                            <td align={"right"}>
                                <Button
                                    variant={"contained"}
                                    className={classes.actionButtonBordered}
                                    onClick={this.props.stateDialogOpen}
                                >
                                    <AlbumOutlinedIcon/>&nbsp;&nbsp;State
                                </Button>
                                <Button
                                    variant={"contained"}
                                    className={classes.actionButtonBordered}
                                    onClick={this.props.actionsDialogOpen}
                                >
                                    <BuildOutlinedIcon/>&nbsp;&nbsp;Actions
                                </Button>
                                <Button
                                    variant={"contained"}
                                    className={classes.saveButton}
                                    color={"primary"}
                                >
                                    <SaveIcon/>&nbsp;&nbsp;Save
                                </Button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.toolbar;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ToolbarAction>) => {
    return {
        stateDialogOpen: () => dispatch(actions.stateDialogOpen()),
        actionsDialogOpen: () => dispatch(actions.actionsDialogOpen()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Toolbar));
