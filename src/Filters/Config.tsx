export enum FilterType {
    LOWER_THAN,
    EQUALS_TO,
    NOT_EQUALS_TO,
    GREATER_THAN,
    CONTAINS,
    NOT_CONTAINS,
    RADIO,
    CHECKBOX
}

export enum FilterFields {
    AGE,
    GENDER,
    NAME,
    BIRTHDAY,
    INTERESTS
}

export enum FieldTypes {
    TEXT,
    NUMBER,
    DATE,
    RADIO,
    CHECKBOX
}

interface IFieldTypeMapping {
    [index: number] : FieldTypes
}


interface ITypeMapping {
    [index: number] : FilterType[]
}

export class Config {

    private fieldTypeMapping: IFieldTypeMapping = {
        [FilterFields.NAME]: FieldTypes.TEXT,
        [FilterFields.AGE]: FieldTypes.NUMBER,
        [FilterFields.GENDER]: FieldTypes.RADIO,
        [FilterFields.BIRTHDAY]: FieldTypes.DATE,
        [FilterFields.INTERESTS]: FieldTypes.CHECKBOX,
    };

    private typeFilters: ITypeMapping = {
      [FieldTypes.TEXT]: [FilterType.EQUALS_TO, FilterType.NOT_EQUALS_TO, FilterType.CONTAINS, FilterType.NOT_CONTAINS],
      [FieldTypes.NUMBER]: [FilterType.EQUALS_TO, FilterType.NOT_EQUALS_TO, FilterType.LOWER_THAN, FilterType.GREATER_THAN],
      [FieldTypes.DATE]: [FilterType.EQUALS_TO, FilterType.NOT_EQUALS_TO, FilterType.LOWER_THAN, FilterType.GREATER_THAN],
      [FieldTypes.RADIO]: [FilterType.RADIO],
      [FieldTypes.CHECKBOX]: [FilterType.CHECKBOX],
    };

    private fields = {
        [FilterFields.NAME]: 'Name',
        [FilterFields.AGE]: 'Age',
        [FilterFields.GENDER]: 'Gender',
        [FilterFields.BIRTHDAY]: 'Birthday',
        [FilterFields.INTERESTS]: 'Interests',
    };

    private filters = {
        [FilterType.LOWER_THAN]: 'Lower than',
        [FilterType.EQUALS_TO]: 'Equals to',
        [FilterType.NOT_EQUALS_TO]: 'Not equals to',
        [FilterType.GREATER_THAN]: 'Greater than',
        [FilterType.CONTAINS]: 'Contains',
        [FilterType.NOT_CONTAINS]: 'Not contains',
        [FilterType.RADIO]: 'Radio',
        [FilterType.CHECKBOX]: 'Checkbox',
    };

    private radioChoices = {
        [FilterFields.GENDER]: {'m': 'Male', 'f': 'Female'}
    };

    private checkboxChoices = {
        [FilterFields.INTERESTS]: {'1': 'Football', '2': 'Books'}
    };

    public isFieldOnList(field: number) {
        return Object.keys(this.fieldTypeMapping).indexOf(field.toString()) > -1;
    }

    public getFields() {
        return this.fields;
    }

    public getFilterChoicesForField(field: number) {

        if (!this.isFieldOnList(field)) {
            return {};
        }

        const type: FieldTypes = this.fieldTypeMapping[field];
        const filters: FilterType[] = this.typeFilters[type];
        const output = {};
        filters.forEach(value => output[value] = this.filters[value]);
        return output;
    }

    public getFieldType(field: FilterType) {
        return this.fieldTypeMapping[field];
    }

    public getField(field: FilterFields, filter: FilterType) {


    }

    // private getInput(type) {
    //
    //     let type = (type === FieldTypes.TEXT ? 'text' : type === FieldTypes.NUMBER ? 'number' : type === FieldTypes.DATE ? 'text' : '');
    //     let isDateField = type === FieldTypes.DATE;
    //
    //     return <input type={type} />
    // }
    //
    public getRadioChoices(field: number) {
        return typeof this.radioChoices[field] !== 'undefined' ? this.radioChoices[field] : {};
    }

    public getCheckboxChoices(field: number) {
        return typeof this.checkboxChoices[field] !== 'undefined' ? this.checkboxChoices[field] : {};
    }

    public isValidCheckoboxOption(field: number, value: any)
    {
        const checkboxChoices = this.getCheckboxChoices(field);
        return Object.keys(checkboxChoices).indexOf(value) !== -1;
    }

    public isValidRadioOption(field: number, value: any)
    {
        const radioChoices = this.getRadioChoices(field);
        return Object.keys(radioChoices).indexOf(value) !== -1;
    }

}