// example/data/components.ts

import {ComponentData} from "../../src/interface";

export const componentsExample: ComponentData[] = [
    {
        id: '1',
        name: "Grid",
        params: {},
        children: [
            {
                id: '1-1',
                name: 'Button',
                params: {
                    marginLeft: 50,
                    label: "test button"
                },
                children: [],
            },
            {
                id: '1-2',
                name: 'Grid',
                params: {},
                children: [
                    {
                        id: '1-1-1',
                        name: 'Button',
                        params: {},
                        children: [],
                    },
                    {
                        id: '1-1-2',
                        name: 'Button',
                        params: {},
                        children: [],
                    },
                ]
            },
            {
                id: '1-3',
                name: 'Button',
                params: {},
                children: [],
            },
        ]
    },
    {
        id: '2',
        name: 'Grid',
        params: {},
        children: [
            {
                id: '2-1',
                name: 'Button',
                params: {},
                children: [],
            },
            {
                id: '2-2',
                name: 'Button',
                params: {},
                children: [],
            },
        ]
    },
    {
        id: '3',
        name: 'Grid',
        params: {},
        children: [
            {
                id: '3-1',
                name: 'Button',
                params: {},
                children: [],
            },
            {
                id: '3-2',
                name: 'Button',
                params: {},
                children: [],
            },
        ]
    },
    {
        id: '4',
        name: 'Grid',
        params: {},
        children: [
            {
                id: '4-1',
                name: 'Button',
                params: {},
                children: [],
            },
            {
                id: '4-2',
                name: 'Button',
                params: {},
                children: [],
            },
        ]
    },
    {
        id: '5',
        name: 'Grid',
        params: {},
        children: [
            {
                id: '5-1',
                name: 'Button',
                params: {},
                children: [],
            },
            {
                id: '5-2',
                name: 'Button',
                params: {},
                children: [],
            },
        ]
    },
];