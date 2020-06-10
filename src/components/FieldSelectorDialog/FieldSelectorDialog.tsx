// src/components/FieldSelectorDialog/FieldSelectorDialog.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import {CommonState, StoreState} from "src/redux/state";
import * as actions from "src/redux/modules/common/actions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {FieldSelector} from '@flintdev/react-field-selector';
import {DataConverter} from "../../controllers/dataConverter";

const styles = createStyles({
    root: {

    },
    content: {
        margin: 10
    },
});

export interface Props extends WithStyles<typeof styles>, CommonState {
    editorData: any,
    closeFieldSelectorDialog: () => void,
}

interface State {
    schemaData: any[],
    path: any[],
}

class FieldSelectorDialog extends React.Component<Props, object> {
    state: State = {
        schemaData: [],
        path: [],
    };

    componentDidMount(): void {

    }

    onEnter = () => {
        const {editorData} = this.props;
        const schemaData = new DataConverter().convertEditorDataToSchemaData(editorData);
        console.log('schemaData', schemaData);
        console.log('editorData', editorData);
        this.setState({schemaData});
    };

    handleFieldSelect = (path: any[]) => {
        this.setState({path});
    };
    
    handleSubmitButtonClick = () => {
        let {path} = this.state;
        path.unshift('$');
        const pathStr = path.join('.');
        const {onSelect} = this.props.fieldSelectorDialog;
        if (!!onSelect) onSelect(pathStr);
        this.props.closeFieldSelectorDialog();
    };

    render() {
        const {classes, fieldSelectorDialog} = this.props;
        const {schemaData} = this.state;
        const {open} = fieldSelectorDialog;
        return (
            <div className={classes.root}>
                <Dialog
                    open={open}
                    onClose={this.props.closeFieldSelectorDialog}
                    onEnter={this.onEnter}
                    disableEnforceFocus={true}
                    fullWidth={true}
                    maxWidth={"xs"}
                >
                    <div className={classes.content}>
                        <FieldSelector
                            schema={schemaData}
                            onSelect={this.handleFieldSelect}
                        />
                    </div>
                    <DialogActions>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={this.handleSubmitButtonClick}
                        >Select</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.common;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.CommonAction>) => {
    return {
        closeFieldSelectorDialog: () => dispatch(actions.closeFieldSelectorDialog()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FieldSelectorDialog));
