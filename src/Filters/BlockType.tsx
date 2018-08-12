import * as React from "react";

export default function BlockType(props: any) {

    const keys = Object.keys(props.blocks);
    const options = keys.map((key) => <option key={'block_' + key} value={key}>{props.blocks[key]}</option>);

    return <select onChange={props.onBlockTypeChanged} value={props.selectedBlock}
                   className="custom-select custom-select-sm block-type">
        {options}
    </select>
}