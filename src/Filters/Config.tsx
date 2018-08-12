export enum FilterType {
    EMPTY,
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
    EMPTY,
    AGE,
    GENDER,
    NAME,
    BIRTHDAY,
    INTERESTS
}

export enum FieldTypes {
    NONE,
    TEXT,
    NUMBER,
    DATE,
    RADIO,
    CHECKBOX
}

export enum BlockTypes {
    AND,
    OR
}

interface IFieldTypeMapping {
    [index: number]: FieldTypes
}


interface ITypeMapping {
    [index: number]: FilterType[]
}

export class Config {

    private static fieldTypeMapping: IFieldTypeMapping = {
        [FilterFields.EMPTY]: FieldTypes.NONE,
        [FilterFields.NAME]: FieldTypes.TEXT,
        [FilterFields.AGE]: FieldTypes.NUMBER,
        [FilterFields.GENDER]: FieldTypes.RADIO,
        [FilterFields.BIRTHDAY]: FieldTypes.DATE,
        [FilterFields.INTERESTS]: FieldTypes.CHECKBOX,
    };

    private static typeFilters: ITypeMapping = {
        [FieldTypes.NONE]: [],
        [FieldTypes.TEXT]: [FilterType.EMPTY, FilterType.EQUALS_TO, FilterType.NOT_EQUALS_TO, FilterType.CONTAINS, FilterType.NOT_CONTAINS],
        [FieldTypes.NUMBER]: [FilterType.EMPTY, FilterType.EQUALS_TO, FilterType.NOT_EQUALS_TO, FilterType.LOWER_THAN, FilterType.GREATER_THAN],
        [FieldTypes.DATE]: [FilterType.EMPTY, FilterType.EQUALS_TO, FilterType.NOT_EQUALS_TO, FilterType.LOWER_THAN, FilterType.GREATER_THAN],
        [FieldTypes.RADIO]: [FilterType.EMPTY, FilterType.RADIO],
        [FieldTypes.CHECKBOX]: [FilterType.EMPTY, FilterType.CHECKBOX],
    };

    private static fields = {
        [FilterFields.EMPTY]: '',
        [FilterFields.NAME]: 'Name',
        [FilterFields.AGE]: 'Age',
        [FilterFields.GENDER]: 'Gender',
        [FilterFields.BIRTHDAY]: 'Birthday',
        [FilterFields.INTERESTS]: 'Interests',
    };

    private static filters = {
        [FilterType.EMPTY]: '',
        [FilterType.LOWER_THAN]: 'Lower than',
        [FilterType.EQUALS_TO]: 'Equals to',
        [FilterType.NOT_EQUALS_TO]: 'Not equals to',
        [FilterType.GREATER_THAN]: 'Greater than',
        [FilterType.CONTAINS]: 'Contains',
        [FilterType.NOT_CONTAINS]: 'Not contains',
        [FilterType.RADIO]: 'Radio',
        [FilterType.CHECKBOX]: 'Checkbox',
    };

    private static blockTypes = {
        [BlockTypes.AND]: 'And',
        [BlockTypes.OR]: 'Or',
    };

    private static radioChoices = {
        [FilterFields.GENDER]: {'m': 'Male', 'f': 'Female'}
    };

    private static checkboxChoices = {
        [FilterFields.INTERESTS]: {'1': 'Football', '2': 'Books'}
    };

    public static getFieldConstant(field: string): FilterFields {
        return typeof FilterFields[field] !== "undefined" ?
            parseInt(FilterFields[FilterFields[field]], 10) : FilterFields.EMPTY;
    }

    public static getFields() {
        return this.fields;
    }

    public static getBlockTypes() {
        return this.blockTypes
    }

    public static getFilterChoicesForField(field: FilterFields) {
        const type: FieldTypes = this.fieldTypeMapping[field];
        const filters: FilterType[] = this.typeFilters[type];
        const output = {};
        filters.forEach(value => output[value] = this.filters[value]);
        return output;
    }

    public static getFieldType(field: FilterType): FieldTypes {
        return this.fieldTypeMapping[field];
    }

    public static getFilterConstForValue(field: FilterFields, filter: string) {
        const filters = this.typeFilters[this.fieldTypeMapping[field]];
        let constant: FilterType = FilterType.EMPTY;

        filters.forEach(filterItem => {
            if (filterItem.toString() === filter.toString()) {
                constant = filterItem;
            }
        });
        return constant;
    }

    public static getRadioChoices(field: FilterFields) {
        return typeof this.radioChoices[field] !== 'undefined' ? this.radioChoices[field] : {};
    }

    public static getCheckboxChoices(field: FilterFields) {
        return typeof this.checkboxChoices[field] !== 'undefined' ? this.checkboxChoices[field] : {};
    }

    public static isValidCheckboxOption(field: FilterFields, value: any) {
        const checkboxChoices = this.getCheckboxChoices(field);
        return Object.keys(checkboxChoices).indexOf(value) !== -1;
    }

    public static isValidRadioOption(field: FilterFields, value: any) {
        const radioChoices = this.getRadioChoices(field);
        return Object.keys(radioChoices).indexOf(value) !== -1;
    }
}