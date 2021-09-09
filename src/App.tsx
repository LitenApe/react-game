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
          <Route path={Routes.REGISTER} component={Register} exact />
          <Route path={Routes.GAME} component={Game} exact />
          <Route path={Routes.MEMOIZATION} component={Memoization} exact />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
