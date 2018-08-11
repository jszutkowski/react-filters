import * as React from "react";
import {Block} from "./Block";
import {FilterFields, FilterType} from "./Config";
const uuidv4 = require('uuid/v4');

export interface IFilterConfig {
    config: IFilterProps,
    isFirst: boolean,
    onRemoveFromParent?: any
}

export interface IFilterProps {
    uuid: string,
    blockType: number;
    blocks: IFilterProps[],
    fields: any[]
}


export function createConfig(): IFilterProps {
    return {
        blockType: -1,
        blocks: [],
        fields: [],
        uuid: uuidv4()
    }
}

export interface IFieldProps {
    field: FilterFields | null,
    filter: FilterType | null,
    value: any
    uuid: string,
}

export interface IFieldConfigProps {
    config: IFieldProps
}

export function createFieldConfig(): IFieldProps {
    return {
        field: null,
        filter: null,
        uuid: uuidv4(),
        value: null
    }
}

export class Filters extends React.Component<{}, {}> {

    private config: IFilterProps = createConfig();

    constructor(props: any) {
        super(props);
    }

    public render() {
        global.console.log('----');
        global.console.log(this.config);
        global.console.log('++++');
        return <Block config={this.config} isFirst={true} />;
    }
}