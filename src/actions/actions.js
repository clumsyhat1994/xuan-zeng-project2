export function initiateNormal() {
    return {
        type: 'INIT'
    };
};

export function initiateFreeBoard() {
    return {
        type: 'INITFREE'
    };
};


export function playerClick(id, user) {
    return {
        type: 'CLICK',
        id: id,
        user: user
    };
}

export function nextUser() {
    return {
        type: 'NEXT'
    }
}

export function restart(mode) {
    return {
        type: 'RESTART',
        mode: mode
    }
}

export function computerGo() {
    return {
        type: 'COMPGO'
    }
}


/** 
export function initiateComputerBoard() {
    return {
        type: 'INITCPU'
    };
};

export function initiatePlayerBoard() {
    return {
        type: 'INITPLAYER'
    };
};
*/