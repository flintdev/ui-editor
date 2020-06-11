// src/controllers/dataConverter.ts

export class DataConverter {
    constructor() {

    }

    convertEditorDataToSchemaData = (editorData: any) => {
        if (!editorData) return [];
        const blockDataMap = this.getBlockDataMap(editorData.blockData);
        return this.getChildrenOfSchemaData('State', blockDataMap);
    };

    getArrayElementSchemaData = (editorData: any, arrayPath: any[]) => {
        if (arrayPath.length === 0) return [];
        const blockDataMap = this.getBlockDataMap(editorData.blockData);
        let nextName = 'State';
        let {refs} = blockDataMap[nextName];
        for (const item of arrayPath) {
            nextName = refs[item];
            refs = blockDataMap[nextName];
        }
        return this.getChildrenOfSchemaData(nextName, blockDataMap);
    };

    private getChildrenOfSchemaData = (refName: string, blockDataMap: any) => {
        let children: any[] = [];
        const data = blockDataMap[refName];
        data.items.forEach(item => {
            const {name, dataType, required} = item;
            if (dataType === "string" || dataType === "integer" || dataType === "boolean" || dataType === "object") {
                children.push({name, dataType, required});
            } else if (dataType === "string[]" || dataType === "integer[]" || dataType === "$ref[]") {
                children.push({name, dataType: 'array', required});
            } else if (dataType === "$ref") {
                const refs = data['refs'];
                const refName = refs[name];
                children.push({
                    name, dataType: 'object', required,
                    children: this.getChildrenOfSchemaData(refName, blockDataMap)
                });
            }
        });
        return children;
    };

    private getBlockDataMap = (blockData: any[]) => {
        let blockDataMap = {};
        for (const data of blockData) {
            blockDataMap[data.name] = data;
        }
        return blockDataMap;
    };
}