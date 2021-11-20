import { SHIPS, PLAIN_BOARD } from "../Constants";
import { gameOver } from "../actions/actions";
import { NUM_OF_SHIP_TILES } from "../Constants";
export function boardTilesReducer(state = [PLAIN_BOARD, PLAIN_BOARD], action) {
    let newTiles = [];
    switch (action.type) {

        case 'INIT':
            let updatedTiles1 = [...PLAIN_BOARD];
            let updatedTiles2 = [...PLAIN_BOARD];
            SHIPS.forEach((ship) => {
                updatedTiles1 = generateShip(ship, updatedTiles1);
                updatedTiles2 = generateShip(ship, updatedTiles2);
            });
            return [updatedTiles1, updatedTiles2];

        case 'INITCPU':
            if (localStorage.getItem('computerBoard') !== null) {

                return [state[0], JSON.parse(localStorage.getItem('computerBoard'))];
            }
            return [state[0], initHelper('computerBoard')];

        case 'INITPLAYER':
            if (localStorage.getItem('playerBoard') !== null) {
                return [JSON.parse(localStorage.getItem('playerBoard')), state[1]];
            }
            return [initHelper('playerBoard'), state[1]];

        case 'INITFREE':
            if (localStorage.getItem('freeBoard') !== null) {
                return [[], JSON.parse(localStorage.getItem('freeBoard'))];
            }
            return [[], initHelper('freeBoard')];

        case 'RESTART':
            if (action.mode === 'normal') {
                return [initHelper('playerBoard'), initHelper('computerBoard')];
            } else {
                return [[], initHelper('freeBoard')];
            }

        case 'REPLACE':
            return action.payload;

        case 'ADDCLASS':
            if (isGameOver(state)) {
                console.log('game over');
                return [...state];
            }
            if (action.user === 'player') {
                newTiles = [...state[0]];
            }
            else {
                newTiles = [...state[1]];
            }
            newTiles = newTiles.map((tile) => {
                if (tile.id === action.id) {
                    return { ...tile, className: `${tile.className} ${action.payload}` }
                }
                return tile;
            });
            if (action.user === 'player') {
                localStorage.setItem('playerBoard', JSON.stringify(newTiles));
                return [newTiles, state[1]];
            }
            else if (action.user === 'computer') {
                localStorage.setItem('computerBoard', JSON.stringify(newTiles));
                return [state[0], newTiles];
            }
            else {
                localStorage.setItem('freeBoard', JSON.stringify(newTiles));
                return [[], newTiles];
            }

        /*
        case 'UPDATETILESTATE':
            if (isGameOver(state)) {
                return [...state];
            }

            if (action.user === 'player') {
                newTiles = [...state[0]];
            }
            else {
                newTiles = [...state[1]];
            }
            newTiles = newTiles.map((tile) => {
                if (tile.id === action.id) {
                    return { ...tile, state: action.payload }
                }
                return tile;
            });
            if (action.user === 'player') {
                localStorage.setItem('playerBoard', JSON.stringify(newTiles));
                return [newTiles, state[1]];
            }
            else if (action.user === 'computer') {
                localStorage.setItem('computerBoard', JSON.stringify(newTiles));
                return [state[0], newTiles];
            }
            else {
                localStorage.setItem('freeBoard', JSON.stringify(newTiles));
                return [[], newTiles];
            }
            */
        default:
            return state;
    }
}



function initHelper(board) {

    let tiles = [...PLAIN_BOARD];
    SHIPS.forEach((ship) => {
        tiles = generateShip(ship, tiles);
    });
    localStorage.setItem(board, JSON.stringify(tiles));
    //console.log(localStorage.getItem('computerBoard'));
    return tiles;
}


function generateRandomeStartAndRandomDirection() {
    const randomShipDirection = Math.floor(Math.random() * 2);
    const randomStart = Math.floor(Math.random() * 100);
    return [randomShipDirection, randomStart];
}

function generateShip(ship, updatedTiles) {
    //console.log('in the fuction!!!!!!!!' + updatedTiles + ship);
    //console.log(updatedTiles);
    let [randomShipDirection, randomStart] = generateRandomeStartAndRandomDirection();
    let shipTiles = [];
    //console.log('the random number is' + randomShipDirection);
    while (((randomShipDirection === 0 && (randomStart % 10 + ship.length - 1) > 9)) || (randomShipDirection === 1 && (randomStart + 10 * ship.length) > 99)) {
        [randomShipDirection, randomStart] = generateRandomeStartAndRandomDirection();
    }
    //console.log('Got the random numbers!!' + randomShipDirection + ',' + randomStart);

    if (randomShipDirection === 0) {
        shipTiles = updatedTiles.slice(randomStart, randomStart + ship.length);
        //console.log(shipTiles + '??????????????????????????????');
    } else {
        for (let i = 0; i < ship.length; i++) {
            shipTiles.push(updatedTiles[randomStart + 10 * i]);
        }
    }
    //console.log(shipTiles[0] + '!!!!!!!!!!!!!!!!!!!!!!!');
    //console.log('random start ' + randomStart);

    if (shipTiles.some(tile => tile.isOccupied === true)) {
        //console.log('loop!!!!!!!!!!!!!!');
        updatedTiles = generateShip(ship, updatedTiles);
    } else {
        updatedTiles = updatedTiles.map(tile => {
            //console.log('tile id' + tile.id);\
            shipTiles.forEach(shipTile => {
                //console.log('shipid ' + shipTile.id + ' tileid ' + tile.id);
                if (shipTile.id === tile.id) {
                    tile = { id: tile.id, key: tile.id, isOccupied: true, className: ship.name + ' tile' };
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

function isGameOver(state) {
    return isGameOverHelper(state[0]) || isGameOverHelper(state[1])
}

function isGameOverHelper(tiles) {
    let hitCount = 0;
    tiles.forEach(tile => {
        if (tile.state === 'hit') {
            hitCount++;
            //console.log('here????????????')
        }
    });
    if (hitCount === NUM_OF_SHIP_TILES) {
        return true;
    }
    return false;
}