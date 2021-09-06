import { ReactElement } from 'react';
import Game from './containers/Game';

import './App.css';
import { usePlayerContext } from './context/PlayerContext';
import Register from './containers/Register';

function App(): ReactElement {
  const { name } = usePlayerContext();

  return <div className="App">{name ? <Game /> : <Register />}</div>;
}

export default App;
