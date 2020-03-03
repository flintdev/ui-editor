// src/containers/ComponentTreeView/ComponentTreeView.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {StoreState} from "src/redux/state";
import * as actions from "src/redux/modules/components/actions";
import {ComponentData} from "../../interface";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import {ComponentState} from "react";
import Tree, {
    mutateTree,
    moveItemOnTree,
    RenderItemParams,
    TreeData,
    TreeItem,
    ItemId,
    TreeSourcePosition, TreeDestinationPosition
} from '@atlaskit/tree';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import {TreeDataHelper} from "../../controllers/treeDataHelper";
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = createStyles({
    root: {
        height: '100%'
    },
    paper: {
        height: '100%',
        borderRadius: 0,
    },
    headerContainer: {
        borderBottom: '1px solid lightgrey',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    headerText: {
        color: 'grey',
        fontWeight: 'bold',
    },
    treeContainer: {
        padding: 5
    }
});

export interface Props extends WithStyles<typeof styles>, ComponentState {
    components: ComponentData[],
    componentsOnUpdate: (components: ComponentData[]) => void,
    componentOnSelect: (componentData: ComponentData) => void,
    setTreeData: (treeData: ComponentData[]) => void,
    selectComponent: (value: ComponentData) => void,
}

interface State {
    treeData: TreeData | undefined,
}

const PADDING_PER_LEVEL = 16;

const getIcon = (
    item: TreeItem,
    onExpand: (itemId: ItemId) => void,
    onCollapse: (itemId: ItemId) => void,
) => {
    if (item.children && item.children.length > 0) {
        return item.isExpanded ? (
            <ExpandMoreIcon onClick={() => onCollapse(item.id)}/>
        ) : (
            <ChevronRightIcon onClick={() => onExpand(item.id)}/>
        );
    }
    return <FiberManualRecordOutlinedIcon/>
};

class ComponentTreeView extends React.Component<Props, object> {
    state: State = {
        treeData: undefined,
    };

    componentDidMount(): void {
        const treeData = this.getTreeData();
        this.setState({treeData});
    }

    renderTreeItem = ({ item, onExpand, onCollapse, provided }: RenderItemParams) => {
        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <ListItem>
                    <ListItemIcon>
                        {getIcon(item, onExpand, onCollapse)}
                    </ListItemIcon>
                    <ListItemText primary={item.data ? item.data.title : ''}/>
                </ListItem>
            </div>
        );
    };

    onTreeItemExpand = (itemId: ItemId) => {
        const { treeData } = this.state;
        if (!treeData) return;
        this.setState({
            treeData: mutateTree(treeData, itemId, { isExpanded: true }),
        });
    };

    onTreeItemCollapse = (itemId: ItemId) => {
        const { treeData } = this.state;
        if (!treeData) return;
        this.setState({
            treeData: mutateTree(treeData, itemId, { isExpanded: false }),
        });
    };

    getTreeData = ():TreeData => {
        const {components} = this.props;
        return new TreeDataHelper().convertComponentsToTreeData(components);
    };

    onDragEnd = (
        source: TreeSourcePosition,
        destination?: TreeDestinationPosition,
    ) => {
        const { treeData } = this.state;
        if (!treeData) return;
        if (!destination) {
            return;
        }
        const newTree = moveItemOnTree(treeData, source, destination);
        this.setState({
            treeData: newTree,
        });
    };

    render() {
        const {classes} = this.props;
        const {treeData} = this.state;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <div className={classes.headerContainer}>
                        <Typography variant={"subtitle2"} className={classes.headerText}>COMPONENTS</Typography>
                    </div>
                    <div className={classes.treeContainer}>
                        {!!treeData &&
                        <Tree
                            tree={treeData}
                            renderItem={this.renderTreeItem}
                            onExpand={this.onTreeItemExpand}
                            onCollapse={this.onTreeItemCollapse}
                            onDragEnd={this.onDragEnd}
                            isDragEnabled={true}
                            offsetPerLevel={PADDING_PER_LEVEL}
                        />
                        }
                    </div>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return state.components;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ComponentsAction>) => {
    return {
        setTreeData: (treeData: ComponentData[]) => dispatch(actions.setTreeData(treeData)),
        selectComponent: (value: ComponentData) => dispatch(actions.selectComponent(value)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ComponentTreeView));
