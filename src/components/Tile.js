import React from "react";
import './Tile.css';
import { useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { computerGo, playerClick } from "../actions/actions";
import Icon from "./Icon";
import { gameModeContext } from '../App'
export function Tile(props) {
    //const gameState = useSelector(state => state.gameState);
    const winner = useSelector(state => state.boardTiles.winner);
    const gameMode = useContext(gameModeContext);
    const dispatch = useDispatch();
    function handleClick() {
        if (winner || props.user === 'player' || props.className.includes('selected')) {
            return;
        }
        dispatch(playerClick(props.id, props.user));
        if (gameMode === 'normal') {
            //dispatch(nextUser());
            dispatch(computerGo());
            //dispatch(nextUser());
        }
    }

    return (
        <div className={props.className} onClick={handleClick}>
            <Icon state={props.className} />
        </div>
    );
}