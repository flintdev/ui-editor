// src/UIEditor/UIEditor.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import {store} from "../redux/store";
import Toolbar from "../containers/Toolbar";
import ComponentTreeView from "../containers/ComponentTreeView";

const styles = createStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: "column",
    },
    header: {
        zIndex: 1001,
    },
    content: {
        flexGrow: 1
    },
    table: {
        width: '100%',
        height: '100%',
        border: 0,
        cellSpacing: 0,
        cellPadding: 0,
        borderSpacing: 0,
        borderCollapse: 'collapse',
    },
    tdLeft: {
        width: 240,
        height: '100%'
    },
    tdMiddle: {
        height: '100%'
    },
    tdRight: {
        width: 240,
        height: '100%'
    }
});

export interface Props extends WithStyles<typeof styles>{

}

class UIEditor extends React.Component<Props, object> {
    state = {

    };

    componentDidMount(): void {

    }

    render() {
        const {classes} = this.props;
        return (
            <Provider store={store}>
                <div className={classes.root}>
                    <div className={classes.header}>
                        <Toolbar/>
                    </div>
                    <div className={classes.content}>
                        <table className={classes.table}>
                            <tbody>
                            <tr>
                                <td valign={"top"} className={classes.tdLeft}>
                                    <ComponentTreeView/>
                                </td>
                                <td valign={"top"} className={classes.tdMiddle}>

                                </td>
                                <td valign={"top"} className={classes.tdRight}>

                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Provider>
        )
    }
}

export default withStyles(styles)(UIEditor);
