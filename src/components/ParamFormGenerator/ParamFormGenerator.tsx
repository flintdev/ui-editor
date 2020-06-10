// src/components/ParamFormGenerator/ParamFormGenerator.tsx

import * as React from 'react';
import {createStyles, WithStyles, withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {FieldSelectorOnSelectFunc, StoreState} from "../../redux/state";
import * as commonActions from '../../redux/modules/common/actions';
import {ItemType, ItemUI, Param, ParamItem} from "./interface";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import AlbumOutlinedIcon from '@material-ui/icons/AlbumOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Chip from '@material-ui/core/Chip';
import ListEditor from "./ListEditor";
import ColorPicker from "./ColorPicker";
import * as actions from "../../redux/modules/components/actions";

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
        marginBottom: 0,
    },
    tableItem: {
        width: '100%',
    },
    tdAction: {
        width: 30,
    },
    selectForm: {
        whiteSpace: 'normal'
    }
});

export interface Props extends WithStyles<typeof styles> {
    params: Param[],
    values?: any,
    onChange: (values: any, init?: boolean) => void,
    openFieldSelectorDialog: (onSelect: FieldSelectorOnSelectFunc) => void,
}

const FormTypeMap: any = {
    integer: 'number',
    string: 'text',
    password: 'password',
    email: 'email'
};


const EmptyValueMap: any = {
    integer: 0,
    array: [],
    object: {},
    string: ""
}

class ParamFormGenerator extends React.Component<Props, object> {
    state = {

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

    getParamValue = (key: string, type: string) => {
        const {values} = this.props;
        let value = values[key];
        if (!value) {
            value = EmptyValueMap[type];
            if (value === undefined) value = "";
        }
        return value;
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

    handleColorChange = (key: string) => (color: string) => {
        let {values} = this.props;
        values[key] = color;
        this.props.onChange(values);
    };

    handleArrayValueUpdate = (key: string) => (value: any) => {
        let {values} = this.props;
        values[key] = value;
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
            values[key] = displayValue;
            this.props.onChange({...values});
        } else {
            // switch to dynamic
            values[key] = this.encodeDynamicValue('$', value);
            this.props.onChange({...values});
            this.handleStateChipClick(item)();
        }
    };

    decodeDynamicValue = (value: string) => {
        const parts = value.split('::');
        if (parts.length !== 4) return {};
        return {
            state: parts[1],
            displayValue: JSON.parse(parts[3])
        }
    };

    encodeDynamicValue = (state: string, displayValue: any) => {
        return `state::${state}::displayValue::${JSON.stringify(displayValue)}`;
    };

    handleStateChipClick = (item: ParamItem) => () => {
        const {key, defaultValue, type} = item;
        const encodedValue = this.getParamValue(key, type);
        // const path = this.decodeDynamicValue(encodedValue).state as string;
        this.props.openFieldSelectorDialog(pathStr => {
            console.log('pathStr', pathStr);
            let {values} = this.props;
            const {displayValue} = this.decodeDynamicValue(encodedValue);
            values[key] = this.encodeDynamicValue(pathStr, displayValue!);
            this.props.onChange({...values});
        });
    };

    renderListEditor = (item: ParamItem) => {
        const {key, type} = item;
        const value = this.getParamValue(key, type);
        return (
            <ListEditor
                itemConfig={item}
                value={value}
                onUpdate={this.handleArrayValueUpdate(key)}
            />
        )
    };

    renderColorPicker = (item: ParamItem) => {
        const {key, name, type} = item;
        const value = this.getParamValue(key, type);
        return (
            <ColorPicker
                name={name}
                value={value}
                onChange={this.handleColorChange(key)}
            />
        )
    };

    renderInput = (item: ParamItem) => {
        const {key, name, type} = item;
        const value = this.getParamValue(key, type);
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
        const {classes} = this.props;
        const {key, name, type, options} = item;
        const value = this.getParamValue(key, type);
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
                SelectProps={{
                    classes: {
                        select: classes.selectForm
                    }
                }}
            >
                {options!.map((option, i) => {
                    return <MenuItem key={i} value={option}>{option}</MenuItem>
                })}
            </TextField>
        )
    };

    renderStateChip = (item: ParamItem) => {
        const {key, type} = item;
        const value = this.getParamValue(key, type);
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
        console.log('values', this.props.values);
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
                                                        {item.ui === ItemUI.listEditor && this.renderListEditor(item)}
                                                        {item.ui === ItemUI.colorPicker && this.renderColorPicker(item)}
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

            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.components;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ComponentsAction | commonActions.CommonAction>) => {
    return {
        openFieldSelectorDialog: (onSelect: FieldSelectorOnSelectFunc) => dispatch(commonActions.openFieldSelectorDialog(onSelect)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ParamFormGenerator));
