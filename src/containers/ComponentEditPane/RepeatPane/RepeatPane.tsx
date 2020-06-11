// src/containers/ComponentEditPane/RepeatPane/RepeatPane.tsx

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { StoreState } from "../../../redux/state";
import * as actions from "../../../redux/modules/components/actions";
import Typography from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {RepeatInfo} from "../interface";
import TextField from "@material-ui/core/TextField";

const styles = createStyles({
    root: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: '1px solid #ddd',
    },
    form: {
        marginTop: 10,
        marginBottom: 0,
    },
});

export interface Props extends WithStyles<typeof styles>{
    repeatInfo: RepeatInfo|undefined,
    onChange: (repeatInfo?: RepeatInfo) => void,
}

class RepeatPane extends React.Component<Props, object> {
    state = {

    };

    componentDidMount(): void {

    }

    handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        if (!checked) this.props.onChange(undefined);
        else {
            const repeatInfo: RepeatInfo = {fieldPath: '$.'};
            this.props.onChange(repeatInfo);
        }
    };

    handleFieldPathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const repeatInfo: RepeatInfo = {fieldPath: event.target.value};
        this.props.onChange({...repeatInfo});
    };

    render() {
        const {classes, repeatInfo} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant={"overline"}>REPEAT</Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={Boolean(repeatInfo)}
                                color={"primary"}
                                onChange={this.handleCheckBoxChange}
                                name="repeat-check"
                            />
                        }
                        label={<Typography variant={"body2"}>Repeated display</Typography>}
                    />
                </FormGroup>
                {!!repeatInfo &&
                <div>
                    <TextField
                        className={classes.form}
                        label={"Data Path"}
                        value={repeatInfo?.fieldPath}
                        onChange={this.handleFieldPathChange}
                        variant={"outlined"}
                        size={"small"}
                        fullWidth={true}
                    />
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.components;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ComponentsAction>) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RepeatPane));
