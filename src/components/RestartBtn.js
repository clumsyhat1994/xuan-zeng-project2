import React from "react";
import { useDispatch } from 'react-redux';
import { initiateBoard } from "../actions/actions";
export default function RestartBtn(props) {

    const dispatch = useDispatch();
    function handleClick() {
        dispatch(initiateBoard());
    }
    return (
        <button id='restartBtn' onClick={handleClick}>Restart</button>
    );
}