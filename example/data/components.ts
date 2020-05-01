// example/data/components.ts

import {ComponentData} from "../../src/interface";

export const componentsExample: ComponentData[] = [
    {
        id: "0",
        name: 'material-widgets::Page',
        params: {
            layout: 'header-content',
            color: "#ffffff"
        },
        children: [
            {
                id: '0-1',
                name: 'material-widgets::Dialog',
                params: {
                    status: 'closed',
                    size: 'md',
                    title: 'Dialog Title'
                },
                children: [],
                overlay: true,
                tag: 'page-content',
                canvas: {
                    defaultTag: 'dialog-content'
                }
            },
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
                tag: 'page-content',
            },
            {
                id: '2',
                name: 'material-widgets::TableContainer',
                params: {},
                tag: 'page-content',
                children: [
                    {
                        id: '2-1',
                        name: "material-widgets::TableRow",
                        params: {
                            cells: []
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
                },
                tag: 'page-content',
            }
        ]
    },

];