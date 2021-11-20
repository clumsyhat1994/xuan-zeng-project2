import React from "react";
import './Result.css'
import { useSelector } from 'react-redux';
import { NUM_OF_SHIP_TILES } from '../Constants';


export default function Result() {
    const playerBoard = useSelector(state => state.boardTiles[0]);
    const computerBoard = useSelector(state => state.boardTiles[1]);

    function isWon(board) {
        let hitCount = 0;
        board.forEach(tile => {
            if (tile.className.includes('hit')) {
                hitCount++;
            }
        });
        return (hitCount === NUM_OF_SHIP_TILES);
    }
    if (isWon(computerBoard)) {
        return (
            <div id='result'>
                <h1>Game over! You won!</h1>
            </div>
        );
    }

    if (isWon(playerBoard)) {
        return (
            <div id='result'>
                <h1>Game over! Computer won!</h1>
            </div>
        );
    }
    return (<div id='result'><h1></h1></div>);

}
