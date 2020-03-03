// example/data/components.ts

import {ComponentData} from "../../src/interface";

export const componentsExample: ComponentData[] = [
    {
        id: "1",
        name: "f1",
        params: {},
        children: [
            {
                id: '1-1',
                name: 'f1-1',
                params: {}
            },
            {
                id: '1-2',
                name: 'f1-1',
                params: {},
                children: [
                    {
                        id: '1-2-1',
                        name: 'f1-2-1',
                        params: {}
                    },
                    {
                        id: '1-2-2',
                        name: 'f1-2-2',
                        params: {}
                    },
                ]
            },
            {
                id: '1-3',
                name: 'f1-3',
                params: {}
            },
        ]
    },
    {
        id: '2',
        name: 'f2',
        params: {},
        children: [
            {
                id: '2-1',
                name: 'f2-1',
                params: {}
            },
            {
                id: '2-2',
                name: 'f2-2',
                params: {}
            },
        ]
    },
];