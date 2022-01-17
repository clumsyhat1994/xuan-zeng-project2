import React from "react";
import './Result.css'
import { useSelector } from 'react-redux';


export default function Result() {
    const winner = useSelector(state => state.boardTiles.winner);
    if (winner === 'player') {
        return (
            <div id='result'>
                <h1>Game over! You won!</h1>
            </div>
        );
    }

    if (winner === 'computer') {
        return (
            <div id='result'>
                <h1>Game over! Computer won!</h1>
            </div>
        );
    }
    return (<div id='result'></div>);

}
