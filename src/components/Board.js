import React, {useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import './Board.css';
import { Tile } from "./Tile";
import {initiatePlayerBoard,initiateFreeBoard,initiateComputerBoard } from "../actions/actions";
import { NUM_OF_SHIP_TILES } from "../Constants";
export function Board(props) {
    const tiles = useSelector(state => {
        if (props.user === 'player') {
            return state.boardTiles[0];
        } else {
            return state.boardTiles[1];
        }
    });
    
    const dispatch = useDispatch();
    
    function isWon(board) {
        let hitCount = 0;
        board.forEach(tile => {
            if (tile.className.includes('hit')) {
                hitCount++;
            }
        });
        return (hitCount === NUM_OF_SHIP_TILES);
    }

    const won = isWon(tiles);


    useEffect(() => {
        if(props.mode==='freeplay'){
            console.log('free!!!!');
            dispatch(initiateFreeBoard());
        }else{
            if(props.user==='player'){
                dispatch(initiatePlayerBoard());
            }
            else if(props.user==='computer'){
                dispatch(initiateComputerBoard());
            }
        }
    }, []);

    const tileList = tiles.map(tile => {
        let className = tile.className;
        className += ' '+ props.user;
        
        if(props.user !== 'player'){
            className += ' hidden';
        }
        
        if(won){
            className += ' terminated';
        }
        return (
            <Tile id={tile.id} key={tile.id} isOccupied={tile.isOccupied} 
            className={className} state={tile.state} user={props.user}/>
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



 /*
        function generateRandomeStartAndRandomDirection() {
            const randomShipDirection = Math.floor(Math.random() * 2);
            const randomStart = Math.floor(Math.random() * 100);
            return [randomShipDirection, randomStart];
        }
    
        function generateShip(ship, updatedTiles) {
            //console.log('in the fuction!!!!!!!!' + updatedTiles + ship);
            console.log(updatedTiles);
            let [randomShipDirection, randomStart] = generateRandomeStartAndRandomDirection();
            let shipTiles = [];
            console.log('the random number is' + randomShipDirection);
            while (((randomShipDirection === 0 && (randomStart % 10 + ship.length - 1) > 9)) || (randomShipDirection === 1 && (randomStart + 10 * ship.length) > 99)) {
                [randomShipDirection, randomStart] = generateRandomeStartAndRandomDirection();
            }
    
            if (randomShipDirection === 0) {
                shipTiles = updatedTiles.slice(randomStart, randomStart + ship.length);
                console.log(shipTiles + '??????????????????????????????');
            } else {
                for (let i = 0; i < ship.length; i++) {
                    shipTiles.push(updatedTiles[randomStart + 10 * i]);
                }
            }
            console.log(shipTiles[0] + '!!!!!!!!!!!!!!!!!!!!!!!');
            //console.log('random start ' + randomStart);
    
            if (shipTiles.some(tile => tile.occupied === true)) {
                console.log('loop!!!!!!!!!!!!!!');
                updatedTiles = generateShip(ship, updatedTiles);
            } else {
                updatedTiles = updatedTiles.map(tile => {
                    //console.log('tile id' + tile.id);\
                    shipTiles.forEach(shipTile => {
                        //console.log('shipid ' + shipTile.id + ' tileid ' + tile.id);
                        if (shipTile.id === tile.id) {
                            tile = { id: tile.id, key: tile.id, occupied: true, className: ship.name + ' tile' };
                        }
                        //console.log('unchanged!!!!!' + tile.className);
                    });
                    return tile;
                });
                //console.log(updatedTiles);
                //setTiles(updatedTiles);     
            }
            return updatedTiles;
        }
    */

