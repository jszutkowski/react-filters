import * as React from "react";
import {Config, FieldTypes, FilterType} from "./Config";
import {IFieldProps} from "./Filters";
import Randomizer from "./Randomizer";
import CheckboxInput from "./ValueInput/CheckboxInput";
import RadioInput from "./ValueInput/RadioInput";
import SingleInput from "./ValueInput/SingleInput";

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
    selectedFilter: FilterType
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
            selectedFilter: FilterType.EMPTY,
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
            <div>
                <SingleInput currentValue={this.state.value} onValueChange={this.changeValue} currentField={this.state.selectedField} currentFilter={this.state.selectedFilter}/>
                <RadioInput currentValue={this.state.value} onValueChange={this.onRadioChange} currentField={this.state.selectedField} currentFilter={this.state.selectedFilter}/>
                <CheckboxInput currentValue={this.state.value} onValueChange={this.onCheckboxChange} currentField={this.state.selectedField} currentFilter={this.state.selectedFilter}/>
            </div>
        </div>;
    }

    private setFieldsSelectOptions() {
        const fields = Config.getFields();
        const keys = Object.keys(fields);

        this.setState({
            fields: keys.map((key) => <option key={key} value={key}>{fields[key]}</option>)
        });
    }

    private selectField(event: any) {
        if (!Config.isFieldOnList(event.target.value)) {
            return;
        }

        this.setState({
            checkboxValues: [],
            selectedField: event.target.value,
            selectedFilter: FilterType.EMPTY,
            value: '',
            valueField: ''
        });

        this.resetData();
        this.createFilters(event.target.value);
    }

    private selectFilter(event: any) {
        const selectedFilter = parseInt(event.target.value, 10);
        this.resetData();

        if (!Config.isFilterValid(this.state.selectedField, selectedFilter)) {
            return;
        }

        this.setState({
            selectedFilter,
            value: null
        });

    }

    private createFilters(field: string) {
        const filters = Config.getFilterChoicesForField(parseInt(field, 10));
        const keys = Object.keys(filters);
        const options = keys.map((key) => <option key={'filter_' + key} value={key}>{filters[key]}</option>);

        this.setState({
            filters: <div><select onChange={this.selectFilter}>{options}</select></div>,
            selectedFilter: FilterType.EMPTY,
            value: ''
        });
    }

    private changeValue(event: any) {
        const value = event.target.value;
        this.setState({ value });
        this.fillData(value);
    }

    private onCheckboxChange(event: any) {
        const isChecked = event.target.checked;
        const value = event.target.value;

        if (! Config.isValidCheckboxOption(this.state.selectedField, value)) {
            return;
        }

        const previousValue: any[] = Array.isArray(this.state.value) ? this.state.value : [];
        let checkboxValues = [];

        if (isChecked && previousValue.indexOf(value) === -1) {
            checkboxValues = [...previousValue, value];
        } else if (!isChecked && previousValue.indexOf(value) !== -1) {
            checkboxValues = previousValue.filter(element => element !== value);
        }

        this.setState({ value: checkboxValues });
        this.fillData(checkboxValues);
    }

    private onRadioChange(event: any) {
        const value = event.target.value;

        if (!Config.isValidRadioOption(this.state.selectedField, value)) {
            return;
        }

        this.setState({ value });
        this.fillData(value);
    }

    private removeFieldClick() {
        this.props.onRemoveFieldFromParent(this.props.data.uuid);
    }

    private fillData(value: any) {
        this.props.data.field = this.state.selectedField;
        this.props.data.filter = this.state.selectedFilter;
        this.props.data.value = value;
    }

    private resetData() {
        this.props.data.field = null;
        this.props.data.filter = null;
        this.props.data.value = null;
    }
}