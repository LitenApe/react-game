import { ReactElement } from 'react';
import Game from './containers/Game';

import './App.css';

function App(): ReactElement {
  return (
    <div className="App">
      <Game
        player={
          <div style={{ width: 20, height: 20, backgroundColor: 'green' }} />
        }
        enemy={
          <div style={{ width: 20, height: 20, backgroundColor: 'red' }} />
        }
      />
    </div>
  );
}

export default App;
