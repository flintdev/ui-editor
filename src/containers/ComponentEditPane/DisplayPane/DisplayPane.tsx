// src/containers/ComponentEditPane/DisplayPane/DisplayPane.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {StoreState} from "../../../redux/state";
import * as actions from "../../../redux/modules/components/actions";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {DisplayInfo, DisplayType} from "./interface";

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
});

export interface Props extends WithStyles<typeof styles> {
    displayInfo: DisplayInfo,
    onChange: (displayInfo: DisplayInfo) => void,
}

class DisplayPane extends React.Component<Props, object> {

    componentDidMount(): void {

    }

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
        let value = event.target.value;
        this.props.onChange({...displayInfo, value});
    };

    render() {
        const {classes, displayInfo} = this.props;
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
                    />
                    <TextField
                        className={classes.form}
                        label={"Value"}
                        value={!!value ? value : ''}
                        onChange={this.handleValueChange}
                        variant={"outlined"}
                        size={"small"}
                        fullWidth={true}
                    />
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.components;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ComponentsAction>) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayPane));
