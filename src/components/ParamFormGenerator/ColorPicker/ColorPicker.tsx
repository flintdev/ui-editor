// src/components/ParamFormGenerator/ColorPicker/ColorPicker.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {SketchPicker} from 'react-color';
import Popover from "@material-ui/core/Popover";
import Chip from "@material-ui/core/Chip";
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

const styles = createStyles({
    root: {},
    chip: {
        marginRight: 10,
    },
    container: {
        display: 'inline-block',
        cursor: 'pointer',
    },
    popoverContent: {
        padding: 10,
    },
    colorDiv: {
        width: 24,
        height: 24,
    },
    avatar: {
        border: '1px solid #ddd'
    },
    tooltip: {

    }
});

export interface Props extends WithStyles<typeof styles> {
    name: string,
    value: string,
    onChange: (value: string) => void,
}

interface State {
    anchorEl: any
}

class ColorPicker extends React.Component<Props, object> {
    state: State = {
        anchorEl: undefined
    };

    componentDidMount(): void {

    }

    handleChipClick = (event: React.MouseEvent) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handlePopoverClose = () => {
        this.setState({anchorEl: undefined});
    };

    handleColorChange = (color: any) => {
        this.props.onChange(color.hex.toUpperCase());
    };

    render() {
        const {classes, value, name} = this.props;
        const {anchorEl} = this.state;
        return (
            <div className={classes.root}>
                <Tooltip title={name} placement="top" className={classes.tooltip}>
                    <Chip
                        className={classes.chip}
                        variant={"outlined"}
                        label={value}
                        clickable={true}
                        onClick={this.handleChipClick}
                        avatar={
                            <Avatar
                                className={classes.avatar}
                                style={{backgroundColor: value}}
                            >&nbsp;</Avatar>
                        }
                    />
                </Tooltip>
                <Popover
                    open={Boolean(anchorEl)}
                    onClose={this.handlePopoverClose}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <SketchPicker
                        color={value}
                        onChangeComplete={this.handleColorChange}
                    />
                </Popover>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPicker);
