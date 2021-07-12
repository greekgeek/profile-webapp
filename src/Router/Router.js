import './scss/router.scss';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import routes from './routes';
import React, { Suspense, Fragment } from 'react';
import RouteWithSubRoutes from './subcomp/RouteWithSubRoutes';
import Nav from '@@/components/nav/Nav';
import Loading from '@@/components/loading/Loading';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <header className="website-header" >
          <Nav routes={routes}/>
        </header>
        <Suspense fallback={<Loading/>}>
          <main className="website-body">
            <Switch>
              {routes.map((route, i) => (
                route.subroutes ? <RouteWithSubRoutes key={i} {...route} />
                : <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                  >
                    <route.component />
                  </Route>
              ))}
            </Switch>
          </main>
        </Suspense>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;