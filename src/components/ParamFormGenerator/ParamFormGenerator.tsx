// src/components/ParamFormGenerator/ParamFormGenerator.tsx

import * as React from 'react';
import {createStyles, WithStyles, withStyles} from '@material-ui/core/styles';
import {ItemUI, Param, ParamItem} from "./interface";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = createStyles({
    root: {},
    groupContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: '1px solid #ddd',
    },
    groupText: {
        color: 'grey'
    },
    itemContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
});

export interface Props extends WithStyles<typeof styles> {
    params: Param[],
    values?: any,
    onChange: (values: any, init?: boolean) => void,
}

const FormTypeMap: any = {
    integer: 'number',
    string: 'text',
    password: 'password',
    email: 'email'
};

class ParamFormGenerator extends React.Component<Props, object> {

    componentDidMount(): void {
        this.initValues();
    }

    initValues = () => {
        let values: any = !!this.props.values ? this.props.values : {};
        this.props.params.forEach(param => {
            param.items.forEach(item => {
                const {key, defaultValue} = item;
                if (!values[key]) {
                    values[key] = defaultValue;
                }
            });
        });
        this.props.onChange(values, true);
    };

    getParamValue = (key: string, defaultValue: any) => {
        const {values} = this.props;
        if (!values || !values[key]) return defaultValue;
        return values[key];
    };

    getFormType = (type: string) => {
        return !!FormTypeMap[type] ? FormTypeMap[type] : 'text'
    };

    handleFormChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let {values} = this.props;
        values[key] = event.target.value;
        this.props.onChange(values);
    };

    renderInput = (item: ParamItem) => {
        const {key, name, type, defaultValue} = item;
        const value = this.getParamValue(key, defaultValue);
        return (
            <TextField
                value={value}
                onChange={this.handleFormChange(key)}
                label={name}
                type={this.getFormType(type)}
                variant={"outlined"}
                size={"small"}
                fullWidth={true}
            />
        )
    };

    renderSelect = (item: ParamItem) => {
        const {key, name, type, defaultValue, options} = item;
        const value = this.getParamValue(key, defaultValue);
        return (
            <TextField
                label={name}
                value={value}
                onChange={this.handleFormChange(key)}
                type={this.getFormType(type)}
                fullWidth={true}
                variant={"outlined"}
                size={"small"}
                select={true}
            >
                {options!.map((option, i) => {
                    return (
                        <MenuItem key={i} value={option}>{option}</MenuItem>
                    )
                })}
            </TextField>
        )
    };

    render() {
        const {classes, params} = this.props;
        return (
            <div className={classes.root}>
                {params.map((param, i) => {
                    return (
                        <div key={i} className={classes.groupContainer}>
                            <Typography variant={"overline"}>{param.group.toUpperCase()}</Typography>
                            {param.items.map((item, j) => {
                                return (
                                    <div key={j} className={classes.itemContainer}>
                                        {item.ui === ItemUI.input && this.renderInput(item)}
                                        {item.ui === ItemUI.select && this.renderSelect(item)}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default withStyles(styles)(ParamFormGenerator);
