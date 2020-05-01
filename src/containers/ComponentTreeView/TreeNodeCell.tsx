// src/containers/ComponentTreeView/TreeNodeCell.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

const styles = createStyles({
    root: {
        height: 28,
    },
    rootSelected: {
        height: 28,
        backgroundColor: '#e0e0e0',
        borderRadius: 4
    },
    tdIcon: {
        paddingTop: 2,
        width: 20,
    },
    text: {
        fontSize: 14,
        marginBottom: 2
    },
    tdAnnotation: {
        paddingTop: 2,
        width: 20,
        verticalAlign: 'middle'
    },
    paper: {}
});

export interface Props extends WithStyles<typeof styles> {
    isDragging: boolean,
    dragHandleProps: any,
    text: string,
    icon: any,
    overlay?: boolean
    selected?: boolean
    onClick?: () => void
}

class TreeNodeCell extends React.Component<Props, object> {
    state = {};

    componentDidMount(): void {

    }

    handleCellClick = () => {
        if (!!this.props.onClick) this.props.onClick();
    };

    renderContent = () => {
        const {classes, icon, text, overlay, selected} = this.props;
        return (
            <table style={{width: '100%'}}>
                <tbody>
                <tr>
                    <td className={classes.tdIcon} valign={"middle"}>{icon}</td>
                    <td>
                        <Typography variant={"body2"} className={classes.text}>{text}</Typography>
                    </td>
                    {!!overlay &&
                    <td className={classes.tdAnnotation} align={"right"} valign={"middle"}>
                        {!selected &&
                        <VisibilityOffOutlinedIcon fontSize={"small"} style={{color: "grey"}}/>
                        }
                        {!!selected &&
                        <VisibilityOutlinedIcon fontSize={"small"} color={"primary"}/>
                        }
                    </td>
                    }
                </tr>
                </tbody>
            </table>
        )
    };

    render() {
        const {classes, isDragging, dragHandleProps, selected} = this.props;
        return (
            <div
                className={!!selected ? classes.rootSelected : classes.root}
                {...dragHandleProps}
                onClick={this.handleCellClick}
            >
                {isDragging &&
                <Paper className={classes.paper}>
                    {this.renderContent()}
                </Paper>
                }
                {!isDragging && this.renderContent()}
            </div>
        )
    }
}

export default withStyles(styles)(TreeNodeCell);
