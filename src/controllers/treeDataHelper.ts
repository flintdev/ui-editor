// src/controllers/treeDataHelper.ts

import {ComponentData} from "../interface";
import {TreeData, TreeItem} from "@atlaskit/tree";

interface Items {
    [key: string]: TreeItem
}

export class TreeDataHelper {
    constructor() {

    }

    convertComponentsToTreeData = (components: ComponentData[]): TreeData => {
        let items: Items = {};
        for (let component of components) {
            this.recurToGetItems(component, items);
        }
        items['root'] = {
            id: 'root',
            children: components.map(item => item.id!),
            isExpanded: true,
            data: {
                title: 'Root'
            }
        };
        return {
            rootId: 'root',
            items,
        }
    };

    private recurToGetItems = (componentData: ComponentData, items: Items) => {
        let {id, name, children} = componentData;
        id = id!;
        children = !!children ? children : [];
        items[id] = {
            id: id,
            children: children.map(item => item.id!),
            isExpanded: true,
            data: {
                title: name,
            }
        };
        for (let component of children) {
            this.recurToGetItems(component, items);
        }
    };
}