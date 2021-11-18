import './App.css';
import { Board } from './components/Board';
import RestartBtn from './components/RestartBtn';
import StartBtn from './components/StartBtn';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { NUM_OF_SHIP_TILES } from './Constants';
import Result from './components/Result';
import BoardContainer from './components/BoardContainer';

import React, { useContext } from 'react';
import { Link, NavLink, useParams } from "react-router-dom";

export const gameModeContext = React.createContext();
function App() {

  const gameMode = useParams().mode;
  //console.log(gameMode);
  return (
    <gameModeContext.Provider value={gameMode}>
      <div className="App">
        <RestartBtn />
        <Result />
        <BoardContainer mode={gameMode} />
      </div>
    </gameModeContext.Provider>
  );
}

export default App;
