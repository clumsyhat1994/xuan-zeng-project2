import React, { useContext } from "react";
import { useDispatch } from 'react-redux';
import { restart } from "../actions/actions";
import { gameModeContext } from "../App";
export default function RestartBtn() {
    const gameMode = useContext(gameModeContext);
    const dispatch = useDispatch();
    function handleClick() {
        dispatch(restart(gameMode));
    }
    return (
        <button id='restartBtn' onClick={handleClick}>Restart</button>
    );
}