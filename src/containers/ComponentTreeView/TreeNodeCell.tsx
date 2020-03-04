// src/containers/ComponentTreeView/TreeNodeCell.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = createStyles({
    root: {
        height: 30,
    },
    rootSelected: {
        height: 30,
        backgroundColor: '#e0e0e0',
        borderRadius: 4
    },
    tdIcon: {
        paddingTop: 2,
        width: 20,
    },
    text: {
        fontSize: 14,
    },
    paper: {

    }
});

export interface Props extends WithStyles<typeof styles>{
    isDragging: boolean,
    dragHandleProps: any,
    text: string,
    icon: any,
    selected?: boolean
    onClick?: () => void
}

class TreeNodeCell extends React.Component<Props, object> {
    state = {
    
    };
    
    componentDidMount(): void {
    
    }

    handleCellClick = () => {
        if (!!this.props.onClick) this.props.onClick();
    };

    renderContent = () => {
        const {classes, icon, text} = this.props;
        return (
            <table>
                <tbody>
                <tr>
                    <td className={classes.tdIcon}>{icon}</td>
                    <td>
                        <Typography variant={"body2"} className={classes.text}>{text}</Typography>
                    </td>
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
