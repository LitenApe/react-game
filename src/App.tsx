import { ReactElement, Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from './utils/routes';

import './App.css';
import Loading from './components/Loading';

const Game = lazy(() => import('./containers/Game'));
const Register = lazy(() => import('./containers/Register'));
const Memoization = lazy(() => import('./containers/Memoization'));

function App(): ReactElement {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
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
          <Route path={Routes.MEMOIZATION} exact>
            <Memoization />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
