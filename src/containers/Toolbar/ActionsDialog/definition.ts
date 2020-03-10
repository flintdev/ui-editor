import {Form} from "../../../components/DialogForm";

export const AddActionDef: Form[] = [
    {
        type: "input",
        key: "name",
        label: "Action Name",
        required: true,
        autofocus: true,
    }
];