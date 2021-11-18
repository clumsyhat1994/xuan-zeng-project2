import React from "react";
import './Tile.css';
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addTileClass, updateTileState, nextUser } from "../actions/actions";
import { NUM_OF_SHIP_TILES } from "../Constants";
import Icon from "./Icon";
import { gameModeContext } from '../App'
export function Tile(props) {
    //console.log(props);
    const gameState = useSelector(state => state.gameState);
    const playerBoard = useSelector(state => state.boardTiles[0]);
    const computerBoard = useSelector(state => state.boardTiles[1]);
    const gameMode = useContext(gameModeContext);
    const dispatch = useDispatch();
    //console.log('render tile');
    //console.log('game state ' + gameState);
    function handleClick() {
        //console.log(gameMode);
        // console.log('click');
        //console.log('game state ' + gameState);
        //console.log('id ' + props.id + 'occupied?' + props.isOccupied);
        if (gameState === null || gameState === 'computer' || props.user === 'player' || props.state !== undefined) {
            return;
        }

        if (props.isOccupied) {
            dispatch(updateTileState(props.id, 'hit', props.user));
        } else {
            dispatch(updateTileState(props.id, 'missed', props.user));
        }
        dispatch(addTileClass(props.id, 'selected', props.user));

        if (gameMode === 'normal') {
            dispatch(nextUser());
            setTimeout(computerGo, 0);
            //console.log('Hooooooo')
        }
    }

    function computerGo() {
        //console.log('game state ' + gameState);
        let randomHit = Math.floor(Math.random() * 100);
        while (playerBoard[randomHit].state !== undefined) {
            randomHit = Math.floor(Math.random() * 100);
        }
        clickHelper(randomHit, 'player');
        //console.log('game state ' + gameState);
    }

    function clickHelper(tileID, user) {
        //console.log('game state ' + gameState);
        if (playerBoard[tileID].isOccupied) {
            dispatch(updateTileState(tileID, 'hit', user));
        } else {
            dispatch(updateTileState(tileID, 'missed', user));
        }
        dispatch(nextUser());
        //console.log('end click');
    }


    //console.log(computerBoard);
    return (
        <div className={`${props.className} ${props.state}`} onClick={handleClick}>
            <Icon state={props.state} />
        </div>
    );
}