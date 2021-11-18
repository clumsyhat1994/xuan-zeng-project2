import React from "react";
import { Board } from "./Board";
export default function BoardContainer(props) {
    if (props.mode === 'normal') {
        return (
            <div id='boards'>
                <Board user='player' key='player' />
                <Board user='computer' key='computer' />
            </div>
        );
    }
    if (props.mode === 'freeplay') {
        return (
            <div id='boards'>
                <Board user='computer' key='computer' />
            </div>
        );
    }
    return (
        <div id='boards'>
            <Board user='computer' key='computer' />
        </div>
    );
}