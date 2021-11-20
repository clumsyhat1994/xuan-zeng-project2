export default function gameStateReduce(state = 'player', action) {
    switch (action.type) {
        case 'NEXT':
            if (state === 'player') {
                return 'computer';
            } else {
                return 'player';
            }
        case 'STARTGAME':
            return 'player';
        default:
            return state;
    }
}