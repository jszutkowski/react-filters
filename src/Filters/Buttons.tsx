import * as React from "react";
import {IButtonsProps} from "./IButtonsProps";

export class Buttons extends React.Component<IButtonsProps> {
    constructor (props: IButtonsProps){
        super(props);
    }

    public render() {
        return <div className="block-buttons">
            <button onClick={this.props.onBlockAdd}>Block</button>
            <button onClick={this.props.onFieldAdd}>Field</button>
            {!this.props.isFirstBlock && <button onClick={this.props.onBlockRemove}>Delete</button>}
        </div>;
    }
}