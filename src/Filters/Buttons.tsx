import * as React from "react";

interface IButtonsProps {
    onBlockAdd: any,
    onBlockRemove: any,
    onFieldAdd: any,
    isFirstBlock: boolean
}

export class Buttons extends React.Component<IButtonsProps> {
    public render() {
        return <div className="block-buttons">
            <button onClick={this.props.onBlockAdd} className={"btn btn-primary btn-sm"}>Block</button>
            <button onClick={this.props.onFieldAdd} className={"btn btn-success btn-sm"}>Field</button>
            {!this.props.isFirstBlock &&
            <button onClick={this.props.onBlockRemove} className={"btn btn-danger btn-sm float-right"}>Delete</button>}
        </div>;
    }
}