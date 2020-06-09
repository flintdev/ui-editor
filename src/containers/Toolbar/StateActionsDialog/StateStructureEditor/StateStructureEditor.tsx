// src/containers/Toolbar/StateActionsDialog/StateStructureEditor/StateStructureEditor.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { StoreState } from "../../../../redux/state";
import * as actions from "../../../../redux/modules/toolbar/actions";
import {ModelEditorCanvas, getInitialEditorData} from "@flintdev/model-editor-canvas";
import Paper from "@material-ui/core/Paper";
import BlockEditDialog from "./BlockEditDialog";

const styles = createStyles({
    root: {

    },
    content: {
        margin: 10,
        height: '80vh'
    },
});

export interface Props extends WithStyles<typeof styles>{
    schemaEditorData: any,
    schemaEditorDataOnUpdate: (editorData: any) => void,
    blockEditDialogOpen: (blockData: any) => void,
}

class StateStructureEditor extends React.Component<Props, object> {
    operations: any = {};
    componentDidMount(): void {
        const {schemaEditorData} = this.props;
        if (!schemaEditorData) {
            const initialEditorData = this.getInitialEditorData();
            this.props.schemaEditorDataOnUpdate(initialEditorData);
        }
    }

    getInitialEditorData = () => {
        const canvasData = getInitialEditorData('State');
        const blockData = [{name: "State", items: []}];
        return {canvasData, blockData};
    };

    handleBlockDbClick = (blockData: any) => {
        this.props.blockEditDialogOpen(blockData);
    };

    handleOnSaved = (editorData: any) => {
        this.props.schemaEditorDataOnUpdate(editorData);
    };

    handleOnSchemaBtnClick = () => {

    };

    render() {
        const {classes, schemaEditorData} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.content}>
                    <ModelEditorCanvas
                        operations={this.operations}
                        editorData={schemaEditorData?.canvasData}
                        onBlockDbClick={this.handleBlockDbClick}
                        onSaved={this.handleOnSaved}
                        onSchemaBtnClick={this.handleOnSchemaBtnClick}
                    />
                </Paper>

                <BlockEditDialog
                    operations={this.operations}
                />

            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.toolbar;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ToolbarAction>) => {
    return {
        blockEditDialogOpen: (blockData: any) => dispatch(actions.blockEditDialogOpen(blockData)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StateStructureEditor));
