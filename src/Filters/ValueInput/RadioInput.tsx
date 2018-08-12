import * as React from "react";
import {Config, FieldTypes, FilterType} from "../Config";
import Randomizer from "../Randomizer";
import IMultiInputProps from "./IMultiInputProps";

export default class RadioInput extends React.Component<IMultiInputProps, {}> {
    private readonly uniqueName: string;

    constructor(props: IMultiInputProps) {
        super(props);
        this.uniqueName = Randomizer.getRandomNamePrefix();
        this.onValueChange = this.onValueChange.bind(this);
    }

    public render() {
        if (!this.isVisible()) {
            return null;
        }

        const choices = Config.getRadioChoices(this.props.currentField);
        const choicesKeys = Object.keys(choices);

        return <div>
            {choicesKeys.map(key => (
                <div key={this.uniqueName + "_" + key}>
                    <label>{choices[key]}</label>
                    <input type="radio" name={this.uniqueName} value={key} onChange={this.onValueChange}/>
                </div>
            ))}
        </div>;
    }

    private isVisible(): boolean {
        return this.props.currentFilter !== FilterType.EMPTY
            && Config.getFieldType(this.props.currentField) === FieldTypes.RADIO;
    }

    private onValueChange(event: any) {

        const value = event.target.value;

        if (!Config.isValidRadioOption(this.props.currentField, value)) {
            this.props.onValueChange(null);
        } else {
            this.props.onValueChange(value);
        }
    }
}
