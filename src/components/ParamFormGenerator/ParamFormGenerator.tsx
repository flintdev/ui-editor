// src/components/ParamFormGenerator/ParamFormGenerator.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {Param} from "./interface";
import Typography from "@material-ui/core/Typography";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = createStyles({
    root: {

    },
    groupContainer: {

    },
    groupText: {
        color: 'grey'
    }
});

export interface Props extends WithStyles<typeof styles>{
    params: Param[],
    values?: object,
}

class ParamFormGenerator extends React.Component<Props, object> {
    state = {

    };

    componentDidMount(): void {

    }

    render() {
        const {classes, params, values} = this.props;
        return (
            <div className={classes.root}>
                {params.map((param, i) => {
                    return (
                        <div key={i} className={classes.groupContainer}>

                        </div>
                    )
                })}
            </div>
        )
    }
}

export default withStyles(styles)(ParamFormGenerator);
