import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import reducers from './reducers/reducers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing';
import App from './App';
import BackBtn from './components/BackBtn';
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>

    <Router>
      <div id='header'>
        <Routes>
          <Route path={'/:mode'} element={<BackBtn />} />
          <Route path={'/game/:mode'} element={<BackBtn />} />
        </Routes>
        <div id='title'>BATTLE SHIP</div>
      </div>
      <Routes>
        <Route path={'/'} element={<Landing />} />
        <Route path={'/:mode'} element={<Landing />} />
        <Route path={'/game/:mode'} element={<App />} />
        <Route render={() => <h1>Not found!</h1>} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);