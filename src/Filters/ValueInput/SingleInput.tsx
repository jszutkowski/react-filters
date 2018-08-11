import * as React from "react";
import {Config, FieldTypes} from "../Config";

export default function SingleInput(props: any) {

    if (!props.currentField || props.currentFilter === -1) {
        return null;
    }

    const fieldType = Config.getFieldType(props.currentField);
    let inputType;

    switch(fieldType) {
        case FieldTypes.TEXT:
        case FieldTypes.DATE:
            inputType = "text";
            break;
        case FieldTypes.NUMBER:
            inputType = "number";
            break;
        default:
            inputType = "";
    }

    if (inputType === "") {
        return null;
    }
    global.console.log("rendering s")
    return <input type="number" value={props.currentValue} onChange={props.onValueChange} />;
}
