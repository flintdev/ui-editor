// src/containers/Toolbar/SettingsDialog/DependencyPane/DependencyPane.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {PageDependency} from "../../../../interface";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import TableFooter from "@material-ui/core/TableFooter";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import DialogForm, {Callback, Params} from "../../../../components/DialogForm";
import {AddDependencyDef} from "./definition";


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
    dependencies: PageDependency[],
    onChange: (dependencies: PageDependency[]) => void,
}

interface State {
    addDependencyDialogOpen: boolean
}

class DependencyPane extends React.Component<Props, object> {
    state = {
        addDependencyDialogOpen: false
    };

    componentDidMount(): void {

    }

    handleDeleteDependencyClick = (index: number) => () => {
        let {dependencies} = this.props;
        dependencies.splice(index, 1);
        this.props.onChange([...dependencies]);
    };

    handleAddDependencyClick = () => {
        this.setState({addDependencyDialogOpen: true});
    };

    handleAddDependencyDialogClose = () => {
        this.setState({addDependencyDialogOpen: false});
    };

    handleAddDependencySubmit = (params: Params, callback: Callback) => {
        const type: any = params.type;
        const subtype: any = params.subtype;
        const href = params.href as string;
        const dependency: PageDependency = {type, subtype, href};
        this.props.onChange([...this.props.dependencies, dependency]);
        this.forceUpdate();
        callback.close();
    };

    render() {
        const {classes, dependencies} = this.props;
        return (
            <div className={classes.root}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <Typography variant={"h6"} className={classes.titleText}>Page Dependencies</Typography>
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
                                    <TableCell>Type</TableCell>
                                    <TableCell>Subtype</TableCell>
                                    <TableCell>HREF</TableCell>
                                    <TableCell align={"right"}>
                                        
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dependencies.map((item, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{item.type}</TableCell>
                                            <TableCell>{item.subtype}</TableCell>
                                            <TableCell>{item.href}</TableCell>
                                            <TableCell align={"right"}>
                                                <IconButton size={"small"} onClick={this.handleDeleteDependencyClick(i)}>
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
                                        <Button color={"primary"} onClick={this.handleAddDependencyClick}>
                                            <AddIcon/>&nbsp;Add Page Dependency
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>

                <DialogForm
                    open={this.state.addDependencyDialogOpen}
                    onClose={this.handleAddDependencyDialogClose}
                    title={"Add Page Dependency"}
                    submitButtonTitle={"Add"}
                    forms={AddDependencyDef}
                    onSubmit={this.handleAddDependencySubmit}
                />
            </div>
        )
    }
}

export default withStyles(styles)(DependencyPane);
