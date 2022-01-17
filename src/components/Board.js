import React from "react";
import { useSelector } from 'react-redux';
import './Board.css';
import { Tile } from "./Tile";
export function Board(props) {
    const tiles = useSelector(state => {
        if (props.user === 'player') {
            return state.boardTiles.boards[0];
        } else {
            return state.boardTiles.boards[1];
        }
    });

    const tileList = tiles.map(tile => {
        let className = tile.className;
        className += ' ' + props.user;

        if (props.user !== 'player') {
            className += ' hidden';
        }
        return (
            <Tile id={tile.id} key={tile.id} isOccupied={tile.isOccupied}
                className={className} state={tile.state} user={props.user} />
        );
    });

    return (

        <div className='board'>
            <div id='grid'>
                {tileList}
            </div>
        </div>
    );
}


