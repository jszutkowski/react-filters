import * as React from "react";
import {Config, FieldTypes, FilterType} from "../Config";
import Randomizer from "../Randomizer";
import IMultiInputProps from "./IMultiInputProps";

export default class RadioInput extends React.Component<IMultiInputProps, {}> {
    private readonly uniqueName: string;

    constructor(props: IMultiInputProps){
        super(props);
        this.uniqueName = Randomizer.getRandomNamePrefix();
    }

    public render() {
        if (this.props.currentFilter === FilterType.EMPTY) {
            return null;
        }

        if (Config.getFieldType(this.props.currentField) !== FieldTypes.RADIO) {
            return null;
        }

        const choices = Config.getRadioChoices(this.props.currentField);
        const choicesKeys = Object.keys(choices);

        return <div>
            {choicesKeys.map(key => (
                <div key={this.uniqueName + "_" + key}>
                    <label >{choices[key]}</label>
                    <input type="radio" name={this.uniqueName} value={key} onChange={this.props.onValueChange} />
                </div>
            ))}
        </div>;
    }
}
