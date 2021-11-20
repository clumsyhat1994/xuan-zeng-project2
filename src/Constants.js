export const SHIPS = [
    {
        name: 'destroyer',
        length: 2
    },
    {
        name: 'submarine',
        length: 3
    },
    {
        name: 'cruiser',
        length: 3
    },
    {
        name: 'battleship',
        length: 4
    },
    {
        name: 'carrier',
        length: 5
    }
];

export const NUM_OF_SHIP_TILES = (() => {
    let number = 0;
    SHIPS.forEach(ship => { number += ship.length; });
    return number;
})();

let tiles = [];
for (let i = 0; i < 100; i++) {
    tiles.push({ id: i, key: i, isOccupied: false, className: 'tile' });
}

export const PLAIN_BOARD = tiles;
