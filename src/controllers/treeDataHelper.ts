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
    getWidgetConfig: (name: string) => any;
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

    convertTreeDataToComponents = (treeData: TreeData, components: ComponentData[], getWidgetConfig: (name: string) => any): ComponentData[] => {
        const {rootId, items} = treeData;
        this.getWidgetConfig = getWidgetConfig;
        return this.recurToGetChildren(rootId as string, items, components, undefined);
    };

    private getDefaultTag = (name: string) => {
        if (!this.getWidgetConfig) return;
        const configData = this.getWidgetConfig(name);
        return _.get(configData, ['canvas', 'defaultTag']);
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
            const newItem = this.updateHiddenInItem(item, stateJson);
            newComponents.push(newItem);
        }
        return newComponents;
    };

    private recurToHideChildren = (componentData: ComponentData, stateJson: any): ComponentData[] => {
        if (!componentData.children) return [];
        return componentData.children.map((item) => {
            return this.updateHiddenInItem(item, stateJson);
        });
    };

    private updateHiddenInItem = (item: ComponentData, stateJson: any) => {
        if (Object.keys(stateJson).length === 0) item.hidden = false;
        else if (!!item.display && item.display.type === "conditional") {
            const statePath = item.display.state;
            const value = item.display.value;
            if (!statePath || !value) item.hidden = true;
            else item.hidden = this.getValueByPath(statePath, stateJson) !== value;
        } else item.hidden = false;
        item.children = this.recurToHideChildren(item, stateJson);
        return item;
    };

    private getValueByPath = (path: string, data: any) => {
        const pathList = path.split('.').slice(1);
        return _.get(data, pathList);
    };

    private recurToGetChildren = (parentId: string, items: Items, componentChildren: ComponentData[], defaultTag?: string): ComponentData[] => {
        const itemChildIds = items[parentId].children;
        const newComponents: ComponentData[] = [];
        let tempIds: any[] = [];
        for (const itemId of itemChildIds) {
            for (const component of componentChildren) {
                const {id, hidden} = component;

                if (!!hidden) {
                    if (!tempIds.includes(id)) {
                        newComponents.push(component);
                        tempIds.push(id);
                    }
                } else {
                    if (itemId === id) {
                        if (!!defaultTag) component.tag = defaultTag;
                        component.children = !!component.children ? component.children : [];
                        component.children = this.recurToGetChildren(id, items, component.children, this.getDefaultTag(component.name));
                        newComponents.push(component);
                        tempIds.push(id);
                    }
                }
            }
        }
        for (const itemId of itemChildIds) {
            if (!tempIds.includes(itemId)) {
                const {data} = items[itemId];
                const name = data.title;
                let componentData = {
                    ...data.props,
                    id: itemId,
                    name
                };
                if (!!defaultTag) componentData.tag = defaultTag;
                // next default tag
                // defaultTag = this.getDefaultTag(name);
                componentData.children = this.recurToGetChildren(itemId as string, items, data.props.children, this.getDefaultTag(name));
                newComponents.push(componentData);
                tempIds.push(itemId);
            }
        }
        return newComponents;
    };

    convertComponentsToTreeData = (components: ComponentData[]): TreeData => {
        let items: Items = {};
        for (let i=0;  i<components.length; i++) {
            const component = components[i];
            this.recurToGetItems(component, items, [i]);
        }
        items['root'] = {
            id: 'root',
            children: components.filter(componentData => !componentData.hidden).map(componentData => componentData.id),
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
        let {id, name, children, hidden} = componentData;
        if (!!hidden) return;
        children = !!children ? children : [];
        items[id] = {
            id: id,
            children: children.filter(componentData => !componentData.hidden).map(componentData => componentData.id),
            isExpanded: true,
            data: {
                title: name,
                path: [...path],
                overlay: componentData.overlay,
                props: {...componentData},
            }
        };
        for (let i=0;  i<children.length; i++) {
            this.recurToGetItems(children[i], items, [...path, 'children', i]);
        }
    };
}