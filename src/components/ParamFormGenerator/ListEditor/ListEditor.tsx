// src/components/ParamFormGenerator/ListEditor/ListEditor.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Chip from "@material-ui/core/Chip";
import {ItemType, ParamItem, Element} from "../interface";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as _ from 'lodash';
import TextField from "@material-ui/core/TextField";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MenuItem from "@material-ui/core/MenuItem";
import ColorPicker from "../ColorPicker";

const styles = createStyles({
    root: {},
    content: {},
    panel: {
        marginBottom: 10,
        border: '1px solid lightgrey'
    },
    panelHeader: {
        display: 'flex'
    },
    panelContent: {
        display: 'grid'
    },
    headingText: {
        flex: 1
    },
    form: {
        marginBottom: 10,
    }
});


const FormTypeMap: any = {
    integer: 'number',
    string: 'text',
    password: 'password',
    email: 'email'
};

export interface Props extends WithStyles<typeof styles> {
    itemConfig: ParamItem,
    value: any,
    onUpdate: (value: any) => void,
}

interface State {
    open: boolean,
    value: any
}

class ListEditor extends React.Component<Props, object> {
    state: State = {
        open: false,
        value: [],
    };

    componentDidMount(): void {

    }

    onEnter = () => {

    };

    handleChipClick = () => {
        this.setState({
            open: true,
            value: this.props.value,
        });
    };

    handleDialogClose = () => {
        this.setState({open: false})
    };

    handleFormChange = (path: any, type: ItemType) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = this.state;
        _.set(value, path, this.formatValue(type, event.target.value));
        this.setState({value});
    };

    private formatValue = (type: ItemType, value: string) => {
        if (type === ItemType.integer) return parseInt(value) as number;
        return value;
    };

    private getFormType = (type: string) => {
        return !!FormTypeMap[type] ? FormTypeMap[type] : 'text'
    };

    renderInput = (path, type: ItemType, name?: string) => {
        const {classes} = this.props;
        const value = _.get(this.state.value, path);
        return (
            <TextField
                className={classes.form}
                value={value}
                onChange={this.handleFormChange(path, type)}
                label={!!name ? name : 'String'}
                variant={"outlined"}
                size={"small"}
                type={this.getFormType(type)}
                fullWidth={true}
            />
        )
    };

    renderSelect = (path, type: ItemType, name: string, options?: any[]) => {
        const {classes} = this.props;
        const value = _.get(this.state.value, path);
        return (
            <TextField
                className={classes.form}
                label={name}
                value={value}
                onChange={this.handleFormChange(path, type)}
                fullWidth={true}
                variant={"outlined"}
                size={"small"}
                type={this.getFormType(type)}
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

    renderColorPicker = (path, name: string) => {
        const value = _.get(this.state.value, path);
        return (
            <ColorPicker
                name={name}
                value={value}
                onChange={(color) => {
                    let {value} = this.state;
                    _.set(value, path, color);
                    this.setState({value});
                }}
            />
        )
    };

    renderElementPanel = (index: number, path: any, elementValue: any, elementConfig?: Element): any => {
        if (!elementConfig) return <div/>;
        const {classes} = this.props;
        return (
            <div key={index}>
                <ExpansionPanel className={classes.panel}>
                    <ExpansionPanelSummary
                        className={classes.panelHeader}
                        expandIcon={<ExpandMoreIcon/>}
                    >
                        <Typography variant={"subtitle1"} className={classes.headingText}>{`#${index + 1}`}</Typography>
                        <IconButton
                            size={"small"}
                            onClick={this.handleDeleteElementClick(path)}
                        >
                            <DeleteOutlineIcon fontSize={"small"}/>
                        </IconButton>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelContent}>
                        {(elementConfig?.type === 'string' || elementConfig?.type === 'integer') &&
                        <div>
                            {this.renderInput(path, elementConfig!.type as ItemType, undefined)}
                        </div>
                        }
                        {elementConfig?.type === 'array' &&
                        <div>
                            {elementValue.map((item, index) => this.renderElementPanel(index, [...path, index], item, elementConfig.element))}
                            {this.renderAddElementButton([...path, elementValue.length], elementConfig.element)}
                        </div>
                        }
                        {elementConfig?.type === 'object' &&
                        <div>
                            {!!elementConfig.items && elementConfig.items.map((item, index) => {
                                const itemPath = [...path, item.key];
                                return (
                                    <div key={index}>
                                        {item.ui === "input" && this.renderInput(itemPath, item.type, item.name)}
                                        {item.ui === "select" && this.renderSelect(itemPath, item.type, item.name, item.options)}
                                        {item.ui === "color-picker" && this.renderColorPicker(itemPath, item.name)}
                                    </div>
                                )
                            })}
                        </div>
                        }
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    };

    renderAddElementButton = (path: any, elementConfig: any) => {
        return (
            <Button
                fullWidth={true}
                color={"primary"}
                onClick={this.handleAddElementClick(path, elementConfig)}
            >
                <AddIcon/>&nbsp;Add Element
            </Button>
        )
    };

    handleAddElementClick = (path: any, elementConfig: any) => () => {
        const emptyValue = this.getEmptyValue(elementConfig);
        let {value} = this.state;
        _.set(value, path, emptyValue);
        this.setState({value});
    };

    handleDeleteElementClick = (path: any) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        let {value} = this.state;
        if (path.length === 1) {
            value.splice(path[0], 1);
        } else {
            const parentPath = path.slice(0, path.length - 1);
            const index = path[path.length - 1];
            let tempList = _.get(value, parentPath);
            tempList.splice(index, 1);
            _.set(value, parentPath, tempList);
        }
        this.setState({value});
    };

    getEmptyValue = (elementConfig: any) => {
        if (elementConfig.type === "string") return "";
        else if (elementConfig.type === "integer") return 0;
        else if (elementConfig.type === "array") return [this.getEmptyValue(elementConfig.element)];
    };

    handleSubmitClick = () => {
        const {value} = this.state;
        this.props.onUpdate(value);
        this.handleDialogClose();
    };

    render() {
        const {classes, itemConfig, value} = this.props;
        const {open} = this.state;
        return (
            <div className={classes.root}>
                <Chip
                    icon={<FormatListBulletedIcon/>}
                    label={`${itemConfig.name} (${value.length})`}
                    onClick={this.handleChipClick}
                />

                <Dialog
                    open={open}
                    onClose={this.handleDialogClose}
                    onEnter={this.onEnter}
                    fullWidth={true}
                    transitionDuration={0}
                >
                    <DialogContent>
                        <div className={classes.content}>
                            {value.map(
                                (elementValue, index) => this.renderElementPanel(index, [index], elementValue, itemConfig.element)
                            )}
                            {this.renderAddElementButton([value.length], itemConfig.element)}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose}>Close</Button>
                        <Button variant={"contained"} color={"primary"} onClick={this.handleSubmitClick}>Update</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(ListEditor);
