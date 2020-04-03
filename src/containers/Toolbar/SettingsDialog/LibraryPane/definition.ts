import {Form} from "../../../../components/DialogForm";

export const AddLibraryDef: Form[] = [
    {
        type: "input",
        key: "name",
        label: "Name of Library",
        helperText: "must be available in public npm repository.",
        required: true,
        autofocus: true,
    },
    {
        type: "input",
        key: "version",
        label: "Version of Library",
        helperText: "e.g. 1.0.1",
        required: true,
    }
];