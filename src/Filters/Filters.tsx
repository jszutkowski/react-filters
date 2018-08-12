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
    fields: IFieldProps[]
}

export interface IFieldProps {
    field: FilterFields | null,
    filter: FilterType | null,
    value: any
    uuid: string,
}

export interface IFilterState {
    displayData: any
}

export function createConfig(): IFilterProps {
    return {
        blockType: BlockTypes.AND,
        blocks: [],
        fields: [],
        uuid: uuidv4()
    }
}

export function createFieldConfig(): IFieldProps {
    return {
        field: null,
        filter: null,
        uuid: uuidv4(),
        value: null
    }
}

export class Filters extends React.Component<{}, IFilterState> {

    private data: IFilterProps = createConfig();

    constructor(props: any) {
        super(props);

        this.state = {displayData: {}};
        this.refreshConfig = this.refreshConfig.bind(this);
    }

    public render() {

        return <div>
            <Block config={this.data} isFirst={true}/>
            <div>
                <p>{this.showConfig()}</p>
                <button className="btn" onClick={this.refreshConfig}>Refresh</button>
            </div>
        </div>;
    }

    private refreshConfig() {
        const displayData = this.cloneOriginalData(this.data);
        this.setState({displayData})
    }

    private cloneOriginalData(config: IFilterProps) {

        const newConfig: any = {};
        newConfig.blockType = config.blockType;
        newConfig.blocks = [];
        newConfig.fields = [];
        config.blocks.forEach(block => newConfig.blocks.push(this.cloneOriginalData(block)));
        config.fields.forEach(field => {
           const newField = Object.assign({}, field);
           delete newField.uuid;
           newConfig.fields.push(newField)
        });

        return newConfig;
    }

    private showConfig(): any {
        return JSON.stringify(this.state.displayData);
    }
}