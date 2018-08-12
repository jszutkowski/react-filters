import * as React from "react";
import {Config, FilterFields, FilterType} from "./Config";
import {IFieldProps} from "./Filters";
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
    selectedField: FilterFields
    selectedFilter: FilterType
}

export class Field extends React.Component<IFieldDataProps, IState> {

    private config: Config;

    constructor(props: IFieldDataProps) {
        super(props);
        this.state = {
            checkboxValues: [],
            fields: null,
            filters: null,
            selectedField: FilterFields.EMPTY,
            selectedFilter: FilterType.EMPTY,
            value: null
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
        return <div className="block-field row">
            <div className="col-md-4">
                <select onChange={this.selectField} value={this.state.selectedField} className="form-control">
                    {this.state.fields}
                </select>
            </div>
            {this.state.filters}
            <div className="col-md-4">
                <SingleInput currentValue={this.state.value} onValueChange={this.changeValue}
                             currentField={this.state.selectedField} currentFilter={this.state.selectedFilter}/>
                <RadioInput currentValue={this.state.value} onValueChange={this.onRadioChange}
                            currentField={this.state.selectedField} currentFilter={this.state.selectedFilter}/>
                <CheckboxInput currentValue={this.state.value} onValueChange={this.onCheckboxChange}
                               currentField={this.state.selectedField} currentFilter={this.state.selectedFilter}/>
            </div>
            <div className="delete-field">
                <button onClick={this.removeFieldClick} className="btn btn-danger btn-sm">X</button>
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
        const field = Config.getFieldConstant(event.target.value);

        this.setState({
            checkboxValues: [],
            selectedField: field,
            selectedFilter: FilterType.EMPTY,
            value: null
        });

        this.resetData();
        this.createFilters(field);
    }

    private createFilters(field: FilterFields) {
        const filters = Config.getFilterChoicesForField(field);
        const keys = Object.keys(filters);
        const options = keys.map((key) => <option key={'filter_' + key} value={key}>{filters[key]}</option>);

        this.setState({
            filters: options.length > 0 && <div className="col-md-4"><select onChange={this.selectFilter}
                                                                             className="form-control">{options}</select>
            </div>,
            selectedFilter: FilterType.EMPTY,
            value: null
        });
    }

    private selectFilter(event: any) {

        const selectedFilter = Config.getFilterConstForValue(this.state.selectedField, event.target.value);

        this.resetData();
        this.setState({
            selectedFilter,
            value: ''
        });
    }

    private changeValue(event: any) {
        const value = event.target.value;
        this.setState({value});
        this.fillData(value);
    }

    private onCheckboxChange(value: any[]) {
        this.setState({value});
        this.fillData(value);
    }

    private onRadioChange(value: any) {
        if (value === null) {
            this.setState({value: null});
            this.resetData();
        } else {
            this.setState({value});
            this.fillData(value);
        }
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