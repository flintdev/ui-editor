// src/containers/PerspectivePane/PerspectiveEditDialog/PerspectiveEditDialog.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {PerspectiveEditDialogState, StoreState} from "../../../redux/state";
import * as actions from "../../../redux/modules/components/actions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow";
import {PerspectiveData} from "../../../interface";

const styles = createStyles({
    root: {},
    paper: {
        marginTop: 10,
        padding: 10,
    }
});

export interface Props extends WithStyles<typeof styles>, PerspectiveEditDialogState {
    perspectiveEditDialogClose: () => void,
    onCreate: (perspectiveData: PerspectiveData) => void,
    onUpdate: (perspectiveData: PerspectiveData, index: number) => void,
    onDelete: (index: number) => void,
}

interface State {
    name: string,
    code: string
}

class PerspectiveEditDialog extends React.Component<Props, object> {
    state: State = {
        name: '',
        code: ''
    };

    componentDidMount(): void {

    }

    onEnter = () => {
        const {mode, perspectiveData} = this.props;
        if (mode === 'create') {
            this.setState({name: '', code: ''});
        } else if (mode === "edit") {
            this.setState({name: perspectiveData?.name, code: perspectiveData?.code});
        }
    };

    handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        this.setState({name});
    };

    handleCodeChange = (code: string) => {
        this.setState({code});
    };

    handleSubmitToCreate = () => {
        const {name, code} = this.state;
        const perspectiveData: PerspectiveData = {name, code};
        this.props.onCreate(perspectiveData);
        this.props.perspectiveEditDialogClose();
    };

    handleSubmitToUpdate = () => {
        const {name, code} = this.state;
        let {index} = this.props;
        const perspectiveData: PerspectiveData = {name, code};
        if (index === undefined) index = -1;
        this.props.onUpdate(perspectiveData, index);
        this.props.perspectiveEditDialogClose();
    };

    handleSubmitToDelete = () => {
        let {index} = this.props;
        if (index === undefined) index = -1;
        this.props.onDelete(index);
        this.props.perspectiveEditDialogClose();
    };

    render() {
        const {classes, open, mode} = this.props;
        const {name, code} = this.state;
        return (
            <div className={classes.root}>
                <Dialog
                    open={open}
                    onClose={this.props.perspectiveEditDialogClose}
                    onEnter={this.onEnter}
                    fullWidth
                    disableEnforceFocus={true}
                    transitionDuration={0}
                >
                    <DialogTitle>{mode === "create" ? "New Perspective" : "Edit Perspective"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={name}
                            label={'Name of Perspective'}
                            fullWidth={true}
                            onChange={this.handleNameChange}
                            autoFocus={true}
                        />
                        <Paper className={classes.paper}>
                            <AceEditor
                                mode={"json"}
                                theme={"tomorrow"}
                                fontSize={14}
                                value={code}
                                onChange={this.handleCodeChange}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                style={{width: '100%', flexGrow: 1}}
                                setOptions={{
                                    showLineNumbers: true,
                                    tabSize: 4,
                                    useWorker: false
                                }}
                            />
                        </Paper>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.perspectiveEditDialogClose}>Close</Button>
                        {mode === "create" &&
                        <Button variant={"contained"} color={"primary"}
                                onClick={this.handleSubmitToCreate}>Create</Button>
                        }
                        {mode === "edit" &&
                        <React.Fragment>
                            <Button
                                variant={"outlined"}
                                color={"secondary"}
                                onClick={this.handleSubmitToDelete}
                            >
                                Delete
                            </Button>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                onClick={this.handleSubmitToUpdate}
                            >
                                Update
                            </Button>
                        </React.Fragment>
                        }
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.components.perspectiveEditDialog;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ComponentsAction>) => {
    return {
        perspectiveEditDialogClose: () => dispatch((actions.perspectiveEditDialogClose())),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PerspectiveEditDialog));
