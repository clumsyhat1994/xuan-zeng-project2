export default function gameOver(state = false, action) {
    switch (action.type) {
        case 'OVER':
            return true
        default:
            return state;
    }
}
