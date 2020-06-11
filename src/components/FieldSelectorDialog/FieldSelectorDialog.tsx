// src/components/FieldSelectorDialog/FieldSelectorDialog.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {CommonState, StoreState} from "src/redux/state";
import * as actions from "src/redux/modules/common/actions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {FieldSelector} from '@flintdev/react-field-selector';
import {DataConverter} from "../../controllers/dataConverter";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = createStyles({
    root: {},
    content: {
        margin: 10
    },
    tdSelector: {
        verticalAlign: "top"
    },
});

export interface Props extends WithStyles<typeof styles>, CommonState {
    editorData: any,
    closeFieldSelectorDialog: () => void,
}

interface State {
    schemaData: any[],
    elementSchemaData: any[],
    path: any[],
    pathType: 'state' | 'local',
    arrayPath: any[],
}

class FieldSelectorDialog extends React.Component<Props, object> {
    state: State = {
        schemaData: [],
        elementSchemaData: [],
        path: [],
        pathType: 'state',
        arrayPath: []
    };

    componentDidMount(): void {

    }

    onEnter = () => {
        const {editorData} = this.props;
        const schemaData = new DataConverter().convertEditorDataToSchemaData(editorData);
        this.setState({
            schemaData,
            path: [],
            pathType: 'state',
            elementSchemaData: [],
            arrayPath: []
        });
    };

    handleFieldSelect = (path: any[]) => {
        this.setState({path});
    };

    handleSubmitButtonClick = () => {
        let {path, pathType} = this.state;
        const prefix = pathType === "state" ? '$' : '_';
        path.unshift(prefix);
        const pathStr = path.join('.');
        const {onSelect} = this.props.fieldSelectorDialog;
        if (!!onSelect) onSelect(pathStr);
        this.props.closeFieldSelectorDialog();
    };

    handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pathType = event.target.value;
        this.setState({pathType});
    };

    handleArrayFieldSelect = (path: any[]) => {
        this.setState({arrayPath: path});
        const {editorData} = this.props;
        const elementSchemaData = new DataConverter().getArrayElementSchemaData(editorData, path);
        this.setState({elementSchemaData, arrayPath: []});
    };

    render() {
        const {classes, fieldSelectorDialog} = this.props;
        const {schemaData, pathType, elementSchemaData} = this.state;
        const {open, localVar} = fieldSelectorDialog;
        return (
            <div className={classes.root}>
                <Dialog
                    open={open}
                    onClose={this.props.closeFieldSelectorDialog}
                    onEnter={this.onEnter}
                    disableEnforceFocus={true}
                    fullWidth={true}
                    maxWidth={pathType === "state" ? "xs" : "sm"}
                >
                    <div className={classes.content}>
                        {!localVar &&
                        <FieldSelector
                            schema={schemaData}
                            onSelect={this.handleFieldSelect}
                        />
                        }
                        {localVar &&
                        <div>
                            <RadioGroup
                                row
                                name="selection"
                                value={pathType}
                                onChange={this.handleRadioChange}
                            >
                                <FormControlLabel value="state" control={<Radio color={"primary"}/>} label="Always"/>
                                <FormControlLabel value="local" control={<Radio color={"secondary"}/>} label="Conditional"/>
                            </RadioGroup>
                            {pathType === "state" &&
                            <FieldSelector
                                schema={schemaData}
                                onSelect={this.handleFieldSelect}
                            />
                            }
                            {pathType === "local" &&
                            <div>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Select Array Field</TableCell>
                                                <TableCell>Select Element Field</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className={classes.tdSelector}>
                                                    <FieldSelector
                                                        schema={schemaData}
                                                        onSelect={this.handleArrayFieldSelect}
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.tdSelector}>
                                                    <FieldSelector
                                                        schema={elementSchemaData}
                                                        onSelect={this.handleFieldSelect}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            }
                        </div>
                        }
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
