import React from "react";
import './Tile.css';
import { useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addTileClass, nextUser } from "../actions/actions";
import Icon from "./Icon";
import { gameModeContext } from '../App'
export function Tile(props) {
    const gameState = useSelector(state => state.gameState);
    const playerBoard = useSelector(state => state.boardTiles[0]);
    const gameMode = useContext(gameModeContext);
    const dispatch = useDispatch();
    function handleClick() {
        if (gameState === null || gameState === 'computer' || props.user === 'player' || props.className.includes('selected')
            || props.className.includes('terminated')) {
            return;
        }

        if (props.isOccupied) {
            dispatch(addTileClass(props.id, 'hit', props.user));
        } else {
            dispatch(addTileClass(props.id, 'missed', props.user));
        }
        dispatch(addTileClass(props.id, 'selected', props.user));

        if (gameMode === 'normal') {
            dispatch(nextUser());
            computerGo();
            //setTimeout(computerGo, 500);
        }
    }

    function computerGo() {
        let randomHit = Math.floor(Math.random() * 100);
        while (playerBoard[randomHit].className.includes('selected')) {
            randomHit = Math.floor(Math.random() * 100);
        }
        clickHelper(randomHit, 'player');
    }

    function clickHelper(tileID, user) {
        if (playerBoard[tileID].isOccupied) {
            dispatch(addTileClass(tileID, 'hit', user));
        } else {
            dispatch(addTileClass(tileID, 'missed', user));
        }
        dispatch(addTileClass(tileID, 'selected', user));
        dispatch(nextUser());
    }

    return (
        <div className={props.className} onClick={handleClick}>
            <Icon state={props.className} />
        </div>
    );
}