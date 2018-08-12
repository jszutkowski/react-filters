import * as React from "react";
import {Config, FieldTypes, FilterFields, FilterType} from "../Config";

export default function SingleInput(props: any) {

    if (props.currentField === FilterFields.EMPTY || props.currentFilter === FilterType.EMPTY) {
        return null;
    }

    const fieldType = Config.getFieldType(props.currentField);
    let inputType;

    switch (fieldType) {
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

    return <input type={inputType} value={props.currentValue} onChange={props.onValueChange} className="form-control"/>;
}
