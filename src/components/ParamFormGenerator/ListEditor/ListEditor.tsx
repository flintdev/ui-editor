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

const styles = createStyles({
    root: {

    },
    content: {
        padding: 20
    },
    panel: {
        marginBottom: 10,
        border: '1px solid lightgrey'
    },
    panelContent: {
        display: 'grid'
    }
});

export interface Props extends WithStyles<typeof styles>{
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

    handleFormChange = (path: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = this.state;
        _.set(value, path, event.target.value);
        this.setState({value});
    };

    renderInput = (path, name?: string) => {
        const value = _.get(this.state.value, path);
        return (
            <TextField
                value={value}
                onChange={this.handleFormChange(path)}
                label={!!name? name : 'String'}
                variant={"outlined"}
                size={"small"}
                fullWidth={true}
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
                        expandIcon={<ExpandMoreIcon/>}
                    >
                        <Typography variant={"subtitle2"}>{`#${index+1}`}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelContent}>
                        {elementConfig?.type === 'string' &&
                        <div>
                            {this.renderInput(path)}
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

    getEmptyValue = (elementConfig: any) => {
        if (elementConfig.type === "string") return "";
        else if (elementConfig.type === "integer") return 0;
        else if (elementConfig.type === "array") return [this.getEmptyValue(elementConfig.element)];
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
                >
                    <div className={classes.content}>
                        {value.map(
                            (elementValue, index) => this.renderElementPanel(index, [index], elementValue, itemConfig.element)
                        )}
                        {this.renderAddElementButton([value.length], itemConfig.element)}
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(ListEditor);
