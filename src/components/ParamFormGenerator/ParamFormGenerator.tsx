// src/components/ParamFormGenerator/ParamFormGenerator.tsx

import * as React from 'react';
import {createStyles, WithStyles, withStyles} from '@material-ui/core/styles';
import {ItemType, ItemUI, Param, ParamItem} from "./interface";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import AlbumOutlinedIcon from '@material-ui/icons/AlbumOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Chip from '@material-ui/core/Chip';
import DialogForm, {Callback, Params} from "../DialogForm";
import {AddStateUpdaterDef} from "../../containers/Toolbar/StateDialog/StateUpdatersView/definition";
import {UpdateStateDef} from "./definition";
import {StateUpdaterData} from "../../interface";
import {StateUpdaterOperationType} from "../../constants";

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
    tableItem: {
        width: '100%',
    },
    tdAction: {
        width: 30,
    }
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

interface State {
    stateDialogOpen: boolean,
    stateDialogParams: any,
    stateEncodedValue: string,
    itemKeySelected: string,
}


class ParamFormGenerator extends React.Component<Props, object> {
    state: State = {
        stateDialogOpen: false,
        stateDialogParams: {},
        stateEncodedValue: '',
        itemKeySelected: '',
    };

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

    handleFormChange = (type: ItemType, key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let {values} = this.props;
        let value: any = event.target.value;
        values[key] = this.formatValue(type, value);
        this.props.onChange(values);
    };

    private formatValue = (type: ItemType, value: string) => {
        if (type === ItemType.integer) return parseInt(value) as number;
        return value;
    };

    checkInputType = (key: string) => {
        let {values} = this.props;
        const value = (values[key]);
        if (typeof value === "string" && value.includes('state::')) {
            return 'dynamic';
        } else {
            return 'static'
        }
    };

    toggleDynamicInput = (item: ParamItem) => () => {
        let {values} = this.props;
        const {type, key} = item;
        const value = (values[key]);
        if (typeof value === "string" && value.includes('state::')) {
            // switch to static
            const {displayValue} = this.decodeDynamicValue(value);
            const newValue = displayValue as string;
            values[key] = this.formatValue(type, newValue);
        } else {
            // switch to dynamic
            values[key] = this.encodeDynamicValue('$', value);
            this.handleStateChipClick(item);
        }
        this.props.onChange(values);
    };

    decodeDynamicValue = (value: string) => {
        const parts = value.split('::');
        if (parts.length !== 4) return {};
        return {
            state: parts[1],
            displayValue: parts[3]
        }
    };

    encodeDynamicValue = (state: string, displayValue: string) => {
        return `state::${state}::displayValue::${displayValue}`;
    };

    handleStateChipClick = (item: ParamItem) => () => {
        const {key, defaultValue} = item;
        const value = this.getParamValue(key, defaultValue);
        const {state} = this.decodeDynamicValue(value);
        const params = {state};
        this.setState({
            stateDialogOpen: true,
            stateDialogParams: params,
            stateEncodedValue: value,
            itemKeySelected: key
        });
    };

    handleUpdateStateDialogClose = () => {
        this.setState({
            stateDialogOpen: false,
            stateDialogParams: {},
            stateEncodedValue: '',
        });
    };

    handleUpdateStateSubmit = (params: Params, callback: Callback) => {
        const state = params.state as string;
        let {values} = this.props;
        const {itemKeySelected, stateEncodedValue} = this.state;
        const {displayValue} = this.decodeDynamicValue(stateEncodedValue);
        values[itemKeySelected] = this.encodeDynamicValue(state, displayValue!);
        this.props.onChange(values);
        callback.close();
    };

    renderInput = (item: ParamItem) => {
        const {key, name, type, defaultValue} = item;
        const value = this.getParamValue(key, defaultValue);
        return (
            <TextField
                value={value}
                onChange={this.handleFormChange(type, key)}
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
                onChange={this.handleFormChange(type, key)}
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

    renderStateChip = (item: ParamItem) => {
        const {key, defaultValue} = item;
        const value = this.getParamValue(key, defaultValue);
        const {state} = this.decodeDynamicValue(value);
        return (
            <Chip
                label={state}
                variant={"outlined"}
                size={"small"}
                onClick={this.handleStateChipClick(item)}
            />
        )
    };

    render() {
        const {classes, params} = this.props;
        const {stateDialogOpen, stateDialogParams} = this.state;
        return (
            <div className={classes.root}>
                {params.map((param, i) => {
                    return (
                        <div key={i} className={classes.groupContainer}>
                            <Typography variant={"overline"}>{param.group.toUpperCase()}</Typography>
                            {param.items.map((item, j) => {
                                const inputType = this.checkInputType(item.key);
                                return (
                                    <div key={j} className={classes.itemContainer}>
                                        <table className={classes.tableItem}>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    {inputType === "static" &&
                                                    <div>
                                                        {item.ui === ItemUI.input && this.renderInput(item)}
                                                        {item.ui === ItemUI.select && this.renderSelect(item)}
                                                    </div>
                                                    }
                                                    {inputType === "dynamic" &&
                                                    <div>
                                                        {this.renderStateChip(item)}
                                                    </div>
                                                    }
                                                </td>
                                                <td align={"right"} className={classes.tdAction}>
                                                    {inputType === "static" &&
                                                    <IconButton
                                                        size={"small"}
                                                        onClick={this.toggleDynamicInput(item)}
                                                    >
                                                        <AlbumOutlinedIcon fontSize={"small"}/>
                                                    </IconButton>
                                                    }
                                                    {inputType === 'dynamic' &&
                                                    <IconButton
                                                        size={"small"}
                                                        onClick={this.toggleDynamicInput(item)}
                                                    >
                                                        <EditOutlinedIcon fontSize={"small"}/>
                                                    </IconButton>
                                                    }
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                )
                            })}
                        </div>
                    )
                })}

                <DialogForm
                    open={stateDialogOpen}
                    onClose={this.handleUpdateStateDialogClose}
                    title={"Edit State Field"}
                    submitButtonTitle={"Update"}
                    params={this.state.stateDialogParams}
                    forms={UpdateStateDef}
                    onSubmit={this.handleUpdateStateSubmit}
                />

            </div>
        )
    }
}

export default withStyles(styles)(ParamFormGenerator);
