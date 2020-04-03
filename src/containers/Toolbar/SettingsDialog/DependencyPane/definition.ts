import {Form} from "../../../../components/DialogForm";

export const AddDependencyDef: Form[] = [
    {
        type: "select",
        key: "type",
        label: "Type",
        options: ["script"],
        defaultValue: "script",
        required: true,
    },
    {
        type: "select",
        key: "subtype",
        label: "Sub Type",
        options: ["text/javascript"],
        defaultValue: "text/javascript",
        required: true,
    },
    {
        type: "input",
        key: "href",
        label: "HREF",
        required: true,
        autofocus: true,
    },
];