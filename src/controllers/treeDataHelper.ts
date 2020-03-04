// src/controllers/treeDataHelper.ts

import {ComponentData} from "../interface";
import {TreeData, TreeItem} from "@atlaskit/tree";
import * as _ from 'lodash';

interface Items {
    [key: string]: TreeItem
}

type Path = Array<string|number>;

export class TreeDataHelper {
    constructor() {

    }

    getComponentDataByTreeItem = (components: ComponentData[], item: TreeItem) => {
        const path = item.data.path;
        return _.get(components, path);
    };

    convertComponentsToTreeData = (components: ComponentData[]): TreeData => {
        let items: Items = {};
        for (let i=0;  i<components.length; i++) {
            const component = components[i];
            this.recurToGetItems(component, items, [i]);
        }
        items['root'] = {
            id: 'root',
            children: components.map((_, i) => i),
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
        let {name, children} = componentData;
        const id = path.join('-')!;
        children = !!children ? children : [];
        items[id] = {
            id: id,
            children: children.map((_, i) => `${id}-children-${i}`),
            isExpanded: true,
            data: {
                title: name,
                path: [...path],
            }
        };
        for (let i=0;  i<children.length; i++) {
            this.recurToGetItems(children[i], items, [...path, 'children', i]);
        }
    };
}