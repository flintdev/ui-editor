import {Form} from "../../../../components/DialogForm";

export const AddKeyValueDef: Form[] = [
    {
        type: "input",
        key: "key",
        label: "Key",
        required: true,
        autofocus: true,
    },
    {
        type: "input",
        key: "value",
        label: "Value",
        required: true,
        multiline: true,
    }
];