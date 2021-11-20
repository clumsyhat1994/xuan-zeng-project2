import React, { useContext } from "react";
import { useDispatch } from 'react-redux';
import { initiateBoard, restart, initiatePlayerBoard, initiateComputerBoard, initiateFreeBoard } from "../actions/actions";
import { gameModeContext } from "../App";
export default function RestartBtn(props) {
    const gameMode = useContext(gameModeContext);
    const dispatch = useDispatch();
    function handleClick() {
        /*
         if (gameMode === "normal") {
             dispatch(initiatePlayerBoard());
             dispatch(initiateComputerBoard());
         } else if (gameMode === "freeplay") {
             dispatch(initiateFreeBoard());
         }
         */
        dispatch(restart(gameMode));
    }
    return (
        <button id='restartBtn' onClick={handleClick}>Restart</button>
    );
}