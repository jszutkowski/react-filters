import * as React from "react";
import {Block} from "./Block";
import {BlockTypes, FilterFields, FilterType} from "./Config";
const uuidv4 = require('uuid/v4');

export interface IFilterConfig {
    config: IFilterProps,
    isFirst: boolean,
    onRemoveBlockFromParent?: any
}

export interface IFilterProps {
    uuid: string,
    blockType: number;
    blocks: IFilterProps[],
    fields: any[]
}


export function createConfig(): IFilterProps {
    return {
        blockType: BlockTypes.AND,
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

export function createFieldConfig(): IFieldProps {
    return {
        field: null,
        filter: null,
        uuid: uuidv4(),
        value: null
    }
}

export class Filters extends React.Component<{}, {currentConfig: {}}> {

    private config: IFilterProps = createConfig();

    constructor(props: any) {
        super(props);

        this.state = {
            currentConfig: {}
        }

        this.refreshConfig = this.refreshConfig.bind(this);
    }

    public render() {

        return <div>
                {this.showConfig()}
                <button onClick={this.refreshConfig}>Refresh</button>
                <Block config={this.config} isFirst={true} />
            </div>;
    }

    private refreshConfig() {
        this.setState({currentConfig : this.config})
    }



    private showConfig(): any {
        return JSON.stringify(this.state.currentConfig);
    }
}