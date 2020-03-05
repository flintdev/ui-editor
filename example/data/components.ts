// example/data/components.ts

import {ComponentData} from "../../src/interface";

export const componentsExample: ComponentData[] = [
    {
        name: "Grid",
        params: {},
        children: [
            {
                name: 'Button',
                params: {}
            },
            {
                name: 'Grid',
                params: {},
                children: [
                    {
                        name: 'Button',
                        params: {}
                    },
                    {
                        name: 'Button',
                        params: {}
                    },
                ]
            },
            {
                name: 'Button',
                params: {}
            },
        ]
    },
    {
        name: 'Grid',
        params: {},
        children: [
            {
                name: 'Button',
                params: {}
            },
            {
                name: 'Button',
                params: {}
            },
        ]
    },
];