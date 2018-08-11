import * as React from "react";
import {Config, FieldTypes, FilterType} from "../Config";
import Randomizer from "../Randomizer";
import IMultiInputProps from "./IMultiInputProps";

export default class CheckboxInput extends React.Component<IMultiInputProps, {}> {
    private readonly uniqueName: string;

    constructor(props: IMultiInputProps) {
        super(props);
        this.uniqueName = Randomizer.getRandomNamePrefix();
    }

    public render() {
        if (this.props.currentFilter === FilterType.EMPTY) {
            return null;
        }

        if (Config.getFieldType(this.props.currentField) !== FieldTypes.CHECKBOX) {
            return null;
        }

        const checkboxValues = Config.getCheckboxChoices(this.props.currentField);
        const checkboxKeys = Object.keys(checkboxValues);

        return <div>
            {checkboxKeys.map(key => (
                <div key={this.uniqueName + "_" + key}>
                    <label>{checkboxValues[key]}</label>
                    <input type="checkbox" name={this.uniqueName + "_" + key} value={key}
                           onChange={this.props.onValueChange}/>
                </div>
            ))}
        </div>;
    }
}
