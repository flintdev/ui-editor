// src/containers/ComponentTreeView/TreeNodeCell.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = createStyles({
    root: {
        height: 30,
    },
    tdIcon: {
        paddingTop: 2,
        width: 20,
    },
    text: {
        fontSize: 14,
    },
    paper: {
        padding: 5,
    }
});

export interface Props extends WithStyles<typeof styles>{
    isDragging: boolean,
    dragHandleProps: any,
    text: string,
    icon: any,
}

class TreeNodeCell extends React.Component<Props, object> {
    state = {
    
    };
    
    componentDidMount(): void {
    
    }

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
        const {classes, isDragging, dragHandleProps} = this.props;
        return (
            <div className={classes.root} {...dragHandleProps}>
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
