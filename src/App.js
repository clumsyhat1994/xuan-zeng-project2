import './App.css';
import RestartBtn from './components/RestartBtn';
import Result from './components/Result';
import BoardContainer from './components/BoardContainer';

import React from 'react';
import { useParams } from "react-router-dom";

export const gameModeContext = React.createContext();
function App() {

  const gameMode = useParams().mode;
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
