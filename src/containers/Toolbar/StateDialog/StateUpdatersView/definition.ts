import {Form} from "src/components/DialogForm";

export const AddStateUpdaterDef: Form[] = [
    {
        type: "input",
        key: "name",
        label: "Updater Name",
        required: true,
        autofocus: true,
    }
];