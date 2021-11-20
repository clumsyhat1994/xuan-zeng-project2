import { boardTilesReducer } from "./boardTiles";
import { combineReducers } from 'redux';
import gameStateReduce from "./gameState";
import gameOver from "./gameOver";
const reducers = combineReducers({
    boardTiles: boardTilesReducer,
    gameState: gameStateReduce,
    gameOver: gameOver
})

export default reducers;
