// src/containers/Toolbar/SettingsDialog/LibraryPane/LibraryPane.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {AdditionalLibrary} from "../../../../interface";
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
import {AddLibraryDef} from "./definition";

const styles = createStyles({
    root: {

    },
    table: {
        width: '100%',
    },
    titleText: {
        color: 'grey'
    },
});

export interface Props extends WithStyles<typeof styles>{
    libraries: AdditionalLibrary[],
    onChange: (libraries: AdditionalLibrary[]) => void,
}

interface State {
    addLibraryDialogOpen: boolean,
}

class LibraryPane extends React.Component<Props, object> {
    state: State = {
        addLibraryDialogOpen: false,
    };

    componentDidMount(): void {

    }

    handleDeleteLibraryClick = (index: number) => () => {
        let {libraries} = this.props;
        libraries.splice(index, 1);
        this.props.onChange([...libraries]);
    };

    handleAddLibraryClick = () => {
        this.setState({addLibraryDialogOpen: true});
    };

    handleAddLibraryDialogClose = () => {
        this.setState({addLibraryDialogOpen: false});
    };

    handleAddLibrarySubmit = (params: Params, callback: Callback) => {
        const name = params.name as string;
        const version = params.version as string;
        const library: AdditionalLibrary = {name, version};
        this.props.onChange([...this.props.libraries, library]);
        this.forceUpdate();
        callback.close();
    };

    render() {
        const {classes, libraries} = this.props;
        return (
            <div className={classes.root}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <Typography variant={"h6"} className={classes.titleText}>Additional Libraries</Typography>
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
                                    <TableCell>Name</TableCell>
                                    <TableCell>Version</TableCell>
                                    <TableCell align={"right"}>

                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {libraries.map((item, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.version}</TableCell>
                                            <TableCell align={"right"}>
                                                <IconButton size={"small"} onClick={this.handleDeleteLibraryClick(i)}>
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
                                        <Button color={"primary"} onClick={this.handleAddLibraryClick}>
                                            <AddIcon/>&nbsp;Add Additional Library
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>

                <DialogForm
                    open={this.state.addLibraryDialogOpen}
                    onClose={this.handleAddLibraryDialogClose}
                    title={"Add Additional Dependency"}
                    submitButtonTitle={"Add"}
                    forms={AddLibraryDef}
                    onSubmit={this.handleAddLibrarySubmit}
                />
            </div>
        )
    }
}

export default withStyles(styles)(LibraryPane);
