// src/containers/Toolbar/StateDialog/InitialStateView/InitialStateView.tsx

import * as React from 'react';
import {createStyles, WithStyles, withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {StoreState} from "../../../../redux/state";
import * as actions from "../../../../redux/modules/toolbar/actions";
import Paper from "@material-ui/core/Paper";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SaveIcon from '@material-ui/icons/Save';
import CodeTemplate from './codeTemplate.txt';
import {HotKeys} from "react-hotkeys";
import {LOADING_STATUS} from "../../../../constants";
import { Alert, AlertTitle } from '@material-ui/lab';

const styles = createStyles({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        marginLeft: 20,
        marginRight: 20,
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
    },
    paperHeader: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 0,
    },
    table: {
        width: '100%'
    }
});

export interface Props extends WithStyles<typeof styles> {
    initialState: string,
    initialStateOnChange: (value: string) => void,
}

interface State {
    codeValue: string,
    editing: boolean,
    validationStatus: LOADING_STATUS,
    errorMessage: string
}

class InitialStateView extends React.Component<Props, object> {
    state: State = {
        codeValue: '',
        editing: false,
        validationStatus: LOADING_STATUS.NOT_STARTED,
        errorMessage: ""
    };

    componentDidMount(): void {
        let codeValue = this.props.initialState;
        if (codeValue === '') codeValue = CodeTemplate;
        this.setState({
            codeValue,
            validationStatus: LOADING_STATUS.NOT_STARTED
        });
    }

    handleCodeChange = (codeValue: string) => {
        if (!this.state.editing) this.setState({editing: true});
        this.setState({codeValue});
    };

    handleSaveButtonClick = async () => {
        const valid = await this.validateJsonFormat();
        if (!valid) return;
        const {codeValue} = this.state;
        this.props.initialStateOnChange(codeValue);
        this.setState({editing: false});
    };

    handleCodeEditorOnBlur = async () => {
        await this.validateJsonFormat();
    };

    validateJsonFormat = async () => {
        const {codeValue} = this.state;
        try {
            JSON.parse(codeValue);
            this.setState({
                validationStatus: LOADING_STATUS.COMPLETE
            })
            return true
        } catch (e) {
            this.setState({
                validationStatus: LOADING_STATUS.FAILED,
                errorMessage: e.toString(),
            })
            return false;
        }
    };

    render() {
        const {classes} = this.props;
        const {codeValue, editing, validationStatus, errorMessage} = this.state;
        return (
            <div className={classes.root}>
                <HotKeys
                    keyMap={{SAVE: "command+s"}}
                    handlers={{SAVE: this.handleSaveButtonClick}}
                    style={{height: '100%'}}
                >
                    <Paper className={classes.paper}>
                        <Paper className={classes.paperHeader}>
                            <table className={classes.table}>
                                <tbody>
                                <tr>
                                    <td>
                                        <Typography variant={"subtitle2"}>INITIAL STATE (JSON)</Typography>
                                    </td>
                                    <td align={"right"}>
                                        <Button
                                            variant={"contained"}
                                            size={"small"}
                                            color={"primary"}
                                            disabled={!editing}
                                            onClick={this.handleSaveButtonClick}
                                        >
                                            <SaveIcon/>&nbsp;Save
                                        </Button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </Paper>
                        {validationStatus === LOADING_STATUS.FAILED &&
                        <Alert severity={"error"}>
                            <AlertTitle>Invalid JSON Format</AlertTitle>
                            {errorMessage}
                        </Alert>
                        }
                        <AceEditor
                            mode="json"
                            theme="tomorrow"
                            fontSize={14}
                            value={codeValue}
                            onChange={this.handleCodeChange}
                            onBlur={this.handleCodeEditorOnBlur}
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
                </HotKeys>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.toolbar;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ToolbarAction>) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InitialStateView));
