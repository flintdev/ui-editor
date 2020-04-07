// src/controllers/treeDataHelper.ts

import {ComponentData} from "../interface";
// @ts-ignore
import {TreeData, TreeItem} from "@atlaskit/tree";
import * as _ from 'lodash';

interface Items {
    [key: string]: TreeItem
}

type Path = Array<string|number>;

export class TreeDataHelper {
    constructor() {

    }

    updateComponentData = (params: any, events: any, display: any, repeat: any, componentPath: Path, components: ComponentData[]) => {
        _.set(components, [...componentPath, 'params'], params);
        _.set(components, [...componentPath, 'events'], events);
        _.set(components, [...componentPath, 'display'], display);
        _.set(components, [...componentPath, 'repeat'], repeat);
        return components;
    };

    getComponentDataByTreeItem = (components: ComponentData[], item: TreeItem) => {
        const path = item.data.path;
        let componentData = _.get(components, path);
        componentData['path'] = path;
        return componentData;
    };

    getTreeItemById = (treeData: TreeData, id: string): TreeItem => {
        return treeData.items[id];
    };

    convertTreeDataToComponents = (treeData: TreeData): ComponentData[] => {
        const {rootId, items} = treeData;
        return this.recurToGetChildren(rootId as string, items);
    };

    mergeComponents = (originalComponents: ComponentData[], filteredComponents: ComponentData[]) => {
        // 1. merge filtered components into original components
        // 2. new added components should not change relative position in filtered components
        let idPathMap = {};
        originalComponents.forEach((item, index) => {
            this.recurToGetIdPathMap(idPathMap, [index], item);
        })
    };

    private recurToGetIdPathMap = (idPathMap: any, path: Path, componentData: ComponentData) => {
        const {id, children} = componentData;
        idPathMap[id] = path;
        if (!children) return;
        children.forEach((item, index) => {
            this.recurToGetIdPathMap(idPathMap, [...path, 'children', index], item);
        });
    };

    hideComponentsByState = (components: ComponentData[], stateJson: any): ComponentData[] => {
        const newComponents: ComponentData[] = [];
        for (let item of components) {
            if (!!item.display && item.display.type === "conditional") {
                const statePath = item.display.state;
                const value = item.display.value;
                if (!statePath || !value) item.hidden = true;
                else item.hidden = this.getValueByPath(statePath, stateJson) !== value;
            } else item.hidden = false;
            item.children = this.recurToHideChildren(item, stateJson);
            newComponents.push(item);
        }
        return newComponents;
    };

    private recurToHideChildren = (componentData: ComponentData, stateJson: any): ComponentData[] => {
        if (!componentData.children) return [];
        return componentData.children.map((item) => {
            if (!!item.display && item.display.type === "conditional") {
                const statePath = item.display.state;
                const value = item.display.value;
                if (!statePath || !value) item.hidden = true;
                else item.hidden = this.getValueByPath(statePath, stateJson) !== value;
            } else item.hidden = false;
            item.children = this.recurToHideChildren(item, stateJson);
            return item;
        });

    };

    private getValueByPath = (path: string, data: any) => {
        const pathList = path.split('.').slice(1);
        return _.get(data, pathList);
    };

    private recurToGetChildren = (parentId: string, items: Items): ComponentData[] => {
        const {children} = items[parentId];
        if (!children) return [];
        return children.map((childId: string) => {
            const {data} = items[childId];
            return {
                id: childId,
                name: data.title,
                params: data.params,
                children: this.recurToGetChildren(childId, items)
            }
        });
    };

    convertComponentsToTreeData = (components: ComponentData[]): TreeData => {
        let items: Items = {};
        for (let i=0;  i<components.length; i++) {
            const component = components[i];
            this.recurToGetItems(component, items, [i]);
        }
        items['root'] = {
            id: 'root',
            children: components.map(componentData => componentData.id),
            isExpanded: true,
            data: {
                title: 'Root',
                path: [],
            }
        };
        return {
            rootId: 'root',
            items,
        }
    };

    private recurToGetItems = (componentData: ComponentData, items: Items, path: Path) => {
        let {id, name, params, children} = componentData;
        children = !!children ? children : [];
        items[id] = {
            id: id,
            children: children.map(componentData => componentData.id),
            isExpanded: true,
            data: {
                title: name,
                path: [...path],
                params,
            }
        };
        for (let i=0;  i<children.length; i++) {
            this.recurToGetItems(children[i], items, [...path, 'children', i]);
        }
    };
}