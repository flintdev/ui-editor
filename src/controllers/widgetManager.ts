// src/controllers/widgetManager.ts

import {ComponentData} from "../interface";
import {Param} from "../components/ParamFormGenerator/interface";
import * as _ from 'lodash';

export class WidgetManager {
    getWidgetConfig: (name: string) => any;
    getWidget: (name: string, props: any) => any;
    getWidgetInfo: (pluginId: string) => any;
    constructor(
        getWidgetConfig: (name: string) => any,
        getWidget: (name: string, props: any) => any,
        getWidgetInfo: (pluginId: string) => any
    ) {
        this.getWidget = getWidget;
        this.getWidgetConfig = getWidgetConfig;
        this.getWidgetInfo = getWidgetInfo;
    }

    getWidgetList = (pluginId: string) => {
        const widgetNameList = this.getWidgetNameList(pluginId);
        let widgetComponentList: any[] = [];
        widgetNameList.forEach(name => {
            const data: any = this.getWidgetData(name);
            widgetComponentList.push({
                name: name,
                data
            });
        });
        return widgetComponentList;
    };

    private getWidgetNameList = (pluginId: string) => {
        if (!pluginId || pluginId === "") return [];
        const widgetInfo = this.getWidgetInfo(pluginId);
        return Object.keys(widgetInfo).sort().map(name => `${pluginId}::${name}`);
    };

    getWidgetData = (name: string): ComponentData => {
        const config = this.getWidgetConfig(name);
        // @ts-ignore
        const {params, canvas} = config;
        let values: any = {};
        params.forEach((param: Param) => {
            param.items.forEach(item => {
                const {key, defaultValue} = item;
                values[key] = defaultValue;
            })
        });
        return {
            id: this.generateUniqueId(),
            name,
            params: values,
            overlay: !!canvas && !!canvas.overlay,
            children: [],
            canvas
        }
    };

    private generateUniqueId = () => {
        const timestamp = (new Date()).getTime().toString(36);
        return `${timestamp}${_.uniqueId()}`;
    };
}