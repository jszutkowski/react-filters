import * as React from "react";
import {Config, FieldTypes} from "./Config";
import {IFieldProps} from "./Filters";
import Randomizer from "./Randomizer";

export interface IFieldDataProps {
    data: IFieldProps,
    onRemoveFieldFromParent: any
}

interface IState {
    fields: any,
    filters: any,
    value: any,
    checkboxValues: any[],
    valueField: any,
    selectedField: number
    selectedFilter: any
}

export class Field extends React.Component<IFieldDataProps, IState> {

    private config: Config;

    constructor(props: IFieldDataProps){
        super(props);
        this.state = {
            checkboxValues: [],
            fields: '',
            filters: '',
            selectedField: -1,
            selectedFilter: -1,
            value: '',
            valueField: '',
        };
        this.config = new Config();

        this.selectField = this.selectField.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.removeFieldClick = this.removeFieldClick.bind(this);
    }

    public componentDidMount() {
        this.setFieldsSelectOptions();

    }

    public render() {
        return <div className="block-field">
            <div>
                <button onClick={this.removeFieldClick}>X</button>
            </div>
            <div>
                <select onChange={this.selectField} value={this.state.selectedField}>
                    {this.state.fields}
                </select>
            </div>
            {this.state.filters}
            {this.state.valueField}
        </div>;
    }

    private setFieldsSelectOptions() {
        const fields = this.config.getFields();
        const keys = Object.keys(fields);

        this.setState({
            fields: keys.map((key) => <option key={key} value={key}>{fields[key]}</option>)
        });
    }

    private selectField(event: any) {
        if (!this.config.isFieldOnList(event.target.value)) {
            return;
        }

        this.setState({
            checkboxValues: [],
            selectedField: event.target.value,
            selectedFilter: -1,
            value: '',
            valueField: ''
        });

        this.props.data.field = event.target.value;
        this.props.data.filter = null;
        this.props.data.value = null;

        this.createFilters(event.target.value);
    }

    private selectFilter(event: any) {

        const selectedFilter = event.target.value;

        if (selectedFilter !== -1 && !this.config.isFilterValid(this.state.selectedField, selectedFilter)) {
            return
        }

        this.setState({
            selectedFilter,
            value: ''
        });

        this.props.data.filter = event.target.value;
        this.props.data.value = null;
        // this.createValueField();
    }

    private createFilters(field: string) {
        const filters = this.config.getFilterChoicesForField(parseInt(field, 10));
        const keys = Object.keys(filters);
        const options = keys.map((key) => <option key={'filter_' + key} value={key}>{filters[key]}</option>);
        options.unshift(<option key={'filter_empty'} value={-1} />);

        this.setState({
            filters: <div><select onChange={this.selectFilter}>{options}</select></div>,
            selectedFilter: -1,
            value: ''
        });
    }

    private createValueField() {

        const selectedField = this.config.getFieldType(this.state.selectedField);

        let valueField: any = '';
        const namePrefix = Randomizer.getRandomNamePrefix();

        switch (+selectedField) {
            case FieldTypes.RADIO:

                const choices = this.config.getRadioChoices(this.state.selectedField);
                const choicesKeys = Object.keys(choices);

                valueField = <div>
                    {choicesKeys.map(key => (
                        <div key={namePrefix + "_" + key}>
                            <label >{choices[key]}</label>
                            <input type="radio" name={namePrefix} value={key} onChange={this.onRadioChange} />
                        </div>
                    ))}
                    </div>;
                break;
            case FieldTypes.CHECKBOX:

                const checkboxValues = this.config.getCheckboxChoices(this.state.selectedField);
                const checkboxKeys = Object.keys(checkboxValues);

                valueField = <div>
                    {checkboxKeys.map(key => (
                        <div key={namePrefix + "_" + key}>
                            <label >{checkboxValues[key]}</label>
                            <input type="checkbox" name={namePrefix} value={key} onChange={this.onCheckboxChange} />
                        </div>
                    ))}
                </div>;
                break;
            case FieldTypes.NUMBER:
                valueField = <input type="number" key={namePrefix} value={this.state.value} onChange={this.changeValue}/>;
                break;
            case FieldTypes.TEXT:
                valueField = <input type="text" key={namePrefix} value={this.state.value} onChange={this.changeValue}/>;
                break;
            case FieldTypes.DATE:
                valueField = <input type="text" key={namePrefix} value={this.state.value} onChange={this.changeValue}/>;
                break;
        }

        this.setState({ valueField });
    }

    private changeValue(event: any) {
        const value = event.target.value;
        global.console.log('on change: ' + event.target.value + " ||| " + this.state.value)
        global.console.log(event)
        this.setState({ value })
    }

    private onCheckboxChange(event: any) {
        const isChecked = event.target.checked;
        const value = event.target.value;

        if (!this.config.isValidCheckboxOption(this.state.selectedField, value)) {
            return;
        }

        let checkboxValues = [];

        if (isChecked && this.state.checkboxValues.indexOf(value) === -1) {
            checkboxValues = [...this.state.checkboxValues, value];
        } else if (!isChecked && this.state.checkboxValues.indexOf(value) !== -1) {
            checkboxValues = this.state.checkboxValues.filter(element => element !== value);
        }

        this.setState({
            checkboxValues
        });
    }

    private removeFieldClick() {
        this.props.onRemoveFieldFromParent(this.props.data.uuid);
    }

    private onRadioChange(event: any) {
        const value = event.target.value;

        if (!this.config.isValidRadioOption(this.state.selectedField, value)) {
            return;
        }

        this.setState({
            value
        });
    }
}