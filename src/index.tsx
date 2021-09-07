import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PlayerContext from './context/PlayerContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayerContext>
        <App />
      </PlayerContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
