// src/containers/Toolbar/SettingsDialog/LocalStoragePane/LocalStoragePane.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import DialogForm, {Callback, Params} from "../../../../components/DialogForm";
import {LocalStorageItem} from "../../../../interface";
import {AddKeyValueDef} from "./definition";

const styles = createStyles({
    root: {},
    table: {
        width: '100%',
    },
    titleText: {
        color: 'grey'
    },
});

export interface Props extends WithStyles<typeof styles> {
    localStorage: LocalStorageItem[],
    onChange: (localStorage: LocalStorageItem[]) => void,
}

interface State {
    addKeyValueDialogOpen: boolean
}

class LocalStoragePane extends React.Component<Props, object> {
    state: State = {
        addKeyValueDialogOpen: false,
    };

    componentDidMount(): void {

    }

    handleDeleteKeyValueClick = (index: number) => () => {
        let {localStorage} = this.props;
        localStorage.splice(index, 1);
        this.props.onChange([...localStorage]);
    };

    handleAddKeyValueClick = () => {
        this.setState({addKeyValueDialogOpen: true});
    };

    handleAddKeyValueDialogClose = () => {
        this.setState({addKeyValueDialogOpen: false});
    };

    handleAddKeyValueSubmit = (params: Params, callback: Callback) => {
        const key = params.key as string;
        const value: any = params.value;
        const item: LocalStorageItem = {key, value};
        this.props.onChange([...this.props.localStorage, item]);
        this.forceUpdate();
        callback.close();
    };

    render() {
        const {classes, localStorage} = this.props;
        return (
            <div className={classes.root}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <Typography variant={"h6"} className={classes.titleText}>Set Local Storage (Debug Only)</Typography>
                        </td>
                        <td align={"right"}>

                        </td>
                    </tr>
                    </tbody>
                </table>
                <Divider/><br/>
                <div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Key</TableCell>
                                    <TableCell>Value</TableCell>
                                    <TableCell align={"right"}>

                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {localStorage.map((item, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{item.key}</TableCell>
                                            <TableCell>{item.value}</TableCell>
                                            <TableCell align={"right"}>
                                                <IconButton size={"small"}
                                                            onClick={this.handleDeleteKeyValueClick(i)}>
                                                    <DeleteOutlineOutlinedIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={4} align={"center"}>
                                        <Button color={"primary"} onClick={this.handleAddKeyValueClick}>
                                            <AddIcon/>&nbsp;Add Key-Value
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>

                <DialogForm
                    open={this.state.addKeyValueDialogOpen}
                    onClose={this.handleAddKeyValueDialogClose}
                    title={"Add Key-Value"}
                    submitButtonTitle={"Add"}
                    forms={AddKeyValueDef}
                    onSubmit={this.handleAddKeyValueSubmit}
                />
            </div>
        )
    }
}

export default withStyles(styles)(LocalStoragePane);
