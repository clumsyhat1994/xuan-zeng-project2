import { boardTilesReducer } from "./boardTiles";
import { combineReducers } from 'redux';
import gameStateReduce from "./gameState";
const reducers = combineReducers({
    boardTiles: boardTilesReducer,
    gameState: gameStateReduce
})

export default reducers;
