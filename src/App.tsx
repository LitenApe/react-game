import { ReactElement, Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import Loading from './components/Loading';
import PlayerContext from './context/PlayerContext';
import { Routes } from './utils/routes';

const Game = lazy(() => import('./containers/Game'));
const Register = lazy(() => import('./containers/Register'));
const Memoization = lazy(() => import('./containers/Memoization'));

function App(): ReactElement {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <PlayerContext>
          <Switch>
            <Route path="/" exact>
              <Redirect to={Routes.REGISTER} />
            </Route>
            <Route path={Routes.REGISTER} component={Register} exact />
            <Route path={Routes.GAME} component={Game} exact />
            <Route path={Routes.MEMOIZATION} component={Memoization} exact />
          </Switch>
        </PlayerContext>
      </Suspense>
    </div>
  );
}

export default App;
