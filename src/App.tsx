import { ReactElement } from 'react';
import Game from './containers/Game';

import './App.css';
import Register from './containers/Register';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from './utils/routes';

function App(): ReactElement {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to={Routes.REGISTER} />
        </Route>
        <Route path={Routes.REGISTER} exact>
          <Register />
        </Route>
        <Route path={Routes.GAME} exact>
          <Game />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
