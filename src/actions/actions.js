export function replace(newTileList) {
    return {
        type: 'REPLACE',
        payload: newTileList
    };
};

export function initiateBoard() {
    return {
        type: 'INIT'
    };
};

export function addTileClass(id, className, user) {
    return {
        type: 'ADDCLASS',
        payload: className,
        id: id,
        user: user
    };
}

export function updateTileState(id, state, user) {
    return {
        type: 'UPDATETILESTATE',
        payload: state,
        id: id,
        user: user
    };
}

export function startGame() {
    return {
        type: 'STARTGAME'
    }
}

export function nextUser() {
    return {
        type: 'NEXT'
    }
}

export function gameOver() {
    return {
        type: 'OVER'
    }
}