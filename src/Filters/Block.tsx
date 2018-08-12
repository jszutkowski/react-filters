import * as React from "react";
import BlockType from "./BlockType";
import {Buttons} from "./Buttons";
import {Config} from "./Config";
import {Field} from "./Field";
import {createConfig, createFieldConfig, IFieldProps, IFilterConfig, IFilterProps} from "./Filters";

interface IState {
    blocks: IFilterProps[],
    fields: IFieldProps[],
}

export class Block extends React.Component<IFilterConfig, IState> {
    private config: Config;

    constructor(props: IFilterConfig) {
        super(props);

        this.state = {
            blocks: [],
            fields: []
        };

        this.config = new Config();
        this.addField = this.addField.bind(this);
        this.addBlock = this.addBlock.bind(this);
        this.removeBlock = this.removeBlock.bind(this);
        this.removeBlockFromParent = this.removeBlockFromParent.bind(this);
        this.removeFieldFromParent = this.removeFieldFromParent.bind(this);
        this.blockTypeChanged = this.blockTypeChanged.bind(this);
    }

    public render() {
        return <div className="block">
            <BlockType onBlockTypeChanged={this.blockTypeChanged} blocks={Config.getBlockTypes()}/>
            <div className="block-content">
                {this.getFields()}
                {this.getBlocks()}
            </div>
            <Buttons onBlockAdd={this.addBlock} onBlockRemove={this.removeBlock} onFieldAdd={this.addField}
                     isFirstBlock={this.props.isFirst}/>
        </div>;
    }

    private getFields(): any {
        return this.state.fields.map(field =>
            <Field key={field.uuid} data={field} onRemoveFieldFromParent={this.removeFieldFromParent}/>
        )
    }

    private getBlocks(): any {
        return this.state.blocks.map(block =>
            <Block key={block.uuid} config={block} isFirst={false}
                   onRemoveBlockFromParent={this.removeBlockFromParent}/>
        )
    }

    private addField() {
        const fieldConfig = createFieldConfig();
        this.props.config.fields.push(fieldConfig);
        this.setState(prevState => ({
            fields: [...prevState.fields, fieldConfig]
        }));
    }

    private addBlock() {
        const newConfig = createConfig();
        this.props.config.blocks.push(newConfig);
        this.setState(prevState => ({
            blocks: [...prevState.blocks, newConfig]
        }));
    }

    private removeBlock() {
        this.props.onRemoveBlockFromParent(this.props.config.uuid);
    }

    private removeBlockFromParent(blockUuid: string) {
        this.props.config.blocks = this.props.config.blocks.filter(element => blockUuid !== element.uuid);
        this.setState(prevState => ({
            blocks: prevState.blocks.filter(element => blockUuid !== element.uuid)
        }));
    }

    private removeFieldFromParent(fieldUuid: string) {
        this.props.config.fields = this.props.config.fields.filter(element => fieldUuid !== element.uuid);
        this.setState(prevState => ({
            fields: prevState.fields.filter(element => fieldUuid !== element.uuid)
        }));
    }

    private blockTypeChanged(event: any) {
        this.props.config.blockType = event.target.value;
    }
}