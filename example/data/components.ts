// example/data/components.ts

import {ComponentData} from "../../src/interface";

export const componentsExample: ComponentData[] = [
    {
        id: '1',
        name: 'material-widgets::SimpleTable',
        params: {
            columns: ['title1', 'title2', 'title3'],
            data: [
                ["1-1", "1-2", "1-3"]
            ]
        },
        children: [],
        // hidden: true,
    },
    {
        id: '2',
        name: 'material-widgets::TableContainer',
        params: {

        },
        children: [
            {
                id: '2-1',
                name: "material-widgets::TableRow",
                params: {
                    cells: [

                    ]
                },
                children: [],
            }
        ],
    },
    {
        id: '3',
        name: 'material-widgets::NavBar',
        params: {
            bgColor: '#FFFFFF',
            titleColor: '#000000'
        }
    }
];