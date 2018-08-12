import * as React from "react";
import {Config, FieldTypes, FilterType} from "../Config";
import Randomizer from "../Randomizer";
import IMultiInputProps from "./IMultiInputProps";

interface IChecboxInputState {
    value: any[]
}

export default class CheckboxInput extends React.Component<IMultiInputProps, IChecboxInputState> {
    private readonly uniqueName: string;

    constructor(props: IMultiInputProps) {
        super(props);
        this.state = {value: []};
        this.uniqueName = Randomizer.getRandomNamePrefix();
        this.onValueChange = this.onValueChange.bind(this);
    }

    public render() {
        if (!this.isVisible()) {
            return null;
        }

        const checkboxValues = Config.getCheckboxChoices(this.props.currentField);
        const checkboxKeys = Object.keys(checkboxValues);

        return <div>
            {checkboxKeys.map(key => (
                <div key={this.uniqueName + "_" + key}>
                    <label>{checkboxValues[key]}</label>
                    <input type="checkbox" name={this.uniqueName + "_" + key} value={key}
                           onChange={this.onValueChange}/>
                </div>
            ))}
        </div>;
    }

    private isVisible(): boolean {
        return this.props.currentFilter !== FilterType.EMPTY
            && Config.getFieldType(this.props.currentField) === FieldTypes.CHECKBOX;
    }

    private onValueChange(event: any) {
        const isChecked = event.target.checked;
        const value = event.target.value;

        if (!Config.isValidCheckboxOption(this.props.currentField, value)) {
            return;
        }

        const checkboxValues = this.getNewValue(isChecked, value);
        this.setState({value: checkboxValues});
        this.props.onValueChange(checkboxValues);
    }

    private getNewValue(isChecked: boolean, value: any): any[] {
        const previousValue: any[] = this.state.value;

        if (isChecked && previousValue.indexOf(value) === -1) {
            return [...previousValue, value];
        } else if (!isChecked && previousValue.indexOf(value) !== -1) {
            return previousValue.filter(element => element !== value);
        } else {
            return previousValue.slice();
        }
    }
}
