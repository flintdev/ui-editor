// src/containers/ComponentEditPane/DisplayPane/DisplayPane.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {FieldSelectorOnSelectFunc, StoreState} from "../../../redux/state";
import * as actions from "../../../redux/modules/components/actions";
import * as commonActions from '../../../redux/modules/common/actions';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {DisplayInfo, DisplayType} from "./interface";
import InputAdornment from "@material-ui/core/InputAdornment";
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";
import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from "@material-ui/core/MenuItem";
import AlbumOutlinedIcon from '@material-ui/icons/AlbumOutlined';
import {FieldSelectorOptions} from "../../../redux/modules/common/actions";

const styles = createStyles({
    root: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: '1px solid #ddd',
    },
    displayButtonActive: {
        backgroundColor: '#ddd',
        width: '50%'
    },
    displayButton: {
        width: '50%'
    },
    form: {
        marginTop: 10,
        marginBottom: 0,
    },
    buttonGroup: {
        width: '100%',
    },
    menuPaper: {
        width: 150,
    }
});

export interface Props extends WithStyles<typeof styles> {
    displayInfo: DisplayInfo,
    onChange: (displayInfo: DisplayInfo) => void,
    openFieldSelectorDialog: (options: FieldSelectorOptions) => void,
}

type DataType = 'string' | 'integer' | 'boolean';

interface State {
    dataType: DataType,
    typeMenuAnchorEl?: Element
}

const DataTypeList = [
    "string",
    "integer",
    "boolean",
];

class DisplayPane extends React.Component<Props, object> {
    state: State = {
        dataType: "string",
        typeMenuAnchorEl: undefined
    };

    componentDidMount(): void {

    }

    openTypeMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({typeMenuAnchorEl: event.currentTarget});
    };

    closeTypeMenu = () => {
        this.setState({typeMenuAnchorEl: undefined});
    };

    handleDisplayTypeButtonClick = (displayType: DisplayType) => () => {
        if (displayType === 'always') {
            this.props.onChange({type: "always"});
        } else if (displayType === "conditional") {
            let {displayInfo} = this.props;
            this.props.onChange({...displayInfo, type: "conditional"})
        }
    };

    handleStateFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let {displayInfo} = this.props;
        const state = event.target.value;
        this.props.onChange({...displayInfo, state});
    };

    handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let {displayInfo} = this.props;
        const {dataType} = this.state;
        let value = event.target.value;
        value = this.updateValueType(value, dataType)
        this.props.onChange({...displayInfo, value});
    };

    updateValueType = (value: string, dataType: string): any => {
        if (dataType === "integer") return parseInt(value);
        else if (dataType === "boolean") return value === "true";
        return value;
    };

    getValueString = (value?: any): string => {
        if (value === undefined) return '';
        return `${value}`;
    };

    handleDataTypeSelect = (dataType: string) => () => {
        let value: any = "";
        if (dataType === 'string') value = "";
        else if (dataType === "integer") value = 0;
        else if (dataType === "boolean") value = true;
        let {displayInfo} = this.props;
        this.props.onChange({...displayInfo, value});
        this.setState({dataType});
        this.closeTypeMenu();
    };

    handleSelectFieldClick = () => {
        this.props.openFieldSelectorDialog({
            localVar: false,
            onSelect: (path) => {
                let {displayInfo} = this.props;
                this.props.onChange({...displayInfo, state: path});
            }
        });
    };

    render() {
        const {classes, displayInfo} = this.props;
        const {typeMenuAnchorEl, dataType} = this.state;
        const {type, state, value} = displayInfo;
        return (
            <div className={classes.root}>
                <Typography variant={"overline"}>DISPLAY</Typography>
                <ButtonGroup
                    size={"small"}
                    className={classes.buttonGroup}
                >
                    <Button
                        className={type === 'always' ? classes.displayButtonActive : classes.displayButton}
                        onClick={this.handleDisplayTypeButtonClick("always")}
                    >
                        Always
                    </Button>
                    <Button
                        className={type === 'conditional' ? classes.displayButtonActive : classes.displayButton}
                        onClick={this.handleDisplayTypeButtonClick("conditional")}
                    >
                        Conditional
                    </Button>
                </ButtonGroup>
                {type === 'conditional' &&
                <div>
                    <TextField
                        className={classes.form}
                        label={"State Field"}
                        value={!!state ? state : ''}
                        onChange={this.handleStateFieldChange}
                        variant={"outlined"}
                        size={"small"}
                        fullWidth={true}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Tooltip title={"Select Field"}>
                                        <IconButton
                                            size={"small"}
                                            edge="start"
                                            onClick={this.handleSelectFieldClick}
                                        >
                                            <AlbumOutlinedIcon fontSize={"small"}/>
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        id={"display-value-input"}
                        className={classes.form}
                        label={`Value (${dataType})`}
                        value={this.getValueString(value)}
                        onChange={this.handleValueChange}
                        variant={"outlined"}
                        size={"small"}
                        type={dataType === "integer" ? "number" : "text"}
                        fullWidth={true}
                        select={dataType === "boolean"}
                        children={dataType === "boolean" ?
                            (
                                [<MenuItem value={"true"}>true</MenuItem>, <MenuItem value={"false"}>false</MenuItem>]
                            ) : undefined
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Tooltip title={"Change Data Type"}>
                                        <IconButton
                                            size={"small"}
                                            edge="start"
                                            onClick={this.openTypeMenu}
                                        >
                                            <FlipCameraAndroidIcon fontSize={"small"}/>
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                }

                <Popover
                    open={Boolean(typeMenuAnchorEl)}
                    onClose={this.closeTypeMenu}
                    anchorEl={typeMenuAnchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <Paper className={classes.menuPaper}>
                        <List dense={true}>
                            {DataTypeList.map((item, i) => {
                                return (
                                    <ListItem
                                        key={i}
                                        button
                                        onClick={this.handleDataTypeSelect(item)}
                                        selected={dataType === item}
                                    >
                                        <ListItemText primary={item}/>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Paper>
                </Popover>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.components;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ComponentsAction | commonActions.CommonAction>) => {
    return {
        openFieldSelectorDialog: (options: FieldSelectorOptions) => dispatch(commonActions.openFieldSelectorDialog(options)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayPane));
