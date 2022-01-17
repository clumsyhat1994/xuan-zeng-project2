import React, { useEffect } from "react";
import { Board } from "./Board";
import { useDispatch } from 'react-redux';
import { initiateFreeBoard, initiateNormal } from "../actions/actions";
export default function BoardContainer(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.mode === 'freeplay') {
            dispatch(initiateFreeBoard());
        } else {
            dispatch(initiateNormal());
        }
    }, []);

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
                <Board user='free' key='free' mode='freeplay' />
            </div>
        );
    }
    return (
        <div id='boards'>
            <Board user='player' key='player' />
            <Board user='computer' key='computer' />
        </div>
    );
}