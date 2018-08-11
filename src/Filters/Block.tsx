import * as React from "react";
import {Buttons} from "./Buttons";
import {Field} from "./Field";
import {createConfig, createFieldConfig, IFilterConfig, IFilterProps} from "./Filters";

interface IState {
    blocks: any[],
    fields: any[],
    blockData: IFilterProps
}

interface IBlockInterface {
    uuid: string,
    config: IFilterProps

}

export class Block extends React.Component<IFilterConfig, IState> {

    constructor(props: IFilterConfig){
        super(props);


        global.console.log('ssss');
        global.console.log(props);

        this.state = {
            blockData: createConfig(),
            blocks: [],
            fields: []
        };
        this.addField = this.addField.bind(this);
        this.addBlock = this.addBlock.bind(this);
        this.removeBlock = this.removeBlock.bind(this);
        this.removeFromParent = this.removeFromParent.bind(this);
    }

    public componentDidMount() {
        global.console.log("componentDidMount");
        this.setState({
            blocks: []
        });
    }

    public render() {
        return <div className="block">
            <div className="block-content">
                {this.state.fields}
                {this.state.blocks}
                </div>
            <Buttons onBlockAdd={this.addBlock} onBlockRemove={this.removeBlock} onFieldAdd={this.addField} isFirstBlock={this.props.isFirst}/>
        </div>;
    }

    private addField() {

        const fieldConfig = createFieldConfig();
        this.props.config.fields.push(fieldConfig);
        this.setState(prevState => ({
            fields: [...prevState.fields, [<Field key={prevState.fields.length + 1} data={fieldConfig} />]]
        }));
    }

    private addBlock() {

        const newConfig = createConfig();
        this.props.config.blocks.push(newConfig);

        // const block = <Block key={this.state.blocks.length + 1} config={newConfig} isFirst={false} />;
        // block.props.onRemoveFromParent = () => this.removeFromParent(block);

        this.setState(prevState => ({
            blocks: [...prevState.blocks,  <Block key={this.state.blocks.length + 1} config={newConfig} isFirst={false} onRemoveFromParent={this.removeFromParent} />]
        }));
    }

    private removeBlock() {
        this.props.config.blocks = this.props.config.blocks.filter(element => element !== this.state.blockData);
        // this.setState({
        //     blocks: []
        // });

        this.props.onRemoveFromParent(this);
    }

    private removeFromParent(block: any) {

global.console.log(this.state.blocks.length + ", " + this.state.blocks.filter(element => block !== element).length);
        this.setState(prevState => ({
            blocks: prevState.blocks.filter(element => block !== element)
        }));

global.console.log('remove from parent');
global.console.log(block);
global.console.log(block.key);
global.console.log(block.props);
    }
}