import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PlayerContext from './context/PlayerContext';

ReactDOM.render(
  <React.StrictMode>
    <PlayerContext>
      <App />
    </PlayerContext>
  </React.StrictMode>,
  document.getElementById('root')
);
