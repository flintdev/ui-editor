// src/components/DialogForm/DialogForm.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from '@material-ui/core/Button';
import {LOADING_STATUS} from "../../constants";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const styles = createStyles({
    root: {

    },
    form: {
        marginBottom: 10,
    }
});

type FormType = 'input' | 'select';
type FormValueType = string|number;

export interface Form {
    type: FormType,
    key: string,
    label: string,
    placeholder?: string,
    helperText?: string,
    required?: boolean,
    dataType?: string,
    autofocus?: boolean,
    defaultValue?: FormValueType,
    options?: Array<FormValueType>,
}

export interface Params {
    [key: string]: FormValueType
}

export interface Callback {
    setStatus: (status: LOADING_STATUS) => void,
    close: () => void,
}

export interface Props extends WithStyles<typeof styles> {
    open: boolean,
    onClose: () => void,
    title?: string,
    submitButtonTitle?: string,
    closeButtonTitle?: string,
    params?: Params,
    forms: Form[],
    onSubmit: (params: Params, callback: Callback) => void
}

interface State {
    params: Params,
    loadingStatus: LOADING_STATUS,
}

class DialogForm extends React.Component<Props, object> {
    state: State = {
        params: {},
        loadingStatus: LOADING_STATUS.NOT_STARTED
    };

    componentDidMount(): void {

    }

    onEnter = () => {
        const {params} = this.props;
        if (!!params) {
            this.setState({params});
        }
    };

    handleSetStatus = (loadingStatus: LOADING_STATUS) => {
        this.setState({loadingStatus});
    };

    handleSubmitButtonClick = () => {
        const {params} = this.state;
        const {onSubmit} = this.props;
        const callback = {setStatus: this.handleSetStatus, close: this.props.onClose};
        onSubmit(params, callback);
    };

    handleFormChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        let {params} = this.state;
        params[key] = value;
        this.setState({params});
    };
    
    getParamValueByKey = (key: string, defaultValue: FormValueType) => {
        const {params} = this.state;
        let value: FormValueType = params[key];
        if (!!value) return value;
        if (!!defaultValue) return defaultValue;
        return '';
    };

    render() {
        const {classes, open, onClose, title, submitButtonTitle, closeButtonTitle, forms} = this.props;
        return (
            <div className={classes.root}>
                <Dialog
                    open={open}
                    onClose={onClose}
                    onEnter={this.onEnter}
                    fullWidth={true}
                >
                    {!!title &&
                    <DialogTitle>{title}</DialogTitle>
                    }
                    <DialogContent>
                        {forms.map((form, i) => {
                            const {type, key, label, placeholder, helperText, required, defaultValue, dataType, autofocus, options} = form;
                            const value = this.getParamValueByKey(key, defaultValue!);
                            return (
                                <div key={i}>
                                    {type === "input" && 
                                    <TextField
                                        className={classes.form}
                                        fullWidth
                                        value={value}
                                        label={label}
                                        required={!!required}
                                        helperText={helperText}
                                        placeholder={placeholder}
                                        type={dataType}
                                        autoFocus={!!autofocus}
                                        onChange={this.handleFormChange(key)}
                                    />
                                    }
                                    {type === "select" &&
                                    <TextField
                                        className={classes.form}
                                        fullWidth
                                        value={value}
                                        label={label}
                                        required={!!required}
                                        helperText={helperText}
                                        placeholder={placeholder}
                                        autoFocus={!!autofocus}
                                        onChange={this.handleFormChange(key)}
                                        select
                                    >
                                        {!!options && options.map((option, i) => {
                                            return (
                                                <MenuItem key={i} value={option}>{option}</MenuItem>
                                            )
                                        })}
                                    </TextField>
                                    }
                                </div>
                            )
                        })}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={onClose}
                        >
                            {!!closeButtonTitle ? closeButtonTitle : 'Close'}
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={this.handleSubmitButtonClick}
                        >
                            {!!submitButtonTitle ? submitButtonTitle : 'Submit'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(DialogForm);
