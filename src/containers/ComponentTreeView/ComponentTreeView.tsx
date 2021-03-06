// src/containers/ComponentTreeView/ComponentTreeView.tsx

import * as React from 'react';
import {withStyles, WithStyles, createStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {ComponentsState, StoreState} from "../../redux/state";
import * as actions from "../../redux/modules/components/actions";
import {ComponentData} from "../../interface";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
// @ts-ignore
import Tree, {mutateTree, moveItemOnTree, RenderItemParams, TreeData, TreeItem, ItemId, TreeSourcePosition, TreeDestinationPosition} from '@atlaskit/tree';
import {TreeDataHelper} from "../../controllers/treeDataHelper";
import TreeNodeCell from "./TreeNodeCell";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import * as _ from 'lodash';

const styles = createStyles({
    root: {
        height: '100%',
        overflow: 'auto',
    },
    paper: {
        height: '100%',
        borderRadius: 0,
        display: 'flex',
        flexFlow: 'column',
    },
    headerContainer: {
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
        padding: 5,
        flexGrow: 1,
        overflow: 'auto',
    },
    treeSecondaryContainer: {
        height: '100%',
        overflow: 'auto',
    }
});

export interface Props extends WithStyles<typeof styles>, ComponentsState {
    operations: any,
    components: ComponentData[],
    componentsOnUpdate: (components: ComponentData[]) => void,
    componentOnSelect: (componentData: ComponentData) => void,
    selectComponent: (value: ComponentData) => void,
    handler: {
        getWidgetConfig: (name: string) => any;
    }
}

interface State {
    treeData: TreeData | undefined,
    item: TreeItem | undefined,
}

const PADDING_PER_LEVEL = 12;

const getIcon = (
    item: TreeItem,
    onExpand: (itemId: ItemId) => void,
    onCollapse: (itemId: ItemId) => void,
) => {
    if (item.children && item.children.length > 0) {
        return item.isExpanded ? (
            <ArrowDropDownIcon
                fontSize={"small"}
                onClick={() => onCollapse(item.id)}
                style={{color: 'dimgrey'}}
            />
        ) : (
            <ArrowRightIcon
                fontSize={"small"}
                onClick={() => onExpand(item.id)}
                style={{color: 'dimgrey'}}
            />
        );
    }
    return <span/>;
};

class ComponentTreeView extends React.Component<Props, object> {
    state: State = {
        treeData: undefined,
        item: undefined,
    };
    treeDataHelper = new TreeDataHelper();
    componentDidMount(): void {
        this.updateTreeData();
    }

    updateTreeData = () => {
        const {components, componentSelected} = this.props;
        const treeData = this.getTreeData(components);
        this.setState({treeData});
        if (!!componentSelected) {
            const item = this.treeDataHelper.getTreeItemById(treeData, componentSelected.id);
            if (!!item) this.handleTreeItemSelect(item)();
        }
    };

    componentWillMount(): void {
        if (!!this.props.operations) {
            this.props.operations.selectTreeItem = (id: string) => {
                const {treeData} = this.state;
                if (!treeData) return;
                const item = this.treeDataHelper.getTreeItemById(treeData, id);
                this.handleTreeItemSelect(item)();
            };
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<object>, snapshot?: any): void {
        if (
            !_.isEqual(prevProps.components, this.props.components) ||
            !_.isEqual(prevProps.perspectiveDataSelected, this.props.perspectiveDataSelected) ||
            !_.isEqual(prevProps._mark, this.props._mark)
        ) {
            this.updateTreeData();
        }
    }

    renderTreeItem = ({item, onExpand, onCollapse, provided, snapshot}: RenderItemParams) => {
        const itemId = item.id as string;
        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
            >
                <TreeNodeCell
                    isDragging={snapshot.isDragging}
                    text={item.data ? item.data.title.split('::')[1] : ''}
                    overlay={item.data ? item.data.overlay : false}
                    icon={getIcon(item, onExpand, onCollapse)}
                    dragHandleProps={provided.dragHandleProps}
                    onClick={this.handleTreeItemSelect(item)}
                    selected={!!this.state.item && itemId === this.state.item.id}
                />
            </div>
        );
    };

    handleTreeItemSelect = (item: TreeItem) => () => {
        this.setState({item});
        const componentData = this.treeDataHelper.getComponentDataByTreeItem(this.props.components, item);
        this.props.selectComponent(componentData);
        this.props.componentOnSelect(componentData);
    };

    onTreeItemExpand = (itemId: ItemId) => {
        const {treeData} = this.state;
        if (!treeData) return;
        this.setState({
            treeData: mutateTree(treeData, itemId, {isExpanded: true}),
        });
    };

    onTreeItemCollapse = (itemId: ItemId) => {
        const {treeData} = this.state;
        if (!treeData) return;
        this.setState({
            treeData: mutateTree(treeData, itemId, {isExpanded: false}),
        });
    };

    getTreeData = (components: ComponentData[]): TreeData => {
        return this.treeDataHelper.convertComponentsToTreeData(components);
    };

    onDragEnd = (
        source: TreeSourcePosition,
        destination?: TreeDestinationPosition,
    ) => {
        const {treeData} = this.state;
        if (!treeData) return;
        if (!destination) return;
        const newTree = moveItemOnTree(treeData, source, destination);
        this.setState({
            treeData: newTree,
        });
        const components = this.treeDataHelper.convertTreeDataToComponents(newTree, this.props.components, this.props.handler.getWidgetConfig);
        const treeDataUpdated = this.getTreeData(components);
        this.setState({treeData: treeDataUpdated});
        this.props.componentsOnUpdate(components);
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
                        <div className={classes.treeSecondaryContainer}>
                            {!!treeData &&
                            <Tree
                                tree={treeData}
                                renderItem={this.renderTreeItem}
                                onExpand={this.onTreeItemExpand}
                                onCollapse={this.onTreeItemCollapse}
                                onDragEnd={this.onDragEnd}
                                isDragEnabled={true}
                                isNestingEnabled={true}
                                offsetPerLevel={PADDING_PER_LEVEL}
                            />
                            }
                        </div>

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
        selectComponent: (value: ComponentData) => dispatch(actions.selectComponent(value)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ComponentTreeView));
