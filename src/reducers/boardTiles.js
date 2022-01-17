import { SHIPS, PLAIN_BOARD } from "../Constants";
import { NUM_OF_SHIP_TILES } from "../Constants";
export function boardTilesReducer(state = { boards: [PLAIN_BOARD, PLAIN_BOARD], winner: null }, action) {
    let newTiles = [];
    let winner = null;
    switch (action.type) {
        case 'INIT':
            let player = [];
            let computer = [];

            if (localStorage.getItem('playerBoard')) {
                player = JSON.parse(localStorage.getItem('playerBoard'))
                if (isGameOver(player)) winner = 'computer';
            } else {
                player = initHelper('playerBoard');
            }

            if (localStorage.getItem('computerBoard')) {
                computer = JSON.parse(localStorage.getItem('computerBoard'));
                if (isGameOver(computer)) winner = 'player';
            } else {
                computer = initHelper('computerBoard');
            }
            return {
                boards: [player, computer],
                winner: winner
            };

        case 'INITFREE':
            if (localStorage.getItem('freeBoard') !== null) {
                newTiles = JSON.parse(localStorage.getItem('freeBoard'));
                if (isGameOver(newTiles)) winner = 'player';
                return {
                    boards: [[], newTiles],
                    winner: winner
                };
            }
            return {
                boards: [[], initHelper('freeBoard')],
                winner: null
            };

        case 'RESTART':
            if (action.mode === 'normal') {
                return {
                    boards: [initHelper('playerBoard'), initHelper('computerBoard')],
                    winner: null
                };
            } else {
                return {
                    boards: [[], initHelper('freeBoard')],
                    winner: null
                };
            }

        case 'CLICK':
            newTiles = [...state.boards[1]];
            click(newTiles, action.id);
            if (isGameOver(newTiles)) {
                winner = 'player'
            }
            if (action.user === 'computer') {
                localStorage.setItem('computerBoard', JSON.stringify(newTiles));
                return { boards: [state.boards[0], newTiles], winner: winner };
            }
            else {
                localStorage.setItem('freeBoard', JSON.stringify(newTiles));
                return { boards: [[], newTiles], winner: winner };
            }

        case 'COMPGO':
            if (state.winner) {
                return state;
            }
            let randomHit = Math.floor(Math.random() * 100);
            while (state.boards[0][randomHit].className.includes('selected')) {
                randomHit = Math.floor(Math.random() * 100);
            }
            newTiles = [...state.boards[0]];
            click(newTiles, randomHit);
            if (isGameOver(newTiles)) winner = 'computer';
            localStorage.setItem('playerBoard', JSON.stringify(newTiles));
            return { boards: [newTiles, state.boards[1]], winner: winner };

        default:
            return state;
    }
}


function click(tiles, id) {
    let newClass = '';
    if (tiles[id].isOccupied) {
        newClass += ' hit';
    } else {
        newClass += ' missed';
    }
    newClass += ' selected';
    tiles[id] = { ...tiles[id], className: tiles[id].className + newClass }
}

function initHelper(board) {

    let tiles = [...PLAIN_BOARD];
    SHIPS.forEach((ship) => {
        tiles = generateShip(ship, tiles);
    });
    localStorage.setItem(board, JSON.stringify(tiles));
    return tiles;
}


function generateRandomeStartAndRandomDirection() {
    const randomShipDirection = Math.floor(Math.random() * 2);
    const randomStart = Math.floor(Math.random() * 100);
    return [randomShipDirection, randomStart];
}

function generateShip(ship, updatedTiles) {
    let [randomShipDirection, randomStart] = generateRandomeStartAndRandomDirection();
    let shipTiles = [];
    while (((randomShipDirection === 0 && (randomStart % 10 + ship.length - 1) > 9)) || (randomShipDirection === 1 && (randomStart + 10 * ship.length) > 99)) {
        [randomShipDirection, randomStart] = generateRandomeStartAndRandomDirection();
    }

    if (randomShipDirection === 0) {
        shipTiles = updatedTiles.slice(randomStart, randomStart + ship.length);
    } else {
        for (let i = 0; i < ship.length; i++) {
            shipTiles.push(updatedTiles[randomStart + 10 * i]);
        }
    }
    if (shipTiles.some(tile => tile.isOccupied === true)) {
        updatedTiles = generateShip(ship, updatedTiles);
    } else {
        updatedTiles = updatedTiles.map(tile => {
            shipTiles.forEach(shipTile => {
                if (shipTile.id === tile.id) {
                    tile = { id: tile.id, key: tile.id, isOccupied: true, className: ship.name + ' tile' };
                }
            });
            return tile;
        });
    }
    return updatedTiles;
}

function isGameOver(tiles) {
    let hitCount = 0;
    tiles.forEach(tile => {
        if (tile.className.includes('hit')) {
            hitCount++;
        }
    });
    if (hitCount === NUM_OF_SHIP_TILES) {
        return true;
    }
    return false;
}

/**
        case 'INITCPU':
            if (localStorage.getItem('computerBoard')) {
                newTiles = JSON.parse(localStorage.getItem('computerBoard'));
                if (isGameOver(newTiles)) winner = 'player';
                return {
                    boards: [state.boards[0], newTiles],
                    winner: winner
                };
            }
            return {
                boards: [state.boards[0], initHelper('computerBoard')],
                winner: null
            };
 
        case 'INITPLAYER':
            if (localStorage.getItem('playerBoard') !== null) {
                newTiles = JSON.parse(localStorage.getItem('playerBoard'))
                if (isGameOver(newTiles)) winner = 'computer';
                return {
                    boards: [newTiles, state.boards[1]],
                    winner: winner
                };
            }
            return {
                boards: [initHelper('playerBoard'), state.boards[1]],
                winner: null
            };
*/